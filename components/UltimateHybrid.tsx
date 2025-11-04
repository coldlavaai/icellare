'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useScrollStore } from '@/stores/scrollStore'
import { ArchitecturalDNA } from './ArchitecturalDNA'
import { BiologicalParticles } from './BiologicalParticles'
import { DynamicLighting } from './DynamicLighting'

// Cinematic Camera System - responds to scroll
function CinematicCamera() {
  const { camera: threeCamera } = useThree()
  const camera = threeCamera as THREE.PerspectiveCamera
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  // Define camera keyframes for each section
  const cameraKeyframes = useMemo(
    () => [
      // Hero section
      { position: [0, 0, 30], lookAt: [0, 0, 0], fov: 50 },
      // Stem Cells
      { position: [4, 2, 15], lookAt: [0, 2, 0], fov: 35 },
      // Genetics
      { position: [0, 8, 12], lookAt: [0, 0, 0], fov: 30 },
      // Vitamins
      { position: [-6, -2, 14], lookAt: [0, 0, 0], fov: 35 },
      // Aesthetics
      { position: [8, 4, 16], lookAt: [0, 0, 0], fov: 35 },
      // Contact
      { position: [0, 5, 20], lookAt: [0, 0, 0], fov: 45 }
    ],
    []
  )

  useFrame((state, delta) => {
    // Map scroll progress to keyframe
    const totalKeyframes = cameraKeyframes.length
    const keyframeProgress = scrollProgress * (totalKeyframes - 1)
    const currentIndex = Math.floor(keyframeProgress)
    const nextIndex = Math.min(currentIndex + 1, totalKeyframes - 1)
    const t = keyframeProgress - currentIndex

    // Smooth easing (cubic)
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    // Interpolate camera position
    const current = cameraKeyframes[currentIndex]
    const next = cameraKeyframes[nextIndex]

    camera.position.x = THREE.MathUtils.lerp(current.position[0], next.position[0], eased)
    camera.position.y = THREE.MathUtils.lerp(current.position[1], next.position[1], eased)
    camera.position.z = THREE.MathUtils.lerp(current.position[2], next.position[2], eased)

    // Interpolate lookAt
    const lookAtPoint = new THREE.Vector3(
      THREE.MathUtils.lerp(current.lookAt[0], next.lookAt[0], eased),
      THREE.MathUtils.lerp(current.lookAt[1], next.lookAt[1], eased),
      THREE.MathUtils.lerp(current.lookAt[2], next.lookAt[2], eased)
    )
    camera.lookAt(lookAtPoint)

    // Interpolate FOV
    camera.fov = THREE.MathUtils.lerp(current.fov, next.fov, eased)
    camera.updateProjectionMatrix()

    // Subtle breathing effect
    const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.01
    const drift = Math.cos(state.clock.elapsedTime * 0.3) * 0.005
    camera.position.x += breathe
    camera.position.y += drift
  })

  return null
}

// Dynamic Background - responds to scroll
function DynamicBackground() {
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  useFrame(({ scene }) => {
    // Background color keyframes for each section
    const backgroundKeyframes = [
      new THREE.Color(0xF8F8F8), // Hero - clean white
      new THREE.Color(0xFFF5F2), // Stem Cells - warm pink tint
      new THREE.Color(0xF2F8FF), // Genetics - cool blue tint
      new THREE.Color(0xFFFCF2), // Vitamins - golden tint
      new THREE.Color(0xFFF2F8), // Aesthetics - pink tint
      new THREE.Color(0xFFFFFF)  // Contact - pure white
    ]

    const fogKeyframes = [
      new THREE.Color(0xF0F0F0), // Hero
      new THREE.Color(0xFFE8E0), // Stem Cells
      new THREE.Color(0xE8F4FF), // Genetics
      new THREE.Color(0xFFF8E8), // Vitamins
      new THREE.Color(0xFFE8F4), // Aesthetics
      new THREE.Color(0xFFFFFF)  // Contact
    ]

    // Interpolate between keyframes
    const totalKeyframes = backgroundKeyframes.length
    const keyframeProgress = scrollProgress * (totalKeyframes - 1)
    const currentIndex = Math.floor(keyframeProgress)
    const nextIndex = Math.min(currentIndex + 1, totalKeyframes - 1)
    const t = keyframeProgress - currentIndex

    // Smooth easing
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    // Update background color
    const bgColor = backgroundKeyframes[currentIndex].clone().lerp(backgroundKeyframes[nextIndex], eased)
    scene.background = bgColor

    // Update fog color
    if (scene.fog && scene.fog instanceof THREE.Fog) {
      const fogColor = fogKeyframes[currentIndex].clone().lerp(fogKeyframes[nextIndex], eased)
      scene.fog.color = fogColor
    }
  })

  return null
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Dynamic background - controlled by DynamicBackground component */}
      <color attach="background" args={['#F8F8F8']} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#F0F0F0', 15, 45]} />

      {/* Dynamic background controller */}
      <DynamicBackground />

      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 30]}
        fov={50}
        near={0.1}
        far={1000}
      />

      {/* Ambient base light */}
      <ambientLight intensity={0.6} color="#FFFFFF" />

      {/* Dynamic scroll-responsive lighting */}
      <DynamicLighting />

      {/* Bright environment */}
      <Environment preset="apartment" />

      {/* Camera system */}
      <CinematicCamera />

      {/* Biological particles - stem cells, DNA, sperm, eggs */}
      <BiologicalParticles />

      {/* Architectural DNA Helix */}
      <ArchitecturalDNA />

      {/* Post-processing Effects - Subtle and clean */}
      <EffectComposer>
        {/* Subtle bloom for glass DNA glow */}
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
          mipmapBlur
        />

        {/* Minimal vignette for focus */}
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

// Main export
export default function UltimateHybrid() {
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  // Calculate background gradient based on scroll
  const getBackgroundStyle = () => {
    const gradients = [
      'linear-gradient(135deg, #F8F8F8 0%, #F0F0F0 50%, #E8E8E8 100%)', // Hero
      'linear-gradient(135deg, #FFF5F2 0%, #FFE8E0 50%, #FFD4CC 100%)', // Stem Cells
      'linear-gradient(135deg, #F2F8FF 0%, #E8F4FF 50%, #D4E8FF 100%)', // Genetics
      'linear-gradient(135deg, #FFFCF2 0%, #FFF8E8 50%, #FFECD4 100%)', // Vitamins
      'linear-gradient(135deg, #FFF2F8 0%, #FFE8F4 50%, #FFD4E8 100%)', // Aesthetics
      'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 50%, #F0F0F0 100%)'  // Contact
    ]

    const totalGradients = gradients.length
    const progress = scrollProgress * (totalGradients - 1)
    const currentIndex = Math.floor(progress)
    const nextIndex = Math.min(currentIndex + 1, totalGradients - 1)

    // Return current gradient (CSS can't interpolate gradients smoothly)
    return gradients[Math.round(progress)]
  }

  return (
    <div className="fixed inset-0 -z-10">
      {/* Dynamic gradient background */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ background: getBackgroundStyle() }}
      />

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
