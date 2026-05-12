import Link from "next/link"
import { Music, Sparkles } from "lucide-react"
import { MusicGrid } from "@/components/music/music-grid"
import { getFeaturedMusic, getUpcomingMusic } from "@/lib/music"
import { getAllReleases } from "@/lib/releases"
import { ReleaseCard } from "@/components/release/release-card"

export default function HomePage() {
  const featuredTracks = getFeaturedMusic()
  const upcomingTracks = getUpcomingMusic()
  const latestReleases = getAllReleases().slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              HsiangNianian
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              记录音乐创作的点滴 —— 从原创单曲到东方同人编曲，
              <br />
              每一个音符都是一段故事的开始。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/music"
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary text-primary-foreground px-6 text-sm font-medium gap-2 hover:bg-primary/80 transition-colors"
              >
                <Music className="h-5 w-5" />
                浏览作品
              </Link>
              <Link
                href="/about"
                className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-medium gap-2 hover:bg-muted transition-colors"
              >
                关于我
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      </section>

      {/* Featured Music */}
      {featuredTracks.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">精选作品</h2>
              <p className="text-muted-foreground mt-1">推荐曲目</p>
            </div>
            <Link
              href="/music"
              className="inline-flex h-8 items-center justify-center rounded-lg px-2.5 text-sm font-medium gap-1 hover:bg-muted transition-colors"
            >
              查看全部 <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <MusicGrid tracks={featuredTracks} />
        </section>
      )}

      {/* Upcoming */}
      {upcomingTracks.length > 0 && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">即将发布</h2>
            </div>
            <MusicGrid tracks={upcomingTracks} />
          </div>
        </section>
      )}

      {/* Latest Releases */}
      {latestReleases.length > 0 && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">最新动态</h2>
                <p className="text-muted-foreground mt-1">发行预告与创作故事</p>
              </div>
              <Link
                href="/releases"
                className="inline-flex h-8 items-center justify-center rounded-lg px-2.5 text-sm font-medium gap-1 hover:bg-muted transition-colors"
              >
                查看全部 <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="space-y-4">
              {latestReleases.map((release) => (
                <ReleaseCard key={release.slug} release={release} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
