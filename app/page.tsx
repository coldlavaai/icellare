'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useState, useEffect, useRef } from 'react'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { ArchitecturalDNA } from '@/components/ArchitecturalDNA'
import { TechnicalFrame } from '@/components/TechnicalFrame'
import { SimpleParticles } from '@/components/SimpleParticles'
import * as THREE from 'three'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

function Scene({ growthProgress, enableGrowth, showParticles, scrollProgress }: { growthProgress: number; enableGrowth: boolean; showParticles: boolean; scrollProgress: number }) {
  return (
    <>
      {/* Camera - centered on DNA, slightly elevated */}
      <PerspectiveCamera
        makeDefault
        position={[0, 2.2, 28]}
        fov={50}
        near={0.1}
        far={1000}
      />

      {/* Clean neutral lighting for light theme */}
      <ambientLight color={0xffffff} intensity={0.8} />

      <directionalLight
        position={[10, 15, 10]}
        color={0xffffff}
        intensity={0.8}
      />

      <directionalLight
        position={[-10, 5, -10]}
        color={0xffffff}
        intensity={0.4}
      />

      <directionalLight
        position={[0, 5, -15]}
        color={0xffffff}
        intensity={0.5}
      />

      {/* Environment for reflections */}
      <Environment preset="apartment" />

      {/* DNA with growth animation and scroll-based rotation */}
      <ArchitecturalDNA
        growthProgress={growthProgress}
        enableGrowth={enableGrowth}
        scrollProgress={scrollProgress}
      />

      {/* Simple particles */}
      {showParticles && <SimpleParticles />}
    </>
  )
}

