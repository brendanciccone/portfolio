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
import { sharedFrameSlug } from "@/lib/shared-frame"

/*
 * Same-document view transitions for internal navigation. The card's framed
 * screenshot and the case study's hero share a view-transition-name, so the
 * click morphs one into the other while the rest of the page cross-fades.
 *
 * The name is handed out for the length of one navigation, by putting that
 * project's slug on the root — see the [data-morph] rule in globals.css. Which
 * navigations get one is decided in two halves, because neither end can answer
 * it alone: the click measures the frame it is leaving, and the settler
 * measures the one that arrived. A morph between a frame the visitor cannot see
 * is worse than no morph, and it is what threw the screenshot off the bottom of
 * the screen on the way back from three of the four case studies.
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

/*
 * Never leave the page frozen mid-transition if the navigation stalls. Nothing
 * paints while the update callback is outstanding, so this is a hard ceiling on
 * how long a click can look like it did nothing.
 */
const NAVIGATION_FAILSAFE_MS = 800

/*
 * The transition currently playing, if any. Also the guard on every write to
 * [data-morph]: a superseded transition settles too, and clearing the attribute
 * from under a live one would leave the two documents disagreeing about which
 * element is named.
 */
let activeTransition: ViewTransition | null = null

/*
 * The parked resolver for the navigation a transition is waiting on, tagged
 * with the path it expects. The tag matters: any other pathname change —
 * a Back that lands somewhere else, a second click — would otherwise resolve
 * the transition early and hand the browser a snapshot of the wrong page.
 */
let pendingSettle: { path: string; resolve: () => void } | null = null

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

/* Assigned by the [data-morph] rule in globals.css. One name, because only one
   pair is ever named at a time — see lib/shared-frame.ts. */
const frameSelector = (slug: string): string => `[data-frame="${slug}"]`

/*
 * Is this frame on screen right now?
 *
 * A morph only makes sense between two things the visitor can see. Leaving a
 * case study scrolled to the bottom, its hero sits thousands of pixels above
 * the viewport, and the browser will still happily morph it into the home card
 * — flying it down from off-screen, which reads as the page being flung.
 */
const isOnScreen = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return rect.bottom > 0 && rect.top < window.innerHeight
}

/*
 * The same question for a frame on a page that has just arrived, where the
 * answer has to be scroll-independent.
 *
 * A forward navigation lands at the top, but whether the router has scrolled
 * there yet by the time this runs is not something to depend on, so the frame's
 * offset is measured from the document rather than from the viewport. Anything
 * past the first screenful is off-screen on arrival — which is the case the
 * click could not have caught: coming back from Immertec or Paidly, the hero
 * being left is right there on screen, and the card it pairs with is 1200 or
 * 2600 pixels down the home page. Named, that morph throws the screenshot off
 * the bottom of the window on its way to a card nobody can see.
 */
