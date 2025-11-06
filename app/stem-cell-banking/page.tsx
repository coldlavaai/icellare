'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const benefits = [
  {
    title: "Future Potential",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
      </svg>
    )
  },
  {
    title: "Proactive Health",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
      </svg>
    )
  },
  {
    title: "Ready Access",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  },
  {
    title: "No Risk of Rejection",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    )
  },
  {
    title: "Regenerative Benefits",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
    )
  },
  {
    title: "Multiple Applications",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7"/>
      </svg>
    )
  }
]

const procedure = [
  { step: "01", title: "Book a Consultation Appointment" },
  { step: "02", title: "Specialized Doctor Consultation" },
  { step: "03", title: "MSCs Stem Cell Collection" },
  { step: "04", title: "MSCs Stem Cell Banking" },
  { step: "05", title: "MSC Stem Cell Therapy" }
]

export default function StemCellBankingPage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{
      background: 'linear-gradient(to bottom, #0a192f 0%, #1a2a4e 30%, #2d3e5f 60%, #1a2a4e 90%, #0a192f 100%)'
    }}>
      {/* Subtle overlay pattern */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      {/* Hero Section with iPhone */}
      <section className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="text-[#B8860B] text-sm font-semibold mb-3 tracking-[0.3em] uppercase">
              Premium Stem Cell Services
            </div>
            <h1 className="font-serif text-5xl md:text-6xl mb-4 text-white">
              Stem Cell Banking
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Secure your regenerative health for the future
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Left Column - iPhone Video */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Glassmorphic container */}
              <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-[3rem] p-8 shadow-[0_8px_32px_0_rgba(184,134,11,0.2)]">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/20 to-transparent rounded-[3rem] blur-2xl -z-10" />

                {/* iPhone Frame with Video */}
                <div className="relative mx-auto" style={{ width: '300px', height: '600px' }}>
                  {/* iPhone frame behind */}
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/mockup-iphone-10-10s-11-11pro-new-iphone-12-12pro-12-mini-mock-up-screen-iphone-vector-illustration_561158-2488.png?v=1762452693"
                    alt="iPhone Frame"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '300px',
                      height: '600px',
                      pointerEvents: 'none',
                      zIndex: 1
                    }}
                  />
                  {/* Video on top, fitted to screen area */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: 'absolute',
                      top: '18px',
                      left: '18px',
                      width: '264px',
                      height: '564px',
                      objectFit: 'cover',
                      borderRadius: '44px',
                      zIndex: 2
                    }}
                  >
                    <source src="https://endrq3md2r0zaqfz.public.blob.vercel-storage.com/8b980fcdbf1a48c9829fcd5dac99d121.MOV" type="video/mp4" />
                  </video>
                </div>

                {/* Stats below phone */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="backdrop-blur-xl bg-white/5 border border-[#B8860B]/30 rounded-2xl p-4 text-center">
                    <div className="text-[#B8860B] text-2xl font-bold">25+ Years</div>
                    <div className="text-white/60 text-xs mt-1">Storage Guarantee</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-[#B8860B]/30 rounded-2xl p-4 text-center">
                    <div className="text-[#B8860B] text-2xl font-bold">99.9%</div>
                    <div className="text-white/60 text-xs mt-1">Viability Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Why Icellaré */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(184,134,11,0.15)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B8860B] to-[#C9A342] flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">✨</span>
                  </div>
                  <h2 className="font-serif text-2xl text-white">Why Icellaré</h2>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-3">
                  We offer world-class stem cell banking, ensuring the highest quality storage and management for your precious cells.
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Unlike some, we employ advanced culturing and rigorous NGS Karyotyping quality control, guaranteeing at least 10 million viable stem cells ready for future use.
                </p>
              </div>

              {/* Quick Benefits */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(184,134,11,0.15)]">
                <div className="grid grid-cols-2 gap-4">
                  {benefits.slice(0, 4).map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                      className="group text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#B8860B]/20 to-[#C9A342]/10 flex items-center justify-center border border-[#B8860B]/30 group-hover:border-[#B8860B]/60 transition-all">
                        <div className="text-[#B8860B] group-hover:text-white transition-colors">
                          {benefit.icon}
                        </div>
                      </div>
                      <h3 className="text-white text-xs font-semibold group-hover:text-[#B8860B] transition-colors">
                        {benefit.title}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Banking Procedure */}
      <section className="relative px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-3xl text-center text-white mb-8"
          >
            Banking Procedure
          </motion.h2>

          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(184,134,11,0.15)]">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {procedure.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="backdrop-blur-xl bg-white/5 border border-[#B8860B]/30 rounded-2xl p-4 hover:border-[#B8860B]/60 transition-all duration-300">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#B8860B] to-[#C9A342] flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">{step.step}</span>
                    </div>
                    <p className="text-white/80 text-xs text-center leading-relaxed">
                      {step.title}
                    </p>
                  </div>
                  {index < procedure.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-[#B8860B] to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative backdrop-blur-2xl bg-gradient-to-br from-[#B8860B]/20 via-[#C9A342]/10 to-transparent border border-[#B8860B]/40 rounded-[3rem] p-10 text-center overflow-hidden"
          >
            {/* Animated glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/30 to-transparent opacity-50 blur-3xl" />

            <div className="relative z-10">
              <h2 className="font-serif text-4xl mb-4 bg-gradient-to-r from-white via-[#B8860B] to-white bg-clip-text text-transparent">
                Ready to Secure Your Future?
              </h2>
              <p className="text-white/80 text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                Schedule a consultation to learn more about our stem cell banking services
              </p>
              <motion.button
                className="bg-gradient-to-r from-[#B8860B] to-[#C9A342] text-white px-10 py-4 rounded-full text-base font-semibold shadow-[0_8px_32px_0_rgba(184,134,11,0.4)] border border-[#B8860B]/50"
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px 0 rgba(184,134,11,0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
