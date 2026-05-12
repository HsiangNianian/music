"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Music } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-cyan-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 group-hover:border-primary/30 group-hover:scale-[1.02]">
        <Link href={`/music/${track.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-muted">
            {track.cover ? (
              <Image
                src={track.cover}
                alt={track.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Music className="h-12 w-12 text-muted-foreground/40" />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <Button
                size="icon"
                className="h-14 w-14 rounded-full bg-primary/90 hover:bg-primary shadow-xl shadow-primary/25 backdrop-blur-sm transition-all duration-200 hover:scale-110 active:scale-95"
                onClick={(e) => {
                  e.preventDefault()
                  playTrack(track)
                }}
                aria-label={isThisPlaying ? "正在播放" : "播放"}
              >
                <Play className={`h-6 w-6 ml-0.5 ${isThisPlaying ? "hidden" : ""}`} />
                {isThisPlaying && (
                  <span className="flex items-end gap-0.5 h-5">
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms", height: "60%" }} />
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms", height: "100%" }} />
                    <span className="w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms", height: "40%" }} />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </Link>

        <div className="p-3.5 space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 border-0 bg-secondary/50"
            >
              {track.type === "original" ? "原创" : "编曲"}
            </Badge>
            <span className="text-[11px] text-muted-foreground/60">{track.duration}</span>
          </div>
          <Link href={`/music/${track.slug}`}>
            <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {track.title}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground/50">{track.genre}</p>
        </div>
      </div>
    </div>
  )
}
