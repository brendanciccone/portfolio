"use client"

import type React from "react"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useFocusTrap, useIsMounted, useModalState, type ModalState } from "@/components/use-modal"
import { cn } from "@/lib/utils"

interface LightboxSource {
  src: string
  alt: string
  width: number
  height: number
}

interface LightboxImageProps extends LightboxSource {
  /* Short human label under the image in the viewer; defaults to alt */
  caption?: string
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
}

/*
 * Open/close plus Escape-to-close and a scroll lock on the page behind. Kept as
 * a named re-export because LightboxTrigger imports it by this name — the
 * implementation lives in use-modal alongside the focus trap.
 */
export const useLightboxState = (): ModalState => useModalState()

/*
 * The fullscreen viewer.
 *
 * The backdrop is the image itself, blown up and blurred past recognition,
 * rather than a flat black scrim. Flat black is a hole in the page: it says the
 * page is gone. A blurred wash of the thing you just opened keeps the colour of
 * it in the room, so the image reads as being lifted forward off the page
 * instead of replacing it. The scrim on top only exists to hold contrast for
 * the caption and the close button.
 *
 * Portalled to <body> so it isn't trapped by an ancestor that sets `translate`,
 * `transform`, `scale`, `filter`, or `perspective` — any of those create a new
 * containing block for fixed-positioned descendants and would clip the viewer
 * inside the card that opened it.
 *
 * Mounted only while open, so the full-size image's load state resets on every
 * open and the skeleton is always what shows first.
 */
export const LightboxOverlay = ({
  src,
  alt,
  width,
  height,
  caption,
  onClose,
}: LightboxSource & { caption?: string; onClose: () => void }): React.JSX.Element | null => {
  const [isLoaded, setIsLoaded] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const isMounted = useIsMounted()

  /* Shared by the backdrop and the image panel. Both are large empty surfaces
     and both need to dismiss; the check keeps a press on an actual child —
     the image, the close button — from counting. */
  const dismissOnEmptySpace = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target === event.currentTarget) onClose()
  }

  useFocusTrap(dialogRef, isMounted)

  if (!isMounted) return null

  return createPortal(
    <div
      ref={dialogRef}
      className="anim-dialog-backdrop fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 px-4 py-6 sm:px-8"
      /* Only a press that lands on empty space dismisses — a drag that starts
         on the image and releases outside it should not close the viewer */
      onMouseDown={dismissOnEmptySpace}
      role="dialog"
      aria-modal="true"
      aria-label={`${caption ?? alt}, fullscreen`}
    >
      {/*
        Ambient wash: the same image at low quality, blurred past recognition,
        with a scrim over it to hold contrast for the caption and close button.

        The opaque black base under it is load-bearing. A large blur samples
        beyond the element's own bounds, so the outermost ~80px of the blurred
        image fades toward transparent — and with only a 55% scrim over it, the
        page underneath ghosted through along the top edge, which put a legible
        copy of the nav inside the viewer. scale-150 pushes that fringe well off
        screen and the base guarantees nothing shows through even if it didn't.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black">
        <Image
          src={src}
          alt=""
          fill
          quality={20}
          sizes="100vw"
          className="scale-150 object-cover blur-[80px] saturate-150"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <button
        type="button"
        onClick={onClose}
        /* z-20 is load-bearing. This button and the image panel below it were
           both positioned with z-index auto, so they painted in DOM order and
           the panel — declared after — sat on top of the button. The panel is
           w-full and flex-1, so it covered most of the button's box: clicks
           landed on the image instead, and clicking the image does not close
           the viewer, so the X simply did nothing over much of its own area. */
        className="absolute top-4 right-4 z-20 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-(--motion-touch) hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
        aria-label="Close"
      >
        <X className="size-5" aria-hidden />
      </button>

      {/*
        The panel carries the same dismiss handler as the backdrop.

        It is w-full and flex-1, so the empty space around a contained image —
        which is most of the screen, and the whole of it beside a portrait
        shot — belongs to the panel rather than to the backdrop behind it. With
        the handler only on the backdrop there was almost nowhere left that
        actually closed the viewer: every point beside, above and below the
        image hit this element and did nothing.

        The target check still does the real work. Clicking the image itself
        leaves target as the <img>, so the picture stays put; only presses that
        land on this box's own background dismiss.
      */}
      <div
        className="anim-dialog-panel relative flex min-h-0 w-full flex-1 items-center justify-center"
        onMouseDown={dismissOnEmptySpace}
      >
        {!isLoaded && (
          <Skeleton
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(45vh,400px)] w-[min(85vw,960px)] max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/15"
          />
        )}
        <Image
          src={src}
          alt={alt}
          width={width * 2}
          height={height * 2}
          className={cn(
            "max-h-full w-auto max-w-full object-contain rounded-2xl transition-opacity duration-(--motion-settle)",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          quality={95}
          sizes="100vw"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Content, not a control. A <p> with a mouse handler is reachable by
          neither keyboard nor screen reader, and it adds nothing: Escape, the
          close button, and every empty region already dismiss. */}
      <p className="shrink-0 text-center text-sm font-semibold text-white">{caption ?? alt}</p>
    </div>,
    document.body,
  )
}

/* A thumbnail that opens itself in the viewer */
export const LightboxImage = ({
  src,
  alt,
  width,
  height,
  caption,
  className,
  priority,
  quality = 80,
  sizes,
}: LightboxImageProps): React.JSX.Element => {
  const { isOpen, open, close } = useLightboxState()

  // Catch thumbnails that finished loading before React hydrated — the ref
  // callback fires on mount with the live node, ahead of onLoad
  return (
    <>
      <button
        type="button"
        onClick={open}
        className="cursor-pointer md:cursor-zoom-in w-full block overflow-hidden rounded-md [filter:var(--drop-mockup)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`View ${alt} in fullscreen`}
      >
        <div className="relative">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            /* No load fade — see MockupImage for why. The ring is drawn from
               this image's alpha, and cross-fading the two puts them on one
               curve without putting them on one perceived arrival. */
            className={className}
            priority={priority}
            quality={quality}
            sizes={sizes}
          />
        </div>
      </button>

      {isOpen && (
        <LightboxOverlay src={src} alt={alt} width={width} height={height} caption={caption} onClose={close} />
      )}
    </>
  )
}
