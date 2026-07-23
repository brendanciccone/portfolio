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

export const ViewTransitionSettler = (): null => {
  const pathname = usePathname()

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
    // (/about?tab=2, /about#details) too. Kept ahead of the marker below so a
    // same-page click never snaps a still-running first-load entrance.
    if (destination.pathname === pathname) return

    // Browsers without view transitions, and reduced-motion users, get a plain
    // client-side Link navigation. Mark it navigated here so the incoming route
    // renders its mount entrances (anim-rise/stamp/dot) at final state instead
    // of replaying them — see globals.css. (Reduced-motion entrances are
    // already inert; marking is harmless and keeps the fallback uniform.)
    if (typeof document.startViewTransition !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.navigated = "true"
      return
    }

    event.preventDefault()
    document.startViewTransition(() => {
      // Mark inside the update callback so the flag lands on the NEW document
      // state only: the outgoing snapshot is already captured by the time this
      // runs, so a click during a still-running first-load entrance can't snap
      // the old page. Set before router.push so the incoming route mounts
      // already marked and its entrances stay at their final state. Stays set
      // for the session; a reload clears it.
      document.documentElement.dataset.navigated = "true"
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
