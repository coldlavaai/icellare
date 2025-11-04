'use client'

import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface FloatingStrandProps {
  index: number
  onAssembled: () => void
  assembling: boolean
}

function FloatingStrand({ index, onAssembled, assembling }: FloatingStrandProps) {
  const isLeft = index % 2 === 0
  const color = isLeft ? '#D4AF7A' : '#9C7D5C'

  // Random starting positions around the screen
  const startX = (index * 100) % 90 + 5 // 5-95%
  const startY = ((index * 73) % 80) + 10 // 10-90%

  // Target position for assembly (center, arranged vertically)
  const targetY = 30 + (index * 3) // Stacked vertically
  const targetX = isLeft ? 45 : 55 // Left and right strands

  return (
    <motion.div
      className="absolute"
      initial={{
        left: `${startX}%`,
        top: `${startY}%`,
        rotate: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      }}
      animate={assembling ? {
        left: `${targetX}%`,
        top: `${targetY}%`,
        rotate: 0,
        scale: 1,
      } : {
        x: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
        y: [0, Math.random() * 40 - 20, Math.random() * 40 - 20, 0],
        rotate: [0, Math.random() * 90 - 45, Math.random() * 90 - 45, 0],
      }}
      transition={assembling ? {
        duration: 1.5,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.0, 1.0],
      } : {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      onAnimationComplete={() => {
        if (assembling) {
          onAssembled()
        }
      }}
    >
      {/* DNA fragment - mini helix segment */}
      <svg width="40" height="60" viewBox="0 0 40 60">
        <defs>
          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Curved strand */}
        <path
          d={isLeft ? "M 12 0 Q 8 15 12 30 Q 16 45 12 60" : "M 28 0 Q 32 15 28 30 Q 24 45 28 60"}
          fill="none"
          stroke={`url(#gradient-${index})`}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Base pair nodes */}
        {[0, 15, 30, 45, 60].map((y, i) => (
          <circle
            key={i}
            cx={isLeft ? 12 : 28}
            cy={y}
            r="3"
            fill={color}
            style={{
              filter: `drop-shadow(0 0 4px ${color})`,
            }}
          />
        ))}
      </svg>
    </motion.div>
  )
}

function AssembledHelix({ spinning }: { spinning: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: spinning ? 360 : 0,
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotate: spinning ? {
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        } : {},
      }}
    >
      {/* Complete DNA Helix */}
      <svg width="200" height="400" viewBox="0 0 200 400">
        <defs>
          <linearGradient id="helix-gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4AF7A" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D4AF7A" stopOpacity="1" />
            <stop offset="100%" stopColor="#D4AF7A" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="helix-gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9C7D5C" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#9C7D5C" stopOpacity="1" />
            <stop offset="100%" stopColor="#9C7D5C" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Strand 1 - Rose Gold */}
        <path
          d="M 70 0 Q 30 50 70 100 Q 110 150 70 200 Q 30 250 70 300 Q 110 350 70 400"
          fill="none"
          stroke="url(#helix-gradient1)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Strand 2 - Bronze */}
        <path
          d="M 130 0 Q 170 50 130 100 Q 90 150 130 200 Q 170 250 130 300 Q 90 350 130 400"
          fill="none"
          stroke="url(#helix-gradient2)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Connecting rungs */}
        {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((y, i) => {
          const isEven = i % 2 === 0
          return (
            <motion.line
              key={i}
              x1={isEven ? 70 : 130}
              y1={y}
              x2={isEven ? 130 : 70}
              y2={y}
              stroke="rgba(184, 153, 104, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          )
        })}

        {/* Base pair nodes */}
        {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((y, i) => {
          const isEven = i % 2 === 0
          return (
            <g key={i}>
              <motion.circle
                cx={isEven ? 70 : 130}
                cy={y}
                r="5"
                fill="#D4AF7A"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(212, 175, 122, 0.8))',
                }}
              />
              <motion.circle
                cx={isEven ? 130 : 70}
                cy={y}
                r="5"
                fill="#9C7D5C"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1 + 0.3,
                  ease: 'easeInOut',
                }}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(156, 125, 92, 0.8))',
                }}
              />
            </g>
          )
        })}
      </svg>
    </motion.div>
  )
}

export default function DNALoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'floating' | 'assembling' | 'spinning' | 'complete'>('floating')
  const [assembledCount, setAssembledCount] = useState(0)
  const totalStrands = 16
  const progress = useMotionValue(0)

  useEffect(() => {
    // Stage 1: Float for 1.5 seconds
    const floatingTimer = setTimeout(() => {
      setStage('assembling')
    }, 1500)

    return () => clearTimeout(floatingTimer)
  }, [])

  useEffect(() => {
    // When all strands assembled, start spinning
    if (assembledCount >= totalStrands && stage === 'assembling') {
      setTimeout(() => {
        setStage('spinning')
        // Animate progress bar
        animate(progress, 100, {
          duration: 2,
          ease: 'easeInOut',
        })
      }, 300)
    }
  }, [assembledCount, stage, progress])

  useEffect(() => {
    // After spinning for 2 seconds, complete
    if (stage === 'spinning') {
      const spinTimer = setTimeout(() => {
        setStage('complete')
        setTimeout(onComplete, 500)
      }, 2000)

      return () => clearTimeout(spinTimer)
    }
  }, [stage, onComplete])

  const handleStrandAssembled = () => {
    setAssembledCount(prev => prev + 1)
  }

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, #F8F6F3 0%, #F2E5D0 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Floating particles background */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => {
              const xPos = ((i * 37) % 100)
              const yStart = ((i * 53) % 100)
              const duration = 8 + ((i * 0.5) % 4)
              const delay = (i * 0.3) % 3

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${xPos}%`,
                    top: `${yStart}%`,
                    width: '2px',
                    height: '2px',
                    background: i % 2 === 0 ? 'rgba(212, 175, 122, 0.4)' : 'rgba(156, 125, 92, 0.3)',
                    boxShadow: `0 0 8px ${i % 2 === 0 ? 'rgba(212, 175, 122, 0.3)' : 'rgba(156, 125, 92, 0.2)'}`,
                  }}
                  animate={{
                    y: [0, -200, -400],
                    opacity: [0, 0.6, 0],
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

          {/* DNA Strands */}
          <div className="relative w-full h-full">
            {stage === 'floating' || stage === 'assembling' ? (
              // Floating and assembling strands
              [...Array(totalStrands)].map((_, i) => (
                <FloatingStrand
                  key={i}
                  index={i}
                  onAssembled={handleStrandAssembled}
                  assembling={stage === 'assembling'}
                />
              ))
            ) : (
              // Assembled helix
              <AssembledHelix spinning={stage === 'spinning'} />
            )}
          </div>

          {/* Loading Text and Progress */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h2
              className="font-serif text-3xl text-charcoal mb-4"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {stage === 'floating' && 'Initializing...'}
              {stage === 'assembling' && 'Building Your Experience...'}
              {stage === 'spinning' && 'Almost Ready...'}
            </motion.h2>

            {/* Progress Bar */}
            {stage === 'spinning' && (
              <motion.div
                className="w-64 h-1 bg-charcoal/10 rounded-full overflow-hidden mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-gold to-bronze"
                  style={{
                    width: '100%',
                    scaleX: progress,
                    transformOrigin: 'left',
                  }}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Glow effects */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 122, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
