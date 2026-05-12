import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { MusicTrack, MusicFrontmatter } from "@/types/music"

const musicDir = path.join(process.cwd(), "content/music")

// Prevent caching in development
let cachedTracks: MusicTrack[] | null = null

export function getAllMusic(): MusicTrack[] {
  if (cachedTracks) return cachedTracks

  if (!fs.existsSync(musicDir)) {
    cachedTracks = []
    return cachedTracks
  }

  const files = fs.readdirSync(musicDir).filter((f) => f.endsWith(".mdx"))

  const tracks: MusicTrack[] = files.map((file) => {
    const filePath = path.join(musicDir, file)
    const source = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(source)
    const frontmatter = data as MusicFrontmatter

    return {
      title: frontmatter.title,
      slug: frontmatter.slug,
      date: frontmatter.date,
      type: frontmatter.type,
      cover: frontmatter.cover,
      audio: frontmatter.audio,
      duration: frontmatter.duration,
      genre: frontmatter.genre,
      featured: frontmatter.featured ?? false,
      status: frontmatter.status ?? "draft",
      content,
    }
  })

  // Sort by date descending, filter only published
  cachedTracks = tracks
    .filter((t) => t.status !== "draft")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return cachedTracks
}

export function getPublishedMusic(): MusicTrack[] {
  return getAllMusic().filter((t) => t.status === "published")
}

export function getFeaturedMusic(): MusicTrack[] {
  return getPublishedMusic().filter((t) => t.featured)
}

export function getUpcomingMusic(): MusicTrack[] {
  return getAllMusic().filter((t) => t.status === "upcoming")
}

export function getMusicBySlug(slug: string): MusicTrack | undefined {
  return getPublishedMusic().find((t) => t.slug === slug)
}

// Clear cache (useful for HMR in development)
export function clearMusicCache(): void {
  cachedTracks = null
}
