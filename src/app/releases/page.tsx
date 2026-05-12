import { getAllReleases } from "@/lib/releases"
import { ReleaseCard } from "@/components/release/release-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "发布动态 | HsiangNianian",
  description: "HsiangNianian 的音乐发行预告与创作故事",
}

export default function ReleasesPage() {
  const releases = getAllReleases()

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">发布动态</h1>
        <p className="text-muted-foreground mt-2">
          发行预告 · 创作故事 · 最新动态
        </p>
      </div>

      {releases.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground text-lg">暂无发布动态</p>
          <p className="text-muted-foreground/60 text-sm mt-1">敬请期待</p>
        </div>
      ) : (
        <div className="space-y-4">
          {releases.map((release) => (
            <ReleaseCard key={release.slug} release={release} />
          ))}
        </div>
      )}
    </div>
  )
}
