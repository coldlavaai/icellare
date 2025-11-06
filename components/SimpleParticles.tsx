'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SimpleParticles() {
  const groupRef = useRef<THREE.Group>(null)

  // Create many simple particles with random properties - SPACE THEME
  const particles = useMemo(() => {
    const particleArray = []
    const particleCount = 80 // Many more particles

    for (let i = 0; i < particleCount; i++) {
      // Just a few particles are cells (about 6-7%)
      const isCell = Math.random() < 0.075

      particleArray.push({
        id: i,
        // Random position in 3D space
        position: [
          (Math.random() - 0.5) * 40,  // x: -20 to 20
          (Math.random() - 0.5) * 30,  // y: -15 to 15
          (Math.random() - 0.5) * 40,  // z: -20 to 20 (varied depth)
        ] as [number, number, number],
        // Random size
        size: isCell ? (Math.random() * 0.15 + 0.15) : (Math.random() * 0.08 + 0.02), // Cells are bigger: 0.15-0.3, particles: 0.02-0.1
        // Random color - mostly white/grey/light blue with occasional pink
        color: (() => {
          const rand = Math.random()
          if (rand < 0.4) return 0xFFFFFF  // 40% white
          if (rand < 0.7) return 0xC0C0C0  // 30% grey
          if (rand < 0.9) return 0xADD8E6  // 20% light blue
          return 0xFFB6C1                   // 10% light pink
        })(),
        // Random speed multipliers
        speedX: Math.random() * 0.3 + 0.1,
        speedY: Math.random() * 0.3 + 0.1,
        speedZ: Math.random() * 0.3 + 0.1,
        // Random phase offset for varied motion
        offset: Math.random() * Math.PI * 2,
        // Cell flag
        isCell,
      })
    }
    return particleArray
  }, [])

  // Animate particles
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      // Gentle group drift
      groupRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          position={particle.position}
          size={particle.size}
          color={particle.color}
          speedX={particle.speedX}
          speedY={particle.speedY}
          speedZ={particle.speedZ}
          offset={particle.offset}
          isCell={particle.isCell}
        />
      ))}
    </group>
  )
}

interface ParticleProps {
  position: [number, number, number]
  size: number
  color: number
  speedX: number
  speedY: number
  speedZ: number
  offset: number
  isCell: boolean
}

function Particle({ position, size, color, speedX, speedY, speedZ, offset, isCell }: ParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const targetRef = groupRef.current || meshRef.current
    if (targetRef) {
      const time = state.clock.elapsedTime
      // Floating motion with random speed and offset
      targetRef.position.x = position[0] + Math.sin(time * speedX + offset) * 2
      targetRef.position.y = position[1] + Math.cos(time * speedY + offset) * 2
      targetRef.position.z = position[2] + Math.sin(time * speedZ + offset * 0.7) * 2

      // Subtle pulsing
      const pulseScale = 1 + Math.sin(time * 2 + offset) * 0.2
      targetRef.scale.setScalar(pulseScale)
    }
  })

  // Cell-like particle with nucleus
  if (isCell) {
    return (
      <group ref={groupRef} position={position}>
        {/* Outer cell membrane - very transparent */}
        <mesh>
          <sphereGeometry args={[size, 24, 24]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.2}
            metalness={0.1}
            transmission={0.9}
            opacity={0.1}
            transparent
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Inner nucleus - more visible */}
        <mesh>
          <sphereGeometry args={[size * 0.35, 16, 16]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.1}
            metalness={0.3}
            transmission={0.5}
            opacity={0.4}
            transparent
            emissive={color}
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    )
  }

  // Regular particle - more translucent
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.3}
        metalness={0}
        transmission={0.6}
        opacity={0.25}
        transparent
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}
