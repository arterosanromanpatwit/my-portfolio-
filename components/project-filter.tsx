"use client"
import { motion } from "framer-motion"

interface ProjectFilterProps {
  categories: string[]
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function ProjectFilter({ categories, activeCategory, setActiveCategory }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`relative px-3 py-1 text-xs rounded-full transition-colors ${
            activeCategory === category ? "text-blue-100" : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {activeCategory === category && (
            <motion.span
              layoutId="activeCategory"
              className="absolute inset-0 bg-blue-500/20 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  )
}
