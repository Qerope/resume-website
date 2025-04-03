"use client"

import { useState, useEffect } from "react"
import type { Project } from "@/types/resume"
import { motion } from "framer-motion"
import { ExternalLink, Github, Sparkles } from "lucide-react"

interface CreativeProjectsProps {
  projects: Project[]
}

export default function CreativeProjects({ projects }: CreativeProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [secretProject, setSecretProject] = useState(false)
  const [clickSequence, setClickSequence] = useState<number[]>([])

  // Easter egg: Click projects in specific sequence
  useEffect(() => {
    // Check if the sequence is 0, 2, 1, 3
    if (clickSequence.join(",") === "0,2,1,3") {
      setSecretProject(true)

      // Reset sequence after 10 seconds
      setTimeout(() => {
        setSecretProject(false)
        setClickSequence([])
      }, 10000)
    }

    // Reset sequence after 3 seconds of inactivity
    const timer = setTimeout(() => {
      setClickSequence([])
    }, 3000)

    return () => clearTimeout(timer)
  }, [clickSequence])

  // Add a secret project
  const allProjects = secretProject
    ? [
        ...projects,
        {
          name: "Secret Project X",
          description: "You found the hidden project! This is a special easter egg.",
          url: "https://github.com/qerope/secret-project",
        },
      ]
    : projects

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
        Projects
        {secretProject && <Sparkles className="h-5 w-5 text-yellow-400" />}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: index === allProjects.length - 1 && secretProject ? [1, 1.05, 1] : 1,
            }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              scale: {
                repeat: index === allProjects.length - 1 && secretProject ? Number.POSITIVE_INFINITY : 0,
                duration: 2,
              },
            }}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              // Only track clicks for the original projects
              if (index < projects.length) {
                setClickSequence((prev) => [...prev, index])
              }
            }}
          >
            {/* Background with code pattern */}
            <div
              className={`absolute inset-0 ${
                index === allProjects.length - 1 && secretProject
                  ? "bg-gradient-to-r from-purple-100 to-amber-100 dark:from-purple-900/30 dark:to-amber-900/30"
                  : "bg-zinc-100 dark:bg-zinc-800/50"
              } rounded-xl overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-5 font-mono text-[0.5rem] leading-tight p-4 overflow-hidden">
                {Array(20)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i}>
                      {`function ${project.name.replace(/\s+/g, "")}() {`}
                      <br />
                      {`  // ${project.description}`}
                      <br />
                      {`  const data = fetchRepository('${project.url}');`}
                      <br />
                      {`  return processData(data);`}
                      <br />
                      {`}`}
                      <br />
                    </div>
                  ))}
              </div>
            </div>

            {/* Content */}
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block p-6 rounded-xl z-10 h-full"
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center gap-1">
                    {project.name}
                    <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {index === allProjects.length - 1 && secretProject && (
                      <Sparkles className="h-3.5 w-3.5 text-yellow-400 ml-1" />
                    )}
                  </h3>

                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">{project.description}</p>
                </div>

                <motion.div
                  className={`p-2 ${
                    index === allProjects.length - 1 && secretProject
                      ? "bg-purple-200 dark:bg-purple-800"
                      : "bg-zinc-200 dark:bg-zinc-700"
                  } rounded-full`}
                  animate={{
                    rotate: hoveredIndex === index ? 360 : 0,
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Github className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                </motion.div>
              </div>

              {/* Animated code line */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 ${
                  index === allProjects.length - 1 && secretProject
                    ? "bg-gradient-to-r from-purple-500 to-amber-500"
                    : "bg-gradient-to-r from-teal-500 to-emerald-500"
                } rounded-b-xl`}
                initial={{ width: 0 }}
                animate={{
                  width: hoveredIndex === index ? "100%" : "0%",
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* Easter egg hint */}
      <div
        className="text-center text-xs text-zinc-400/30 hover:text-zinc-400/80 transition-colors cursor-help mt-2"
        title="Try clicking projects in a specific order"
      >
        <span>Click projects in the right sequence to reveal a secret</span>
      </div>
    </section>
  )
}

