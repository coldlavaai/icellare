'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import { useScroll } from 'framer-motion'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { PerspectiveCamera } from '@react-three/drei'

// Floating Cell Sphere with physics
function Cell({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { scrollYProgress } = useScroll()

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime + delay
    const scroll = scrollYProgress.get()

    // Organic floating movement
    meshRef.current.position.x = position[0] + Math.sin(time * 0.3) * 0.5
    meshRef.current.position.y = position[1] + Math.cos(time * 0.4) * 0.3 - scroll * 10
    meshRef.current.position.z = position[2] + Math.sin(time * 0.25) * 0.4

    // Subtle rotation
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3

    // Pulsing scale
    const scale = 1 + Math.sin(time * 1.5) * 0.1
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshPhysicalMaterial
        color="#FFD700"
        metalness={0.3}
        roughness={0.2}
        transmission={0.9}
        thickness={0.5}
        envMapIntensity={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive="#FFA500"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// DNA Helix Structure
function DNAHelix() {
  const { scrollYProgress } = useScroll()
  const strand1Ref = useRef<THREE.Mesh>(null)
  const strand2Ref = useRef<THREE.Mesh>(null)
  const rungsRef = useRef<THREE.Group>(null)

  // Generate helix curve
  const { strand1Curve, strand2Curve, rungs } = useMemo(() => {
    const turns = 6
    const height = 20
    const radius = 1.5
    const segments = 200

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

      // Add rungs every 10 segments
      if (i % 10 === 0) {
        rungPositions.push({
          pos1: new THREE.Vector3(x1, y, z1),
          pos2: new THREE.Vector3(x2, y, z2),
        })
      }
    }

    const curve1 = new THREE.CatmullRomCurve3(points1)
    const curve2 = new THREE.CatmullRomCurve3(points2)

    return {
      strand1Curve: new THREE.TubeGeometry(curve1, segments, 0.08, 16, false),
      strand2Curve: new THREE.TubeGeometry(curve2, segments, 0.08, 16, false),
      rungs: rungPositions,
    }
  }, [])

  useFrame((state) => {
    const scroll = scrollYProgress.get()

    if (strand1Ref.current && strand2Ref.current && rungsRef.current) {
      // Smooth rotation based on scroll
      strand1Ref.current.rotation.y = scroll * Math.PI * 2
      strand2Ref.current.rotation.y = scroll * Math.PI * 2
      rungsRef.current.rotation.y = scroll * Math.PI * 2

      // Move DNA up as you scroll
      strand1Ref.current.position.y = -scroll * 5
      strand2Ref.current.position.y = -scroll * 5
      rungsRef.current.position.y = -scroll * 5
    }
  })

  return (
    <group>
      {/* Strand 1 - Gold */}
      <mesh ref={strand1Ref} geometry={strand1Curve}>
        <meshPhysicalMaterial
          color="#D4AF7A"
          metalness={0.8}
          roughness={0.2}
          emissive="#FFD700"
          emissiveIntensity={0.2}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Strand 2 - Bronze */}
      <mesh ref={strand2Ref} geometry={strand2Curve}>
        <meshPhysicalMaterial
          color="#B8860B"
          metalness={0.8}
          roughness={0.2}
          emissive="#FFA500"
          emissiveIntensity={0.2}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Connection Rungs */}
      <group ref={rungsRef}>
        {rungs.map((rung, i) => {
          const midpoint = new THREE.Vector3().lerpVectors(rung.pos1, rung.pos2, 0.5)
          const direction = new THREE.Vector3().subVectors(rung.pos2, rung.pos1)
          const length = direction.length()

          return (
            <mesh key={i} position={midpoint}>
              <cylinderGeometry args={[0.04, 0.04, length, 8]} />
              <meshPhysicalMaterial
                color="#D4AF7A"
                metalness={0.6}
                roughness={0.3}
                emissive="#FFD700"
                emissiveIntensity={0.15}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

// Main 3D Scene
function Scene() {
  const { scrollYProgress } = useScroll()
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  // Generate cell positions
  const cells = useMemo(() => {
    const positions: Array<[number, number, number]> = []
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 12
      const radius = 3 + Math.random() * 2
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2
      const y = (i / 50) * 20 - 10 + (Math.random() - 0.5) * 2
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 2
      positions.push([x, y, z])
    }
    return positions
  }, [])

  useFrame((state) => {
    const scroll = scrollYProgress.get()

    // Smooth camera movement through the DNA
    if (cameraRef.current) {
      cameraRef.current.position.y = -scroll * 8
      cameraRef.current.position.z = 8 - scroll * 2
      cameraRef.current.lookAt(0, -scroll * 8, 0)
    }
  })

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 8]}
        fov={75}
      />

      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#FFA500" />
      <spotLight
        position={[0, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#FFFFFF"
      />

      {/* DNA Helix */}
      <DNAHelix />

      {/* Floating Cells */}
      {cells.map((pos, i) => (
        <Cell key={i} position={pos} delay={i * 0.1} />
      ))}

      {/* Post-processing Effects */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
        />
      </EffectComposer>
    </>
  )
}

export default function DNABackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#FDFCFB] via-[#F7F4EF] to-[#F0EBE3]">
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
