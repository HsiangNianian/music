import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllReleases, getReleaseBySlug } from "@/lib/releases"
import { getPublishedMusic } from "@/lib/music"
import { MDXContent } from "@/components/mdx-content"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllReleases().map((release) => ({ slug: release.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const release = getReleaseBySlug(slug)
  if (!release) return {}

  return {
    title: `${release.title} | HsiangNianian`,
    description: release.title,
  }
}

const typeLabels: Record<string, string> = {
  release: "专辑发布",
  announcement: "公告",
  story: "创作故事",
}

export default async function ReleaseDetailPage({ params }: PageProps) {
  const { slug } = await params
  const release = getReleaseBySlug(slug)

  if (!release) {
    notFound()
  }

  // Find related music if any
  const relatedTrack = release.relatedMusic
    ? getPublishedMusic().find((t) => t.slug === release.relatedMusic)
    : null

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <Link
        href="/releases"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        返回发布动态
      </Link>

      <article>
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">
              {typeLabels[release.type] || release.type}
            </Badge>
            <span className="text-sm text-muted-foreground">{release.date}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{release.title}</h1>
        </header>

        {release.cover && (
          <div className="relative aspect-video w-full max-h-96 rounded-xl overflow-hidden bg-muted mb-10">
            <Image
              src={release.cover}
              alt={release.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {release.content?.trim() && (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary">
            <MDXContent source={release.content} />
          </div>
        )}

        {relatedTrack && (
          <div className="mt-12 p-4 rounded-lg border border-border/50 bg-muted/30">
            <p className="text-sm text-muted-foreground mb-2">关联作品</p>
            <Link
              href={`/music/${relatedTrack.slug}`}
              className="font-medium hover:text-primary transition-colors"
            >
              {relatedTrack.title}
            </Link>
          </div>
        )}
      </article>
    </div>
  )
}
