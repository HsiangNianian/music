import Image from "next/image"
import { notFound } from "next/navigation"
import { getPublishedMusic, getMusicBySlug } from "@/lib/music"
import { MDXContent } from "@/components/mdx-content"
import { MusicPlayerSection } from "./music-player-section"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPublishedMusic().map((track) => ({ slug: track.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const track = getMusicBySlug(slug)
  if (!track) return {}

  return {
    title: `${track.title} | HsiangNianian`,
    description: `${track.title} — ${track.type === "original" ? "原创" : "编曲"} · ${track.genre}`,
  }
}

export default async function MusicDetailPage({ params }: PageProps) {
  const { slug } = await params
  const track = getMusicBySlug(slug)

  if (!track) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="relative aspect-square w-full max-w-xs mx-auto md:mx-0 shrink-0 rounded-xl overflow-hidden bg-muted">
          {track.cover ? (
            <Image
              src={track.cover}
              alt={track.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 320px"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground/40">
              <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {track.type === "original" ? "原创单曲" : "同人编曲"}
              </Badge>
              <span className="text-sm text-muted-foreground">{track.date}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{track.title}</h1>
            <p className="text-muted-foreground">
              HsiangNianian · {track.genre} · {track.duration}
            </p>
          </div>

          <MusicPlayerSection track={track} />
        </div>
      </div>

      {/* Creation story */}
      {track.content?.trim() && (
        <section className="border-t border-border/40 pt-10">
          <h2 className="text-xl font-semibold mb-6">创作故事</h2>
          <MDXContent source={track.content} />
        </section>
      )}
    </div>
  )
}
