'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function ScrollingLogo() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()

  // Rotate based on scroll - 3 full rotations over the page
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080])

  // Scale and opacity changes
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1.2, 1.2, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 0.6, 0.6, 0.3])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        rotate,
        scale,
        opacity,
        zIndex: 2,
      }}
    >
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
        <Image
          src="/logo.png"
          alt="iCellaré Logo"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>
    </motion.div>
  )
}
