'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import dnaCoords from '@/public/dna-coords.json'

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

// Extend the DNA structure by repeating it vertically
function extendDNAStructure(originalPoints: Array<{x: number, y: number, z: number}>, targetHeight: number = 16) {
  const extended: THREE.Vector3[] = []

  // Original structure spans from -8 to 8 (16 units)
  const originalHeight = 16
  const repetitions = Math.ceil(targetHeight / originalHeight)

  for (let rep = -Math.floor(repetitions / 2); rep <= Math.floor(repetitions / 2); rep++) {
    for (const point of originalPoints) {
      extended.push(new THREE.Vector3(
        point.x,
        point.y + (rep * originalHeight),
        point.z
      ))
    }
  }

  return extended
}

// Base pair colors (gold, silver, grey tones)
const basePairColors = [
  0xC9A961, // Gold
  0xB8B8B8, // Silver/Grey
  0xA0A0A0, // Darker Grey
  0xD4D4D4  // Light Silver
]

interface RealStructureDNAProps {
  growthProgress?: number
  enableGrowth?: boolean
  scrollProgress?: number
}

export function RealStructureDNA({ growthProgress = 1, enableGrowth = false, scrollProgress = 0 }: RealStructureDNAProps = {}) {
  const dnaRef = useRef<THREE.Group>(null)
  const baseRotation = useRef(0)
  const SCALE_FACTOR = 0.65 // Same scale as before

  // Generate DNA geometry from real structure
  const { strand1Points, strand2Points, normalMap } = useMemo(() => {
    // Extend the real structure
    const strand1Extended = extendDNAStructure(dnaCoords.strand1, 16)
    const strand2Extended = extendDNAStructure(dnaCoords.strand2, 16)

    // Create smooth curves from the extended points
    const curve1 = new THREE.CatmullRomCurve3(strand1Extended)
    const curve2 = new THREE.CatmullRomCurve3(strand2Extended)

    // Sample the curves to get smoother interpolated points
    const sampleCount = 200
    const sampledStrand1 = []
    const sampledStrand2 = []

    for (let i = 0; i <= sampleCount; i++) {
      const t = i / sampleCount
      sampledStrand1.push(curve1.getPoint(t))
      sampledStrand2.push(curve2.getPoint(t))
    }

    const normalTexture = createOrganicNormalMap()

    return {
      strand1Points: sampledStrand1,
      strand2Points: sampledStrand2,
      normalMap: normalTexture
    }
  }, [])

  // Create tube geometries
  const { strand1Geometry, strand2Geometry } = useMemo(() => {
    const curve1 = new THREE.CatmullRomCurve3(strand1Points)
    const curve2 = new THREE.CatmullRomCurve3(strand2Points)

    const geom1 = new THREE.TubeGeometry(curve1, strand1Points.length, 0.12, 16, false)
    const geom2 = new THREE.TubeGeometry(curve2, strand2Points.length, 0.12, 16, false)

    return {
      strand1Geometry: geom1,
      strand2Geometry: geom2
    }
  }, [strand1Points, strand2Points])

  // Animate DNA (same as before)
  useFrame((state, delta) => {
    if (!dnaRef.current) return

    if (enableGrowth) {
      baseRotation.current += delta * 0.02
      dnaRef.current.rotation.y = baseRotation.current
      dnaRef.current.scale.y = growthProgress
      dnaRef.current.position.y = -(1 - growthProgress) * 8
    } else {
      baseRotation.current += delta * 0.1
      const scrollRotation = scrollProgress * Math.PI * 2
      dnaRef.current.rotation.y = baseRotation.current + scrollRotation
      dnaRef.current.position.y = 0
      dnaRef.current.scale.set(1, 1, 1)
    }
  })

  // Create base pairs between strands
  const basePairs = useMemo(() => {
    const pairs = []
    const interval = 10 // Every 10th point

    for (let i = 0; i < strand1Points.length; i += interval) {
      if (i < strand1Points.length && i < strand2Points.length) {
        pairs.push({
          start: strand1Points[i],
          end: strand2Points[i],
          color: basePairColors[i % basePairColors.length]
        })
      }
    }

    return pairs
  }, [strand1Points, strand2Points])

  return (
    <group ref={dnaRef} position={[0, 0, 0]} scale={SCALE_FACTOR}>
      {/* Strand 1 - GOLD helix */}
      <mesh geometry={strand1Geometry}>
        <meshPhysicalMaterial
          color="#C9A961"
          transmission={0.3}
          thickness={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          ior={1.33}
          roughness={0.4}
          metalness={0.15}
          sheen={0.8}
          sheenRoughness={0.6}
          sheenColor={new THREE.Color(0xE8DDB5)}
          envMapIntensity={0.5}
          emissive="#8B7340"
          emissiveIntensity={0.12}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.4, 0.4)}
        />
      </mesh>

      {/* Strand 2 - SILVER/GREY helix */}
      <mesh geometry={strand2Geometry}>
        <meshPhysicalMaterial
          color="#B8B8B8"
          transmission={0.3}
          thickness={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          ior={1.33}
          roughness={0.4}
          metalness={0.2}
          sheen={0.8}
          sheenRoughness={0.6}
          sheenColor={new THREE.Color(0xD4D4D4)}
          envMapIntensity={0.5}
          emissive="#888888"
          emissiveIntensity={0.1}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.4, 0.4)}
        />
      </mesh>

      {/* Base Pairs with gold/silver/grey colors */}
      <group>
        {basePairs.map((pair, i) => {
          const direction = new THREE.Vector3().subVectors(pair.end, pair.start)
          const length = direction.length()
          const midpoint = new THREE.Vector3().addVectors(pair.start, pair.end).multiplyScalar(0.5)

          const quaternion = new THREE.Quaternion()
          quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.normalize()
          )

          return (
            <group key={i}>
              {/* Base sphere at start */}
              <mesh position={pair.start}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshPhysicalMaterial
                  color={pair.color}
                  transmission={0.2}
                  thickness={0.5}
                  roughness={0.35}
                  metalness={0.15}
                  clearcoat={0.4}
                  clearcoatRoughness={0.3}
                  ior={1.4}
                  emissive={pair.color}
                  emissiveIntensity={0.15}
                />
              </mesh>

              {/* Base sphere at end */}
              <mesh position={pair.end}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshPhysicalMaterial
                  color={pair.color}
                  transmission={0.2}
                  thickness={0.5}
                  roughness={0.35}
                  metalness={0.15}
                  clearcoat={0.4}
                  clearcoatRoughness={0.3}
                  ior={1.4}
                  emissive={pair.color}
                  emissiveIntensity={0.15}
                />
              </mesh>

              {/* Connector */}
              <mesh position={midpoint} quaternion={quaternion}>
                <cylinderGeometry args={[0.05, 0.05, length, 8]} />
                <meshPhysicalMaterial
                  color={pair.color}
                  transmission={0.4}
                  thickness={0.6}
                  roughness={0.4}
                  metalness={0.1}
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
