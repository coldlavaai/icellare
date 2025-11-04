'use client'

import { useEffect, useRef } from 'react'

interface ParticleType {
  x: number
  y: number
  size: number
  baseX: number
  baseY: number
  density: number
}

function createParticle(x: number, y: number): ParticleType {
  return {
    x,
    y,
    size: Math.random() * 3 + 1,
    baseX: x,
    baseY: y,
    density: Math.random() * 30 + 1,
  }
}

function drawParticle(ctx: CanvasRenderingContext2D, particle: ParticleType) {
  ctx.fillStyle = 'rgba(212, 175, 122, 0.3)'
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
}

function updateParticle(particle: ParticleType, mouseX: number, mouseY: number) {
  const dx = mouseX - particle.x
  const dy = mouseY - particle.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  const forceDirectionX = dx / distance
  const forceDirectionY = dy / distance
  const maxDistance = 100
  const force = (maxDistance - distance) / maxDistance
  const directionX = forceDirectionX * force * particle.density
  const directionY = forceDirectionY * force * particle.density

  if (distance < maxDistance) {
    particle.x -= directionX
    particle.y -= directionY
  } else {
    if (particle.x !== particle.baseX) {
      const dx = particle.x - particle.baseX
      particle.x -= dx / 10
    }
    if (particle.y !== particle.baseY) {
      const dy = particle.y - particle.baseY
      particle.y -= dy / 10
    }
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const particles = useRef<ParticleType[]>([])

  useEffect(function setupCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = function() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = function() {
      particles.current = []
      const numberOfParticles = (canvas.width * canvas.height) / 9000
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.current.push(createParticle(x, y))
      }
    }

    const handleMouseMove = function(e: MouseEvent) {
      mousePosition.current = { x: e.x, y: e.y }
    }

    const connect = function() {
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

    const animate = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach(function(particle) {
        drawParticle(ctx, particle)
        updateParticle(particle, mousePosition.current.x, mousePosition.current.y)
      })

      connect()
      requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return function cleanup() {
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
