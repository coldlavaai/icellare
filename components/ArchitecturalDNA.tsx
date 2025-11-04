import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/stores/scrollStore'
import { Line } from '@react-three/drei'

interface DNAGeometry {
  strand1: THREE.Vector3[]
  strand2: THREE.Vector3[]
  basePairs: BasePair[]
}

interface BasePair {
  start: THREE.Vector3
  end: THREE.Vector3
  type: 'A' | 'T' | 'G' | 'C'
  angle: number
}

// Generate perfect parametric DNA helix
function generateDNAHelix() {
  const height = 20
  const radius = 2
  const turns = 10
  const segmentsPerTurn = 50
  const totalPoints = turns * segmentsPerTurn

  const strand1: THREE.Vector3[] = []
  const strand2: THREE.Vector3[] = []
  const basePairs: BasePair[] = []

  for (let i = 0; i < totalPoints; i++) {
    const t = (i / totalPoints) * turns * Math.PI * 2
    const y = (i / totalPoints) * height - height / 2

    // First strand
    const x1 = Math.cos(t) * radius
    const z1 = Math.sin(t) * radius
    strand1.push(new THREE.Vector3(x1, y, z1))

    // Second strand (180° offset)
    const x2 = Math.cos(t + Math.PI) * radius
    const z2 = Math.sin(t + Math.PI) * radius
    strand2.push(new THREE.Vector3(x2, y, z2))

    // Base pairs (every 10th point = proper DNA spacing)
    if (i % 10 === 0) {
      const baseTypes: ('A' | 'T' | 'G' | 'C')[] = ['A', 'T', 'G', 'C']
      const baseType = baseTypes[Math.floor(Math.random() * 4)]

      basePairs.push({
        start: new THREE.Vector3(x1, y, z1),
        end: new THREE.Vector3(x2, y, z2),
        type: baseType,
        angle: t
      })
    }
  }

  return { strand1, strand2, basePairs }
}

// Base pair colors (matching site color scheme)
const basePairColors = {
  A: 0x85714d, // Adenine - gold
  T: 0xc7d9ed, // Thymine - soft blue
  G: 0xa89968, // Guanine - light gold
  C: 0xb3c9e0  // Cytosine - lighter blue
}

export function ArchitecturalDNA() {
  const dnaRef = useRef<THREE.Group>(null)
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  // Generate DNA geometry once
  const dnaGeometry = useMemo(() => generateDNAHelix(), [])

  // Create tube geometries for strands
  const { strand1Geometry, strand2Geometry } = useMemo(() => {
    const curve1 = new THREE.CatmullRomCurve3(dnaGeometry.strand1)
    const curve2 = new THREE.CatmullRomCurve3(dnaGeometry.strand2)

    return {
      strand1Geometry: new THREE.TubeGeometry(curve1, dnaGeometry.strand1.length, 0.08, 16, false),
      strand2Geometry: new THREE.TubeGeometry(curve2, dnaGeometry.strand2.length, 0.08, 16, false)
    }
  }, [dnaGeometry])

  // Animate DNA based on scroll
  useFrame((state) => {
    if (!dnaRef.current) return

    // Rotation tied to scroll
    dnaRef.current.rotation.y = scrollProgress * Math.PI * 4 // 2 full rotations

    // Slow continuous rotation
    dnaRef.current.rotation.y += state.clock.elapsedTime * 0.05

    // Vertical position based on scroll
    dnaRef.current.position.y = (scrollProgress - 0.5) * 10

    // Subtle pulsing scale
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02
    dnaRef.current.scale.set(pulse, pulse, pulse)
  })

  return (
    <group ref={dnaRef} position={[0, 0, 0]}>
      {/* Strand 1 - Shimmering gold glass */}
      <mesh geometry={strand1Geometry}>
        <meshPhysicalMaterial
          color="#85714d"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.95}
          transmission={0.3}
          thickness={0.5}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
          emissive="#a89968"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Strand 2 - Soft blue glass */}
      <mesh geometry={strand2Geometry}>
        <meshPhysicalMaterial
          color="#c7d9ed"
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.95}
          transmission={0.3}
          thickness={0.5}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={2}
          emissive="#b3c9e0"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Base Pairs */}
      <group>
        {dnaGeometry.basePairs.map((pair, i) => {
          const color = basePairColors[pair.type]

          return (
            <group key={i}>
              {/* Connection line */}
              <Line
                points={[pair.start, pair.end]}
                color={color}
                lineWidth={2}
                transparent
                opacity={0.8}
              />

              {/* Base sphere at start */}
              <mesh position={pair.start}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={1.5}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>

              {/* Base sphere at end */}
              <mesh position={pair.end}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={1.5}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>
            </group>
          )
        })}
      </group>
    </group>
  )
}
