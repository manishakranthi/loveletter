"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Heart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      size: Math.random() * 20 + 10, // size between 10-30px
      duration: Math.random() * 10 + 10, // animation duration 10-20s
      delay: Math.random() * 5, // delay start by 0-5s
    }))

    setHearts(initialHearts)

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 10,
          delay: 0,
        },
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-pink-400 opacity-70"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
          }}
          initial={{ y: "100vh", opacity: 0.7 }}
          animate={{
            y: "-100vh",
            opacity: [0.7, 0.9, 0.7, 0.4, 0],
            x: [0, 20, -20, 10, -10, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}
