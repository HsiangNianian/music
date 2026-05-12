export interface MusicTrack {
  title: string
  slug: string
  date: string
  type: "original" | "arrangement"
  cover: string
  audio: string
  duration: string
  genre: string
  featured: boolean
  status: "published" | "upcoming" | "draft"
  content: string // MDX content
}

export interface Release {
  title: string
  slug: string
  date: string
  type: "release" | "announcement" | "story"
  relatedMusic?: string
  cover: string
  content: string // MDX content
}

export interface MusicFrontmatter {
  title: string
  slug: string
  date: string
  type: "original" | "arrangement"
  cover: string
  audio: string
  duration: string
  genre: string
  featured: boolean
  status: "published" | "upcoming" | "draft"
}

export interface ReleaseFrontmatter {
  title: string
  slug: string
  date: string
  type: "release" | "announcement" | "story"
  relatedMusic?: string
  cover: string
}
