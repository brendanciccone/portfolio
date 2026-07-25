"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

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
 * which would strand content at opacity 0 with no way to recover. rAF drives
 * no content in this system — only the decorative dot field. The 300ms
 * interval is the safety net for scroll positions that change without firing
 * a scroll event: anchor jumps, streamed layout shifts, images loading late
 * and resizing the page underneath.
 */

const SAFETY_INTERVAL_MS = 300
/* Beyond this margin an element cannot be seen, so its math is skipped */
const OFFSCREEN_MARGIN = 80
/* An image starts its wipe once its top clears this fraction of the viewport */
const WIPE_TRIGGER_RATIO = 0.86
/* Shallower than the reference's 14/8: less distance to travel is most of what
   makes the reveal feel prompt rather than laboured */
const WIPE_CLIP_START = "inset(8% 5% 8% 5%)"
const WIPE_CLIP_END = "inset(0%)"
/*
 * Anything not yet armed or finished. Matched by exclusion rather than by
 * value: JSX renders a bare `data-wipe` as the string "true", so authored
 * elements arrive carrying a value we never chose.
 */
const UNARMED_WIPE_SELECTOR = '[data-wipe]:not([data-wipe="armed"]):not([data-wipe="done"])'

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))

interface Measured {
  element: HTMLElement
  rect: DOMRect
}

const measure = (elements: readonly HTMLElement[]): Measured[] =>
  elements.map((element) => ({ element, rect: element.getBoundingClientRect() }))

/*
 * enter ramps over the bottom 20% of the viewport; exit melts the element as
 * its bottom edge approaches the header. k stretches the exit ramp only —
 * siblings given 1 / 1.07 / 1.14 leave at slightly different rates, and that
 * differential is what reads as considered rather than batch-animated.
 *
 * Lower k means a later, shorter melt (an element stays crisp until its bottom
 * is nearly at the header). Body prose therefore runs at 0.5, well under the
 * structure around it. The reference direction put text columns at 1.15, which
 * made prose the FIRST thing to dissolve — on a case study, a paragraph still
 * sitting comfortably on screen was already down to 0.63 opacity and blurred.
 * On a page whose job is reading, the scaffolding should go before the words.
 *
 * remainingScroll is what keeps the last element on the page honest. Whatever
 * sits at the bottom of the document — in practice the footer — can never
 * climb out of the enter ramp, because the page runs out of scroll before the
 * element runs out of ramp. Left alone it parks forever at a third opacity
 * under a blur. So the final screenful raises a floor under enter: no effect
 * while there's a ramp's worth of scrolling left, rising smoothly to fully
 * resolved as the page lands.
 */
const applyFlow = (
  { element, rect }: Measured,
  viewportHeight: number,
  remainingScroll: number,
): void => {
  if (rect.bottom < -OFFSCREEN_MARGIN || rect.top > viewportHeight + OFFSCREEN_MARGIN) {
    element.style.opacity = "0"
    return
  }

  const k = Number(element.dataset.flow) || 1
  const rampHeight = viewportHeight * 0.2
  const enterFloor = clamp01(1 - remainingScroll / rampHeight)
  const enter = Math.max(
    clamp01((viewportHeight * 0.96 - rect.top) / rampHeight),
    enterFloor,
  )
  const exit = clamp01((rect.bottom - viewportHeight * 0.06) / (viewportHeight * 0.22 * k))
  const visibility = Math.min(enter, exit)

  element.style.opacity = String(visibility ** 1.15)
  element.style.transform = `translate3d(0, ${(1 - enter) * 32 - (1 - exit) * 26}px, 0)`
  // Blur is by far the most expensive property here; drop it outright once
  // the element has effectively settled rather than leaving a 0.07px filter
  // pinning it to a blur-capable layer for the rest of the scroll.
  element.style.filter = visibility > 0.98 ? "" : `blur(${(1 - visibility) * 3.5}px)`
}

/*
 * The hero doesn't scroll away so much as hand the page off: the title drifts
 * up faster than the page and thins to a quarter, the meta row travels at
 * half that rate and leaves completely.
 */
const applyRecede = (element: HTMLElement, viewportHeight: number, scrollY: number): void => {
  const isMeta = element.dataset.recede === "meta"
  const progress = clamp01(scrollY / (viewportHeight * 0.9))

  element.style.transform = `translate3d(0, ${scrollY * (isMeta ? 0.08 : 0.16)}px, 0)`
  element.style.opacity = String(isMeta ? 1 - progress : 1 - progress * 0.75)
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
  element.style.scale = "1.06"
  element.dataset.wipe = "armed"
}

const releaseWipe = ({ element, rect }: Measured, viewportHeight: number): void => {
  if (rect.top >= viewportHeight * WIPE_TRIGGER_RATIO) return

  element.style.clipPath = WIPE_CLIP_END
  element.style.scale = "1"
  element.dataset.wipe = "done"
}

const queryAll = (selector: string): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>(selector))

export const ScrollFlow = (): null => {
  const pathname = usePathname()

  useEffect(() => {
    // Reduced motion opts out of the engine entirely rather than running it
    // with the numbers turned down: no inline styles are ever written, so
    // every page renders static and complete.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let flowElements: HTMLElement[] = []
    let recedeElements: HTMLElement[] = []

    const rescan = () => {
      flowElements = queryAll("[data-flow]")
      recedeElements = queryAll("[data-recede]")
      const pending = queryAll(UNARMED_WIPE_SELECTOR)
      if (pending.length > 0) {
        for (const target of measure(pending)) armWipe(target, window.innerHeight)
      }
    }

    const update = () => {
      const viewportHeight = window.innerHeight
      const { scrollY } = window

      // Every rect is read before a single style is written. Interleaving the
      // two forces a synchronous layout per element, which is exactly what
      // makes a scroll handler stutter. scrollHeight is a layout read too, so
      // it belongs up here with the rects.
      const remainingScroll = Math.max(
        0,
        document.documentElement.scrollHeight - viewportHeight - scrollY,
      )
      const flowTargets = measure(flowElements)
      const wipeTargets = measure(queryAll('[data-wipe="armed"]'))

      for (const target of flowTargets) applyFlow(target, viewportHeight, remainingScroll)
      for (const element of recedeElements) applyRecede(element, viewportHeight, scrollY)
      for (const target of wipeTargets) releaseWipe(target, viewportHeight)
    }

    rescan()
    update()

    const tick = () => {
      rescan()
      update()
    }

    const interval = setInterval(tick, SAFETY_INTERVAL_MS)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", tick, { passive: true })

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", tick)
    }
  }, [pathname])

  return null
}
