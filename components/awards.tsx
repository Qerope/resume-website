"use client"

import type { Award } from "@/types/resume"
import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

interface AwardsProps {
  awards: Award[]
}

export default function Awards({ awards }: AwardsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Awards</h2>

      <div className="space-y-4">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <div className="mt-1 bg-teal-100 dark:bg-teal-900/30 p-1.5 rounded-full text-teal-600 dark:text-teal-400">
              <Trophy className="h-4 w-4" />
            </div>

            <div>
              <h3 className="font-medium">{award.title}</h3>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                {award.awarder} • {formatDate(award.date)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

