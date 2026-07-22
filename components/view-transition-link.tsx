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

interface TransitionLinkProps {
  href: string
  className?: string
  children: React.ReactNode
}

export const TransitionLink = ({ href, className, children }: TransitionLinkProps): React.JSX.Element => {
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab etc.) and unsupported browsers use the
    // default Link behavior
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    if (typeof document.startViewTransition !== "function") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

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
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
