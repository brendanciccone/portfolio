"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useLayoutEffect } from "react"
import {
  normalisePath,
  playsEntranceOnNavigation,
  resolveEntranceOnCommit,
} from "@/lib/entrance"

/*
 * Same-document view transitions for internal navigation. The card's framed
 * screenshot and the case study's hero share a view-transition-name, so the
 * click morphs one into the other while the rest of the page cross-fades.
 *
 * document.startViewTransition needs its update callback to resolve once the
 * new route has rendered. The router gives no such promise, so TransitionLink
 * parks a resolver that ViewTransitionSettler releases when the pathname
 * commits. Browsers without the API (and reduced-motion users) fall through
 * to a plain Link navigation.
 *
 * The settler also owns the [data-entrance] attribute — see lib/entrance.ts
 * for the rules, and the note on the layout effect below for why the write
 * cannot happen in the click handler.
 */

let settleNavigation: (() => void) | null = null

/*
 * Paths seen in this session. Module-level, so it survives client navigation
 * and resets on a real reload — which is the behaviour you want: a page
 * introduces itself the first time you reach it, then stops.
 */
const visitedPaths = new Set<string>()

/*
 * The click's entrance decision, waiting for the route to commit. Null means no
 * click was involved, which is how Back and Forward arrive.
 */
let pendingEntrance: boolean | null = null

/*
 * Does this link contain the element that flies across during the morph? Read
 * from computed style rather than a prop so it stays true if a shared element
 * is added or removed elsewhere. getPropertyValue is used because
 * CSSStyleDeclaration.viewTransitionName isn't in every lib.dom yet; unsupported
 * browsers return "" and simply fall through to the entrance path.
 */
const containsSharedElement = (link: HTMLElement): boolean =>
  Array.from(link.querySelectorAll<HTMLElement>("*")).some((element) => {
    const name = getComputedStyle(element).getPropertyValue("view-transition-name")
    return name !== "" && name !== "none"
  })

/* Names are assigned by Tailwind arbitrary-property classes, so the class
   attribute is the cheapest way to find them without walking the whole tree */
const SHARED_ELEMENT_SELECTOR = '[class*="view-transition-name"]'

/*
 * Is there a shared element the visitor can actually see right now?
 *
 * A morph only makes sense between two things on screen. Leaving a case study
 * scrolled to the bottom, its hero sits thousands of pixels above the
 * viewport, and the browser will still happily morph it into the home card —
 * flying it down from off-screen, which reads as the page being flung. When
 * nothing named is visible, the whole transition is flattened to a root
 * cross-fade instead.
 */
const hasVisibleSharedElement = (): boolean =>
  Array.from(document.querySelectorAll<HTMLElement>(SHARED_ELEMENT_SELECTOR)).some((element) => {
    const rect = element.getBoundingClientRect()
    return rect.bottom > 0 && rect.top < window.innerHeight
  })

/* Layout effects don't run on the server; this keeps React from warning about it */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

export const ViewTransitionSettler = (): null => {
  const pathname = usePathname()

  /*
   * The attribute is written here, on commit, and never in the click handler.
   *
   * At click time the outgoing page is still mounted, so enabling entrances
   * restarted ITS animations — the case-study header visibly blanked and
   * re-rose as you left it. By the time this runs the old route is gone and
   * the new one's DOM is in place, so only the incoming page can match.
   *
   * A layout effect rather than a passive one because it must land before the
   * browser paints: the incoming elements mount without the attribute, and a
   * paint in between would show them at their final state a frame before the
   * animation yanked them back to the start. It also lands before the settler
   * below resolves the transition, so a morphing navigation has the attribute
   * cleared before its snapshot is taken — which is the whole reason entrance
   * and morph are kept apart.
   *
   * Running on every pathname change means Back and Forward are covered too;
   * they never touch the click handler, and used to inherit whatever flag the
   * last click left behind.
   */
  useIsomorphicLayoutEffect(() => {
    const normalised = normalisePath(pathname)
    const root = document.documentElement
    const playsEntrance = resolveEntranceOnCommit(pathname, visitedPaths, pendingEntrance)
    pendingEntrance = null

    // Only write on an actual change, so a no-op can never restart an
    // animation that is already running
    if (playsEntrance !== root.hasAttribute("data-entrance")) {
      if (playsEntrance) root.dataset.entrance = ""
      else root.removeAttribute("data-entrance")
    }

    visitedPaths.add(normalised)
  }, [pathname])

  useEffect(() => {
    settleNavigation?.()
    settleNavigation = null
  }, [pathname])

  return null
}

