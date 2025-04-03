"use client"

import Awards from "@/components/awards"
import Certificates from "@/components/certificates"
import Publications from "@/components/publications"
import type { Award, Certificate, Publication } from "@/types/resume"

interface PublicationsAwardsSectionProps {
  publications: Publication[]
  awards: Award[]
  certificates: Certificate[]
}

export default function PublicationsAwardsSection({
  publications,
  awards,
  certificates,
}: PublicationsAwardsSectionProps) {
  return (
    <section className="space-y-16">
      {publications.length > 0 && <Publications publications={publications} />}

      {/* Container for Awards and Certificates side by side */}
      {(awards.length > 0 || certificates.length > 0) && (
        <div className="flex space-x-8">
          {awards.length > 0 && (
            <div className="flex-1">
              <Awards awards={awards} />
            </div>
          )}
          {certificates.length > 0 && (
            <div className="flex-1">
              <Certificates certificates={certificates} />
            </div>
          )}
        </div>
      )}
    </section>
  )
}
