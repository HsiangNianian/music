import { compileMDX } from "next-mdx-remote/rsc"

interface MDXContentProps {
  source: string
}

export async function MDXContent({ source }: MDXContentProps) {
  if (!source?.trim()) return null

  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
    },
  })

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary prose-code:text-sm">
      {content}
    </div>
  )
}
