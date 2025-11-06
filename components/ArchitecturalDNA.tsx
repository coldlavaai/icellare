'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ArchitecturalDNAProps {
  growthProgress?: number
  enableGrowth?: boolean
  scrollProgress?: number
}

// STEP 1: Generate helix path
function generateHelixPath(config: {
  radius: number
  pitch: number
  turns: number
  segmentsPerTurn: number
}) {
  const points: THREE.Vector3[] = []
  const { radius, pitch, turns, segmentsPerTurn } = config
  const totalSegments = turns * segmentsPerTurn
  const height = pitch * turns

  for (let i = 0; i <= totalSegments; i++) {
    const t = (i / segmentsPerTurn) * (Math.PI * 2)
    const y = (i / totalSegments) * height - height / 2
    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    points.push(new THREE.Vector3(x, y, z))
  }
  return points
}

export function ArchitecturalDNA({
  growthProgress = 1,
  enableGrowth = false,
  scrollProgress = 0,
}: ArchitecturalDNAProps = {}) {
  const groupRef = useRef<THREE.Group>(null)
  const baseRotation = useRef(0)

  // Generate DNA geometry
  const dnaGeometry = useMemo(() => {
    // STEP 1: Create helix paths (using old dimensions for same size)
    const strand1Path = generateHelixPath({
      radius: 2.7,
      pitch: 6.4,
      turns: 2.0,
      segmentsPerTurn: 80,
    })

    // Strand 2 (opposite side)
    const strand2Path = strand1Path.map(
      (p) => new THREE.Vector3(-p.x, p.y, -p.z)
    )

    // STEP 2: Create backbone tubes
    const curve1 = new THREE.CatmullRomCurve3(strand1Path)
    const tube1Geo = new THREE.TubeGeometry(curve1, strand1Path.length, 0.1, 20, false)

    const curve2 = new THREE.CatmullRomCurve3(strand2Path)
    const tube2Geo = new THREE.TubeGeometry(curve2, strand2Path.length, 0.1, 20, false)

    // STEP 3: Create base pairs - distinct pastel colors
    const basePairColors = {
      A: 0xCBA565, // Yellower gold
      T: 0x7BAED9, // Lighter pastel blue
      G: 0x8B7355, // Darker brown (more contrast)
      C: 0xC8C8C8, // Lighter pastel grey
    }

    const basePairTypes = ['A', 'G'] as const // Only need to pick A or G, complement is determined
    const basePairs: Array<{
      point1: THREE.Vector3
      point2: THREE.Vector3
      color1: number
      color2: number
      type1: string
      type2: string
    }> = []

    // Create more base pairs with accurate Watson-Crick pairing
    const totalPoints = strand1Path.length
    for (let i = 0; i < totalPoints; i += 4) {
      const point1 = strand1Path[i]
      const point2 = strand2Path[i]

      // Pick a random base for strand 1 - balanced to show all colors
      // 45% A (yellower gold pairs with blue T), 55% G (dark brown pairs with grey C)
      const type1 = Math.random() < 0.45 ? 'A' : 'G'

      // Determine complement for strand 2 (A pairs with T, G pairs with C)
      const type2 = type1 === 'A' ? 'T' : 'C'

      const color1 = basePairColors[type1]
      const color2 = basePairColors[type2]

      basePairs.push({
        point1: point1.clone(),
        point2: point2.clone(),
        color1,
        color2,
        type1,
        type2,
      })
    }

    return {
      tube1Geo,
      tube2Geo,
      basePairs,
    }
  }, [])

  // Backbone material - white/grey outer strands
  const backboneMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xE8E8E8,
        transmission: 0.1,
        thickness: 0.5,
        roughness: 0.3,
        metalness: 0.2,
        clearcoat: 0.5,
        ior: 1.4,
        emissive: 0xE8E8E8,
        emissiveIntensity: 0.05,
        flatShading: false,
      }),
    []
  )

  // Animation
  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (enableGrowth) {
      // During growth animation - very slow idle rotation
      baseRotation.current += delta * 0.02
      groupRef.current.rotation.y = baseRotation.current

      // DNA builds from bottom to top
      groupRef.current.scale.y = growthProgress
      // Adjust position so it grows upward from center
      groupRef.current.position.y = -(1 - growthProgress) * 8
    } else {
      // After growth completes - slow idle rotation that tracks with scroll

      // Idle rotation (0.1 rad/sec)
      baseRotation.current += delta * 0.1

      // Scroll-based rotation
      const scrollRotation = scrollProgress * Math.PI * 2

      // Combine idle rotation with scroll-based rotation
      groupRef.current.rotation.y = baseRotation.current + scrollRotation

      // Stay centered vertically
      groupRef.current.position.y = 0

      // No scale changes
      groupRef.current.scale.set(1, 1, 1)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.55}>
      {/* STEP 2: Backbone strands */}
      <mesh geometry={dnaGeometry.tube1Geo} material={backboneMaterial} castShadow />
      <mesh geometry={dnaGeometry.tube2Geo} material={backboneMaterial} castShadow />

      {/* STEP 3: Base pairs */}
      {dnaGeometry.basePairs.map((pair, i) => {
        const direction = new THREE.Vector3().subVectors(
          pair.point2,
          pair.point1
        )
        const length = direction.length()
        const midpoint = new THREE.Vector3()
          .addVectors(pair.point1, pair.point2)
          .multiplyScalar(0.5)

        const up = new THREE.Vector3(0, 1, 0)
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          up,
          direction.normalize()
        )

        // Material for sphere 1 - matte pastel
        const material1 = new THREE.MeshPhysicalMaterial({
          color: pair.color1,
          transmission: 0,
          opacity: 1,
          roughness: 0.5,
          metalness: 0,
          clearcoat: 0.2,
          clearcoatRoughness: 0.3,
          ior: 1.5,
          emissive: pair.color1,
          emissiveIntensity: 0.15,
          flatShading: false,
        })

        // Material for sphere 2 - matte pastel
        const material2 = new THREE.MeshPhysicalMaterial({
          color: pair.color2,
          transmission: 0,
          opacity: 1,
          roughness: 0.5,
          metalness: 0,
          clearcoat: 0.2,
          clearcoatRoughness: 0.3,
          ior: 1.5,
          emissive: pair.color2,
          emissiveIntensity: 0.15,
          flatShading: false,
        })

        // Cylinder material (blend of both colors) - matte pastel
        // Occasionally add blue tint (about 20% of the time)
        const blendedColor = new THREE.Color(pair.color1).lerp(
          new THREE.Color(pair.color2),
          0.5
        )

        // Add blue tint to some cylinders
        const addBlueTint = Math.random() < 0.2
        if (addBlueTint) {
          blendedColor.lerp(new THREE.Color(0x7BAED9), 0.4) // Mix in some blue
        }

        const cylinderMaterial = new THREE.MeshPhysicalMaterial({
          color: blendedColor,
          transmission: 0,
          opacity: 1,
          roughness: 0.5,
          metalness: 0,
          clearcoat: 0.2,
          clearcoatRoughness: 0.3,
          ior: 1.5,
          emissive: blendedColor,
          emissiveIntensity: 0.15,
          flatShading: false,
        })

        return (
          <group key={i}>
            {/* Sphere 1 - First base - high detail for smooth rendering */}
            <mesh position={pair.point1} material={material1} castShadow>
              <sphereGeometry args={[0.22, 32, 32]} />
            </mesh>

            {/* Sphere 2 - Complementary base - high detail for smooth rendering */}
            <mesh position={pair.point2} material={material2} castShadow>
              <sphereGeometry args={[0.22, 32, 32]} />
            </mesh>

            {/* Connecting cylinder - blended color - high detail for smooth rendering */}
            <mesh
              position={midpoint}
              quaternion={quaternion}
              material={cylinderMaterial}
              castShadow
            >
              <cylinderGeometry args={[0.08, 0.08, length, 16]} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
