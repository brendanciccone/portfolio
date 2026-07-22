"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/*
 * "Meaningfully visible" threshold: an element barely peeking above the fold
 * shouldn't count as seen, so the reveal viewport is inset by this ratio at
 * the bottom.
 */
const REVEAL_BOTTOM_INSET_RATIO = 0.08
const revealRootMargin = `0px 0px -${REVEAL_BOTTOM_INSET_RATIO * 100}% 0px`

/*
 * Hero hairline that draws itself left to right, but only once it can be
 * seen. In the first viewport it keeps the load choreography (draws 250ms
 * behind the title, via .anim-rule); below the fold it holds undrawn and
 * draws immediately on scroll-in — the load delay would read as lag
 * mid-scroll. Under prefers-reduced-motion every state renders as a static,
 * fully drawn line (the anim classes are scoped to no-preference).
 */
type DrawState = "hold" | "draw-on-load" | "draw-on-scroll"

export const DrawnRule = ({ className }: { className?: string }): React.JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const [drawState, setDrawState] = useState<DrawState>("hold")

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let observer: IntersectionObserver | null = null
    // Client navigation races layout: a rect measured immediately can reflect
    // the pre-navigation scroll offset, right before ScrollToTop resets it
    // (same race FadeIn handles). Decide load-vs-scroll after it settles.
    const decideTimer = setTimeout(() => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const rect = el.getBoundingClientRect()
      // A line barely peeking above the fold shouldn't burn its draw where
      // nobody is looking — same "meaningfully visible" inset FadeIn uses
      const visibleBottom = viewportHeight * (1 - REVEAL_BOTTOM_INSET_RATIO)
      if (rect.top < visibleBottom && rect.bottom > 0) {
        setDrawState("draw-on-load")
        return
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          setDrawState("draw-on-scroll")
          observer?.disconnect()
        },
        { threshold: 0, rootMargin: revealRootMargin },
      )
      observer.observe(el)
    }, 100)

    return () => {
      clearTimeout(decideTimer)
      observer?.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "h-px bg-border",
        drawState === "hold" && "anim-rule-hold",
        drawState === "draw-on-load" && "anim-rule",
        drawState === "draw-on-scroll" && "anim-rule anim-rule-now",
        className,
      )}
    />
  )
}
