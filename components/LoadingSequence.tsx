'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TechnicalFrame } from './TechnicalFrame'
import { useScrollStore } from '@/stores/scrollStore'

interface LoadingSequenceProps {
  onComplete: () => void
  children: React.ReactNode
}

export function LoadingSequence({ onComplete, children }: LoadingSequenceProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const [showFrame, setShowFrame] = useState(true)
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  // Loading animation sequence
  useEffect(() => {
    const timeline = [
      { delay: 0, progress: 0 },      // Start
      { delay: 300, progress: 0.2 },  // Frame appears
      { delay: 800, progress: 0.5 },  // DNA starts growing
      { delay: 1800, progress: 0.7 }, // DNA fully grown
      { delay: 2200, progress: 0.8 }, // Labels appear
      { delay: 2800, progress: 1 },   // Branding appears
    ]

    timeline.forEach(({ delay, progress }) => {
      setTimeout(() => {
        setLoadingProgress(progress)
      }, delay)
    })

    // Mark loading as complete and trigger zoom
    setTimeout(() => {
      setIsLoadingComplete(true)
      setTimeout(() => {
        setShowFrame(false)
        onComplete()
      }, 800) // Wait for branding to be visible, then zoom
    }, 3200)
  }, [onComplete])

  // Show frame again when scrolling back to top
  useEffect(() => {
    if (isLoadingComplete) {
      if (scrollProgress < 0.05) {
        setShowFrame(true)
      } else if (scrollProgress > 0.1) {
        setShowFrame(false)
      }
    }
  }, [scrollProgress, isLoadingComplete])

  return (
    <>
      {/* Technical frame overlay */}
      <TechnicalFrame
        isVisible={showFrame}
        loadingProgress={loadingProgress}
      />

      {/* DNA and content */}
      <div className="relative">
        {children}
      </div>

      {/* Loading progress indicator (optional debug) */}
      {!isLoadingComplete && (
        <motion.div
          className="fixed bottom-8 right-8 text-xs font-mono text-charcoal/40 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          LOADING: {Math.round(loadingProgress * 100)}%
        </motion.div>
      )}
    </>
  )
}
