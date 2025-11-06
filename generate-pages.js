const fs = require('fs');
const path = require('path');

// Colorway UI configurations
const colorways = [
  { name: 'cyber-magenta', displayName: 'Cyber Magenta', primary: '#FF0080', secondary: '#00FFFF', accent: '#BF00FF', gradient: 'from-pink-500 via-cyan-400 to-purple-500', background: '#1a0020' },
  { name: 'aurora-borealis', displayName: 'Aurora Borealis', primary: '#14B8A6', secondary: '#8B5CF6', accent: '#EC4899', gradient: 'from-teal-500 via-violet-500 to-pink-500', background: '#0a1420' },
  { name: 'toxic-neon', displayName: 'Toxic Neon', primary: '#EC4899', secondary: '#3B82F6', accent: '#F97316', gradient: 'from-pink-500 via-blue-500 to-orange-500', background: '#1a1a1a' },
  { name: 'royal-sunset', displayName: 'Royal Sunset', primary: '#FFD700', secondary: '#F43F5E', accent: '#F59E0B', gradient: 'from-yellow-400 via-rose-500 to-amber-500', background: '#1a0a2e' },
  { name: 'electric-ocean', displayName: 'Electric Ocean', primary: '#06B6D4', secondary: '#FF6B9D', accent: '#8B5CF6', gradient: 'from-cyan-500 via-pink-400 to-violet-500', background: '#0a1420' },
  { name: 'volcanic-fire', displayName: 'Volcanic Fire', primary: '#FF4500', secondary: '#DC2626', accent: '#FFD700', gradient: 'from-orange-600 via-red-600 to-yellow-400', background: '#0a0000' },
  { name: 'cosmic-rave', displayName: 'Cosmic Rave', primary: '#A855F7', secondary: '#00FFFF', accent: '#FF0080', gradient: 'from-purple-500 via-cyan-400 to-pink-500', background: '#000000' },
  { name: 'neon-tokyo', displayName: 'Neon Tokyo', primary: '#FF0080', secondary: '#00FFFF', accent: '#FFFF00', gradient: 'from-pink-500 via-cyan-400 to-yellow-400', background: '#1a1a1a' },
  { name: 'plasma-storm', displayName: 'Plasma Storm', primary: '#3B82F6', secondary: '#EC4899', accent: '#F97316', gradient: 'from-blue-500 via-pink-500 to-orange-500', background: '#0a0a2e' },
  { name: 'galaxy-core', displayName: 'Galaxy Core', primary: '#8B5CF6', secondary: '#14B8A6', accent: '#F43F5E', gradient: 'from-violet-500 via-teal-500 to-rose-500', background: '#000000' },
  { name: 'digital-dream', displayName: 'Digital Dream', primary: '#00FFFF', secondary: '#FF00FF', accent: '#FFFF00', gradient: 'from-cyan-400 via-fuchsia-500 to-yellow-400', background: '#0a0a1a' },
  { name: 'acid-fusion', displayName: 'Acid Fusion', primary: '#FF0080', secondary: '#3B82F6', accent: '#F97316', gradient: 'from-pink-500 via-blue-500 to-orange-500', background: '#1a1a1a' },
  { name: 'infrared-pulse', displayName: 'Infrared Pulse', primary: '#FF0000', secondary: '#3B82F6', accent: '#FF0080', gradient: 'from-red-600 via-blue-500 to-pink-500', background: '#0a0000' },
  { name: 'hologram-matrix', displayName: 'Hologram Matrix', primary: '#00FFFF', secondary: '#FF00FF', accent: '#FFFF00', gradient: 'from-cyan-400 via-fuchsia-500 to-yellow-400', background: '#0a0a0a' },
  { name: 'neon-jungle', displayName: 'Neon Jungle', primary: '#A855F7', secondary: '#F97316', accent: '#06B6D4', gradient: 'from-purple-500 via-orange-500 to-cyan-500', background: '#000000' },
];

