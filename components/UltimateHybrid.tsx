'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { useScrollStore } from '@/stores/scrollStore'

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

// Temporary test cube to verify camera movement
function TestCube() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#64c8ff" emissive="#64c8ff" emissiveIntensity={0.5} />
    </mesh>
  )
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Black space background */}
      <color attach="background" args={['#000000']} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 10, 50]} />

      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 30]}
        fov={50}
        near={0.1}
        far={1000}
      />

      {/* Basic lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 0, 10]} intensity={1} color="#64c8ff" />

      {/* Environment */}
      <Environment preset="night" />

      {/* Camera system */}
      <CinematicCamera />

      {/* Test cube - will replace with actual content */}
      <TestCube />
    </>
  )
}

// Main export
export default function UltimateHybrid() {
  return (
    <div className="fixed inset-0 -z-10">
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
