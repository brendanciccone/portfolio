import type React from "react"

/*
 * A lattice of dots that fills the content rail exactly, and lights up under
 * the cursor.
 *
 * PROPORTION IS THE WHOLE CONSTRUCTION. The column count is fixed and the cell
 * size is fluid — grid-cols-[repeat(30,minmax(0,1fr))] divides whatever width
 * the rail has into thirty equal parts, so there is never a partial column and
 * never a remainder pushed to one edge. The alternative, sizing cells in pixels
 * and letting the count fall out of the width, leaves a ragged strip on the
 * right at most viewports.
 *
 * Cells are aspect-square, so row height follows column width and the lattice
 * stays square at every size. That also makes the block's height a pure
 * function of the rail: four rows is always 4/30 of the width, which is 91px at
 * the 680px desktop rail and 47px at 350px on a phone. It cannot grow into the
 * "decorative element eating the page" problem on a wide screen, because it is
 * measured in columns rather than pixels.
 *
 * Resting dots are foreground at 30% rather than solid. A hundred and twenty
 * solid marks would be the loudest thing on a page whose job is a form — the
 * lattice should read as texture until you touch it, and as a response once
 * you do.
 *
 * Hover lives on the cell, not the dot. The dot is 3px; the cell is 11-23px
 * depending on the rail, so the target is the cell and the dot is what
 * answers. Scale and colour move together on the touch duration, which is the
 * token the rest of the site's immediate feedback uses.
 */
const COLUMNS = 30
const ROWS = 4

export const DotGrid = (): React.JSX.Element => (
  <div
    aria-hidden
    className="grid w-full grid-cols-[repeat(30,minmax(0,1fr))]"
  >
    {Array.from({ length: COLUMNS * ROWS }, (_, index) => (
      <span
        key={index}
        className="group/dot flex aspect-square items-center justify-center"
      >
        <span className="size-[3px] rounded-full bg-foreground/30 transition-[scale,background-color] duration-(--motion-touch) ease-out group-hover/dot:scale-[1.8] group-hover/dot:bg-foreground motion-reduce:transition-none" />
      </span>
    ))}
  </div>
)
