"use client"

import { useState } from "react"
import type { Work, Education as EducationType } from "@/types/resume"
import { motion } from "framer-motion"
import { ExternalLink, Calendar, GraduationCap } from "lucide-react"

interface ExperienceEducationSectionProps {
  work: Work[]
  education: EducationType[]
}

export default function ExperienceEducationSection({ work, education }: ExperienceEducationSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const formatDate = (dateString: string) => {
    if (dateString === "Present") return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Experience Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-5 w-5 text-teal-500" />
            Experience
          </h2>

          <div className="relative">
            {/* Main timeline line */}
            <div className="absolute left-0 top-0 w-1 h-full bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>

            <div className="space-y-8">
              {work.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-0 top-0 w-5 h-5 rounded-full bg-teal-500 border-4 border-white dark:border-zinc-900 transform -translate-x-2 z-10"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: hoveredIndex === index ? 1.3 : 1,
                      backgroundColor: hoveredIndex === index ? "#14b8a6" : "#14b8a6",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className={`pl-8 transition-all duration-300 ${hoveredIndex === index ? "translate-x-1" : ""}`}>
                    <div className="bg-white dark:bg-zinc-800/50 p-4 rounded-lg shadow-sm">
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

                      <ul className="mt-3 space-y-1.5 text-sm">
                        {job.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 text-teal-600 dark:text-teal-400">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-teal-500" />
            Education
          </h2>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white dark:bg-zinc-800/50 rounded-lg p-5 shadow-sm h-full"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-semibold">
                      {edu.studyType} 
                    </h3>
                    <h2 className="text-xl font-bold">{edu.area}</h2>
                    <div className="flex items-center gap-2">
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
                      >
                        {edu.institution}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </div>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300 text-sm">{edu.summary}</p>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <div
                          key={i}
                          className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full text-xs flex-inline"
                        >
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

