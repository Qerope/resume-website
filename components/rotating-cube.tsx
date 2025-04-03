"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Code, Terminal, Database, Cpu } from "lucide-react"

// Throttle function for mouse move event
const throttle = (func: Function, limit: number) => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (this: any) {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export default function RotatingCube() {
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [easterEggActivated, setEasterEggActivated] = useState(false)

  // Konami code sequence
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]
  const [konamiIndex, setKonamiIndex] = useState(0)

  useEffect(() => {
    const rotationSpeeds = [0.2, 0.15, 0.25, 0.18]
    const rotationDirections = [1, -1, 1, -1]
    const animationIds: number[] = []

    cubeRefs.current.forEach((cube, index) => {
      if (!cube) return

      let rotationX = index * 30
      let rotationY = index * 45
      let targetRotationX = rotationX
      let targetRotationY = rotationY

      // Calculate rotation based on mouse position
      const rect = cube.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      targetRotationX = ((50 - centerY) / 10) * -1 + rotationX
      targetRotationY = (50 - centerX) / 10 + rotationY

      rotationX += (targetRotationX - rotationX) * 0.1
      rotationY += (targetRotationY - rotationY) * 0.1

      cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
    })
  })

  // Easter egg: Konami code
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        const nextIndex = konamiIndex + 1
        setKonamiIndex(nextIndex)

        if (nextIndex === konamiCode.length) {
          setEasterEggActivated(true)
          setKonamiIndex(0)

          // Reset after 5 seconds
          setTimeout(() => {
            setEasterEggActivated(false)
          }, 5000)
        }
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [konamiIndex])

  // Throttled mouse move handler
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (isHovered === null) return

      const cube = cubeRefs.current[isHovered]
      if (!cube) return

      const rect = cube.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      setMousePosition({ x: e.clientX, y: e.clientY })
    }, 50), // Throttle to 50ms
    [isHovered]
  )

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  // Animation logic for rotation
  useEffect(() => {
    const rotationSpeeds = [0.2, 0.15, 0.25, 0.18]
    const rotationDirections = [1, -1, 1, -1]
    const animationIds: number[] = []

    cubeRefs.current.forEach((cube, index) => {
      if (!cube) return

      let rotationX = index * 30
      let rotationY = index * 45
      let targetRotationX = rotationX
      let targetRotationY = rotationY

      const animate = () => {
        if (isHovered === index) {
          // Calculate rotation based on mouse position
          const rect = cube.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2

          targetRotationX = ((mousePosition.y - centerY) / 10) * -1 + rotationX
          targetRotationY = (mousePosition.x - centerX) / 10 + rotationY

          rotationX += (targetRotationX - rotationX) * 0.1
          rotationY += (targetRotationY - rotationY) * 0.1

          cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`
          animationIds[index] = requestAnimationFrame(animate)
        } else {
        }
      }

      animate()
    })

    return () => {
      animationIds.forEach((id) => cancelAnimationFrame(id))
    }
  }, [isHovered, mousePosition])

  // Different shapes and their properties
  const shapes = [
    {
      name: "Software",
      color: "teal",
      icon: <Code />,
      faces: [
        { transform: "translate-z-20", symbol: "{ }" },
        { transform: "-translate-z-20 rotate-y-180", symbol: "/>" },
        { transform: "-translate-x-20 rotate-y-90", symbol: "</" },
        { transform: "translate-x-20 -rotate-y-90", symbol: "<>" },
        { transform: "translate-y-20 rotate-x-90", symbol: "()" },
        { transform: "-translate-y-20 -rotate-x-90", symbol: "[]" },
      ],
    },
    {
      name: "DevOps",
      color: "indigo",
      icon: <Terminal />,
      faces: [
        { transform: "translate-z-10 rotate-x-30", symbol: "^" },
        { transform: "-translate-z-10 rotate-y-180 rotate-x-30", symbol: "^" },
        { transform: "-translate-x-10 rotate-y-90 rotate-x-30", symbol: "^" },
        { transform: "translate-x-10 -rotate-y-90 rotate-x-30", symbol: "^" },
        { transform: "-translate-y-16 -rotate-x-90", symbol: "□" },
      ],
    },
    {
      name: "Databases",
      color: "amber",
      icon: <Database />,
      faces: [
        { transform: "translate-z-14 rotate-x-45 rotate-y-45", symbol: "◆" },
        { transform: "-translate-z-14 rotate-x-45 rotate-y-225", symbol: "◆" },
        { transform: "-translate-x-14 rotate-x-45 rotate-y-135", symbol: "◆" },
        { transform: "translate-x-14 rotate-x-45 rotate-y-315", symbol: "◆" },
        { transform: "translate-y-14 rotate-x-135 rotate-y-45", symbol: "◆" },
        { transform: "-translate-y-14 rotate-x-315 rotate-y-45", symbol: "◆" },
        { transform: "translate-y-14 rotate-x-135 rotate-y-225", symbol: "◆" },
        { transform: "-translate-y-14 rotate-x-315 rotate-y-225", symbol: "◆" },
      ],
    },
    {
      name: "Hardware",
      color: "emerald",
      icon: <Cpu />,
      faces: [
        { transform: "translate-z-16 rotate-x-0", symbol: "○" },
        { transform: "-translate-z-16 rotate-y-180", symbol: "○" },
        { transform: "translate-y-16 rotate-x-90", symbol: "●" },
        { transform: "-translate-y-16 -rotate-x-90", symbol: "●" },
      ],
      cylindrical: true,
    },
  ]

  return (
    <div className="relative">
      {/* Easter egg animation */}
      {easterEggActivated && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="bg-black/80 text-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">🎮 Konami Code Activated! 🎮</h3>
            <p>You found a secret! Congrats!</p>
          </div>
        </motion.div>
      )}

      <div className="flex flex-wrap justify-center gap-8 py-8">
        {shapes.map((shape, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: easterEggActivated ? [0, 360] : 0,
              scale: easterEggActivated ? [1, 1.2, 1] : 1,
            }}
            transition={{
              delay: index * 0.2,
              duration: 0.8,
              rotate: easterEggActivated
                ? {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "linear",
                }
                : {},
              scale: easterEggActivated
                ? {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1,
                  ease: "easeInOut",
                }
                : {},
            }}
            className="w-28 h-28 md:w-32 md:h-32 perspective-500 relative group"
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
            data-shape-name={shape.name.toLowerCase()}
          >
            <div
              ref={(el) => (cubeRefs.current[index] = el)}
              className={`w-full h-full relative transform-style-3d transition-transform duration-300 shape-${shape.name.toLowerCase()}`}
            >
              {/* Shape faces */}
              {shape.faces.map((face, faceIndex) => (
                <div
                  key={faceIndex}
                  className={`absolute inset-0 bg-${shape.color}-500/20 border-2 border-${shape.color}-500/50 backdrop-blur-sm transform ${face.transform} flex items-center justify-center ${shape.cylindrical ? "rounded-full" : ""}`}
                  style={shape.cylindrical && faceIndex > 1 ? { borderRadius: "0" } : {}}
                >
                  <span className="text-3xl font-mono">{face.symbol}</span>
                </div>
              ))}
            </div>

            {/* Shape label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered === index ? 1 : 0.7,
                y: isHovered === index ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`mt-4 text-center text-sm text-${shape.color}-600 dark:text-${shape.color}-400 flex items-center justify-center gap-1.5`}
            >
              <span className={`p-1 rounded-full bg-${shape.color}-100 dark:bg-${shape.color}-900/30`}>
                {React.cloneElement(shape.icon, { className: "h-3.5 w-3.5" })}
              </span>
              <span>{shape.name}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Easter egg hint */}
      <div
        className="text-center text-xs text-zinc-400 dark:text-zinc-600 mt-2 cursor-help select-none"
        title="Try the Konami code: ↑↑↓↓←→←→BA"
      >
        <span className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
          Hover to interact • Double-click for surprise
        </span>
      </div>
    </div>
  )
}
