'use client'

import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// Generate DNA helix SVG path
function generateDNAHelixPath(width: number, height: number, turns: number, radius: number, offset: number = 0) {
  const points: string[] = []
  const segments = 100

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const angle = (t * Math.PI * 2 * turns) + offset
    const x = width / 2 + Math.sin(angle) * radius
    const y = t * height

    if (i === 0) {
      points.push(`M ${x} ${y}`)
    } else {
      points.push(`L ${x} ${y}`)
    }
  }

  return points.join(' ')
}

export default function DNABackground() {
  const { scrollYProgress } = useScroll()
  const baseRotation = useMotionValue(0)
  const combinedRotation = useMotionValue(0)
  const timeRef = useRef(0)
  const [animationsReady, setAnimationsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Defer heavy animations until after initial paint
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsReady(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Continuous clockwise rotation - ONLY on desktop for performance
  useAnimationFrame((t) => {
    if (!animationsReady || isMobile) return
    timeRef.current = t
    const base = (t / 1000) * 3 // 3 degrees per second
    const scroll = scrollYProgress.get() * 720 // 0-720 degrees based on scroll
    baseRotation.set(base)
    combinedRotation.set(base + scroll)
  })

  // Logo/DNA opacity - starts at 0, fades in
  const dnaOpacity = useMotionValue(0)
  const hasStartedEntranceRef = useRef(false)

  // Entrance animation: fade in
  useEffect(() => {
    if (!hasStartedEntranceRef.current) {
      hasStartedEntranceRef.current = true
      animate(dnaOpacity, 0.25, {
        duration: 1.2,
        ease: [0.25, 0.1, 0.0, 1.0]
      })
    }
  }, [dnaOpacity])

  // Background gradient
  const backgroundGradient = 'radial-gradient(ellipse at center, #F8F6F3 0%, #F2E5D0 100%)'

  // Accent color glow
  const accentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.2])

  // Grid lines
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.03, 0.01])

  // DNA helix dimensions
  const helixHeight = isMobile ? 600 : 1000
  const helixRadius = isMobile ? 80 : 120
  const turns = isMobile ? 3 : 5

  // Generate two strands
  const strand1Path = generateDNAHelixPath(300, helixHeight, turns, helixRadius, 0)
  const strand2Path = generateDNAHelixPath(300, helixHeight, turns, helixRadius, Math.PI)

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: backgroundGradient }}
    >
      {/* Subtle Grid Pattern */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: gridOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 122, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 122, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>

      {/* Accent Rose-Gold Glow - Top */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ opacity: accentOpacity }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 122, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Accent Bronze Glow - Bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ opacity: accentOpacity }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(156, 125, 92, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Floating Particles - Reduced on mobile */}
      {!isMobile && [...Array(40)].map((_, i) => {
        const xPos = ((i * 37) % 100)
        const yStart = ((i * 53) % 100)
        const duration = 10 + ((i * 0.5) % 5)
        const delay = (i * 0.3) % 4

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${xPos}%`,
              top: `${yStart}%`,
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              background: i % 2 === 0 ? 'rgba(212, 175, 122, 0.6)' : 'rgba(156, 125, 92, 0.5)',
              boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(212, 175, 122, 0.4)' : 'rgba(156, 125, 92, 0.3)'}`,
            }}
            animate={{
              y: [0, -300, -600],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
          />
        )
      })}

      {/* Rotating DNA Helix - SVG Based */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ opacity: dnaOpacity }}
      >
        {/* DNA Container with Parallax Rotation */}
        <motion.div
          className="relative"
          style={{
            rotate: isMobile ? undefined : combinedRotation,
          }}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            scale: { duration: 1.2, ease: [0.25, 0.1, 0.0, 1.0] },
            opacity: { duration: 1.5, ease: [0.25, 0.1, 0.0, 1.0] }
          }}
        >
          {/* Subtle Glow Pulse */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                filter: 'blur(40px)',
                background: 'radial-gradient(circle, rgba(212, 175, 122, 0.3) 0%, transparent 70%)',
              }}
            />
          )}

          {/* DNA Helix SVG */}
          <svg
            width={isMobile ? "300" : "400"}
            height={helixHeight}
            viewBox={`0 0 300 ${helixHeight}`}
            className="relative z-10"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(212, 175, 122, 0.4))',
            }}
          >
            {/* Connecting rungs between strands */}
            {[...Array(isMobile ? 12 : 20)].map((_, i) => {
              const t = i / (isMobile ? 11 : 19)
              const y = t * helixHeight
              const angle1 = t * Math.PI * 2 * turns
              const angle2 = angle1 + Math.PI

              const x1 = 150 + Math.sin(angle1) * helixRadius
              const x2 = 150 + Math.sin(angle2) * helixRadius

              return (
                <motion.line
                  key={`rung-${i}`}
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  stroke="rgba(184, 153, 104, 0.4)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              )
            })}

            {/* Strand 1 - Rose Gold */}
            <motion.path
              d={strand1Path}
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth={isMobile ? "4" : "6"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Strand 2 - Bronze */}
            <motion.path
              d={strand2Path}
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth={isMobile ? "4" : "6"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Base pair nodes - Rose Gold */}
            {[...Array(isMobile ? 15 : 25)].map((_, i) => {
              const t = i / (isMobile ? 14 : 24)
              const angle = t * Math.PI * 2 * turns
              const x = 150 + Math.sin(angle) * helixRadius
              const y = t * helixHeight

              return (
                <motion.circle
                  key={`node1-${i}`}
                  cx={x}
                  cy={y}
                  r={isMobile ? "4" : "5"}
                  fill="#D4AF7A"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.08,
                    ease: 'easeInOut',
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(212, 175, 122, 0.8))',
                  }}
                />
              )
            })}

            {/* Base pair nodes - Bronze */}
            {[...Array(isMobile ? 15 : 25)].map((_, i) => {
              const t = i / (isMobile ? 14 : 24)
              const angle = (t * Math.PI * 2 * turns) + Math.PI
              const x = 150 + Math.sin(angle) * helixRadius
              const y = t * helixHeight

              return (
                <motion.circle
                  key={`node2-${i}`}
                  cx={x}
                  cy={y}
                  r={isMobile ? "4" : "5"}
                  fill="#9C7D5C"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.08 + 0.5,
                    ease: 'easeInOut',
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(156, 125, 92, 0.8))',
                  }}
                />
              )
            })}

            {/* Gradients */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF7A" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#D4AF7A" stopOpacity="1" />
                <stop offset="100%" stopColor="#D4AF7A" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9C7D5C" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#9C7D5C" stopOpacity="1" />
                <stop offset="100%" stopColor="#9C7D5C" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-rose-gold/40 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-rose-gold/40 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-bronze/40 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-bronze/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-rose-gold/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-rose-gold/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-bronze/40 to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-bronze/40 to-transparent" />
      </div>
    </motion.div>
  )
}
