import Link from "next/link"
import Image from "next/image"
import { Calendar, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
    <Link href={`/releases/${release.slug}`}>
      <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all">
        <CardContent className="flex gap-4 p-4">
          <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-muted">
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
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {typeLabels[release.type] || release.type}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {release.date}
              </span>
            </div>
            <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
              {release.title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
