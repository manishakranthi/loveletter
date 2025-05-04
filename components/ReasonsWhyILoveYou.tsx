"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"

export default function ReasonsWhyILoveYou() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Add your own reasons here
  const reasons = [
    "The way your eyes light up when you smile",
    "How you always know exactly what to say to make me feel better",
    "Your incredible passion for the things you love",
    "The sound of your laughter that brightens my day",
    "How you care so deeply for others",
    "Your strength and resilience in difficult times",
    "The way you make even ordinary moments feel special",
    "Your kindness that inspires me to be a better person",
    "How you understand me like no one else does",
    "The way you make me feel loved every single day",
  ]

  const nextReason = () => {
    setCurrentIndex((prev) => (prev === reasons.length - 1 ? 0 : prev + 1))
  }

  const prevReason = () => {
    setCurrentIndex((prev) => (prev === 0 ? reasons.length - 1 : prev - 1))
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-md mx-auto">
      <h3 className="text-xl text-pink-600 font-medium text-center mb-4 flex items-center justify-center gap-2">
        <Heart className="text-pink-500 h-5 w-5" fill="currentColor" />
        Reasons Why I Love You
        <Heart className="text-pink-500 h-5 w-5" fill="currentColor" />
      </h3>

      <div className="relative h-40 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center text-center"
          >
            <p className="text-lg md:text-xl text-gray-800 font-dancing-script px-8">{reasons[currentIndex]}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevReason}
          className="bg-pink-200 hover:bg-pink-300 text-pink-700 p-2 rounded-full transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-1 items-center">
          {reasons.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-pink-500" : "bg-gray-300"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <button
          onClick={nextReason}
          className="bg-pink-200 hover:bg-pink-300 text-pink-700 p-2 rounded-full transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
