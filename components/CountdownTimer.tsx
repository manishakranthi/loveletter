"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: Date
  title?: string
}

export default function CountdownTimer({
  targetDate,
  title = "Counting down to our special day",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // If we've reached the target date
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-md mx-auto"
    >
      <h3 className="text-xl text-pink-600 font-medium text-center mb-4">{title}</h3>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col">
          <div className="bg-pink-100 rounded-lg p-3 mb-1">
            <span className="text-2xl md:text-3xl font-bold text-pink-600">{timeLeft.days}</span>
          </div>
          <span className="text-xs md:text-sm text-gray-600">Days</span>
        </div>

        <div className="flex flex-col">
          <div className="bg-purple-100 rounded-lg p-3 mb-1">
            <span className="text-2xl md:text-3xl font-bold text-purple-600">{timeLeft.hours}</span>
          </div>
          <span className="text-xs md:text-sm text-gray-600">Hours</span>
        </div>

        <div className="flex flex-col">
          <div className="bg-blue-100 rounded-lg p-3 mb-1">
            <span className="text-2xl md:text-3xl font-bold text-blue-600">{timeLeft.minutes}</span>
          </div>
          <span className="text-xs md:text-sm text-gray-600">Minutes</span>
        </div>

        <div className="flex flex-col">
          <div className="bg-pink-100 rounded-lg p-3 mb-1">
            <span className="text-2xl md:text-3xl font-bold text-pink-600">{timeLeft.seconds}</span>
          </div>
          <span className="text-xs md:text-sm text-gray-600">Seconds</span>
        </div>
      </div>
    </motion.div>
  )
}
