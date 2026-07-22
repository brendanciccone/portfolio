"use client"

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
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
    <div className="relative">
      {!isLoaded && (
        <Skeleton
          aria-hidden
          className="absolute inset-0 z-10 rounded-sm bg-mockup-frame"
        />
      )}
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
