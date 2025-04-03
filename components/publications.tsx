"use client"

import type { Publication } from "@/types/resume"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface PublicationsProps {
  publications: Publication[]
}

export default function Publications({ publications }: PublicationsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Publications</h2>

      <div className="space-y-6">
        {publications.map((publication, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="space-y-1"
          >
            <h3 className="font-medium">
              {publication.url ? (
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                  {publication.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                publication.name
              )}
            </h3>

            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {publication.publisher} • {formatDate(publication.releaseDate)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

