'use client'

import { motion } from 'framer-motion'

interface TechnicalFrameProps {
  isVisible: boolean
  loadingProgress: number // 0 to 1
  onNavigate?: (sectionId: string) => void
}

export function TechnicalFrame({ isVisible, loadingProgress, onNavigate }: TechnicalFrameProps) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Corner brackets - FIXED */}
      <div className="absolute inset-0 p-8 md:p-16">
        {/* Top left */}
        <motion.div
          className="absolute top-8 left-8 md:top-16 md:left-16"
          initial={{ opacity: 0, x: -20, y: -20 }}
          animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="stroke-charcoal/40">
            <line x1="0" y1="25" x2="0" y2="0" strokeWidth="2" />
            <line x1="0" y1="0" x2="25" y2="0" strokeWidth="2" />
            <circle cx="0" cy="0" r="3" fill="#2C2C2C" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Top right */}
        <motion.div
          className="absolute top-8 right-8 md:top-16 md:right-16"
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="stroke-charcoal/40">
            <line x1="80" y1="25" x2="80" y2="0" strokeWidth="2" />
            <line x1="80" y1="0" x2="55" y2="0" strokeWidth="2" />
            <circle cx="80" cy="0" r="3" fill="#2C2C2C" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Bottom left */}
        <motion.div
          className="absolute bottom-8 left-8 md:bottom-16 md:left-16"
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="stroke-charcoal/40">
            <line x1="0" y1="55" x2="0" y2="80" strokeWidth="2" />
            <line x1="0" y1="80" x2="25" y2="80" strokeWidth="2" />
            <circle cx="0" cy="80" r="3" fill="#2C2C2C" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Bottom right */}
        <motion.div
          className="absolute bottom-8 right-8 md:bottom-16 md:right-16"
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="stroke-charcoal/40">
            <line x1="80" y1="55" x2="80" y2="80" strokeWidth="2" />
            <line x1="80" y1="80" x2="55" y2="80" strokeWidth="2" />
            <circle cx="80" cy="80" r="3" fill="#2C2C2C" opacity="0.4" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
