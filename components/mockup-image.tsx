"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MockupImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
}

export const MockupImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority,
  quality = 80,
  sizes,
}: MockupImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // Catch images that finished loading before React hydrated — the ref
  // callback fires on mount with the live node, ahead of onLoad
  const handleImageRef = (node: HTMLImageElement | null) => {
    if (node?.complete) setIsLoaded(true)
  }

  return (
    /*
     * Nothing opaque may live in here. An ancestor applies a drop-shadow chain
     * that traces this subtree's alpha, so a full-box placeholder made the
     * border and shadow draw around the whole image bounds while loading and
     * then snap inward to the artwork the moment it arrived. There used to be a
     * Skeleton here doing exactly that — and it was invisible anyway: it was
     * bg-mockup-frame, the same colour as the mat behind it, and animate-pulse
     * only animates opacity, so it was #fafafa fading over #fafafa.
     *
     * With it gone the shadow has no alpha to trace until the image itself
     * fades in, so the two arrive together on the same curve.
     */
    <div className="relative">
      <Image
        ref={handleImageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-(--motion-settle)",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
