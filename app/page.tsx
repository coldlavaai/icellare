'use client'

import AnimatedBackground from '@/components/AnimatedBackground'
import ScrollingLogo from '@/components/ScrollingLogo'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="relative">
      <AnimatedBackground />
      <ScrollingLogo />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-charcoal">
              iCellaré
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-rose-gold mb-4 tracking-wider uppercase">
              Lifespan Center
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-charcoal/80 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Stem Cell Technology &mdash; Rejuvenation Innovation &mdash; Personalised Care
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="bg-rose-gold hover:bg-bronze text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Book Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 text-charcoal">
              We Sell Hope
            </h2>
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed mb-6">
              Welcome to Icellare Lifespan Center.
            </p>
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed mb-6">
              Where we specialise in state-of-the-art autologous stem cell technology, rejuvenation innovation,
              in depth genetics testing and personalized care.
            </p>
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed">
              We believe in harnessing the power of your own cells, to allow you to become Your Best Self&mdash;the
              core of <span className="text-rose-gold font-semibold">Icellaré</span> or &ldquo;cell of I.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative min-h-screen px-4 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-center mb-16 text-charcoal"
          >
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-rose-gold/20"
              >
                <h3 className="font-serif text-2xl mb-4 text-charcoal">{service.title}</h3>
                <p className="text-charcoal/70 leading-relaxed mb-6">{service.description}</p>
                <button className="text-rose-gold hover:text-bronze font-medium transition-colors duration-300">
                  Learn More →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 text-charcoal">
              Our Quality Assurance
            </h2>
            <p className="text-2xl md:text-3xl text-rose-gold mb-12 font-serif italic">
              Only the highest standards
            </p>
            <p className="text-lg md:text-xl text-charcoal/70 leading-relaxed">
              Your exclusive destination for the gold standard in regenerative medicine. We don't just offer hope;
              we craft a personalized wellness journey to bring out your best self, embracing you from day 0 through
              your entire lifespan.
            </p>
          </motion.div>
        </div>
      </section>

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

const services = [
  {
    title: 'Stem Cell Technology',
    description: 'MSC Stem cells, derived from your own body either Bone Marrow or Adipose tissue, ensure a safe and effective approach to treatment and recovery.',
  },
  {
    title: 'Genetic Testing',
    description: 'Advanced Gene testing and health check-ups pave the way for future prevention with Next Generation Sequencing (NGS) technique.',
  },
  {
    title: 'Vitamin IV Therapy',
    description: 'Tailored Nutrient Delivery based on genetic testing and blood work to address specific deficiencies or health goals.',
  },
  {
    title: 'Aesthetics',
    description: 'Non-invasive, painless methods that require no downtime, including personal cellular injectables.',
  },
  {
    title: 'Wellness & Spa',
    description: 'Physiotherapy through physical rehabilitation, injury prevention, and health and fitness to support your recovery.',
  },
  {
    title: 'Stem Cell Banking',
    description: 'Secure your regenerative health for the future by exploring MSC Stem Cell Banking today.',
  },
]
