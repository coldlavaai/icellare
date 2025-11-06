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
      {/* No solid background - use transparent canvas - CYBERPUNK VERSION */}
      <fog attach="fog" args={['#0a0412', 20, 50]} />

      {/* Camera - centered on DNA, slightly elevated */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0.5, 28]}
        fov={50}
        near={0.1}
        far={1000}
      />

      {/* STEP 4: Lighting setup */}

      {/* Ambient light */}
      <ambientLight color={0x404060} intensity={0.2} />

      {/* Hemisphere light */}
      <hemisphereLight
        color={0x0066ff}
        groundColor={0x001133}
        intensity={0.4}
      />

      {/* Key light */}
      <directionalLight
        position={[10, 15, 10]}
        color={0xffffff}
        intensity={1.2}
      />

      {/* Fill light */}
      <directionalLight
        position={[-10, 5, -10]}
        color={0x6699ff}
        intensity={0.3}
      />

      {/* Rim light */}
      <directionalLight
        position={[0, 5, -15]}
        color={0x88ccff}
        intensity={0.8}
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

      {/* Post-processing */}
      <EffectComposer>
        {/* Bloom - subtle glow on highlights */}
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
          mipmapBlur
        />

        {/* Vignette - darker edges */}
        <Vignette
          offset={0.3}
          darkness={0.5}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
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

  useEffect(() => {
    const timeline = [
      { delay: 0, progress: 0 },      // Start
      { delay: 300, progress: 0.2 },  // Frame appears
      { delay: 800, progress: 0.5 },  // DNA starts growing
      { delay: 1800, progress: 0.7 }, // DNA fully grown
      { delay: 2200, progress: 0.8 }, // Labels appear
      { delay: 2800, progress: 1 },   // Branding appears
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
    }, 3500)
  }, [])

  // Track scroll position, velocity, and direction
  useEffect(() => {
    let lastTime = Date.now()

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0

      // Calculate velocity
      const now = Date.now()
      const deltaTime = now - lastTime
      const deltaScroll = Math.abs(scrollY - lastScrollY)
      const velocity = deltaTime > 0 ? deltaScroll / deltaTime : 0

      // Show/hide nav based on scroll direction
      if (scrollY < 50) {
        setShowTopNav(true) // Always show at top
      } else if (scrollY < lastScrollY) {
        setShowTopNav(true) // Scrolling up
      } else if (scrollY > lastScrollY) {
        setShowTopNav(false) // Scrolling down
      }

      setScrollProgress(progress)
      setScrollVelocity(velocity)
      setLastScrollY(scrollY)

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
      stats: [
        { value: '30+', label: 'Treatments' },
        { value: '98%', label: 'Satisfaction' }
      ]
    },
  ]

  return (
    <>
      {/* Loading Screen - CYBERPUNK SPACE VERSION */}
      {!isLoadingComplete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{
          background: 'radial-gradient(ellipse at 50% 20%, #1a0a2e 0%, #0f0624 25%, #0a0412 50%, #050208 75%, #000000 100%)'
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
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_20px_rgba(0,191,255,1),0_0_40px_rgba(0,191,255,0.5)]" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_20px_rgba(147,112,219,1),0_0_40px_rgba(147,112,219,0.5)]" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_20px_rgba(255,20,147,1),0_0_40px_rgba(255,20,147,0.5)]" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      {/* Fixed DNA Canvas Background - CYBERPUNK SPACE VERSION */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 800px 600px at 20% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 600px 800px at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 20%, #1a0a2e 0%, #0f0624 25%, #0a0412 50%, #050208 75%, #000000 100%)
        `
      }}>
        {/* 3D Canvas - transparent to show radial gradient */}
        <div className="absolute inset-0">
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance'
            }}
            style={{ background: 'transparent' }}
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
        {/* Top Navigation Bar - FIXED - SPACE NEON VERSION */}
        <motion.nav
          className="fixed top-0 z-50 w-full px-16 pt-4 pb-4"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 50px rgba(0, 191, 255, 0.6), 0 2px 80px rgba(0, 191, 255, 0.4)'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={isLoadingComplete && showTopNav ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center gap-6">
            {['Team', 'Our Lab', 'Facilities', 'Blog', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-mono text-cyan-400/80 hover:text-cyan-300 transition-colors duration-300 relative group pointer-events-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full shadow-[0_0_15px_rgba(0,191,255,0.8)]" />
              </motion.a>
            ))}
          </div>
        </motion.nav>

        {/* Hero section with logo and heading - FIXED */}
        <div className="h-screen fixed inset-0 z-30 flex flex-col items-center justify-start pointer-events-none" style={{ paddingTop: '60px' }}>
          {/* Logo at top with lots of space - DARK VERSION */}
          <motion.div
            className="relative z-10 mb-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Logo - high resolution - WHITE */}
            <div className="relative w-96 h-32">
              <Image
                src="https://static.wixstatic.com/media/abb1e6_84c39a4abeea4e66ab7ad3a3d52ef0ca~mv2.png/v1/crop/x_0,y_0,w_4395,h_1596/fill/w_800,h_300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/Icellare_-Horizontal-Logo-01.png"
                alt="ICELLARÉ Lifespan Center"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </motion.div>

          {/* TechnicalFrame with navigation - centered for DNA */}
          <div className="absolute inset-0">
            <TechnicalFrame
              isVisible={showFrame}
              loadingProgress={loadingProgress}
              onNavigate={(sectionId) => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            />
          </div>

          {/* Heading at bottom with lots of space - DARK VERSION */}
          <motion.div
            className="relative z-10 text-center mt-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ marginBottom: '80px' }}
          >
            <h1 className="text-3xl font-sans font-light text-white mb-1 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Regenerative Medicine
            </h1>
            <p className="text-lg font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_20px_rgba(0,191,255,0.8)]">
              Lifespan Center
            </p>
          </motion.div>
        </div>

        {/* Navigation labels around DNA - SCROLLS */}
        <div className="h-screen relative pointer-events-none">
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
                <div className="text-sm font-mono text-cyan-400/90 text-left transition-all duration-300 group-hover:text-cyan-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-cyan-400/30 group-hover:shadow-[0_0_30px_rgba(0,191,255,0.8),0_0_60px_rgba(0,191,255,0.4)]">
                  <div className="font-semibold">STEM CELL BANKING</div>
                  <div className="text-xs mt-0.5 opacity-60 group-hover:opacity-80 transition-opacity">
                    Preservation & Storage
                  </div>
                </div>
                <svg width="60" height="2" className="relative transition-opacity duration-300">
                  <line x1="0" y1="1" x2="60" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100" />
                  <circle cx="60" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100" />
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
                <div className="text-sm font-mono text-cyan-400/90 text-left transition-all duration-300 group-hover:text-cyan-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-cyan-400/30 group-hover:shadow-[0_0_30px_rgba(0,191,255,0.8),0_0_60px_rgba(0,191,255,0.4)]">
                  <div className="font-semibold">GENETIC TESTING</div>
                  <div className="text-xs mt-0.5 opacity-60 group-hover:opacity-80 transition-opacity">
                    DNA Analysis
                  </div>
                </div>
                <svg width="110" height="2" className="transition-opacity duration-300">
                  <line x1="0" y1="1" x2="110" y2="1" stroke="url(#neonGradient)" strokeWidth="2" opacity="0.7" strokeDasharray="4,4" className="group-hover:opacity-100" />
                  <circle cx="110" cy="1" r="3" fill="#06B6D4" opacity="0.8" className="group-hover:opacity-100" style={{ filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.8))' }} />
                  <defs><linearGradient id="neonGradient"><stop offset="0%" stopColor="#06B6D4"/><stop offset="50%" stopColor="#EC4899"/><stop offset="100%" stopColor="#A855F7"/></linearGradient></defs>
                </svg>
              </div>
            </motion.div>

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
                <div className="text-sm font-mono text-cyan-400/90 text-left transition-all duration-300 group-hover:text-cyan-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-cyan-400/30 group-hover:shadow-[0_0_30px_rgba(0,191,255,0.8),0_0_60px_rgba(0,191,255,0.4)]">
                  <div className="font-semibold">AESTHETICS</div>
                  <div className="text-xs mt-0.5 opacity-60 group-hover:opacity-80 transition-opacity">
                    Beauty Treatments
                  </div>
                </div>
                <svg width="95" height="2" className="transition-opacity duration-300">
                  <line x1="0" y1="1" x2="95" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100" />
                  <circle cx="95" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100" />
                </svg>
              </div>
            </motion.div>

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
                <div className="text-sm font-mono text-pink-400/90 text-right transition-all duration-300 group-hover:text-pink-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-pink-500/30 group-hover:shadow-[0_0_30px_rgba(255,20,147,0.8),0_0_60px_rgba(255,20,147,0.4)]">
                  <div className="font-semibold">STEM CELL TECHNOLOGY</div>
                  <div className="text-xs mt-0.5 opacity-60 group-hover:opacity-80 transition-opacity">
                    Advanced Therapies
                  </div>
                </div>
                <svg width="55" height="2" className="transition-opacity duration-300">
                  <line x1="0" y1="1" x2="55" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100" />
                  <circle cx="0" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100" />
                </svg>
              </div>
            </motion.div>

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
                <div className="text-sm font-mono text-purple-400/90 text-right transition-all duration-300 group-hover:text-purple-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(147,112,219,0.8),0_0_60px_rgba(147,112,219,0.4)]">
                  <div className="font-semibold">VITAMIN IV THERAPY</div>
                  <div className="text-xs mt-0.5 opacity-60 group-hover:opacity-80 transition-opacity">
                    Infusion Optimization
                  </div>
                </div>
                <svg width="100" height="2" className="transition-opacity duration-300">
                  <line x1="0" y1="1" x2="100" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100" />
                  <circle cx="0" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100" />
                </svg>
              </div>
            </motion.div>

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
                <div className="text-sm font-mono text-pink-400/90 text-right transition-all duration-300 group-hover:text-pink-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border border-pink-500/30 group-hover:shadow-[0_0_30px_rgba(255,20,147,0.8),0_0_60px_rgba(255,20,147,0.4)]">
                  <div className="font-semibold">WELLNESS & SPA</div>
                  <div className="text-xs mt-0.5 opacity-60 group-hover:opacity-80 transition-opacity">
                    Holistic Care
                  </div>
                </div>
                <svg width="75" height="2" className="transition-opacity duration-300">
                  <line x1="0" y1="1" x2="75" y2="1" stroke="#22D3EE" strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100" />
                  <circle cx="0" cy="1" r="3" fill="#22D3EE" opacity="0.6" className="group-hover:opacity-100" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Smooth scroll-based color overlay - behind DNA - CYBERPUNK */}
        <div
          className="fixed inset-0 pointer-events-none transition-colors duration-1000 ease-out"
          style={{
            zIndex: 5,
            background: `linear-gradient(to bottom,
              rgba(26, 10, 46, ${Math.max(0, 0.2 - scrollProgress * 0.2)}) 0%,
              rgba(6, 182, 212, ${scrollProgress * 0.05}) 30%,
              rgba(236, 72, 153, ${scrollProgress * 0.03}) 70%,
              rgba(0, 0, 0, ${scrollProgress * 0.2}) 100%)`
          }}
        />

        {/* Content sections that flow around DNA - balanced spacing from center */}
        <div className="relative">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="min-h-screen flex items-center justify-center relative"
              style={{ scrollSnapAlign: 'center' }}
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

                        <p className="text-2xl md:text-3xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-orange-500 to-amber-500">
                          {section.subtitle}
                        </p>

                        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 via-orange-500 to-amber-500 ml-auto shadow-[0_0_20px_rgba(20,184,166,0.6)]" />

                        <p className="text-lg text-white/80 leading-relaxed max-w-lg ml-auto">
                          Experience cutting-edge regenerative medicine with personalized treatment protocols
                          designed for your unique biological profile. Our advanced facilities combine
                          scientific precision with compassionate care.
                        </p>

                        <button className="mt-8 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-mono uppercase tracking-wider
                          hover:bg-cyan-400 hover:text-black transition-all duration-300 ml-auto block shadow-[0_0_25px_rgba(0,191,255,0.5),0_0_50px_rgba(0,191,255,0.3)] hover:shadow-[0_0_35px_rgba(0,191,255,0.8),0_0_70px_rgba(0,191,255,0.5)]">
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Image on right - 40% width */}
                    <div className="w-[40%] h-full flex items-center justify-start py-24 px-12">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-visible transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)' }}>
                        <div className="absolute inset-0 rounded-xl overflow-hidden">
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
                            <div className="absolute -top-6 -left-6 backdrop-blur-xl bg-black/70 border-2 border-cyan-400 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(0,191,255,0.6),0_0_50px_rgba(0,191,255,0.3)] hover:shadow-[0_0_35px_rgba(0,191,255,0.8),0_0_70px_rgba(0,191,255,0.5)] transition-all duration-300 group z-10">
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 mb-0.5">
                                {section.stats[0].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80">
                                {section.stats[0].label}
                              </div>
                            </div>

                            {/* Second stat card - bottom right, overhanging - PINK */}
                            <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-black/70 border-2 border-pink-500 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(255,20,147,0.6),0_0_50px_rgba(255,20,147,0.3)] hover:shadow-[0_0_35px_rgba(255,20,147,0.8),0_0_70px_rgba(255,20,147,0.5)] transition-all duration-300 group z-10">
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
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-visible transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)' }}>
                        <div className="absolute inset-0 rounded-xl overflow-hidden">
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
                            <div className="absolute -top-6 -left-6 backdrop-blur-xl bg-black/70 border-2 border-cyan-400 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(0,191,255,0.6),0_0_50px_rgba(0,191,255,0.3)] hover:shadow-[0_0_35px_rgba(0,191,255,0.8),0_0_70px_rgba(0,191,255,0.5)] transition-all duration-300 group z-10">
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 mb-0.5">
                                {section.stats[0].value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80">
                                {section.stats[0].label}
                              </div>
                            </div>

                            {/* Second stat card - bottom right, overhanging - PINK */}
                            <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-black/70 border-2 border-pink-500 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(255,20,147,0.6),0_0_50px_rgba(255,20,147,0.3)] hover:shadow-[0_0_35px_rgba(255,20,147,0.8),0_0_70px_rgba(255,20,147,0.5)] transition-all duration-300 group z-10">
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

                        <p className="text-2xl md:text-3xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-orange-500 to-amber-500">
                          {section.subtitle}
                        </p>

                        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 via-orange-500 to-amber-500 shadow-[0_0_20px_rgba(20,184,166,0.6)]" />

                        <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                          Experience cutting-edge regenerative medicine with personalized treatment protocols
                          designed for your unique biological profile. Our advanced facilities combine
                          scientific precision with compassionate care.
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
              <a href="#team" className="text-teal-400/70 hover:text-teal-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.8)]">Team</a>
              <a href="#our-lab" className="text-teal-400/70 hover:text-teal-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.8)]">Our Lab</a>
              <a href="#facilities" className="text-teal-400/70 hover:text-teal-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.8)]">Facilities</a>
              <a href="#blog" className="text-teal-400/70 hover:text-teal-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.8)]">Blog</a>
              <a href="#contact" className="text-teal-400/70 hover:text-teal-300 transition-all text-sm font-mono uppercase hover:drop-shadow-[0_0_10px_rgba(20,184,166,0.8)]">Contact</a>
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
