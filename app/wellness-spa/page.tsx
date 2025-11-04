'use client'

// import DNAHelix3D from '@/components/DNAHelix3D'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const physiotherapyServices = [
  {
    title: "Office Syndrome",
    description: "Targeted treatments for desk-related muscle tension, posture correction, and stress relief."
  },
  {
    title: "Senior Exercise",
    description: "Gentle, effective exercise programs designed to maintain mobility and independence."
  },
  {
    title: "Post-Surgery",
    description: "Comprehensive rehabilitation to optimize recovery and restore function after surgical procedures."
  },
  {
    title: "Chronic Injury",
    description: "Long-term management and treatment of persistent injuries for improved quality of life."
  }
]

function ServiceCard({ service, index }: { service: typeof physiotherapyServices[0], index: number }) {
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
      <div className="relative overflow-hidden rounded-[2rem] backdrop-blur-2xl bg-white/50 border border-white/60 p-10 shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          <h3 className="font-serif text-3xl mb-5 text-charcoal group-hover:text-rose-gold transition-colors duration-500 uppercase">
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

export default function WellnessSpaPage() {
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
            Wellness & Spa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            Holistic care for body, mind, and spirit
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
              Restore. Rejuvenate. Revitalize.
            </h2>

            <p className="text-xl text-charcoal/70 leading-relaxed max-w-4xl mx-auto">
              Experience comprehensive wellness services designed to promote healing, relaxation, and optimal physical function.
              Our integrated approach combines therapeutic techniques with personalized care to support your journey to wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Massage & Spa Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="font-serif text-5xl md:text-6xl mb-4 text-charcoal">
                Massage & Spa
              </h2>
              <p className="text-2xl text-rose-gold font-semibold">
                Massage on request
              </p>
            </div>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                Indulge in therapeutic massage treatments tailored to your specific needs. Our experienced therapists combine
                traditional techniques with modern approaches to release tension, improve circulation, and promote deep relaxation.
              </p>
              <p>
                Whether you seek relief from muscle pain, stress reduction, or simply a moment of tranquility, our spa services
                provide a sanctuary for restoration and renewal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Physiotherapy Section */}
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
              Physiotherapy
            </h2>
            <p className="text-2xl text-rose-gold font-semibold">
              A touch of care
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-16 shadow-2xl mb-16"
          >
            <p className="text-xl text-charcoal/70 leading-relaxed text-center max-w-4xl mx-auto">
              Physiotherapy helps through physical rehabilitation, injury prevention, and health and fitness.
              Physiotherapists get you involved in your own recovery, empowering you to take control of your health
              and achieve optimal physical function.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {physiotherapyServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            Benefits of Our Wellness Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[2rem] p-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-gold to-bronze mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl">♥</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Physical Wellness</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Improve mobility, strength, and overall physical function through targeted therapeutic interventions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[2rem] p-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-gold to-bronze mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl">⚡</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Mental Clarity</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Reduce stress and anxiety while promoting mental well-being through relaxation and therapeutic touch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[2rem] p-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-gold to-bronze mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-3xl">✦</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Holistic Balance</h3>
              <p className="text-charcoal/70 leading-relaxed">
                Achieve harmony between body and mind through comprehensive, personalized wellness care.
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
              Begin Your Wellness Journey
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the transformative power of our wellness and spa services. Schedule your appointment today.
            </p>
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Book Wellness Session
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
