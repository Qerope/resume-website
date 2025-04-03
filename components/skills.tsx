"use client"

import type { Skill } from "@/types/resume"
import { motion } from "framer-motion"

interface SkillsProps {
  skills: Skill[]
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-medium">{skill.name}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

