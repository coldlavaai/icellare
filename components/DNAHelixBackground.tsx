'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function DNAHelixBackground() {
  const { scrollYProgress } = useScroll()

  // Rotate the entire helix as you scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720])

  // Create DNA base pairs along the helix
  const basePairs = []
  const helixHeight = 3000 // Total height of the helix
  const pairsCount = 40 // Number of base pairs

  for (let i = 0; i < pairsCount; i++) {
    const progress = i / pairsCount
    const y = progress * helixHeight
    const angle = progress * Math.PI * 8 // Multiple rotations

    // Calculate positions for the two strands
    const radius = 100
    const x1 = Math.cos(angle) * radius
    const z1 = Math.sin(angle) * radius
    const x2 = Math.cos(angle + Math.PI) * radius
    const z2 = Math.sin(angle + Math.PI) * radius

    basePairs.push({
      id: i,
      y,
      x1,
      z1,
      x2,
      z2,
      angle: angle * (180 / Math.PI),
    })
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <motion.div
        className="absolute left-1/2 top-0 w-full h-[3000px]"
        style={{
          rotate,
          transformOrigin: 'center top',
          transform: 'translateX(-50%)',
        }}
      >
        <svg
          width="400"
          height={helixHeight}
          viewBox={`0 0 400 ${helixHeight}`}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Gradient for DNA strands */}
            <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF7A" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#D4AF7A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D4AF7A" stopOpacity="0.3" />
            </linearGradient>

            {/* Glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Draw the two helical strands */}
          <motion.path
            d={basePairs.map((bp, i) => {
              const x = 200 + bp.x1
              const y = bp.y
              return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
            }).join(' ')}
            stroke="url(#dnaGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          <motion.path
            d={basePairs.map((bp, i) => {
              const x = 200 + bp.x2
              const y = bp.y
              return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
            }).join(' ')}
            stroke="url(#dnaGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Draw base pairs (rungs of the ladder) */}
          {basePairs.map((bp) => (
            <g key={bp.id}>
              <motion.line
                x1={200 + bp.x1}
                y1={bp.y}
                x2={200 + bp.x2}
                y2={bp.y}
                stroke="#D4AF7A"
                strokeWidth="2"
                opacity="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: bp.id * 0.05,
                  ease: "easeOut"
                }}
              />

              {/* Nucleotide bases (circles at the ends) */}
              <motion.circle
                cx={200 + bp.x1}
                cy={bp.y}
                r="4"
                fill="#D4AF7A"
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: bp.id * 0.05,
                  ease: "easeOut"
                }}
              />

              <motion.circle
                cx={200 + bp.x2}
                cy={bp.y}
                r="4"
                fill="#9C7D5C"
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: bp.id * 0.05 + 0.1,
                  ease: "easeOut"
                }}
              />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Add some floating particles for cellular effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-rose-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}
