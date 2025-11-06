'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function SimpleParticles() {
  const groupRef = useRef<THREE.Group>(null)

  // Create many simple particles with random properties
  const particles = useMemo(() => {
    const particleArray = []
    const particleCount = 80 // Many more particles

    for (let i = 0; i < particleCount; i++) {
      particleArray.push({
        id: i,
        // Random position in 3D space
        position: [
          (Math.random() - 0.5) * 40,  // x: -20 to 20
          (Math.random() - 0.5) * 30,  // y: -15 to 15
          (Math.random() - 0.5) * 40,  // z: -20 to 20 (varied depth)
        ] as [number, number, number],
        // Random size
        size: Math.random() * 0.08 + 0.02, // 0.02 to 0.1
        // Random color from brand palette
        color: [0xC9A961, 0x85A5C4, 0xB8B8B8, 0xD4D4D4, 0xB08D5C][Math.floor(Math.random() * 5)],
        // Random speed multipliers
        speedX: Math.random() * 0.3 + 0.1,
        speedY: Math.random() * 0.3 + 0.1,
        speedZ: Math.random() * 0.3 + 0.1,
        // Random phase offset for varied motion
        offset: Math.random() * Math.PI * 2,
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
}

function Particle({ position, size, color, speedX, speedY, speedZ, offset }: ParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      // Floating motion with random speed and offset
      meshRef.current.position.x = position[0] + Math.sin(time * speedX + offset) * 2
      meshRef.current.position.y = position[1] + Math.cos(time * speedY + offset) * 2
      meshRef.current.position.z = position[2] + Math.sin(time * speedZ + offset * 0.7) * 2

      // Subtle pulsing
      const pulseScale = 1 + Math.sin(time * 2 + offset) * 0.2
      meshRef.current.scale.setScalar(pulseScale)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.3}
        metalness={0}
        transmission={0.3}
        opacity={0.4}
        transparent
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}
