"use client"

import type React from "react"
import { LightboxOverlay, useLightboxState } from "@/components/lightbox"
import { cn } from "@/lib/utils"

/*
 * Opens a lightbox from somewhere other than the image — specifically from a
 * card title, with the hit area stretched over the whole card.
 *
 * Why not simply widen LightboxImage's own button: a pseudo-element sized to
 * `inset-0` resolves against the nearest *positioned* ancestor, and inside a
 * work card that is the `relative overflow-hidden` wrapper the screenshot
 * needs in order to be clipped while it swells. The overlay stopped at the
 * image and was clipped besides. Mounting the trigger in the text block —
 * which is neither positioned nor clipped — lets `inset-0` reach the card
 * root instead.
 *
 * Why not wrap the entire card in a <button>: a button's content model is
 * phrasing content, so a heading and paragraphs inside one is invalid, and
 * headings nested in a button are unreliably announced. Wrapping just the
 * title keeps the markup legal and leaves one tab stop for one action.
 *
 * The card root must therefore be positioned and must NOT clip its overflow.
 */
interface LightboxTriggerProps {
  src: string
  alt: string
  width: number
  height: number
  /* Shown under the image in the viewer — the project name, where alt is a
     long description written for screen readers rather than for reading */
  title?: string
  className?: string
  children: React.ReactNode
}

export const LightboxTrigger = ({
  src,
  alt,
  width,
  height,
  title,
  className,
  children,
}: LightboxTriggerProps): React.JSX.Element => {
  const { isOpen, open, close } = useLightboxState()

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`View ${alt} in fullscreen`}
        className={cn(
          "text-left cursor-pointer md:cursor-zoom-in",
          "after:absolute after:inset-0 after:z-10 after:content-['']",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
      >
        {children}
      </button>

      {isOpen && (
        <LightboxOverlay src={src} alt={alt} width={width} height={height} caption={title} onClose={close} />
      )}
    </>
  )
}
