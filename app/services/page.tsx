'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'

const DNABackground = dynamic(() => import('@/components/DNABackground'), { ssr: false })

const services = [
  {
    title: "Stem Cell Banking",
    subtitle: "Future-Proof Your Health",
    description: "Secure your regenerative health for the future by exploring MSC Stem Cell Banking. Your cells, preserved at their peak, ready when you need them.",
    features: ["Bone Marrow & Adipose", "NGS Quality Control", "10M+ Viable Cells", "Long-term Cryo Storage"],
    image: "/images/stem-cell-banking.jpg",
    link: "/stem-cell-banking",
    gradient: "from-rose-gold/20 to-bronze/20"
  },
  {
    title: "Stem Cell Technology",
    subtitle: "Autologous Excellence",
    description: "MSC Stem cells derived from your own body—either Bone Marrow or Adipose tissue—ensure a safe and effective approach to treatment and recovery.",
    features: ["Anti-Inflammatory", "Regenerative Therapy", "Personalized Treatment", "World-Class Standards"],
    image: "/images/stem-cell-tech.jpg",
    link: "/stem-cell-technology",
    gradient: "from-bronze/20 to-champagne/20"
  },
  {
    title: "Genetic Testing",
    subtitle: "Unlock Your DNA",
    description: "Advanced Gene testing and health check-ups pave the way for future prevention with Next Generation Sequencing (NGS) technique.",
    features: ["300+ Tests Available", "NGS Technology", "Preventive Medicine", "Personalized Insights"],
    image: "/images/genetic-testing.jpg",
    link: "/genetic-testing",
    gradient: "from-champagne/20 to-rose-gold/20"
  },
  {
    title: "Vitamin IV Therapy",
    subtitle: "Targeted Nutrition",
    description: "Tailored Nutrient Delivery based on genetic testing and blood work to address your specific deficiencies or health goals.",
    features: ["NAC Therapy", "Mitochondrial Boost", "Custom Formulas", "Rapid Absorption"],
    image: "/images/vitamin-drip.png",
    link: "/vitamin-therapy",
    gradient: "from-rose-gold/20 to-bronze/20"
  },
  {
    title: "Aesthetics",
    subtitle: "Natural Enhancement",
    description: "Non-invasive, painless methods that require no downtime, including personal cellular injectables to enhance your natural beauty.",
    features: ["Cellular Injectables", "No Downtime", "Natural Results", "Expert Practitioners"],
    image: "/images/rejuvenation.png",
    link: "/aesthetics",
    gradient: "from-bronze/20 to-champagne/20"
  },
  {
    title: "Wellness & Spa",
    subtitle: "Holistic Recovery",
    description: "Physiotherapy through physical rehabilitation, injury prevention, and health and fitness to support your recovery journey.",
    features: ["Physiotherapy", "Injury Prevention", "Rehabilitation", "Wellness Programs"],
    image: "/images/wellness.jpg",
    link: "/wellness-spa",
    gradient: "from-champagne/20 to-rose-gold/20"
  }
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  })

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={service.link}>
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-40 z-10`} />
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent z-20" />
          </motion.div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: isEven ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
            >
              <p className="text-rose-gold uppercase tracking-wider font-semibold text-sm mb-3">
                {service.subtitle}
              </p>
              <h3 className="font-serif text-5xl lg:text-6xl mb-6 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
                {service.title}
              </h3>
              <p className="text-charcoal/70 text-xl leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-gold to-bronze" />
                    <span className="text-charcoal/80 text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="inline-flex items-center text-rose-gold font-semibold text-lg cursor-pointer group-hover:gap-4 transition-all duration-300"
                whileHover={{ x: 10 }}
              >
                Explore Service
                <span className="ml-2 text-3xl group-hover:ml-4 transition-all duration-300">→</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ServicesPage() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <main className="relative bg-cream overflow-hidden">
      <DNABackground />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 py-32" style={{ zIndex: 10 }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 60 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <div className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-full px-8 py-3">
              <p className="text-rose-gold font-semibold tracking-wider uppercase text-sm">
                World-Class Care
              </p>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-7xl md:text-8xl lg:text-9xl mb-8 text-charcoal leading-tight"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            Cutting-edge regenerative medicine and personalized wellness
            tailored to your unique biology
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12"
          >
            <Link href="/contact">
              <motion.button
                className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
                whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto space-y-32">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
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
            <h2 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal">
              Ready to Begin?
            </h2>
            <p className="text-2xl text-rose-gold font-semibold mb-8">
              Your journey to optimal health starts here
            </p>
            <p className="text-xl text-charcoal/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Schedule a consultation with our specialists to discover how we can help you achieve your best self.
            </p>
            <Link href="/contact">
              <motion.button
                className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
                whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Book Consultation
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
