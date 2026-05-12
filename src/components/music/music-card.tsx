"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Music } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePlayerStore } from "@/hooks/use-player-store"
import type { MusicTrack } from "@/types/music"

interface MusicCardProps {
  track: MusicTrack
}

export function MusicCard({ track }: MusicCardProps) {
  const { playTrack, currentTrack, isPlaying } = usePlayerStore()

  const isCurrentTrack = currentTrack?.slug === track.slug
  const isThisPlaying = isCurrentTrack && isPlaying

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all">
      <CardContent className="p-0">
        <Link href={`/music/${track.slug}`} className="block">
          <div className="relative aspect-square bg-muted">
            {track.cover ? (
              <Image
                src={track.cover}
                alt={track.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Music className="h-12 w-12 text-muted-foreground/40" />
              </div>
            )}
            <Button
              size="icon"
              className="absolute bottom-2 right-2 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              onClick={(e) => {
                e.preventDefault()
                playTrack(track)
              }}
              aria-label={isThisPlaying ? "正在播放" : "播放"}
            >
              <Play className="h-5 w-5 ml-0.5" />
            </Button>
          </div>
        </Link>
        <div className="p-3 space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {track.type === "original" ? "原创" : "编曲"}
            </Badge>
            <span className="text-[11px] text-muted-foreground">{track.duration}</span>
          </div>
          <Link href={`/music/${track.slug}`}>
            <h3 className="font-medium text-sm leading-tight hover:text-primary transition-colors truncate">
              {track.title}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground">{track.genre}</p>
        </div>
      </CardContent>
    </Card>
  )
}
