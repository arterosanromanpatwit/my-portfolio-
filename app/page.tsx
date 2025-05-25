"use client"

import { useState, useEffect } from "react"
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  X,
  Clock,
  GraduationCap,
  Building,
  MapPin,
  Sparkles,
  Bell,
} from "lucide-react"
import TypeAnimation from "@/components/type-animation"
import ParticleBackground from "@/components/particle-background"
import EnhancedProjectCard, { type ProjectDetails } from "@/components/enhanced-project-card"
import TimelineItem from "@/components/timeline-item"
import ScrollIndicator from "@/components/scroll-indicator"
import ScrollProgress from "@/components/scroll-progress"
import BackToTop from "@/components/back-to-top"
import SectionNav from "@/components/section-nav"
import SectionTransition from "@/components/section-transition"
import Tooltip from "@/components/tooltip"
import { motion, AnimatePresence } from "framer-motion"

// Photo data with locations
interface PhotoData {
  src: string
  alt: string
  location: string
}

const photoData: PhotoData[] = [
  {
    src: "/images/dubai-desert.jpg",
    alt: "Desert Walk",
    location: "Dubai, United Arab Emirates",
  },
  {
    src: "/images/boston-skyline.jpg",
    alt: "Boston Skyline",
    location: "Boston, Massachusetts, USA",
  },
  {
    src: "/images/acadia-national-park.jpg",
    alt: "Forest Trail",
    location: "Acadia National Park, Maine, USA",
  },
  {
    src: "/images/hermita-de-san-salvador.jpg",
    alt: "Mountain View",
    location: "Hermita de San Salvador, Spain",
  },
]

// Project data
const projectsData: ProjectDetails[] = [
  {
    title: "Automated Assembly Line",
    description: "A fully modeled and simulated automated assembly system for automotive components.",
    longDescription:
      "This project involved the complete design and simulation of an automated assembly line for automotive components. I created detailed 3D models of each component and simulated the entire assembly process to optimize efficiency and identify potential issues before implementation. The system includes robotic arms, conveyor belts, and custom fixtures all designed in SolidWorks.",
    tags: ["SolidWorks", "Simulation", "CAD", "Automation", "Manufacturing"],
    image: "/sleek-product-showcase.png",
    date: "March 2025",
    demoUrl: "#",
    githubUrl: "https://github.com/pabloartero/assembly-line",
    solidworksUrl: "#",
    features: [
      "Parametric 3D models of all assembly components",
      "Motion simulation of the entire assembly process",
      "Collision detection and path optimization",
      "Detailed bill of materials and manufacturing drawings",
      "Integration with robotic control systems",
    ],
  },
  {
    title: "Structural Analysis Tool",
    description: "A computational tool for analyzing stress and strain in complex mechanical structures.",
    longDescription:
      "I developed a computational tool that performs finite element analysis on complex mechanical structures. The tool takes CAD models as input and generates detailed stress and strain analyses, helping engineers identify potential failure points and optimize their designs. The software integrates with SolidWorks and can export results in various formats for further analysis.",
    tags: ["MATLAB", "Python", "FEA", "Structural Analysis", "CAD Integration"],
    image: "/task-management-dashboard.png",
    date: "January 2025",
    githubUrl: "https://github.com/pabloartero/structural-analysis",
    features: [
      "Integration with SolidWorks for seamless model import",
      "Custom meshing algorithms for accurate analysis",
      "Visualization of stress and strain distributions",
      "Parametric studies for design optimization",
      "Export capabilities for reports and presentations",
    ],
  },
  {
    title: "Fluid Dynamics Simulator",
    description: "An interactive simulator that visualizes fluid flow around mechanical components.",
    longDescription:
      "This project is an interactive fluid dynamics simulator that visualizes how fluids flow around mechanical components. Using computational fluid dynamics (CFD) principles, the simulator helps engineers understand and optimize their designs for better fluid interaction. The tool features a user-friendly interface and can import models directly from SolidWorks.",
    tags: ["CFD", "Python", "Visualization", "Fluid Dynamics", "Interactive"],
    image: "/weather-thumbnail.png",
    date: "November 2024",
    demoUrl: "#",
    githubUrl: "https://github.com/pabloartero/fluid-simulator",
    features: [
      "Real-time fluid flow visualization",
      "Adjustable fluid properties and boundary conditions",
      "Heat transfer analysis capabilities",
      "Export of simulation results as animations",
      "Comparison tools for design iterations",
    ],
  },
  {
    title: "CAD Component Library",
    description: "A comprehensive library of parametric components for rapid mechanical design.",
    longDescription:
      "I created a comprehensive library of parametric components that can be easily customized and integrated into mechanical designs. This library significantly speeds up the design process by providing ready-to-use components that can be adjusted to specific requirements. The library includes fasteners, structural elements, mechanical components, and more, all created in SolidWorks with full parametric control.",
    tags: ["SolidWorks", "Parametric Design", "API", "Component Library", "Design Automation"],
    image: "/dark-portfolio-showcase.png",
    date: "September 2024",
    solidworksUrl: "#",
    features: [
      "Over 500 fully parametric components",
      "Automated sizing and compatibility checks",
      "Custom property management for BOM integration",
      "API for programmatic component generation",
      "Comprehensive documentation and usage examples",
    ],
  },
]

