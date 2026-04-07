"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

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
      {/* After image (background) */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          draggable={false}
          className="object-cover select-none"
          quality={80}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
        />
      </div>

      {/* Before image (clipped) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          draggable={false}
          className="object-cover select-none"
          quality={80}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
        />
      </div>

      {/* Dark line + handle: case-study shots are mostly light UI; reads clearly over pale backgrounds */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.35)]"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Slider handle */}
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm bg-zinc-950 shadow-md ring-1 ring-white/35">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-zinc-100">
            <path d="M6 10L2 10M2 10L5 7M2 10L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 10L18 10M18 10L15 7M18 10L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 bg-foreground/70 text-background text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-sm">
        Before
      </div>
      <div className="absolute bottom-3 right-3 bg-foreground/70 text-background text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-sm">
        After
      </div>
    </div>
  )
}
