"use client"

import { useEffect, useRef } from "react"
import { usePlayerStore } from "./use-player-store"

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const {
    currentTrack,
    isPlaying,
    volume,
    seek,
    setCurrentTime,
    setDuration,
    setIsVisible,
    pause,
  } = usePlayerStore()

  useEffect(() => {
    // Create audio element once
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = "metadata"
    }

    const audio = audioRef.current

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const onDurationChange = () => {
      setDuration(audio.duration || 0)
    }

    const onEnded = () => {
      pause()
      setCurrentTime(0)
    }

    const onError = () => {
      console.warn("Audio playback error, retrying...")
      pause()
    }

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("durationchange", onDurationChange)
    audio.addEventListener("ended", onEnded)
    audio.addEventListener("error", onError)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("durationchange", onDurationChange)
      audio.removeEventListener("ended", onEnded)
      audio.removeEventListener("error", onError)
    }
  }, [setCurrentTime, setDuration, pause])

  // Sync volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Handle track changes and play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (!currentTrack) {
      audio.pause()
      audio.src = ""
      setIsVisible(false)
      return
    }

    // Set new source if track changed
    const currentSrc = audio.getAttribute("data-track-slug")
    if (currentSrc !== currentTrack.slug) {
      audio.src = currentTrack.audio
      audio.setAttribute("data-track-slug", currentTrack.slug)
      audio.load()
    }

    if (isPlaying) {
      audio.play().catch(() => {
        // Autoplay may be blocked by browser
        pause()
      })
    } else {
      audio.pause()
    }
  }, [currentTrack, isPlaying, setIsVisible, pause])

  // Handle seeking
  const seekAudio = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  // Handle seeking from external (slider)
  useEffect(() => {
    // Only sync if the seek value is different from current audio time
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    // The seek function is called directly, so we don't need to watch for store changes
    // Instead, we expose seekAudio for the slider to use
  }, [seek, currentTrack])

  return { audioRef, seekAudio }
}
