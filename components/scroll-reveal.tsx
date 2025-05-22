"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useInView } from "react-intersection-observer"

interface ScrollRevealProps {
  children: ReactNode
  threshold?: number
  delay?: number
}

export default function ScrollReveal({ children, threshold = 0.1, delay = 0 }: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  })

  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView && elementRef.current) {
      const timer = setTimeout(() => {
        elementRef.current?.classList.add("animate-in")
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [inView, delay])

  return (
    <div
      ref={(node) => {
        // Assign to both refs
        if (node) {
          ref(node)
          elementRef.current = node
        }
      }}
      className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
    >
      {children}
    </div>
  )
}
