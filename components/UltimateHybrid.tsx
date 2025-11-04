'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useScrollStore } from '@/stores/scrollStore'
import { ArchitecturalDNA } from './ArchitecturalDNA'
import { FloatingParticles } from './FloatingParticles'

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

// Main Scene
function Scene() {
  return (
    <>
      {/* Light clean background */}
      <color attach="background" args={['#F5F5F5']} />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#F0F0F0', 15, 45]} />

      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 30]}
        fov={50}
        near={0.1}
        far={1000}
      />

      {/* Clean professional lighting */}
      <ambientLight intensity={0.6} color="#FFFFFF" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#F8F8F8" castShadow />
      <directionalLight position={[-5, -3, -4]} intensity={0.5} color="#F0F0F0" />
      <pointLight position={[0, 5, 8]} intensity={0.8} color="#FFFFFF" distance={20} decay={2} />

      {/* Bright environment */}
      <Environment preset="apartment" />

      {/* Camera system */}
      <CinematicCamera />

      {/* Floating particles for depth and atmosphere */}
      <FloatingParticles />

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
  return (
    <div className="fixed inset-0 -z-10">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F8F8] via-[#F0F0F0] to-[#E8E8E8]" />

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
