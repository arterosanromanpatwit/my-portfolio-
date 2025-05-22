"use client"

import { useState, useEffect } from "react"

interface InteractivePALogoProps {
  className?: string
}

export default function InteractivePALogo({ className = "" }: InteractivePALogoProps) {
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setIsClicked(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isClicked])

  if (!mounted) return null

  return (
    <div
      className={`interactive-logo-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(true)}
    >
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`interactive-logo ${isHovered ? "hovered" : ""} ${isClicked ? "clicked" : ""}`}
      >
        {/* Background circle with pulse effect */}
        <circle
          cx="150"
          cy="150"
          r="145"
          className="logo-bg"
          stroke={isHovered ? "#3b82f6" : "#1e3a8a"}
          strokeWidth="2"
          fill="transparent"
        />

        {/* P shape */}
        <path
          d="M70 60H130C147.673 60 162 74.327 162 92V128C162 145.673 147.673 160 130 160H100V240H70V60Z"
          className={`logo-letter ${isHovered ? "letter-hovered" : ""}`}
          fill={isClicked ? "#60a5fa" : isHovered ? "#3b82f6" : "#2563eb"}
        />

        {/* P inner shape */}
        <path d="M100 90V130H130C131.796 130 133 128.796 133 127V93C133 91.204 131.796 90 130 90H100Z" fill="#0f172a" />

        {/* A shape */}
        <path
          d="M138 240L190 60H220L272 240H242L230 200H180L168 240H138ZM190 170H220L205 120L190 170Z"
          className={`logo-letter ${isHovered ? "letter-hovered" : ""}`}
          fill={isClicked ? "#60a5fa" : isHovered ? "#3b82f6" : "#2563eb"}
        />
      </svg>
    </div>
  )
}
