"use client"

import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePlayerStore } from "@/hooks/use-player-store"
import type { MusicTrack } from "@/types/music"

interface MusicPlayerSectionProps {
  track: MusicTrack
}

export function MusicPlayerSection({ track }: MusicPlayerSectionProps) {
  const { playTrack, currentTrack, isPlaying } = usePlayerStore()
  const isCurrentTrack = currentTrack?.slug === track.slug
  const isThisPlaying = isCurrentTrack && isPlaying

  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        className="gap-2 rounded-full"
        onClick={() => playTrack(track)}
      >
        {isThisPlaying ? (
          <>
            <Pause className="h-5 w-5" /> 暂停
          </>
        ) : (
          <>
            <Play className="h-5 w-5" /> 播放
          </>
        )}
      </Button>
    </div>
  )
}
