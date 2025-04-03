"use client"

import { useState } from "react"
import type { Work } from "@/types/resume"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface ExperienceProps {
  work: Work[]
}

export default function Experience({ work }: ExperienceProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const formatDate = (dateString: string) => {
    if (dateString === "Present") return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Experience</h2>

      <div className="space-y-12">
        {work.map((job, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="absolute left-0 top-0 w-1 h-full bg-zinc-200 dark:bg-zinc-800 rounded-full" />

            <div className={`pl-6 transition-all duration-300 ${hoveredIndex === index ? "translate-x-1" : ""}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{job.position}</h3>
                  <div className="flex items-center gap-2">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
                    >
                      {job.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 md:mt-0">
                  {formatDate(job.startDate)} — {formatDate(job.endDate)}
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {job.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-teal-600 dark:text-teal-400">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

