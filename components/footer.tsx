"use client"

import { useState } from "react"
import type { Basics } from "@/types/resume"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

interface FooterProps {
  basics: Basics
}

export default function Footer({ basics }: FooterProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  // Easter egg messages
  const easterEggMessages = [
    "Thanks for visiting my portfolio!",
    "Hope you enjoyed the easter eggs!",
    "Have a great day!",
    "Don't forget to try the Konami code!",
    "Press 'R' for rainbow mode!",
    "Click the red button in the code editor 5 times!",
    "Double-click on the 3D shapes!",
    "Click the terminal for interactive mode!",
    "Try clicking projects in sequence: 1st, 3rd, 2nd, 4th!",
    "There are more secrets to discover...",
  ]

  const handleHeartClick = () => {
    setClickCount((prev) => prev + 1)

    if (clickCount >= 2) {
      setShowEasterEgg(true)

      // Hide after 5 seconds
      setTimeout(() => {
        setShowEasterEgg(false)
        setClickCount(0)
      }, 5000)
    }
  }

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 pt-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
          © {new Date().getFullYear()} {basics.name}. All rights reserved.
          <button
            onClick={handleHeartClick}
            className="text-zinc-400 hover:text-red-500 transition-colors focus:outline-none"
            aria-label="Like"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {basics.profiles.map((profile) => (
            <a
              key={profile.network}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              aria-label={profile.network}
            >
              {profile.network === "GitHub" && <Github className="h-5 w-5" />}
              {profile.network === "Linkedin" && <Linkedin className="h-5 w-5" />}
            </a>
          ))}

          <a
            href={`mailto:${basics.email}`}
            className="text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Easter egg message */}
      {showEasterEgg && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black/80 text-white px-4 py-2 rounded text-sm">
          {easterEggMessages[Math.floor(Math.random() * easterEggMessages.length)]}
        </div>
      )}

      {/* Hidden message in HTML comment */}
      {/* <!-- Congratulations on finding this hidden message! You're a true explorer. --> */}
    </footer>
  )
}

