"use client"

import type React from "react"
import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const ROWS = 9
const COLS = 6
const HOME_ROW = 2
const HOME_COL = 4
const HOME_INDEX = HOME_ROW * COLS + HOME_COL
/* px radius of the cursor-proximity swell */
const RADIUS = 90
const CASCADE_STEP_MS = 30

/*
 * Decorative square-dot grid for the contact page. Dots cascade in diagonally
 * on load. While hovering, the single red square jumps to the dot nearest the
 * cursor and nearby dots swell; on leave everything returns home. All motion
 * is skipped under prefers-reduced-motion.
 */
export const DotGrid = (): React.JSX.Element => {
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
      if (el) el.style.transform = ""
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
          el.style.transform = proximity > 0 ? `scale(${1 + proximity * 0.9})` : ""
        })
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
                  "h-1.5 w-1.5 anim-dot transition-[transform,background-color] duration-150",
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
