import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/stores/scrollStore'

// Color scheme
const GOLD = new THREE.Color(0x85714d)
const GOLD_LIGHT = new THREE.Color(0xa89968)
const BLUE_ACCENT = new THREE.Color(0xc7d9ed)
const WHITE = new THREE.Color(0xFFFFFF)

interface MolecularParticle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  rotation: THREE.Euler
  rotationSpeed: THREE.Vector3
  type: 'peptide' | 'platelet' | 'antibody' | 'collagen' | 'growth-factor' | 'hormone' | 'vitamin' | 'stem-cell' | 'sperm' | 'egg'
  color: THREE.Color
  scale: number
}

// Peptide chain - connected amino acids
function createPeptideGeometry() {
  const group = new THREE.Group()
  const aminoAcids = 8

  for (let i = 0; i < aminoAcids; i++) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 8, 8)
    )
    sphere.position.x = i * 0.1 - (aminoAcids * 0.1) / 2
    sphere.position.y = Math.sin(i * 0.5) * 0.03
    group.add(sphere)

    // Connection between amino acids
    if (i < aminoAcids - 1) {
      const connection = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.1, 4)
      )
      connection.position.x = sphere.position.x + 0.05
      connection.position.y = (sphere.position.y + Math.sin((i + 1) * 0.5) * 0.03) / 2
      connection.rotation.z = Math.PI / 2
      group.add(connection)
    }
  }

  return group
}

// Platelet - irregular disc with pseudopods
function createPlateletGeometry() {
  const group = new THREE.Group()

  // Main disc
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.04, 8)
  )
  group.add(disc)

  // Pseudopods (extensions)
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const pod = new THREE.Mesh(
      new THREE.ConeGeometry(0.02, 0.08, 4)
    )
    pod.position.x = Math.cos(angle) * 0.12
    pod.position.z = Math.sin(angle) * 0.12
    pod.rotation.x = Math.PI / 2
    pod.rotation.z = angle
    group.add(pod)
  }

  return group
}

// Antibody - Y-shaped structure
function createAntibodyGeometry() {
  const group = new THREE.Group()

  // Stem of Y
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.2, 6)
  )
  stem.position.y = -0.1
  group.add(stem)

  // Two arms of Y
  for (let i = 0; i < 2; i++) {
    const arm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.15, 6)
    )
    arm.position.x = i === 0 ? -0.06 : 0.06
    arm.position.y = 0.05
    arm.rotation.z = (i === 0 ? 1 : -1) * Math.PI / 4
    group.add(arm)

    // Binding site (sphere at end)
    const bindingSite = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8)
    )
    bindingSite.position.x = i === 0 ? -0.12 : 0.12
    bindingSite.position.y = 0.12
    group.add(bindingSite)
  }

  return group
}

// Collagen - triple helix
function createCollagenGeometry() {
  const group = new THREE.Group()
  const height = 0.3
  const radius = 0.04
  const turns = 3

  // Three intertwined helices
  for (let strand = 0; strand < 3; strand++) {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= 20; i++) {
      const t = (i / 20) * turns * Math.PI * 2 + (strand * Math.PI * 2 / 3)
      const y = (i / 20) * height - height / 2
      const x = Math.cos(t) * radius
      const z = Math.sin(t) * radius
      points.push(new THREE.Vector3(x, y, z))
    }
    const curve = new THREE.CatmullRomCurve3(points)
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.015, 4, false)
    const tube = new THREE.Mesh(tubeGeometry)
    group.add(tube)
  }

  return group
}

// Growth factor - folded protein structure
function createGrowthFactorGeometry() {
  const group = new THREE.Group()

  // Core structure
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.08, 1)
  )
  group.add(core)

  // Protruding domains
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2
    const domain = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 6, 6)
    )
    domain.position.x = Math.cos(angle) * 0.1
    domain.position.z = Math.sin(angle) * 0.1
    group.add(domain)
  }

  return group
}

// Hormone - ring structure (steroid-like)
function createHormoneGeometry() {
  const group = new THREE.Group()

  // Ring structures
  const ringPositions = [
    { x: -0.06, y: 0 },
    { x: 0, y: 0.06 },
    { x: 0.06, y: 0 },
    { x: 0, y: -0.06 }
  ]

  ringPositions.forEach((pos) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.03, 0.01, 6, 8)
    )
    ring.position.x = pos.x
    ring.position.y = pos.y
    ring.rotation.x = Math.PI / 2
    group.add(ring)
  })

  return group
}

// Vitamin - molecular structure (hexagonal with bonds)
function createVitaminGeometry() {
  const group = new THREE.Group()

  // Hexagonal ring
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const atom = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 6, 6)
    )
    atom.position.x = Math.cos(angle) * 0.06
    atom.position.z = Math.sin(angle) * 0.06
    group.add(atom)

    // Bond to next atom
    if (i < 5) {
      const nextAngle = ((i + 1) / 6) * Math.PI * 2
      const bond = new THREE.Mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.06, 4)
      )
      bond.position.x = (Math.cos(angle) + Math.cos(nextAngle)) * 0.03
      bond.position.z = (Math.sin(angle) + Math.sin(nextAngle)) * 0.03
      bond.rotation.z = -nextAngle + Math.PI / 2
      bond.rotation.y = Math.PI / 2
      group.add(bond)
    }
  }

  return group
}

