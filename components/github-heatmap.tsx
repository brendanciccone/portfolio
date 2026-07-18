"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"
import { cn } from "@/lib/utils"

const CONTRIBUTIONS_ENDPOINT = "https://github-contributions-api.jogruber.de/v4/brendanciccone?y=last"

const contributionsSchema = z.object({
  total: z.object({ lastYear: z.number() }),
  contributions: z.array(
    z.object({
      date: z.string(),
      count: z.number(),
      level: z.number().min(0).max(4),
    }),
  ),
})

type Contributions = z.infer<typeof contributionsSchema>

/* Intensity scale in the site's single accent, level 0 = empty mat square */
const levelClasses = [
  "bg-muted",
  "bg-primary/30",
  "bg-primary/55",
  "bg-primary/80",
  "bg-primary",
] as const

type FetchState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: Contributions }

export const GitHubHeatmap = (): React.JSX.Element => {
  const [state, setState] = useState<FetchState>({ status: "loading" })
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // On narrow screens the grid overflows; start scrolled to the right so the
  // most recent weeks are what's visible first
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [])

  // Hold the skeleton until the grid is actually on screen so the
  // left-to-right sweep plays when someone can see it
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      try {
        const response = await fetch(CONTRIBUTIONS_ENDPOINT, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Contributions API responded ${response.status}`)
        }
        const raw: unknown = await response.json()
        const parsed = contributionsSchema.safeParse(raw)
        if (!parsed.success) {
          throw new Error("Contributions API returned an unexpected shape")
        }
        setState({ status: "ready", data: parsed.data })
      } catch (error) {
        if (controller.signal.aborted) return
        console.error("Failed to load GitHub contributions:", error)
        setState({ status: "error" })
      }
    }

    void load()
    return () => controller.abort()
  }, [])

  if (state.status === "error") {
    return (
      <p className="text-xs text-muted-foreground">
        Couldn&apos;t load GitHub activity right now.{" "}
        <a
          href="https://github.com/brendanciccone"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          View it on GitHub
        </a>
        .
      </p>
    )
  }

  const showData = state.status === "ready" && inView
  const days = showData && state.status === "ready" ? state.data.contributions : []
  // Pad the first week so columns align to weekdays (rows: Sun..Sat)
  const leadingEmpty = days.length > 0 ? new Date(`${days[0].date}T00:00:00`).getDay() : 0
  const cells: Array<Contributions["contributions"][number] | null> = [
    ...Array.from({ length: leadingEmpty }, () => null),
    ...days,
  ]
  const weeks: Array<typeof cells> = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  // Loading: render a full empty grid at the same size to avoid layout shift
  const skeletonWeeks = Array.from({ length: 53 }, () => Array.from({ length: 7 }, () => null))
  const grid = showData ? weeks : skeletonWeeks

  return (
    <div ref={containerRef}>
      <div ref={scrollRef} className="overflow-x-auto pb-1">
        <div className="flex gap-[3px] w-max">
          {grid.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className={cn("flex flex-col gap-[3px]", showData && "anim-dot")}
              /* Left-to-right sweep as the year washes in */
              style={showData ? { animationDelay: `${weekIndex * 10}ms` } : undefined}
            >
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const day = week[dayIndex]
                return (
                  <div
                    key={dayIndex}
                    title={day ? `${day.count} contributions on ${day.date}` : undefined}
                    className={cn("h-2.5 w-2.5", day ? levelClasses[day.level] : "bg-transparent")}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={cn("mt-4 flex items-center justify-between gap-4", showData && "anim-rise [animation-delay:550ms]")}>
        <p className="text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          {state.status === "ready"
            ? `${state.data.total.lastYear.toLocaleString("en-US")} contributions in the last year`
            : "Loading contributions"}
        </p>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>Less</span>
          {levelClasses.map((level) => (
            <span key={level} className={cn("h-2.5 w-2.5", level)} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
