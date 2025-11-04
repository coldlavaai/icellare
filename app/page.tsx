'use client'

import DNAHelixBackground from '@/components/DNAHelixBackground'
import ScrollingLogo from '@/components/ScrollingLogo'
import Navigation from '@/components/Navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function ServiceCard({ title, description, delay = 0 }: { title: string; description: string; delay?: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative p-8 rounded-3xl backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl hover:shadow-rose-gold/20 transition-all duration-500"
      style={{
        boxShadow: '0 8px 32px 0 rgba(212, 175, 122, 0.1)',
      }}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-gold/5 to-bronze/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h3 className="relative font-serif text-2xl mb-4 text-charcoal group-hover:text-rose-gold transition-colors duration-300">
        {title}
      </h3>
      <p className="relative text-charcoal/70 leading-relaxed">
        {description}
      </p>

      <motion.div
        className="relative mt-6 inline-flex items-center text-rose-gold font-medium cursor-pointer"
        whileHover={{ x: 5 }}
      >
        Learn More <span className="ml-2">→</span>
      </motion.div>
    </motion.div>
  )
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="relative min-h-screen flex items-center justify-center px-4 py-20" style={{ zIndex: 10 }}>
      {children}
    </section>
  )
}

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const { scrollYProgress } = useScroll()

  const logoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.6])
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  return (
    <main className="relative bg-cream">
      <DNAHelixBackground />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 5 }}>
        <motion.div style={{ opacity: logoOpacity, scale: logoScale }}>
          <ScrollingLogo />
        </motion.div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <Section>
        <motion.div
          ref={heroRef}
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 text-charcoal"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            iCellaré
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl text-rose-gold mb-4 tracking-wider uppercase font-light"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Lifespan Center
          </motion.p>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-charcoal/80 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Stem Cell Technology &mdash; Rejuvenation Innovation &mdash; Personalised Care
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-10 py-5 rounded-full text-lg font-medium relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Book Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-bronze to-rose-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </motion.div>
        </motion.div>
      </Section>

      {/* Philosophy Section */}
      <Section id="philosophy">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[3rem] p-12 md:p-16 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal text-center">
              We Sell Hope
            </h2>
            <div className="space-y-6 text-lg md:text-xl text-charcoal/70 leading-relaxed">
              <p>
                Welcome to Icellare Lifespan Center, where we specialise in state-of-the-art autologous stem cell technology,
                rejuvenation innovation, in-depth genetics testing and personalized care.
              </p>
              <p>
                We believe in harnessing the power of your own cells, to allow you to become Your Best Self—the core of{' '}
                <span className="text-rose-gold font-semibold">Icellaré</span> or &ldquo;cell of I.&rdquo;
              </p>
              <p className="text-xl md:text-2xl font-serif italic text-rose-gold text-center pt-6">
                Your exclusive destination for the gold standard in regenerative medicine.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <div className="max-w-7xl mx-auto w-full">
          <motion.h2
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-center mb-20 text-charcoal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Stem Cell Banking"
              description="Secure your regenerative health for the future by exploring MSC Stem Cell Banking. Your cells, preserved at their peak, ready when you need them."
              delay={0}
            />
            <ServiceCard
              title="Stem Cell Technology"
              description="MSC Stem cells derived from your own body—either Bone Marrow or Adipose tissue—ensure a safe and effective approach to treatment and recovery."
              delay={0.1}
            />
            <ServiceCard
              title="Genetic Testing"
              description="Advanced Gene testing and health check-ups pave the way for future prevention with Next Generation Sequencing (NGS) technique."
              delay={0.2}
            />
            <ServiceCard
              title="Vitamin IV Therapy"
              description="Tailored Nutrient Delivery based on genetic testing and blood work to address your specific deficiencies or health goals."
              delay={0.3}
            />
            <ServiceCard
              title="Aesthetics"
              description="Non-invasive, painless methods that require no downtime, including personal cellular injectables to enhance your natural beauty."
              delay={0.4}
            />
            <ServiceCard
              title="Wellness & Spa"
              description="Physiotherapy through physical rehabilitation, injury prevention, and health and fitness to support your recovery journey."
              delay={0.5}
            />
          </div>
        </div>
      </Section>

      {/* Quality Assurance */}
      <Section id="quality">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="backdrop-blur-2xl bg-white/40 border border-white/50 rounded-[3rem] p-12 md:p-20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal">
              Our Quality Assurance
            </h2>
            <p className="text-3xl md:text-4xl text-rose-gold mb-12 font-serif italic">
              Only the highest standards
            </p>
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-3xl mx-auto">
              We don't just offer hope; we craft a personalized wellness journey to bring out your best self,
              embracing you from day 0 through your entire lifespan.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[3rem] p-12 md:p-16 shadow-2xl"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-12 text-charcoal text-center">
              Visit Us in Bangkok
            </h2>
            <div className="space-y-6 text-lg text-charcoal/70">
              <div>
                <h3 className="font-semibold text-rose-gold mb-2">Location:</h3>
                <p>102 Phutthamonthon Sai 1</p>
                <p>Bang Ramad, Taling Chan</p>
                <p>Bangkok 10170, Thailand</p>
              </div>
              <div>
                <h3 className="font-semibold text-rose-gold mb-2">Contact:</h3>
                <p>Phone: (+66)80-856-5999</p>
                <p>Email: info@icellare.com</p>
              </div>
            </div>
            <motion.button
              className="w-full mt-10 bg-gradient-to-r from-rose-gold to-bronze text-white px-8 py-4 rounded-full text-lg font-medium"
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(212, 175, 122, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Consultation
            </motion.button>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative bg-charcoal text-cream py-16 px-4" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-2xl mb-4 text-rose-gold">Contact</h3>
            <p className="mb-2">102 Phutthamonthon Sai 1</p>
            <p className="mb-2">Bang Ramad, Taling Chan</p>
            <p className="mb-2">Bangkok 10170, Thailand</p>
            <p className="mb-2 mt-4">Phone: (+66)80-856-5999</p>
            <p>Email: info@icellare.com</p>
          </div>

          <div>
            <h3 className="font-serif text-2xl mb-4 text-rose-gold">Services</h3>
            <ul className="space-y-2">
              <li>Stem Cell Banking</li>
              <li>Stem Cell Technology</li>
              <li>Genetic Testing</li>
              <li>Vitamin IV Therapy</li>
              <li>Aesthetics</li>
              <li>Wellness & Spa</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-2xl mb-4 text-rose-gold">About</h3>
            <p className="leading-relaxed">
              State-of-the-art autologous stem cell technology, rejuvenation innovation,
              and personalized care in the heart of Bangkok.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-rose-gold/20 text-center text-cream/60">
          <p>&copy; {new Date().getFullYear()} iCellaré Lifespan Center. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
