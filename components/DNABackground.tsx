'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useScroll } from 'framer-motion'
import * as THREE from 'three'

// DNA Helix that rotates based on scroll
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null)
  const { scrollYProgress } = useScroll()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    const scrollValue = scrollYProgress.get()

    // Main rotation from scroll - 8 full rotations
    groupRef.current.rotation.y = scrollValue * Math.PI * 8

    // Subtle mouse parallax tilt
    groupRef.current.rotation.x = mousePos.y * 0.2
    groupRef.current.rotation.z = -mousePos.x * 0.1

    // Gentle floating animation
    groupRef.current.position.y = Math.sin(time * 0.2) * 0.5
  })

  // Create helix with 200 base pairs
  const helixData = []
  const segments = 200
  const height = 50
  const radius = 3
  const turns = 6

  for (let i = 0; i < segments; i++) {
    const t = i / segments
    const angle = t * Math.PI * 2 * turns
    const y = (t - 0.5) * height

    const x1 = Math.cos(angle) * radius
    const z1 = Math.sin(angle) * radius
    const x2 = Math.cos(angle + Math.PI) * radius
    const z2 = Math.sin(angle + Math.PI) * radius

    helixData.push({
      key: i,
      pos1: [x1, y, z1] as [number, number, number],
      pos2: [x2, y, z2] as [number, number, number],
      y
    })
  }

  return (
    <group ref={groupRef}>
      {helixData.map((bp, i) => (
        <group key={bp.key}>
          {/* Base pair spheres */}
          <mesh position={bp.pos1}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#D4AF7A"
              emissive="#D4AF7A"
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          <mesh position={bp.pos2}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#9C7D5C"
              emissive="#9C7D5C"
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Connecting bar every 3rd base pair */}
          {i % 3 === 0 && (
            <mesh
              position={[
                (bp.pos1[0] + bp.pos2[0]) / 2,
                bp.y,
                (bp.pos1[2] + bp.pos2[2]) / 2
              ]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.06, 0.06, 6, 8]} />
              <meshStandardMaterial
                color="#B89968"
                emissive="#B89968"
                emissiveIntensity={0.3}
                transparent
                opacity={0.6}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2
        const radius = 8 + Math.random() * 4
        const height = (Math.random() - 0.5) * 40

        return (
          <mesh
            key={`particle-${i}`}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color="#D4AF7A"
              emissive="#D4AF7A"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function DNABackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#F8F6F3']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#fff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#D4AF7A" />
        <pointLight position={[0, 0, 10]} intensity={1.5} color="#D4AF7A" />
        <DNAHelix />
      </Canvas>
    </div>
  )
}
