'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Sperm cell component with floating animation
function SpermCell({ position, scale = 1, color = 0xC9A961 }: { position: [number, number, number], scale?: number, color?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const offsetRef = useRef(Math.random() * Math.PI * 2)

  // Create tail curve
  const tailCurve = useMemo(() => {
    const points = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      const x = 0
      const y = -t * 3
      const z = Math.sin(t * Math.PI * 4) * 0.1 * t
      points.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  const tailGeometry = useMemo(() => {
    return new THREE.TubeGeometry(tailCurve, 20, 0.03, 8, false)
  }, [tailCurve])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      // Swimming and floating motion
      groupRef.current.rotation.z = Math.sin(time * 2 + offsetRef.current) * 0.3
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5 + offsetRef.current) * 0.8
      groupRef.current.position.x = position[0] + Math.cos(time * 0.3 + offsetRef.current) * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.3}
          metalness={0}
          transmission={0.15}
          thickness={0.5}
          opacity={0.2}
          transparent
        />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.3, 8]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.4}
          metalness={0}
          opacity={0.2}
          transparent
        />
      </mesh>
      <mesh geometry={tailGeometry}>
        <meshPhysicalMaterial
          color={color}
          roughness={0.4}
          metalness={0}
          opacity={0.15}
          transparent
        />
      </mesh>
    </group>
  )
}

// Egg cell component with floating animation
function EggCell({ position, scale = 1, color = 0xD4D4D4 }: { position: [number, number, number], scale?: number, color?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const offsetRef = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    if (groupRef.current && meshRef.current) {
      const time = state.clock.elapsedTime
      // Gentle floating motion
      groupRef.current.position.y = position[1] + Math.sin(time * 0.4 + offsetRef.current) * 1.2
      groupRef.current.position.x = position[0] + Math.cos(time * 0.6 + offsetRef.current) * 0.8
      groupRef.current.rotation.y = time * 0.2
      // Pulsing
      meshRef.current.scale.setScalar(scale * (1 + Math.sin(time * 1.5 + offsetRef.current) * 0.05))
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.25}
          metalness={0}
          transmission={0.25}
          thickness={1.2}
          ior={1.4}
          opacity={0.2}
          transparent
        />
      </mesh>
      {Array.from({ length: 18 }).map((_, i) => {
        const theta = (i / 18) * Math.PI * 2
        const phi = Math.acos((Math.random() * 2) - 1)
        const radius = 0.45
        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshPhysicalMaterial
              color={color}
              roughness={0.3}
              metalness={0}
              opacity={0.15}
              transparent
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Simple molecular structure with floating animation
function MolecularStructure({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const offsetRef = useRef(Math.random() * Math.PI * 2)

  const atoms = useMemo(() => {
    return [
      { pos: [0, 0, 0] as [number, number, number], color: 0xC9A961, size: 0.15 },
      { pos: [0.3, 0.2, 0.1] as [number, number, number], color: 0xB8B8B8, size: 0.12 },
      { pos: [-0.2, 0.25, -0.1] as [number, number, number], color: 0xA0A0A0, size: 0.1 },
      { pos: [0.1, -0.3, 0.2] as [number, number, number], color: 0xD4D4D4, size: 0.11 },
      { pos: [-0.3, -0.1, 0.15] as [number, number, number], color: 0xC9A961, size: 0.09 },
    ]
  }, [])

  const bonds = useMemo(() => {
    return [
      { start: 0, end: 1 },
      { start: 0, end: 2 },
      { start: 0, end: 3 },
      { start: 0, end: 4 },
    ]
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      // Rotation and floating
      groupRef.current.rotation.x = time * 0.3
      groupRef.current.rotation.y = time * 0.4
      groupRef.current.position.y = position[1] + Math.sin(time * 0.6 + offsetRef.current) * 1.0
      groupRef.current.position.x = position[0] + Math.cos(time * 0.4 + offsetRef.current) * 0.6
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Atoms */}
      {atoms.map((atom, i) => (
        <mesh key={`atom-${i}`} position={atom.pos}>
          <sphereGeometry args={[atom.size, 16, 16]} />
          <meshPhysicalMaterial
            color={atom.color}
            roughness={0.3}
            metalness={0.2}
            clearcoat={0.4}
            transmission={0.15}
            thickness={0.5}
            opacity={0.25}
            transparent
          />
        </mesh>
      ))}

      {/* Bonds */}
      {bonds.map((bond, i) => {
        const start = new THREE.Vector3(...atoms[bond.start].pos)
        const end = new THREE.Vector3(...atoms[bond.end].pos)
        const direction = new THREE.Vector3().subVectors(end, start)
        const length = direction.length()
        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)

        const quaternion = new THREE.Quaternion()
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())

        return (
          <mesh key={`bond-${i}`} position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[0.03, 0.03, length, 8]} />
            <meshPhysicalMaterial
              color={0xB8B8B8}
              roughness={0.4}
              metalness={0.15}
              opacity={0.2}
              transparent
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Main component that orchestrates all biological structures
export function BiologicalStructures() {
  const groupRef = useRef<THREE.Group>(null)

  // Create atmospheric particles with varied biological cells at different depths
  const instances = useMemo(() => {
    return [
      // Sperm cells at various depths - pushed farther back
      { type: 'sperm', position: [-11, 6, -10] as [number, number, number], scale: 0.8, color: 0xC9A961 },
      { type: 'sperm', position: [10, 2, -8] as [number, number, number], scale: 0.6, color: 0x85A5C4 },
      { type: 'sperm', position: [-9, -4, -12] as [number, number, number], scale: 0.7, color: 0xB8B8B8 },

      // Egg cells - pushed farther back
      { type: 'egg', position: [11, -3, -9] as [number, number, number], scale: 0.5, color: 0xD4D4D4 },
      { type: 'egg', position: [-10, -6, -11] as [number, number, number], scale: 0.6, color: 0xD4AF37 },
      { type: 'egg', position: [9, 5, -10] as [number, number, number], scale: 0.55, color: 0xC9A961 },

      // Molecular structures - pushed farther back
      { type: 'molecule', position: [-8, 3, -8] as [number, number, number], scale: 0.7 },
      { type: 'molecule', position: [8, -2, -9] as [number, number, number], scale: 0.6 },
      { type: 'molecule', position: [-11, -1, -10] as [number, number, number], scale: 0.8 },
      { type: 'molecule', position: [10, 6, -11] as [number, number, number], scale: 0.65 },
    ]
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle drift of the entire group
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {instances.map((instance, i) => {
        if (instance.type === 'sperm') {
          return (
            <SpermCell
              key={`sperm-${i}`}
              position={instance.position}
              scale={instance.scale}
              color={instance.color}
            />
          )
        } else if (instance.type === 'egg') {
          return (
            <EggCell
              key={`egg-${i}`}
              position={instance.position}
              scale={instance.scale}
              color={instance.color}
            />
          )
        } else {
          return (
            <MolecularStructure
              key={`molecule-${i}`}
              position={instance.position}
              scale={instance.scale}
            />
          )
        }
      })}
    </group>
  )
}