/* Accepts everything next/link does, but href stays a plain string so the
   same-page guard below can compare it against the current pathname */
type TransitionLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & { href: string }

export const TransitionLink = ({ href, onClick, children, ...rest }: TransitionLinkProps): React.JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    // Let modified clicks (new tab etc.) use the default Link behavior
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    // Links that open outside this document aren't client navigations
    if (rest.target && rest.target !== "_self") return
    // Guards the parse below; URL.canParse is Baseline alongside the view
    // transition API this handler upgrades to
    if (!URL.canParse(href, window.location.href)) return

    const destination = new URL(href, window.location.href)
    // Cross-origin hrefs leave the app entirely — let the browser navigate
    if (destination.origin !== window.location.origin) return
    /*
     * Same-page clicks never settle (pathname doesn't change), so they skip the
     * transition rather than holding the snapshot until the failsafe fires.
     * Comparing pathnames catches query/hash variants of the current route
     * (/about?tab=2, /about#details) too.
     *
     * They do get taken back to the top, though. Clicking the wordmark from the
     * footer reads as "go home", and arriving home in the middle of the page
     * you were already on reads as the click having done nothing — which,
     * before this, is exactly what happened.
     */
    if (normalisePath(destination.pathname) === normalisePath(pathname)) {
      // Anything pointing at an anchor owns its own scrolling; leave it be
      if (destination.hash === "") {
        event.preventDefault()
        // No behavior override on purpose: the default defers to
        // html { scroll-behavior }, which globals.css already scopes to
        // prefers-reduced-motion: no-preference. Reduced motion jumps.
        window.scrollTo({ top: 0, left: 0 })
      }
      return
    }

    /*
     * Only the click knows whether this navigation carries a shared element, so
     * the decision is made here — but it is recorded, not applied. The settler
     * applies it once the route commits.
     */
    const playsEntrance = playsEntranceOnNavigation(
      destination.pathname,
      visitedPaths,
      containsSharedElement(event.currentTarget),
    )
    pendingEntrance = playsEntrance

    // A page introducing itself skips the transition entirely: with no snapshot
    // there is nothing for the entrance to be caught mid-flight by
    if (playsEntrance) return

    // Browsers without view transitions, and reduced-motion users, get a plain
    // client-side Link navigation
    if (typeof document.startViewTransition !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    // Set before the outgoing snapshot is taken and cleared only once the
    // transition ends, so both snapshots agree on which names exist
    const root = document.documentElement
    if (!hasVisibleSharedElement()) root.dataset.flatTransition = ""

    event.preventDefault()
    const transition = document.startViewTransition(() => {
      const settled = new Promise<void>((resolve) => {
        settleNavigation = resolve
      })
      router.push(href)
      // Failsafe: never leave the page frozen mid-transition if the
      // navigation stalls
      const timeout = new Promise<void>((resolve) => {
        setTimeout(resolve, 800)
      })
      return Promise.race([settled, timeout])
    })

    // Cleared on both settle and skip; a skipped transition rejects, and an
    // attribute left behind would suppress the next genuine morph
    const clearFlatTransition = () => root.removeAttribute("data-flat-transition")
    transition.finished.then(clearFlatTransition, clearFlatTransition)
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
