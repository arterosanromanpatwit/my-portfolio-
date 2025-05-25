"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SectionNavProps {
  items: { id: string; label: string }[]
}

export default function SectionNav({ items }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show the nav after scrolling down a bit
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Determine which section is currently in view
      const sections = items.map((item) => document.getElementById(item.id))
      const currentSection = sections.find((section) => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -20,
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center space-y-6">
        {items.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={() => scrollToSection(item.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === item.id ? "bg-blue-500" : "bg-zinc-600 hover:bg-zinc-400"
              }`}
              aria-label={`Scroll to ${item.label}`}
            />
            <span className="absolute left-6 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-zinc-800/90 backdrop-blur-sm rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
