'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import { useScroll } from 'framer-motion'
import * as THREE from 'three'
import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
  SSAO,
  ChromaticAberration
} from '@react-three/postprocessing'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { BlendFunction, KernelSize } from 'postprocessing'

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

  // Base pair colors (scientifically accurate)
  const getBasePairColor = (type: 'A' | 'T' | 'G' | 'C') => {
    switch (type) {
      case 'A': return 0xff6b6b // Adenine - red
      case 'T': return 0x4ecdc4 // Thymine - cyan
      case 'G': return 0xffe66d // Guanine - yellow
      case 'C': return 0x95e1d3 // Cytosine - green
    }
  }

  return (
    <group ref={helixRef}>
      {/* Strand 1 - Photorealistic glass-like material */}
      <mesh ref={strand1Ref} geometry={strand1Geometry}>
        <meshPhysicalMaterial
          color={0x64c8ff}
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0.9}
          transmission={0.5}
          thickness={0.5}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          emissive={0x2a4f6f}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Strand 2 - Slightly different for depth */}
      <mesh ref={strand2Ref} geometry={strand2Geometry}>
        <meshPhysicalMaterial
          color={0x88ddff}
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0.85}
          transmission={0.5}
          thickness={0.5}
          ior={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          emissive={0x3a5f8f}
          emissiveIntensity={0.25}
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

          const color = getBasePairColor(pair.type)

          return (
            <mesh key={i} position={midpoint} quaternion={quaternion}>
              <cylinderGeometry args={[0.04, 0.04, length, 8]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.9}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

// PHASE 2: Cinematic Three-Point Lighting System
function CinematicLighting() {
  return (
    <>
      {/* 1. KEY LIGHT (Main light source) */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        color={0xffffff}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* 2. FILL LIGHT (Soften shadows) */}
      <directionalLight
        position={[-5, 0, -5]}
        intensity={0.5}
        color={0x64c8ff}
      />

      {/* 3. RIM LIGHT (Edge highlighting - CRITICAL for depth) */}
      <directionalLight
        position={[0, 5, -10]}
        intensity={0.8}
        color={0xff88ff}
      />

      {/* 4. AMBIENT (Subtle base illumination) */}
      <ambientLight intensity={0.3} color={0x222244} />

      {/* 5. POINT LIGHTS (DNA internal glow) */}
      <pointLight position={[0, 2, 0]} intensity={2} distance={5} color={0x64c8ff} />
      <pointLight position={[0, -2, 0]} intensity={2} distance={5} color={0xff6b9d} />
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
      {/* Volumetric fog for atmospheric depth */}
      <fogExp2 attach="fog" args={[0x000511, 0.03]} />

      {/* Camera with cinematic FOV */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 12]}
        fov={50}
        near={0.1}
        far={100}
      />

      {/* HDRI Environment for realistic reflections */}
      <Environment preset="night" />

      {/* Cinematic Lighting */}
      <CinematicLighting />

      {/* The DNA Helix */}
      <DNAHelix />

      {/* PHASE 4: Post-Processing Effects */}
      <EffectComposer multisampling={8}>
        {/* Bloom - Glowing highlights */}
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          kernelSize={KernelSize.LARGE}
          mipmapBlur
        />

        {/* Depth of Field - Cinematic focus */}
        <DepthOfField
          focusDistance={0.01}
          focalLength={0.05}
          bokehScale={3}
          height={480}
        />

        {/* SSAO - Realistic shadows */}
        <SSAO
          blendFunction={BlendFunction.MULTIPLY}
          samples={31}
          radius={0.1}
          intensity={50}
          luminanceInfluence={0.6}
          color="black"
        />

        {/* Chromatic Aberration - Lens distortion */}
        <ChromaticAberration
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation
          modulationOffset={0.3}
        />

        {/* Vignette - Frame darkening */}
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

// Main Export Component
export default function CinematicDNA() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000511] via-[#0a0a1a] to-[#000000]" />

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
