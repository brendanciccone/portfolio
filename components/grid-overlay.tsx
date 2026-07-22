"use client"

import { useEffect, useState } from "react"

/*
 * The layout grid, on demand: pressing G draws the 12-column grid in red
 * hairlines over the page; G or Escape dismisses it. Deliberately hinted
 * nowhere — it exists for the visitor who suspects there's a grid and
 * checks. Ignores keystrokes while typing and all modifier combos.
 */
export const GridOverlay = (): React.JSX.Element | null => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      if (target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable='true']")) return

      if (event.key === "g" || event.key === "G") {
        setVisible((isVisible) => !isVisible)
        return
      }
      if (event.key === "Escape") setVisible(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!visible) return null

  return (
    /* Keyboard-summoned, so desktop-only by nature — hidden below md */
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div className="mx-auto h-full max-w-[1024px] px-5">
        <div className="grid h-full grid-cols-12 gap-6">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="h-full border-x border-primary/20 bg-primary/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  )
}
