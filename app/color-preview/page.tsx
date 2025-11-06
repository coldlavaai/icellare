'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ColorPreview() {
  const colorways = [
    {
      name: 'Original Light Blue',
      path: '/loading-test-light',
      colors: ['#60A5FA', '#3B82F6', '#2563EB'],
      description: 'Classic light blue theme'
    },
    {
      name: 'Navy & Cyan',
      path: '/loading-test-navy-one',
      colors: ['#1E3A8A', '#06B6D4', '#0284C7'],
      description: 'Deep navy with bright cyan accents'
    },
    {
      name: 'Ultra Dark Neon',
      path: '/loading-test-neon-one',
      colors: ['#06B6D4', '#EC4899', '#A855F7'],
      description: 'Ultra dark with neon cyan, pink & purple'
    },
    {
      name: 'Neon DNA',
      path: '/loading-test-neon-dna',
      colors: ['#06B6D4', '#EC4899', '#A855F7'],
      description: 'Neon DNA colors with matching UI'
    },
    {
      name: 'Purple Space',
      path: '/loading-test-space',
      colors: ['#A855F7', '#8B5CF6', '#7C3AED'],
      description: 'Deep purple space background'
    },
    {
      name: 'Teal & Orange',
      path: '/loading-test-teal-orange',
      colors: ['#14B8A6', '#F97316', '#0D9488'],
      description: 'Vibrant teal and orange contrast'
    },
    {
      name: 'Gold & Emerald',
      path: '/loading-test-gold-emerald',
      colors: ['#FFD700', '#10B981', '#FFA500'],
      description: 'Luxurious gold with emerald green'
    },
    {
      name: 'Ice Blue & Violet',
      path: '/loading-test-ice-violet',
      colors: ['#7DD3FC', '#8B5CF6', '#38BDF8'],
      description: 'Cool ice blue with electric violet'
    },
    {
      name: 'Neon Green & Magenta',
      path: '/loading-test-neon-green',
      colors: ['#10B981', '#EC4899', '#34D399'],
      description: 'High-energy green and magenta'
    },
    {
      name: 'Coral & Turquoise',
      path: '/loading-test-coral-turquoise',
      colors: ['#FF7F50', '#06B6D4', '#FF6B6B'],
      description: 'Warm coral with tropical turquoise'
    }
  ]

  return (
    <div className="min-h-screen" style={{
      background: 'radial-gradient(ellipse at 50% 20%, #1a0a2e 0%, #0f0624 25%, #0a0412 50%, #050208 75%, #000000 100%)'
    }}>
      {/* Header */}
      <div className="pt-16 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-96 h-32 mx-auto mb-8"
        >
          <Image
            src="https://static.wixstatic.com/media/abb1e6_84c39a4abeea4e66ab7ad3a3d52ef0ca~mv2.png/v1/crop/x_0,y_0,w_4395,h_1596/fill/w_800,h_300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/Icellare_-Horizontal-Logo-01.png"
            alt="ICELLARÉ"
            fill
            className="object-contain brightness-0 invert"
            priority
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-sans font-light text-white mb-4"
        >
          Color Theme Preview
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-white/60 max-w-2xl mx-auto px-4"
        >
          Choose a color theme to explore. Each version features a complete design with matching DNA visualization and UI elements.
        </motion.p>
      </div>

      {/* Color Theme Grid */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorways.map((colorway, index) => (
            <motion.div
              key={colorway.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={colorway.path}>
                <div className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  {/* Color Preview Circles */}
                  <div className="flex gap-2 mb-4">
                    {colorway.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full"
                        style={{
                          background: color,
                          boxShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`
                        }}
                      />
                    ))}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-sans font-light text-white mb-2 group-hover:text-white transition-colors">
                    {colorway.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                    {colorway.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center pb-16 px-4">
        <p className="text-white/40 text-sm">
          Click any theme to view the full experience. Use your browser's back button to return to this page.
        </p>
      </div>
    </div>
  )
}
