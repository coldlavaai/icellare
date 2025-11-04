'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useScroll } from 'framer-motion'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

function DNAHelix({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scrollYProgress } = useScroll()

  // Create DNA helix geometry
  const helixData = useMemo(() => {
    const points1: THREE.Vector3[] = []
    const points2: THREE.Vector3[] = []
    const rungs: Array<[THREE.Vector3, THREE.Vector3]> = []

    const segments = 300
    const height = 40
    const radius = 2.8
    const turns = 5

    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = t * Math.PI * 2 * turns
      const y = (t - 0.5) * height

      // First strand
      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      points1.push(new THREE.Vector3(x1, y, z1))

      // Second strand (180 degrees offset)
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius
      points2.push(new THREE.Vector3(x2, y, z2))

      // Base pairs (rungs) every 8 segments
      if (i % 8 === 0 && i > 0 && i < segments) {
        rungs.push([
          new THREE.Vector3(x1, y, z1),
          new THREE.Vector3(x2, y, z2)
        ])
      }
    }

    return { points1, points2, rungs }
  }, [])

  // Rotate based on scroll + mouse parallax
  useFrame((state) => {
    if (groupRef.current) {
      const scrollValue = scrollYProgress.get()
      const time = state.clock.getElapsedTime()

      // Main rotation from scroll
      groupRef.current.rotation.y = scrollValue * Math.PI * 6 // 6 full rotations

      // Subtle mouse parallax tilt
      groupRef.current.rotation.x = mouse.y * 0.3
      groupRef.current.rotation.z = -mouse.x * 0.15

      // Gentle floating animation
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {/* First strand - Rose Gold */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(helixData.points1),
          150,
          0.18,
          12,
          false
        ]} />
        <meshStandardMaterial
          color="#D4AF7A"
          emissive="#D4AF7A"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Second strand - Bronze */}
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(helixData.points2),
          150,
          0.18,
          12,
          false
        ]} />
        <meshStandardMaterial
          color="#9C7D5C"
          emissive="#9C7D5C"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Base pairs (rungs) */}
      {helixData.rungs.map((rung, i) => {
        const midpoint = new THREE.Vector3(
          (rung[0].x + rung[1].x) / 2,
          rung[0].y,
          (rung[0].z + rung[1].z) / 2
        )
        const distance = rung[0].distanceTo(rung[1])
        const direction = new THREE.Vector3().subVectors(rung[1], rung[0])
        const quaternion = new THREE.Quaternion()
        quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.normalize()
        )

        return (
          <group key={i}>
            {/* Connecting bar */}
            <mesh
              position={midpoint}
              quaternion={quaternion}
              castShadow
            >
              <cylinderGeometry args={[0.1, 0.1, distance, 8]} />
              <meshStandardMaterial
                color="#B89968"
                transparent
                opacity={0.7}
                metalness={0.6}
                roughness={0.3}
                emissive="#B89968"
                emissiveIntensity={0.2}
              />
            </mesh>

            {/* Base pair spheres with glow */}
            <mesh position={rung[0]} castShadow>
              <sphereGeometry args={[0.28, 24, 24]} />
              <meshStandardMaterial
                color="#D4AF7A"
                emissive="#D4AF7A"
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            <mesh position={rung[1]} castShadow>
              <sphereGeometry args={[0.28, 24, 24]} />
              <meshStandardMaterial
                color="#9C7D5C"
                emissive="#9C7D5C"
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const roseGold = new THREE.Color('#D4AF7A')
    const bronze = new THREE.Color('#9C7D5C')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Distribute particles in a cylindrical volume around DNA
      const angle = Math.random() * Math.PI * 2
      const radius = 4 + Math.random() * 6
      const height = (Math.random() - 0.5) * 50

      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius

      // Random color between rose gold and bronze
      const color = Math.random() > 0.5 ? roseGold : bronze
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime()
      particlesRef.current.rotation.y = time * 0.05

      // Gentle undulating movement
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <color attach="background" args={['#F8F6F3']} />
      <fog attach="fog" args={['#F8F6F3', 10, 50]} />

      {/* Dynamic lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.6} />
      <pointLight position={[0, 10, 10]} intensity={1} color="#D4AF7A" />
      <pointLight position={[0, -10, -10]} intensity={0.8} color="#9C7D5C" />
      <spotLight
        position={[15, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#D4AF7A"
        castShadow
      />

      <DNAHelix mouse={mouse} />
      <FloatingParticles />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.8}
        />
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={3}
          height={480}
        />
      </EffectComposer>
    </>
  )
}

export default function DNAHelix3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent) => {
    setMouse({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    })
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 55 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        shadows
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  )
}
