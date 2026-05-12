import Link from "next/link"
import Image from "next/image"
import { Calendar, FileText, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Release } from "@/types/music"

interface ReleaseCardProps {
  release: Release
}

const typeLabels: Record<string, string> = {
  release: "专辑发布",
  announcement: "公告",
  story: "创作故事",
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <Link href={`/releases/${release.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-lg hover:shadow-primary/5">
        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex gap-4 p-4 sm:gap-5 sm:p-5">
          {/* Cover */}
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-muted transition-transform duration-300 group-hover:scale-105">
            {release.cover ? (
              <Image
                src={release.cover}
                alt={release.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <FileText className="h-8 w-8 text-muted-foreground/40" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 border-0 bg-secondary/50">
                {typeLabels[release.type] || release.type}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground/60">
                <Calendar className="h-3 w-3" />
                {release.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-1">
                {release.title}
              </h3>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/30 transition-all duration-300 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