// Education data
const educationData = [
  {
    title: "Bachelor of Science in Mechanical Engineering",
    organization: "Wentworth Institute of Technology",
    location: "Boston, MA",
    period: "2023 - Present",
    description:
      "Pursuing a degree in Mechanical Engineering with a minor in Computer Science. Focusing on mechanical design, CAD modeling, and computational engineering applications.",
  },
  {
    title: "Primary and Secondary School",
    organization: "Colegio de Fomento Montearagon",
    location: "Zaragoza, Spain",
    period: "2011 - 2023",
    description:
      "Technological Highschool program with advanced coursework in mathematics, physics, and computer science.",
  },
]

// Experience data
const experienceData = [
  {
    title: "Engineering Intern",
    organization: "TechnoQ",
    location: "Zaragoza, Spain",
    period: "Summer 2024",
    description:
      "Created detailed 3D designs and CAD models for engineering projects. Developed technical drawings and specifications for mechanical components. Assisted in the optimization of product designs for manufacturing efficiency.",
  },
]

// Article data
const articleData = [
  {
    date: "20/03/25",
    title: "Aim your goals",
    readTime: 4,
    link: "#",
  },
  {
    date: "15/03/25",
    title: "Is there a way to know what you really want?",
    readTime: 3,
    link: "#",
  },
]