const willBeOnScreenAtTop = (element: Element): boolean =>
  element.getBoundingClientRect().top + window.scrollY < window.innerHeight

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

  /*
   * Confirming the morph, then releasing the transition — and both in a passive
   * effect, which is load-bearing rather than incidental.
   *
   * Resolving the update callback is what tells the browser to snapshot the new
   * page, and the router scrolls that page to the top from a layout effect of
   * its own. Settle any earlier than this and the snapshot is taken while the
   * incoming page is still sitting at the scroll offset the outgoing one had:
   * measured from the top of a home page scrolled to Paidly, the case study's
   * hero snapshots at -2276 and the morph flies the screenshot up off the
   * screen. Moving this into the layout effect above to save a frame is exactly
   * the wrong trade.
   */
  useEffect(() => {
    const normalised = normalisePath(pathname)
    const root = document.documentElement

    /*
     * Second half of the morph decision. The click could only measure the frame
     * it was leaving; this is the first moment the one being arrived at exists,
     * and the last before the browser snapshots it. Dropping the name here
     * leaves the outgoing frame to fade out in place under the root cross-fade,
     * which is what the navigation would have looked like had it never claimed
     * a morph at all.
     */
    const morphSlug = root.dataset.morph
    if (morphSlug !== undefined) {
      const frame = document.querySelector(frameSelector(morphSlug))
      if (frame === null || !willBeOnScreenAtTop(frame)) root.removeAttribute("data-morph")
    }

    if (pendingSettle !== null && pendingSettle.path === normalised) {
      pendingSettle.resolve()
      pendingSettle = null
    }
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
     * A click that lands while a transition is still playing.
     *
     * Nothing paints during a transition, so what is on screen is a snapshot of
     * a page that has already been replaced — but hit-testing goes to the live
     * DOM underneath it, so this click is not necessarily on the thing the
     * visitor was looking at. Lifting the snapshot immediately is the only
     * honest answer, and this navigation then runs as a plain one: two
     * transitions in flight share a single [data-morph] attribute and a single
     * settle slot, and the loser used to clear both out from under the winner.
     *
     * Held until the skipped transition has finished rather than pushed now,
     * because skipping does not abandon its update callback — it runs it, a
     * task later, and that callback carries the first click's router.push.
     * Navigating immediately puts the two pushes in the wrong order and lands
     * the visitor on the card they clicked first.
     */
    if (activeTransition !== null) {
      const superseded = activeTransition
      /*
       * The entrance decision is recomputed at fire time rather than inherited.
       * pendingEntrance still holds the superseded click's answer, which is
       * always false — a navigation that plays an entrance never starts a
       * transition, so reaching this branch means one did.
       *
       * In practice the route the superseded transition was carrying commits
       * before its finished promise resolves, which consumes that false and
       * resets the slot, so the destination falls back to the visited set and
       * lands on the right answer anyway. But that ordering is React's to
       * change, and inheriting a stale false would silently rob an unvisited
       * page of its introduction. Answering for this navigation explicitly
       * costs a line and does not depend on the ordering at all.
       *
       * No shared frame: nothing is named for a deferred plain navigation.
       */
      const navigate = () => {
        pendingEntrance = playsEntranceOnNavigation(destination.pathname, visitedPaths, false)
        router.push(href)
      }

      event.preventDefault()
      superseded.skipTransition()
      superseded.finished.then(navigate, navigate)
      return
    }

    /*
     * Only the click knows whether this navigation carries a shared frame the
     * visitor can currently see, so the decision is made here — but the
     * entrance half of it is recorded, not applied. The settler applies it once
     * the route commits, and confirms the morph half against the page that
     * actually arrived.
     */
    const sharedSlug = sharedFrameSlug(pathname, destination.pathname)
    const outgoingFrame = sharedSlug === null ? null : document.querySelector(frameSelector(sharedSlug))
    const morphSlug = outgoingFrame !== null && isOnScreen(outgoingFrame) ? sharedSlug : null

    const playsEntrance = playsEntranceOnNavigation(
      destination.pathname,
      visitedPaths,
      morphSlug !== null,
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
    // transition ends, so both documents agree on which element is named
    const root = document.documentElement
    if (morphSlug !== null) root.dataset.morph = morphSlug

    event.preventDefault()

    let stalled = false
    const transition = document.startViewTransition(() => {
      const settled = new Promise<void>((resolve) => {
        pendingSettle = { path: normalisePath(destination.pathname), resolve }
      })
      router.push(href)
      const failsafe = new Promise<void>((resolve) => {
        setTimeout(() => {
          stalled = true
          resolve()
        }, NAVIGATION_FAILSAFE_MS)
      })
      return Promise.race([settled, failsafe])
    })
    activeTransition = transition

    /*
     * The failsafe fired, so both snapshots are of the same page and the
     * cross-fade has nothing to show. Skipping it lets the route land as a
     * plain navigation the moment it arrives, rather than spending the
     * animation fading a page into itself and then cutting to the new one.
     */
    const skipIfStalled = () => {
      if (stalled) transition.skipTransition()
    }

    /*
     * Cleared on settle and on skip alike; an attribute left behind would name
     * an element on a page the next navigation isn't morphing. Guarded on
     * identity so a transition that has already been superseded cannot clear
     * the live one's name.
     */
    const release = () => {
      if (activeTransition !== transition) return
      activeTransition = null
      root.removeAttribute("data-morph")
    }

    transition.ready.then(skipIfStalled, skipIfStalled)
    transition.finished.then(release, release)
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
