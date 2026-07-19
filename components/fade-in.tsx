"use client"

import type React from "react"
import { useEffect, useRef, useState, memo } from "react"
import { cn } from "@/lib/utils"

/*
 * Scroll reveals materialize in place (fade + slight grow) rather than
 * translating upward: on touch devices most reveals fire mid-flick, and an
 * entrance with its own direction fights the page's motion. An in-place
 * entrance is scroll-agnostic.
 */

/*
 * Reveals entering on scroll wait until the element has cleared the bottom
 * edge by this fraction of the viewport, so entrances aren't half-clipped at
 * the fold. Kept small so elements near the page bottom can still trigger.
 * Shared with DrawnRule so both components agree on what "visible" means.
 */
export const REVEAL_BOTTOM_INSET_RATIO = 0.08

export const revealRootMargin = `0px 0px -${REVEAL_BOTTOM_INSET_RATIO * 100}% 0px`

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

const FadeInComponent = ({
  children,
  className,
  delay = 0,
  duration = 275,
  threshold = 0.01,
  once = true,
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: revealRootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    // Client navigation races the observer: it can compute its first record at
    // the pre-navigation scroll offset, right before ScrollToTop jumps to the
    // top, leaving in-viewport elements stuck hidden. Re-check once the scroll
    // reset has settled. This check ignores the bottom inset on purpose —
    // anything visible in the first viewport at load should simply be shown.
    const recheckVisibility = () => {
      if (!currentRef) return
      const rect = currentRef.getBoundingClientRect()
      // innerHeight/Width can misreport 0 in embedded webviews; fall back to
      // the document's client dimensions
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth
      const visibleWidth = Math.max(0, Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0))
      const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0))
      const totalArea = rect.width * rect.height
      const visibilityRatio = totalArea > 0 ? (visibleWidth * visibleHeight) / totalArea : 0
      if (visibilityRatio >= threshold) {
        setIsVisible(true)
        if (once) observer.unobserve(currentRef)
      }
    }
    const recheckTimer = setTimeout(recheckVisibility, 100)

    return () => {
      clearTimeout(recheckTimer)
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once, threshold])

  return (
    <div
      ref={ref}
      className={cn(
        // Transition property lives in a class (not inline) so the reduced-
        // motion guard below can actually win — an inline transition-property
        // outranks any class, including motion-reduce:transition-none. Tailwind
        // v4 scale utilities drive the standalone `scale` property, so we
        // transition opacity + scale directly.
        "transition-[opacity,scale] ease-out",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]",
        // Honor prefers-reduced-motion: kill the transition and pin to the
        // final in-place state, so there's no entrance animation.
        "motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100",
        className,
      )}
      style={{
        // Per-instance timing stays inline; property/easing are static classes
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Export memoized component to prevent unnecessary rerenders
export const FadeIn = memo(FadeInComponent)
