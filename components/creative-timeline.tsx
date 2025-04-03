"use client"

import { useState } from "react"
import type { Work } from "@/types/resume"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface CreativeTimelineProps {
  work: Work[]
}

export default function CreativeTimeline({ work }: CreativeTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const formatDate = (dateString: string) => {
    if (dateString === "Present") return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Experience</h2>

      <div className="relative">
        {/* Main timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 w-1 md:w-0.5 h-full bg-zinc-200 dark:bg-zinc-800 transform md:translate-x-px"></div>

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
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full bg-teal-500 border-4 border-white dark:border-zinc-900 transform -translate-x-2 md:-translate-x-2.5 z-10"
                initial={{ scale: 1 }}
                animate={{
                  scale: hoveredIndex === index ? 1.3 : 1,
                  backgroundColor: hoveredIndex === index ? "#14b8a6" : "#14b8a6",
                }}
                transition={{ duration: 0.3 }}
              />

              <div className={`md:grid md:grid-cols-2 gap-8 ${index % 2 === 0 ? "" : "md:flex md:flex-row-reverse"}`}>
                {/* Empty space for alignment on mobile */}
                <div className="hidden md:block"></div>

                {/* Content */}
                <motion.div
                  className={`pl-8 md:pl-0 transition-all duration-300 ${hoveredIndex === index ? "md:translate-x-2" : ""}`}
                >
                  <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-lg shadow-sm">
                    <div className="flex flex-col mb-2">
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
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

