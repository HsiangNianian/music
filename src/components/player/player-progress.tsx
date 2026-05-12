"use client"

import { Slider } from "@/components/ui/slider"
import { usePlayerStore } from "@/hooks/use-player-store"

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

interface PlayerProgressProps {
  onSeek: (time: number) => void
}

export function PlayerProgress({ onSeek }: PlayerProgressProps) {
  const { currentTime, duration, currentTrack } = usePlayerStore()

  if (!currentTrack) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex items-center gap-2 flex-1 max-w-md">
      <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">
        {formatTime(currentTime)}
      </span>
      <Slider
        value={[progress]}
        min={0}
        max={100}
        step={0.1}
        className="flex-1 cursor-pointer"
        onValueChange={(value) => {
          const val = Array.isArray(value) ? value[0] : value
          const newTime = (val / 100) * duration
          onSeek(newTime)
        }}
        aria-label="进度"
      />
      <span className="text-xs text-muted-foreground w-8 tabular-nums">
        {formatTime(duration)}
      </span>
    </div>
  )
}
