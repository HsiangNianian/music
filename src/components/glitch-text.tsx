interface GlitchTextProps {
  children: string
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div"
  className?: string
  glitch?: boolean
}

export function GlitchText({
  children,
  as: Tag = "span",
  className = "",
  glitch = true,
}: GlitchTextProps) {
  if (!glitch) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag className={`glitch-text ${className}`} data-text={children}>
      {children}
    </Tag>
  )
}
