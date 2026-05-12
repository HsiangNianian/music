import type { MusicTrack } from "@/types/music"
import { MusicCard } from "./music-card"

interface MusicGridProps {
  tracks: MusicTrack[]
}

export function MusicGrid({ tracks }: MusicGridProps) {
  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full border border-border/40 bg-muted/30 p-4 mb-4">
          <svg className="h-8 w-8 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <p className="text-muted-foreground text-lg">暂无音乐作品</p>
        <p className="text-muted-foreground/50 text-sm mt-1">敬请期待</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {tracks.map((track, i) => (
        <div
          key={track.slug}
          className="animate-fade-in-up"
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
        >
          <MusicCard track={track} />
        </div>
      ))}
    </div>
  )
}
