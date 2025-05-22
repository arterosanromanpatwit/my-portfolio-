"use client"

import { useEffect, useState } from "react"

interface RotatingLogoProps {
  className?: string
}

export default function RotatingLogo({ className = "" }: RotatingLogoProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`rotating-logo-container ${className}`}>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotating-logo"
      >
        <path
          d="M60 10C32.4 10 10 32.4 10 60C10 87.6 32.4 110 60 110C87.6 110 110 87.6 110 60C110 32.4 87.6 10 60 10ZM60 105C35.1 105 15 84.9 15 60C15 35.1 35.1 15 60 15C84.9 15 105 35.1 105 60C105 84.9 84.9 105 60 105Z"
          fill="url(#paint0_linear)"
        />
        {/* P shape */}
        <path
          d="M45 35H65C70.5 35 75 39.5 75 45V55C75 60.5 70.5 65 65 65H50V85H45V35ZM50 40V60H65C67.8 60 70 57.8 70 55V45C70 42.2 67.8 40 65 40H50Z"
          fill="url(#paint1_linear)"
        />
        {/* A shape */}
        <path d="M75 85L90 35H85L73.5 75L62 35H57L72 85H75Z" fill="url(#paint2_linear)" />
        {/* Connecting element */}
        <path d="M65 60H50V65H65C67.8 65 70 62.8 70 60H65Z" fill="url(#paint3_linear)" />
        <defs>
          <linearGradient id="paint0_linear" x1="10" y1="60" x2="110" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="45" y1="60" x2="75" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="paint2_linear" x1="57" y1="60" x2="90" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="paint3_linear" x1="50" y1="62.5" x2="70" y2="62.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
