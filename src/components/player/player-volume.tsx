"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { usePlayerStore } from "@/hooks/use-player-store"
import { useState } from "react"

export function PlayerVolume() {
  const { volume, setVolume } = usePlayerStore()
  const [prevVolume, setPrevVolume] = useState(0.7)

  const isMuted = volume === 0

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume)
    } else {
      setPrevVolume(volume)
      setVolume(0)
    }
  }

  return (
    <div className="hidden sm:flex items-center gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute} aria-label={isMuted ? "取消静音" : "静音"}>
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
      <Slider
        value={[volume * 100]}
        min={0}
        max={100}
        step={1}
        className="w-20 cursor-pointer"
        onValueChange={(value) => {
          const val = Array.isArray(value) ? value[0] : value
          setVolume(val / 100)
        }}
        aria-label="音量"
      />
    </div>
  )
}
