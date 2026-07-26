"use client"

import { useState, useCallback, useEffect, useRef, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface LightboxSource {
  src: string
  alt: string
  width: number
  height: number
}

interface LightboxImageProps extends LightboxSource {
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
}

// Never-changing store: subscribers get no updates; the snapshot is simply
// "am I on the client" (true) vs. the server render (false)
const emptySubscribe = () => () => {}

/* Everything focusable the trap needs to cycle between */
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

interface LightboxState {
  isOpen: boolean
  open: () => void
  close: () => void
}

/*
 * Open/close plus the two things that must happen while open: Escape closes,
 * and the page behind stops scrolling. Split out from LightboxImage so a
 * trigger can live somewhere other than on the image itself — see
 * LightboxTrigger, which puts it on a card title so the whole card opens.
 */
export const useLightboxState = (): LightboxState => {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return { isOpen, open, close }
}

/*
 * The fullscreen overlay, portalled to <body> so it isn't trapped by an
 * ancestor that sets `translate`, `transform`, `scale`, `filter`, or
 * `perspective` — any of those create a new containing block for
 * fixed-positioned descendants and would clip the lightbox inside the card.
 *
 * Mounted only while open, so the full-size image's load state resets on
 * every open and the skeleton is always what shows first.
 *
 * aria-modal only tells assistive tech the rest of the page is inert; it does
 * nothing to the tab order. Without the trap below, Tab walked straight out of
 * the dialog and into the page the backdrop is covering, leaving a keyboard
 * user driving a page they cannot see.
 */
export const LightboxOverlay = ({
  src,
  alt,
  width,
  height,
  onClose,
}: LightboxSource & { onClose: () => void }): React.JSX.Element | null => {
  const [isLoaded, setIsLoaded] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    // Captured before we move focus, so it can be handed back on close —
    // otherwise dismissing the lightbox drops the user at the top of the page
    const previouslyFocused = document.activeElement
    const focusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))

    const [firstOnOpen] = focusable()
    firstOnOpen?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return

      const items = focusable()
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) {
        // Nothing to focus: keep Tab from escaping to the page behind
        event.preventDefault()
        return
      }

      const active = document.activeElement
      const escapingBackwards = event.shiftKey && (active === first || !dialog.contains(active))
      const escapingForwards = !event.shiftKey && (active === last || !dialog.contains(active))

      if (escapingBackwards) {
        event.preventDefault()
        last.focus()
        return
      }
      if (escapingForwards) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [isMounted])

  if (!isMounted) return null

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-(--motion-settle) sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-sm bg-white/10 p-2 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black animate-in fade-in duration-(--motion-settle) delay-100"
        aria-label="Close lightbox"
      >
        <X className="size-6 text-white" aria-hidden />
      </button>

      <div className="relative max-w-full max-h-full animate-in fade-in slide-in-from-bottom-4 duration-(--motion-settle) ease-out">
        {!isLoaded && (
          <Skeleton
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[min(45vh,400px)] w-[min(85vw,960px)] max-h-[90vh] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white/15"
          />
        )}
        <Image
          src={src}
          alt={alt}
          width={width * 2}
          height={height * 2}
          className={cn(
            "max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-sm transition-opacity duration-(--motion-settle)",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          quality={95}
          sizes="100vw"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>,
    document.body,
  )
}

// Lightbox image component - wraps an image and makes it clickable
export const LightboxImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority,
  quality = 80,
  sizes,
}: LightboxImageProps) => {
  const { isOpen, open, close } = useLightboxState()
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false)

  // Catch thumbnails that finished loading before React hydrated — the ref
  // callback fires on mount with the live node, ahead of onLoad
  const handleThumbnailRef = (node: HTMLImageElement | null) => {
    if (node?.complete) setIsThumbnailLoaded(true)
  }

  return (
    <>
      {/* Clickable image */}
      <button
        type="button"
        onClick={open}
        className="cursor-pointer md:cursor-zoom-in w-full block bg-mockup-frame"
        aria-label={`View ${alt} in fullscreen`}
      >
        <div className="relative">
          {!isThumbnailLoaded && (
            <Skeleton
              aria-hidden
              className="absolute inset-0 z-10 rounded-sm bg-mockup-frame"
            />
          )}
          <Image
            ref={handleThumbnailRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-opacity duration-(--motion-settle)",
              isThumbnailLoaded ? "opacity-100" : "opacity-0",
              className,
            )}
            priority={priority}
            quality={quality}
            sizes={sizes}
            onLoad={() => setIsThumbnailLoaded(true)}
          />
        </div>
      </button>

      {isOpen && <LightboxOverlay src={src} alt={alt} width={width} height={height} onClose={close} />}
    </>
  )
}
