"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/*
 * Hairline that draws itself left to right the moment it enters the viewport
 * (unlike the load-triggered .anim-rule, which plays whether or not anyone
 * can see it). Renders as a plain static rule under prefers-reduced-motion.
 */
export const DrawnRule = ({ className }: { className?: string }): React.JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <div aria-hidden ref={ref} className={cn("h-px bg-border", inView && "anim-rule", className)} />
}
