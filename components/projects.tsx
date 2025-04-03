"use client"

import type { Project } from "@/types/resume"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800/50 p-6 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            whileHover={{ y: -5 }}
          >
            <div className="absolute top-3 right-3">
              <Github className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center gap-1">
                {project.name}
                <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400 text-sm">{project.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

