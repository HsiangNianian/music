import { Skeleton } from "@/components/ui/skeleton"

export default function MusicDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <Skeleton className="aspect-square w-full max-w-xs rounded-xl shrink-0" />
        <div className="flex flex-col justify-center space-y-4 flex-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>
      <div className="border-t border-border/40 pt-10 space-y-4">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
