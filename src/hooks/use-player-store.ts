import { create } from "zustand"
import type { MusicTrack } from "@/types/music"

interface PlayerState {
  // State
  currentTrack: MusicTrack | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isVisible: boolean

  // Actions
  playTrack: (track: MusicTrack) => void
  pause: () => void
  resume: () => void
  togglePlay: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setIsVisible: (visible: boolean) => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  isVisible: false,

  playTrack: (track) => {
    const current = get().currentTrack
    // If same track, toggle play
    if (current?.slug === track.slug) {
      set({ isPlaying: !get().isPlaying })
    } else {
      set({
        currentTrack: track,
        isPlaying: true,
        currentTime: 0,
        duration: 0,
        isVisible: true,
      })
    }
  },

  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),

  togglePlay: () => {
    const { isPlaying, currentTrack } = get()
    if (currentTrack) {
      set({ isPlaying: !isPlaying })
    }
  },

  seek: (time) => set({ currentTime: time }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setIsVisible: (visible) => set({ isVisible: visible }),
}))
