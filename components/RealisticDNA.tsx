'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Create organic normal map texture for surface detail
function createOrganicNormalMap() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  if (!ctx) return null

  const imageData = ctx.createImageData(size, size)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4

      // Add subtle random variation
      const variation = Math.random() * 30 - 15

      imageData.data[i] = 128 + variation     // R
      imageData.data[i + 1] = 128 + variation // G
      imageData.data[i + 2] = 255             // B (always up)
      imageData.data[i + 3] = 255             // A
    }
  }

  ctx.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)

  return texture
}

// Add subtle vertex displacement for organic appearance
function addVertexDisplacement(geometry: THREE.BufferGeometry, intensity = 0.02) {
  const positions = geometry.attributes.position
  const normals = geometry.attributes.normal

  if (!positions || !normals) return

  for (let i = 0; i < positions.count; i++) {
    const nx = normals.getX(i)
    const ny = normals.getY(i)
    const nz = normals.getZ(i)

    const displacement = (Math.random() - 0.5) * intensity * 2

    positions.setX(i, positions.getX(i) + nx * displacement)
    positions.setY(i, positions.getY(i) + ny * displacement)
    positions.setZ(i, positions.getZ(i) + nz * displacement)
  }

  positions.needsUpdate = true
  geometry.computeVertexNormals()
}

// Generate DNA helix with ORIGINAL DIMENSIONS
function generateDNAHelix() {
  const height = 16          // Same as ArchitecturalDNA
  const radius = 2.3         // Same as ArchitecturalDNA
  const turns = 6
  const segmentsPerTurn = 80
  const totalPoints = turns * segmentsPerTurn

  const strand1: THREE.Vector3[] = []
  const strand2: THREE.Vector3[] = []
  const basePairs: Array<{
    point1: THREE.Vector3
    point2: THREE.Vector3
    type: 'A' | 'T' | 'G' | 'C'
  }> = []

  for (let i = 0; i < totalPoints; i++) {
    const t = (i / totalPoints) * turns * Math.PI * 2
    const y = (i / totalPoints) * height - height / 2

    // Right-handed helix
    const x1 = Math.cos(t) * radius
    const z1 = Math.sin(t) * radius

    const x2 = Math.cos(t + Math.PI) * radius
    const z2 = Math.sin(t + Math.PI) * radius

    strand1.push(new THREE.Vector3(x1, y, z1))
    strand2.push(new THREE.Vector3(x2, y, z2))

    // Base pairs
    if (i % 10 === 0) {
      const baseTypes: ('A' | 'T' | 'G' | 'C')[] = ['A', 'T', 'G', 'C']
      basePairs.push({
        point1: new THREE.Vector3(x1, y, z1),
        point2: new THREE.Vector3(x2, y, z2),
        type: baseTypes[Math.floor(Math.random() * 4)]
      })
    }
  }

  return { strand1, strand2, basePairs }
}

// Scientifically accurate base pair colors
const basePairColors = {
  A: 0xff6b6b, // Adenine - red/coral
  T: 0x4ecdc4, // Thymine - cyan/turquoise
  G: 0xffe66d, // Guanine - yellow/gold
  C: 0x95e1d3  // Cytosine - mint green
}

interface RealisticDNAProps {
  growthProgress?: number
  enableGrowth?: boolean
  scrollProgress?: number
}

