'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function Navigation() {
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(248, 246, 243, 0)', 'rgba(248, 246, 243, 0.8)']
  )

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  )

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 py-4"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center space-x-3 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-12 h-12">
            <Image
              src="/logo.png"
              alt="iCellaré"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-serif text-2xl text-charcoal">iCellaré</span>
        </motion.a>

        {/* Navigation Links */}
        <motion.div
          className="hidden md:flex items-center space-x-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: 'Team', href: '/team' },
            { label: 'Services', href: '/#services' },
            { label: 'Lab', href: '/lab' },
            { label: 'Facilities', href: '/facilities' },
            { label: 'Contact', href: '/contact' }
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-charcoal/70 hover:text-rose-gold transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="hidden md:block bg-gradient-to-r from-rose-gold to-bronze text-white px-6 py-3 rounded-full font-medium hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 175, 122, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Book Now
        </motion.button>
      </div>
    </motion.nav>
  )
}
