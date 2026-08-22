"use client"

import type React from "react"
import { useRef } from "react"

/*
 * A lattice of dots with one live dot that follows the cursor, snapping from
 * lattice point to lattice point.
 *
 * PROPORTION IS THE CONSTRUCTION. The column count is fixed and the cell size
 * is fluid — repeat(30, minmax(0,1fr)) divides whatever width the rail has into
 * thirty equal parts, so there is never a partial column and never a remainder
 * pushed to one edge. Sizing cells in pixels and letting the count fall out of
 * the width leaves a ragged strip on the right at most viewports.
 *
 * Cells are aspect-square, so row height follows column width and the block's
 * height is a pure function of the rail: three rows is always 3/30 of the
 * width, which is 68px at the 680px desktop rail and 35px at 350px on a phone.
 * It cannot grow into the page on a wide screen, because it is measured in
 * columns rather than pixels.
 *
 * THE LIVE DOT IS ONE ELEMENT, NOT NINETY STATES. The obvious build is a hover
 * rule on every cell, which makes each dot light independently and turns the
 * lattice into a hover grid. What is wanted is a single black dot that moves,
 * so it is a single black dot that moves: one absolutely positioned element
 * whose translate is written from a pointermove handler.
 *
 * Written as CSS custom properties on the container rather than React state.
 * State would re-render all ninety cells on every mouse move for a change that
 * belongs to one of them; setting two properties on a ref moves the dot with no
 * render at all, and lets the transition on `translate` do the gliding between
 * points. The nearest point is arithmetic on the container's own box — no DOM
 * measurement per cell, no listeners on ninety children.
 */
const COLUMNS = 30
const ROWS = 3

export const DotGrid = (): React.JSX.Element => {
  const gridRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const grid = gridRef.current
    if (grid === null) return

    const bounds = grid.getBoundingClientRect()
    const cellWidth = bounds.width / COLUMNS
    const cellHeight = bounds.height / ROWS
    const clamp = (value: number, max: number) => Math.min(max, Math.max(0, value))
    const column = clamp(Math.floor((event.clientX - bounds.left) / cellWidth), COLUMNS - 1)
    const row = clamp(Math.floor((event.clientY - bounds.top) / cellHeight), ROWS - 1)

    grid.style.setProperty("--dot-x", `${(column + 0.5) * cellWidth}px`)
    grid.style.setProperty("--dot-y", `${(row + 0.5) * cellHeight}px`)
    grid.dataset.live = ""
  }

  const handlePointerLeave = () => {
    gridRef.current?.removeAttribute("data-live")
  }

  return (
    <div
      ref={gridRef}
      aria-hidden
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative grid w-full grid-cols-[repeat(30,minmax(0,1fr))]"
    >
      {Array.from({ length: COLUMNS * ROWS }, (_, index) => (
        <span key={index} className="flex aspect-square items-center justify-center">
          <span className="size-[3px] rounded-full bg-foreground/30" />
        </span>
      ))}

      {/* The live dot. translate carries the position and the -50% that centres
          it on the lattice point in one value, so the transition animates a
          single property. It starts at the top-left corner and is invisible
          until the first pointermove writes a position, which is why opacity is
          keyed off data-live rather than off hover — a dot fading in at 0,0
          before jumping to the cursor is the one frame this must not show. */}
      <span
        className="pointer-events-none absolute top-0 left-0 size-[3px] rounded-full bg-foreground opacity-0 transition-[translate,opacity] duration-(--motion-touch) ease-out [[data-live]>&]:opacity-100 motion-reduce:transition-none"
        style={{ translate: "calc(var(--dot-x, 0px) - 50%) calc(var(--dot-y, 0px) - 50%)" }}
      />
    </div>
  )
}
