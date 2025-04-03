import type { ResumeData } from "@/types/resume"
import Hero from "@/components/hero"
import Footer from "@/components/footer"

// Add these imports at the top
import InteractiveBackground from "@/components/interactive-background"
import RotatingCube from "@/components/rotating-cube"
import TerminalSkills from "@/components/terminal-skills"
import CreativeProjects from "@/components/creative-projects"
import ExperienceEducationSection from "@/components/experience-education-section"
import PublicationsAwardsSection from "@/components/publications-awards-section"

async function getResumeData(): Promise<ResumeData> {
  // In a real production environment, you might want to add error handling
  const res = await fetch("http://localhost:3000/data/resume.json", { next: { revalidate: 3600 } })
  const data = await res.json()
  return data
}

export default async function Home() {
  const resumeData = await getResumeData()

  // Easter egg: Console message
  if (typeof window !== "undefined") {
    console.log("%c👋 Hello curious developer!", "color: #14b8a6; font-size: 20px; font-weight: bold;")
    console.log(
      "%cYou found a hidden message in the console! There are several easter eggs on this site. Try these:\n\n" +
        "1. Konami code: ↑↑↓↓←→←→BA\n" +
        "2. Click terminal for interactive mode\n" +
        "3. Double-click on 3D shapes\n" +
        "4. Press 'R' key for rainbow mode\n" +
        "5. Click the red button in the code editor 5 times\n" +
        "6. Click projects in sequence: 1st, 3rd, 2nd, 4th\n" +
        "7. Click the heart in the footer 3 times\n" +
        "8. Double-click on certain skills\n\n" +
        "Happy hunting!",
      "color: #64748b; font-size: 14px;",
    )
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
      <InteractiveBackground />
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-24">
        <div className="space-y-8">
          <Hero basics={resumeData.basics} />

          {/* Connecting element */}
          <div className="flex justify-center">
            <div className="w-0.5 h-16 bg-gradient-to-b from-teal-500/50 to-transparent"></div>
          </div>

          <RotatingCube />
        </div>

        <ExperienceEducationSection work={resumeData.work} education={resumeData.education} />
        <TerminalSkills skills={resumeData.skills} />
        <CreativeProjects projects={resumeData.projects} />
        <PublicationsAwardsSection
          publications={resumeData.publications}
          awards={resumeData.awards}
          certificates={resumeData.certificates}
        />
        <Footer basics={resumeData.basics} />
      </div>

      {/* Hidden div with easter egg message */}
      <div className="hidden">You found the hidden HTML comment! You're really exploring the code. Nice job!</div>
    </main>
  )
}

