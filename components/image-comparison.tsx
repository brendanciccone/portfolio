"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ImageComparisonProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  width: number
  height: number
}

// Before/After image comparison slider
export const ImageComparison = ({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  width,
  height,
}: ImageComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  // State (not just a ref) because dragging toggles the position transition:
  // click/keyboard jumps glide, live drags track the pointer 1:1
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const beforeRef = useRef<HTMLImageElement | null>(null)
  const afterRef = useRef<HTMLImageElement | null>(null)
  const [isBeforeLoaded, setIsBeforeLoaded] = useState(false)
  const [isAfterLoaded, setIsAfterLoaded] = useState(false)

  const isLoaded = isBeforeLoaded && isAfterLoaded

  // Catch images that finished loading before React hydrated
  useEffect(() => {
    if (beforeRef.current?.complete) {
      setIsBeforeLoaded(true)
    }
    if (afterRef.current?.complete) {
      setIsAfterLoaded(true)
    }
  }, [])

  // Handle mouse/touch movement
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    // Stops native image drag + selection highlight (blue flash) while dragging
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchStart = () => {
    setIsDragging(true)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 2
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setSliderPosition((p) => Math.max(0, p - step))
      return
    }
    if (e.key === "ArrowRight") {
      e.preventDefault()
      setSliderPosition((p) => Math.min(100, p + step))
      return
    }
    if (e.key === "Home") {
      e.preventDefault()
      setSliderPosition(0)
      return
    }
    if (e.key === "End") {
      e.preventDefault()
      setSliderPosition(100)
    }
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="group relative w-full cursor-ew-resize touch-none overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [-webkit-tap-highlight-color:transparent]"
      style={{ aspectRatio: `${width}/${height}` }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
    >
      {/* Skeleton overlay while images load */}
      {!isLoaded && (
        <Skeleton
          aria-hidden
          className="absolute inset-0 z-10 rounded-sm bg-mockup-frame"
        />
      )}

      {/* After image (background) */}
      <div className={cn("pointer-events-none absolute inset-0", !isLoaded && "opacity-0")}>
        <Image
          ref={afterRef}
          src={afterSrc}
          alt={afterAlt}
          fill
          draggable={false}
          className="object-cover select-none"
          quality={80}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 680px"
          onLoad={() => setIsAfterLoaded(true)}
        />
      </div>

      {/* Before image (clipped) — jumps glide on the settle curve; drags track 1:1 */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          !isLoaded && "opacity-0",
          !isDragging && "transition-[clip-path] duration-(--motion-settle) ease-(--ease-settle) motion-reduce:transition-none",
        )}
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          ref={beforeRef}
          src={beforeSrc}
          alt={beforeAlt}
          fill
          draggable={false}
          className="object-cover select-none"
          quality={80}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 680px"
          onLoad={() => setIsBeforeLoaded(true)}
        />
      </div>

      {/*
        Divider and handle, rebuilt to the site's own chrome.

        This was a 2px pure-black rule with a black rounded-square handle — the
        highest-contrast object on a page whose whole language is 1px hairlines
        and soft pills, so the control read louder than the work it exists to
        compare. It is a 1px rule now, foreground at 70% rather than zinc-950,
        keeping a white halo so it still separates over pale UI screenshots.

        The handle is the nav's object: a background-coloured circle with a
        hairline border and the float shadow. That is already what a piece of
        chrome floating over the page looks like here, so the slider stops
        inventing a second answer to a question the nav already answered.
      */}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-px -translate-x-1/2 bg-foreground/70 shadow-[0_0_0_1px_rgba(255,255,255,0.6)]",
          !isDragging && "transition-[left] duration-(--motion-settle) ease-(--ease-settle) motion-reduce:transition-none",
        )}
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider handle — acknowledges touch: grows on hover, sits down while dragging */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-[var(--shadow-float)]",
            "transition-[scale] duration-(--motion-touch) ease-out motion-reduce:transition-none",
            isDragging ? "scale-95" : "group-hover:scale-105",
          )}
        >
          <svg aria-hidden width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-foreground">
            <path d="M6 10L2 10M2 10L5 7M2 10L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 10L18 10M18 10L15 7M18 10L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 bg-foreground/80 text-background text-xs font-semibold px-2.5 py-0.5 rounded-full">
        Before
      </div>
      <div className="absolute bottom-3 right-3 bg-foreground/80 text-background text-xs font-semibold px-2.5 py-0.5 rounded-full">
        After
      </div>
    </div>
  )
}
