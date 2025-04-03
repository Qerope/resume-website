"use client"

import type { Education as EducationType } from "@/types/resume"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface EducationProps {
  education: EducationType[]
}

export default function Education({ education }: EducationProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Education</h2>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white dark:bg-zinc-800/50 rounded-xl p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <div>
                  <h3 className="text-lg font-semibold">
                    {edu.studyType} in {edu.area}
                  </h3>
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
                </div>

                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </div>

                <p className="text-zinc-700 dark:text-zinc-300 mt-2">{edu.summary}</p>
              </div>

              <div className="md:w-1/3">
                <h4 className="text-sm font-medium mb-2">Relevant Coursework</h4>
                <ul className="text-sm space-y-1">
                  {edu.courses.map((course, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-teal-600 dark:text-teal-400">•</span>
                      <span className="text-zinc-700 dark:text-zinc-300">{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

