import Link from "next/link"
import { Music, ArrowRight } from "lucide-react"
import { TimelineEra } from "@/components/timeline/timeline-era"
import { getAllMusic } from "@/lib/music"
import { getAllReleases } from "@/lib/releases"

const TOTAL_SLIDES = 6

export default function HomePage() {
  const allMusic = getAllMusic()
  const releases = getAllReleases()

  const eras = [
    {
      year: "2021",
      title: "空白的创伤",
      subtitle: "起点 · 同人编曲",
      story:
        "一切的开始。以一首东方同人编曲《Intro》作为起点，加入了 BamBoO₂ノVOICE 社团的专辑《Blank Trauma》。这首歌对我来说不仅仅是一段旋律——它是我在同人音乐世界中的第一声问候，也是「HsiangNianian」这个身份的开端。",
      storyQuote:
        "妖怪之山的旋律在 Classical / House 的节拍中重新苏醒——这是我对东方音乐世界的初次探索。",
      tracks: allMusic.filter((t) => {
        const d = new Date(t.date)
        return d >= new Date("2021-01-01") && d < new Date("2022-01-01")
      }),
      releases: releases.filter((r) => r.slug === "blank-trauma"),
    },
    {
      year: "2022",
      title: "陨落与留存",
      subtitle: "原创 · 电子与人声",
      story:
        "年初，《Falita - 陨落》诞生了。这是我第一首原创单曲，尝试用电子音色描绘「消逝」——那些在时间中逐渐模糊的记忆与身份。半年后，《请你留下》以人声作品的形式出现，像是给予陨落的回答：在一切变化中，我们仍想抓住些什么。",
      storyQuote:
        "「请你留下，在这即将消散的梦里，至少让我记得你的模样。」",
      tracks: allMusic.filter((t) => {
        const d = new Date(t.date)
        return d >= new Date("2022-01-01") && d < new Date("2022-07-24") && t.slug !== "a-long-farewell"
      }),
      releases: releases.filter((r) => r.slug === "falita-debut"),
    },
    {
      year: "2022",
      title: "Mutichrome · Atmosphere",
      subtitle: "再会 · 东方同人",
      story:
        "同年七月，我再次参与了 BamBoO₂ノVOICE 的专辑《Mutichrome Atmosphere》。这次我选择改编「ヒロシゲ36号 ～ Neo Super-Express」——一首关于列车与告别的曲子。《A Long Farewell》全长仅 1:11，但我想在极短的时间内，捕捉疾驰的列车感与告别的情感。",
      storyQuote:
        "全长仅 1:11 的编曲，却承载了整张专辑中最长的告别。",
      tracks: allMusic.filter((t) => t.slug === "a-long-farewell"),
      releases: releases.filter((r) => r.slug === "mutichrome-atmosphere"),
    },
  ]

  const upcoming = allMusic.filter((t) => t.status === "upcoming")

  return (
    <div>
      {/* ─── SLIDE 1: TITLE ─── */}
      <section className="slide-section">
        <div className="slide-content">
          {/* Top number */}
          <div className="flex items-center gap-3 mb-24 sm:mb-32">
            <span className="slide-number">01</span>
            <div className="flex-1 h-px bg-border/5" />
            <span className="slide-number">{String(TOTAL_SLIDES).padStart(2, "0")}</span>
          </div>

          <div className="max-w-3xl">
            <p className="text-xs font-mono tracking-[0.25em] text-muted-foreground/25 mb-8 uppercase">
              Independent Music Producer
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6">
              <span className="font-display gradient-text">HsiangNianian</span>
            </h1>
            <p className="text-sm text-muted-foreground/40 font-mono tracking-wide max-w-lg leading-relaxed">
              以音符为笔，记录每一个值得铭记的瞬间
            </p>
          </div>

          {/* Bottom nav */}
          <div className="flex items-center gap-4 mt-20">
            <Link
              href="#timeline"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-muted-foreground/30 hover:text-foreground/60 transition-colors"
            >
              浏览时间线
              <ArrowRight className="h-3 w-3" />
            </Link>
            <span className="slide-dot" />
            <Link
              href="/music"
              className="text-xs font-mono tracking-wider text-muted-foreground/20 hover:text-foreground/40 transition-colors"
            >
              全部作品
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SLIDE 2: TIMELINE INTRO ─── */}
      <section className="slide-section border-t border-border/5">
        <div className="slide-content">
          <div className="flex items-center gap-3 mb-16 sm:mb-20">
            <span className="slide-number">02</span>
            <div className="flex-1 h-px bg-border/5" />
            <span className="slide-number">{String(TOTAL_SLIDES).padStart(2, "0")}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-xs font-mono tracking-[0.2em] text-muted-foreground/25 uppercase">
                时间线
              </p>
            </div>
            <div className="lg:col-span-3 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                用音乐写下的日记
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground/50 leading-relaxed">
                每一首歌都是一个时间节点。
                <br />
                按下播放键，你会听到某个时刻的我。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SLIDES 3-5: TIMELINE ERAS ─── */}
      <div id="timeline">
        {eras.map((era, i) => (
          <TimelineEra
            key={`${era.year}-${era.title}`}
            year={era.year}
            title={era.title}
            subtitle={era.subtitle}
            story={era.story}
            storyQuote={era.storyQuote}
            tracks={era.tracks}
            releases={era.releases}
            index={i + 2}
            total={TOTAL_SLIDES}
          />
        ))}
      </div>

      {/* ─── SLIDE 6: END ─── */}
      <section className="slide-section border-t border-border/5">
        <div className="slide-content">
          <div className="flex items-center gap-3 mb-16 sm:mb-20">
            <span className="slide-number">{String(TOTAL_SLIDES).padStart(2, "0")}</span>
            <div className="flex-1 h-px bg-border/5" />
            <span className="slide-number">{String(TOTAL_SLIDES).padStart(2, "0")}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-xs font-mono tracking-[0.2em] text-muted-foreground/25 uppercase">
                现在
              </p>
            </div>
            <div className="lg:col-span-3 space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                故事还在继续
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground/50 leading-relaxed">
                已发布的作品只是序章。
                <br />
                接下来的旋律正在筹备中。
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <Link
                  href="/music"
                  className="group inline-flex items-center gap-2 text-xs font-mono tracking-wider text-foreground/60 hover:text-foreground transition-colors border-b border-transparent hover:border-foreground/30 pb-0.5"
                >
                  <Music className="h-3 w-3" />
                  浏览全部作品
                </Link>
                {upcoming.length > 0 && (
                  <Link
                    href="/music"
                    className="text-xs font-mono tracking-wider text-muted-foreground/20 hover:text-muted-foreground/40 transition-colors"
                  >
                    即将发布 →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-24 pt-8 border-t border-border/5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono tracking-wider text-muted-foreground/15">
                HSIANGNIANIAN · MUSIC
              </p>
              <p className="text-[10px] font-mono tracking-wider text-muted-foreground/15">
                每一段旋律都是一次心跳
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
