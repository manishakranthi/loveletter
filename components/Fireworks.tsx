"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  angle: number
  speed: number
}

interface Firework {
  id: number
  x: number
  y: number
  particles: Particle[]
}

const colors = [
  "#ff77e9",
  "#ff77a9",
  "#ff9ce9",
  "#ffcef2",
  "#f9d5e5",
  "#eeac99",
  "#e06377",
  "#c83349",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
]

export default function Fireworks() {
  const [fireworks, setFireworks] = useState<Firework[]>([])

  useEffect(() => {
    // Create initial fireworks
    const createFireworks = () => {
      const newFireworks: Firework[] = []

      for (let i = 0; i < 5; i++) {
        const x = Math.random() * 100 // percentage across screen
        const y = 30 + Math.random() * 40 // percentage down screen (30-70%)

        const particles: Particle[] = []
        const particleCount = 30 + Math.floor(Math.random() * 20)

        for (let j = 0; j < particleCount; j++) {
          particles.push({
            id: j,
            x: 0,
            y: 0,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 2 + Math.random() * 4,
            angle: Math.random() * Math.PI * 2,
            speed: 1 + Math.random() * 3,
          })
        }

        newFireworks.push({
          id: Date.now() + i,
          x,
          y,
          particles,
        })
      }

      setFireworks(newFireworks)
    }

    createFireworks()

    // Add new fireworks periodically
    const interval = setInterval(() => {
      createFireworks()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {firework.particles.map((particle) => (
            <motion.div
              key={`${firework.id}-${particle.id}`}
              className="absolute rounded-full"
              style={{
                backgroundColor: particle.color,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos(particle.angle) * particle.speed * 100,
                y: Math.sin(particle.angle) * particle.speed * 100,
                opacity: 0,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
