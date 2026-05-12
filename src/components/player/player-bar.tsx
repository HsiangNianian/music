"use client"

import Image from "next/image"
import { usePlayerStore } from "@/hooks/use-player-store"
import { useAudio } from "@/hooks/use-audio"
import { PlayerControls } from "./player-controls"
import { PlayerProgress } from "./player-progress"
import { PlayerVolume } from "./player-volume"

export function PlayerBar() {
  const { currentTrack, isVisible } = usePlayerStore()
  const { seekAudio } = useAudio()

  if (!isVisible || !currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-4 px-4 sm:px-6">
        {/* Track info */}
        <div className="flex items-center gap-3 min-w-0 w-48">
          <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden bg-muted">
            {currentTrack.cover && (
              <Image
                src={currentTrack.cover}
                alt={currentTrack.title}
                fill
                className="object-cover"
                sizes="40px"
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">HsiangNianian</p>
          </div>
        </div>

        {/* Controls + Progress */}
        <div className="flex items-center gap-3 flex-1 justify-center">
          <PlayerControls />
          <PlayerProgress onSeek={seekAudio} />
        </div>

        {/* Volume */}
        <div className="w-32 hidden md:flex justify-end">
          <PlayerVolume />
        </div>
      </div>
    </div>
  )
}