function generatePageComponent(colorway) {
  const { name, displayName, primary, secondary, accent, gradient, background } = colorway;

  // Convert hex to rgba for glow effects
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return `'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { ArchitecturalDNA } from './components/ArchitecturalDNA'
import { TechnicalFrame } from '@/components/TechnicalFrame'
import { SimpleParticles } from '@/components/SimpleParticles'
import Image from 'next/image'
import { motion } from 'framer-motion'

function Scene({ growthProgress, enableGrowth, showParticles, scrollProgress }: { growthProgress: number; enableGrowth: boolean; showParticles: boolean; scrollProgress: number }) {
  return (
    <>
      <fog attach="fog" args={['${background}', 20, 50]} />

      <PerspectiveCamera
        makeDefault
        position={[0, 0.5, 28]}
        fov={50}
        near={0.1}
        far={1000}
      />

      <ambientLight color={0x404060} intensity={0.2} />
      <hemisphereLight color={0x0066ff} groundColor={0x001133} intensity={0.4} />
      <directionalLight position={[10, 15, 10]} color={0xffffff} intensity={1.2} />
      <directionalLight position={[-10, 5, -10]} color={0x6699ff} intensity={0.3} />
      <directionalLight position={[0, 5, -15]} color={0x88ccff} intensity={0.8} />

      <Environment preset="apartment" />

      <ArchitecturalDNA
        growthProgress={growthProgress}
        enableGrowth={enableGrowth}
        scrollProgress={scrollProgress}
      />

      {showParticles && <SimpleParticles />}

      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.9} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette offset={0.3} darkness={0.5} eskil={false} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  )
}

export default function LoadingTest() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoadingComplete, setIsLoadingComplete] = useState(false)
  const [showFrame, setShowFrame] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showTopNav, setShowTopNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const timeline = [
      { delay: 0, progress: 0 },
      { delay: 300, progress: 0.2 },
      { delay: 800, progress: 0.5 },
      { delay: 1800, progress: 0.7 },
      { delay: 2200, progress: 0.8 },
      { delay: 2800, progress: 1 },
    ]

    timeline.forEach(({ delay, progress }) => {
      setTimeout(() => setLoadingProgress(progress), delay)
    })

    setTimeout(() => setIsLoadingComplete(true), 3500)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0

      if (scrollY < 50) {
        setShowTopNav(true)
      } else if (scrollY < lastScrollY) {
        setShowTopNav(true)
      } else if (scrollY > lastScrollY) {
        setShowTopNav(false)
      }

      setScrollProgress(progress)
      setLastScrollY(scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const dnaGrowthProgress = loadingProgress < 0.5 ? 0 : Math.min((loadingProgress - 0.5) / 0.2, 1)

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
              <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_20px_${hexToRgba(primary, 1)},0_0_40px_${hexToRgba(primary, 0.5)}]" style={{ backgroundColor: '${primary}', animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_20px_${hexToRgba(secondary, 1)},0_0_40px_${hexToRgba(secondary, 0.5)}]" style={{ backgroundColor: '${secondary}', animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_20px_${hexToRgba(accent, 1)},0_0_40px_${hexToRgba(accent, 0.5)}]" style={{ backgroundColor: '${accent}', animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none" style={{
        background: \`radial-gradient(ellipse 800px 600px at 20% 30%, ${hexToRgba(primary, 0.15)} 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, ${hexToRgba(secondary, 0.1)} 0%, transparent 50%), radial-gradient(ellipse at 50% 20%, #1a0a2e 0%, #0f0624 25%, #0a0412 50%, #050208 75%, #000000 100%)\`
      }}>
        <div className="absolute inset-0">
          <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} style={{ background: 'transparent' }}>
            <Suspense fallback={null}>
              <Scene growthProgress={dnaGrowthProgress} enableGrowth={!isLoadingComplete} showParticles={isLoadingComplete} scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className="relative">
        <motion.nav
          className="fixed top-0 z-50 w-full px-16 pt-4 pb-4"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 50px ${hexToRgba(primary, 0.6)}, 0 2px 80px ${hexToRgba(primary, 0.4)}'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={isLoadingComplete && showTopNav ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center gap-6">
            {['Team', 'Our Lab', 'Facilities', 'Blog', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={\`#\${item.toLowerCase().replace(' ', '-')}\`}
                className="text-sm font-mono transition-colors duration-300 relative group pointer-events-auto"
                style={{ color: '${hexToRgba(primary, 0.8)}' }}
                initial={{ opacity: 0, y: -10 }}
                animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r ${gradient} transition-all duration-300 group-hover:w-full shadow-[0_0_15px_${hexToRgba(primary, 0.8)}]" />
              </motion.a>
            ))}
          </div>
        </motion.nav>

        <div className="h-screen fixed inset-0 z-30 flex flex-col items-center justify-start pointer-events-none" style={{ paddingTop: '60px' }}>
          <motion.div className="relative z-10 mb-auto" initial={{ opacity: 0, y: -30 }} animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
            <div className="relative w-96 h-32">
              <Image src="https://static.wixstatic.com/media/abb1e6_84c39a4abeea4e66ab7ad3a3d52ef0ca~mv2.png/v1/crop/x_0,y_0,w_4395,h_1596/fill/w_800,h_300,al_c,q_95,usm_0.66_1.00_0.01,enc_auto/Icellare_-Horizontal-Logo-01.png" alt="ICELLARÉ Lifespan Center" fill className="object-contain brightness-0 invert" priority />
            </div>
          </motion.div>

          <div className="absolute inset-0">
            <TechnicalFrame isVisible={showFrame} loadingProgress={loadingProgress} onNavigate={(sectionId) => { document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} />
          </div>

          <motion.div className="relative z-10 text-center mt-auto" initial={{ opacity: 0, y: 30 }} animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.7 }} style={{ marginBottom: '80px' }}>
            <h1 className="text-3xl font-sans font-light text-white mb-1 tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">Regenerative Medicine</h1>
            <p className="text-lg font-sans font-light text-transparent bg-clip-text bg-gradient-to-r ${gradient} drop-shadow-[0_0_20px_${hexToRgba(primary, 0.8)}]">Lifespan Center</p>
          </motion.div>
        </div>

        <div className="h-screen relative pointer-events-none">
          <div className="absolute inset-0">
            {sections.map((section, index) => {
              const colors = section.side === 'left' ? { primary, secondary } : { primary: secondary, secondary: primary };
              return (
                <motion.div
                  key={section.id}
                  className={\`absolute pointer-events-auto cursor-pointer group \${index < 3 ? 'left-[20%]' : 'right-[20%]'}\`}
                  style={{ top: \`\${25 + index * 12}%\` }}
                  initial={{ opacity: 0, x: section.side === 'left' ? -20 : 20 }}
                  animate={isLoadingComplete && loadingProgress > 0.7 + index * 0.05 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  <div className={\`flex items-center gap-2 transition-all duration-300 \${section.side === 'right' ? 'flex-row-reverse' : ''}\`}>
                    <div className={\`text-sm font-mono text-left transition-all duration-300 px-3 py-2 rounded-lg backdrop-blur-md bg-black/50 border group-hover:shadow-[0_0_30px_${hexToRgba(colors.primary, 0.8)},0_0_60px_${hexToRgba(colors.primary, 0.4)}]\`} style={{ color: colors.primary, borderColor: \`\${colors.primary}30\` }}>
                      <div className="font-semibold">{section.title.toUpperCase()}</div>
                      <div className="text-xs mt-0.5 opacity-60 group-hover:opacity-80 transition-opacity">{section.subtitle}</div>
                    </div>
                    <svg width="60" height="2">
                      <line x1={section.side === 'left' ? "0" : "60"} y1="1" x2={section.side === 'left' ? "60" : "0"} y2="1" stroke={colors.primary} strokeWidth="2" opacity="0.6" strokeDasharray="4,4" className="group-hover:opacity-100" />
                      <circle cx={section.side === 'left' ? "60" : "0"} cy="1" r="3" fill={colors.primary} opacity="0.6" className="group-hover:opacity-100" />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="fixed inset-0 pointer-events-none transition-colors duration-1000 ease-out" style={{ zIndex: 5, background: \`linear-gradient(to bottom, rgba(26, 10, 46, \${Math.max(0, 0.2 - scrollProgress * 0.2)}) 0%, ${hexToRgba(primary, 0.05)} 30%, ${hexToRgba(secondary, 0.03)} 70%, rgba(0, 0, 0, \${scrollProgress * 0.2}) 100%)\` }} />

        <div className="relative">
          {sections.map((section, index) => (
            <div key={section.id} id={section.id} className="min-h-screen flex items-center justify-center relative" style={{ scrollSnapAlign: 'center' }}>
              <div className="w-full flex items-center justify-between gap-[10%]">
                {section.side === 'left' ? (
                  <>
                    <div className="w-[40%] h-full py-24 px-12 flex flex-col justify-end text-right">
                      <div className="text-8xl font-serif text-white/10 mb-4 text-right">0{index + 1}</div>
                      <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-sans font-light text-white leading-tight tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">{section.title}</h2>
                        <p className="text-2xl md:text-3xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r ${gradient}">{section.subtitle}</p>
                        <div className="w-24 h-1 bg-gradient-to-r ${gradient} ml-auto shadow-[0_0_20px_${hexToRgba(primary, 0.6)}]" />
                        <p className="text-lg text-white/80 leading-relaxed max-w-lg ml-auto">Experience cutting-edge regenerative medicine with personalized treatment protocols designed for your unique biological profile. Our advanced facilities combine scientific precision with compassionate care.</p>
                        <button className="mt-8 px-8 py-4 border-2 font-mono uppercase tracking-wider hover:text-black transition-all duration-300 ml-auto block shadow-[0_0_25px_${hexToRgba(primary, 0.5)},0_0_50px_${hexToRgba(primary, 0.3)}] hover:shadow-[0_0_35px_${hexToRgba(primary, 0.8)},0_0_70px_${hexToRgba(primary, 0.5)}]" style={{ borderColor: primary, color: primary }}>Learn More</button>
                      </div>
                    </div>
                    <div className="w-[40%] h-full flex items-center justify-start py-24 px-12">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-visible transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)' }}>
                        <div className="absolute inset-0 rounded-xl overflow-hidden">
                          <Image src={section.image} alt={section.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                        </div>
                        {section.stats && (
                          <>
                            <div className="absolute -top-6 -left-6 backdrop-blur-xl bg-black/70 border-2 rounded-xl px-4 py-3 shadow-[0_0_25px_${hexToRgba(primary, 0.6)},0_0_50px_${hexToRgba(primary, 0.3)}] hover:shadow-[0_0_35px_${hexToRgba(primary, 0.8)},0_0_70px_${hexToRgba(primary, 0.5)}] transition-all duration-300 group z-10" style={{ borderColor: primary }}>
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-0.5">{section.stats[0].value}</div>
                              <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: \`\${primary}cc\` }}>{section.stats[0].label}</div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-black/70 border-2 rounded-xl px-4 py-3 shadow-[0_0_25px_${hexToRgba(secondary, 0.6)},0_0_50px_${hexToRgba(secondary, 0.3)}] hover:shadow-[0_0_35px_${hexToRgba(secondary, 0.8)},0_0_70px_${hexToRgba(secondary, 0.5)}] transition-all duration-300 group z-10" style={{ borderColor: secondary }}>
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-0.5">{section.stats[1].value}</div>
                              <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: \`\${secondary}cc\` }}>{section.stats[1].label}</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-[40%] h-full flex items-center justify-end py-24 px-12">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-visible transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)' }}>
                        <div className="absolute inset-0 rounded-xl overflow-hidden">
                          <Image src={section.image} alt={section.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                        </div>
                        {section.stats && (
                          <>
                            <div className="absolute -top-6 -left-6 backdrop-blur-xl bg-black/70 border-2 rounded-xl px-4 py-3 shadow-[0_0_25px_${hexToRgba(primary, 0.6)},0_0_50px_${hexToRgba(primary, 0.3)}] hover:shadow-[0_0_35px_${hexToRgba(primary, 0.8)},0_0_70px_${hexToRgba(primary, 0.5)}] transition-all duration-300 group z-10" style={{ borderColor: primary }}>
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-0.5">{section.stats[0].value}</div>
                              <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: \`\${primary}cc\` }}>{section.stats[0].label}</div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 backdrop-blur-xl bg-black/70 border-2 rounded-xl px-4 py-3 shadow-[0_0_25px_${hexToRgba(secondary, 0.6)},0_0_50px_${hexToRgba(secondary, 0.3)}] hover:shadow-[0_0_35px_${hexToRgba(secondary, 0.8)},0_0_70px_${hexToRgba(secondary, 0.5)}] transition-all duration-300 group z-10" style={{ borderColor: secondary }}>
                              <div className="text-2xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-0.5">{section.stats[1].value}</div>
                              <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: \`\${secondary}cc\` }}>{section.stats[1].label}</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="w-[40%] h-full py-24 px-12 flex flex-col justify-start text-left">
                      <div className="text-8xl font-serif text-white/10 mb-4 text-left">0{index + 1}</div>
                      <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-sans font-light text-white leading-tight tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">{section.title}</h2>
                        <p className="text-2xl md:text-3xl font-sans font-light text-transparent bg-clip-text bg-gradient-to-r ${gradient}">{section.subtitle}</p>
                        <div className="w-24 h-1 bg-gradient-to-r ${gradient} shadow-[0_0_20px_${hexToRgba(secondary, 0.6)}]" />
                        <p className="text-lg text-white/80 leading-relaxed max-w-lg">Experience cutting-edge regenerative medicine with personalized treatment protocols designed for your unique biological profile. Our advanced facilities combine scientific precision with compassionate care.</p>
                        <button className="mt-8 px-8 py-4 border-2 font-mono uppercase tracking-wider hover:text-black transition-all duration-300 shadow-[0_0_25px_${hexToRgba(secondary, 0.5)},0_0_50px_${hexToRgba(secondary, 0.3)}] hover:shadow-[0_0_35px_${hexToRgba(secondary, 0.8)},0_0_70px_${hexToRgba(secondary, 0.5)}]" style={{ borderColor: secondary, color: secondary }}>Learn More</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <footer className="relative py-16 text-center border-t" style={{ background: 'linear-gradient(to bottom, #0a0412 0%, #1a0a2e 50%, #0f0624 100%)', borderColor: \`\${primary}30\` }}>
          <div className="max-w-6xl mx-auto px-8">
            <div className="flex justify-center items-center gap-8 mb-8">
              {['Team', 'Our Lab', 'Facilities', 'Blog', 'Contact'].map((item) => (
                <a key={item} href={\`#\${item.toLowerCase().replace(' ', '-')}\`} className="transition-all text-sm font-mono uppercase" style={{ color: \`\${primary}b3\` }}>
                  {item}
                </a>
              ))}
            </div>
            <p className="text-white/30 text-sm">© 2024 ICELLARÉ Lifespan Center. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
`;
}

// Generate all page files
colorways.forEach((colorway) => {
  const dir = path.join(__dirname, 'app', `loading-test-${colorway.name}`);
  const pagePath = path.join(dir, 'page.tsx');

  fs.writeFileSync(pagePath, generatePageComponent(colorway));
  console.log(`Created ${colorway.displayName} page component`);
});

console.log('\nAll page components created successfully!');
