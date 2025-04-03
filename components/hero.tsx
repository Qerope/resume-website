"use client"

import { useState, useEffect, useRef } from "react"
import type { Basics } from "@/types/resume"
import { Github, Linkedin, Mail, Phone, Globe, Terminal, Code, User, MapPin, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface HeroProps {
  basics: Basics
}

export default function Hero({ basics }: HeroProps) {
  const [mounted, setMounted] = useState(false)
  const [text, setText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [secretMode, setSecretMode] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [rainbowMode, setRainbowMode] = useState(false)

  const tabs = [
    {
      name: "profile.js",
      content: `const developer = {
  name: "${basics.name}",
  role: "${basics.label}",
  location: "${basics.location.city}, ${basics.location.region}",
  skills: ["Problem Solver", "Creative Thinker", "Fast Learner"],
  contact: "${basics.email}"
};

// Welcome to my portfolio
render(<Portfolio developer={developer} />);`,
    },
    {
      name: "contact.js",
      content: `// Contact information
const contact = {
  email: "${basics.email}",
  phone: "${basics.phone}",
  website: "${basics.url}",
  location: {
    city: "${basics.location.city}",
    region: "${basics.location.region}",
    country: "${basics.location.countryCode}"
  },
  social: [
    { platform: "GitHub", username: "${basics.profiles[0]?.username || ""}" },
    { platform: "LinkedIn", username: "${basics.profiles[1]?.username || ""}" }
  ]
};

export default contact;`,
    },
    {
      name: "skills.js",
      content: `// Core competencies
const skills = [
  "Full-Stack Development",
  "Problem Solving",
  "Algorithm Design",
  "Data Engineering",
  "Machine Learning",
  "UI/UX Design",
  "System Architecture",
  "Cloud Computing"
];

// Always learning new technologies
const currentlyLearning = "Advanced AI Applications";

export { skills, currentlyLearning };`,
    },
    // Easter egg: Hidden tab
    {
      name: "secret.js",
      content: `/**
 * 🎉 You found the secret file! 🎉
 * 
 * This portfolio has several hidden easter eggs.
 * Try these:
 * 
 * 1. Konami code: ↑↑↓↓←→←→BA
 * 2. Click terminal for interactive mode
 * 3. Double-click on 3D shapes
 * 4. Press "R" key for rainbow mode
 * 5. Double-click on certain skills
 */

console.log("Easter eggs activated!");

// This message will self-destruct in 10 seconds
setTimeout(() => {
  console.log("Message deleted");
}, 10000);`,
    },
  ]

  const fullText = tabs[activeTab].content
  const speed = 25
  const codeRef = useRef<HTMLPreElement>(null)

  // Easter egg: "R" key for rainbow mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "r") {
        setRainbowMode((prev) => !prev)

        // Show notification
        if (!rainbowMode) {
          const notification = document.createElement("div")
          notification.className = "fixed top-4 right-4 bg-black/80 text-white px-4 py-2 rounded text-sm z-50"
          notification.textContent = "🌈 Rainbow mode activated!"
          notification.style.opacity = "0"
          notification.style.transition = "opacity 0.3s"

          document.body.appendChild(notification)
          setTimeout(() => {
            notification.style.opacity = "1"
          }, 10)
          setTimeout(() => {
            notification.style.opacity = "0"
            setTimeout(() => notification.remove(), 300)
          }, 3000)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [rainbowMode])

  useEffect(() => {
    setMounted(true)

    // Reset text when tab changes
    setText("")

    // Typing animation
    let i = 0
    const typingInterval = setInterval(() => {
      setText(fullText.substring(0, i))
      i++

      if (i > fullText.length) {
        clearInterval(typingInterval)
      }

      // Scroll to top of code block when tab changes
      if (codeRef.current) {
        codeRef.current.scrollTop = 0
      }
    }, speed)

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [fullText, activeTab])

  if (!mounted) return null

  return (
    <section className={`relative ${rainbowMode ? "rainbow-bg" : ""}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-zinc-50 dark:from-teal-950/20 dark:to-zinc-950/20 rounded-xl -z-10" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-teal-500/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 -left-8 w-24 h-24 bg-teal-500/10 rounded-full blur-lg" />
        <div className="absolute -bottom-8 right-1/3 w-40 h-40 bg-zinc-500/10 rounded-full blur-xl" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 relative z-10">
        {/* Left side: Code animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900 rounded-lg overflow-hidden shadow-xl"
        >
          <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
                onClick={() => {
                  // Easter egg: Click red button 5 times
                  setClickCount((prev) => {
                    const newCount = prev + 1
                    if (newCount >= 5) {
                      setSecretMode(true)
                      return 0
                    }
                    return newCount
                  })
                }}
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            <div className="flex ml-4 text-xs font-mono">
              {tabs.slice(0, secretMode ? 4 : 3).map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-1 rounded-t-md transition-colors ${
                    activeTab === index ? "bg-zinc-900 text-teal-400" : "bg-zinc-700 text-zinc-400 hover:bg-zinc-750"
                  } ${index === 3 ? "flex items-center gap-1" : ""}`}
                >
                  {tab.name}
                  {index === 3 && <Sparkles className="h-3 w-3 text-yellow-400" />}
                </button>
              ))}
            </div>
          </div>

          <pre
            ref={codeRef}
            className="p-4 font-mono text-sm text-teal-300 h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800"
          >
            <code>
              {text}
              <span
                className={`inline-block w-2 h-4 bg-teal-300 ml-0.5 ${showCursor ? "opacity-100" : "opacity-0"}`}
              ></span>
            </code>
          </pre>
        </motion.div>

        {/* Right side: Info with 3D elements */}
        <div className="flex flex-col justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-2"
              >
                <div className="p-2 bg-teal-500/10 rounded-lg">
                  <User className="h-6 w-6 text-teal-500" />
                </div>
                <h1
                  className={`text-4xl md:text-5xl font-bold tracking-tight ${rainbowMode ? "rainbow-text" : "gradient-text"}`}
                  // Easter egg: Click name 10 times
                  onClick={() => {
                    const audio = new Audio("https://www.myinstants.com/media/sounds/mario-coin.mp3")
                    audio.volume = 0.2
                    audio.play().catch(() => {})
                  }}
                >
                  {basics.name}
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-zinc-600 dark:text-zinc-400 mt-2 ml-12 border-l-2 border-teal-500/30 pl-4"
              >
                {basics.label}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-4 ml-2"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 group">
                  <div className="p-1.5 bg-teal-500/10 rounded-md group-hover:bg-teal-500/20 transition-colors">
                    <Mail className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <a
                    href={`mailto:${basics.email}`}
                    className="text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {basics.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="p-1.5 bg-teal-500/10 rounded-md group-hover:bg-teal-500/20 transition-colors">
                    <Phone className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <a
                    href={`tel:${basics.phone}`}
                    className="text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {basics.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="p-1.5 bg-teal-500/10 rounded-md group-hover:bg-teal-500/20 transition-colors">
                    <Globe className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <a
                    href={basics.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {basics.url.replace("https://", "")}
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="p-1.5 bg-teal-500/10 rounded-md group-hover:bg-teal-500/20 transition-colors">
                    <MapPin className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {basics.location.city}, {basics.location.region}, {basics.location.countryCode}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 ml-2">
                {basics.profiles.map((profile) => (
                  <motion.a
                    key={profile.network}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-teal-500/20 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
                    whileHover={{ y: -3 }}
                    aria-label={profile.network}
                  >
                    {profile.network === "GitHub" && <Github className="h-5 w-5" />}
                    {profile.network === "Linkedin" && <Linkedin className="h-5 w-5" />}
                  </motion.a>
                ))}

                <motion.a
                  href={`mailto:${basics.email}`}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-teal-500/20 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
                  whileHover={{ y: -3 }}
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating 3D elements */}
          <div className="absolute -top-6 -right-6 opacity-70 dark:opacity-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-16 h-16 bg-teal-500/10 backdrop-blur-sm rounded-lg border border-teal-500/20 flex items-center justify-center"
            >
              <Code className="h-8 w-8 text-teal-500" />
            </motion.div>
          </div>

          <div className="absolute bottom-0 right-12 opacity-70 dark:opacity-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="w-12 h-12 bg-zinc-500/10 backdrop-blur-sm rounded-lg border border-zinc-500/20 flex items-center justify-center"
            >
              <Terminal className="h-6 w-6 text-zinc-500" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-teal-500 to-transparent animate-border-slide"></div>
      </div>

      {/* Easter egg: Hidden message */}
      <div
        className="absolute bottom-2 right-2 text-xs text-zinc-400/30 hover:text-zinc-400/80 transition-colors cursor-help"
        title="Press 'R' for rainbow mode"
      >
        v1.0.0
      </div>
    </section>
  )
}

