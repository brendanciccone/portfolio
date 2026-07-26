"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

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
 */

let settleNavigation: (() => void) | null = null

/*
 * Paths seen in this session. Module-level, so it survives client navigation
 * and resets on a real reload — which is the behaviour you want: a page
 * introduces itself the first time you reach it, then stops.
 */
const visitedPaths = new Set<string>()

/*
 * next.config sets trailingSlash, so the same route is spelled "/about" in an
 * href and "/about/" in location. Both sides of the visited lookup and the
 * same-page guard go through here; without it every non-root page reads as
 * unvisited forever and replays its entrance on every arrival. Root is left
 * alone, which is why "/" was the one path that happened to match already.
 */
const normalisePath = (path: string): string =>
  path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path

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

export const ViewTransitionSettler = (): null => {
  const pathname = usePathname()

  useEffect(() => {
    visitedPaths.add(normalisePath(pathname))
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
    // (/about?tab=2, /about#details) too. Kept ahead of the marker below so a
    // same-page click never snaps a still-running first-load entrance.
    if (normalisePath(destination.pathname) === normalisePath(pathname)) return

    /*
     * Entrance or morph, never both — see globals.css for why running them
     * together produced the mobile "cut off, then suddenly appears" bug.
     *
     * A page you haven't reached yet this session gets its hero choreography,
     * which means skipping the transition entirely: with no snapshot there is
     * nothing for the entrance to be captured mid-flight by. A page you've
     * already seen gets the morph instead. Links carrying a shared element —
     * card to case study — always morph, because flying the screenshot into
     * the hero IS that arrival's entrance, and it would fight a transform
     * entrance on the very same node.
     */
    const root = document.documentElement
    const playsEntrance =
      !visitedPaths.has(normalisePath(destination.pathname)) && !containsSharedElement(event.currentTarget)

    if (playsEntrance) {
      root.dataset.entrance = ""
      return
    }

    root.removeAttribute("data-entrance")

    // Browsers without view transitions, and reduced-motion users, get a plain
    // client-side Link navigation. (Reduced-motion entrances are already inert,
    // so clearing the attribute above is harmless and keeps this uniform.)
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
