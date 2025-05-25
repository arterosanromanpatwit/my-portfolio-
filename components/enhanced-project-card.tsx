"use client"

import { useState } from "react"
import { Github, ExternalLink, FolderOpen, X, Tag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface ProjectDetails {
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  date: string
  demoUrl?: string
  githubUrl?: string
  solidworksUrl?: string
  features?: string[]
}

interface EnhancedProjectCardProps {
  project: ProjectDetails
  index: number
}

export default function EnhancedProjectCard({ project, index }: EnhancedProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Alternate the animation direction based on index
  const direction = index % 2 === 0 ? 1 : -1

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-lg cursor-pointer"
        onClick={toggleExpand}
        whileHover={{ scale: 1.02 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image only by default */}
        <div className="aspect-video overflow-hidden">
          <motion.img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? "brightness(0.7)" : "brightness(1)",
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Overlay that appears on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/70 to-transparent flex flex-col justify-end p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-lg font-medium mb-1 text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-xs text-zinc-300 line-clamp-2 mb-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {project.description}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {project.tags.slice(0, 3).map((tag, i) => (
                <motion.span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-zinc-800/80 rounded-full text-zinc-400"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
              {project.tags.length > 3 && (
                <motion.span
                  className="text-xs px-2 py-0.5 bg-zinc-800/80 rounded-full text-zinc-400"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.45 }}
                >
                  +{project.tags.length - 3}
                </motion.span>
              )}
            </motion.div>
            <motion.span
              className="text-xs text-blue-400 mt-2 inline-flex items-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              View details <ExternalLink size={10} className="ml-1" />
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: direction * 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: direction * 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-zinc-900 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
                <motion.button
                  className="absolute top-4 right-4 p-2 bg-zinc-800/80 backdrop-blur-sm rounded-full hover:bg-zinc-700 transition-colors"
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="p-6">
                <motion.h2
                  className="text-2xl font-bold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h2>
                <motion.p
                  className="text-zinc-400 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {project.description}
                </motion.p>

                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-zinc-300 mb-3">About this project</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{project.longDescription}</p>
                </motion.div>

                {project.features && project.features.length > 0 && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="text-sm text-zinc-400 flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                        >
                          <span className="text-blue-400 mr-2">•</span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="text-xs px-2 py-1 bg-zinc-800/80 rounded-full text-zinc-400 flex items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {project.demoUrl && (
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-blue-500/10 text-blue-400 px-3 py-2 rounded-md hover:bg-blue-500/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={14} /> View Demo
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-zinc-800 px-3 py-2 rounded-md hover:bg-zinc-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={14} /> Source Code
                    </motion.a>
                  )}
                  {project.solidworksUrl && (
                    <motion.a
                      href={project.solidworksUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-zinc-800 px-3 py-2 rounded-md hover:bg-zinc-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FolderOpen size={14} /> SolidWorks Files
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
