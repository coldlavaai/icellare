'use client'

import DNAHelix3D from '@/components/DNAHelix3D'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const nacBenefits = [
  {
    title: "Enhanced Antioxidant Support",
    description: "NAC scavenges free radicals and protects against oxidative damage, promoting healthy aging and reducing the risk of chronic diseases."
  },
  {
    title: "Detoxification and Cleansing",
    description: "NAC supports liver detoxification pathways, aiding in the removal of toxins and pollutants from the body."
  },
  {
    title: "Respiratory Health",
    description: "NAC has mucolytic properties, helping to break down mucus and improve respiratory function in conditions such as bronchitis, asthma, and cystic fibrosis."
  },
  {
    title: "Immune Support",
    description: "By boosting glutathione levels, NAC strengthens the immune system and enhances the body's ability to fight infections and illnesses."
  },
  {
    title: "Mental Wellness",
    description: "NAC may support mental health by promoting neurotransmitter balance, reducing symptoms of anxiety, depression, and obsessive-compulsive disorder (OCD)."
  }
]

const nacFeatures = [
  "Exceptional Quality",
  "Enhanced Antioxidant Support",
  "Liver and Kidney Detoxification",
  "Improved Respiratory Health",
  "Improved Immune Support",
  "Reduced Anxiety & Depression",
  "Licensed Professionals"
]

const ironBenefits = [
  {
    title: "Reduced Fatigue",
    description: "Combat tiredness and increase your daily energy levels"
  },
  {
    title: "Increased Energy Levels",
    description: "Optimize cellular energy production for peak performance"
  },
  {
    title: "Improved Tissue Integrity",
    description: "Support healthy tissue function and regeneration"
  },
  {
    title: "Improved Immune Support",
    description: "Strengthen your body's natural defense mechanisms"
  },
  {
    title: "Relaxation and Improved Mood",
    description: "Experience enhanced mental well-being and emotional balance"
  },
  {
    title: "Improved Cognitive Function",
    description: "Sharpen mental clarity and cognitive performance"
  }
]

function BenefitCard({ benefit, index }: { benefit: typeof nacBenefits[0], index: number }) {
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

function FeatureList({ features, title }: { features: string[], title: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[3rem] p-10 md:p-12 shadow-2xl"
    >
      <h3 className="font-serif text-3xl mb-8 text-center text-charcoal">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-rose-gold to-bronze" />
            <span className="text-charcoal/70">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function VitaminTherapyPage() {
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
            Vitamin IV Therapy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            Personalised IV cellular therapy tailored to your unique needs
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
            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal">Personalised Nutrition</h2>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p className="text-xl">
                <span className="font-semibold text-charcoal">AT ICELLARE</span>, we don't believe in one size fits all.
              </p>
              <p>
                Tailored Nutrient Delivery based on our genetic testing and blood work allows us to cater to our individual's nutritional needs, addressing specific deficiencies or health goals.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NAC Therapy Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-6 text-center text-charcoal"
          >
            Our Signature IV Therapy
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl text-rose-gold font-semibold text-center mb-16"
          >
            N-Acetyl Cysteine (NAC)
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-16 shadow-2xl mb-16"
          >
            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                At Icellaré, we are committed to providing cutting-edge wellness solutions tailored to elevate your health and vitality. We are proud to introduce our signature service: N-Acetyl Cysteine (NAC) IV Therapy, designed to harness the power of antioxidants and promote holistic well-being.
              </p>
              <p>
                <span className="font-semibold text-charcoal">(NAC): N-Acetyl Cysteine</span> is a potent antioxidant and amino acid that plays a crucial role in supporting various bodily functions. Known for its detoxifying properties, NAC helps combat oxidative stress by neutralizing harmful free radicals, thereby reducing cellular damage and promoting cellular repair. Additionally, NAC supports liver health, respiratory function, and immune system function, making it a versatile nutrient for overall wellness.
              </p>
            </div>
          </motion.div>

          <div className="mb-16">
            <h3 className="font-serif text-4xl mb-12 text-center text-charcoal">The Benefits of NAC IV Therapy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {nacBenefits.map((benefit, index) => (
                <BenefitCard key={benefit.title} benefit={benefit} index={index} />
              ))}
            </div>
          </div>

          <FeatureList features={nacFeatures} title="Why N-Acetyl Cysteine" />
        </div>
      </section>

      {/* Mitochondrial Booster Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-6 text-center text-charcoal"
          >
            Mitochondrial Booster
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl text-rose-gold font-semibold text-center mb-16"
          >
            Our Signature IV Therapy
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/60 border border-white/70 rounded-[4rem] p-12 md:p-16 shadow-2xl mb-16"
          >
            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                <span className="font-semibold text-charcoal">Mitochondrial Booster IV Therapy</span> with Iron Vitamin. Designed to revitalize your cellular energy production and address iron deficiency simultaneously, this innovative therapy offers a comprehensive solution for optimizing health and vitality.
              </p>
              <p>
                <span className="font-semibold text-charcoal">Mitochondria</span> are the powerhouses of the cells, responsible for producing energy in the form of adenosine triphosphate (ATP). Optimal mitochondrial function is essential for sustaining energy levels, supporting metabolism, and promoting overall vitality.
              </p>
              <p>
                Our Mitochondrial Booster IV Therapy combines the benefits of iron vitamin supplementation with targeted nutrients to support mitochondrial function and enhance energy production. By delivering a synergistic blend of vitamins, minerals, and antioxidants directly into the bloodstream, this therapy promotes cellular rejuvenation, improves metabolic efficiency, and boosts overall vitality.
              </p>
            </div>
          </motion.div>

          <div className="mb-16">
            <h3 className="font-serif text-4xl mb-12 text-center text-charcoal">Mitochondrial Booster - Elevate Your Energy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ironBenefits.map((benefit, index) => (
                <BenefitCard key={benefit.title} benefit={benefit} index={index} />
              ))}
            </div>
          </div>

          <FeatureList
            features={[
              "Exceptional Quality",
              "Reduced Fatigue",
              "Increased Energy Levels",
              "Improved Tissue Integrity",
              "Improved Immune Support",
              "Relaxation and Improved Mood",
              "Improved Cognitive Function"
            ]}
            title="Why Iron Therapy"
          />
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
              Experience Personalized Wellness
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover how our customized IV therapy can optimize your health, energy, and vitality.
            </p>
            <motion.button
              className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Session
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
