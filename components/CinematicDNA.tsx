'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import { useScroll } from 'framer-motion'
import * as THREE from 'three'
import {
  EffectComposer,
  Bloom,
  Vignette
} from '@react-three/postprocessing'
import { PerspectiveCamera, Environment } from '@react-three/drei'

// PHASE 1: Parametric DNA Helix with Proper Geometry
function createDNAStrand(t: number, radius: number, pitch: number, offset: number = 0) {
  const x = radius * Math.cos(t + offset)
  const y = t * pitch
  const z = radius * Math.sin(t + offset)
  return new THREE.Vector3(x, y, z)
}

interface BasePair {
  pos1: THREE.Vector3
  pos2: THREE.Vector3
  type: 'A' | 'T' | 'G' | 'C'
}

function DNAHelix() {
  const { scrollYProgress } = useScroll()
  const helixRef = useRef<THREE.Group>(null)
  const strand1Ref = useRef<THREE.Mesh>(null)
  const strand2Ref = useRef<THREE.Mesh>(null)
  const basePairsRef = useRef<THREE.Group>(null)

  // Generate DNA geometry using parametric equations
  const { strand1Geometry, strand2Geometry, basePairs } = useMemo(() => {
    const turns = 10 // Full rotations
    const segments = 500
    const radius = 0.8
    const pitch = 0.3
    const height = turns * Math.PI * 2

    const strand1Points: THREE.Vector3[] = []
    const strand2Points: THREE.Vector3[] = []
    const pairs: BasePair[] = []

    // DNA bases sequence (alternating for visual variety)
    const baseTypes: ('A' | 'T' | 'G' | 'C')[] = ['A', 'T', 'G', 'C']

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * height - height / 2 // Center around 0

      // First strand
      const point1 = createDNAStrand(t, radius, pitch, 0)
      strand1Points.push(point1)

      // Second strand (180 degrees opposite)
      const point2 = createDNAStrand(t, radius, pitch, Math.PI)
      strand2Points.push(point2)

      // Base pairs connect strands (every 10th segment for proper spacing)
      if (i % 10 === 0) {
        const baseType = baseTypes[Math.floor(i / 10) % 4]
        pairs.push({
          pos1: point1.clone(),
          pos2: point2.clone(),
          type: baseType
        })
      }
    }

    // Create tube geometries for the strands
    const curve1 = new THREE.CatmullRomCurve3(strand1Points)
    const curve2 = new THREE.CatmullRomCurve3(strand2Points)

    return {
      strand1Geometry: new THREE.TubeGeometry(curve1, segments, 0.12, 16, false),
      strand2Geometry: new THREE.TubeGeometry(curve2, segments, 0.12, 16, false),
      basePairs: pairs
    }
  }, [])

  // PHASE 1: Scroll-based rotation and animation
  useFrame((state) => {
    const scroll = scrollYProgress.get()
    const time = state.clock.elapsedTime

    if (helixRef.current) {
      // Primary rotation (multi-axis for cinematic effect)
      helixRef.current.rotation.y = scroll * Math.PI * 4 + time * 0.1
      helixRef.current.rotation.x = Math.sin(scroll * Math.PI) * 0.2

      // Vertical travel
      helixRef.current.position.y = (scroll - 0.5) * 8

      // Subtle orbital motion
      helixRef.current.position.x = Math.sin(scroll * Math.PI * 2) * 1.5
      helixRef.current.position.z = Math.cos(scroll * Math.PI * 2) * 0.8

      // Breathing/pulsing scale
      const pulse = 1 + Math.sin(time * 0.8) * 0.03
      helixRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group ref={helixRef}>
      {/* Strand 1 - Subtle neutral */}
      <mesh ref={strand1Ref} geometry={strand1Geometry}>
        <meshStandardMaterial
          color="#DCDCDC"
          metalness={0.1}
          roughness={0.5}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Strand 2 - Slightly lighter */}
      <mesh ref={strand2Ref} geometry={strand2Geometry}>
        <meshStandardMaterial
          color="#E4E4E4"
          metalness={0.08}
          roughness={0.55}
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Base Pairs (rungs connecting strands) */}
      <group ref={basePairsRef}>
        {basePairs.map((pair, i) => {
          const midpoint = new THREE.Vector3().lerpVectors(pair.pos1, pair.pos2, 0.5)
          const direction = new THREE.Vector3().subVectors(pair.pos2, pair.pos1)
          const length = direction.length()
          const quaternion = new THREE.Quaternion()
          quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.clone().normalize()
          )

          return (
            <mesh key={i} position={midpoint} quaternion={quaternion}>
              <cylinderGeometry args={[0.03, 0.03, length, 8]} />
              <meshStandardMaterial
                color="#D0D0D0"
                metalness={0.08}
                roughness={0.5}
                transparent
                opacity={0.2}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

// Subtle, clean lighting
function CleanLighting() {
  return (
    <>
      {/* Soft ambient */}
      <ambientLight intensity={0.4} color="#FFFFFF" />

      {/* Main directional light */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={0.6}
        color="#F8F8F8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill light */}
      <directionalLight
        position={[-5, -3, -4]}
        intensity={0.3}
        color="#F0F0F0"
      />

      {/* Subtle top light */}
      <pointLight position={[0, 5, 4]} intensity={0.4} color="#FFFFFF" distance={12} decay={2} />
    </>
  )
}

// Main Scene Component
function Scene() {
  const { scrollYProgress } = useScroll()
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  // PHASE 5: Camera choreography (basic for now, will enhance later)
  useFrame((state) => {
    const scroll = scrollYProgress.get()

    if (cameraRef.current) {
      // Camera position based on scroll
      cameraRef.current.position.y = -scroll * 6
      cameraRef.current.position.z = 12 - scroll * 3

      // Subtle camera breathing/floating
      const time = state.clock.elapsedTime
      cameraRef.current.position.x += Math.sin(time * 0.5) * 0.02
      cameraRef.current.position.y += Math.cos(time * 0.3) * 0.01

      // Look at the DNA
      cameraRef.current.lookAt(0, -scroll * 6, 0)
    }
  })

  return (
    <>
      {/* Subtle fog */}
      <fog attach="fog" args={['#E8E8E8', 8, 22]} />

      {/* Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 12]}
        fov={60}
        near={0.1}
        far={100}
      />

      {/* Neutral environment */}
      <Environment preset="apartment" />

      {/* Clean Lighting */}
      <CleanLighting />

      {/* The DNA Helix */}
      <DNAHelix />

      {/* Minimal post-processing */}
      <EffectComposer multisampling={8}>
        {/* Very subtle bloom */}
        <Bloom
          intensity={0.12}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.95}
          height={300}
          mipmapBlur
        />

        {/* Minimal vignette */}
        <Vignette eskil={false} offset={0.35} darkness={0.25} />
      </EffectComposer>
    </>
  )
}

// Main Export Component
export default function CinematicDNA() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8E8E8] via-[#F0F0F0] to-[#F8F8F8]" />

      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
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
