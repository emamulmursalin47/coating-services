/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ImageComparisonSliderProps {
  beforeImage?: string
  afterImage?: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export const ImageComparisonSlider = ({
  beforeImage = "/images/car-before.jpg",
  afterImage = "/images/car-after.jpg",
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: ImageComparisonSliderProps) => {
  const [isResizing, setIsResizing] = useState(false)
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)

  // Example images that will work without needing to provide external URLs
  const defaultBeforeImage = "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1000&auto=format&fit=crop"
  const defaultAfterImage = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000&auto=format&fit=crop"

  // Use provided images or fallback to defaults
  const beforeSrc = beforeImage.startsWith("/") ? defaultBeforeImage : beforeImage
  const afterSrc = afterImage.startsWith("/") ? defaultAfterImage : afterImage

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!isResizing || !containerRef.current) return

      // Prevent default browser behavior
      event.preventDefault()
      
      const clientX = "touches" in event ? event.touches[0].clientX : event.clientX
      //@ts-ignore
      const rect = containerRef.current.getBoundingClientRect()
      const position = ((clientX - rect.left) / rect.width) * 100

      setPosition(Math.min(Math.max(position, 0), 100))
    }

    const handleUp = () => {
      setIsResizing(false)
      document.body.style.cursor = "default"
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMove, { passive: false })
      document.addEventListener("touchmove", handleMove, { passive: false })
      document.addEventListener("mouseup", handleUp)
      document.addEventListener("touchend", handleUp)
      document.body.style.cursor = "ew-resize"
    }

    return () => {
      document.removeEventListener("mousemove", handleMove)
      document.removeEventListener("touchmove", handleMove)
      document.removeEventListener("mouseup", handleUp)
      document.removeEventListener("touchend", handleUp)
    }
  }, [isResizing])

  const handleMouseDown = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsResizing(true)
  }

  const handleTouchStart = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsResizing(true)
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-96 select-none overflow-hidden rounded-lg", 
        className
      )}
    >
      {/* Title labels for Before and After */}
      <div className="absolute top-0 left-0 w-full z-10 flex justify-between text-4xl font-bold text-white px-8 pt-4">
        <div className="drop-shadow-md">{beforeLabel}</div>
        <div className="drop-shadow-md">{afterLabel}</div>
      </div>

      {/* After Image (Full) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={afterSrc}
          alt={afterLabel}
          className="object-cover w-full h-full"
          draggable="false"
        />
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeLabel}
          className="object-cover w-full h-full"
          draggable="false"
        />
      </div>

      {/* Vertical divider line */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Slider Handle - with onDragStart prevention */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-20 cursor-ew-resize"
        style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDragStart={(e) => e.preventDefault()}
        draggable="false"
      >
        <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-gray-800"
          >
            <path d="m9 18 6-6-6-6"></path>
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}