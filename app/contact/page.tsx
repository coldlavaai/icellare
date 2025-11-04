'use client'

import DNAHelix3D from '@/components/DNAHelix3D'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const bangkokInfo = {
  location: "Bangkok",
  address: [
    "102 Phutthamonthon Sai 1",
    "Bang Bamad, Taling Chan",
    "Bangkok 10170"
  ],
  phone: "(+66)80-856-5999",
  email: "info@icellare.com",
  social: {
    facebook: "icellare",
    instagram: "icellare_official",
    line: "Available via QR Code"
  }
}

const phuketInfo = {
  location: "Phuket",
  address: [
    "9 Komarapat Road",
    "Talad Yai, Muang Phuket",
    "Phuket 83000, Thailand"
  ],
  phone: "02-026-6101-(6)",
  social: {
    facebook: "icellare phuket",
    instagram: "icellare_phuket",
    line: "Available via QR Code"
  }
}

const contactMethods = [
  {
    title: "Phone",
    icon: "📞",
    description: "Speak directly with our team",
    action: "Call us for immediate assistance"
  },
  {
    title: "Email",
    icon: "✉",
    description: "Send us your inquiries",
    action: "We'll respond within 24 hours"
  },
  {
    title: "Visit",
    icon: "📍",
    description: "Come see our facilities",
    action: "Schedule a tour of our centers"
  },
  {
    title: "Social Media",
    icon: "💬",
    description: "Connect with us online",
    action: "Follow us for updates and insights"
  }
]

function ContactCard({ info, index }: { info: typeof bangkokInfo | typeof phuketInfo, index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-[3rem] backdrop-blur-2xl bg-white/60 border border-white/70 p-10 md:p-12 shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          <h3 className="font-serif text-4xl mb-8 text-rose-gold">
            {info.location}
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Address</h4>
              {info.address.map((line, i) => (
                <p key={i} className="text-lg text-charcoal/80">{line}</p>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Phone</h4>
              <p className="text-xl text-charcoal font-semibold">{info.phone}</p>
            </div>

            {info.location === "Bangkok" && (
              <div>
                <h4 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-2">Email</h4>
                <p className="text-lg text-charcoal/80">{bangkokInfo.email}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-3">Social Media</h4>
              <div className="space-y-2">
                <p className="text-charcoal/70">
                  <span className="font-semibold">Facebook:</span> {info.social.facebook}
                </p>
                <p className="text-charcoal/70">
                  <span className="font-semibold">Instagram:</span> {info.social.instagram}
                </p>
                <p className="text-charcoal/70">
                  <span className="font-semibold">Line:</span> {info.social.line}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ContactMethodCard({ method, index }: { method: typeof contactMethods[0], index: number }) {
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
      <div className="relative overflow-hidden rounded-[2rem] backdrop-blur-2xl bg-white/50 border border-white/60 p-8 shadow-2xl hover:shadow-rose-gold/30 transition-all duration-700 h-full text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-bronze/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative">
          <div className="text-5xl mb-4">{method.icon}</div>
          <h3 className="font-serif text-2xl mb-3 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
            {method.title}
          </h3>
          <p className="text-charcoal/70 mb-2">{method.description}</p>
          <p className="text-sm text-rose-gold font-semibold">{method.action}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ContactPage() {
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
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-7xl md:text-8xl lg:text-9xl mb-8 text-charcoal"
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-charcoal/70 max-w-4xl mx-auto leading-relaxed"
          >
            Connect with our team and begin your journey to optimal health
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Methods Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            How to Reach Us
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <ContactMethodCard key={method.title} method={method} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-16 text-center text-charcoal"
          >
            Our Locations
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContactCard info={bangkokInfo} index={0} />
            <ContactCard info={phuketInfo} index={1} />
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
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
              We're Here to Help
            </h2>

            <div className="space-y-6 text-lg text-charcoal/70 leading-relaxed">
              <p>
                At Icellaré Lifespan Center, we understand that beginning your regenerative health journey can feel overwhelming.
                That's why our dedicated team is here to guide you every step of the way.
              </p>
              <p>
                Whether you have questions about our services, want to schedule a consultation, or simply need more information
                about how we can help you achieve your health goals, we're ready to assist you.
              </p>
              <p className="text-xl font-semibold text-rose-gold text-center pt-4">
                Your journey to optimal health begins with a conversation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Hours Section */}
      <section className="relative px-6 py-20" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-white/50 border border-white/60 rounded-[3rem] p-12 md:p-16 shadow-2xl text-center"
          >
            <h2 className="font-serif text-4xl mb-8 text-charcoal">Office Hours</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-charcoal/70">
              <div>
                <p className="font-semibold text-charcoal mb-2">Monday - Friday</p>
                <p>9:00 AM - 6:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-charcoal mb-2">Saturday - Sunday</p>
                <p>By Appointment Only</p>
              </div>
            </div>

            <p className="text-rose-gold font-semibold mt-8">
              We accommodate appointments outside regular hours upon request
            </p>
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
              Ready to Begin?
            </h2>
            <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Take the first step towards transforming your health and unlocking your body's regenerative potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl"
                whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(212, 175, 122, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Book Consultation
              </motion.button>
              <motion.button
                className="backdrop-blur-2xl bg-white/50 border-2 border-rose-gold text-charcoal px-12 py-5 rounded-full text-lg font-semibold shadow-xl"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Tour
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
