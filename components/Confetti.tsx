"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  color: string
  size: number
  rotation: number
}

const colors = ["#ff77e9", "#ff77a9", "#ff9ce9", "#ffcef2", "#f9d5e5", "#eeac99", "#e06377", "#c83349"]

export default function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    // Create confetti pieces
    const pieces = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5, // size between 5-15px
      rotation: Math.random() * 360, // random rotation
    }))

    setConfetti(pieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute top-0"
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
          initial={{ y: "-20vh", rotate: 0, opacity: 1 }}
          animate={{
            y: "100vh",
            rotate: piece.rotation,
            opacity: [1, 1, 0.8, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  )
}
