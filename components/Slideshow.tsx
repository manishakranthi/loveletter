"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface SlideshowProps {
  onClose: () => void
}

// Sample images - replace with your own
const images = [
  {
    src: "/placeholder.svg?height=600&width=800",
    caption: "Our first date at the beach",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    caption: "That time we went hiking",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    caption: "Remember this sunset?",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    caption: "Our favorite coffee shop",
  },
]

export default function Slideshow({ onClose }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white max-w-3xl w-full rounded-lg shadow-xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 z-10 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="relative aspect-video">
          <Image
            src={images[currentIndex].src || "/placeholder.svg"}
            alt={images[currentIndex].caption}
            fill
            className="object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-lg font-medium">{images[currentIndex].caption}</p>
          </div>
        </div>

        <div className="flex justify-between p-4">
          <button
            className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
            onClick={goToPrevious}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-pink-500" : "bg-gray-300"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
              />
            ))}
          </div>

          <button
            className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
            onClick={goToNext}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
