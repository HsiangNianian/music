"use client"

import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePlayerStore } from "@/hooks/use-player-store"

export function PlayerControls() {
  const { isPlaying, currentTrack, togglePlay } = usePlayerStore()

  if (!currentTrack) return null

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="上一首">
        <SkipBack className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full"
        onClick={togglePlay}
        aria-label={isPlaying ? "暂停" : "播放"}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="下一首">
        <SkipForward className="h-4 w-4" />
      </Button>
    </div>
  )
}
