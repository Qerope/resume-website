"use client"

import { useState, useEffect } from "react"
import type { Skill } from "@/types/resume"
import { motion } from "framer-motion"
import { Terminal, Code, Cpu, Shield, Globe, Layers, Zap } from "lucide-react"

interface TerminalSkillsProps {
  skills: Skill[]
}

export default function TerminalSkills({ skills }: TerminalSkillsProps) {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [typedKeywords, setTypedKeywords] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(true)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [secretCommandEntered, setSecretCommandEntered] = useState(false)
  const [secretCommand, setSecretCommand] = useState("")
  const [easterEggActive, setEasterEggActive] = useState(false)
  const [matrixMode, setMatrixMode] = useState(false)

  // Secret commands
  const secretCommands = {
    help: "Available commands: help, clear, matrix, skills, about, joke, fortune",
    clear: "CLEAR_HISTORY",
    matrix: "MATRIX_MODE",
    skills: "My top skills: Problem solving, JavaScript, React, Node.js, TypeScript",
    about: "I'm a software developer passionate about creating elegant solutions to complex problems.",
    joke: "Why do programmers prefer dark mode? Because light attracts bugs!",
    fortune: "You will soon find great success in your coding endeavors.",
    sudo: "Nice try! But you don't have root privileges here 😉",
    exit: "You can check out any time you like, but you can never leave...",
    hello: "Hello there! Type 'help' to see available commands.",
    hi: "Hi! Type 'help' to see available commands.",
    "42": "Yes, that's the answer to life, the universe, and everything!",
    konami: "⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️",
    easteregg: "You found me! There are more secrets to discover...",
  }

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Handle key presses for secret command
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!secretCommandEntered) return

      if (e.key === "Enter") {
        // Process command
        const command = secretCommand.trim().toLowerCase()

        if (command in secretCommands) {
          if (command === "clear") {
            setCommandHistory([])
          } else if (command === "matrix") {
            setMatrixMode((prev) => !prev)
            setCommandHistory((prev) => [
              ...prev,
              `> ${secretCommand}`,
              matrixMode ? "Matrix mode deactivated" : "Entering the Matrix...",
            ])
          } else {
            setCommandHistory((prev) => [
              ...prev,
              `> ${secretCommand}`,
              secretCommands[command as keyof typeof secretCommands],
            ])
          }
        } else if (command) {
          setCommandHistory((prev) => [
            ...prev,
            `> ${secretCommand}`,
            `Command not found: ${command}. Type 'help' for available commands.`,
          ])
        }

        setSecretCommand("")
        setEasterEggActive(true)

        // Auto-deactivate after 10 seconds of inactivity
        const timer = setTimeout(() => {
          if (!secretCommandEntered) return
          setSecretCommandEntered(false)
          setEasterEggActive(false)
        }, 10000)

        return () => clearTimeout(timer)
      } else if (e.key === "Escape") {
        setSecretCommandEntered(false)
        setSecretCommand("")
      } else if (e.key === "Backspace") {
        setSecretCommand((prev) => prev.slice(0, -1))
      } else if (e.key.length === 1) {
        setSecretCommand((prev) => prev + e.key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [secretCommandEntered, secretCommand, matrixMode])

  // Typing effect
  useEffect(() => {
    if (!skills.length || secretCommandEntered) return

    const currentSkill = skills[currentSkillIndex]

    if (typedKeywords.length < currentSkill.keywords.length && isTyping) {
      const timeout = setTimeout(() => {
        setTypedKeywords((prev) => [...prev, currentSkill.keywords[prev.length]])
      }, 100)

      return () => clearTimeout(timeout)
    } else if (typedKeywords.length === currentSkill.keywords.length && isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(false)
        // Add command to history
        setCommandHistory((prev) => [
          ...prev,
          `ls ${currentSkill.name.toLowerCase()} => ${currentSkill.keywords.join(", ")}`,
        ])
      }, 2000)

      return () => clearTimeout(timeout)
    } else if (!isTyping) {
      const timeout = setTimeout(() => {
        if (typedKeywords.length > 0) {
          setTypedKeywords((prev) => prev.slice(0, -1))
        } else {
          setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
          setIsTyping(true)
        }
      }, 50)

      return () => clearTimeout(timeout)
    }
  }, [skills, currentSkillIndex, typedKeywords, isTyping, secretCommandEntered])

  const getIconForSkill = (skillName: string) => {
    switch (skillName.toLowerCase()) {
      case "programming":
        return <Code className="h-4 w-4" />
      case "frameworks":
        return <Layers className="h-4 w-4" />
      case "tools":
        return <Cpu className="h-4 w-4" />
      case "cybersecurity":
        return <Shield className="h-4 w-4" />
      case "languages":
        return <Globe className="h-4 w-4" />
      default:
        return <Terminal className="h-4 w-4" />
    }
  }

  if (!skills.length) return null

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-zinc-900 text-zinc-100 rounded-lg overflow-hidden shadow-xl ${matrixMode ? "matrix-terminal" : ""}`}
          style={
            matrixMode
              ? {
                  background:
                    "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), repeating-linear-gradient(0deg, rgba(0,255,0,0.03) 0px, rgba(0,255,0,0.03) 2px, transparent 2px, transparent 4px)",
                }
              : {}
          }
          onClick={() => {
            if (!secretCommandEntered && !easterEggActive) {
              setSecretCommandEntered(true)
              setCommandHistory((prev) => [
                ...prev,
                "🔒 Terminal unlocked. Type commands and press Enter. Type 'help' for available commands.",
              ])
            }
          }}
        >
          <div className="bg-zinc-800 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs font-mono ml-2 flex items-center">
              skills.sh
              {secretCommandEntered && (
                <span className="ml-2 text-teal-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span>Interactive Mode</span>
                </span>
              )}
            </div>
          </div>

          <div className={`p-4 font-mono text-sm h-[350px] ${matrixMode ? "text-green-400" : ""}`}>
            {/* Command history */}
            {commandHistory.map((cmd, i) => (
              <div key={i} className="mb-2">
                {cmd.startsWith(">") ? (
                  <div className="text-yellow-400">{cmd}</div>
                ) : cmd === "CLEAR_HISTORY" ? null : (
                  <div className="flex items-start">
                    <div className="flex items-center gap-2 text-green-400 mr-2">
                      <Terminal className="h-4 w-4" />
                      <span>user@portfolio:~$</span>
                    </div>
                    <div className={matrixMode ? "text-green-400" : "text-zinc-300"}>{cmd}</div>
                  </div>
                )}
              </div>
            ))}

            {/* Current command */}
            {!secretCommandEntered ? (
              <>
                <div className="flex items-center gap-2 text-green-400">
                  <Terminal className="h-4 w-4" />
                  <span>user@portfolio:~$</span>
                </div>

                <div className="mt-1 ml-6">
                  <span className="text-teal-400">ls </span>
                  <span className="text-yellow-300">{skills[currentSkillIndex]?.name.toLowerCase()}</span>
                  <span className="text-white"> => </span>
                  <span>{typedKeywords.join(", ")}</span>
                  <span
                    className={`ml-0.5 inline-block w-2 h-4 bg-white ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
                  ></span>
                </div>
              </>
            ) : (
              <div className="flex items-start">
                <div className="flex items-center gap-2 text-green-400 mr-2">
                  <Terminal className="h-4 w-4" />
                  <span>user@portfolio:~$</span>
                </div>
                <div className="text-white">
                  {secretCommand}
                  <span
                    className={`ml-0.5 inline-block w-2 h-4 bg-white ${cursorVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
                  ></span>
                </div>
              </div>
            )}

            {/* Easter egg: Hidden message */}
            {!secretCommandEntered && !easterEggActive && (
              <div className="absolute bottom-20 right-8 text-xs text-zinc-700 opacity-30 hover:opacity-100 transition-opacity cursor-help">
                Click terminal for interactive mode
              </div>
            )}

            {/* System info */}
            <div className="mt-6 border-t border-zinc-700 pt-4">
              <div className="text-zinc-500 mb-2">// System Information</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  OS: <span className="text-teal-400">Portfolio v1.0</span>
                </div>
                <div>
                  Shell: <span className="text-teal-400">skill-bash</span>
                </div>
                <div>
                  Terminal: <span className="text-teal-400">dev-term</span>
                </div>
                <div>
                  Uptime: <span className="text-teal-400">∞</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-medium flex items-center gap-2">
                {getIconForSkill(skill.name)}
                {skill.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full text-sm ${
                      // Easter egg: Special keyword animation
                      keyword === "ML/DL/AI" || keyword === "Web3/IPFS" ? "secret-hover" : ""
                    }`}
                    onDoubleClick={() => {
                      // Easter egg: Double-click on a skill
                      if (["Python", "JavaScript", "TypeScript", "React"].includes(keyword)) {
                        const audio = new Audio(`https://api.dicebear.com/7.x/bottts/svg?seed=${keyword}`)
                        audio.volume = 0.2
                        audio.play().catch(() => {})

                        // Show a floating message
                        const message = document.createElement("div")
                        message.className =
                          "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded text-sm z-50"
                        message.textContent = `${keyword} is one of my favorite technologies!`
                        message.style.opacity = "0"
                        message.style.transition = "opacity 0.3s"

                        document.body.appendChild(message)
                        setTimeout(() => {
                          message.style.opacity = "1"
                        }, 10)
                        setTimeout(() => {
                          message.style.opacity = "0"
                          setTimeout(() => message.remove(), 300)
                        }, 2000)
                      }
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

