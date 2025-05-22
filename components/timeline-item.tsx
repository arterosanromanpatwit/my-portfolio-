"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

interface TimelineItemProps {
  title: string
  organization: string
  location: string
  period: string
  description: string
  index: number
  isLast?: boolean
}

export default function TimelineItem({
  title,
  organization,
  location,
  period,
  description,
  index,
  isLast = false,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline line */}
      {!isLast && <div className="absolute left-3 top-3 bottom-0 w-px bg-zinc-800"></div>}

      {/* Timeline dot */}
      <div className="absolute left-0 top-3 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      </div>

      {/* Content */}
      <div className="bg-zinc-900/50 rounded-lg p-4 hover:bg-zinc-900 transition-colors">
        <h3 className="text-base font-medium text-zinc-200">{title}</h3>
        <h4 className="text-sm font-medium text-blue-400 mb-1">{organization}</h4>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {location}
          </span>
        </div>

        <p className="text-sm text-zinc-400">{description}</p>
      </div>
    </motion.div>
  )
}
