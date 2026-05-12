"use client"

import { useEffect, useRef, useState } from "react"
import type { MusicTrack, Release } from "@/types/music"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { usePlayerStore } from "@/hooks/use-player-store"

interface TimelineEraProps {
  year: string
  title: string
  subtitle?: string
  story: string
  storyQuote?: string
  tracks: MusicTrack[]
  releases?: Release[]
  index: number
  total: number
}

export function TimelineEra({
  year,
  title,
  subtitle,
  story,
  storyQuote,
  tracks,
  releases,
  index,
  total,
}: TimelineEraProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="slide-section border-t border-border/5"
    >
      <div className="slide-content">
        {/* Slide number */}
        <div className="flex items-center gap-3 mb-16 sm:mb-20">
          <span className="slide-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 h-px bg-border/5" />
          <span className="slide-number">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subtitle */}
            {subtitle && (
              <p
                className={`text-xs font-mono tracking-[0.2em] text-muted-foreground/30 uppercase transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {subtitle}
              </p>
            )}

            {/* Year */}
            <h2
              className={`text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-primary/10 leading-none transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {year}
            </h2>

            {/* Title */}
            <h3
              className={`text-2xl sm:text-3xl font-bold tracking-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {title}
            </h3>
          </div>

          {/* Right column */}
          <div className="lg:col-span-3 space-y-10">
            {/* Story */}
            <div
              className={`space-y-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <p className="text-sm sm:text-base text-muted-foreground/60 leading-relaxed">
                {story}
              </p>

              {storyQuote && (
                <blockquote className="pl-5 border-l-2 border-primary/20 text-sm text-muted-foreground/40 italic leading-relaxed">
                  {storyQuote}
                </blockquote>
              )}
            </div>

            {/* Track listing */}
            {tracks.length > 0 && (
              <div
                className={`space-y-3 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="flex items-center gap-3 pb-2">
                  <span className="text-[10px] font-mono tracking-widest text-muted-foreground/20">
                    TRACKS
                  </span>
                  <div className="h-px flex-1 bg-border/5" />
                </div>

                {tracks.map((track, i) => (
                  <TimelineTrackCard
                    key={track.slug}
                    track={track}
                    index={i}
                  />
                ))}
              </div>
            )}

            {/* Release link */}
            {releases && releases.length > 0 && (
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <Link
                  href={`/releases/${releases[0].slug}`}
                  className="group inline-flex items-center gap-2 text-[11px] font-mono tracking-wider text-muted-foreground/20 hover:text-primary/50 transition-colors"
                >
                  发行详情
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineTrackCard({
  track,
  index,
}: {
  track: MusicTrack
  index: number
}) {
  const { currentTrack, isPlaying, playTrack } = usePlayerStore()
  const isActive = currentTrack?.slug === track.slug && isPlaying

  return (
    <button
      onClick={() => playTrack(track)}
      className="block w-full text-left group"
    >
      <div
        className={`flex items-center gap-4 px-4 py-3 border border-transparent transition-all duration-300 ${
          isActive
            ? "bg-primary/[0.04] border-primary/10"
            : "hover:bg-muted/20 hover:border-border/10"
        }`}
      >
        {/* Number */}
        <span className="text-[11px] font-mono text-muted-foreground/15 w-6 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Cover */}
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded">
          <img
            src={track.cover}
            alt={track.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[9px] font-mono tracking-wider text-primary/30 uppercase">
              {track.type === "original" ? "ORIGINAL" : "ARRANGE"}
            </span>
            <span className="text-muted-foreground/10">·</span>
            <span className="text-[9px] font-mono text-muted-foreground/20">
              {track.genre}
            </span>
          </div>
          <h4 className="text-sm font-medium tracking-tight truncate">
            {isActive && "▶ "}
            {track.title}
          </h4>
        </div>

        {/* Right */}
        <div className="shrink-0 flex items-center gap-3">
          <span className="text-[10px] font-mono text-muted-foreground/20">
            {track.duration}
          </span>
          {isActive ? (
            <div className="flex items-end gap-[2px] h-3 w-3">
              <span className="w-[2px] bg-primary rounded-full animate-equalizer" />
              <span className="w-[2px] bg-primary rounded-full animate-equalizer" style={{ animationDelay: "150ms" }} />
              <span className="w-[2px] bg-primary rounded-full animate-equalizer" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            <svg className="h-3 w-3 text-muted-foreground/15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}
