import { Skeleton } from "@/components/ui/skeleton"

export default function ReleaseDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <Skeleton className="h-4 w-32 mb-8" />
      <div className="mb-10">
        <Skeleton className="h-5 w-20 mb-3" />
        <Skeleton className="h-9 w-72" />
      </div>
      <Skeleton className="aspect-video w-full rounded-xl mb-10" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  )
}
