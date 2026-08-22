"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import {
  computeFlow,
  computeRecede,
  parseFlowFactor,
  shouldReleaseWipe,
  WIPE_TRIGGER_RATIO,
} from "@/lib/scroll-flow-math"

/*
 * Scroll flow — the site's one continuous motion.
 *
 * Every [data-flow] element's visibility is a pure function of where it
 * currently sits in the viewport: it rises in from below and melts away as it
 * reaches the header. There is no "revealed" state to get stuck in, so
 * scrubbing back up replays the same curve in reverse and the page stays
 * alive in both directions.
 *
 * Three behaviours share one pass because they all read the same rects and
 * have to agree frame-to-frame:
 *   [data-flow]   — bidirectional enter/exit for content below the hero
 *   [data-recede] — the hero's scroll-linked hand-off to the work
 *   [data-wipe]   — one-shot clip-path reveals (images only)
 *
 * Deliberately synchronous inside the scroll handler rather than scheduled on
 * requestAnimationFrame: throttled tabs and background iframes starve rAF,
 * which would strand content at opacity 0 with no way to recover. Nothing in
 * this system gates content on a frame callback. The 300ms interval is the
 * safety net for scroll positions that change without firing a scroll event:
 * anchor jumps, streamed layout shifts, images loading late and resizing the
 * page underneath.
 *
 * The arithmetic lives in lib/scroll-flow-math.ts, where it is unit-tested.
 */

const SAFETY_INTERVAL_MS = 300
/*
 * Anything not yet armed or finished. Matched by exclusion rather than by
 * value: JSX renders a bare `data-wipe` as the string "true", so authored
 * elements arrive carrying a value we never chose.
 */
const UNARMED_WIPE_SELECTOR = '[data-wipe]:not([data-wipe="armed"]):not([data-wipe="done"])'
const WIPE_CLIP_START = "inset(8% 5% 8% 5%)"
const WIPE_CLIP_END = "inset(0%)"

interface Measured {
  element: HTMLElement
  rect: DOMRect
}

const queryAll = (selector: string): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>(selector))

const measure = (elements: readonly HTMLElement[]): Measured[] =>
  elements.map((element) => ({ element, rect: element.getBoundingClientRect() }))

const applyFlow = (
  { element, rect }: Measured,
  viewportHeight: number,
  remainingScroll: number,
): void => {
  const factor = parseFlowFactor(element.dataset.flow)
  const { opacity, translateY, blurPx } = computeFlow(rect, viewportHeight, remainingScroll, factor)

  element.style.opacity = String(opacity)
  element.style.transform = `translate3d(0, ${translateY}px, 0)`
  // Cleared rather than set to 0 so an offscreen element stops paying for a
  // blur-capable compositing layer it isn't using
  element.style.filter = blurPx === 0 ? "" : `blur(${blurPx}px)`
}

const applyRecede = (element: HTMLElement, viewportHeight: number, scrollY: number): void => {
  const kind = element.dataset.recede === "meta" ? "meta" : "title"
  const { opacity, translateY } = computeRecede(kind, viewportHeight, scrollY)

  element.style.transform = `translate3d(0, ${translateY}px, 0)`
  element.style.opacity = String(opacity)
}

/*
 * Arming is what keeps the wipe honest. The clipped start state is applied by
 * JS, never by CSS, so a visitor without JS gets whole images — and an image
 * already on screen when the page arrives is marked done untouched, because a
 * reveal the visitor watches begin from nothing is a load animation wearing a
 * scroll animation's clothes.
 */
const armWipe = ({ element, rect }: Measured, viewportHeight: number): void => {
  if (rect.top < viewportHeight * WIPE_TRIGGER_RATIO) {
    element.dataset.wipe = "done"
    return
  }

  element.style.clipPath = WIPE_CLIP_START
  element.style.opacity = "0"
  element.dataset.wipe = "armed"
}

const releaseWipe = ({ element, rect }: Measured, viewportHeight: number): void => {
  if (!shouldReleaseWipe(rect.top, viewportHeight)) return

  element.style.clipPath = WIPE_CLIP_END
  element.style.opacity = "1"
  element.dataset.wipe = "done"
}

/*
 * Hand every element back to its static default. Needed when reduced motion is
 * switched on mid-session: the CSS half of the system reverts on its own
 * because media queries are live, but inline styles this engine already wrote
 * would otherwise stay put and leave content stranded mid-melt.
 */
const clearInlineMotion = (): void => {
  for (const element of queryAll("[data-flow], [data-recede]")) {
    element.style.opacity = ""
    element.style.transform = ""
    element.style.filter = ""
  }
  for (const element of queryAll("[data-wipe]")) {
    element.style.clipPath = ""
    element.style.opacity = ""
    element.dataset.wipe = "done"
  }
}

export const ScrollFlow = (): null => {
  const pathname = usePathname()

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let stopEngine: (() => void) | null = null

    const startEngine = (): (() => void) => {
      let flowElements: HTMLElement[] = []
      let recedeElements: HTMLElement[] = []
      let armedWipes: HTMLElement[] = []

      const rescan = () => {
        flowElements = queryAll("[data-flow]")
        recedeElements = queryAll("[data-recede]")
        for (const target of measure(queryAll(UNARMED_WIPE_SELECTOR))) {
          armWipe(target, window.innerHeight)
        }
        // Cached here so the scroll handler never queries the document. The
        // handler runs far more often than this 300ms rescan, and a
        // document-wide attribute query per scroll event is exactly the kind
        // of work the read-before-write ordering below exists to avoid.
        armedWipes = queryAll('[data-wipe="armed"]')
      }

      const update = () => {
        const viewportHeight = window.innerHeight
        const { scrollY } = window

        // Every rect is read before a single style is written. Interleaving the
        // two forces a synchronous layout per element, which is what makes a
        // scroll handler stutter. scrollHeight is a layout read too, so it
        // belongs up here with the rects.
        const remainingScroll = Math.max(
          0,
          document.documentElement.scrollHeight - viewportHeight - scrollY,
        )
        const flowTargets = measure(flowElements)
        const wipeTargets = armedWipes.length > 0 ? measure(armedWipes) : []

        for (const target of flowTargets) applyFlow(target, viewportHeight, remainingScroll)
        for (const element of recedeElements) applyRecede(element, viewportHeight, scrollY)
        for (const target of wipeTargets) releaseWipe(target, viewportHeight)

        if (wipeTargets.length > 0) {
          armedWipes = armedWipes.filter((element) => element.dataset.wipe === "armed")
        }
      }

      const tick = () => {
        rescan()
        update()
      }

      tick()

      const interval = setInterval(tick, SAFETY_INTERVAL_MS)
      window.addEventListener("scroll", update, { passive: true })
      window.addEventListener("resize", tick, { passive: true })

      return () => {
        clearInterval(interval)
        window.removeEventListener("scroll", update)
        window.removeEventListener("resize", tick)
      }
    }

    /*
     * Reduced motion opts out of the engine entirely rather than running it
     * with the numbers turned down: no inline styles are written, so every
     * page renders static and complete. Re-checked on change so toggling the
     * OS setting mid-session takes effect without a reload.
     */
    const syncToMotionPreference = () => {
      if (motionQuery.matches) {
        stopEngine?.()
        stopEngine = null
        clearInlineMotion()
        return
      }
      stopEngine ??= startEngine()
    }

    syncToMotionPreference()
    motionQuery.addEventListener("change", syncToMotionPreference)

    return () => {
      motionQuery.removeEventListener("change", syncToMotionPreference)
      stopEngine?.()
    }
  }, [pathname])

  return null
}