export default function LoadingTest() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const [showFrame, setShowFrame] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [showTopNav, setShowTopNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1) // -1 means hero, 0-5 are sections
  const [isDNALocked, setIsDNALocked] = useState(false) // Track if DNA should be locked to last section
  const [dnaLockPosition, setDnaLockPosition] = useState(0) // Store exact position where DNA locks
  const [activeModal, setActiveModal] = useState<string | null>(null) // Track which service modal is open
  const [showServicesHeading, setShowServicesHeading] = useState(false) // Track if DNA has passed services heading
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false) // Track if auto-scroll to services has been triggered
  const [isScrolling, setIsScrolling] = useState(false) // Track if user is currently scrolling
  const [isCenteredOnSection, setIsCenteredOnSection] = useState(false) // Track if centered on a section
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const timeline = [
      { delay: 0, progress: 0 },      // Start
      { delay: 150, progress: 0.2 },  // Frame appears
      { delay: 400, progress: 0.5 },  // DNA starts growing
      { delay: 900, progress: 0.7 },  // DNA fully grown
      { delay: 1100, progress: 0.8 }, // Labels appear
      { delay: 1400, progress: 1 },   // Branding appears
    ]

    timeline.forEach(({ delay, progress }) => {
      setTimeout(() => {
        setLoadingProgress(progress)
      }, delay)
    })

    // Mark loading as complete but keep frame visible
    setTimeout(() => {
      setIsLoadingComplete(true)
      // Don't hide frame - it stays until user scrolls
    }, 1700)
  }, [])

  // Auto-scroll to services when hero scroll threshold is passed
  useEffect(() => {
    if (!isLoadingComplete || hasAutoScrolled) return

    const handleAutoScroll = () => {
      const currentScrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const threshold = viewportHeight * 0.15 // Trigger when scrolled 15% of hero section

      if (currentScrollY > threshold && currentScrollY < viewportHeight * 0.9) {
        setHasAutoScrolled(true)
        document.getElementById('our-services')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    window.addEventListener('scroll', handleAutoScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleAutoScroll)
  }, [isLoadingComplete, hasAutoScrolled])

  // Reset auto-scroll when scrolling back to top
  useEffect(() => {
    const handleResetAutoScroll = () => {
      if (window.scrollY < 50) {
        setHasAutoScrolled(false)
      }
    }

    window.addEventListener('scroll', handleResetAutoScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleResetAutoScroll)
  }, [])

  // Track scroll position, velocity, and direction
  useEffect(() => {
    let lastTime = Date.now()

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0

      // Mark as scrolling and set timeout to detect when stopped
      setIsScrolling(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 50) // Consider stopped after 50ms of no scroll

      // Calculate which section is active
      const viewportHeight = window.innerHeight
      const heroHeight = viewportHeight

      if (currentScrollY < heroHeight * 0.5) {
        setActiveSectionIndex(-1) // Hero
        setIsCenteredOnSection(false)
      } else {
        // Calculate section index (0-6)
        const sectionIndex = Math.floor((currentScrollY - heroHeight * 0.5) / viewportHeight)
        setActiveSectionIndex(Math.min(sectionIndex, 6)) // Max 6 (7 sections)

        // Check if centered on a section (within 20% of section center)
        const sectionProgress = ((currentScrollY - heroHeight * 0.5) % viewportHeight) / viewportHeight
        const distanceFromCenter = Math.abs(sectionProgress - 0.5)
        setIsCenteredOnSection(distanceFromCenter < 0.2 && sectionIndex >= 0)
      }

      // Check if DNA is centered in the services section
      // Services section is from 100vh to 200vh, center is at 150vh
      // Show heading when DNA center reaches middle of services section
      const servicesSectionCenter = 1.5 * viewportHeight
      const dnaCenterPosition = currentScrollY + (viewportHeight / 2)
      if (dnaCenterPosition > servicesSectionCenter) {
        setShowServicesHeading(true)
      } else {
        setShowServicesHeading(false)
      }

      // Lock DNA when we reach the last section (section 6 = Wellness & Spa)
      // Lock like hitting a wall - slightly before center to prevent overshoot
      const lastSectionCenterScroll = heroHeight + (6.05 * viewportHeight)
      if (currentScrollY >= lastSectionCenterScroll) {
        if (!isDNALocked) {
          setDnaLockPosition(lastSectionCenterScroll)
        }
        setIsDNALocked(true)
      } else {
        setIsDNALocked(false)
      }

      // Calculate velocity
      const now = Date.now()
      const deltaTime = now - lastTime
      const deltaScroll = Math.abs(currentScrollY - lastScrollY)
      const velocity = deltaTime > 0 ? deltaScroll / deltaTime : 0

      // Show/hide nav based on scroll direction
      if (currentScrollY < 100) {
        setShowTopNav(true) // Always show at top
      } else if (currentScrollY < lastScrollY) {
        setShowTopNav(true) // Scrolling up
      } else if (currentScrollY > lastScrollY) {
        setShowTopNav(false) // Scrolling down
      }

      setScrollProgress(progress)
      setScrollVelocity(velocity)
      setLastScrollY(currentScrollY)

      lastTime = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Map loadingProgress to DNA growthProgress
  // DNA starts growing at loadingProgress 0.5
  const dnaGrowthProgress = loadingProgress < 0.5
    ? 0
    : Math.min((loadingProgress - 0.5) / 0.2, 1) // Grows from 0.5 to 0.7

  const sections = [
    {
      id: 'stem-cell-banking',
      title: 'Stem Cell Banking',
      subtitle: 'Preservation & Storage',
      side: 'left',
      route: '/stem-cell-banking',
      image: 'https://static.wixstatic.com/media/aa834f_275473098f5246c88c3b49755c7acf67~mv2.jpg/v1/fill/w_1280,h_998,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa834f_275473098f5246c88c3b49755c7acf67~mv2.jpg',
      description: 'At Icellaré Lifespan Center, we are dedicated to unlocking the full potential of your well-being through the transformative power of MSC Stem Cell Banking. Secure your regenerative health for the future by exploring MSC Stem Cell Banking today.',
      stats: [
        { value: '25+ Years', label: 'Storage Guarantee' },
        { value: '99.9%', label: 'Viability Rate' }
      ]
    },
    {
      id: 'stem-cell-technology',
      title: 'Stem Cell Technology',
      subtitle: 'Advanced Therapies',
      side: 'right',
      route: '/stem-cell-technology',
      image: 'https://static.wixstatic.com/media/aa834f_2745f14ccb304791931b50aed31e023a~mv2.jpg/v1/fill/w_1280,h_1002,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa834f_2745f14ccb304791931b50aed31e023a~mv2.jpg',
      description: 'MSC Stem cells, derived from either Bone Marrow or Adipose tissue, ensure a safe and effective approach to treatment and recovery, minimizing the risk of immune system resistance and infection.',
      stats: [
        { value: '10K+', label: 'Treatments' },
        { value: '95%', label: 'Success Rate' }
      ]
    },
    {
      id: 'genetic-testing',
      title: 'Genetic Testing',
      subtitle: 'DNA Analysis',
      side: 'left',
      route: '/genetic-testing',
      image: 'https://static.wixstatic.com/media/aa834f_4e07f9c203794fc4857a4a8df8715c2b~mv2.jpg/v1/fill/w_1280,h_1000,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa834f_4e07f9c203794fc4857a4a8df8715c2b~mv2.jpg',
      description: 'Begin proactive health and well-being at Icellaré Lifespan Center, where advanced Gene testing and health check-ups pave the way for future prevention. DNA tests related to diagnosis Genetic diseases with Next Generation Sequencing (NGS) technique',
      stats: [
        { value: '500+', label: 'Genetic Markers' },
        { value: '48hrs', label: 'Results Time' }
      ]
    },
    {
      id: 'vitamin-iv-therapy',
      title: 'Vitamin IV Therapy',
      subtitle: 'Infusion Optimization',
      side: 'right',
      route: '/vitamin-therapy',
      image: 'https://static.wixstatic.com/media/abb1e6_2f56dd9c05f847bb97a307636ebe160a~mv2.jpg/v1/fill/w_1280,h_1002,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/abb1e6_2f56dd9c05f847bb97a307636ebe160a~mv2.jpg',
      description: 'At Icellaré we don\'t believe in one size fits all. Tailored Nutrient Delivery based on our genetic testing and blood work allows us to cater to our individual\'s nutritional needs, addressing specific deficiencies or health goals.',
      stats: [
        { value: '20+', label: 'Custom Formulas' },
        { value: '100%', label: 'Absorption' }
      ]
    },
    {
      id: 'aesthetics',
      title: 'Aesthetics',
      subtitle: 'Beauty Treatments',
      side: 'left',
      route: '/aesthetics',
      image: 'https://static.wixstatic.com/media/11062b_622da063db8f46d28924c887166916b4~mv2.jpg/v1/fill/w_1280,h_1000,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_622da063db8f46d28924c887166916b4~mv2.jpg',
      description: 'Enhancing your natural beauty involves methods that are non-invasive, painless, and require no downtime. These methods come in many forms, including personal cellular injectables.',
      stats: [
        { value: '15+ Years', label: 'Experience' },
        { value: '5000+', label: 'Happy Clients' }
      ]
    },
    {
      id: 'wellness-spa',
      title: 'Wellness & Spa',
      subtitle: 'Holistic Care',
      side: 'right',
      route: '/wellness-spa',
      image: 'https://static.wixstatic.com/media/aa834f_8add081e2af5447d80d53370cb4b7c81~mv2.png/v1/fill/w_1280,h_1000,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa834f_8add081e2af5447d80d53370cb4b7c81~mv2.png',
      description: 'Physiotherapy helps through physical rehabilitation, injury prevention, and health and fitness. Physiotherapists get you involved in your own recovery.',
      stats: [
        { value: '30+', label: 'Treatments' },
        { value: '98%', label: 'Satisfaction' }
      ]
    },
  ]

  return (
    <>
      {/* Hide default scrollbar */}
      <style jsx global>{`
        html {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        html::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        @keyframes rainbow-shift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        .rainbow-text {
          background: linear-gradient(
            90deg,
            #B8860B 0%,
            #C9A342 20%,
            #D4B84E 40%,
            #C9A342 60%,
            #B8860B 80%,
            #C9A342 100%
          );
          background-size: 300% 100%;
          animation: rainbow-shift 8s linear infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .ticker-track {
          display: flex;
          gap: 4rem;
          animation: scroll-left 30s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Loading Screen */}
      {!isLoadingComplete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{
          background: 'radial-gradient(ellipse 60% 120% at 50% 62%, rgba(245, 250, 255, 1) 0%, rgba(235, 245, 255, 1) 15%, rgba(200, 220, 242, 1) 35%, rgba(160, 190, 220, 1) 60%, rgba(120, 150, 190, 1) 100%)'
        }}>
          <div className="text-center">
            <div className="relative w-96 h-32 mb-8">
              <Image
                src="https://static.wixstatic.com/media/abb1e6_84c39a4abeea4e66ab7ad3a3d52ef0ca~mv2.png/v1/crop/x_0,y_0,w_4395,h_1596/fill/w_800,h_300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/Icellare_-Horizontal-Logo-01.png"
                alt="ICELLARÉ"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ animationDelay: '0ms', backgroundColor: '#EDD5A8', boxShadow: '0 0 8px rgba(237, 213, 168, 0.5)' }} />
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ animationDelay: '150ms', backgroundColor: '#C8DCF0', boxShadow: '0 0 8px rgba(200, 220, 240, 0.5)' }} />
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ animationDelay: '300ms', backgroundColor: '#E8E5E0', boxShadow: '0 0 8px rgba(232, 229, 224, 0.5)' }} />
            </div>
          </div>
        </div>
      )}

      {/* LAYER 1: Light Blue Background - darker edges, lighter middle */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 0,
        background: 'radial-gradient(ellipse 60% 120% at 50% 62%, rgba(245, 250, 255, 1) 0%, rgba(235, 245, 255, 1) 15%, rgba(200, 220, 242, 1) 35%, rgba(160, 190, 220, 1) 60%, rgba(120, 150, 190, 1) 100%)'
      }} />

      {/* LAYER 2: DNA Canvas - MIDDLE LAYER - Fixed until locked, then absolute */}
      <div
        className="pointer-events-none"
        style={{
          zIndex: 10,
          position: isDNALocked ? 'absolute' : 'fixed',
          top: isDNALocked ? `${dnaLockPosition}px` : 0,
          left: 0,
          right: 0,
          bottom: isDNALocked ? 'auto' : 0,
          height: '100vh'
        }}
      >
        {/* 3D Canvas - transparent to show layers below - MUST NOT BLOCK POINTER EVENTS */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance'
            }}
            style={{ background: 'transparent', pointerEvents: 'none' }}
          >
            <Suspense fallback={null}>
              <Scene
                growthProgress={dnaGrowthProgress}
                enableGrowth={!isLoadingComplete}
                showParticles={isLoadingComplete}
                scrollProgress={scrollProgress}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Scrollable Content Sections */}
      <div className="relative">
        {/* Top spacer to ensure perfect layout at scrollY = 0 */}
        <div style={{ height: '100px' }}></div>

        {/* Scroll Progress Bars - Full Border - Enhanced Visibility */}
        {/* Top */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[4px] z-[60] origin-left"
          style={{
            background: 'linear-gradient(90deg, #B8860B 0%, #C9A342 50%, #D4B84E 100%)',
            scaleX: scrollProgress,
            boxShadow: '0 0 20px rgba(184, 134, 11, 1), 0 0 40px rgba(184, 134, 11, 0.8), 0 0 60px rgba(184, 134, 11, 0.4)'
          }}
          initial={{ opacity: 0 }}
          animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Right */}
        <motion.div
          className="fixed top-0 right-0 bottom-0 w-[4px] z-[60] origin-top"
          style={{
            background: 'linear-gradient(180deg, #B8860B 0%, #C9A342 50%, #D4B84E 100%)',
            scaleY: scrollProgress,
            boxShadow: '0 0 20px rgba(184, 134, 11, 1), 0 0 40px rgba(184, 134, 11, 0.8), 0 0 60px rgba(184, 134, 11, 0.4)'
          }}
          initial={{ opacity: 0 }}
          animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Bottom - fills right to left */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-[4px] z-[60] origin-right"
          style={{
            background: 'linear-gradient(90deg, #D4B84E 0%, #C9A342 50%, #B8860B 100%)',
            scaleX: scrollProgress,
            boxShadow: '0 0 20px rgba(184, 134, 11, 1), 0 0 40px rgba(184, 134, 11, 0.8), 0 0 60px rgba(184, 134, 11, 0.4)'
          }}
          initial={{ opacity: 0 }}
          animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Left - fills bottom to top */}
        <motion.div
          className="fixed top-0 left-0 bottom-0 w-[4px] z-[60] origin-bottom"
          style={{
            background: 'linear-gradient(180deg, #D4B84E 0%, #C9A342 50%, #B8860B 100%)',
            scaleY: scrollProgress,
            boxShadow: '0 0 20px rgba(184, 134, 11, 1), 0 0 40px rgba(184, 134, 11, 0.8), 0 0 60px rgba(184, 134, 11, 0.4)'
          }}
          initial={{ opacity: 0 }}
          animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Top Navigation Bar - FIXED - TEXT ONLY VERSION */}
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50 py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={isLoadingComplete && showTopNav ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full px-6 grid grid-cols-3 items-center">
            {/* Left side - Team, Our Lab */}
            <div className="flex items-center gap-12 justify-center">
              {['Team', 'Our Lab'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[13px] font-sans tracking-wider text-black/50 hover:text-black transition-all duration-300 relative group pointer-events-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/0 via-[#B8860B]/30 to-[#B8860B]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8c734d] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            {/* Center - Services */}
            <div className="flex justify-center">
              <motion.button
                onClick={() => {
                  document.getElementById('our-services')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                className="text-[13px] font-sans tracking-wider text-black/50 hover:text-black transition-all duration-300 relative group pointer-events-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <span className="relative z-10">Services</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/0 via-[#B8860B]/30 to-[#B8860B]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8c734d] transition-all duration-300 group-hover:w-full" />
              </motion.button>
            </div>

            {/* Right side - Facilities, Contact */}
            <div className="flex items-center gap-12 justify-center">
              {['Facilities', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-[13px] font-sans tracking-wider text-black/50 hover:text-black transition-all duration-300 relative group pointer-events-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/0 via-[#B8860B]/30 to-[#B8860B]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8c734d] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Hero section with logo and heading - SCROLLS WITH PAGE */}
        <div className="h-screen absolute inset-0 z-30 flex flex-col items-center justify-start pointer-events-none" style={{ paddingTop: '70px' }}>
          {/* Full logo - stacked vertically */}
          <motion.div
            className="relative z-10 mb-auto cursor-pointer pointer-events-auto group text-center flex flex-col items-center"
            initial={{ opacity: 0, y: -30 }}
            animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Logo mark - gold colored */}
            <div className="relative w-20 h-20 mb-3 transition-all duration-300 group-hover:scale-105">
              <Image
                src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/Icellare_-Horizontal-Logo-01_1_1.png?v=1762430161"
                alt="ICELLARÉ Logo"
                fill
                className="object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(52%) sepia(14%) saturate(1345%) hue-rotate(8deg) brightness(93%) contrast(86%)' }}
                priority
              />
            </div>

            {/* ICELLARÉ wordmark - black */}
            <div className="relative w-[220px] h-16 mb-2 transition-all duration-300 group-hover:scale-105">
              <Image
                src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/Icellare_-Horizonta.png?v=1762430184"
                alt="ICELLARÉ"
                fill
                className="object-contain"
                style={{ filter: 'brightness(0)' }}
                priority
              />
            </div>

            {/* Lifespan Center text */}
            <p className="text-sm font-serif text-black/70 tracking-[0.3em] uppercase">
              Lifespan Center
            </p>
          </motion.div>

          {/* Bottom-center horizontal logo - shows when centered on all sections */}
          <motion.div
            className="fixed bottom-8 left-0 right-0 flex justify-center cursor-pointer pointer-events-auto group z-50"
            animate={{
              opacity: (activeSectionIndex >= 0 && activeSectionIndex <= 6 && !isScrolling && isCenteredOnSection) ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-48 h-16 transition-all duration-300 group-hover:scale-105">
              <Image
                src="https://static.wixstatic.com/media/abb1e6_84c39a4abeea4e66ab7ad3a3d52ef0ca~mv2.png/v1/crop/x_0,y_0,w_4395,h_1596/fill/w_800,h_300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/Icellare_-Horizontal-Logo-01.png"
                alt="ICELLARÉ"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Spacer to push DNA and content down */}
          <div style={{ height: '200px' }}></div>

          {/* TechnicalFrame with navigation - centered for DNA */}
          <div className="absolute inset-0" style={{ top: '200px' }}>
            <TechnicalFrame
              isVisible={showFrame}
              loadingProgress={loadingProgress}
              onNavigate={(sectionId) => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            />
          </div>
        </div>


        {/* Heading at bottom - FIXED POSITION, FADES OUT WITH SCROLL (no delay) */}
        <motion.div
          className="fixed bottom-12 left-0 right-0 z-30 text-center pointer-events-none"
          initial={{ opacity: 0, y: 30 }}
          animate={
            isLoadingComplete
              ? {
                  opacity: Math.max(0, 1 - scrollProgress * 12),
                  y: 0
                }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0 }}
        >
          <h1 className="text-sm font-serif font-light text-black tracking-[0.3em] uppercase">
            Stem Cell Technology - Rejuvenation Innovation - Personalised Care
          </h1>
        </motion.div>

        {/* NEW SERVICES SECTION - SEPARATE FULL SCREEN BELOW HERO */}
        <div
          id="our-services"
          className="h-screen relative pointer-events-none"
          style={{
            marginTop: '100vh',
            scrollSnapAlign: 'center'
          }}
        >
          {/* Services Title - fades in when DNA passes */}
          <motion.div
            className="absolute top-28 left-0 right-0 z-30 text-center pointer-events-none"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={showServicesHeading ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            } : {
              opacity: 0,
              y: 30,
              filter: 'blur(8px)'
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <h2 className="text-6xl font-serif text-black tracking-wide mb-4">Our Services</h2>
            <p className="text-2xl font-serif italic text-[#8c734d]">Comprehensive regenerative healthcare solutions</p>
          </motion.div>

          {/* Navigation labels around DNA - SCROLLS */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '250px' }}>
            {/* Navigation labels positioned around DNA */}
            <motion.div
              className="absolute left-[22%] top-[20%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete && loadingProgress > 0.7 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => {
                document.getElementById('stem-cell-banking')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 transition-all duration-300 relative">
                {/* Image popup - appears on left side */}
                <div className="absolute left-[-220px] top-1/2 -translate-y-1/2 w-48 h-32 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border-2 border-[#B8860B]">
                  <img
                    src="https://static.wixstatic.com/media/aa834f_275473098f5246c88c3b49755c7acf67~mv2.jpg/v1/fill/w_1280,h_998,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa834f_275473098f5246c88c3b49755c7acf67~mv2.jpg"
                    alt="Stem Cell Banking"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[15px] font-mono text-black text-left transition-all duration-300 px-3 py-2 rounded-lg backdrop-blur-lg bg-white/30 border border-white/40 group-hover:border-[#B8860B] group-hover:shadow-[0_0_20px_rgba(184,134,11,0.6)] group-hover:bg-white/50 group-hover:scale-105">
                  <div className="font-semibold">STEM CELL BANKING</div>
                  <div className="text-xs mt-0.5 text-[#B8860B] transition-all">
                    Preservation & Storage
                  </div>
                </div>
                <svg width="60" height="2" className="relative transition-all duration-300">
                  <line x1="0" y1="1" x2="60" y2="1" stroke="#000000" strokeWidth="2" opacity="0.4" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#B8860B]" />
                  <circle cx="60" cy="1" r="3" fill="#000000" opacity="0.4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#B8860B]" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              className="absolute left-[20%] top-[45%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete && loadingProgress > 0.75 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => {
                document.getElementById('genetic-testing')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 transition-all duration-300 relative">
                {/* Image popup - appears on left side */}
                <div className="absolute left-[-220px] top-1/2 -translate-y-1/2 w-48 h-32 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border-2 border-[#B8860B]">
                  <img
                    src="https://static.wixstatic.com/media/aa834f_4e07f9c203794fc4857a4a8df8715c2b~mv2.jpg/v1/fill/w_1280,h_1000,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa834f_4e07f9c203794fc4857a4a8df8715c2b~mv2.jpg"
                    alt="Genetic Testing"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[15px] font-mono text-black text-left transition-all duration-300 px-3 py-2 rounded-lg backdrop-blur-lg bg-white/30 border border-white/40 group-hover:border-[#B8860B] group-hover:shadow-[0_0_20px_rgba(184,134,11,0.6)] group-hover:bg-white/50 group-hover:scale-105">
                  <div className="font-semibold">GENETIC TESTING</div>
                  <div className="text-xs mt-0.5 text-[#B8860B] transition-all">
                    DNA Analysis
                  </div>
                </div>
                <svg width="110" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="110" y2="1" stroke="#000000" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#B8860B]" />
                  <circle cx="110" cy="1" r="3" fill="#000000" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#B8860B]" />
                </svg>
              </div>
            </motion.div>

            {/* Left side label 3 */}
            <motion.div
              className="absolute left-[23%] top-[70%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete && loadingProgress > 0.8 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => {
                document.getElementById('aesthetics')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 transition-all duration-300 relative">
                {/* Image popup - appears on left side */}
                <div className="absolute left-[-220px] top-1/2 -translate-y-1/2 w-48 h-32 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border-2 border-[#B8860B]">
                  <img
                    src="https://static.wixstatic.com/media/11062b_622da063db8f46d28924c887166916b4~mv2.jpg/v1/fill/w_1280,h_1000,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_622da063db8f46d28924c887166916b4~mv2.jpg"
                    alt="Aesthetics"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[15px] font-mono text-black text-left transition-all duration-300 px-3 py-2 rounded-lg backdrop-blur-lg bg-white/30 border border-white/40 group-hover:border-[#B8860B] group-hover:shadow-[0_0_20px_rgba(184,134,11,0.6)] group-hover:bg-white/50 group-hover:scale-105">
                  <div className="font-semibold">AESTHETICS</div>
                  <div className="text-xs mt-0.5 text-[#B8860B] transition-all">
                    Beauty Treatments
                  </div>
                </div>
                <svg width="95" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="95" y2="1" stroke="#000000" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#B8860B]" />
                  <circle cx="95" cy="1" r="3" fill="#000000" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#B8860B]" />
                </svg>
              </div>
            </motion.div>

            {/* Right side label 1 */}
            <motion.div
              className="absolute right-[21%] top-[20%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: 20 }}
              animate={isLoadingComplete && loadingProgress > 0.7 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              onClick={() => {
                document.getElementById('stem-cell-technology')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 flex-row-reverse transition-all duration-300 relative">
                {/* Image popup - appears on right side */}
                <div className="absolute right-[-220px] top-1/2 -translate-y-1/2 w-48 h-32 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border-2 border-[#B8860B]">
                  <img
                    src="https://static.wixstatic.com/media/aa834f_2745f14ccb304791931b50aed31e023a~mv2.jpg/v1/fill/w_1280,h_1002,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa834f_2745f14ccb304791931b50aed31e023a~mv2.jpg"
                    alt="Stem Cell Technology"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[15px] font-mono text-black text-right transition-all duration-300 px-3 py-2 rounded-lg backdrop-blur-lg bg-white/30 border border-white/40 group-hover:border-[#B8860B] group-hover:shadow-[0_0_20px_rgba(184,134,11,0.6)] group-hover:bg-white/50 group-hover:scale-105">
                  <div className="font-semibold">STEM CELL TECHNOLOGY</div>
                  <div className="text-xs mt-0.5 text-[#B8860B] transition-all">
                    Advanced Therapies
                  </div>
                </div>
                <svg width="55" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="55" y2="1" stroke="#000000" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#B8860B]" />
                  <circle cx="0" cy="1" r="3" fill="#000000" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#B8860B]" />
                </svg>
              </div>
            </motion.div>

            {/* Right side label 2 */}
            <motion.div
              className="absolute right-[18%] top-[45%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: 20 }}
              animate={isLoadingComplete && loadingProgress > 0.75 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              onClick={() => {
                document.getElementById('vitamin-iv-therapy')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 flex-row-reverse transition-all duration-300 relative">
                {/* Image popup - appears on right side */}
                <div className="absolute right-[-220px] top-1/2 -translate-y-1/2 w-48 h-32 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border-2 border-[#B8860B]">
                  <img
                    src="https://static.wixstatic.com/media/abb1e6_2f56dd9c05f847bb97a307636ebe160a~mv2.jpg/v1/fill/w_1280,h_1002,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/abb1e6_2f56dd9c05f847bb97a307636ebe160a~mv2.jpg"
                    alt="Vitamin IV Therapy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[15px] font-mono text-black text-right transition-all duration-300 px-3 py-2 rounded-lg backdrop-blur-lg bg-white/30 border border-white/40 group-hover:border-[#B8860B] group-hover:shadow-[0_0_20px_rgba(184,134,11,0.6)] group-hover:bg-white/50 group-hover:scale-105">
                  <div className="font-semibold">VITAMIN IV THERAPY</div>
                  <div className="text-xs mt-0.5 text-[#B8860B] transition-all">
                    Infusion Optimization
                  </div>
                </div>
                <svg width="100" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="100" y2="1" stroke="#000000" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#B8860B]" />
                  <circle cx="0" cy="1" r="3" fill="#000000" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#B8860B]" />
                </svg>
              </div>
            </motion.div>

            {/* Right side label 3 */}
            <motion.div
              className="absolute right-[23%] top-[70%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: 20 }}
              animate={isLoadingComplete && loadingProgress > 0.8 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              onClick={() => {
                document.getElementById('wellness-spa')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 flex-row-reverse transition-all duration-300 relative">
                {/* Image popup - appears on right side */}
                <div className="absolute right-[-220px] top-1/2 -translate-y-1/2 w-48 h-32 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border-2 border-[#B8860B]">
                  <img
                    src="https://static.wixstatic.com/media/aa834f_8add081e2af5447d80d53370cb4b7c81~mv2.png/v1/fill/w_1280,h_1000,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/aa834f_8add081e2af5447d80d53370cb4b7c81~mv2.png"
                    alt="Wellness & Spa"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[15px] font-mono text-black text-right transition-all duration-300 px-3 py-2 rounded-lg backdrop-blur-lg bg-white/30 border border-white/40 group-hover:border-[#B8860B] group-hover:shadow-[0_0_20px_rgba(184,134,11,0.6)] group-hover:bg-white/50 group-hover:scale-105">
                  <div className="font-semibold">WELLNESS & SPA</div>
                  <div className="text-xs mt-0.5 text-[#B8860B] transition-all">
                    Holistic Care
                  </div>
                </div>
                <svg width="75" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="75" y2="1" stroke="#000000" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#B8860B]" />
                  <circle cx="0" cy="1" r="3" fill="#000000" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#B8860B]" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content sections that flow around DNA - balanced spacing from center */}
        <div className="relative">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="min-h-screen flex items-center justify-center relative"
              style={{ scrollSnapAlign: 'center', paddingTop: '80px' }}
            >
              {/* Layout: text and image with 10% gap in center for DNA */}
              <div className="w-full flex items-center justify-between gap-[10%]">
                {section.side === 'left' ? (
                  <>
                    {/* Text on left - 40% width */}
                    <div className="w-[40%] h-full py-24 px-12 flex flex-col justify-end text-right">
                      {/* Section number */}
                      <div className="text-8xl font-serif text-black/10 mb-4 text-right">
                        0{index + 1}
                      </div>

                      {/* Content */}
                      <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight tracking-wide">
                          {section.title}
                        </h2>

                        <p className="text-2xl md:text-3xl font-serif italic text-[#8c734d]">
                          {section.subtitle}
                        </p>

                        <div className="w-24 h-1 bg-gradient-to-r from-[#B8860B] via-[#C9A342] to-[#B8860B] ml-auto shadow-[0_0_20px_rgba(184,134,11,0.6)]" />

                        <p className="text-lg text-black/80 leading-relaxed max-w-lg ml-auto">
                          {section.description}
                        </p>

                        <button
                          onClick={() => setActiveModal(section.id)}
                          className="mt-8 px-8 py-4 border-2 border-[#B8860B] text-[#B8860B] font-mono uppercase tracking-wider
                            hover:bg-[#B8860B] hover:text-black transition-all duration-300 ml-auto block shadow-[0_0_25px_rgba(184,134,11,0.5),0_0_50px_rgba(184,134,11,0.3)] hover:shadow-[0_0_35px_rgba(184,134,11,0.8),0_0_70px_rgba(184,134,11,0.5)]">
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Image on right - 40% width */}
                    <div className="w-[40%] h-full flex items-center justify-start py-24 px-12">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-visible transition-all duration-500 hover:scale-[1.03] group" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)' }}>
                        {/* Glow effect border on hover - behind everything */}
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#C9A342] to-[#B8860B] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 z-0" />
                        {/* Image container */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden z-10">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                        </div>
                        {/* Stat Cards - Small, overhanging the image borders */}
                        {section.stats && (
                          <>
                            {/* First stat card - top left, overhanging - CYAN */}
                            <div className="absolute -top-6 -left-6 backdrop-blur-xl bg-black/70 border-2 border-[#B8860B] rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(184,134,11,0.6),0_0_50px_rgba(184,134,11,0.3)] hover:shadow-[0_0_35px_rgba(184,134,11,0.8),0_0_70px_rgba(184,134,11,0.5)] transition-all duration-300 group z-20">
                              <div className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#C9A342] mb-0.5">
                                {section.stats[0].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-[#B8860B]/80">
                                {section.stats[0].label}
                              </div>
                            </div>

                            {/* Second stat card - bottom right, overhanging - PINK */}
                            <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-black/70 border-2 border-[#B8860B] rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(184,134,11,0.6),0_0_50px_rgba(184,134,11,0.3)] hover:shadow-[0_0_35px_rgba(184,134,11,0.8),0_0_70px_rgba(184,134,11,0.5)] transition-all duration-300 group z-20">
                              <div className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#C9A342] mb-0.5">
                                {section.stats[1].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-[#B8860B]/80">
                                {section.stats[1].label}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Image on left - 40% width */}
                    <div className="w-[40%] h-full flex items-center justify-end py-24 px-12">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-visible transition-all duration-500 hover:scale-[1.03] group" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)' }}>
                        {/* Glow effect border on hover - behind everything */}
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#C9A342] to-[#B8860B] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 z-0" />
                        {/* Image container */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden z-10">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                          />
                        </div>
                        {/* Stat Cards - Small, overhanging the image borders */}
                        {section.stats && (
                          <>
                            {/* First stat card - top left, overhanging - CYAN */}
                            <div className="absolute -top-6 -left-6 backdrop-blur-xl bg-black/70 border-2 border-[#B8860B] rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(184,134,11,0.6),0_0_50px_rgba(184,134,11,0.3)] hover:shadow-[0_0_35px_rgba(184,134,11,0.8),0_0_70px_rgba(184,134,11,0.5)] transition-all duration-300 group z-20">
                              <div className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#C9A342] mb-0.5">
                                {section.stats[0].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-[#B8860B]/80">
                                {section.stats[0].label}
                              </div>
                            </div>

                            {/* Second stat card - bottom right, overhanging - PINK */}
                            <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-black/70 border-2 border-[#B8860B] rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(184,134,11,0.6),0_0_50px_rgba(184,134,11,0.3)] hover:shadow-[0_0_35px_rgba(184,134,11,0.8),0_0_70px_rgba(184,134,11,0.5)] transition-all duration-300 group z-20">
                              <div className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#C9A342] mb-0.5">
                                {section.stats[1].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-[#B8860B]/80">
                                {section.stats[1].label}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Text on right - 40% width */}
                    <div className="w-[40%] h-full py-24 px-12 flex flex-col justify-start text-left">
                      {/* Section number */}
                      <div className="text-8xl font-serif text-black/10 mb-4 text-left">
                        0{index + 1}
                      </div>

                      {/* Content */}
                      <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight tracking-wide">
                          {section.title}
                        </h2>

                        <p className="text-2xl md:text-3xl font-serif italic text-[#8c734d]">
                          {section.subtitle}
                        </p>

                        <div className="w-24 h-1 bg-gradient-to-r from-[#B8860B] via-[#C9A342] to-[#B8860B] shadow-[0_0_20px_rgba(184,134,11,0.6)]" />

                        <p className="text-lg text-black/80 leading-relaxed max-w-lg">
                          {section.description}
                        </p>

                        <button
                          onClick={() => setActiveModal(section.id)}
                          className="mt-8 px-8 py-4 border-2 border-[#B8860B] text-[#B8860B] font-mono uppercase tracking-wider
                            hover:bg-[#B8860B] hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(184,134,11,0.5),0_0_50px_rgba(184,134,11,0.3)] hover:shadow-[0_0_35px_rgba(184,134,11,0.8),0_0_70px_rgba(184,134,11,0.5)]">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Spacer to allow footer to scroll into view after DNA locks */}
        <div style={{ height: '5vh' }}></div>

        {/* Logo Ticker - Partners & Affiliations */}
        <div className="relative overflow-hidden py-3 border-y-2 border-[#B8860B]" style={{
          background: 'rgba(30, 30, 30, 0.85)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="flex">
            <div className="ticker-track">
              {/* First set of logos */}
              <div className="flex items-center gap-20">
                {/* UFC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/UFC_Logo.png?v=1762450430"
                    alt="UFC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* ONE FC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/409fc7_c7cc32af653d4427a59d1ae30641d4e2_mv2_1.png?v=1762450429"
                    alt="ONE FC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* UFC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/UFC_Logo.png?v=1762450430"
                    alt="UFC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* ONE FC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/409fc7_c7cc32af653d4427a59d1ae30641d4e2_mv2_1.png?v=1762450429"
                    alt="ONE FC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* UFC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/UFC_Logo.png?v=1762450430"
                    alt="UFC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* ONE FC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/409fc7_c7cc32af653d4427a59d1ae30641d4e2_mv2_1.png?v=1762450429"
                    alt="ONE FC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* UFC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/UFC_Logo.png?v=1762450430"
                    alt="UFC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* ONE FC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/409fc7_c7cc32af653d4427a59d1ae30641d4e2_mv2_1.png?v=1762450429"
                    alt="ONE FC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center gap-20">
                {/* UFC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/UFC_Logo.png?v=1762450430"
                    alt="UFC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* ONE FC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/409fc7_c7cc32af653d4427a59d1ae30641d4e2_mv2_1.png?v=1762450429"
                    alt="ONE FC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* UFC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/UFC_Logo.png?v=1762450430"
                    alt="UFC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* ONE FC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/409fc7_c7cc32af653d4427a59d1ae30641d4e2_mv2_1.png?v=1762450429"
                    alt="ONE FC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* UFC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/UFC_Logo.png?v=1762450430"
                    alt="UFC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* ONE FC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/409fc7_c7cc32af653d4427a59d1ae30641d4e2_mv2_1.png?v=1762450429"
                    alt="ONE FC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* UFC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/UFC_Logo.png?v=1762450430"
                    alt="UFC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>

                {/* ONE FC Logo */}
                <div className="flex items-center justify-center px-6">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0951/6141/8067/files/409fc7_c7cc32af653d4427a59d1ae30641d4e2_mv2_1.png?v=1762450429"
                    alt="ONE FC"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Refined Design */}
        <footer className="relative border-t border-[#B8860B]/20" style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(245, 250, 255, 0.9) 100%)',
          backdropFilter: 'blur(20px)'
        }}>
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-12 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Left Column - Logo & Social */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="relative w-56 h-20 mb-6">
                    <Image
                      src="https://static.wixstatic.com/media/abb1e6_84c39a4abeea4e66ab7ad3a3d52ef0ca~mv2.png/v1/crop/x_0,y_0,w_4395,h_1596/fill/w_800,h_300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/Icellare_-Horizontal-Logo-01.png"
                      alt="ICELLARÉ"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <p className="text-black/60 text-sm font-sans mb-6">
                    Regenerative Medicine Lifespan Center
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/icellare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center hover:bg-[#B8860B]/20 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-[#B8860B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/icellare_phuket/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#B8860B]/10 flex items-center justify-center hover:bg-[#B8860B]/20 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-[#B8860B]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Middle Column - Links */}
              <div>
                <h3 className="text-[#B8860B] font-sans font-semibold text-base mb-4 uppercase tracking-wider">Navigate</h3>
                <div className="flex flex-col gap-3">
                  <a href="#team" className="text-black/70 hover:text-[#B8860B] transition-colors text-sm font-sans">Team</a>
                  <a href="#our-lab" className="text-black/70 hover:text-[#B8860B] transition-colors text-sm font-sans">Our Lab</a>
                  <a href="#facilities" className="text-black/70 hover:text-[#B8860B] transition-colors text-sm font-sans">Facilities</a>
                  <a href="#blog" className="text-black/70 hover:text-[#B8860B] transition-colors text-sm font-sans">Blog</a>
                  <a href="#contact" className="text-black/70 hover:text-[#B8860B] transition-colors text-sm font-sans">Contact</a>
                </div>
              </div>

              {/* Right Column - Locations */}
              <div>
                <h3 className="text-[#B8860B] font-sans font-semibold text-base mb-4 uppercase tracking-wider">Locations</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[#B8860B] font-semibold text-xs uppercase tracking-wide mb-2">Bangkok</p>
                    <p className="text-black/70 text-xs font-sans leading-relaxed">
                      102 Thanon Phutthamonthon Sai 1<br />
                      Bang Ramat, Taling Chan<br />
                      Bangkok 10170, Thailand<br />
                      <a href="tel:+66808565999" className="hover:text-[#B8860B] transition-colors mt-1 inline-block">+66 80 856 5999</a>
                    </p>
                  </div>
                  <div>
                    <p className="text-[#B8860B] font-semibold text-xs uppercase tracking-wide mb-2">Phuket</p>
                    <p className="text-black/70 text-xs font-sans leading-relaxed">
                      9 Komarapat Rd, Talat Yai<br />
                      Mueang Phuket District<br />
                      Phuket 83000, Thailand<br />
                      <a href="tel:+66617490434" className="hover:text-[#B8860B] transition-colors mt-1 inline-block">+66 61 749 0434</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#B8860B]/20 py-6">
            <div className="max-w-7xl mx-auto px-12">
              <p className="text-black/40 text-xs font-sans text-center">
                © 2024 ICELLARÉ Lifespan Center. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Service Detail Modal Overlays */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={() => setActiveModal(null)}
          >
            {/* Backdrop - dark with subtle gold tint */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" style={{
              background: 'radial-gradient(ellipse at center, rgba(184, 134, 11, 0.15) 0%, rgba(0, 0, 0, 0.85) 100%)'
            }} />

            {/* Modal Content */}
            <motion.div
              initial={{
                x: sections.find(s => s.id === activeModal)?.side === 'left' ? '100%' : '-100%'
              }}
              animate={{ x: 0 }}
              exit={{
                x: sections.find(s => s.id === activeModal)?.side === 'left' ? '100%' : '-100%'
              }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="relative w-full h-full overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 25, 47, 0.98) 0%, rgba(26, 42, 78, 0.98) 50%, rgba(10, 25, 47, 0.98) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 100px rgba(184, 134, 11, 0.1), inset 0 0 100px rgba(184, 134, 11, 0.03)',
                border: '1px solid rgba(184, 134, 11, 0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }} />
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="fixed top-8 right-8 z-[10000] w-14 h-14 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 group"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content Container - Scrollable */}
              <div className="min-h-full p-8 md:p-16 pt-24">
                <iframe
                  src={sections.find(s => s.id === activeModal)?.route}
                  className="w-full min-h-screen border-none rounded-lg"
                  title={sections.find(s => s.id === activeModal)?.title}
                  style={{ height: 'calc(100vh - 8rem)' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
