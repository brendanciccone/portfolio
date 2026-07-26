"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

/*
 * Reading progress — a 2px red rule pinned under the header that fills as the
 * page scrolls. Driven by scaleX rather than width: the motion system animates
 * transforms and opacity only, and a width that changes on every scroll event
 * relayouts the bar each frame for no visual gain.
 *
 * Set imperatively from the scroll handler, and synchronously — the same
 * reasoning as the scroll flow engine, minus the stakes, since this is
 * decorative and aria-hidden. It tracks position rather than animating, so it
 * needs no reduced-motion branch.
 */
export const ReadingProgress = (): React.JSX.Element => {
  const barRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
      barRef.current.style.transform = `scaleX(${progress})`
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })

    /*
     * Scroll events alone don't keep this honest. The rail lives in the root
     * layout, so it survives navigation while the document under it changes
     * height — and if the outgoing page was already at the top, ScrollToTop's
     * scrollTo(0) moves nothing and therefore fires no scroll event, leaving
     * the previous route's progress on screen. Re-running on pathname change
     * covers that; observing the document covers the slower half, where a
     * route's real height only arrives as its images decode.
     */
    const observer = new ResizeObserver(update)
    observer.observe(document.documentElement)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [pathname])

  return (
    <div aria-hidden className="fixed top-14 left-0 right-0 z-40 h-[2px] pointer-events-none">
      <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-primary" />
    </div>
  )
}
