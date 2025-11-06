const fs = require('fs');
const path = require('path');

// Define all 15 colorways with their colors (no green)
const colorways = [
  {
    name: 'cyber-magenta',
    displayName: 'Cyber Magenta',
    dnaColors: {
      A: '0xFF0080', // Hot Magenta
      T: '0x00FFFF', // Cyan
      G: '0xBF00FF', // Electric Purple
      C: '0xFFD700', // Gold
    },
    backboneColor: '0xFF0080',
    uiColors: {
      primary: '#FF0080',
      secondary: '#00FFFF',
      accent: '#BF00FF',
      gradient: 'from-pink-500 via-cyan-400 to-purple-500',
      glowPrimary: 'rgba(255, 0, 128, 0.8)',
      glowSecondary: 'rgba(0, 255, 255, 0.6)',
    },
    backgroundGradient: '#1a0020'
  },
  {
    name: 'aurora-borealis',
    displayName: 'Aurora Borealis',
    dnaColors: {
      A: '0x14B8A6', // Teal
      T: '0x8B5CF6', // Violet
      G: '0xEC4899', // Pink
      C: '0xF59E0B', // Amber
    },
    backboneColor: '0x14B8A6',
    uiColors: {
      primary: '#14B8A6',
      secondary: '#8B5CF6',
      accent: '#EC4899',
      gradient: 'from-teal-500 via-violet-500 to-pink-500',
      glowPrimary: 'rgba(20, 184, 166, 0.8)',
      glowSecondary: 'rgba(139, 92, 246, 0.6)',
    },
    backgroundGradient: '#0a1420'
  },
  {
    name: 'toxic-neon',
    displayName: 'Toxic Neon',
    dnaColors: {
      A: '0xEC4899', // Hot Pink
      T: '0x3B82F6', // Electric Blue
      G: '0xF97316', // Orange
      C: '0xEC4899', // Hot Pink (repeated for 4 colors)
    },
    backboneColor: '0xEC4899',
    uiColors: {
      primary: '#EC4899',
      secondary: '#3B82F6',
      accent: '#F97316',
      gradient: 'from-pink-500 via-blue-500 to-orange-500',
      glowPrimary: 'rgba(236, 72, 153, 0.8)',
      glowSecondary: 'rgba(59, 130, 246, 0.6)',
    },
    backgroundGradient: '#1a1a1a'
  },
  {
    name: 'royal-sunset',
    displayName: 'Royal Sunset',
    dnaColors: {
      A: '0xFFD700', // Gold
      T: '0xF43F5E', // Rose
      G: '0xF59E0B', // Amber
      C: '0x3B82F6', // Sapphire
    },
    backboneColor: '0xFFD700',
    uiColors: {
      primary: '#FFD700',
      secondary: '#F43F5E',
      accent: '#F59E0B',
      gradient: 'from-yellow-400 via-rose-500 to-amber-500',
      glowPrimary: 'rgba(255, 215, 0, 0.8)',
      glowSecondary: 'rgba(244, 63, 94, 0.6)',
    },
    backgroundGradient: '#1a0a2e'
  },
  {
    name: 'electric-ocean',
    displayName: 'Electric Ocean',
    dnaColors: {
      A: '0x06B6D4', // Bright Cyan
      T: '0xFF6B9D', // Coral
      G: '0x8B5CF6', // Violet
      C: '0xFFFFFF', // White
    },
    backboneColor: '0x06B6D4',
    uiColors: {
      primary: '#06B6D4',
      secondary: '#FF6B9D',
      accent: '#8B5CF6',
      gradient: 'from-cyan-500 via-pink-400 to-violet-500',
      glowPrimary: 'rgba(6, 182, 212, 0.8)',
      glowSecondary: 'rgba(255, 107, 157, 0.6)',
    },
    backgroundGradient: '#0a1420'
  },
  {
    name: 'volcanic-fire',
    displayName: 'Volcanic Fire',
    dnaColors: {
      A: '0xFF4500', // Lava Orange
      T: '0xDC2626', // Crimson
      G: '0xFFD700', // Gold
      C: '0xFF0080', // Hot Pink
    },
    backboneColor: '0xFF4500',
    uiColors: {
      primary: '#FF4500',
      secondary: '#DC2626',
      accent: '#FFD700',
      gradient: 'from-orange-600 via-red-600 to-yellow-400',
      glowPrimary: 'rgba(255, 69, 0, 0.8)',
      glowSecondary: 'rgba(220, 38, 38, 0.6)',
    },
    backgroundGradient: '#0a0000'
  },
  {
    name: 'cosmic-rave',
    displayName: 'Cosmic Rave',
    dnaColors: {
      A: '0xA855F7', // Neon Purple
      T: '0x00FFFF', // Cyan
      G: '0xFF0080', // Hot Pink
      C: '0x3B82F6', // Blue
    },
    backboneColor: '0xA855F7',
    uiColors: {
      primary: '#A855F7',
      secondary: '#00FFFF',
      accent: '#FF0080',
      gradient: 'from-purple-500 via-cyan-400 to-pink-500',
      glowPrimary: 'rgba(168, 85, 247, 0.8)',
      glowSecondary: 'rgba(0, 255, 255, 0.6)',
    },
    backgroundGradient: '#000000'
  },
  {
    name: 'neon-tokyo',
    displayName: 'Neon Tokyo',
    dnaColors: {
      A: '0xFF0080', // Hot Pink
      T: '0x00FFFF', // Cyan
      G: '0xFFFF00', // Yellow
      C: '0xA855F7', // Purple
    },
    backboneColor: '0xFF0080',
    uiColors: {
      primary: '#FF0080',
      secondary: '#00FFFF',
      accent: '#FFFF00',
      gradient: 'from-pink-500 via-cyan-400 to-yellow-400',
      glowPrimary: 'rgba(255, 0, 128, 0.8)',
      glowSecondary: 'rgba(0, 255, 255, 0.6)',
    },
    backgroundGradient: '#1a1a1a'
  },
  {
    name: 'plasma-storm',
    displayName: 'Plasma Storm',
    dnaColors: {
      A: '0x3B82F6', // Electric Blue
      T: '0xEC4899', // Magenta
      G: '0xF97316', // Orange
      C: '0x06B6D4', // Cyan
    },
    backboneColor: '0x3B82F6',
    uiColors: {
      primary: '#3B82F6',
      secondary: '#EC4899',
      accent: '#F97316',
      gradient: 'from-blue-500 via-pink-500 to-orange-500',
      glowPrimary: 'rgba(59, 130, 246, 0.8)',
      glowSecondary: 'rgba(236, 72, 153, 0.6)',
    },
    backgroundGradient: '#0a0a2e'
  },
  {
    name: 'galaxy-core',
    displayName: 'Galaxy Core',
    dnaColors: {
      A: '0x8B5CF6', // Violet
      T: '0x14B8A6', // Teal
      G: '0xF43F5E', // Rose
      C: '0xFFD700', // Gold
    },
    backboneColor: '0x8B5CF6',
    uiColors: {
      primary: '#8B5CF6',
      secondary: '#14B8A6',
      accent: '#F43F5E',
      gradient: 'from-violet-500 via-teal-500 to-rose-500',
      glowPrimary: 'rgba(139, 92, 246, 0.8)',
      glowSecondary: 'rgba(20, 184, 166, 0.6)',
    },
    backgroundGradient: '#000000'
  },
  {
    name: 'digital-dream',
    displayName: 'Digital Dream',
    dnaColors: {
      A: '0x00FFFF', // Cyan
      T: '0xFF00FF', // Magenta
      G: '0xFFFF00', // Yellow
      C: '0x3B82F6', // Blue
    },
    backboneColor: '0x00FFFF',
    uiColors: {
      primary: '#00FFFF',
      secondary: '#FF00FF',
      accent: '#FFFF00',
      gradient: 'from-cyan-400 via-fuchsia-500 to-yellow-400',
      glowPrimary: 'rgba(0, 255, 255, 0.8)',
      glowSecondary: 'rgba(255, 0, 255, 0.6)',
    },
    backgroundGradient: '#0a0a1a'
  },
  {
    name: 'acid-fusion',
    displayName: 'Acid Fusion',
    dnaColors: {
      A: '0xFF0080', // Hot Pink
      T: '0x3B82F6', // Electric Blue
      G: '0xF97316', // Orange
      C: '0xA855F7', // Purple
    },
    backboneColor: '0xFF0080',
    uiColors: {
      primary: '#FF0080',
      secondary: '#3B82F6',
      accent: '#F97316',
      gradient: 'from-pink-500 via-blue-500 to-orange-500',
      glowPrimary: 'rgba(255, 0, 128, 0.8)',
      glowSecondary: 'rgba(59, 130, 246, 0.6)',
    },
    backgroundGradient: '#1a1a1a'
  },
  {
    name: 'infrared-pulse',
    displayName: 'Infrared Pulse',
    dnaColors: {
      A: '0xFF0000', // Infrared Red
      T: '0x3B82F6', // Electric Blue
      G: '0xFF0080', // Hot Pink
      C: '0xF97316', // Orange
    },
    backboneColor: '0xFF0000',
    uiColors: {
      primary: '#FF0000',
      secondary: '#3B82F6',
      accent: '#FF0080',
      gradient: 'from-red-600 via-blue-500 to-pink-500',
      glowPrimary: 'rgba(255, 0, 0, 0.8)',
      glowSecondary: 'rgba(59, 130, 246, 0.6)',
    },
    backgroundGradient: '#0a0000'
  },
  {
    name: 'hologram-matrix',
    displayName: 'Hologram Matrix',
    dnaColors: {
      A: '0x00FFFF', // Cyan
      T: '0xFF00FF', // Magenta
      G: '0xFFFF00', // Yellow
      C: '0xA855F7', // Purple
    },
    backboneColor: '0x00FFFF',
    uiColors: {
      primary: '#00FFFF',
      secondary: '#FF00FF',
      accent: '#FFFF00',
      gradient: 'from-cyan-400 via-fuchsia-500 to-yellow-400',
      glowPrimary: 'rgba(0, 255, 255, 0.8)',
      glowSecondary: 'rgba(255, 0, 255, 0.6)',
    },
    backgroundGradient: '#0a0a0a'
  },
  {
    name: 'neon-jungle',
    displayName: 'Neon Jungle',
    dnaColors: {
      A: '0xA855F7', // Purple
      T: '0xF97316', // Orange
      G: '0x06B6D4', // Cyan
      C: '0xFF0080', // Hot Pink
    },
    backboneColor: '0xA855F7',
    uiColors: {
      primary: '#A855F7',
      secondary: '#F97316',
      accent: '#06B6D4',
      gradient: 'from-purple-500 via-orange-500 to-cyan-500',
      glowPrimary: 'rgba(168, 85, 247, 0.8)',
      glowSecondary: 'rgba(249, 115, 22, 0.6)',
    },
    backgroundGradient: '#000000'
  },
];

// Generate ArchitecturalDNA.tsx for a colorway
function generateDNAComponent(colorway) {
  return `'use client'

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

    // ${colorway.displayName} - 4 distinct colors
    const basePairColors = {
      A: ${colorway.dnaColors.A},
      T: ${colorway.dnaColors.T},
      G: ${colorway.dnaColors.G},
      C: ${colorway.dnaColors.C},
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
        color: ${colorway.backboneColor},
        transmission: 0.2,
        thickness: 0.8,
        roughness: 0.2,
        metalness: 0.5,
        clearcoat: 0.7,
        ior: 1.5,
        emissive: ${colorway.backboneColor},
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
`;
}

// Create all files
colorways.forEach((colorway) => {
  const dir = path.join(__dirname, 'app', `loading-test-${colorway.name}`);
  const componentsDir = path.join(dir, 'components');

  // Create DNA component
  const dnaPath = path.join(componentsDir, 'ArchitecturalDNA.tsx');
  fs.writeFileSync(dnaPath, generateDNAComponent(colorway));

  console.log(`Created ${colorway.displayName} DNA component`);
});

console.log('\nAll DNA components created successfully!');
console.log('Run this script to generate page.tsx files next.');
