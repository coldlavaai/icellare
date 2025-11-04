'use client'

// import DNAHelix3D from '@/components/DNAHelix3D'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const facilityFeatures = [
  {
    title: "4 Floors",
    description: "Spacious multi-level facility designed for comprehensive care"
  },
  {
    title: "16 Treatment Beds",
    description: "State-of-the-art treatment rooms for personalized patient care"
  },
  {
    title: "On-Site Operating Room",
    description: "Fully equipped surgical suite for stem cell harvesting procedures"
  },
  {
    title: "Advanced Laboratory",
    description: "Cutting-edge lab for stem cell cultivation and banking"
  },
  {
    title: "Cryopreservation Room",
    description: "Specialized facility for long-term stem cell storage"
  },
  {
    title: "Modern Treatment Spaces",
    description: "Contemporary environments designed for comfort and healing"
  }
]

const highlights = [
  {
    title: "Not Your Typical Wellness Center",
    description: "Icellare Lifespan Center stands out from typical wellness clinics with our cutting-edge on-site laboratory, operating theatre, and cryopreservation room for autologous stem cell harvesting and cultivation.",
    emphasis: true
  },
  {
    title: "Setting New Standards",
    description: "In our modern treatment spaces, we redefine healthcare excellence. We are truly like no other, setting new standards in innovative and personalized regenerative care.",
    emphasis: true
  }
]

function FeatureCard({ feature, index }: { feature: typeof facilityFeatures[0], index: number }) {
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
          <h3 className="font-serif text-3xl mb-4 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
            {feature.title}
          </h3>
          <p className="text-charcoal/70 leading-relaxed text-lg">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function FacilitiesPage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="relative bg-cream overflow-hidden">
      {/* <DNAHelix3D /> */}
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
            Our Facilities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            World-class infrastructure for regenerative medicine
          </motion.p>
        </motion.div>
      </section>

      {/* Overview Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl text-center"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal">
              Our Bangkok Facilities
            </h2>

            <p className="text-2xl text-rose-gold font-semibold mb-12">
              4 Floors, 16 Treatment Beds, On-site Operating Room & Laboratory
            </p>

            <p className="text-xl text-charcoal/70 leading-relaxed max-w-4xl mx-auto">
              Experience healthcare in a facility designed specifically for advanced regenerative medicine.
              Our state-of-the-art center combines medical excellence with luxurious comfort, creating an
              environment where healing and innovation converge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            Facility Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilityFeatures.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* On-Site Lab & OR Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal text-center">
              On-Site Lab & OR
            </h2>

            <p className="text-2xl text-rose-gold font-semibold mb-12 text-center">
              Not your typical wellness center
            </p>

            <div className="space-y-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="border-l-4 border-rose-gold pl-8"
                >
                  <h3 className="font-serif text-2xl mb-4 text-charcoal">
                    {highlight.title}
                  </h3>
                  <p className="text-lg text-charcoal/70 leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            What Sets Us Apart
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[2rem] p-10 shadow-2xl text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-gold to-bronze mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl">⚕</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Medical Excellence</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Fully equipped operating room and laboratory on-site for seamless stem cell procedures.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[2rem] p-10 shadow-2xl text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-gold to-bronze mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl">❄</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Advanced Storage</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Dedicated cryopreservation facilities ensuring optimal preservation of your stem cells.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[2rem] p-10 shadow-2xl text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-gold to-bronze mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl">✦</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Luxurious Comfort</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Modern treatment spaces designed for relaxation, privacy, and healing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-12 text-center text-charcoal">
              Our Locations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-3xl mb-6 text-rose-gold">Bangkok</h3>
                <div className="space-y-4 text-lg text-charcoal/70">
                  <p>102 Phutthamonthon Sai 1</p>
                  <p>Bang Ramad, Taling Chan</p>
                  <p>Bangkok 10170</p>
                  <p className="pt-4 font-semibold text-charcoal">(+66)80-856-5999</p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-3xl mb-6 text-rose-gold">Phuket</h3>
                <div className="space-y-4 text-lg text-charcoal/70">
                  <p>9 Komarapat Road</p>
                  <p>Talad Yai, Muang Phuket</p>
                  <p>Phuket 83000, Thailand</p>
                  <p className="pt-4 font-semibold text-charcoal">02-026-6101-(6)</p>
                </div>
              </div>
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
              Experience Our Facilities
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a visit to tour our world-class facilities and discover the future of regenerative medicine.
            </p>
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Facility Tour
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
