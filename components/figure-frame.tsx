import type React from "react"
import { cn } from "@/lib/utils"

interface FigureFrameProps {
  number: string
  caption: string
  /* tight = 10px padding for images sharing a row; default = 12px full-width */
  padding?: "default" | "tight"
  className?: string
  children: React.ReactNode
}

export const FigureFrame = ({
  number,
  caption,
  padding = "default",
  className,
  children,
}: FigureFrameProps): React.JSX.Element => {
  return (
    <figure className={className}>
      {/* The frame takes no hover feedback at all, and the cursor carries the
          affordance on its own — the image inside is a button with
          cursor-zoom-in.

          It used to darken its border on hover. That was already the second
          answer: hover on the image itself was tried first and abandoned,
          because the mockup's hairline and its float are both drop-shadows
          tracing the image's alpha, so anything touching the image touches them
          too. Dimming to opacity-90 took a tenth of the ink off a one-pixel
          line; brightness-95 kept the end states level but re-rasterised the
          whole filter chain over a 658px image every frame. Both read as the
          edge flickering.

          Moving it to the border fixed the flicker but kept the underlying
          problem: the frame is a hairline in a page built out of hairlines, so
          darkening one of them reads as the edge changing rather than as an
          invitation. A frame that holds still is what the rest of the page
          does.

          That also retired the lightbox/comparison variant, which existed only
          to withhold this hover from the drag sliders. With no hover to
          withhold, the two are the same object. */}
      <div
        className={cn(
          "bg-mockup-frame border border-border rounded-xl",
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
