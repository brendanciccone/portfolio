"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

/*
 * A number that counts up to itself, once, the first time it is seen.
 *
 * The rendered default is the final value, so the figure is correct in the
 * HTML before any script runs — the animation only ever replaces a correct
 * number with a correct number. The safety timeout exists because the count
 * runs on rAF: if the tab is throttled mid-count the frames stop arriving,
 * and a stat frozen at 3 of 8 would be a lie rather than a missing flourish.
 */

const DURATION_MS = 900
const SAFETY_SLACK_MS = 400
/* Cubic ease-out — quick off the mark with a long tail, so the number lands
   rather than stopping */
const easeOut = (progress: number): number => 1 - (1 - progress) ** 3

interface CountUpProps {
  to: number
  prefix?: string
  suffix?: string
}

export const CountUp = ({ to, prefix = "", suffix = "" }: CountUpProps): React.JSX.Element => {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(to)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let safety = 0
    let startedAt = 0

    const step = (now: number) => {
      if (!startedAt) startedAt = now
      const progress = Math.min((now - startedAt) / DURATION_MS, 1)
      setValue(Math.round(easeOut(progress) * to))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        frame = requestAnimationFrame(step)
        safety = window.setTimeout(() => {
          cancelAnimationFrame(frame)
          setValue(to)
        }, DURATION_MS + SAFETY_SLACK_MS)
      },
      { threshold: 0.4 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      if (safety) clearTimeout(safety)
    }
  }, [to])

  return (
    <span ref={ref}>
      {prefix}
      {/* Grouped so a four-figure stat counts up as 2,000 rather than 2000 —
          the separator appearing mid-count would read as a glitch */}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  )
}
