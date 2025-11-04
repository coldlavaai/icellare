'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // DNA transformations based on scroll
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 1.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 0.7, 0.7, 0.5])

  // Control video playback based on scroll (scrub through video)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (video.duration && !isNaN(video.duration)) {
        // Map scroll progress (0-1) to video time
        const targetTime = latest * video.duration
        video.currentTime = targetTime
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  // Load and prepare video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.load()

    // Set initial frame
    video.addEventListener('loadeddata', () => {
      video.currentTime = 0
    })
  }, [])

  return (
    <>
      {/* Fixed DNA video background - centered */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen -z-10 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at center, rgba(232, 232, 232, 0.9) 0%, rgba(240, 240, 240, 1) 100%)',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            x: '-50%',
            y,
            rotate: rotation,
            scale,
            opacity,
            transformOrigin: 'center center',
          }}
          className="w-auto h-full"
        >
          <video
            ref={videoRef}
            className="h-full w-auto object-contain"
            src="/dna-bg.mov"
            muted
            playsInline
            preload="metadata"
            style={{
              filter: 'blur(0.5px) brightness(0.85) contrast(1.1)',
              minHeight: '100%',
              minWidth: '60%',
            }}
          />
        </motion.div>

        {/* Subtle vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 40%, rgba(240, 240, 240, 0.6) 100%)',
          }}
        />
      </div>
    </>
  )
}
