"use client"

import { useEffect, useState, useCallback } from "react"

export function Preloader() {
  const [done, setDone] = useState(false)
  const [remove, setRemove] = useState(false)

  const handleDone = useCallback(() => {
    setDone(true)
    setTimeout(() => setRemove(true), 500)
  }, [])

  useEffect(() => {
    const timer = setTimeout(handleDone, 1200)
    return () => clearTimeout(timer)
  }, [handleDone])

  if (remove) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        done ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-6">
        <p className="text-sm font-mono tracking-[0.3em] text-muted-foreground/30">
          HSIANGNIANIAN
        </p>
        <div className="w-32 h-[1px] mx-auto bg-border/30 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary/40 transition-all duration-[1s]"
            style={{ width: done ? "100%" : "0%" }}
          />
        </div>
      </div>
    </div>
  )
}
