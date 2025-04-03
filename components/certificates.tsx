"use client"

import type { Certificate } from "@/types/resume"
import { motion } from "framer-motion"
import { Award } from "lucide-react"

interface CertificatesProps {
  certificates: Certificate[]
}

export default function Certificates({ certificates }: CertificatesProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Certificates</h2>

      <div className="space-y-4">
        {certificates.map((certificate, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <div className="mt-1 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-full text-zinc-600 dark:text-zinc-400">
              <Award className="h-4 w-4" />
            </div>

            <div>
              <h3 className="font-medium">{certificate.name}</h3>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">{certificate.issuer}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

