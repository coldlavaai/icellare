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
import { PerspectiveCamera, Environment, Html } from '@react-three/drei'

// Section marker component
function SectionMarker({
  position,
  title,
  scrollProgress
}: {
  position: [number, number, number]
  title: string
  scrollProgress: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { scrollYProgress } = useScroll()

  useFrame(() => {
    if (!groupRef.current) return
    const scroll = scrollYProgress.get()

    // Calculate opacity based on scroll progress
    const targetScroll = scrollProgress
    const fadeRange = 0.05
    const opacity = Math.max(0, Math.min(1,
      1 - Math.abs(scroll - targetScroll) / fadeRange
    ))

    if (groupRef.current.children[0]) {
      // @ts-ignore
      groupRef.current.children[0].material.opacity = opacity * 0.6
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Html
        transform
        occlude
        style={{
          transition: 'all 0.3s',
          opacity: 1,
          pointerEvents: 'none',
        }}
      >
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '12px 24px',
          borderRadius: '24px',
          border: '2px solid rgba(212, 175, 122, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          whiteSpace: 'nowrap',
          fontSize: '18px',
          fontWeight: '600',
          color: '#2d2d2d',
          fontFamily: 'serif',
        }}>
          {title}
        </div>
      </Html>
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#D4AF7A"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

// Visible particle
function Particle({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { scrollYProgress } = useScroll()

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime + delay
    const scroll = scrollYProgress.get()

    meshRef.current.position.x = position[0] + Math.sin(time * 0.15) * 0.3
    meshRef.current.position.y = position[1] + Math.cos(time * 0.2) * 0.25 - scroll * 10
    meshRef.current.position.z = position[2] + Math.sin(time * 0.1) * 0.25

    meshRef.current.rotation.x = time * 0.08
    meshRef.current.rotation.y = time * 0.1

    const scale = 0.8 + Math.sin(time * 0.6) * 0.1
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 24, 24]} />
      <meshStandardMaterial
        color="#C8C8C8"
        metalness={0.3}
        roughness={0.6}
        transparent
        opacity={0.35}
      />
    </mesh>
  )
}

// Sophisticated neutral DNA Helix
function DNAHelix() {
  const { scrollYProgress } = useScroll()
  const strand1Ref = useRef<THREE.Mesh>(null)
  const strand2Ref = useRef<THREE.Mesh>(null)
  const rungsRef = useRef<THREE.Group>(null)

  const { strand1Curve, strand2Curve, rungs } = useMemo(() => {
    const turns = 8
    const height = 25
    const radius = 1.8
    const segments = 600

    const points1: THREE.Vector3[] = []
    const points2: THREE.Vector3[] = []
    const rungPositions: Array<{ pos1: THREE.Vector3; pos2: THREE.Vector3 }> = []

    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = t * Math.PI * 2 * turns
      const y = (t - 0.5) * height

      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius

      points1.push(new THREE.Vector3(x1, y, z1))
      points2.push(new THREE.Vector3(x2, y, z2))

      if (i % 8 === 0) {
        rungPositions.push({
          pos1: new THREE.Vector3(x1, y, z1),
          pos2: new THREE.Vector3(x2, y, z2),
        })
      }
    }

    const curve1 = new THREE.CatmullRomCurve3(points1)
    const curve2 = new THREE.CatmullRomCurve3(points2)

    return {
      strand1Curve: new THREE.TubeGeometry(curve1, segments, 0.11, 32, false),
      strand2Curve: new THREE.TubeGeometry(curve2, segments, 0.11, 32, false),
      rungs: rungPositions,
    }
  }, [])

  useFrame((state) => {
    const scroll = scrollYProgress.get()
    const time = state.clock.elapsedTime

    if (strand1Ref.current && strand2Ref.current && rungsRef.current) {
      const rotation = scroll * Math.PI * 2 + time * 0.08
      strand1Ref.current.rotation.y = rotation
      strand2Ref.current.rotation.y = rotation
      rungsRef.current.rotation.y = rotation

      strand1Ref.current.position.y = -scroll * 6
      strand2Ref.current.position.y = -scroll * 6
      rungsRef.current.position.y = -scroll * 6
    }
  })

  return (
    <group position={[-7, 0, 0]}>
      {/* Strand 1 - Visible silver */}
      <mesh ref={strand1Ref} geometry={strand1Curve}>
        <meshStandardMaterial
          color="#C8C8C8"
          metalness={0.4}
          roughness={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Strand 2 - Slightly lighter */}
      <mesh ref={strand2Ref} geometry={strand2Curve}>
        <meshStandardMaterial
          color="#D4D4D4"
          metalness={0.35}
          roughness={0.45}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Connection Rungs - Visible bridges */}
      <group ref={rungsRef}>
        {rungs.map((rung, i) => {
          const midpoint = new THREE.Vector3().lerpVectors(rung.pos1, rung.pos2, 0.5)
          const direction = new THREE.Vector3().subVectors(rung.pos2, rung.pos1)
          const length = direction.length()
          const quaternion = new THREE.Quaternion()
          quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.clone().normalize()
          )

          return (
            <mesh key={i} position={midpoint} quaternion={quaternion}>
              <cylinderGeometry args={[0.04, 0.04, length, 12]} />
              <meshStandardMaterial
                color="#BEBEBE"
                metalness={0.3}
                roughness={0.4}
                transparent
                opacity={0.6}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

// Scene with left-positioned DNA navigation
function Scene() {
  const { scrollYProgress } = useScroll()
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  // Particles near the DNA on the left
  const particles = useMemo(() => {
    const positions: Array<[number, number, number]> = []
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 12
      const radius = 1.8 + Math.random() * 1.2
      const x = -7 + Math.cos(angle) * radius + (Math.random() - 0.5) * 1
      const y = (i / 30) * 25 - 12 + (Math.random() - 0.5) * 2
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 1
      positions.push([x, y, z])
    }
    return positions
  }, [])

  // Section markers positioned along the DNA
  const sections = useMemo(() => [
    { title: 'Welcome', y: 10, scroll: 0 },
    { title: 'Our Impact', y: 5, scroll: 0.15 },
    { title: 'Philosophy', y: 0, scroll: 0.3 },
    { title: 'Services', y: -5, scroll: 0.5 },
    { title: 'Quality', y: -8, scroll: 0.7 },
    { title: 'Contact', y: -11, scroll: 0.85 },
  ], [])

  useFrame((state) => {
    const scroll = scrollYProgress.get()

    if (cameraRef.current) {
      cameraRef.current.position.y = -scroll * 8
      cameraRef.current.position.z = 11 - scroll * 2
      cameraRef.current.lookAt(-3, -scroll * 8, 0)
    }
  })

  return (
    <>
      {/* Subtle atmospheric fog */}
      <fog attach="fog" args={['#E8E8E8', 10, 28]} />

      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 11]}
        fov={60}
        near={0.1}
        far={100}
      />

      {/* Neutral environment */}
      <Environment preset="apartment" />

      {/* Enhanced lighting for visibility */}
      <ambientLight intensity={0.6} color="#FFFFFF" />
      <directionalLight
        position={[6, 8, 5]}
        intensity={0.8}
        color="#F8F8F8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[-10, 5, 8]}
        intensity={0.6}
        color="#F0F0F0"
      />
      <pointLight position={[-7, 5, 4]} intensity={0.8} color="#FFFFFF" distance={15} decay={2} />
      <spotLight
        position={[-5, 7, 5]}
        angle={0.5}
        penumbra={1}
        intensity={0.7}
        color="#FFFFFF"
        castShadow
      />

      <DNAHelix />

      {/* Section markers */}
      {sections.map((section, i) => (
        <SectionMarker
          key={i}
          position={[-4.5, section.y, 0]}
          title={section.title}
          scrollProgress={section.scroll}
        />
      ))}

      {/* Visible particles */}
      {particles.map((pos, i) => (
        <Particle key={i} position={pos} delay={i * 0.12} />
      ))}

      {/* Enhanced post-processing */}
      <EffectComposer multisampling={8}>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          height={300}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.4} darkness={0.2} />
      </EffectComposer>
    </>
  )
}

export default function DNABackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#E8E8E8] via-[#F0F0F0] to-[#F8F8F8]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
