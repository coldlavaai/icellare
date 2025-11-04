'use client'

import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, animate, useSpring } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// Generate DNA helix SVG path with 3D perspective
function generateDNAHelixPath(
  width: number,
  height: number,
  turns: number,
  radius: number,
  offset: number = 0,
  depthFactor: number = 1
) {
  const points: string[] = []
  const segments = 120

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const angle = (t * Math.PI * 2 * turns) + offset
    const x = width / 2 + Math.sin(angle) * radius * depthFactor
    const y = t * height

    if (i === 0) {
      points.push(`M ${x} ${y}`)
    } else {
      points.push(`L ${x} ${y}`)
    }
  }

  return points.join(' ')
}

// Floating DNA Fragment Component
function FloatingFragment({
  index,
  scrollProgress,
  mouseX,
  mouseY
}: {
  index: number
  scrollProgress: any
  mouseX: any
  mouseY: any
}) {
  const xPos = ((index * 47) % 100)
  const yStart = ((index * 61) % 100)
  const duration = 15 + ((index * 0.7) % 8)
  const delay = (index * 0.4) % 5

  // Parallax depth based on index
  const depth = (index % 3) + 1
  const parallaxX = useTransform(mouseX, [0, 1], [-20 * depth, 20 * depth])
  const parallaxY = useTransform(mouseY, [0, 1], [-15 * depth, 15 * depth])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${xPos}%`,
        top: `${yStart}%`,
        x: parallaxX,
        y: parallaxY,
      }}
      animate={{
        y: [0, -400, -800],
        opacity: [0, 0.8, 0],
        scale: [0.3, 1, 0.3],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    >
      <svg width="30" height="30" viewBox="0 0 30 30">
        <motion.circle
          cx="7"
          cy="15"
          r="4"
          fill={index % 2 === 0 ? '#D4AF7A' : '#9C7D5C'}
          opacity="0.7"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
          }}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 122, 0.6))',
          }}
        />
        <motion.circle
          cx="23"
          cy="15"
          r="4"
          fill={index % 2 === 0 ? '#9C7D5C' : '#D4AF7A'}
          opacity="0.7"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1 + 0.5,
          }}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(156, 125, 92, 0.6))',
          }}
        />
        <line
          x1="7"
          y1="15"
          x2="23"
          y2="15"
          stroke="rgba(184, 153, 104, 0.5)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}

// Cell Membrane Particle
function CellParticle({
  index,
  mouseX,
  mouseY
}: {
  index: number
  mouseX: any
  mouseY: any
}) {
  const angle = (index / 60) * Math.PI * 2
  const distance = 30 + (index % 3) * 15
  const baseX = 50 + Math.cos(angle) * distance
  const baseY = 50 + Math.sin(angle) * distance

  const depth = (index % 4) + 1
  const parallaxX = useTransform(mouseX, [0, 1], [-30 * depth, 30 * depth])
  const parallaxY = useTransform(mouseY, [0, 1], [-25 * depth, 25 * depth])

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${baseX}%`,
        top: `${baseY}%`,
        width: '4px',
        height: '4px',
        x: parallaxX,
        y: parallaxY,
        background: index % 3 === 0
          ? 'rgba(212, 175, 122, 0.8)'
          : index % 3 === 1
            ? 'rgba(156, 125, 92, 0.7)'
            : 'rgba(242, 229, 208, 0.6)',
        boxShadow: `0 0 ${8 + (index % 3) * 4}px ${
          index % 3 === 0
            ? 'rgba(212, 175, 122, 0.6)'
            : index % 3 === 1
              ? 'rgba(156, 125, 92, 0.5)'
              : 'rgba(242, 229, 208, 0.4)'
        }`,
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 3 + (index % 3),
        repeat: Infinity,
        delay: index * 0.05,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function DNABackground() {
  const { scrollYProgress } = useScroll()
  const baseRotation = useMotionValue(0)
  const combinedRotation = useMotionValue(0)
  const timeRef = useRef(0)
  const [animationsReady, setAnimationsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 })
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 })

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mouse tracking
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isMobile, mouseX, mouseY])

  // Defer heavy animations until after initial paint
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsReady(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Continuous clockwise rotation with scroll boost
  useAnimationFrame((t) => {
    if (!animationsReady || isMobile) return
    timeRef.current = t
    const base = (t / 1000) * 5 // 5 degrees per second - faster
    const scroll = scrollYProgress.get() * 1080 // 0-1080 degrees - 3 full rotations
    baseRotation.set(base)
    combinedRotation.set(base + scroll)
  })

  // DNA opacity entrance
  const dnaOpacity = useMotionValue(0)
  const hasStartedEntranceRef = useRef(false)

  useEffect(() => {
    if (!hasStartedEntranceRef.current) {
      hasStartedEntranceRef.current = true
      animate(dnaOpacity, 0.35, {
        duration: 1.5,
        ease: [0.25, 0.1, 0.0, 1.0]
      })
    }
  }, [dnaOpacity])

  // Dynamic background gradient based on scroll
  const bgColorTop = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#F8F6F3', '#FBF8F4', '#F2E5D0', '#F8F6F3']
  )
  const bgColorBottom = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['#F2E5D0', '#E8DBC8', '#D4C4B0', '#F2E5D0']
  )

  // Grid and accent animations
  const accentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 0.7, 0.5, 0.3])
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.04, 0.02])

  // Scroll velocity for particle effects
  const scrollVelocity = useMotionValue(0)
  const prevScrollY = useRef(0)

  useAnimationFrame(() => {
    const currentScroll = scrollYProgress.get()
    const velocity = Math.abs(currentScroll - prevScrollY.current)
    scrollVelocity.set(velocity * 100) // Amplify
    prevScrollY.current = currentScroll
  })

  // DNA helix dimensions - multiple layers
  const helixHeight = isMobile ? 800 : 1400
  const helixRadius = isMobile ? 90 : 140
  const turns = isMobile ? 4 : 7

  // Generate multiple helix layers at different depths
  const helixLayers = [
    { depth: 1.2, opacity: 0.3, offset: 0, speed: 1 },
    { depth: 1.0, opacity: 1, offset: Math.PI / 4, speed: 1.2 },
    { depth: 0.8, opacity: 0.4, offset: Math.PI / 2, speed: 0.8 },
  ]

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, var(--bg-top), var(--bg-bottom))`,
      }}
    >
      <style jsx>{`
        :root {
          --bg-top: ${bgColorTop};
          --bg-bottom: ${bgColorBottom};
        }
      `}</style>

      {/* Animated Grid Pattern */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: gridOpacity }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 122, 0.15) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(212, 175, 122, 0.15) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>

      {/* Light Rays */}
      {!isMobile && [...Array(5)].map((_, i) => {
        const xPos = 20 + (i * 15)
        const rotate = -20 + (i * 10)

        return (
          <motion.div
            key={`ray-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${xPos}%`,
              top: '-20%',
              width: '2px',
              height: '140%',
              background: `linear-gradient(to bottom,
                transparent 0%,
                rgba(212, 175, 122, ${0.1 + i * 0.03}) 20%,
                rgba(212, 175, 122, ${0.15 + i * 0.03}) 50%,
                rgba(156, 125, 92, ${0.1 + i * 0.02}) 80%,
                transparent 100%
              )`,
              transform: `rotate(${rotate}deg)`,
              filter: 'blur(1px)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        )
      })}

      {/* Ambient Glows */}
      <motion.div
        className="absolute top-0 left-1/4 w-[1000px] h-[600px] pointer-events-none"
        style={{
          opacity: accentOpacity,
          x: useTransform(smoothMouseX, [0, 1], [-100, 100]),
          y: useTransform(smoothMouseY, [0, 1], [-50, 50]),
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 122, 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-1/4 w-[1000px] h-[600px] pointer-events-none"
        style={{
          opacity: accentOpacity,
          x: useTransform(smoothMouseX, [0, 1], [100, -100]),
          y: useTransform(smoothMouseY, [0, 1], [50, -50]),
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(156, 125, 92, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>

      {/* Cell Membrane Particles */}
      {!isMobile && [...Array(60)].map((_, i) => (
        <CellParticle key={`cell-${i}`} index={i} mouseX={smoothMouseX} mouseY={smoothMouseY} />
      ))}

      {/* Floating DNA Fragments */}
      {!isMobile && [...Array(30)].map((_, i) => (
        <FloatingFragment
          key={`fragment-${i}`}
          index={i}
          scrollProgress={scrollYProgress}
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
        />
      ))}

      {/* Multi-layered DNA Helices with 3D Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ opacity: dnaOpacity }}
      >
        {helixLayers.map((layer, layerIndex) => (
          <motion.div
            key={`helix-layer-${layerIndex}`}
            className="absolute"
            style={{
              rotate: isMobile ? undefined : combinedRotation,
              scale: layer.depth,
              opacity: layer.opacity,
              x: useTransform(smoothMouseX, [0, 1], [
                -50 * (2 - layer.depth),
                50 * (2 - layer.depth)
              ]),
              y: useTransform(smoothMouseY, [0, 1], [
                -40 * (2 - layer.depth),
                40 * (2 - layer.depth)
              ]),
            }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{
              scale: layer.depth,
              opacity: layer.opacity
            }}
            transition={{
              scale: { duration: 1.5, ease: [0.25, 0.1, 0.0, 1.0] },
              opacity: { duration: 2, ease: [0.25, 0.1, 0.0, 1.0], delay: layerIndex * 0.2 }
            }}
          >
            {/* Glow Pulse */}
            {!isMobile && layerIndex === 1 && (
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  filter: 'blur(60px)',
                  background: 'radial-gradient(circle, rgba(212, 175, 122, 0.4) 0%, transparent 70%)',
                }}
              />
            )}

            {/* DNA Helix SVG */}
            <svg
              width={isMobile ? "350" : "500"}
              height={helixHeight}
              viewBox={`0 0 350 ${helixHeight}`}
              className="relative z-10"
              style={{
                filter: layerIndex === 1
                  ? 'drop-shadow(0 0 30px rgba(212, 175, 122, 0.5))'
                  : 'drop-shadow(0 0 15px rgba(212, 175, 122, 0.3))',
              }}
            >
              {/* Connecting rungs */}
              {layerIndex === 1 && [...Array(isMobile ? 16 : 28)].map((_, i) => {
                const t = i / (isMobile ? 15 : 27)
                const y = t * helixHeight
                const angle1 = t * Math.PI * 2 * turns + layer.offset
                const angle2 = angle1 + Math.PI

                const x1 = 175 + Math.sin(angle1) * helixRadius
                const x2 = 175 + Math.sin(angle2) * helixRadius

                return (
                  <motion.line
                    key={`rung-${layerIndex}-${i}`}
                    x1={x1}
                    y1={y}
                    x2={x2}
                    y2={y}
                    stroke="rgba(184, 153, 104, 0.5)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: 'easeInOut',
                    }}
                  />
                )
              })}

              {/* Strand 1 */}
              <motion.path
                d={generateDNAHelixPath(350, helixHeight, turns, helixRadius, layer.offset, 1)}
                fill="none"
                stroke={`url(#gradient1-${layerIndex})`}
                strokeWidth={isMobile ? "5" : layerIndex === 1 ? "8" : "6"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Strand 2 */}
              <motion.path
                d={generateDNAHelixPath(350, helixHeight, turns, helixRadius, layer.offset + Math.PI, 1)}
                fill="none"
                stroke={`url(#gradient2-${layerIndex})`}
                strokeWidth={isMobile ? "5" : layerIndex === 1 ? "8" : "6"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Base pair nodes - Only on main layer */}
              {layerIndex === 1 && [...Array(isMobile ? 20 : 35)].map((_, i) => {
                const t = i / (isMobile ? 19 : 34)
                const angle = t * Math.PI * 2 * turns + layer.offset
                const x = 175 + Math.sin(angle) * helixRadius
                const y = t * helixHeight

                return (
                  <motion.circle
                    key={`node1-${layerIndex}-${i}`}
                    cx={x}
                    cy={y}
                    r={isMobile ? "5" : "6"}
                    fill="#D4AF7A"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.06,
                      ease: 'easeInOut',
                    }}
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(212, 175, 122, 0.9))',
                    }}
                  />
                )
              })}

              {layerIndex === 1 && [...Array(isMobile ? 20 : 35)].map((_, i) => {
                const t = i / (isMobile ? 19 : 34)
                const angle = (t * Math.PI * 2 * turns) + Math.PI + layer.offset
                const x = 175 + Math.sin(angle) * helixRadius
                const y = t * helixHeight

                return (
                  <motion.circle
                    key={`node2-${layerIndex}-${i}`}
                    cx={x}
                    cy={y}
                    r={isMobile ? "5" : "6"}
                    fill="#9C7D5C"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.06 + 0.5,
                      ease: 'easeInOut',
                    }}
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(156, 125, 92, 0.9))',
                    }}
                  />
                )
              })}

              {/* Gradients */}
              <defs>
                <linearGradient id={`gradient1-${layerIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF7A" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#D4AF7A" stopOpacity={layerIndex === 1 ? "1" : "0.6"} />
                  <stop offset="100%" stopColor="#D4AF7A" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id={`gradient2-${layerIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9C7D5C" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#9C7D5C" stopOpacity={layerIndex === 1 ? "1" : "0.6"} />
                  <stop offset="100%" stopColor="#9C7D5C" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Corner Accents with Animation */}
      {[
        { top: 0, left: 0, rotate: 0 },
        { top: 0, right: 0, rotate: 90 },
        { bottom: 0, left: 0, rotate: -90 },
        { bottom: 0, right: 0, rotate: 180 },
      ].map((pos, i) => (
        <motion.div
          key={`corner-${i}`}
          className="absolute w-40 h-40 pointer-events-none"
          style={pos}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        >
          <div
            className="absolute w-full h-px"
            style={{
              background: 'linear-gradient(90deg, rgba(212, 175, 122, 0.5) 0%, transparent 100%)',
              ...(pos.top !== undefined ? { top: 0 } : { bottom: 0 }),
              ...(pos.left !== undefined ? { left: 0 } : { right: 0 }),
            }}
          />
          <div
            className="absolute w-px h-full"
            style={{
              background: 'linear-gradient(180deg, rgba(212, 175, 122, 0.5) 0%, transparent 100%)',
              ...(pos.top !== undefined ? { top: 0 } : { bottom: 0 }),
              ...(pos.left !== undefined ? { left: 0 } : { right: 0 }),
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
