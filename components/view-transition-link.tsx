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
    // Same-page clicks never settle (pathname doesn't change) — skip the
    // transition rather than holding the snapshot until the failsafe fires.
    // Comparing pathnames catches query/hash variants of the current route
    // (/about?tab=2, /about#details) too.
    if (normalisePath(destination.pathname) === normalisePath(pathname)) return

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

    event.preventDefault()
    document.startViewTransition(() => {
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
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