// Stem cell - detailed with nucleus
function createStemCellGeometry() {
  const group = new THREE.Group()

  // Cell membrane
  const membrane = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 12, 12)
  )
  membrane.material = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.6,
    transmission: 0.5
  })
  group.add(membrane)

  // Nucleus
  const nucleus = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 10, 10)
  )
  group.add(nucleus)

  return group
}

// Sperm cell
function createSpermGeometry() {
  const group = new THREE.Group()

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.06, 8, 8)
  )
  head.scale.set(1, 1.3, 0.8)
  head.position.y = 0.08
  group.add(head)

  // Tail
  const tailPoints: THREE.Vector3[] = []
  for (let i = 0; i <= 10; i++) {
    const t = i / 10
    const y = -t * 0.3
    const x = Math.sin(t * Math.PI * 3) * 0.02
    tailPoints.push(new THREE.Vector3(x, y, 0))
  }
  const tailCurve = new THREE.CatmullRomCurve3(tailPoints)
  const tailGeometry = new THREE.TubeGeometry(tailCurve, 10, 0.008, 4, false)
  const tail = new THREE.Mesh(tailGeometry)
  group.add(tail)

  return group
}

// Egg cell with corona radiata
function createEggGeometry() {
  const group = new THREE.Group()

  // Main egg
  const egg = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 12, 12)
  )
  group.add(egg)

  // Corona radiata spikes
  for (let i = 0; i < 15; i++) {
    const phi = Math.acos(-1 + (2 * i) / 15)
    const theta = Math.sqrt(15 * Math.PI) * phi

    const spike = new THREE.Mesh(
      new THREE.ConeGeometry(0.008, 0.04, 4)
    )
    const x = Math.cos(theta) * Math.sin(phi)
    const y = Math.sin(theta) * Math.sin(phi)
    const z = Math.cos(phi)
    spike.position.set(x * 0.11, y * 0.11, z * 0.11)
    spike.lookAt(0, 0, 0)
    spike.rotateX(Math.PI / 2)
    group.add(spike)
  }

  return group
}

export function MolecularParticles() {
  const particlesGroup = useRef<THREE.Group>(null)
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  const particles = useMemo(() => {
    const count = 80
    const particleData: MolecularParticle[] = []

    const types: MolecularParticle['type'][] = [
      'peptide', 'peptide', 'peptide',
      'platelet', 'platelet',
      'antibody', 'antibody',
      'collagen', 'collagen',
      'growth-factor', 'growth-factor',
      'hormone',
      'vitamin', 'vitamin',
      'stem-cell', 'stem-cell', 'stem-cell',
      'sperm', 'egg'
    ]

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40
      const y = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 40

      const type = types[i % types.length]

      let color: THREE.Color
      if (type === 'stem-cell' || type === 'egg' || type === 'collagen') {
        color = GOLD.clone()
      } else if (type === 'peptide' || type === 'antibody') {
        color = BLUE_ACCENT.clone()
      } else if (type === 'growth-factor' || type === 'hormone') {
        color = GOLD_LIGHT.clone()
      } else {
        color = WHITE.clone()
      }

      particleData.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008
        ),
        type,
        color,
        scale: 0.7 + Math.random() * 0.6
      })
    }

    return particleData
  }, [])

  useFrame((state) => {
    if (!particlesGroup.current) return

    particlesGroup.current.children.forEach((child, i) => {
      const particle = particles[i]

      particle.position.x += particle.velocity.x
      particle.position.y += particle.velocity.y
      particle.position.z += particle.velocity.z

      if (Math.abs(particle.position.x) > 20) particle.velocity.x *= -1
      if (Math.abs(particle.position.y) > 15) particle.velocity.y *= -1
      if (Math.abs(particle.position.z) > 20) particle.velocity.z *= -1

      particle.rotation.x += particle.rotationSpeed.x
      particle.rotation.y += particle.rotationSpeed.y
      particle.rotation.z += particle.rotationSpeed.z

      const scrollOffset = (scrollProgress - 0.5) * 10

      child.position.copy(particle.position)
      child.position.y += scrollOffset * 0.25
      child.rotation.copy(particle.rotation)

      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.4 + i * 0.05) * 0.08
      child.scale.setScalar(particle.scale * breathe)
    })
  })

  const particleMeshes = useMemo(() => {
    return particles.map((particle) => {
      let geometry: THREE.Group

      switch (particle.type) {
        case 'peptide':
          geometry = createPeptideGeometry()
          break
        case 'platelet':
          geometry = createPlateletGeometry()
          break
        case 'antibody':
          geometry = createAntibodyGeometry()
          break
        case 'collagen':
          geometry = createCollagenGeometry()
          break
        case 'growth-factor':
          geometry = createGrowthFactorGeometry()
          break
        case 'hormone':
          geometry = createHormoneGeometry()
          break
        case 'vitamin':
          geometry = createVitaminGeometry()
          break
        case 'stem-cell':
          geometry = createStemCellGeometry()
          break
        case 'sperm':
          geometry = createSpermGeometry()
          break
        case 'egg':
          geometry = createEggGeometry()
          break
        default:
          geometry = createStemCellGeometry()
      }

      const material = new THREE.MeshStandardMaterial({
        color: particle.color,
        emissive: particle.color,
        emissiveIntensity: 0.25,
        metalness: 0.7,
        roughness: 0.25,
        transparent: true,
        opacity: 0.85
      })

      geometry.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material
        }
      })

      return geometry
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