// Navigation items for anchor links
const navigationItems = [
  { id: "home", label: "Home" },
  { id: "personal", label: "About Me" },
  { id: "education", label: "Education & Experience" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const [expandedPhoto, setExpandedPhoto] = useState<number | null>(null)
  const [activeTimeline, setActiveTimeline] = useState<"education" | "experience">("education")
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null)
  const [showNotification, setShowNotification] = useState(false)

  // Handle intersection observer to update active section
  useEffect(() => {
    setMounted(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  // Handle escape key to close expanded photo
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (expandedPhoto !== null) {
          setExpandedPhoto(null)
        }
        if (expandedArticle !== null) {
          setExpandedArticle(null)
        }
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [expandedPhoto, expandedArticle])

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle notification for coming soon articles
  const handleNotifyMe = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Full-screen Particle Background */}
      <ParticleBackground />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Section Navigation */}
      <SectionNav items={navigationItems} />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Main Content */}
      <main className="w-full relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Home Section - Centered in the middle */}
          <section id="home" className="relative min-h-screen w-full flex flex-col justify-center items-center">
            {/* Content */}
            <motion.div
              className="relative z-10 text-center max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                className="text-xs font-mono text-blue-500 mb-2 block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Hello, I'm
              </motion.span>
              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Pablo Artero
              </motion.h2>

              {/* Fixed Typing Animation */}
              <motion.div
                className="h-12 mb-10 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <TypeAnimation
                  phrases={["Mechanical Engineering", "Computer Science", "SolidWorks Expert", "CAD Designer"]}
                />
              </motion.div>

              <motion.p
                className="text-sm md:text-base text-zinc-400 mb-12 max-w-lg mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                Creating precise, functional designs at the intersection of mechanical engineering and computer science.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                <Tooltip content="View my portfolio projects">
                  <motion.button
                    onClick={() => scrollToSection("projects")}
                    className="inline-flex items-center gap-1 text-sm bg-blue-500/10 text-blue-400 px-4 py-2 rounded-md hover:bg-blue-500/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View my work <ArrowUpRight size={16} />
                  </motion.button>
                </Tooltip>
                <Tooltip content="Get in touch with me">
                  <motion.button
                    onClick={() => scrollToSection("contact")}
                    className="inline-flex items-center gap-1 text-sm bg-zinc-800 px-4 py-2 rounded-md hover:bg-zinc-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact me
                  </motion.button>
                </Tooltip>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <ScrollIndicator targetId="personal" />
          </section>

          {/* Personal Section (About Me) */}
          <section id="personal" className="py-10">
            <div className="sticky top-0 py-4 bg-zinc-950 z-10">
              <span className="text-xs font-mono text-blue-500 mb-1 block">PERSONAL</span>
              <h2 className="text-xl font-bold">About Me</h2>
            </div>

            <div className="mt-6 space-y-8">
              {/* Personal statement */}
              <SectionTransition>
                <div className="max-w-2xl">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Originally from Zaragoza, Spain, I'm currently based in Boston where I'm pursuing my junior year in
                    college. My academic journey combines mechanical engineering with computer science, allowing me to
                    approach problems from both physical and computational perspectives.
                  </p>
                  <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                    When I'm not designing or coding, I enjoy exploring the intersection of engineering and technology.
                    I'm passionate about mechanical design, 3D modeling, and finding innovative solutions to complex
                    problems. I'm currently focused on developing my skills in Java, SolidWorks, and Python to create
                    more sophisticated engineering solutions.
                  </p>
                </div>
              </SectionTransition>

              <SectionTransition delay={0.2}>
                <div className="mt-6">
                  <h3 className="text-xs font-semibold mb-3 text-zinc-300">Currently working with</h3>
                  <div className="flex flex-wrap gap-2">
                    {["SolidWorks", "Java", "Python", "CAD"].map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="text-xs px-3 py-1 bg-zinc-800/60 rounded-full text-zinc-400 hover:bg-zinc-700 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </SectionTransition>

              {/* Enhanced Photo gallery with click-to-expand functionality */}
              <SectionTransition delay={0.4}>
                <div className="relative h-72 md:h-96 photo-gallery">
                  {photoData.map((photo, index) => (
                    <motion.div
                      key={index}
                      className={`absolute ${
                        index === 0
                          ? "top-0 left-0 w-[45%] h-[90%] transform -rotate-3"
                          : index === 1
                            ? "top-4 left-[25%] w-[45%] h-[90%] transform rotate-2 z-10"
                            : index === 2
                              ? "top-0 right-[15%] w-[45%] h-[90%] transform -rotate-1 z-20"
                              : "top-6 right-0 w-[45%] h-[90%] transform rotate-3 z-30"
                      } hover:rotate-0 transition-all duration-300 cursor-pointer`}
                      onMouseEnter={() => setActivePhoto(index)}
                      onMouseLeave={() => setActivePhoto(null)}
                      onClick={() => setExpandedPhoto(index)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 * index }}
                      whileHover={{ scale: 1.03, rotate: 0, y: -5, zIndex: 50 }}
                    >
                      <img
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        className={`w-full h-full object-cover rounded-lg border-4 ${
                          activePhoto === index ? "border-blue-500/30" : "border-zinc-900"
                        } transition-all duration-300`}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm rounded-b-lg opacity-0 hover:opacity-100 transition-opacity"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <p className="text-xs text-white text-center">{photo.location}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </SectionTransition>

              {/* Expanded Photo Modal */}
              <AnimatePresence>
                {expandedPhoto !== null && (
                  <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setExpandedPhoto(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-lg"
                      onClick={(e) => e.stopPropagation()}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: "spring", damping: 25 }}
                    >
                      <img
                        src={photoData[expandedPhoto].src || "/placeholder.svg"}
                        alt={photoData[expandedPhoto].alt}
                        className="w-full h-auto max-h-[80vh] object-contain rounded-t-lg"
                      />
                      <div className="bg-zinc-900/90 p-4 rounded-b-lg">
                        <div className="flex items-center text-blue-400">
                          <MapPin size={16} className="mr-2" />
                          <p className="text-sm">{photoData[expandedPhoto].location}</p>
                        </div>
                      </div>
                      <motion.button
                        className="absolute top-4 right-4 p-2 bg-zinc-800/80 backdrop-blur-sm rounded-full hover:bg-zinc-700 transition-colors"
                        onClick={() => setExpandedPhoto(null)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={20} />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Education and Experience Section */}
          <section id="education" className="py-10">
            <div className="sticky top-0 py-4 bg-zinc-950 z-10">
              <span className="text-xs font-mono text-blue-500 mb-1 block">BACKGROUND</span>
              <h2 className="text-xl font-bold mb-4">Education & Experience</h2>

              <div className="flex space-x-2">
                <motion.button
                  onClick={() => setActiveTimeline("education")}
                  className={`relative px-4 py-1.5 text-sm rounded-md transition-colors ${
                    activeTimeline === "education" ? "text-blue-100" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeTimeline === "education" && (
                    <motion.span
                      className="absolute inset-0 bg-blue-500/20 rounded-md"
                      layoutId="timelineBackground"
                      transition={{ type: "spring", damping: 20 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    <GraduationCap size={16} className="mr-2" /> Education
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => setActiveTimeline("experience")}
                  className={`relative px-4 py-1.5 text-sm rounded-md transition-colors ${
                    activeTimeline === "experience" ? "text-blue-100" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeTimeline === "experience" && (
                    <motion.span
                      className="absolute inset-0 bg-blue-500/20 rounded-md"
                      layoutId="timelineBackground"
                      transition={{ type: "spring", damping: 20 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    <Building size={16} className="mr-2" /> Experience
                  </span>
                </motion.button>
              </div>
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {activeTimeline === "education" ? (
                  <motion.div
                    key="education"
                    className="pl-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {educationData.map((item, index) => (
                      <TimelineItem key={index} {...item} index={index} isLast={index === educationData.length - 1} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="experience"
                    className="pl-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {experienceData.map((item, index) => (
                      <TimelineItem key={index} {...item} index={index} isLast={index === experienceData.length - 1} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Enhanced Projects Section */}
          <section id="projects" className="py-10">
            <div className="sticky top-0 py-4 bg-zinc-950 z-10">
              <span className="text-xs font-mono text-blue-500 mb-1 block">Portfolio</span>
              <h2 className="text-xl font-bold">Selected Projects</h2>
            </div>

            <SectionTransition>
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectsData.map((project, index) => (
                    <EnhancedProjectCard key={project.title} project={project} index={index} />
                  ))}
                </div>
              </div>
            </SectionTransition>
          </section>

          {/* Writing Section */}
          <section id="writing" className="py-10">
            <div className="sticky top-0 py-4 bg-zinc-950 z-10">
              <span className="text-xs font-mono text-blue-500 mb-1 block">WRITING</span>
              <h2 className="text-xl font-bold">Recent Articles</h2>
            </div>

            <SectionTransition>
              <div className="mt-6 space-y-4">
                {articleData.map((article, index) => (
                  <motion.div
                    key={index}
                    className="group flex justify-between items-center border-b border-zinc-800/50 pb-3 hover:border-zinc-700/50 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(39, 39, 42, 0.3)", borderColor: "rgba(59, 130, 246, 0.3)" }}
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-zinc-500">{article.date}</span>
                      <button
                        onClick={() => setExpandedArticle(index)}
                        className="text-sm md:text-base font-medium text-left group-hover:text-blue-400 transition-colors"
                      >
                        {article.title}
                      </button>
                    </div>
                    <div className="flex items-center text-zinc-500 text-xs">
                      <Clock size={12} className="mr-1" />
                      <span>{article.readTime} m</span>
                    </div>
                  </motion.div>
                ))}

                {/* Coming Soon Articles with Notification Feature */}
                <motion.div
                  className="mt-8 bg-zinc-900/50 rounded-lg p-6 border border-zinc-800/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)", borderColor: "rgba(59, 130, 246, 0.3)" }}
                >
                  <div className="flex items-center mb-4">
                    <Sparkles className="text-blue-400 mr-2" size={18} />
                    <h3 className="text-lg font-medium text-zinc-200">Coming Soon</h3>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4">
                    I'm working on more articles about engineering, design, and personal development. Subscribe to be
                    notified when new content is published.
                  </p>
                  <div className="flex items-center">
                    <motion.button
                      onClick={handleNotifyMe}
                      className="flex items-center gap-1 text-sm bg-blue-500/10 text-blue-400 px-4 py-2 rounded-md hover:bg-blue-500/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bell size={16} /> Notify me
                    </motion.button>
                    <AnimatePresence>
                      {showNotification && (
                        <motion.span
                          className="ml-4 text-xs text-green-400"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                        >
                          Thanks! You'll be notified when new articles are published.
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </SectionTransition>

            {/* Expanded Article Modal for "Aim your goals" */}
            <AnimatePresence>
              {expandedArticle === 0 && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
                  onClick={() => setExpandedArticle(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="relative bg-zinc-900 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25 }}
                  >
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-bold mb-4 text-zinc-100">Aim your goals</h3>
                      <div className="flex items-center text-zinc-400 text-sm mb-6">
                        <span className="mr-4">20/03/25</span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" /> 4 min read
                        </span>
                      </div>

                      <div className="prose prose-invert prose-zinc max-w-none">
                        <p className="mb-4">
                          I think that one of the most overlooked yet crucial principles for achieving success is the
                          concept of unwavering visual focus <em>only</em> at what you want to attain. Seems logical
                          right? Well, its consistent application is remarkably rare among individuals.
                        </p>

                        <p className="mb-4">
                          The other day, my friend and I came across an article on a website where a guy was talking
                          about the importance of setting goals in a clear and concise way. In the article, he mentioned
                          things like how novice drivers tend to make more mistakes simply due to a lack of confidence
                          and how they often focus too much on just "getting through" rather than truly mastering the
                          skill.
                        </p>

                        <p className="mb-4">
                          He explained that these drivers make the mistake of fixating on thoughts like "don't crash
                          into this" or "be careful with that," which, without them realizing it, actually makes them
                          more likely to make those very mistakes.
                        </p>

                        <p className="mb-4">
                          After thinking about what the author was saying in his blog, my friend and I realized he was
                          right. Even though it might seem logical that the more you focus on avoiding something, the
                          less likely you are to run into it, that's not really the case. Our minds, whether we like it
                          or not, tend to fixate on the very things we're trying to avoid, making us more prone to the
                          mistakes we're so focused on preventing. And no matter how strange or incorrect this may seem
                          to us, it doesn't stop being true—our minds and subconscious simply work that way.
                        </p>

                        <div className="my-6">
                          <img
                            src="/images/tiger-focus-1.png"
                            alt="Tiger Woods focusing visualization"
                            className="w-full h-auto rounded-md mb-2"
                          />
                          <div className="bg-zinc-800/50 p-4 rounded-md border-l-4 border-blue-500 italic">
                            <p className="text-zinc-300">(Adapt the your vision to your goal)</p>
                          </div>
                        </div>

                        <p className="mb-4">
                          The simple act of focusing on a specific goal already sets you apart from the vast majority of
                          people. However, what truly makes you different is that by having only that one clear goal in
                          mind, you leave no room in your head for negative influences or the possibility of failure. By
                          not even considering failure as an option, you prevent it from happening — and that is
                          precisely what makes you stand out.
                        </p>

                        <div className="my-6">
                          <img
                            src="/images/tiger-focus-2.png"
                            alt="Tiger Woods focusing on success, ignoring distractions"
                            className="w-full h-auto rounded-md mb-2"
                          />
                          <div className="bg-zinc-800/50 p-4 rounded-md border-l-4 border-blue-500 italic">
                            <p className="text-zinc-300">(not my goal, not my concern)</p>
                          </div>
                        </div>

                        <p className="mb-4">Pablo Artero.</p>
                      </div>
                    </div>

                    <motion.button
                      className="absolute top-4 right-4 p-2 bg-zinc-800/80 backdrop-blur-sm rounded-full hover:bg-zinc-700 transition-colors"
                      onClick={() => setExpandedArticle(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded Article Modal for "Is there a way to know what you really want?" */}
            <AnimatePresence>
              {expandedArticle === 1 && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
                  onClick={() => setExpandedArticle(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="relative bg-zinc-900 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25 }}
                  >
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-bold mb-4 text-zinc-100">
                        Is there a way to know what you really want?
                      </h3>
                      <div className="flex items-center text-zinc-400 text-sm mb-6">
                        <span className="mr-4">15/03/25</span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" /> 3 min read
                        </span>
                      </div>

                      <div className="prose prose-invert prose-zinc max-w-none">
                        <p className="mb-4">
                          Sometimes it feels like everyone else knows what they're doing. They've got a plan. A path. A
                          five-year goal. Meanwhile, you're just trying to figure out what to eat for dinner.
                        </p>

                        <p className="mb-4">
                          I don't really think that it is like that, is harder than it looks to find something{" "}
                          <em>real</em> and not something you are <em>supossed</em> to like.
                        </p>

                        <p className="mb-4">
                          This doesn't mean that is a bad thing trying to find what you really want, but rather the
                          complete opposite, but I feel like there is a lot of people that force this proccess.
                        </p>

                        <p className="mb-4">
                          Now, with social media this is even bigger, because you always see people working on their
                          life-long goal, but I would like to know how many of these people actually feel deep down that
                          that thing they are doing actually have a purpose like they say.
                        </p>

                        <p className="mb-4">So, is there a way to know what you really want?</p>

                        <p className="mb-4">
                          Maybe it starts with just paying attention to what you like and what you don't, I guess that
                          someone find what they like and what they want by just trying things, doing what you will
                          differentiate between the things you like and the things you don't and little by little,
                          you'll keep <em>narrowing the circle</em> until you land on what you're looking for.
                        </p>

                        <p className="mb-4">
                          It doesn't have to be one specific thing. It could be a concept, a feeling, an idea, or even a
                          purpose. There's a whole spectrum of possibilities.
                        </p>

                        <p className="mb-4">
                          The point isn't to chase the "perfect answer," but to stay curious and intentional as you get
                          closer to what feels true to you.
                        </p>

                        <p className="mb-4">
                          Because at the end of the day, knowing what you want isn't about ticking boxes—it's about
                          building a life that actually <em>fits</em>.
                        </p>
                      </div>
                    </div>

                    <motion.button
                      className="absolute top-4 right-4 p-2 bg-zinc-800/80 backdrop-blur-sm rounded-full hover:bg-zinc-700 transition-colors"
                      onClick={() => setExpandedArticle(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={20} />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-10 pb-20">
            <div className="sticky top-0 py-4 bg-zinc-950 z-10">
              <span className="text-xs font-mono text-blue-500 mb-1 block">CONNECT</span>
              <h2 className="text-xl font-bold">Find Me Online</h2>
            </div>

            <SectionTransition>
              <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Email Card */}
                  <motion.a
                    href="mailto:pabloarteroo@gmail.com"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = "mailto:pabloarteroo@gmail.com"
                    }}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-8 flex flex-col items-center text-center">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.2, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                      >
                        <Mail size={28} className="text-blue-400" />
                      </motion.div>
                      <h3 className="text-lg font-medium text-zinc-200 mb-2">Email</h3>
                      <p className="text-zinc-400 mb-4 text-sm">Get in touch via email</p>
                      <span className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium inline-flex items-center">
                        pabloarteroo@gmail.com
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </motion.a>

                  {/* GitHub Card */}
                  <motion.a
                    href="https://github.com/arterosanromanpatwit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                    onClick={(e) => {
                      e.preventDefault()
                      window.open("https://github.com/arterosanromanpatwit", "_blank", "noopener,noreferrer")
                    }}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-8 flex flex-col items-center text-center">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.2, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                      >
                        <Github size={28} className="text-blue-400" />
                      </motion.div>
                      <h3 className="text-lg font-medium text-zinc-200 mb-2">GitHub</h3>
                      <p className="text-zinc-400 mb-4 text-sm">Check out my code</p>
                      <span className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium inline-flex items-center">
                        github.com/arterosanromanpatwit
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </motion.a>

                  {/* LinkedIn Card */}
                  <motion.a
                    href="https://www.linkedin.com/in/pablo-artero-sanromán-8995382bb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(
                        "https://www.linkedin.com/in/pablo-artero-sanromán-8995382bb/",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }}
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-8 flex flex-col items-center text-center">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.2, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                      >
                        <Linkedin size={28} className="text-blue-400" />
                      </motion.div>
                      <h3 className="text-lg font-medium text-zinc-200 mb-2">LinkedIn</h3>
                      <p className="text-zinc-400 mb-4 text-sm">Connect professionally</p>
                      <span className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium inline-flex items-center">
                        Pablo Artero Sanromán
                        <ArrowUpRight
                          size={14}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </motion.a>
                </div>
              </div>
            </SectionTransition>
          </section>
        </div>
      </main>
    </div>
  )
}
