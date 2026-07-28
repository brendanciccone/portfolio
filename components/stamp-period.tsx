import type React from "react"
import { cn } from "@/lib/utils"

/*
 * The mark: the red square that ends the hero, the About and Contact titles,
 * the 404, the sent-message confirmation, and the footer byline. It matches
 * app/icon.svg, which is a literal square rect.
 *
 * Drawn rather than typeset. It used to be an Archivo period, whose glyph is
 * square; Inter's is round and no stylistic set squares it, so the mark had to
 * stop depending on the typeface. Now it survives any future type change.
 *
 * Every dimension is em-relative, so the same component serves the 72px hero
 * and the 12px footer. The numbers are Inter's own period metrics at the
 * display weight — 0.1875em tall on a 0.3525em advance — so the square keeps
 * the spacing and mass of the glyph it replaces. It sits flat on the baseline
 * rather than dipping below it the way the round dot does: overshoot is an
 * optical correction for curves, and a square that used it would read as
 * sunken.
 */
export const StampPeriod = ({ className }: { className?: string }): React.JSX.Element => (
  <span className={cn("relative inline-block size-[0.19em] bg-primary mx-[0.08em]", className)}>
    {/* The period stays in the text so copy/paste and screen readers get the
        sentence, not a gap. sr-only is out of flow, so it can't disturb the
        box's baseline alignment. */}
    <span className="sr-only">.</span>
  </span>
)
