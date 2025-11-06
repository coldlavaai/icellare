'use client'


import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const services = [
  {
    title: "BOTOX",
    description: "Smooth fine lines and wrinkles with precision neurotoxin treatments for a refreshed, youthful appearance."
  },
  {
    title: "FILLER",
    description: "Restore volume and contour with hyaluronic acid-based fillers for natural-looking enhancement."
  },
  {
    title: "COLLAGEN SCULPTRA",
    description: "Stimulate natural collagen production for gradual, long-lasting facial rejuvenation."
  },
  {
    title: "THREAD LIFT",
    description: "Non-surgical lifting and tightening for immediate results with minimal downtime."
  },
  {
    title: "THERMAGE",
    description: "Advanced radiofrequency technology for skin tightening and collagen remodeling."
  }
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
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
      <div className="relative overflow-hidden rounded-[2rem] backdrop-blur-2xl bg-white/50 border border-white/60 p-10 shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          <h3 className="font-serif text-3xl mb-5 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
            {service.title}
          </h3>
          <p className="text-charcoal/70 leading-relaxed text-lg">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function AestheticsPage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            Aesthetic
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            Enriched facial beauty collection
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
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl text-center"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal">
              Enhance Your Natural Beauty
            </h2>

            <p className="text-xl text-charcoal/70 leading-relaxed max-w-4xl mx-auto">
              Enhancing your natural beauty involves methods that are non-invasive, painless, and require no downtime.
              These methods come in many forms, including personal cellular injectables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            Aesthetic Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Beauty Philosophy Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal text-center">
              Our Philosophy
            </h2>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                At Icellaré, we believe true beauty comes from within. Our aesthetic treatments are designed to enhance
                your natural features while maintaining the authenticity of your unique beauty.
              </p>
              <p>
                Our team of specialized aesthetic doctors combines artistry with advanced medical expertise to deliver
                results that are both subtle and transformative. Every treatment is personalized to your individual goals
                and facial anatomy.
              </p>
              <p className="text-xl font-semibold text-rose-gold text-center">
                Experience the perfect harmony of science and beauty at Icellaré Lifespan Center.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            Why Choose Icellaré
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[2rem] p-8 shadow-2xl text-center"
            >
              <h3 className="font-serif text-2xl mb-4 text-rose-gold">Expert Practitioners</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Specialized aesthetic doctors with years of experience in cosmetic dermatology and aesthetic medicine.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[2rem] p-8 shadow-2xl text-center"
            >
              <h3 className="font-serif text-2xl mb-4 text-rose-gold">Premium Products</h3>
              <p className="text-charcoal/70 leading-relaxed">
                We use only the highest quality, clinically-proven products and technologies for optimal results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[2rem] p-8 shadow-2xl text-center"
            >
              <h3 className="font-serif text-2xl mb-4 text-rose-gold">Natural Results</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Our approach focuses on subtle enhancement that preserves your natural beauty and individuality.
              </p>
            </motion.div>
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
              Reveal Your Best Self
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Schedule a consultation with our aesthetic specialists to explore personalized treatments tailored to your beauty goals.
            </p>
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Book Aesthetic Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
