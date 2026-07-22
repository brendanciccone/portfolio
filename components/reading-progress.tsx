"use client"

import type React from "react"
import { useEffect, useRef } from "react"

/*
 * Reading progress — a 2px red rule pinned under the header that fills as the
 * case study scrolls. Width is set imperatively from a rAF-throttled scroll
 * handler; it tracks position rather than animating, so it needs no
 * reduced-motion branch. Decorative only, hence aria-hidden.
 */
export const ReadingProgress = (): React.JSX.Element => {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      if (!barRef.current) return
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
      barRef.current.style.width = `${progress * 100}%`
    }

    const handleScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <div aria-hidden className="fixed top-14 left-0 right-0 z-40 h-[2px] pointer-events-none">
      <div ref={barRef} className="h-full w-0 bg-primary" />
    </div>
  )
}
