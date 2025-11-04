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

// Subtle organic particle (not glowing orb)
function Particle({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { scrollYProgress } = useScroll()

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime + delay
    const scroll = scrollYProgress.get()

    // Very gentle floating
    meshRef.current.position.x = position[0] + Math.sin(time * 0.2) * 0.3
    meshRef.current.position.y = position[1] + Math.cos(time * 0.25) * 0.2 - scroll * 10
    meshRef.current.position.z = position[2] + Math.sin(time * 0.15) * 0.2

    // Minimal rotation
    meshRef.current.rotation.x = time * 0.1
    meshRef.current.rotation.y = time * 0.15

    // Very subtle scale variation
    const scale = 0.8 + Math.sin(time * 0.8) * 0.05
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 32, 32]} />
      <meshStandardMaterial
        color="#C9B896"
        metalness={0.2}
        roughness={0.6}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

// Photorealistic DNA Helix - biological/wet appearance
function DNAHelix() {
  const { scrollYProgress } = useScroll()
  const strand1Ref = useRef<THREE.Mesh>(null)
  const strand2Ref = useRef<THREE.Mesh>(null)
  const rungsRef = useRef<THREE.Group>(null)

  // Ultra-smooth helix curves
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
      strand1Curve: new THREE.TubeGeometry(curve1, segments, 0.12, 32, false),
      strand2Curve: new THREE.TubeGeometry(curve2, segments, 0.12, 32, false),
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
    <group>
      {/* Strand 1 - Biological material with subtle sheen */}
      <mesh ref={strand1Ref} geometry={strand1Curve} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#B8A080"
          metalness={0.15}
          roughness={0.35}
          transmission={0.1}
          thickness={0.4}
          envMapIntensity={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          emissive="#8B7355"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Strand 2 - Slightly different tone for depth */}
      <mesh ref={strand2Ref} geometry={strand2Curve} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#A89674"
          metalness={0.12}
          roughness={0.4}
          transmission={0.08}
          thickness={0.4}
          envMapIntensity={0.75}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
          emissive="#7D6B4F"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Connection Rungs - Subtle biological bridges */}
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
            <mesh key={i} position={midpoint} quaternion={quaternion} castShadow receiveShadow>
              <cylinderGeometry args={[0.04, 0.04, length, 12]} />
              <meshPhysicalMaterial
                color="#9D8B6E"
                metalness={0.1}
                roughness={0.45}
                transmission={0.05}
                thickness={0.3}
                envMapIntensity={0.6}
                clearcoat={0.4}
                clearcoatRoughness={0.3}
                transparent
                opacity={0.85}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

// Scientific atmospheric scene
function Scene() {
  const { scrollYProgress } = useScroll()
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const fogRef = useRef<THREE.Fog>(null)

  // Sparse, subtle particles
  const particles = useMemo(() => {
    const positions: Array<[number, number, number]> = []
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 14
      const radius = 3.5 + Math.random() * 2
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5
      const y = (i / 40) * 25 - 12 + (Math.random() - 0.5) * 2
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.5
      positions.push([x, y, z])
    }
    return positions
  }, [])

  useFrame((state) => {
    const scroll = scrollYProgress.get()

    if (cameraRef.current) {
      cameraRef.current.position.y = -scroll * 8
      cameraRef.current.position.z = 9 - scroll * 2
      cameraRef.current.lookAt(0, -scroll * 8, 0)
    }
  })

  return (
    <>
      {/* Fog for depth and atmosphere */}
      <fog ref={fogRef} attach="fog" args={['#1a1612', 5, 20]} />

      {/* Scientific Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 9]}
        fov={60}
        near={0.1}
        far={100}
      />

      {/* HDR Environment - natural lighting */}
      <Environment preset="dawn" />

      {/* Clinical Lighting Setup */}
      <ambientLight intensity={0.3} color="#E8DCC8" />
      <directionalLight
        position={[8, 8, 6]}
        intensity={0.8}
        color="#F5E6D3"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[-6, -4, -4]}
        intensity={0.4}
        color="#D4C4A8"
      />
      <pointLight position={[0, 6, 4]} intensity={0.6} color="#E8D4B8" distance={12} decay={2} />
      <spotLight
        position={[4, 8, 6]}
        angle={0.35}
        penumbra={1}
        intensity={0.7}
        color="#F0E6D8"
        castShadow
      />

      {/* DNA Helix */}
      <DNAHelix />

      {/* Subtle atmospheric particles */}
      {particles.map((pos, i) => (
        <Particle key={i} position={pos} delay={i * 0.1} />
      ))}

      {/* Subtle post-processing */}
      <EffectComposer multisampling={8}>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          height={300}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.25} darkness={0.5} />
      </EffectComposer>
    </>
  )
}

export default function DNABackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#2a2218] via-[#3d3024] to-[#4a3a2a]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
