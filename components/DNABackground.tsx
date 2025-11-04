'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function DNABackground() {
  const { scrollYProgress } = useScroll()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Parallax transforms for multiple layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -700])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Premium gradient background with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFCFB] via-[#F7F4EF] to-[#F0EBE3]" />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,122,0.15),transparent_70%)]" />

      {/* Animated gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, rgba(212, 175, 122, 0.2) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(156, 125, 92, 0.2) 0px, transparent 50%),
            radial-gradient(at 40% 80%, rgba(139, 90, 60, 0.2) 0px, transparent 50%)
          `,
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating particles - Layer 1 (slowest) */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`p1-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 23.3) % 100}%`,
              width: `${4 + (i % 3) * 2}px`,
              height: `${4 + (i % 3) * 2}px`,
              background: `radial-gradient(circle, rgba(212, 175, 122, ${0.6 + (i % 3) * 0.2}), transparent)`,
              boxShadow: `0 0 ${10 + i * 2}px rgba(212, 175, 122, 0.6)`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* Floating particles - Layer 2 (medium) */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`p2-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${(i * 17.3) % 100}%`,
              top: `${(i * 31.7) % 100}%`,
              width: `${6 + (i % 3) * 3}px`,
              height: `${6 + (i % 3) * 3}px`,
              background: `radial-gradient(circle, rgba(255, 215, 0, ${0.5 + (i % 3) * 0.2}), transparent)`,
              boxShadow: `0 0 ${15 + i * 2}px rgba(255, 215, 0, 0.5)`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, 50 * (i % 2 === 0 ? 1 : -1), 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 10 + i * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>

      {/* Central DNA Helix - Premium 3D effect */}
      <motion.div
        style={{ y: y3, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          className="relative"
          style={{
            width: isMobile ? '300px' : '500px',
            height: isMobile ? '600px' : '900px',
          }}
        >
          {/* Glow effect behind DNA */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.4) 0%, rgba(212, 175, 122, 0.2) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* DNA Strand 1 - Left spiral */}
          <svg
            viewBox="0 0 200 400"
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))' }}
          >
            <motion.path
              d="M100,0 Q50,50 100,100 T100,200 T100,300 T100,400"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="8"
              strokeLinecap="round"
              animate={{
                strokeWidth: [8, 10, 8],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                <stop offset="50%" stopColor="#D4AF7A" stopOpacity="1" />
                <stop offset="100%" stopColor="#B8860B" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>

          {/* DNA Strand 2 - Right spiral */}
          <svg
            viewBox="0 0 200 400"
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'drop-shadow(0 0 20px rgba(184, 134, 11, 0.8))' }}
          >
            <motion.path
              d="M100,0 Q150,50 100,100 T100,200 T100,300 T100,400"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="8"
              strokeLinecap="round"
              animate={{
                strokeWidth: [8, 10, 8],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B8860B" stopOpacity="1" />
                <stop offset="50%" stopColor="#8B6914" stopOpacity="1" />
                <stop offset="100%" stopColor="#6B5310" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Connection rungs */}
          {[...Array(8)].map((_, i) => {
            const y = (i / 7) * 100
            return (
              <motion.div
                key={`rung-${i}`}
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: `${y}%`,
                  width: '40%',
                  height: '3px',
                  background: 'linear-gradient(90deg, rgba(212, 175, 122, 0.8), rgba(255, 215, 0, 0.9), rgba(212, 175, 122, 0.8))',
                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scaleX: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            )
          })}

          {/* Glowing nodes */}
          {[...Array(16)].map((_, i) => {
            const angle = (i / 16) * Math.PI * 4
            const x = 50 + Math.sin(angle) * 20
            const y = (i / 15) * 100

            return (
              <motion.div
                key={`node-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: '12px',
                  height: '12px',
                  background: 'radial-gradient(circle, #FFD700, #FFA500)',
                  boxShadow: '0 0 15px #FFD700, 0 0 30px #FFA500',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
              />
            )
          })}
        </motion.div>
      </motion.div>

      {/* Floating particles - Layer 3 (fastest, foreground) */}
      <motion.div style={{ y: y3 }} className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`p3-${i}`}
            className="absolute rounded-full blur-sm"
            style={{
              left: `${(i * 19.7) % 100}%`,
              top: `${(i * 37.3) % 100}%`,
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              background: `radial-gradient(circle, rgba(255, 165, 0, ${0.7 + (i % 3) * 0.2}), transparent)`,
              boxShadow: `0 0 ${20 + i * 3}px rgba(255, 165, 0, 0.7)`,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, 70 * (i % 2 === 0 ? 1 : -1), 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 12 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
