"use client"

import { useState, useEffect } from "react"

interface StaticPALogoProps {
  className?: string
}

export default function StaticPALogo({ className = "" }: StaticPALogoProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`pa-logo-container ${className}`}>
      <img src="/images/pa-logo.png" alt="PA Logo" className="w-full h-auto max-w-[300px]" />
    </div>
  )
}
