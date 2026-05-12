import { Skeleton } from "@/components/ui/skeleton"

export default function MusicLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-10">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-5 w-60 mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>
    </div>
  )
}
