'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import { useScroll } from 'framer-motion'
import * as THREE from 'three'
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration,
  Vignette,
  SSAO
} from '@react-three/postprocessing'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { BlendFunction } from 'postprocessing'

// Photorealistic Cell with subsurface scattering
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

    // Gentle rotation
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.2

    // Subtle pulsing
    const scale = 1 + Math.sin(time * 1.2) * 0.08
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={[0.15, 64, 64]} />
      <meshPhysicalMaterial
        color="#FFD700"
        metalness={0.1}
        roughness={0.05}
        transmission={0.95}
        thickness={1.2}
        envMapIntensity={2.5}
        clearcoat={1}
        clearcoatRoughness={0}
        ior={1.5}
        reflectivity={0.9}
        emissive="#FFA500"
        emissiveIntensity={0.4}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// Photorealistic DNA Helix
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
    const segments = 600 // Much higher for smooth curves

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

      // More rungs for visual detail
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
      strand1Curve: new THREE.TubeGeometry(curve1, segments, 0.1, 32, false),
      strand2Curve: new THREE.TubeGeometry(curve2, segments, 0.1, 32, false),
      rungs: rungPositions,
    }
  }, [])

  useFrame((state) => {
    const scroll = scrollYProgress.get()
    const time = state.clock.elapsedTime

    if (strand1Ref.current && strand2Ref.current && rungsRef.current) {
      // Smooth rotation based on scroll
      const rotation = scroll * Math.PI * 2 + time * 0.1
      strand1Ref.current.rotation.y = rotation
      strand2Ref.current.rotation.y = rotation
      rungsRef.current.rotation.y = rotation

      // Camera follows DNA
      strand1Ref.current.position.y = -scroll * 6
      strand2Ref.current.position.y = -scroll * 6
      rungsRef.current.position.y = -scroll * 6
    }
  })

  return (
    <group>
      {/* Strand 1 - Gold with glass-like material */}
      <mesh ref={strand1Ref} geometry={strand1Curve} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#D4AF37"
          metalness={0.4}
          roughness={0.1}
          transmission={0.3}
          thickness={0.8}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive="#FFD700"
          emissiveIntensity={0.3}
          ior={1.5}
          reflectivity={0.8}
        />
      </mesh>

      {/* Strand 2 - Bronze with metallic sheen */}
      <mesh ref={strand2Ref} geometry={strand2Curve} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#B8860B"
          metalness={0.6}
          roughness={0.15}
          transmission={0.2}
          thickness={0.8}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive="#FFA500"
          emissiveIntensity={0.25}
          ior={1.5}
          reflectivity={0.9}
        />
      </mesh>

      {/* Connection Rungs - Glass-like connectors */}
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
              <cylinderGeometry args={[0.05, 0.05, length, 16]} />
              <meshPhysicalMaterial
                color="#C9A060"
                metalness={0.3}
                roughness={0.1}
                transmission={0.5}
                thickness={0.6}
                envMapIntensity={1.8}
                clearcoat={1}
                clearcoatRoughness={0.05}
                emissive="#FFD700"
                emissiveIntensity={0.2}
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

// Cinematic Scene with HDR lighting
function Scene() {
  const { scrollYProgress } = useScroll()
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  // Generate cell positions
  const cells = useMemo(() => {
    const positions: Array<[number, number, number]> = []
    for (let i = 0; i < 80; i++) {
      const angle = (i / 80) * Math.PI * 16
      const radius = 3 + Math.random() * 2.5
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5
      const y = (i / 80) * 25 - 12 + (Math.random() - 0.5) * 2
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.5
      positions.push([x, y, z])
    }
    return positions
  }, [])

  useFrame((state) => {
    const scroll = scrollYProgress.get()

    if (cameraRef.current) {
      // Smooth camera movement through DNA
      cameraRef.current.position.y = -scroll * 8
      cameraRef.current.position.z = 9 - scroll * 2
      cameraRef.current.lookAt(0, -scroll * 8, 0)
    }
  })

  return (
    <>
      {/* Cinema Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 9]}
        fov={65}
        near={0.1}
        far={100}
      />

      {/* HDR Environment for realistic reflections */}
      <Environment preset="sunset" />

      {/* Advanced Lighting Setup */}
      <ambientLight intensity={0.4} color="#FFF5E6" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        color="#FFE4B5"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[-10, -5, -5]}
        intensity={0.8}
        color="#FFA500"
      />
      <pointLight position={[0, 5, 5]} intensity={2} color="#FFD700" distance={15} decay={2} />
      <pointLight position={[0, -5, -5]} intensity={1.5} color="#FF8C00" distance={12} decay={2} />
      <spotLight
        position={[5, 10, 5]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        color="#FFFFFF"
        castShadow
      />

      {/* DNA Helix */}
      <DNAHelix />

      {/* Floating Cells */}
      {cells.map((pos, i) => (
        <Cell key={i} position={pos} delay={i * 0.08} />
      ))}

      {/* Cinematic Post-Processing */}
      <EffectComposer multisampling={8}>
        <SSAO
          samples={31}
          radius={0.1}
          intensity={50}
          luminanceInfluence={0.5}
          color="black"
        />
        <Bloom
          intensity={2}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          height={300}
          opacity={1}
        />
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.05}
          bokehScale={3}
          height={480}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.001, 0.001)}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  )
}

export default function DNABackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#1a1612] via-[#2d2416] to-[#3d2f1a]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
