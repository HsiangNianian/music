import Link from "next/link"
import { Music, Sparkles, ArrowRight } from "lucide-react"
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
      {/* ───── Hero Section ───── */}
      <section className="relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-float-slow" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px] animate-float" style={{ animationDelay: "-3s" }} />
          <div className="absolute top-1/3 left-1/2 h-[200px] w-[200px] rounded-full bg-primary/5 blur-[80px] animate-float" style={{ animationDelay: "-1.5s" }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center pt-24 pb-20 sm:pt-32 sm:pb-28">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs text-primary mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              新的作品正在筹备中
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fade-in-up-1">
              <span className="font-display gradient-text">HsiangNianian</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-xl text-base sm:text-lg text-muted-foreground/80 leading-relaxed mb-10 animate-fade-in-up-2">
              以音符为笔，记录每一个值得铭记的瞬间 ——
              <br />
              从电子律动到东方同人，每一首都是一个故事。
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up-3">
              <Link
                href="/music"
                className="group relative inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground gap-2 overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.15)_50%,transparent_70%)] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
                <Music className="h-4 w-4 relative z-10" />
                <span className="relative z-10">浏览作品</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border/60 bg-background/50 backdrop-blur-sm px-8 text-sm font-medium gap-2 transition-all hover:border-primary/30 hover:bg-primary/5 hover:scale-105 active:scale-95"
              >
                关于我
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute left-8 top-1/4 hidden md:block animate-float" style={{ animationDuration: "7s" }}>
              <div className="h-12 w-12 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm flex items-center justify-center">
                <span className="text-lg opacity-40">♪</span>
              </div>
            </div>
            <div className="absolute right-12 top-1/3 hidden md:block animate-float" style={{ animationDuration: "9s", animationDelay: "-2s" }}>
              <div className="h-8 w-8 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm flex items-center justify-center">
                <span className="text-sm opacity-40">♫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ───── Featured Music ───── */}
      {featuredTracks.length > 0 && (
        <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 block">精选</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">推荐作品</h2>
            </div>
            <Link
              href="/music"
              className="hidden sm:inline-flex h-9 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              全部作品
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <MusicGrid tracks={featuredTracks} />
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/music"
              className="inline-flex h-9 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              全部作品 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* ───── Divider ───── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* ───── Latest Releases ───── */}
      {latestReleases.length > 0 && (
        <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Section header */}
            <div className="lg:col-span-2">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 block">动态</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">最新发布</h2>
              <p className="text-muted-foreground/70 text-sm leading-relaxed">
                发行预告、创作故事、以及那些
                <br />
                藏在音符背后的心情。
              </p>
              <Link
                href="/releases"
                className="mt-6 inline-flex h-9 items-center gap-1.5 text-sm font-medium text-foreground hover:gap-2.5 transition-all group"
              >
                查看全部动态
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Release list */}
            <div className="lg:col-span-3 space-y-5">
              {latestReleases.map((release) => (
                <ReleaseCard key={release.slug} release={release} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── Upcoming ───── */}
      {upcomingTracks.length > 0 && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
            <div className="flex items-center gap-3 mb-10">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight">即将发布</h2>
            </div>
            <MusicGrid tracks={upcomingTracks} />
          </div>
        </section>
      )}

      {/* ───── Footer banner ───── */}
      <section className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-background to-cyan-500/5 p-8 sm:p-12">
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-[80px]" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                用音乐记录生活
              </h2>
              <p className="text-muted-foreground/70 max-w-md mb-6">
                每一段旋律都是一次心跳，
                <br />
                每一个音符都是一个故事。
              </p>
              <Link
                href="/music"
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary text-primary-foreground px-6 text-sm font-medium gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Music className="h-4 w-4" />
                开始聆听
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
