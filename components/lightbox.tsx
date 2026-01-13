"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

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
  const [isOpen, setIsOpen] = useState(false)

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
        className="cursor-pointer w-full block"
        aria-label={`View ${alt} in fullscreen`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          quality={quality}
          sizes={sizes}
        />
      </button>

      {/* Lightbox overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors animate-in fade-in duration-300 delay-100"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Full size image - clicking also closes */}
          <div className="relative max-w-full max-h-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out">
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
              quality={95}
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  )
}
