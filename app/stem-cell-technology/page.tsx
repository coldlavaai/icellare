'use client'

// import DNAHelix3D from '@/components/DNAHelix3D'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const applications = [
  "Medical Conditions (eg. Alzheimer's, Parkinson's, Post-stroke)",
  "Rejuvenation (internal & external cellular regeneration)",
  "Chronic Injury (osteoarthritis)",
  "Men's Health (erectile dysfunction)",
  "Women's Health (fertility)",
  "Aesthetics (beauty face & scalp therapy)"
]

const qualityPoints = [
  {
    title: "Autologous Stem Cells",
    description: "Mesenchymal stem cells (MSCs), sourced exclusively from your body's bone marrow or adipose (fat) tissue, present a uniquely advantageous approach to treatment and recovery."
  },
  {
    title: "Hematologists for Delivery",
    description: "A hematologist's expertise in blood-related conditions ensures precise administration for optimal safety and effectiveness."
  },
  {
    title: "Specialized Doctors in Each Department",
    description: "Specialized doctors in each department provide targeted expertise, ensuring focused and comprehensive care tailored to specific medical needs."
  },
  {
    title: "Proudly Antibiotic & Preservative Free",
    description: "Our cultivation of stem cells is without the use of antibiotics and preservatives, significantly enhancing safety by reducing the risk of resistance and intolerance."
  },
  {
    title: "Proudly Xeno Free",
    description: "Our stem cells are cultivated without animal ingredients. HALAL & VEGAN friendly. Scientific evidence showed xeno-free cultured stem cells have higher therapeutic effects."
  },
  {
    title: "NGS Karyotyping Technology",
    description: "This technique, checking the completeness of chromosomes in stem cells, delivers results with higher resolution, speed, and comprehensive accuracy."
  },
  {
    title: "Zero Ethical Concerns",
    description: "Our ethical standards are unwavering. We refrain from using stem cells from embryos or allogeneic sources."
  },
  {
    title: "From Day 0 - Present",
    description: "We craft a personalized wellness journey to bring out your best self, embracing you from day 0 through your entire lifespan."
  }
]

const programs = [
  {
    title: "Rejuvenation",
    subtitle: "Our flagship treatment",
    description: "Indulge in the transformative experience offered by our rejuvenation package at Icellaré Lifespan Center. Harnessing state-of-the-art technology, we tailor a comprehensive approach to help you feel and look younger, both inside and out.",
    features: []
  },
  {
    title: "Chronic Injury Treatment",
    subtitle: "Osteoarthritis",
    description: "Advanced treatment for joint conditions",
    features: [
      "Cartilage Repair",
      "Regenerative Support",
      "Anti-Inflammatory Effects",
      "Specialized Orthopedic Doctor",
      "Improved Joint Function",
      "Pain Relief",
      "Modulation of Immune Response"
    ]
  },
  {
    title: "Athlete Program",
    subtitle: "Unlocking relief",
    description: "Experience our revolutionary joint therapy, harnessing the body's innate regenerative abilities to heal sports injuries and damaged joints, promoting tissue repair, reducing inflammation, and improving joint function.",
    features: []
  },
  {
    title: "Men's Health",
    subtitle: "Erectile Dysfunction",
    description: "Comprehensive treatment for men's health concerns",
    features: [
      "Fast Acting Results",
      "Enhanced Blood Flow",
      "Nerve Function Restoration",
      "Tissue Regeneration",
      "Specialized Urologist",
      "Combined with Shockwave Therapy",
      "Long-Lasting Results",
      "Customized Treatment Plans"
    ]
  },
  {
    title: "Beauty Program",
    subtitle: "Re-discover natural beauty",
    description: "Enhance your natural radiance with our transformative beauty face program, designed to promote a healthy, youthful glow.",
    features: [
      "Fresh exosome, straight from our on-site lab",
      "Natural Facial Contouring"
    ]
  }
]

const medicalConditions = [
  "Alzheimer's Disease",
  "Parkinson's Disease",
  "Post-Stroke Treatment",
  "Autism Treatment",
  "Autoimmune Disorders",
  "Cancer Recovery",
  "Diabetes Treatment",
  "Kidney Dysfunction"
]

function QualityCard({ point, index }: { point: typeof qualityPoints[0], index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-[2rem] backdrop-blur-2xl bg-white/50 border border-white/60 p-8 shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          <h3 className="font-serif text-2xl mb-4 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
            {point.title}
          </h3>
          <p className="text-charcoal/70 leading-relaxed">
            {point.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function ProgramCard({ program, index }: { program: typeof programs[0], index: number }) {
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
      <div className="relative overflow-hidden rounded-[3rem] backdrop-blur-2xl bg-white/60 border border-white/70 p-10 md:p-12 shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          <div className="text-rose-gold text-sm font-semibold mb-3 uppercase tracking-wider">
            {program.subtitle}
          </div>
          <h3 className="font-serif text-3xl mb-6 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
            {program.title}
          </h3>
          <p className="text-charcoal/70 leading-relaxed mb-6">
            {program.description}
          </p>

          {program.features.length > 0 && (
            <ul className="space-y-3">
              {program.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-rose-gold text-xl">•</span>
                  <span className="text-charcoal/70">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function StemCellTechnologyPage() {
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
            Stem Cell Technology
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            Autologous stem cell technology - The gold standard
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
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal">Gold Standard</h2>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed mb-12">
              <p>
                MSC Stem cells, derived from your own body either Bone Marrow or Adipose tissue, ensure a safe and effective approach to treatment and recovery, minimizing the risk of immune system resistance and infection.
              </p>
              <p className="text-xl font-semibold text-rose-gold">
                Icellare is at the forefront of stem cell technology, offering cutting-edge solutions for a healthier tomorrow.
              </p>
            </div>

            <h3 className="font-serif text-3xl mb-6 text-charcoal">Applications</h3>
            <ul className="space-y-4">
              {applications.map((app, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-rose-gold text-2xl">•</span>
                  <span className="text-lg text-charcoal/70">{app}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-6 text-center text-charcoal"
          >
            No Compromise on Quality
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-charcoal/70 text-center mb-16 max-w-3xl mx-auto"
          >
            At Icellaré, unwavering commitment to quality is at the core of everything we do.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualityPoints.map((point, index) => (
              <QualityCard key={point.title} point={point} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            Our Programs
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <ProgramCard key={program.title} program={program} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Medical Conditions */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-20 shadow-2xl text-center"
          >
            <h2 className="font-serif text-5xl md:text-6xl mb-12 text-charcoal">
              Commonly Treated Medical Conditions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {medicalConditions.map((condition, i) => (
                <div key={i} className="text-xl text-charcoal/70 font-semibold">
                  {condition}
                </div>
              ))}
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
              Begin Your Regenerative Journey
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover how our cutting-edge stem cell technology can help you achieve optimal health and wellness.
            </p>
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Book Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
