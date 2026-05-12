"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  delay: number
}

interface Orb {
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
}

export function AmbientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const orbsRef = useRef<Orb[]>([])
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDark = document.documentElement.classList.contains("dark")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Generate stars
    const starCount = Math.min(Math.floor((canvas.width * canvas.height) / 3000), 350)
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.02 + 0.008,
      delay: Math.random() * Math.PI * 2,
    }))

    // Generate orbs
    orbsRef.current = [
      { x: 0.2, y: 0.3, size: 300, color: isDark ? "139,92,246" : "139,92,246", speedX: 0.003, speedY: 0.002 },
      { x: 0.8, y: 0.6, size: 250, color: isDark ? "6,182,212" : "6,182,212", speedX: -0.002, speedY: 0.003 },
      { x: 0.5, y: 0.8, size: 200, color: isDark ? "168,85,247" : "168,85,247", speedX: 0.004, speedY: -0.001 },
    ]

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    window.addEventListener("mousemove", handleMouse)

    // Animation loop
    const animate = () => {
      frameRef.current++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const t = frameRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Draw orbs
      for (const orb of orbsRef.current) {
        const ox = orb.x * canvas.width + Math.sin(t * orb.speedX + orb.x * 10) * 80 + (mx - 0.5) * 30
        const oy = orb.y * canvas.height + Math.cos(t * orb.speedY + orb.y * 10) * 80 + (my - 0.5) * 30
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size)
        gradient.addColorStop(0, `rgba(${orb.color}, ${isDark ? 0.12 : 0.06})`)
        gradient.addColorStop(0.5, `rgba(${orb.color}, ${isDark ? 0.06 : 0.03})`)
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(ox - orb.size, oy - orb.size, orb.size * 2, orb.size * 2)
      }

      // Draw stars
      for (const star of starsRef.current) {
        const twinkle = Math.sin(t * star.speed + star.delay) * 0.5 + 0.5
        const alpha = star.opacity * (0.4 + twinkle * 0.6)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    const raf = requestAnimationFrame(animate)

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains("dark")
      if (orbsRef.current[0]) {
        orbsRef.current[0].color = dark ? "139,92,246" : "139,92,246"
        orbsRef.current[1].color = dark ? "6,182,212" : "6,182,212"
        orbsRef.current[2].color = dark ? "168,85,247" : "168,85,247"
      }
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  )
}
