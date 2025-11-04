'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(248, 246, 243, 0)', 'rgba(248, 246, 243, 0.95)']
  )

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(24px)']
  )

  const navItems = [
    { label: 'Team', href: '/team' },
    { label: 'Services', href: '/services' },
    { label: 'Lab', href: '/lab' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4 border-b border-white/20"
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/logo.png"
                  alt="iCellaré"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-xl md:text-2xl text-charcoal">iCellaré</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <motion.div
            className="hidden lg:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <Link key={item.label} href={item.href}>
                <motion.div
                  className="text-charcoal/70 hover:text-rose-gold transition-colors duration-300 font-medium cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Desktop CTA Button */}
          <Link href="/contact" className="hidden lg:block">
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Book Now
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="w-6 h-0.5 bg-charcoal rounded-full"
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-charcoal rounded-full"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-charcoal rounded-full"
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-80 bg-cream/95 backdrop-blur-2xl border-l border-white/60 shadow-2xl z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-8 pt-24 space-y-2">
                {navItems.map((item, index) => (
                  <Link key={item.label} href={item.href}>
                    <motion.div
                      className="text-charcoal hover:text-rose-gold transition-colors duration-300 font-medium text-xl py-4 px-4 rounded-2xl hover:bg-white/40 cursor-pointer"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => setMobileMenuOpen(false)}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.div>
                  </Link>
                ))}

                <Link href="/contact">
                  <motion.button
                    className="w-full mt-8 bg-gradient-to-r from-rose-gold to-bronze text-white px-8 py-4 rounded-full font-semibold shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    onClick={() => setMobileMenuOpen(false)}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
