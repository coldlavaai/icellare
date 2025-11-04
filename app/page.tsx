'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const DNABackground = dynamic(() => import('@/components/DNABackground'), { ssr: false })

// Floating Cell Particle for Hero
function FloatingCell({ index, delay }: { index: number; delay: number }) {
  const positions = [
    { x: '10%', y: '20%' },
    { x: '85%', y: '15%' },
    { x: '15%', y: '70%' },
    { x: '80%', y: '65%' },
    { x: '50%', y: '10%' },
  ]

  const pos = positions[index % positions.length]

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: pos.x, top: pos.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.5],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80">
        <motion.circle
          cx="40"
          cy="40"
          r="25"
          fill="none"
          stroke="rgba(212, 175, 122, 0.4)"
          strokeWidth="2"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: delay + 0.5,
          }}
        />
        <motion.circle
          cx="40"
          cy="40"
          r="15"
          fill="rgba(212, 175, 122, 0.2)"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay,
          }}
        />
      </svg>
    </motion.div>
  )
}

// Service Card with Cell/Organic Design
function ServiceCard({
  title,
  description,
  image,
  index,
  link
}: {
  title: string
  description: string
  image?: string
  index: number
  link: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <Link href={link}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="group relative h-full cursor-pointer"
      >
        {/* Hexagonal-inspired container */}
        <div className="relative overflow-hidden rounded-[2.5rem] h-full">
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-rose-gold via-champagne to-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Multi-layered glass effect */}
          <div className="absolute inset-0 backdrop-blur-3xl bg-white/30 rounded-[2.5rem]" />
          <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/60 via-white/50 to-white/40 rounded-[2.5rem]" />

          {/* Intense glow layers */}
          <motion.div
            className="absolute inset-0 rounded-[2.5rem]"
            animate={{
              boxShadow: [
                '0 0 40px rgba(212, 175, 122, 0.3), 0 0 80px rgba(212, 175, 122, 0.1), inset 0 0 60px rgba(255, 255, 255, 0.3)',
                '0 0 60px rgba(212, 175, 122, 0.5), 0 0 120px rgba(212, 175, 122, 0.2), inset 0 0 80px rgba(255, 255, 255, 0.4)',
                '0 0 40px rgba(212, 175, 122, 0.3), 0 0 80px rgba(212, 175, 122, 0.1), inset 0 0 60px rgba(255, 255, 255, 0.3)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Content card */}
          <div className="relative backdrop-blur-2xl bg-white/80 border-2 border-white/90 p-10 h-full flex flex-col shadow-2xl hover:shadow-rose-gold/60 transition-all duration-700 group-hover:border-rose-gold/80 group-hover:bg-white/90 group-hover:shadow-[0_0_80px_rgba(212,175,122,0.6)]">
            {/* Image with cell membrane effect */}
            {image && (
              <motion.div
                className="relative w-full h-52 mb-6 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                {/* Pulsing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(212, 175, 122, 0)',
                      '0 0 0 8px rgba(212, 175, 122, 0.2)',
                      '0 0 0 0 rgba(212, 175, 122, 0)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )}

            {/* Cellular connection dots */}
            <div className="absolute top-4 right-4 flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-rose-gold/40"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            <h3 className="font-serif text-3xl mb-4 text-charcoal group-hover:text-rose-gold transition-colors duration-500">
              {title}
            </h3>

            <p className="text-charcoal/70 leading-relaxed text-lg flex-grow">
              {description}
            </p>

            <motion.div
              className="mt-6 inline-flex items-center text-rose-gold font-semibold"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              Discover More <span className="ml-2 text-2xl">→</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// Stats Counter Component
function StatCounter({ end, suffix, label, delay }: { end: number; suffix: string; label: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = end / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, end])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <div className="font-serif text-6xl md:text-7xl text-rose-gold mb-2">
        {isInView ? count : 0}{suffix}
      </div>
      <div className="text-charcoal/70 text-lg uppercase tracking-wider">{label}</div>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const smoothHeroY = useSpring(heroY, { stiffness: 100, damping: 30 })

  return (
    <main className="relative bg-cream overflow-hidden">
      <DNABackground />
      <Navigation />

      {/* Premium Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-32" style={{ zIndex: 10 }}>
        <motion.div
          style={{ y: smoothHeroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto text-center"
        >
          {/* Floating cells in hero */}
          {[0, 1, 2, 3, 4].map((i) => (
            <FloatingCell key={i} index={i} delay={i * 0.8} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Premium badge with EXTREME glass */}
            <motion.div
              className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 40px rgba(212, 175, 122, 0.4), 0 0 80px rgba(212, 175, 122, 0.2), inset 0 0 40px rgba(255, 255, 255, 0.5)',
                  '0 0 60px rgba(212, 175, 122, 0.6), 0 0 120px rgba(212, 175, 122, 0.4), inset 0 0 60px rgba(255, 255, 255, 0.7)',
                  '0 0 40px rgba(212, 175, 122, 0.4), 0 0 80px rgba(212, 175, 122, 0.2), inset 0 0 40px rgba(255, 255, 255, 0.5)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="absolute inset-0 backdrop-blur-3xl bg-white/50 border-2 border-white/70 rounded-full" />
              <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 rounded-full" />
              <div className="relative flex items-center gap-2">
                <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-rose-gold"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <span className="text-charcoal font-semibold tracking-wide">World-Class Regenerative Medicine</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-7xl md:text-8xl lg:text-9xl mb-8 text-charcoal leading-[0.95]"
          >
            iCellaré
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 mb-16"
          >
            <p className="text-4xl md:text-5xl lg:text-6xl text-rose-gold font-serif italic">
              Lifespan Center
            </p>
            <p className="text-xl md:text-2xl text-charcoal/80 max-w-4xl mx-auto leading-relaxed">
              State-of-the-art autologous stem cell technology, cutting-edge rejuvenation innovation,
              and personalized care in the heart of Bangkok
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              className="group relative bg-gradient-to-r from-rose-gold to-bronze text-white px-14 py-6 rounded-full text-lg font-semibold shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Book Consultation</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-bronze to-rose-gold"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>

            <motion.button
              className="backdrop-blur-xl bg-white/50 border-2 border-white/70 text-charcoal px-14 py-6 rounded-full text-lg font-semibold hover:border-rose-gold/60 hover:bg-white/70"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-charcoal/50"
            >
              <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
              <motion.div
                className="w-6 h-10 border-2 border-rose-gold/40 rounded-full flex justify-center p-1"
              >
                <motion.div
                  className="w-1 h-3 bg-rose-gold/60 rounded-full"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section with EXTREME Glass */}
      <section className="relative px-6 py-24" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto relative">
          {/* Floating glass orbs */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`glass-orb-${i}`}
              className="absolute w-32 h-32 rounded-full pointer-events-none"
              style={{
                left: `${20 + i * 30}%`,
                top: `${-10 + i * 5}%`,
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(212, 175, 122, 0.3))',
                backdropFilter: 'blur(20px)',
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(212, 175, 122, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.5)',
                    '0 0 80px rgba(212, 175, 122, 0.6), inset 0 0 50px rgba(255, 255, 255, 0.7)',
                    '0 0 40px rgba(212, 175, 122, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.5)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          ))}

          <div className="relative backdrop-blur-3xl bg-white/50 border-2 border-white/80 rounded-[4rem] p-16 overflow-hidden">
            {/* Multiple glass layers */}
            <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/50 to-white/60 rounded-[4rem]" />
            <motion.div
              className="absolute inset-0 rounded-[4rem]"
              animate={{
                boxShadow: [
                  '0 0 60px rgba(212, 175, 122, 0.4), 0 0 120px rgba(212, 175, 122, 0.2), inset 0 0 80px rgba(255, 255, 255, 0.4)',
                  '0 0 100px rgba(212, 175, 122, 0.6), 0 0 200px rgba(212, 175, 122, 0.3), inset 0 0 120px rgba(255, 255, 255, 0.6)',
                  '0 0 60px rgba(212, 175, 122, 0.4), 0 0 120px rgba(212, 175, 122, 0.2), inset 0 0 80px rgba(255, 255, 255, 0.4)',
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              <StatCounter end={15} suffix="+" label="Years of Excellence" delay={0} />
              <StatCounter end={10000} suffix="+" label="Lives Transformed" delay={0.2} />
              <StatCounter end={98} suffix="%" label="Success Rate" delay={0.4} />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section with Parallax */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
          >
            {/* Image side with organic frame */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-full lg:w-1/2 relative"
            >
              {/* Decorative cells around image */}
              <motion.div
                className="absolute -top-8 -left-8 w-16 h-16"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(212, 175, 122, 0.3)" strokeWidth="2" />
                  <circle cx="50" cy="50" r="25" fill="rgba(212, 175, 122, 0.1)" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -right-8 w-20 h-20"
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(156, 125, 92, 0.3)" strokeWidth="2" />
                  <circle cx="50" cy="50" r="30" fill="rgba(156, 125, 92, 0.1)" />
                </svg>
              </motion.div>

              <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/lifespan-center.png"
                  alt="iCellaré Lifespan Center"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>
            </motion.div>

            {/* Content side */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div className="inline-block">
                <p className="text-rose-gold uppercase tracking-wider font-semibold text-sm mb-4 flex items-center gap-2">
                  <motion.div
                    className="w-12 h-px bg-rose-gold"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                  Our Philosophy
                </p>
              </div>

              <h2 className="font-serif text-5xl lg:text-7xl text-charcoal leading-tight">
                We Sell Hope
              </h2>

              <div className="space-y-6">
                <p className="text-charcoal/70 text-xl leading-relaxed">
                  Welcome to Icellare Lifespan Center, where we specialize in state-of-the-art autologous stem cell technology, rejuvenation innovation, in-depth genetics testing and personalized care.
                </p>
                <p className="text-charcoal/70 text-xl leading-relaxed">
                  We believe in harnessing the power of your own cells, to allow you to become <span className="text-rose-gold font-semibold">Your Best Self</span>—the core of Icellaré or <span className="italic">'cell of I.'</span>
                </p>
              </div>

              <motion.button
                className="bg-gradient-to-r from-rose-gold to-bronze text-white px-12 py-5 rounded-full text-lg font-medium shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(212, 175, 122, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Learn Our Story
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid with Cell-Inspired Design */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-20"
          >
            <p className="text-rose-gold uppercase tracking-wider font-semibold text-sm mb-4">
              Our Services
            </p>
            <h2 className="font-serif text-6xl lg:text-7xl text-charcoal mb-6">
              Cutting-Edge Solutions
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Regenerative medicine tailored to your unique biology, powered by cellular intelligence
            </p>
          </motion.div>

          {/* Connection lines visualization */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                title="Stem Cell Banking"
                description="Secure your regenerative health for the future by exploring MSC Stem Cell Banking. Your cells, preserved at their peak, ready when you need them."
                image="https://static.wixstatic.com/media/abb1e6_20f08c48277b40c587abca600014fe22~mv2.jpg"
                index={0}
                link="/stem-cell-banking"
              />
              <ServiceCard
                title="Stem Cell Technology"
                description="MSC Stem cells derived from your own body—either Bone Marrow or Adipose tissue—ensure a safe and effective approach to treatment and recovery."
                image="https://static.wixstatic.com/media/abb1e6_20f08c48277b40c587abca600014fe22~mv2.jpg"
                index={1}
                link="/stem-cell-technology"
              />
              <ServiceCard
                title="Genetic Testing"
                description="Advanced Gene testing and health check-ups pave the way for future prevention with Next Generation Sequencing (NGS) technique."
                image="https://static.wixstatic.com/media/aa834f_e345df4a6ace4e1faaf9eea60816430a~mv2.jpg"
                index={2}
                link="/genetic-testing"
              />
              <ServiceCard
                title="Vitamin IV Therapy"
                description="Tailored Nutrient Delivery based on genetic testing and blood work to address your specific deficiencies or health goals."
                image="https://static.wixstatic.com/media/aa834f_138764b1ca23465899fa7c624a8cbc84~mv2.png"
                index={3}
                link="/vitamin-therapy"
              />
              <ServiceCard
                title="Aesthetics"
                description="Non-invasive, painless methods that require no downtime, including personal cellular injectables to enhance your natural beauty."
                image="https://static.wixstatic.com/media/aa834f_e0f66b6a82c84592b5de1e82b22eb172~mv2.png"
                index={4}
                link="/aesthetics"
              />
              <ServiceCard
                title="Wellness & Spa"
                description="Physiotherapy through physical rehabilitation, injury prevention, and health and fitness to support your recovery journey."
                image="https://static.wixstatic.com/media/aa834f_c9ce10a5b2f34263a17440f2a23e657a~mv2.png"
                index={5}
                link="/wellness-spa"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance with EXTREME Glass Design */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative backdrop-blur-3xl bg-white/50 border-2 border-white/80 rounded-[4rem] p-16 md:p-24 text-center overflow-hidden"
          >
            {/* Multi-layered glass panels */}
            <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/50 to-white/60 rounded-[4rem]" />
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-tl from-white/40 via-white/60 to-white/50 rounded-[4rem]" />

            {/* Massive pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-[4rem]"
              animate={{
                boxShadow: [
                  '0 0 80px rgba(212, 175, 122, 0.4), 0 0 160px rgba(212, 175, 122, 0.2), 0 0 240px rgba(212, 175, 122, 0.1), inset 0 0 100px rgba(255, 255, 255, 0.5)',
                  '0 0 120px rgba(212, 175, 122, 0.6), 0 0 240px rgba(212, 175, 122, 0.4), 0 0 360px rgba(212, 175, 122, 0.2), inset 0 0 150px rgba(255, 255, 255, 0.7)',
                  '0 0 80px rgba(212, 175, 122, 0.4), 0 0 160px rgba(212, 175, 122, 0.2), 0 0 240px rgba(212, 175, 122, 0.1), inset 0 0 100px rgba(255, 255, 255, 0.5)',
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Decorative cellular pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <svg viewBox="0 0 200 200">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={30 + i * 20}
                    fill="none"
                    stroke="#D4AF7A"
                    strokeWidth="2"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </svg>
            </div>

            <h2 className="font-serif text-5xl md:text-6xl mb-8 text-charcoal relative z-10">
              Our Quality Assurance
            </h2>
            <p className="text-4xl text-rose-gold mb-12 font-serif italic relative z-10">
              Only the highest standards
            </p>
            <p className="text-xl text-charcoal/70 leading-relaxed max-w-3xl mx-auto mb-12 relative z-10">
              We don't just offer hope; we craft a personalized wellness journey to bring out your best self,
              embracing you from day 0 through your entire lifespan.
            </p>

            <div className="relative w-full h-auto mt-12 z-10">
              <Image
                src="https://static.wixstatic.com/media/aa834f_bafd0de1f6bb4648a0e4dd93297ae2e5~mv2.png"
                alt="iCellaré Certifications - ISO, PICS/GMP, ISCT Standards"
                width={1320}
                height={493}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section with EXTREME Glass */}
      <section className="relative px-6 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative backdrop-blur-3xl bg-white/60 border-2 border-white/90 rounded-[4rem] p-12 md:p-20 overflow-hidden"
          >
            {/* Triple glass layers */}
            <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/80 via-white/60 to-white/70 rounded-[4rem]" />
            <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-tl from-white/50 via-white/70 to-white/60 rounded-[4rem]" />

            {/* Intense ambient glow */}
            <motion.div
              className="absolute inset-0 rounded-[4rem]"
              animate={{
                boxShadow: [
                  '0 0 60px rgba(212, 175, 122, 0.5), 0 0 120px rgba(212, 175, 122, 0.3), inset 0 0 80px rgba(255, 255, 255, 0.6)',
                  '0 0 100px rgba(212, 175, 122, 0.7), 0 0 200px rgba(212, 175, 122, 0.5), inset 0 0 120px rgba(255, 255, 255, 0.8)',
                  '0 0 60px rgba(212, 175, 122, 0.5), 0 0 120px rgba(212, 175, 122, 0.3), inset 0 0 80px rgba(255, 255, 255, 0.6)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative">
              <h2 className="font-serif text-5xl md:text-6xl mb-12 text-charcoal text-center">
                Visit Us in Bangkok
              </h2>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-4">
                <h3 className="font-semibold text-rose-gold text-xl mb-4 flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Location
                </h3>
                <p className="text-lg text-charcoal/80">102 Phutthamonthon Sai 1</p>
                <p className="text-lg text-charcoal/80">Bang Bamad, Taling Chan</p>
                <p className="text-lg text-charcoal/80">Bangkok 10170, Thailand</p>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-rose-gold text-xl mb-4 flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Contact
                </h3>
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
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
