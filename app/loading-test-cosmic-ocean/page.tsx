'use client'

import { motion } from 'framer-motion'
import ArchitecturalDNA from './components/ArchitecturalDNA'
import { ColorSchemeNav } from '@/components/ColorSchemeNav'

export default function CosmicOceanPage() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 20%, #0a1929 0%, #020814 25%, #000510 50%, #000208 75%, #000000 100%)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 191, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)' }} />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <ArchitecturalDNA />
        </div>

        <motion.div
          className="relative z-20 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)',
              textShadow: '0 0 30px rgba(0,191,255,0.5), 0 0 60px rgba(255,20,147,0.3)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Cosmic Ocean
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Architectural Excellence Encoded
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 font-medium">
              Explore Projects
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:from-cyan-500/30 hover:to-pink-500/30 transition-all duration-300 font-medium">
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </div>

      <ColorSchemeNav />

      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center z-[150] pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <p className="text-white/40 text-sm tracking-wider">SCROLL TO DISCOVER</p>
      </motion.div>
    </main>
  )
}
