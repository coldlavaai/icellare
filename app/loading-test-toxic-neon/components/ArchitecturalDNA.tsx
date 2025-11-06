'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ArchitecturalDNAProps {
  growthProgress?: number
  enableGrowth?: boolean
  scrollProgress?: number
}

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

  const dnaGeometry = useMemo(() => {
    const strand1Path = generateHelixPath({
      radius: 2.7,
      pitch: 6.4,
      turns: 2.0,
      segmentsPerTurn: 80,
    })

    const strand2Path = strand1Path.map(
      (p) => new THREE.Vector3(-p.x, p.y, -p.z)
    )

    const curve1 = new THREE.CatmullRomCurve3(strand1Path)
    const tube1Geo = new THREE.TubeGeometry(curve1, strand1Path.length, 0.1, 20, false)

    const curve2 = new THREE.CatmullRomCurve3(strand2Path)
    const tube2Geo = new THREE.TubeGeometry(curve2, strand2Path.length, 0.1, 20, false)

    // Toxic Neon - 4 distinct colors
    const basePairColors = {
      A: 0xEC4899,
      T: 0x3B82F6,
      G: 0xF97316,
      C: 0xEC4899,
    }

    const basePairTypes = ['A', 'T', 'G', 'C'] as const
    const basePairs: Array<{
      point1: THREE.Vector3
      point2: THREE.Vector3
      color1: number
      color2: number
      type1: string
      type2: string
    }> = []

    const totalPoints = strand1Path.length
    for (let i = 0; i < totalPoints; i += 4) {
      const point1 = strand1Path[i]
      const point2 = strand2Path[i]
      const type1 = basePairTypes[Math.floor(Math.random() * 4)]
      let type2: typeof basePairTypes[number]
      do {
        type2 = basePairTypes[Math.floor(Math.random() * 4)]
      } while (type2 === type1)

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

  const backboneMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xEC4899,
        transmission: 0.2,
        thickness: 0.8,
        roughness: 0.2,
        metalness: 0.5,
        clearcoat: 0.7,
        ior: 1.5,
        emissive: 0xEC4899,
        emissiveIntensity: 0.5,
        flatShading: false,
      }),
    []
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (enableGrowth) {
      baseRotation.current += delta * 0.02
      groupRef.current.rotation.y = baseRotation.current
      groupRef.current.scale.y = growthProgress
      groupRef.current.position.y = -(1 - growthProgress) * 8
    } else {
      baseRotation.current += delta * 0.1
      const scrollRotation = scrollProgress * Math.PI * 2
      groupRef.current.rotation.y = baseRotation.current + scrollRotation
      groupRef.current.position.y = 0
      groupRef.current.scale.set(1, 1, 1)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.55}>
      <mesh geometry={dnaGeometry.tube1Geo} material={backboneMaterial} castShadow />
      <mesh geometry={dnaGeometry.tube2Geo} material={backboneMaterial} castShadow />

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

        const material1 = new THREE.MeshPhysicalMaterial({
          color: pair.color1,
          transmission: 0.1,
          thickness: 0.5,
          roughness: 0.1,
          metalness: 0.2,
          clearcoat: 0.8,
          ior: 1.5,
          emissive: pair.color1,
          emissiveIntensity: 0.6,
          flatShading: false,
        })

        const material2 = new THREE.MeshPhysicalMaterial({
          color: pair.color2,
          transmission: 0.1,
          thickness: 0.5,
          roughness: 0.1,
          metalness: 0.2,
          clearcoat: 0.8,
          ior: 1.5,
          emissive: pair.color2,
          emissiveIntensity: 0.6,
          flatShading: false,
        })

        const blendedColor = new THREE.Color(pair.color1).lerp(
          new THREE.Color(pair.color2),
          0.5
        )
        const cylinderMaterial = new THREE.MeshPhysicalMaterial({
          color: blendedColor,
          transmission: 0.1,
          thickness: 0.5,
          roughness: 0.1,
          metalness: 0.2,
          clearcoat: 0.8,
          ior: 1.5,
          emissive: blendedColor,
          emissiveIntensity: 0.6,
          flatShading: false,
        })

        return (
          <group key={i}>
            <mesh position={pair.point1} material={material1} castShadow>
              <sphereGeometry args={[0.22, 32, 32]} />
            </mesh>
            <mesh position={pair.point2} material={material2} castShadow>
              <sphereGeometry args={[0.22, 32, 32]} />
            </mesh>
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
