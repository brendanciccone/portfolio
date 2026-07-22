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
      {/* Lightbox stills dim slightly on hover to signal zoom, matching the
          home cards; comparison sliders opt out (see variant note above) */}
      <div
        className={cn(
          "bg-mockup-frame border border-border",
          variant === "lightbox" &&
            "[&_img]:transition-opacity [&_img]:duration-(--motion-settle) [&:hover_img]:opacity-90",
          padding === "tight" ? "p-2.5" : "p-3",
        )}
      >
        {children}
      </div>
      {/* Visually hidden: the on-page captions read as noise, but the figure
          descriptions still carry value for screen readers. Swap sr-only for
          "mt-2 text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
          to show them again. */}
      <figcaption className="sr-only">
        Fig. {number}: {caption}
      </figcaption>
    </figure>
  )
}
