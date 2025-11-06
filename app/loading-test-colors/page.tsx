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
import { motion } from 'framer-motion'

function Scene({ growthProgress, enableGrowth, showParticles, scrollProgress }: { growthProgress: number; enableGrowth: boolean; showParticles: boolean; scrollProgress: number }) {
  return (
    <>
      {/* Camera - centered on DNA, slightly elevated */}
      <PerspectiveCamera
        makeDefault
        position={[0, 1.5, 28]}
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

  // Track scroll position, velocity, and direction
  useEffect(() => {
    let lastTime = Date.now()

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0

      // Calculate which section is active
      const viewportHeight = window.innerHeight
      const heroHeight = viewportHeight

      if (currentScrollY < heroHeight * 0.5) {
        setActiveSectionIndex(-1) // Hero
      } else {
        // Calculate section index (0-5)
        const sectionIndex = Math.floor((currentScrollY - heroHeight * 0.5) / viewportHeight)
        setActiveSectionIndex(Math.min(sectionIndex, 5)) // Max 5 (6 sections)
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
            #00BFFF 0%,
            #9370DB 20%,
            #FF1493 40%,
            #9370DB 60%,
            #00BFFF 80%,
            #9370DB 100%
          );
          background-size: 300% 100%;
          animation: rainbow-shift 8s linear infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Loading Screen */}
      {!isLoadingComplete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 50%, rgba(235, 245, 255, 1) 0%, rgba(200, 220, 240, 1) 40%, rgba(160, 190, 220, 1) 100%)'
        }}>
          <div className="text-center">
            <div className="relative w-96 h-32 mb-8">
              <Image
                src="https://static.wixstatic.com/media/abb1e6_84c39a4abeea4e66ab7ad3a3d52ef0ca~mv2.png/v1/crop/x_0,y_0,w_4395,h_1596/fill/w_800,h_300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/Icellare_-Horizontal-Logo-01.png"
                alt="ICELLARÉ"
                fill
                className="object-contain brightness-0 invert"
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
        background: 'radial-gradient(ellipse 120% 100% at 50% 50%, rgba(235, 245, 255, 1) 0%, rgba(200, 220, 240, 1) 40%, rgba(160, 190, 220, 1) 100%)'
      }} />

      {/* LAYER 2: DNA Canvas - MIDDLE LAYER */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 10
      }}>
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

        {/* Scroll Progress Bars - Full Border */}
        {/* Top */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
          style={{
            background: 'linear-gradient(90deg, #00BFFF 0%, #9370DB 50%, #FF1493 100%)',
            scaleX: scrollProgress,
            boxShadow: '0 0 10px rgba(0, 191, 255, 0.8), 0 0 20px rgba(255, 20, 147, 0.4)'
          }}
          initial={{ opacity: 0 }}
          animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Right */}
        <motion.div
          className="fixed top-0 right-0 bottom-0 w-[2px] z-[60] origin-top"
          style={{
            background: 'linear-gradient(180deg, #00BFFF 0%, #9370DB 50%, #FF1493 100%)',
            scaleY: scrollProgress,
            boxShadow: '0 0 10px rgba(0, 191, 255, 0.8), 0 0 20px rgba(255, 20, 147, 0.4)'
          }}
          initial={{ opacity: 0 }}
          animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Bottom - fills right to left */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-[2px] z-[60] origin-right"
          style={{
            background: 'linear-gradient(90deg, #FF1493 0%, #9370DB 50%, #00BFFF 100%)',
            scaleX: scrollProgress,
            boxShadow: '0 0 10px rgba(0, 191, 255, 0.8), 0 0 20px rgba(255, 20, 147, 0.4)'
          }}
          initial={{ opacity: 0 }}
          animate={isLoadingComplete ? { opacity: 1 } : { opacity: 0 }}
        />

        {/* Left - fills bottom to top */}
        <motion.div
          className="fixed top-0 left-0 bottom-0 w-[2px] z-[60] origin-bottom"
          style={{
            background: 'linear-gradient(180deg, #FF1493 0%, #9370DB 50%, #00BFFF 100%)',
            scaleY: scrollProgress,
            boxShadow: '0 0 10px rgba(0, 191, 255, 0.8), 0 0 20px rgba(255, 20, 147, 0.4)'
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
          <div className="flex items-center justify-center gap-12">
            {['Team', 'Our Lab', 'Facilities', 'Blog', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[13px] font-sans tracking-wider text-white/50 hover:text-white transition-all duration-300 relative group pointer-events-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <span className="relative z-10">{item}</span>
                {/* Glow effect on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                {/* Underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* Hero section with logo and heading - SCROLLS WITH PAGE */}
        <div className="h-screen absolute inset-0 z-30 flex flex-col items-center justify-start pointer-events-none" style={{ paddingTop: '100px' }}>
          {/* Full logo - original, always present */}
          <motion.div
            className="relative z-10 mb-auto cursor-pointer pointer-events-auto group"
            initial={{ opacity: 0, y: -30 }}
            animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-[450px] h-36 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_40px_rgba(0,191,255,1)_0_0_80px_rgba(0,191,255,0.8)_0_0_120px_rgba(0,191,255,0.6)]">
              <Image
                src="https://static.wixstatic.com/media/abb1e6_84c39a4abeea4e66ab7ad3a3d52ef0ca~mv2.png/v1/crop/x_0,y_0,w_4395,h_1596/fill/w_800,h_300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/Icellare_-Horizontal-Logo-01.png"
                alt="ICELLARÉ Lifespan Center"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </motion.div>

          {/* Top-right full logo - fade directly with scroll (no delay) */}
          <motion.div
            className="fixed top-5 right-5 cursor-pointer pointer-events-auto group z-50"
            animate={{ opacity: Math.min(1, Math.max(0, (scrollProgress - 0.02) * 10)) }}
            transition={{ duration: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-48 h-16 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_40px_rgba(0,191,255,1)_0_0_80px_rgba(0,191,255,0.8)_0_0_120px_rgba(0,191,255,0.6)]">
              <Image
                src="https://static.wixstatic.com/media/abb1e6_84c39a4abeea4e66ab7ad3a3d52ef0ca~mv2.png/v1/crop/x_0,y_0,w_4395,h_1596/fill/w_800,h_300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/Icellare_-Horizontal-Logo-01.png"
                alt="ICELLARÉ"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </motion.div>

          {/* Spacer to push DNA and content down */}
          <div style={{ height: '60px' }}></div>

          {/* TechnicalFrame with navigation - centered for DNA */}
          <div className="absolute inset-0" style={{ top: '60px' }}>
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
          className="fixed bottom-5 left-0 right-0 z-30 text-center pointer-events-none"
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
          <h1 className="text-2xl font-sans font-light text-white mb-1 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            Regenerative Medicine
          </h1>
          <p className="text-xl md:text-2xl font-sans font-light rainbow-text">
            Lifespan Center
          </p>
        </motion.div>

        {/* Navigation labels around DNA - SCROLLS */}
        <div className="h-screen relative pointer-events-none" style={{ marginTop: '-40px' }}>
          <div className="absolute inset-0">
            {/* Navigation labels positioned around DNA */}
            <motion.div
              className="absolute left-[22%] top-[28%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete && loadingProgress > 0.7 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => {
                document.getElementById('stem-cell-banking')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 transition-all duration-300">
                <div className="text-[15px] font-mono text-cyan-400/90 text-left transition-all duration-300 group-hover:text-blue-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-cyan-400/30 group-hover:border-blue-500/70 group-hover:shadow-[0_0_30px_rgba(10,32,80,0.9),0_0_60px_rgba(59,130,246,0.6)] group-hover:bg-blue-900/20">
                  <div className="font-semibold">STEM CELL BANKING</div>
                  <div className="text-xs mt-0.5 text-white/90 group-hover:text-white transition-all">
                    Preservation & Storage
                  </div>
                </div>
                <svg width="60" height="2" className="relative transition-all duration-300">
                  <line x1="0" y1="1" x2="60" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#3B82F6]" />
                  <circle cx="60" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#3B82F6]" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              className="absolute left-[20%] top-[46%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete && loadingProgress > 0.75 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => {
                document.getElementById('genetic-testing')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 transition-all duration-300">
                <div className="text-[15px] font-mono text-cyan-400/90 text-left transition-all duration-300 group-hover:text-pink-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-cyan-400/30 group-hover:border-pink-500/70 group-hover:shadow-[0_0_30px_rgba(100,30,80,0.9),0_0_60px_rgba(236,72,153,0.6)] group-hover:bg-pink-900/20">
                  <div className="font-semibold">GENETIC TESTING</div>
                  <div className="text-xs mt-0.5 text-white/90 group-hover:text-white transition-all">
                    DNA Analysis
                  </div>
                </div>
                <svg width="110" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="110" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#EC4899]" />
                  <circle cx="110" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#EC4899]" />
                </svg>
              </div>
            </motion.div>

            {/* Left side label 3 */}
            <motion.div
              className="absolute left-[19%] bottom-[30%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={isLoadingComplete && loadingProgress > 0.8 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => {
                document.getElementById('aesthetics')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 transition-all duration-300">
                <div className="text-[15px] font-mono text-cyan-400/90 text-left transition-all duration-300 group-hover:text-purple-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-cyan-400/30 group-hover:border-purple-500/70 group-hover:shadow-[0_0_30px_rgba(90,10,80,0.9),0_0_60px_rgba(168,85,247,0.6)] group-hover:bg-purple-900/20">
                  <div className="font-semibold">AESTHETICS</div>
                  <div className="text-xs mt-0.5 text-white/90 group-hover:text-white transition-all">
                    Beauty Treatments
                  </div>
                </div>
                <svg width="95" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="95" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#A855F7]" />
                  <circle cx="95" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#A855F7]" />
                </svg>
              </div>
            </motion.div>

            {/* Right side label 1 */}
            <motion.div
              className="absolute right-[21%] top-[31%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: 20 }}
              animate={isLoadingComplete && loadingProgress > 0.7 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              onClick={() => {
                document.getElementById('stem-cell-technology')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 flex-row-reverse transition-all duration-300">
                <div className="text-[15px] font-mono text-cyan-400/90 text-right transition-all duration-300 group-hover:text-cyan-200 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-cyan-400/30 group-hover:border-cyan-400/70 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.9),0_0_60px_rgba(34,211,238,0.6)] group-hover:bg-cyan-900/20">
                  <div className="font-semibold">STEM CELL TECHNOLOGY</div>
                  <div className="text-xs mt-0.5 text-white/90 group-hover:text-white transition-all">
                    Advanced Therapies
                  </div>
                </div>
                <svg width="55" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="55" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#22D3EE]" />
                  <circle cx="0" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#22D3EE]" />
                </svg>
              </div>
            </motion.div>

            {/* Right side label 2 */}
            <motion.div
              className="absolute right-[18%] top-[53%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: 20 }}
              animate={isLoadingComplete && loadingProgress > 0.75 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              onClick={() => {
                document.getElementById('vitamin-iv-therapy')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 flex-row-reverse transition-all duration-300">
                <div className="text-[15px] font-mono text-cyan-400/90 text-right transition-all duration-300 group-hover:text-red-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-cyan-400/30 group-hover:border-red-500/70 group-hover:shadow-[0_0_30px_rgba(138,20,48,0.9),0_0_60px_rgba(239,68,68,0.6)] group-hover:bg-red-900/20">
                  <div className="font-semibold">VITAMIN IV THERAPY</div>
                  <div className="text-xs mt-0.5 text-white/90 group-hover:text-white transition-all">
                    Infusion Optimization
                  </div>
                </div>
                <svg width="100" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="100" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#EF4444]" />
                  <circle cx="0" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#EF4444]" />
                </svg>
              </div>
            </motion.div>

            {/* Right side label 3 */}
            <motion.div
              className="absolute right-[23%] bottom-[24%] pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, x: 20 }}
              animate={isLoadingComplete && loadingProgress > 0.8 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              onClick={() => {
                document.getElementById('wellness-spa')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="flex items-center gap-2 flex-row-reverse transition-all duration-300">
                <div className="text-[15px] font-mono text-cyan-400/90 text-right transition-all duration-300 group-hover:text-purple-200 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-cyan-400/30 group-hover:border-purple-600/70 group-hover:shadow-[0_0_30px_rgba(60,10,90,0.9),0_0_60px_rgba(109,40,217,0.6)] group-hover:bg-purple-950/30">
                  <div className="font-semibold">WELLNESS & SPA</div>
                  <div className="text-xs mt-0.5 text-white/90 group-hover:text-white transition-all">
                    Holistic Care
                  </div>
                </div>
                <svg width="75" height="2" className="transition-all duration-300">
                  <line x1="0" y1="1" x2="75" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100 transition-all duration-300 group-hover:[stroke:#6D28D9]" />
                  <circle cx="0" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100 transition-all duration-300 group-hover:[fill:#6D28D9]" />
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
                      <div className="text-8xl font-serif text-white/10 mb-4 text-right">
                        0{index + 1}
                      </div>

                      {/* Content */}
                      <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-sans font-light text-white leading-tight tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          {section.title}
                        </h2>

                        <p className="text-2xl md:text-3xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                          {section.subtitle}
                        </p>

                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 ml-auto shadow-[0_0_20px_rgba(0,191,255,0.6)]" />

                        <p className="text-lg text-white/80 leading-relaxed max-w-lg ml-auto">
                          {section.description}
                        </p>

                        <button className="mt-8 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-mono uppercase tracking-wider
                          hover:bg-cyan-400 hover:text-black transition-all duration-300 ml-auto block shadow-[0_0_25px_rgba(0,191,255,0.5),0_0_50px_rgba(0,191,255,0.3)] hover:shadow-[0_0_35px_rgba(0,191,255,0.8),0_0_70px_rgba(0,191,255,0.5)]">
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Image on right - 40% width */}
                    <div className="w-[40%] h-full flex items-center justify-start py-24 px-12">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-visible transition-all duration-500 hover:scale-[1.03] group" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)' }}>
                        {/* Glow effect border on hover - behind everything */}
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 z-0" />
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
                            <div className="absolute -top-6 -left-6 backdrop-blur-xl bg-black/70 border-2 border-cyan-400 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(0,191,255,0.6),0_0_50px_rgba(0,191,255,0.3)] hover:shadow-[0_0_35px_rgba(0,191,255,0.8),0_0_70px_rgba(0,191,255,0.5)] transition-all duration-300 group z-20">
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 mb-0.5">
                                {section.stats[0].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80">
                                {section.stats[0].label}
                              </div>
                            </div>

                            {/* Second stat card - bottom right, overhanging - PINK */}
                            <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-black/70 border-2 border-pink-500 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(255,20,147,0.6),0_0_50px_rgba(255,20,147,0.3)] hover:shadow-[0_0_35px_rgba(255,20,147,0.8),0_0_70px_rgba(255,20,147,0.5)] transition-all duration-300 group z-20">
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400 mb-0.5">
                                {section.stats[1].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-pink-400/80">
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
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 z-0" />
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
                            <div className="absolute -top-6 -left-6 backdrop-blur-xl bg-black/70 border-2 border-cyan-400 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(0,191,255,0.6),0_0_50px_rgba(0,191,255,0.3)] hover:shadow-[0_0_35px_rgba(0,191,255,0.8),0_0_70px_rgba(0,191,255,0.5)] transition-all duration-300 group z-20">
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 mb-0.5">
                                {section.stats[0].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80">
                                {section.stats[0].label}
                              </div>
                            </div>

                            {/* Second stat card - bottom right, overhanging - PINK */}
                            <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-black/70 border-2 border-pink-500 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(255,20,147,0.6),0_0_50px_rgba(255,20,147,0.3)] hover:shadow-[0_0_35px_rgba(255,20,147,0.8),0_0_70px_rgba(255,20,147,0.5)] transition-all duration-300 group z-20">
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-400 mb-0.5">
                                {section.stats[1].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-pink-400/80">
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
                      <div className="text-8xl font-serif text-white/10 mb-4 text-left">
                        0{index + 1}
                      </div>

                      {/* Content */}
                      <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-sans font-light text-white leading-tight tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          {section.title}
                        </h2>

                        <p className="text-2xl md:text-3xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                          {section.subtitle}
                        </p>

                        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(0,191,255,0.6)]" />

                        <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                          {section.description}
                        </p>

                        <button className="mt-8 px-8 py-4 border-2 border-pink-500 text-pink-500 font-mono uppercase tracking-wider
                          hover:bg-pink-500 hover:text-black transition-all duration-300 shadow-[0_0_25px_rgba(255,20,147,0.5),0_0_50px_rgba(255,20,147,0.3)] hover:shadow-[0_0_35px_rgba(255,20,147,0.8),0_0_70px_rgba(255,20,147,0.5)]">
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

        {/* Footer - SPACE NEON VERSION */}
        <footer className="relative py-16 text-center border-t border-cyan-400/30" style={{
          background: 'linear-gradient(to bottom, #0a0412 0%, #1a0a2e 50%, #0f0624 100%)'
        }}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex justify-center items-center gap-8 mb-8">
              <a href="#team" className="text-cyan-400/70 hover:text-cyan-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">Team</a>
              <a href="#our-lab" className="text-cyan-400/70 hover:text-cyan-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">Our Lab</a>
              <a href="#facilities" className="text-cyan-400/70 hover:text-cyan-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">Facilities</a>
              <a href="#blog" className="text-cyan-400/70 hover:text-cyan-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">Blog</a>
              <a href="#contact" className="text-cyan-400/70 hover:text-cyan-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]">Contact</a>
            </div>
            <p className="text-white/30 text-sm">
              © 2024 ICELLARÉ Lifespan Center. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
