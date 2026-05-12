import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Release, ReleaseFrontmatter } from "@/types/music"

const releasesDir = path.join(process.cwd(), "content/releases")

let cachedReleases: Release[] | null = null

export function getAllReleases(): Release[] {
  if (cachedReleases) return cachedReleases

  if (!fs.existsSync(releasesDir)) {
    cachedReleases = []
    return cachedReleases
  }

  const files = fs.readdirSync(releasesDir).filter((f) => f.endsWith(".mdx"))

  const releases: Release[] = files.map((file) => {
    const filePath = path.join(releasesDir, file)
    const source = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(source)
    const frontmatter = data as ReleaseFrontmatter

    return {
      title: frontmatter.title,
      slug: frontmatter.slug,
      date: frontmatter.date,
      type: frontmatter.type,
      relatedMusic: frontmatter.relatedMusic,
      cover: frontmatter.cover,
      content,
    }
  })

  cachedReleases = releases.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return cachedReleases
}

export function getReleaseBySlug(slug: string): Release | undefined {
  return getAllReleases().find((r) => r.slug === slug)
}

export function clearReleasesCache(): void {
  cachedReleases = null
}
