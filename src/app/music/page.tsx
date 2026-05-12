import { MusicGrid } from "@/components/music/music-grid"
import { getPublishedMusic } from "@/lib/music"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "音乐作品 | HsiangNianian",
  description: "HsiangNianian 的全部音乐作品 — 原创单曲与东方同人编曲",
}

export default function MusicPage() {
  const tracks = getPublishedMusic()

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">音乐作品</h1>
        <p className="text-muted-foreground mt-2">
          原创单曲 · 东方同人编曲
        </p>
      </div>

      <MusicGrid tracks={tracks} />
    </div>
  )
}
