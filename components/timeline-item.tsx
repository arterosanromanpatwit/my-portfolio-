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
      {!isLast && (
        <motion.div
          className="absolute left-3 top-3 bottom-0 w-px bg-zinc-800"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}

      {/* Timeline dot */}
      <motion.div
        className="absolute left-0 top-3 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12, delay: index * 0.1 }}
        whileHover={{ scale: 1.2, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-blue-500"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="bg-zinc-900/50 rounded-lg p-4 hover:bg-zinc-900 transition-colors"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(59, 130, 246, 0.3)",
        }}
      >
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
      </motion.div>
    </motion.div>
  )
}
