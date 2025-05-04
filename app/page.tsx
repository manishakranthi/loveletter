"use client"

import { useState } from "react"
import { Pacifico, Dancing_Script } from "next/font/google"
import LoveLetterModal from "@/components/LoveLetterModal"
import MusicPlaylist from "@/components/MusicPlaylist"
import FloatingHearts from "@/components/FloatingHearts"
import Confetti from "@/components/Confetti"
import Fireworks from "@/components/Fireworks"
import Slideshow from "@/components/Slideshow"
import CountdownTimer from "@/components/CountdownTimer"
import ReasonsWhyILoveYou from "@/components/ReasonsWhyILoveYou"
import { motion } from "framer-motion"

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing-script",
})

export default function Home() {
  const [showLoveLetterModal, setShowLoveLetterModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [noButtonAttempts, setNoButtonAttempts] = useState(0)
  const [showSlideshow, setShowSlideshow] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const [showReasons, setShowReasons] = useState(false)

  const noMessages = [
    "Aww... but I brought cookies 🍪",
    "Are you sure? Puppy eyes intensify 🥺",
    "But we'd be so cute together! 💕",
    "Don't break my heart! 💔",
    "Just one chance? Pretty please? 🙏",
  ]

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100
    const y = Math.random() * 200 - 100
    setNoButtonPosition({ x, y })
    setNoButtonAttempts((prev) => prev + 1)
  }

  const handleYesClick = () => {
    setResponse("You just made my world bloom! 💐")
    setShowConfetti(true)
    setShowFireworks(true)
    setTimeout(() => {
      setShowConfetti(false)
      setShowFireworks(false)
    }, 5000)
  }

  const handleMaybeClick = () => {
    setResponse("Playing hard to get, huh? 😏 I'm up for the challenge!")
  }

  const handleNoClick = () => {
    if (noButtonAttempts >= 3) {
      setResponse(noMessages[Math.floor(Math.random() * noMessages.length)])
    }
  }

  const handleShowLoveLetter = () => {
    setShowLoveLetterModal(true)
  }

  const handleShowSlideshow = () => {
    setShowSlideshow(true)
  }

  const handleShowCountdown = () => {
    setShowCountdown(!showCountdown)
  }

  const handleShowReasons = () => {
    setShowReasons(!showReasons)
  }

  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center p-4 ${pacifico.variable} ${dancingScript.variable}`}
    >
      <FloatingHearts />
      {showConfetti && <Confetti />}
      {showFireworks && <Fireworks />}

      <MusicPlaylist />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-pacifico text-pink-600 mb-8 drop-shadow-lg">
          Will you be mine?
        </h1>

        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300"
              onClick={handleYesClick}
            >
              Yes! 💖
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300"
              onClick={handleMaybeClick}
            >
              Maybe... 🤔
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300"
              animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
              onMouseEnter={moveNoButton}
              onClick={handleNoClick}
            >
              No 🙈
            </motion.button>
          </div>

          {response && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-4 shadow-inner text-center font-dancing-script text-xl text-pink-700"
            >
              {response}
            </motion.div>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-200 hover:bg-pink-300 text-pink-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-300"
              onClick={handleShowLoveLetter}
            >
              Read my love letter 💌
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-200 hover:bg-purple-300 text-purple-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-300"
              onClick={handleShowSlideshow}
            >
              Our memories 📸
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-200 hover:bg-blue-300 text-blue-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-300"
              onClick={handleShowCountdown}
            >
              Special date ⏱️
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-200 hover:bg-pink-300 text-pink-700 font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-300"
              onClick={handleShowReasons}
            >
              Why I love you ❤️
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showLoveLetterModal && <LoveLetterModal onClose={() => setShowLoveLetterModal(false)} />}

      {showSlideshow && <Slideshow onClose={() => setShowSlideshow(false)} />}

      {showCountdown && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <CountdownTimer targetDate={new Date("2025-02-14T00:00:00")} title="Counting down to Valentine's Day" />
        </motion.div>
      )}

      {showReasons && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <ReasonsWhyILoveYou />
        </motion.div>
      )}
    </main>
  )
}
