import type { MusicTrack } from "@/types/music"
import { MusicCard } from "./music-card"

interface MusicGridProps {
  tracks: MusicTrack[]
}

export function MusicGrid({ tracks }: MusicGridProps) {
  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground text-lg">暂无音乐作品</p>
        <p className="text-muted-foreground/60 text-sm mt-1">敬请期待</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {tracks.map((track) => (
        <MusicCard key={track.slug} track={track} />
      ))}
    </div>
  )
}
