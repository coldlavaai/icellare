'use client'

import DNAHelix3D from '@/components/DNAHelix3D'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const benefits = [
  {
    title: "Personalised Health Insights",
    description: "Understand your unique genetic makeup and health predispositions"
  },
  {
    title: "Early Detection of Risk Factors",
    description: "Identify potential health risks before symptoms appear"
  },
  {
    title: "Disease Prevention Strategies",
    description: "Develop proactive approaches to maintain optimal health"
  },
  {
    title: "Long-Term Wellness Strategies",
    description: "Create a personalized roadmap for lifelong health and vitality"
  }
]

const testCategories = [
  {
    title: "Allergy Test",
    tests: [
      "Allergy Food Profile IgE 20 Allergens",
      "Allergen Inhalation Profile IgE 20 Allergens"
    ]
  },
  {
    title: "Cancer Screening/Diagnosis",
    tests: [
      "Germline Mutation",
      "Somatic Mutation",
      "Breast Cancer (BRCA 1 & BRCA 2)"
    ]
  },
  {
    title: "Other Genetic Test",
    tests: [
      "Telomere (Biological age test)",
      "ApoE",
      "MTHFR",
      "TNF",
      "Pharmacogenetic test"
    ]
  },
  {
    title: "Additional Tests",
    tests: [
      "Free Radicals and Antioxidants (D-ROMS+PAT TEST)",
      "Sport Genetic by WES (Whole exome sequencing)",
      "Urine HPV (human papilloma virus) DNA TEST"
    ]
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
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
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

function TestCategoryCard({ category, index }: { category: typeof testCategories[0], index: number }) {
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
          <h3 className="font-serif text-2xl mb-6 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
            {category.title}
          </h3>

          <ul className="space-y-3">
            {category.tests.map((test, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-rose-gold text-xl mt-1">•</span>
                <span className="text-charcoal/70 leading-relaxed">{test}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default function GeneticTestingPage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="relative bg-cream overflow-hidden">
      <DNAHelix3D />
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
            Genetic Testing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            Future prevention through advanced genetic insights
          </motion.p>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal">Future Prevention</h2>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                Begin proactive health and well-being at Icellaré Lifespan Center, where advanced DNA blood tests and health check-ups pave the way for future prevention.
              </p>
              <p>
                By harnessing genetic insights and thorough health assessments, we aim to empower individuals with the knowledge needed for preventive health measures.
              </p>
              <p className="text-xl font-semibold text-rose-gold">
                DNA tests related to diagnosis Genetic diseases with Next Generation Sequencing (NGS) technique
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Should You Test */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-6 text-center text-charcoal"
          >
            Why Should You Test?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-charcoal/70 text-center mb-16 max-w-4xl mx-auto leading-relaxed"
          >
            By harnessing genetic insights and thorough health assessments, we aim to empower individuals with the knowledge needed for preventive health measures as well as tailored supplementation.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal">
              Genetic Test and Health Check-Up
            </h2>
            <p className="text-2xl text-rose-gold font-semibold">
              Over 300+ tests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testCategories.map((category, index) => (
              <TestCategoryCard key={category.title} category={category} index={index} />
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
              Unlock Your Genetic Insights
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Take control of your health with comprehensive genetic testing and personalized wellness strategies.
            </p>
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Testing
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
