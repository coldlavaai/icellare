'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer className="relative bg-charcoal text-cream overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal/95" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Column 1: About */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <Image
                  src="https://static.wixstatic.com/media/aa834f_6e7d188faf5d4a1baa59560adcd80de5~mv2.png"
                  alt="iCellaré Logo"
                  width={120}
                  height={68}
                  className="mb-4 opacity-90"
                />
              </div>
              <h3 className="font-serif text-2xl mb-4 text-rose-gold">
                iCellaré Lifespan Center
              </h3>
              <p className="text-cream/70 leading-relaxed mb-6">
                Your exclusive destination for the gold standard in regenerative medicine. We don't just offer hope; we craft a personalized wellness journey.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/icellare_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-gold/20 flex items-center justify-center transition-all duration-300"
                >
                  <span className="text-lg">📷</span>
                </a>
                <a
                  href="https://line.me/ti/p/@icellare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-gold/20 flex items-center justify-center transition-all duration-300"
                >
                  <span className="text-lg">💬</span>
                </a>
              </div>
            </motion.div>

            {/* Column 2: Services */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-serif text-2xl mb-6 text-rose-gold">Services</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Stem Cell Banking', href: '/stem-cell-banking' },
                  { label: 'Stem Cell Technology', href: '/stem-cell-technology' },
                  { label: 'Genetic Testing', href: '/genetic-testing' },
                  { label: 'Vitamin IV Therapy', href: '/vitamin-therapy' },
                  { label: 'Aesthetics', href: '/aesthetics' },
                  { label: 'Wellness & Spa', href: '/wellness-spa' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-cream/70 hover:text-rose-gold transition-colors duration-300 inline-flex items-center group"
                    >
                      <span className="mr-2 text-rose-gold/50 group-hover:text-rose-gold transition-colors">→</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Bangkok Location */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-serif text-2xl mb-6 text-rose-gold">Bangkok</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-cream/90 font-semibold mb-2">Address:</p>
                  <p className="text-cream/70 leading-relaxed">
                    102 Phutthamonthon Sai 1<br />
                    Bang Bamad, Taling Chan<br />
                    Bangkok 10170, Thailand
                  </p>
                </div>
                <div>
                  <p className="text-cream/90 font-semibold mb-2">Contact:</p>
                  <a
                    href="tel:+66808565999"
                    className="text-cream/70 hover:text-rose-gold transition-colors block"
                  >
                    Phone: (+66)80-856-5999
                  </a>
                  <p className="text-cream/70">Line ID: @icellare</p>
                </div>
                <div>
                  <p className="text-cream/90 font-semibold mb-2">Hours:</p>
                  <p className="text-cream/70">
                    Mon-Fri: 8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Column 4: Phuket Location */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-serif text-2xl mb-6 text-rose-gold">Phuket</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-cream/90 font-semibold mb-2">Address:</p>
                  <p className="text-cream/70 leading-relaxed">
                    9 Komarapat Road<br />
                    Talad Yai, Muang Phuket<br />
                    Phuket 83000, Thailand
                  </p>
                </div>
                <div>
                  <p className="text-cream/90 font-semibold mb-2">Contact:</p>
                  <a
                    href="tel:020266101"
                    className="text-cream/70 hover:text-rose-gold transition-colors block"
                  >
                    Phone: 02-026-6101-(6)
                  </a>
                  <a
                    href="mailto:admin.phuket@icellare.com"
                    className="text-cream/70 hover:text-rose-gold transition-colors block"
                  >
                    Email: admin.phuket@icellare.com
                  </a>
                  <p className="text-cream/70">Line ID: @icellare_phuket</p>
                </div>
                <div>
                  <p className="text-cream/90 font-semibold mb-2">Hours:</p>
                  <p className="text-cream/70">
                    Daily: 11:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rose-gold/20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-cream/60 text-sm text-center md:text-left">
                &copy; {new Date().getFullYear()} iCellaré Lifespan Center. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-cream/60 hover:text-rose-gold transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-cream/60 hover:text-rose-gold transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
