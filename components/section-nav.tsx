"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface SectionNavItem {
  id: string
  number: string
  label: string
}

/*
 * Fixed side rail for case-study sections. Only rendered at xl+ where the
 * viewport margin outside the 1024px content column can hold it.
 */
export const SectionNav = ({ items }: { items: readonly SectionNavItem[] }): React.JSX.Element => {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
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
      className="hidden xl:block fixed left-6 2xl:left-12 top-28 z-40"
    >
      <ul className="flex flex-col gap-3 max-w-[104px]">
        {items.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "flex gap-2 text-[10px] uppercase tracking-[0.08em] leading-snug transition-colors duration-150",
                  active ? "text-foreground font-semibold" : "text-ink-faint hover:text-foreground",
                )}
                aria-current={active ? "true" : undefined}
              >
                {/* Red marks the current position only, so it walks down the list on scroll */}
                <span className={cn("font-semibold", active && "text-primary")}>{item.number}</span>
                <span>{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
