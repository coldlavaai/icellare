import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/stores/scrollStore'

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  size: number
  color: THREE.Color
}

export function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  // Generate particles
  const { positions, colors, sizes, particles } = useMemo(() => {
    const count = 300
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const particles: Particle[] = []

    // Particle colors - subtle medical/scientific palette
    const particleColors = [
      new THREE.Color(0x64c8ff), // Light blue
      new THREE.Color(0xff6b9d), // Light pink
      new THREE.Color(0xffe66d), // Light yellow
      new THREE.Color(0x95e1d3), // Light cyan
      new THREE.Color(0xffffff)  // White
    ]

    for (let i = 0; i < count; i++) {
      // Distribute particles in a volume around the scene
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 40

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      // Random color from palette
      const color = particleColors[Math.floor(Math.random() * particleColors.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      // Varying sizes for depth
      sizes[i] = Math.random() * 0.3 + 0.1

      // Store particle data for animation
      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        size: sizes[i],
        color: color
      })
    }

    return { positions, colors, sizes, particles }
  }, [])

  // Animate particles
  useFrame((state) => {
    if (!particlesRef.current) return

    const positionAttribute = particlesRef.current.geometry.attributes.position
    const positions = positionAttribute.array as Float32Array

    particles.forEach((particle, i) => {
      // Gentle floating motion
      particle.position.x += particle.velocity.x
      particle.position.y += particle.velocity.y
      particle.position.z += particle.velocity.z

      // Wrap around if particles go too far
      if (Math.abs(particle.position.x) > 20) particle.velocity.x *= -1
      if (Math.abs(particle.position.y) > 15) particle.velocity.y *= -1
      if (Math.abs(particle.position.z) > 20) particle.velocity.z *= -1

      // Scroll-based vertical movement
      const scrollOffset = (scrollProgress - 0.5) * 10

      positions[i * 3] = particle.position.x
      positions[i * 3 + 1] = particle.position.y + scrollOffset * 0.3
      positions[i * 3 + 2] = particle.position.z

      // Subtle swirl effect
      const swirlX = Math.sin(state.clock.elapsedTime * 0.2 + i * 0.1) * 0.01
      const swirlZ = Math.cos(state.clock.elapsedTime * 0.2 + i * 0.1) * 0.01
      positions[i * 3] += swirlX
      positions[i * 3 + 2] += swirlZ
    })

    positionAttribute.needsUpdate = true

    // Gentle rotation of entire particle system
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
