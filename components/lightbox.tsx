"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface LightboxImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
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
  const thumbnailRef = useRef<HTMLImageElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLightboxImageLoaded, setIsLightboxImageLoaded] = useState(false)
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false)

  // Catch thumbnails that finished loading before React hydrated
  useEffect(() => {
    if (thumbnailRef.current?.complete) {
      setIsThumbnailLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsLightboxImageLoaded(false)
    }
  }, [isOpen])

  // Handle escape key to close
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }, [])

  // Add/remove event listener for escape key
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, handleKeyDown])

  return (
    <>
      {/* Clickable image */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer md:cursor-zoom-in w-full block bg-mockup-frame"
        aria-label={`View ${alt} in fullscreen`}
      >
        <div className="relative">
          {!isThumbnailLoaded && (
            <Skeleton
              aria-hidden
              className="absolute inset-0 z-10 rounded-sm"
            />
          )}
          <Image
            ref={thumbnailRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-opacity duration-300",
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

      {/* Lightbox overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200 sm:p-8"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button — scrim is always dark; use light chrome in both themes */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 rounded-sm bg-white/10 p-2 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black animate-in fade-in duration-300 delay-100"
            aria-label="Close lightbox"
          >
            <X className="size-6 text-white" aria-hidden />
          </button>

          {/* Full size image - clicking also closes */}
          <div className="relative max-w-full max-h-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out">
            {!isLightboxImageLoaded && (
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
                "max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-sm transition-opacity duration-300",
                isLightboxImageLoaded ? "opacity-100" : "opacity-0",
              )}
              quality={95}
              sizes="100vw"
              onLoad={() => setIsLightboxImageLoaded(true)}
            />
          </div>
        </div>
      )}
    </>
  )
}
