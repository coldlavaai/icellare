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

// Ultra-subtle particle (barely visible)
function Particle({ position, delay }: { position: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { scrollYProgress } = useScroll()

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime + delay
    const scroll = scrollYProgress.get()

    meshRef.current.position.x = position[0] + Math.sin(time * 0.15) * 0.2
    meshRef.current.position.y = position[1] + Math.cos(time * 0.2) * 0.15 - scroll * 10
    meshRef.current.position.z = position[2] + Math.sin(time * 0.1) * 0.15

    meshRef.current.rotation.x = time * 0.08
    meshRef.current.rotation.y = time * 0.1

    const scale = 0.6 + Math.sin(time * 0.6) * 0.03
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 20, 20]} />
      <meshStandardMaterial
        color="#E0E0E0"
        metalness={0.1}
        roughness={0.8}
        transparent
        opacity={0.08}
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
    <group>
      {/* Strand 1 - Cool silver-white - very subtle */}
      <mesh ref={strand1Ref} geometry={strand1Curve}>
        <meshStandardMaterial
          color="#DCDCDC"
          metalness={0.1}
          roughness={0.5}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Strand 2 - Slightly lighter for depth */}
      <mesh ref={strand2Ref} geometry={strand2Curve}>
        <meshStandardMaterial
          color="#E4E4E4"
          metalness={0.08}
          roughness={0.55}
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Connection Rungs - Subtle neutral bridges */}
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
              <cylinderGeometry args={[0.03, 0.03, length, 12]} />
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

// Clean sophisticated scene
function Scene() {
  const { scrollYProgress } = useScroll()
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  // Very sparse particles
  const particles = useMemo(() => {
    const positions: Array<[number, number, number]> = []
    for (let i = 0; i < 25; i++) {
      const angle = (i / 25) * Math.PI * 12
      const radius = 3.8 + Math.random() * 1.8
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.2
      const y = (i / 25) * 25 - 12 + (Math.random() - 0.5) * 2
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.2
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
      {/* Subtle atmospheric fog */}
      <fog attach="fog" args={['#E8E8E8', 8, 22]} />

      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 9]}
        fov={60}
        near={0.1}
        far={100}
      />

      {/* Neutral environment */}
      <Environment preset="apartment" />

      {/* Soft clinical lighting */}
      <ambientLight intensity={0.4} color="#FFFFFF" />
      <directionalLight
        position={[6, 8, 5]}
        intensity={0.6}
        color="#F8F8F8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[-5, -3, -4]}
        intensity={0.3}
        color="#F0F0F0"
      />
      <pointLight position={[0, 5, 4]} intensity={0.4} color="#FFFFFF" distance={12} decay={2} />
      <spotLight
        position={[3, 7, 5]}
        angle={0.4}
        penumbra={1}
        intensity={0.5}
        color="#FFFFFF"
        castShadow
      />

      <DNAHelix />

      {/* Ultra-subtle particles */}
      {particles.map((pos, i) => (
        <Particle key={i} position={pos} delay={i * 0.12} />
      ))}

      {/* Minimal post-processing */}
      <EffectComposer multisampling={8}>
        <Bloom
          intensity={0.1}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.95}
          height={300}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.35} darkness={0.25} />
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
