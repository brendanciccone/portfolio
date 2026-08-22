import type React from "react"
import { cn } from "@/lib/utils"

interface FigureFrameProps {
  number: string
  caption: string
  /* tight = 10px padding for images sharing a row; default = 12px full-width */
  padding?: "default" | "tight"
  /* lightbox = clickable still that dims on hover to signal zoom; comparison =
     a drag slider, which must NOT dim (its two stacked images would bleed
     through each other) and shouldn't imply a lightbox in the first place */
  variant?: "lightbox" | "comparison"
  className?: string
  children: React.ReactNode
}

export const FigureFrame = ({
  number,
  caption,
  padding = "default",
  variant = "lightbox",
  className,
  children,
}: FigureFrameProps): React.JSX.Element => {
  return (
    <figure className={className}>
      {/* Hover feedback lives on the mat, never on the image.

          The mockup's hairline and its float are both drop-shadows tracing the
          image's alpha, so anything that touches the image touches them too.
          Dimming it to opacity-90 took a tenth of the ink off a one-pixel line;
          swapping that for brightness-95 kept the end states level but still
          re-rasterised the whole filter chain over a 658px image on every frame
          of the transition. Both read as the edge flickering.

          The frame is the image's parent and sits outside the filter, so
          darkening its border says "this is clickable" without the filtered
          subtree changing at all. */}
      <div
        className={cn(
          "bg-mockup-frame border border-border rounded-xl",
          variant === "lightbox" &&
            "transition-colors duration-(--motion-touch) hover:border-foreground/25",
          padding === "tight" ? "p-2.5" : "p-3",
        )}
      >
        {/*
         * The frame holds absolutely still; only what's inside it moves.
         * data-wipe used to sit on the bordered element above, which meant the
         * scroll engine's 1.06 scale inflated the mat, the border and the
         * figure's edges together — a full-width figure measured 1043px wide
         * mid-wipe against a 984px content column, so it broke the grid every
         * other edge on the page is locked to. Clipping and scaling the
         * contents instead keeps the window fixed and lets the screenshot
         * settle into it.
         *
         * overflow-hidden contains the scale; the wipe's own clip-path does
         * the unmasking. Full-width figures take the longer wipe, since the
         * same speed across a larger area reads as hurried.
         */}
        {/* No overflow-hidden: it would clip the mockup's shadow the same way the
             old inset(0%) clip did. Containment during the wipe comes from the
             clip-path, which is inset while the screenshot is scaled up and
             opens past the edge once it settles. */}
        <div data-wipe className={cn("overflow-hidden rounded-md", padding === "default" && "wipe-long")}>
          {children}
        </div>
      </div>
      {/* Visually hidden: the on-page captions read as noise, but the figure
          descriptions still carry value for screen readers. Swap sr-only for
          "mt-2 text-xs text-muted-foreground"
          to show them again. */}
      <figcaption className="sr-only">
        Fig. {number}: {caption}
      </figcaption>
    </figure>
  )
}
