"use client"

import type React from "react"
import { memo, useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const ROWS = 9
const COLS = 6
const HOME_ROW = 2
const HOME_COL = 4
const HOME_INDEX = HOME_ROW * COLS + HOME_COL
/* px radius of the cursor-proximity swell — wide enough that a whole
   cluster reacts, so the cursor drags a visible wave across the field */
const RADIUS = 150
/* A dot at the cursor grows to 1 + SWELL; neighbours scale down with distance */
const SWELL = 2.2
/* The active (red) dot gets a fixed, larger pop of its own so the current
   position reads as clearly lifted rather than merely recoloured */
const ACTIVE_SCALE = 3.6
const CASCADE_STEP_MS = 30

/*
 * Decorative square-dot grid for the contact page. Dots cascade in diagonally
 * on load. While hovering, the single red square jumps to the dot nearest the
 * cursor and nearby dots swell; on leave everything returns home. All motion
 * is skipped under prefers-reduced-motion.
 */
const DotGridComponent = (): React.JSX.Element => {
  const dotsRef = useRef<Array<HTMLSpanElement | null>>([])
  const centersRef = useRef<Array<{ x: number; y: number }> | null>(null)
  const redIndexRef = useRef(HOME_INDEX)
  const frameRef = useRef(0)

  const cacheCenters = useCallback(() => {
    centersRef.current = dotsRef.current.map((el) => {
      if (!el) return { x: -9999, y: -9999 }
      const rect = el.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    })
  }, [])

  const moveRedTo = useCallback((index: number) => {
    if (index === redIndexRef.current) return
    const prev = dotsRef.current[redIndexRef.current]
    const next = dotsRef.current[index]
    if (!next) return
    if (prev) {
      prev.classList.remove("bg-primary")
      prev.classList.add("bg-input")
    }
    next.classList.remove("bg-input")
    next.classList.add("bg-primary")
    redIndexRef.current = index
  }, [])

  const resetDots = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    for (const el of dotsRef.current) {
      if (el) el.style.scale = ""
    }
    moveRedTo(HOME_INDEX)
  }, [moveRedTo])

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const { clientX, clientY } = event
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        const centers = centersRef.current
        if (!centers) return
        let nearestIndex = redIndexRef.current
        let nearestDistance = Number.POSITIVE_INFINITY
        centers.forEach((center, index) => {
          const distance = Math.hypot(clientX - center.x, clientY - center.y)
          if (distance < nearestDistance) {
            nearestDistance = distance
            nearestIndex = index
          }
          const el = dotsRef.current[index]
          if (!el) return
          const proximity = Math.max(0, 1 - distance / RADIUS)
          // Drive the swell through the standalone `scale` property, not
          // `transform`: each dot's load animation (anim-dot, fill: both)
          // permanently owns `transform`, so an inline transform here would
          // be overridden by the cascade and never show. `scale` is a
          // separate property, so the two compose.
          el.style.scale = proximity > 0 ? String(1 + proximity * SWELL) : ""
        })
        // Override the nearest dot with the fixed active pop, so the red
        // square is always the biggest even when the cursor sits between dots
        const activeEl = dotsRef.current[nearestIndex]
        if (activeEl) activeEl.style.scale = String(ACTIVE_SCALE)
        moveRedTo(nearestIndex)
      })
    },
    [moveRedTo],
  )

  return (
    <div
      aria-hidden
      className="h-full flex flex-col justify-between"
      onPointerEnter={cacheCenters}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetDots}
    >
      {Array.from({ length: ROWS }).map((_, row) => (
        <div key={row} className="flex justify-between">
          {Array.from({ length: COLS }).map((_, col) => {
            const index = row * COLS + col
            return (
              <span
                key={col}
                ref={(el) => {
                  dotsRef.current[index] = el
                }}
                /* Diagonal cascade; the red square rides in with everyone else */
                style={{ animationDelay: `${(row + col) * CASCADE_STEP_MS}ms` }}
                className={cn(
                  "h-1.5 w-1.5 anim-dot transition-[scale,background-color] duration-150",
                  index === HOME_INDEX ? "bg-primary" : "bg-input",
                )}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

// Memoized so parent re-renders never re-run this JSX: the active dot's colour
// and swell are mutated imperatively (classList / style.scale on refs), and a
// re-render would reset every dot to its home className, desyncing from
// redIndexRef. The component takes no props, so memo pins it permanently.
export const DotGrid = memo(DotGridComponent)