export function RealisticDNA({ growthProgress = 1, enableGrowth = false, scrollProgress = 0 }: RealisticDNAProps = {}) {
  const dnaRef = useRef<THREE.Group>(null)
  const baseRotation = useRef(0)

  // Generate DNA geometry
  const dnaData = useMemo(() => generateDNAHelix(), [])

  // Create strand geometries with flattened ribbon shape
  const { strand1Geometry, strand2Geometry, normalMap } = useMemo(() => {
    const curve1 = new THREE.CatmullRomCurve3(dnaData.strand1)
    const curve2 = new THREE.CatmullRomCurve3(dnaData.strand2)

    // Use same tube radius as ArchitecturalDNA
    const strandRadius = 0.1

    const geom1 = new THREE.TubeGeometry(curve1, dnaData.strand1.length, strandRadius, 20, false)
    const geom2 = new THREE.TubeGeometry(curve2, dnaData.strand2.length, strandRadius, 20, false)

    // FLATTEN TO RIBBON SHAPE (2.5:1 ratio as requested)
    geom1.scale(1.5, 0.6, 1.0)
    geom2.scale(1.5, 0.6, 1.0)

    // Add organic irregularity
    addVertexDisplacement(geom1, 0.01)
    addVertexDisplacement(geom2, 0.01)

    // Create normal map
    const normalTexture = createOrganicNormalMap()

    return {
      strand1Geometry: geom1,
      strand2Geometry: geom2,
      normalMap: normalTexture
    }
  }, [dnaData])

  // Animate DNA (same logic as ArchitecturalDNA)
  useFrame((state, delta) => {
    if (!dnaRef.current) return

    if (enableGrowth) {
      // During growth animation
      baseRotation.current += delta * 0.02
      dnaRef.current.rotation.y = baseRotation.current

      // DNA builds from bottom to top
      dnaRef.current.scale.y = growthProgress
      dnaRef.current.position.y = -(1 - growthProgress) * 8
    } else {
      // After growth completes - slow idle rotation that tracks with scroll

      // Idle rotation (0.1 rad/sec)
      baseRotation.current += delta * 0.1

      // Scroll-based rotation
      const scrollRotation = scrollProgress * Math.PI * 2

      // Combine idle rotation with scroll-based rotation
      dnaRef.current.rotation.y = baseRotation.current + scrollRotation

      // Stay centered vertically
      dnaRef.current.position.y = 0

      // No scale changes
      dnaRef.current.scale.set(1, 1, 1)
    }
  })

  return (
    <group ref={dnaRef} position={[0, 0, 0]}>
      {/* Strand 1 - Photorealistic with flattened ribbon shape */}
      <mesh geometry={strand1Geometry}>
        <meshPhysicalMaterial
          color={0xb8b8b8}
          transmission={0.3}
          thickness={0.8}
          roughness={0.4}
          metalness={0}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
          ior={1.4}
          sheen={0.6}
          sheenRoughness={0.7}
          emissive={0x555555}
          emissiveIntensity={0.05}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.3, 0.3)}
        />
      </mesh>

      {/* Strand 2 - Photorealistic with flattened ribbon shape */}
      <mesh geometry={strand2Geometry}>
        <meshPhysicalMaterial
          color={0xb8b8b8}
          transmission={0.3}
          thickness={0.8}
          roughness={0.4}
          metalness={0}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
          ior={1.4}
          sheen={0.6}
          sheenRoughness={0.7}
          emissive={0x555555}
          emissiveIntensity={0.05}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.3, 0.3)}
        />
      </mesh>

      {/* Base Pairs with scientifically accurate colors */}
      <group>
        {dnaData.basePairs.map((pair, i) => {
          const color = basePairColors[pair.type]
          const nucleotideRadius = 0.15 // Same as ArchitecturalDNA

          // Calculate connector
          const direction = new THREE.Vector3().subVectors(pair.point2, pair.point1)
          const length = direction.length()
          const midpoint = new THREE.Vector3().addVectors(pair.point1, pair.point2).multiplyScalar(0.5)

          // Proper 3D orientation for connector
          const quaternion = new THREE.Quaternion()
          quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.normalize()
          )

          return (
            <group key={i}>
              {/* Nucleotide 1 */}
              <mesh position={pair.point1}>
                <sphereGeometry args={[nucleotideRadius, 16, 16]} />
                <meshPhysicalMaterial
                  color={color}
                  transmission={0.2}
                  thickness={0.5}
                  roughness={0.35}
                  metalness={0}
                  clearcoat={0.4}
                  clearcoatRoughness={0.3}
                  ior={1.4}
                  emissive={color}
                  emissiveIntensity={0.15}
                />
              </mesh>

              {/* Nucleotide 2 */}
              <mesh position={pair.point2}>
                <sphereGeometry args={[nucleotideRadius, 16, 16]} />
                <meshPhysicalMaterial
                  color={color}
                  transmission={0.2}
                  thickness={0.5}
                  roughness={0.35}
                  metalness={0}
                  clearcoat={0.4}
                  clearcoatRoughness={0.3}
                  ior={1.4}
                  emissive={color}
                  emissiveIntensity={0.15}
                />
              </mesh>

              {/* Connector with proper 3D orientation */}
              <mesh position={midpoint} quaternion={quaternion}>
                <cylinderGeometry args={[0.05, 0.05, length, 8]} />
                <meshPhysicalMaterial
                  color={color}
                  transmission={0.4}
                  thickness={0.6}
                  roughness={0.4}
                  metalness={0}
                  clearcoat={0.3}
                  ior={1.4}
                  opacity={0.85}
                  transparent={true}
                />
              </mesh>
            </group>
          )
        })}
      </group>
    </group>
  )
}
