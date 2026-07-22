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
    // Let modified clicks (new tab etc.) and unsupported browsers use the
    // default Link behavior
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    if (typeof document.startViewTransition !== "function") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    // Same-page clicks never settle (pathname doesn't change) — skip the
    // transition rather than holding the snapshot until the failsafe fires
    if (pathname === href) return

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
