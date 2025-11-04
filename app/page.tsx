'use client'

import DNAHelix3D from '@/components/DNAHelix3D'
import Navigation from '@/components/Navigation'
// import PageWithLoading from '@/components/PageWithLoading'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

function ServiceCard({
  title,
  description,
  image,
  index
}: {
  title: string
  description: string
  image?: string
  index: number
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[2rem] h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/20 via-champagne/10 to-bronze/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative backdrop-blur-2xl bg-white/60 border border-white/60 p-10 h-full flex flex-col shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 group-hover:border-rose-gold/50">
        {image && (
          <motion.div
            className="relative w-full h-48 mb-6 rounded-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </motion.div>
        )}

        <h3 className="font-serif text-3xl mb-4 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
          {title}
        </h3>

        <p className="text-charcoal/70 leading-relaxed text-lg flex-grow">
          {description}
        </p>

        <motion.div
          className="mt-6 inline-flex items-center text-rose-gold font-semibold cursor-pointer"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          Discover More <span className="ml-2 text-2xl">→</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

function FeatureSection({
  title,
  subtitle,
  description,
  image,
  reverse = false
}: {
  title: string
  subtitle?: string
  description: string
  image: string
  reverse?: boolean
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
    >
      <motion.div variants={scaleIn} className="w-full lg:w-1/2">
        <div className="relative w-full h-[400px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="w-full lg:w-1/2 space-y-6">
        {subtitle && (
          <p className="text-rose-gold uppercase tracking-wider font-semibold text-sm">
            {subtitle}
          </p>
        )}
        <h2 className="font-serif text-5xl lg:text-6xl text-charcoal leading-tight">
          {title}
        </h2>
        <p className="text-charcoal/70 text-xl leading-relaxed">
          {description}
        </p>
        <motion.button
          className="bg-gradient-to-r from-rose-gold to-bronze text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-2xl"
          whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(212, 175, 122, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="relative bg-cream overflow-hidden">
      <DNAHelix3D />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-32" style={{ zIndex: 10 }}>
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-serif text-7xl md:text-8xl lg:text-9xl mb-8 text-charcoal leading-tight"
          >
            iCellaré
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="space-y-4 mb-12"
          >
            <p className="text-3xl md:text-4xl lg:text-5xl text-rose-gold font-serif italic">
              Lifespan Center
            </p>
            <p className="text-xl md:text-2xl text-charcoal/80 max-w-4xl mx-auto leading-relaxed">
              State-of-the-art autologous stem cell technology, rejuvenation innovation,
              and personalized care in the heart of Bangkok
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Book Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-bronze to-rose-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>

            <motion.button
              className="backdrop-blur-xl bg-white/40 border-2 border-white/60 text-charcoal px-12 py-5 rounded-full text-lg font-semibold hover:border-rose-gold/60"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <FeatureSection
            subtitle="Our Philosophy"
            title="We Sell Hope"
            description="Welcome to Icellare Lifespan Center, where we specialize in state-of-the-art autologous stem cell technology, rejuvenation innovation, in-depth genetics testing and personalized care. We believe in harnessing the power of your own cells, to allow you to become Your Best Self—the core of Icellaré or 'cell of I.'"
            image="/images/lifespan-center.png"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-6xl lg:text-7xl text-charcoal mb-6">
              Our Services
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Cutting-edge regenerative medicine tailored to your unique biology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Stem Cell Banking"
              description="Secure your regenerative health for the future by exploring MSC Stem Cell Banking. Your cells, preserved at their peak, ready when you need them."
              index={0}
            />
            <ServiceCard
              title="Stem Cell Technology"
              description="MSC Stem cells derived from your own body—either Bone Marrow or Adipose tissue—ensure a safe and effective approach to treatment and recovery."
              index={1}
            />
            <ServiceCard
              title="Genetic Testing"
              description="Advanced Gene testing and health check-ups pave the way for future prevention with Next Generation Sequencing (NGS) technique."
              index={2}
            />
            <ServiceCard
              title="Vitamin IV Therapy"
              description="Tailored Nutrient Delivery based on genetic testing and blood work to address your specific deficiencies or health goals."
              image="/images/vitamin-drip.png"
              index={3}
            />
            <ServiceCard
              title="Aesthetics"
              description="Non-invasive, painless methods that require no downtime, including personal cellular injectables to enhance your natural beauty."
              image="/images/rejuvenation.png"
              index={4}
            />
            <ServiceCard
              title="Wellness & Spa"
              description="Physiotherapy through physical rehabilitation, injury prevention, and health and fitness to support your recovery journey."
              index={5}
            />
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[4rem] p-16 md:p-24 shadow-2xl text-center"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal">
              Our Quality Assurance
            </h2>
            <p className="text-4xl text-rose-gold mb-12 font-serif italic">
              Only the highest standards
            </p>
            <p className="text-xl text-charcoal/70 leading-relaxed max-w-3xl mx-auto mb-12">
              We don't just offer hope; we craft a personalized wellness journey to bring out your best self,
              embracing you from day 0 through your entire lifespan.
            </p>

            <div className="relative w-full h-64 rounded-3xl overflow-hidden mt-12">
              <Image
                src="/images/certificates.png"
                alt="Certifications"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-12 text-charcoal text-center">
              Visit Us in Bangkok
            </h2>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-4">
                <h3 className="font-semibold text-rose-gold text-xl mb-4">Location:</h3>
                <p className="text-lg text-charcoal/80">102 Phutthamonthon Sai 1</p>
                <p className="text-lg text-charcoal/80">Bang Ramad, Taling Chan</p>
                <p className="text-lg text-charcoal/80">Bangkok 10170, Thailand</p>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-rose-gold text-xl mb-4">Contact:</h3>
                <p className="text-lg text-charcoal/80">Phone: (+66)80-856-5999</p>
                <p className="text-lg text-charcoal/80">Email: info@icellare.com</p>
              </div>
            </div>
            <motion.button
              className="w-full bg-gradient-to-r from-rose-gold to-bronze text-white px-10 py-5 rounded-full text-lg font-semibold shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-charcoal text-cream py-20 px-6" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h3 className="font-serif text-3xl mb-6 text-rose-gold">Contact</h3>
            <p className="mb-2 text-cream/80">102 Phutthamonthon Sai 1</p>
            <p className="mb-2 text-cream/80">Bang Ramad, Taling Chan</p>
            <p className="mb-2 text-cream/80">Bangkok 10170, Thailand</p>
            <p className="mb-2 mt-6 text-cream/80">Phone: (+66)80-856-5999</p>
            <p className="text-cream/80">Email: info@icellare.com</p>
          </div>

          <div>
            <h3 className="font-serif text-3xl mb-6 text-rose-gold">Services</h3>
            <ul className="space-y-3 text-cream/80">
              <li className="hover:text-rose-gold transition-colors cursor-pointer">Stem Cell Banking</li>
              <li className="hover:text-rose-gold transition-colors cursor-pointer">Stem Cell Technology</li>
              <li className="hover:text-rose-gold transition-colors cursor-pointer">Genetic Testing</li>
              <li className="hover:text-rose-gold transition-colors cursor-pointer">Vitamin IV Therapy</li>
              <li className="hover:text-rose-gold transition-colors cursor-pointer">Aesthetics</li>
              <li className="hover:text-rose-gold transition-colors cursor-pointer">Wellness & Spa</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-3xl mb-6 text-rose-gold">About</h3>
            <p className="leading-relaxed text-cream/80">
              State-of-the-art autologous stem cell technology, rejuvenation innovation,
              and personalized care in the heart of Bangkok.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-10 border-t border-rose-gold/20 text-center text-cream/60">
          <p>&copy; {new Date().getFullYear()} iCellaré Lifespan Center. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
