'use client'

import { useEffect, useRef } from 'react'

class Particle {
  x: number
  y: number
  size: number
  baseX: number
  baseY: number
  density: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.size = Math.random() * 3 + 1
    this.baseX = x
    this.baseY = y
    this.density = Math.random() * 30 + 1
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(212, 175, 122, 0.3)' // Rose gold with opacity
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const forceDirectionX = dx / distance
    const forceDirectionY = dy / distance
    const maxDistance = 100
    const force = (maxDistance - distance) / maxDistance
    const directionX = forceDirectionX * force * this.density
    const directionY = forceDirectionY * force * this.density

    if (distance < maxDistance) {
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x !== this.baseX) {
        const dx = this.x - this.baseX
        this.x -= dx / 10
      }
      if (this.y !== this.baseY) {
        const dy = this.y - this.baseY
        this.y -= dy / 10
      }
    }
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const particles = useRef<Particle[]>([])

  useEffect(() {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles.current = []
      const numberOfParticles = (canvas.width * canvas.height) / 9000
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.current.push(new Particle(x, y))
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.x, y: e.y }
    }

    const connect = () => {
      for (let a = 0; a < particles.current.length; a++) {
        for (let b = a; b < particles.current.length; b++) {
          const dx = particles.current[a].x - particles.current[b].x
          const dy = particles.current[a].y - particles.current[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(212, 175, 122, ${1 - distance / 100})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles.current[a].x, particles.current[a].y)
            ctx.lineTo(particles.current[b].x, particles.current[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach(particle => {
        particle.draw(ctx)
        particle.update(mousePosition.current.x, mousePosition.current.y)
      })

      connect()
      requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
