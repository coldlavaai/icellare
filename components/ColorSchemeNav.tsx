'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function ColorSchemeNav() {
  const pathname = usePathname()

  const schemes = [
    { name: 'Cyber Magenta', path: '/loading-test-cyber-magenta' },
    { name: 'Aurora Borealis', path: '/loading-test-aurora-borealis' },
    { name: 'Toxic Neon', path: '/loading-test-toxic-neon' },
    { name: 'Royal Sunset', path: '/loading-test-royal-sunset' },
    { name: 'Electric Ocean', path: '/loading-test-electric-ocean' },
    { name: 'Volcanic Fire', path: '/loading-test-volcanic-fire' },
    { name: 'Cosmic Rave', path: '/loading-test-cosmic-rave' },
    { name: 'Neon Tokyo', path: '/loading-test-neon-tokyo' },
    { name: 'Plasma Storm', path: '/loading-test-plasma-storm' },
    { name: 'Galaxy Core', path: '/loading-test-galaxy-core' },
    { name: 'Digital Dream', path: '/loading-test-digital-dream' },
    { name: 'Acid Fusion', path: '/loading-test-acid-fusion' },
    { name: 'Infrared Pulse', path: '/loading-test-infrared-pulse' },
    { name: 'Hologram Matrix', path: '/loading-test-hologram-matrix' },
    { name: 'Neon Jungle', path: '/loading-test-neon-jungle' },
  ]

  const currentIndex = schemes.findIndex((s) => s.path === pathname)
  const prevScheme = currentIndex > 0 ? schemes[currentIndex - 1] : schemes[schemes.length - 1]
  const nextScheme = currentIndex < schemes.length - 1 ? schemes[currentIndex + 1] : schemes[0]
  const currentScheme = schemes[currentIndex]

  return (
    <>
      {/* Bottom Tab Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[200] px-4 py-3"
        style={{
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto py-2">
          {schemes.map((scheme) => {
            const isActive = pathname === scheme.path
            return (
              <Link key={scheme.path} href={scheme.path}>
                <motion.button
                  className={`px-3 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/90'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {scheme.name}
                </motion.button>
              </Link>
            )
          })}
        </div>
      </motion.div>

      {/* Left Arrow */}
      <motion.div
        className="fixed left-4 top-1/2 -translate-y-1/2 z-[200]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Link href={prevScheme.path}>
          <motion.button
            className="bg-black/80 backdrop-blur-xl border border-white/20 text-white p-4 rounded-full hover:bg-black/90 hover:border-white/40 transition-all"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            title={`Previous: ${prevScheme.name}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </Link>
      </motion.div>

      {/* Right Arrow */}
      <motion.div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-[200]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Link href={nextScheme.path}>
          <motion.button
            className="bg-black/80 backdrop-blur-xl border border-white/20 text-white p-4 rounded-full hover:bg-black/90 hover:border-white/40 transition-all"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            title={`Next: ${nextScheme.name}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </Link>
      </motion.div>
    </>
  )
}
