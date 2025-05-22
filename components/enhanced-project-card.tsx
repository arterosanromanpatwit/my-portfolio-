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
      >
        {/* Image only by default */}
        <div className="aspect-video overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay that appears on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-lg font-medium mb-1 text-white">{project.title}</h3>
            <p className="text-xs text-zinc-300 line-clamp-2 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-zinc-800/80 rounded-full text-zinc-400">
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs px-2 py-0.5 bg-zinc-800/80 rounded-full text-zinc-400">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
            <span className="text-xs text-blue-400 mt-2 inline-flex items-center">
              View details <ExternalLink size={10} className="ml-1" />
            </span>
          </div>
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
              initial={{ scale: 0.9, y: direction * 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: direction * 20 }}
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
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 p-2 bg-zinc-800/80 backdrop-blur-sm rounded-full hover:bg-zinc-700 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                <p className="text-zinc-400 mb-6">{project.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-zinc-300 mb-3">About this project</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{project.longDescription}</p>
                </div>

                {project.features && project.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-zinc-300 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="text-sm text-zinc-400 flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-zinc-800/80 rounded-full text-zinc-400 flex items-center"
                    >
                      <Tag size={12} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-blue-500/10 text-blue-400 px-3 py-2 rounded-md hover:bg-blue-500/20 transition-colors"
                    >
                      <ExternalLink size={14} /> View Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-zinc-800 px-3 py-2 rounded-md hover:bg-zinc-700 transition-colors"
                    >
                      <Github size={14} /> Source Code
                    </a>
                  )}
                  {project.solidworksUrl && (
                    <a
                      href={project.solidworksUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-zinc-800 px-3 py-2 rounded-md hover:bg-zinc-700 transition-colors"
                    >
                      <FolderOpen size={14} /> SolidWorks Files
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
