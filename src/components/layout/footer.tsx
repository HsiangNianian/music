import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex flex-col items-center gap-4 px-4 py-8 sm:px-6 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} HsiangNianian. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="https://github.com/HsiangNianian" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </Link>
          <span className="text-border">/</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  )
}
