import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-muted-foreground/30 mb-4">404</h1>
      <h2 className="text-xl font-semibold mb-2">页面未找到</h2>
      <p className="text-muted-foreground mb-8">你寻找的页面不存在或已被移除</p>
      <Link
        href="/"
        className="inline-flex h-9 items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 text-sm font-medium hover:bg-primary/80 transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
}
