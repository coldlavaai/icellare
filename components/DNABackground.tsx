'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Generate DNA helix SVG path
function generateDNAHelixPath(width: number, height: number, turns: number, radius: number, offset: number = 0) {
  const points: string[] = []
  const segments = 200

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const helixHeight = isMobile ? 1800 : 2400
  const helixRadius = isMobile ? 80 : 120
  const turns = isMobile ? 6 : 10

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #F8F6F3 0%, #F2E5D0 50%, #E8DBC8 100%)',
    }}>
      {/* Subtle animated grid */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 122, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 122, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Ambient glow orbs */}
      {[...Array(5)].map((_, i) => {
        const x = ((i * 47) % 100)
        const y = ((i * 73) % 100)
        const size = 300 + (i % 3) * 150

        return (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(212, 175, 122, 0.25), transparent 70%)`,
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, (i % 2 === 0 ? 40 : -40), 0],
              y: [0, (i % 2 === 0 ? -20 : 20), 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        )
      })}

      {/* DNA HELIX with simple 3D rotation - MUCH MORE VISIBLE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{
        perspective: '2000px',
      }}>
        <motion.div
          className="relative"
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Massive central glow - MORE INTENSE */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.6, 0.9, 0.6],
              scale: [1.2, 1.5, 1.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              filter: 'blur(120px)',
              background: 'radial-gradient(circle, rgba(212, 175, 122, 0.6) 0%, transparent 70%)',
            }}
          />

          {/* DNA Helix SVG - ENHANCED GLOW */}
          <svg
            width={isMobile ? "400" : "600"}
            height={helixHeight}
            viewBox={`0 0 600 ${helixHeight}`}
            className="relative z-10"
            style={{
              filter: 'drop-shadow(0 0 50px rgba(212, 175, 122, 0.9)) drop-shadow(0 0 100px rgba(212, 175, 122, 0.5))',
            }}
          >
            {/* Connection rungs - MORE VISIBLE */}
            {[...Array(isMobile ? 30 : 50)].map((_, i) => {
              const t = i / (isMobile ? 29 : 49)
              const y = t * helixHeight
              const angle1 = t * Math.PI * 2 * turns
              const angle2 = angle1 + Math.PI

              const x1 = 300 + Math.sin(angle1) * helixRadius
              const x2 = 300 + Math.sin(angle2) * helixRadius

              return (
                <motion.line
                  key={`rung-${i}`}
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  stroke="#D4AF7A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.7"
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.03,
                    ease: 'easeInOut',
                  }}
                />
              )
            })}

            {/* Strand 1 - Gold - THICKER & MORE VISIBLE */}
            <motion.path
              d={generateDNAHelixPath(600, helixHeight, turns, helixRadius, 0)}
              fill="none"
              stroke="#D4AF7A"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="1"
            />

            {/* Strand 2 - Bronze - THICKER & MORE VISIBLE */}
            <motion.path
              d={generateDNAHelixPath(600, helixHeight, turns, helixRadius, Math.PI)}
              fill="none"
              stroke="#9C7D5C"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="1"
            />

            {/* Base pair nodes */}
            {[...Array(isMobile ? 35 : 60)].map((_, i) => {
              const t = i / (isMobile ? 34 : 59)
              const angle = t * Math.PI * 2 * turns
              const x = 300 + Math.sin(angle) * helixRadius
              const y = t * helixHeight

              return (
                <motion.circle
                  key={`node-${i}`}
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#D4AF7A"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.04,
                    ease: 'easeInOut',
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(212, 175, 122, 0.8))',
                  }}
                />
              )
            })}
          </svg>
        </motion.div>
      </div>

      {/* Floating particles */}
      {!isMobile && [...Array(30)].map((_, i) => {
        const xPos = ((i * 41) % 100)
        const yStart = ((i * 59) % 100)
        const duration = 15 + ((i * 0.5) % 8)
        const delay = (i * 0.4) % 5
        const size = 2 + (i % 3)

        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${xPos}%`,
              top: `${yStart}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: i % 2 === 0 ? '#D4AF7A' : '#9C7D5C',
              boxShadow: `0 0 12px ${i % 2 === 0 ? '#D4AF7A' : '#9C7D5C'}`,
            }}
            animate={{
              y: [0, -500, -1000],
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
    </div>
  )
}
