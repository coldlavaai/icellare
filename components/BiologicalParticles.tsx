import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/stores/scrollStore'

// Color palette from original site
const GOLD = new THREE.Color(0x85714d) // Rich dark gold
const GOLD_LIGHT = new THREE.Color(0xa89968) // Lighter gold for shimmer
const WHITE = new THREE.Color(0xFFFFFF)
const BLUE_ACCENT = new THREE.Color(0xc7d9ed) // Soft blue highlight

interface BiologicalParticle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  rotation: THREE.Euler
  rotationSpeed: THREE.Vector3
  type: 'stem-cell' | 'dna-helix' | 'sperm' | 'egg' | 'vitamin' | 'beauty'
  color: THREE.Color
  scale: number
}

// Create a mini DNA helix geometry
function createDNAHelixGeometry() {
  const points: THREE.Vector3[] = []
  const turns = 2
  const height = 0.6
  const radius = 0.1

  for (let i = 0; i <= 30; i++) {
    const t = (i / 30) * turns * Math.PI * 2
    const y = (i / 30) * height - height / 2
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    points.push(new THREE.Vector3(x, y, z))
  }

  const curve = new THREE.CatmullRomCurve3(points)
  return new THREE.TubeGeometry(curve, 30, 0.02, 6, false)
}

// Create sperm cell geometry
function createSpermGeometry() {
  const group = new THREE.Group()

  // Head (ellipsoid)
  const headGeometry = new THREE.SphereGeometry(0.08, 8, 8)
  headGeometry.scale(1, 1.3, 0.8)
  const head = new THREE.Mesh(headGeometry)
  head.position.set(0, 0.1, 0)

  // Tail (curved line)
  const tailPoints: THREE.Vector3[] = []
  for (let i = 0; i <= 15; i++) {
    const t = i / 15
    const y = -t * 0.4
    const x = Math.sin(t * Math.PI * 4) * 0.03
    tailPoints.push(new THREE.Vector3(x, y, 0))
  }
  const tailCurve = new THREE.CatmullRomCurve3(tailPoints)
  const tailGeometry = new THREE.TubeGeometry(tailCurve, 15, 0.01, 4, false)
  const tail = new THREE.Mesh(tailGeometry)

  group.add(head, tail)
  return group
}

// Create egg cell geometry
function createEggGeometry() {
  const geometry = new THREE.SphereGeometry(0.12, 16, 16)

  // Add corona radiata (spikes around egg)
  const spikesGroup = new THREE.Group()
  for (let i = 0; i < 20; i++) {
    const phi = Math.acos(-1 + (2 * i) / 20)
    const theta = Math.sqrt(20 * Math.PI) * phi

    const x = Math.cos(theta) * Math.sin(phi) * 0.12
    const y = Math.sin(theta) * Math.sin(phi) * 0.12
    const z = Math.cos(phi) * 0.12

    const spike = new THREE.Mesh(
      new THREE.ConeGeometry(0.01, 0.05, 4)
    )
    spike.position.set(x, y, z)
    spike.lookAt(0, 0, 0)
    spike.rotateX(Math.PI / 2)
    spikesGroup.add(spike)
  }

  const eggMesh = new THREE.Mesh(geometry)
  const group = new THREE.Group()
  group.add(eggMesh, spikesGroup)

  return group
}

// Create vitamin molecule geometry (hexagonal)
function createVitaminGeometry() {
  const shape = new THREE.Shape()
  const radius = 0.08

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    if (i === 0) {
      shape.moveTo(x, y)
    } else {
      shape.lineTo(x, y)
    }
  }
  shape.closePath()

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.02,
    bevelEnabled: false
  })

  return geometry
}

export function BiologicalParticles() {
  const particlesGroup = useRef<THREE.Group>(null)
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  // Generate particle data
  const particles = useMemo(() => {
    const count = 60 // Fewer but more detailed particles
    const particleData: BiologicalParticle[] = []

    const types: BiologicalParticle['type'][] = [
      'stem-cell', 'stem-cell', 'stem-cell', // More stem cells
      'dna-helix', 'dna-helix',
      'sperm', 'egg',
      'vitamin', 'vitamin',
      'beauty'
    ]

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 40

      const type = types[i % types.length]

      // Assign colors based on type
      let color: THREE.Color
      let shimmerColor: THREE.Color | undefined
      if (type === 'stem-cell' || type === 'egg') {
        color = GOLD.clone()
        shimmerColor = GOLD_LIGHT.clone() // Shimmering effect for gold
      } else if (type === 'vitamin' || type === 'beauty') {
        color = BLUE_ACCENT.clone()
      } else {
        // DNA helix and sperm in white
        color = WHITE.clone()
      }

      particleData.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        type,
        color,
        scale: 0.8 + Math.random() * 0.4
      })
    }

    return particleData
  }, [])

  // Animate particles
  useFrame((state) => {
    if (!particlesGroup.current) return

    particlesGroup.current.children.forEach((child, i) => {
      const particle = particles[i]

      // Move particle
      particle.position.x += particle.velocity.x
      particle.position.y += particle.velocity.y
      particle.position.z += particle.velocity.z

      // Bounce at boundaries
      if (Math.abs(particle.position.x) > 20) particle.velocity.x *= -1
      if (Math.abs(particle.position.y) > 15) particle.velocity.y *= -1
      if (Math.abs(particle.position.z) > 20) particle.velocity.z *= -1

      // Rotate particle
      particle.rotation.x += particle.rotationSpeed.x
      particle.rotation.y += particle.rotationSpeed.y
      particle.rotation.z += particle.rotationSpeed.z

      // Scroll-based vertical offset
      const scrollOffset = (scrollProgress - 0.5) * 10

      // Update child mesh
      child.position.copy(particle.position)
      child.position.y += scrollOffset * 0.3
      child.rotation.copy(particle.rotation)

      // Gentle breathing animation
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.1
      child.scale.setScalar(particle.scale * breathe)
    })
  })

  // Create meshes for each particle type
  const particleMeshes = useMemo(() => {
    const stemCellGeo = new THREE.SphereGeometry(0.1, 16, 16)
    const dnaGeo = createDNAHelixGeometry()
    const vitaminGeo = createVitaminGeometry()

    return particles.map((particle) => {
      let geometry: THREE.BufferGeometry | THREE.Group

      switch (particle.type) {
        case 'stem-cell':
          geometry = stemCellGeo
          break
        case 'dna-helix':
          geometry = dnaGeo
          break
        case 'sperm':
          return createSpermGeometry()
        case 'egg':
          return createEggGeometry()
        case 'vitamin':
          geometry = vitaminGeo
          break
        case 'beauty':
          geometry = new THREE.TorusGeometry(0.08, 0.03, 8, 12)
          break
        default:
          geometry = stemCellGeo
      }

      const material = new THREE.MeshStandardMaterial({
        color: particle.color,
        emissive: particle.color,
        emissiveIntensity: 0.3,
        metalness: 0.6,
        roughness: 0.3,
        transparent: true,
        opacity: 0.8
      })

      if (geometry instanceof THREE.Group) {
        // For groups (sperm, egg), apply material to all children
        geometry.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material
          }
        })
        return geometry
      } else {
        return new THREE.Mesh(geometry, material)
      }
    })
  }, [particles])

  return (
    <group ref={particlesGroup}>
      {particleMeshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  )
}
