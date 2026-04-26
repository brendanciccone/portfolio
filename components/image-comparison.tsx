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

export const ImageComparison = ({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  width,
  height,
}: ImageComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const beforeRef = useRef<HTMLImageElement | null>(null)
  const afterRef = useRef<HTMLImageElement | null>(null)
  const [isBeforeLoaded, setIsBeforeLoaded] = useState(false)
  const [isAfterLoaded, setIsAfterLoaded] = useState(false)

  const isLoaded = isBeforeLoaded && isAfterLoaded

  useEffect(() => {
    if (beforeRef.current?.complete) {
      setIsBeforeLoaded(true)
    }
    if (afterRef.current?.complete) {
      setIsAfterLoaded(true)
    }
  }, [])

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    handleMove(e.clientX)
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
      className="relative w-full cursor-ew-resize touch-none overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [-webkit-tap-highlight-color:transparent]"
      style={{ aspectRatio: `${width}/${height}` }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
    >
      {!isLoaded ? (
        <Skeleton aria-hidden className="absolute inset-0 z-10 bg-mockup-frame" />
      ) : null}

      <div className={cn("pointer-events-none absolute inset-0", !isLoaded && "opacity-0")}>
        <Image
          ref={afterRef}
          src={afterSrc}
          alt={afterAlt}
          fill
          draggable={false}
          className="object-cover select-none"
          quality={80}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
          onLoad={() => setIsAfterLoaded(true)}
        />
      </div>

      <div
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", !isLoaded && "opacity-0")}
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
          onLoad={() => setIsBeforeLoaded(true)}
        />
      </div>

      {/* Hairline + handle in ink */}
      <div
        className="absolute top-0 bottom-0 w-px bg-foreground"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-foreground text-background border border-foreground">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M6 10L2 10M2 10L5 7M2 10L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 10L18 10M18 10L15 7M18 10L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Mono labels */}
      <div className="absolute bottom-3 left-3 bg-foreground text-background text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-1 leading-none">
        Before
      </div>
      <div className="absolute bottom-3 right-3 bg-foreground text-background text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-1 leading-none">
        After
      </div>
    </div>
  )
}
