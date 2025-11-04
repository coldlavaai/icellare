'use client'

import DNAHelix3D from '@/components/DNAHelix3D'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const quantumFlexFeatures = [
  "Test Variables",
  "Reduce Risk of Contamination",
  "Reduced Safety Concerns",
  "A Functionally Closed System",
  "Provide Research Scalability"
]

const qualityStandards = [
  {
    title: "PICS/GMP Compliance",
    description: "Our laboratory follows the Pharmaceutical Inspection Co-operation Scheme/Good Manufacturing Practice guidelines for the highest quality standards."
  },
  {
    title: "ISCT Guidelines",
    description: "Adhering to International Society for Cell and Gene Therapy standards for optimal cell-based products."
  },
  {
    title: "ISO Certified",
    description: "ISO 15189:2022 and 15190:2020 standard compliance ensuring rigorous quality control processes."
  },
  {
    title: "Xeno-Free Cultivation",
    description: "High-quality growth media formulations without any animal components for superior therapeutic effects."
  }
]

function FeatureCard({ feature, index }: { feature: string, index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4"
    >
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-gold to-bronze flex-shrink-0" />
      <span className="text-lg text-charcoal/70 uppercase tracking-wide">{feature}</span>
    </motion.div>
  )
}

function QualityCard({ standard, index }: { standard: typeof qualityStandards[0], index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-[2rem] backdrop-blur-2xl bg-white/50 border border-white/60 p-8 shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          <h3 className="font-serif text-2xl mb-4 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
            {standard.title}
          </h3>
          <p className="text-charcoal/70 leading-relaxed">
            {standard.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function LabPage() {
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
            Our Lab
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            Cell Therapy and Regenerative Medicine Laboratory
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
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-charcoal">
              Introducing Cell Therapy and Regenerative Medicine Laboratory, ATGenes Co., Ltd.
            </h2>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                At <span className="font-semibold text-charcoal">ATGenes Co., Ltd.</span>, we have always been driven by a steadfast commitment to advancing the frontiers of molecular genetic testing and healthcare services. Over the decade, cell therapy (e.g. stem cells), with their remarkable regenerative potential, have currently emerged as a beacon of hope in the field of healthcare.
              </p>
              <p>
                The Cell Therapy and Regenerative Medicine (CTRM) Laboratory is established since 2018 on the belief that harnessing the unique properties of stem cells can lead to groundbreaking treatments, ultimately improving the lives of patients for a wide array of medical conditions, including degenerative diseases, injuries, and genetic disorders.
              </p>
              <p>
                <span className="font-semibold text-charcoal">Central to our mission</span> is the pursuit of excellence in cell isolation, expansion, and banking for cell-based therapy purposes. We recognize that the therapeutic promise of cells can be fully realized when we can reliably and efficiently expand these precious cell populations (such as Mesenchymal Stem Cells (MSCs), Natural Killer (NK) Cells etc.) and stored for future uses.
              </p>
              <p>
                Within our state-of-the-art laboratory which following the PICS/GMP (Pharmaceutical Inspection Co-operation Scheme/Good Manufacturing Practice) guideline, we utilize optimized techniques with our high-quality xeno-free growth media formulations (without any component from animals) and equipments to facilitate the robust and scalable growth of cells.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-4 text-charcoal">
              Our Quality Assurance
            </h2>
            <p className="text-2xl text-rose-gold font-semibold">
              Only the highest standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {qualityStandards.map((standard, index) => (
              <QualityCard key={standard.title} standard={standard} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-16 shadow-2xl"
          >
            <p className="text-lg text-charcoal/70 leading-relaxed text-center max-w-4xl mx-auto">
              At ATGenes Co., Ltd., quality is the cornerstone of our laboratory operations. We understand the critical importance of quality control (QC) processes of our cell-based product, therefore we adhere our QC testing to internationally recognized standards. Our rigorous QC testings encompass every aspect of cell characterization, including identity, purity, and functionality to ensure the safety and efficacy of our cell-based products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quantum Flex Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <div className="text-center mb-12">
              <div className="text-rose-gold text-sm font-semibold mb-4 uppercase tracking-wider">
                First in Asia
              </div>
              <h2 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal">
                Quantum Flex Cell Expansion System
              </h2>
              <p className="text-xl text-charcoal/70">
                Introducing the Next Generation of Cell Expansion device
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {quantumFlexFeatures.map((feature, index) => (
                <FeatureCard key={feature} feature={feature} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ATGenes Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-center text-charcoal">
              Our Backbone
            </h2>

            <h3 className="font-serif text-3xl mb-6 text-rose-gold text-center">
              Atgenes
            </h3>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                Founded in January 2014, ATGenes Co., Ltd. is a biotechnology company crafted by a consortium of medical experts, technologists, and clinical scientists.
              </p>
              <p>
                Pioneering a distinctive business model, this Thai-owned enterprise is dedicated to offering diagnostic and therapeutic services. Specializing in medical devices relying on advanced knowledge-based technology, ATGenes aims to contribute to the bright future of Thailand and global healthcare.
              </p>
            </div>
          </motion.div>
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
              Experience World-Class Laboratory Excellence
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Learn more about our cutting-edge laboratory facilities and how we ensure the highest quality in cell therapy.
            </p>
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Laboratory Tour
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
