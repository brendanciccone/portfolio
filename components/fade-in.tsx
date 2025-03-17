"use client"

import type React from "react"
import { useEffect, useRef, useState, memo } from "react"
import { cn } from "@/lib/utils"

// This component could be optimized by using React.memo to prevent unnecessary rerenders
// Example: export const FadeIn = memo(FadeIn) at the bottom of the file

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  threshold?: number
  once?: boolean
}

const FadeInComponent = ({
  children,
  className,
  delay = 0,
  duration = 275,
  direction = "up",
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
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [once, threshold])

  const directionClasses = {
    up: "translate-y-4",
    down: "translate-y-[-1rem]",
    left: "translate-x-4",
    right: "translate-x-[-1rem]",
    none: "",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isVisible ? "opacity-100 transform-none" : `opacity-0 ${directionClasses[direction]}`,
        className,
      )}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Export memoized component to prevent unnecessary rerenders
export const FadeIn = memo(FadeInComponent)

