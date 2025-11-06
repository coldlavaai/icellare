'use client'


import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const benefits = [
  {
    title: "Future Potential",
    description: "Preserve your regenerative cells for future therapeutic needs"
  },
  {
    title: "Proactive Health",
    description: "Take control of your health with preventive cellular storage"
  },
  {
    title: "Ready Access",
    description: "Your cells available when you need them most"
  },
  {
    title: "No Risk of Rejection",
    description: "Autologous cells ensure perfect compatibility"
  },
  {
    title: "Regenerative Benefits",
    description: "Unlock the body's natural healing potential"
  },
  {
    title: "Multiple Applications",
    description: "From joint health to neurological support and beyond"
  }
]

const procedure = [
  {
    step: "01",
    title: "Book a Consultation Appointment",
    description: "Begin your journey with a personalized consultation"
  },
  {
    step: "02",
    title: "Specialized Doctor Consultation",
    description: "Meet with our expert hematologists and specialists"
  },
  {
    step: "03",
    title: "MSCs Stem Cell Collection",
    description: "Safe extraction from bone marrow or adipose tissue"
  },
  {
    step: "04",
    title: "MSCs Stem Cell Banking",
    description: "Advanced culturing and cryopreservation with NGS quality control"
  },
  {
    step: "05",
    title: "MSC Stem Cell Therapy",
    description: "Future therapeutic applications when you need them"
  }
]

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0], index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-[2rem] backdrop-blur-2xl bg-white/50 border border-white/60 p-8 shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          <h3 className="font-serif text-2xl mb-4 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
            {benefit.title}
          </h3>
          <p className="text-charcoal/70 leading-relaxed">
            {benefit.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ProcedureStep({ step, index }: { step: typeof procedure[0], index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6"
    >
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-gold to-bronze flex items-center justify-center shadow-xl">
          <span className="font-serif text-white text-xl font-bold">{step.step}</span>
        </div>
      </div>

      <div className="flex-1 pb-12">
        <h3 className="font-serif text-2xl mb-3 text-charcoal">{step.title}</h3>
        <p className="text-charcoal/70 leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  )
}

export default function StemCellBankingPage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="relative bg-cream overflow-hidden">
      
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 py-32" style={{ zIndex: 10 }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 60 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-rose-gold text-lg font-semibold mb-6 tracking-wider uppercase"
          >
            Bangkok - Phuket
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-7xl md:text-8xl lg:text-9xl mb-8 text-charcoal"
          >
            Stem Cell Banking
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            Secure your regenerative health for the future
          </motion.p>
        </motion.div>
      </section>

      {/* Why Icellaré Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 60 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal">Why Icellaré</h2>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                We offer world-class stem cell banking, ensuring the highest quality storage and management for your precious cells.
              </p>
              <p>
                Unlike some, we employ advanced culturing and rigorous NGS Karyotyping quality control, guaranteeing at least 10 million viable stem cells ready for future use.
              </p>
              <p className="text-xl font-semibold text-rose-gold">
                Invest in your well-being – choose the best for a healthier tomorrow.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Banking Procedure */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            Banking Procedure
          </motion.h2>

          <div className="space-y-4">
            {procedure.map((step, index) => (
              <ProcedureStep key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Bank Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal">
              Why Should You Bank Your Stem Cells?
            </h2>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                Embark on a journey into personalised wellness at Icellaré Lifespan Center, where our cutting-edge MSC Stem Cell Banking offers transformative potential.
              </p>
              <p>
                Our expert team, led by specialized doctors, guides you in preserving the regenerative power of MSCs sourced from either collecting stem cells from your bone marrow and adipose tissue.
              </p>
              <p>
                From proactive anti-inflammatory effects to future-proofing cellular function and enhancing aesthetic rejuvenation, our banking services cater to various health needs, including joint health, neurological support, and metabolic health assurance.
              </p>
              <p className="text-xl font-semibold text-rose-gold">
                Secure your regenerative health today and unlock the full potential of your well-being with MSC Stem Cell Banking at Icellaré. Schedule your consultation now.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            Benefits of Stem Cell Banking
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-16 md:p-24 shadow-2xl text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal">
              Ready to Secure Your Future?
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a consultation to learn more about our stem cell banking services and how we can help you preserve your regenerative potential.
            </p>
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
