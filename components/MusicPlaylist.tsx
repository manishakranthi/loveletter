"use client"

import { useState, useRef, useEffect } from "react"
import { SkipForward, SkipBack, Pause, Play } from "lucide-react"

interface Song {
  title: string
  artist: string
  src: string
}

export default function MusicPlaylist() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Add your own songs here
  const playlist: Song[] = [
    {
      title: "Romantic Melody",
      artist: "Love Songs",
      src: "/romantic-music.mp3",
    },
    // Add more songs as needed
    {
      title: "Sweet Serenade",
      artist: "Love Songs",
      src: "/romantic-music.mp3", // Using the same file as placeholder
    },
    {
      title: "Forever Yours",
      artist: "Love Songs",
      src: "/romantic-music.mp3", // Using the same file as placeholder
    },
  ]

  useEffect(() => {
    audioRef.current = new Audio(playlist[currentSongIndex].src)
    audioRef.current.loop = false

    // Add ended event listener to play next song
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", playNextSong)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("ended", playNextSong)
        audioRef.current = null
      }
    }
  }, [currentSongIndex])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error)
      })
    }

    setIsPlaying(!isPlaying)
  }

  const playNextSong = () => {
    setCurrentSongIndex((prev) => (prev === playlist.length - 1 ? 0 : prev + 1))
    setIsPlaying(true)

    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error)
        setIsPlaying(false)
      })
    }
  }

  const playPreviousSong = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1))
    setIsPlaying(true)

    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error)
        setIsPlaying(false)
      })
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
      <button
        onClick={playPreviousSong}
        className="p-1 rounded-full hover:bg-pink-100 transition-colors"
        aria-label="Previous song"
      >
        <SkipBack className="w-4 h-4 text-pink-600" />
      </button>

      <button
        onClick={togglePlay}
        className="p-2 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause className="w-5 h-5 text-pink-600" /> : <Play className="w-5 h-5 text-pink-600" />}
      </button>

      <button
        onClick={playNextSong}
        className="p-1 rounded-full hover:bg-pink-100 transition-colors"
        aria-label="Next song"
      >
        <SkipForward className="w-4 h-4 text-pink-600" />
      </button>

      <div className="ml-1 text-xs text-pink-600 max-w-[100px] truncate hidden sm:block">
        {playlist[currentSongIndex].title}
      </div>
    </div>
  )
}
