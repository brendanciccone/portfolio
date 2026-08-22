"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface SectionNavItem {
  id: string
  label: string
}

/*
 * Fixed side rail for case-study sections. Only rendered at xl+ where the
 * viewport margin outside the content column can hold it.
 *
 * The rail is anchored to that column rather than the viewport edge: half the
 * column, plus 104px of rail and a 48px gutter, measured back from centre.
 * Pinned to the viewport instead, the gap would widen with the screen —
 * roughly 300px at 1920 and 600px at 2560 — stranding the rail by the bezel,
 * far from the text it indexes. It reads --page-width rather than hardcoding
 * the half-column, so narrowing the rail moves the nav with it; the max()
 * floor keeps it on-screen at the xl breakpoint, where the margin is only just
 * wide enough.
 */
export const SectionNav = ({ items }: { items: readonly SectionNavItem[] }): React.JSX.Element => {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Batch order isn't guaranteed; pick the topmost intersecting section
        // so the active marker is deterministic at boundaries
        const topmost = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (topmost) {
          setActiveId(topmost.target.id)
        }
      },
      // Fire when a section crosses the upper third of the viewport
      { rootMargin: "-15% 0px -70% 0px" },
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="Case study sections"
      className="hidden xl:block fixed left-[max(1.5rem,calc(50%_-_var(--page-width)/2_-_152px))] top-1/2 -translate-y-1/2 z-40"
    >
      <ul className="flex flex-col gap-3 max-w-[104px]">
        {items.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-xs leading-snug transition-colors duration-(--motion-touch)",
                  active ? "text-foreground font-semibold" : "text-ink-faint hover:text-foreground",
                )}
                aria-current={active ? "true" : undefined}
              >
                <span>{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
