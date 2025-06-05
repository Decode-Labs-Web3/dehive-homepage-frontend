"use client"

import { useEffect, useRef } from "react"

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const blobs: React.ReactNode[] = []

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight || document.body.scrollHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    const particles: Particle[] = []
    const particleCount = 500

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      glow: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5

        const colorSets = [
          { color: "rgba(168, 85, 247, 0.6)", glow: "#a855f7" },
          { color: "rgba(236, 72, 153, 0.6)", glow: "#ec4899" },
          { color: "rgba(249, 115, 22, 0.6)", glow: "#f97316" },
          { color: "rgba(59, 130, 246, 0.5)", glow: "#3b82f6" },
        ]
        const pick = colorSets[Math.floor(Math.random() * colorSets.length)]
        this.color = pick.color
        this.glow = pick.glow
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.save()
        ctx.shadowColor = this.glow
        ctx.shadowBlur = 12
        ctx.globalAlpha = 0.6
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-x-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.01) 20%, transparent 40%)",
          mixBlendMode: "screen"
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(163, 230, 53, 0.01) 10%, transparent 30%)",
          mixBlendMode: "screen"
        }}
        aria-hidden="true"
      />
      {blobs}
      <canvas ref={canvasRef} className="absolute inset-0 w-screen h-screen opacity-30" aria-hidden="true" />
    </div>
  )
}