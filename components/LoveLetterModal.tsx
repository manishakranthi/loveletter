"use client"

import { motion } from "framer-motion"
import { Dancing_Script } from "next/font/google"
import { X } from "lucide-react"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
})

interface LoveLetterModalProps {
  onClose: () => void
}

export default function LoveLetterModal({ onClose }: LoveLetterModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-[#fffdf0] max-w-md w-full rounded-lg shadow-xl p-6 md:p-8 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="border-4 border-pink-200 border-dashed p-6 rounded-lg max-h-[70vh] overflow-y-auto">
          <h2 className="text-3xl text-pink-600 mb-4 text-center font-bold">My Love Letter</h2>

          <div className={`${dancingScript.className} text-xl text-gray-800 space-y-4`}>
            <p>My dearest,</p>

            <p>
              From the moment our paths crossed, I knew there was something special about you. The way you smile, the
              sound of your laughter, and the warmth of your presence have all become the highlights of my days.
            </p>

            <p>
              Every moment spent with you feels like a beautiful dream I never want to wake up from. You've brought
              colors into my world that I never knew existed, and for that, I am forever grateful.
            </p>

            <p>
              This is why I'm asking you today - will you be mine? Will you let me cherish you, care for you, and create
              countless beautiful memories together?
            </p>

            <p>No matter your answer, know that you've already made my heart fuller just by being you.</p>

            <p className="text-right">With all my love,</p>
            <p className="text-right">Me 💕</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
