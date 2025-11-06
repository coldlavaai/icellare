'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null!)
  const basePairs = 30
  const helixRadius = 2
  const helixHeight = 15
  const turnSpeed = 0.3

  const basePairColors = {
    A: 0xCCCCFF,
    T: 0xFF00FF,
    G: 0x6A5ACD,
    C: 0x00FFFF,
  }

  const basePairSequence = useMemo(() => {
    const pairs = ['AT', 'TA', 'GC', 'CG']
    return Array.from({ length: basePairs }, () => pairs[Math.floor(Math.random() * pairs.length)])
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * turnSpeed
    }
  })

  return (
    <group ref={groupRef}>
      {basePairSequence.map((pair, i) => {
        const t = i / basePairs
        const angle = t * Math.PI * 4
        const y = (t - 0.5) * helixHeight

        const base1 = pair[0] as keyof typeof basePairColors
        const base2 = pair[1] as keyof typeof basePairColors

        return (
          <group key={i}>
            <mesh position={[Math.cos(angle) * helixRadius, y, Math.sin(angle) * helixRadius]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshPhysicalMaterial
                color={basePairColors[base1]}
                emissive={basePairColors[base1]}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>

            <mesh
              position={[
                Math.cos(angle + Math.PI) * helixRadius,
                y,
                Math.sin(angle + Math.PI) * helixRadius,
              ]}
            >
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshPhysicalMaterial
                color={basePairColors[base2]}
                emissive={basePairColors[base2]}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>

            <mesh
              position={[0, y, 0]}
              rotation={[0, angle, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.08, 0.08, helixRadius * 2, 8]} />
              <meshPhysicalMaterial
                color={new THREE.Color().setHex((basePairColors[base1] + basePairColors[base2]) / 2)}
                emissive={new THREE.Color().setHex((basePairColors[base1] + basePairColors[base2]) / 2)}
                emissiveIntensity={0.3}
                metalness={0.6}
                roughness={0.4}
                transparent
                opacity={0.7}
              />
            </mesh>
          </group>
        )
      })}

      {Array.from({ length: basePairs + 1 }, (_, i) => {
        const t = i / basePairs
        const angle = t * Math.PI * 4
        const y = (t - 0.5) * helixHeight

        return (
          <group key={`strand${i}`}>
            {i < basePairs && (
              <>
                <mesh
                  position={[
                    (Math.cos(angle) * helixRadius + Math.cos((i + 1) / basePairs * Math.PI * 4) * helixRadius) / 2,
                    y + helixHeight / basePairs / 2,
                    (Math.sin(angle) * helixRadius + Math.sin((i + 1) / basePairs * Math.PI * 4) * helixRadius) / 2,
                  ]}
                  rotation={[
                    0,
                    Math.atan2(
                      Math.sin((i + 1) / basePairs * Math.PI * 4) * helixRadius - Math.sin(angle) * helixRadius,
                      Math.cos((i + 1) / basePairs * Math.PI * 4) * helixRadius - Math.cos(angle) * helixRadius
                    ),
                    Math.atan2(
                      helixHeight / basePairs,
                      Math.sqrt(
                        Math.pow(Math.cos((i + 1) / basePairs * Math.PI * 4) * helixRadius - Math.cos(angle) * helixRadius, 2) +
                        Math.pow(Math.sin((i + 1) / basePairs * Math.PI * 4) * helixRadius - Math.sin(angle) * helixRadius, 2)
                      )
                    )
                  ]}
                >
                  <cylinderGeometry args={[0.12, 0.12, helixHeight / basePairs * 1.5, 8]} />
                  <meshPhysicalMaterial
                    color={0x00BFFF}
                    emissive={0x00BFFF}
                    emissiveIntensity={0.4}
                    metalness={0.9}
                    roughness={0.1}
                  />
                </mesh>

                <mesh
                  position={[
                    (Math.cos(angle + Math.PI) * helixRadius + Math.cos(((i + 1) / basePairs * Math.PI * 4) + Math.PI) * helixRadius) / 2,
                    y + helixHeight / basePairs / 2,
                    (Math.sin(angle + Math.PI) * helixRadius + Math.sin(((i + 1) / basePairs * Math.PI * 4) + Math.PI) * helixRadius) / 2,
                  ]}
                  rotation={[
                    0,
                    Math.atan2(
                      Math.sin(((i + 1) / basePairs * Math.PI * 4) + Math.PI) * helixRadius - Math.sin(angle + Math.PI) * helixRadius,
                      Math.cos(((i + 1) / basePairs * Math.PI * 4) + Math.PI) * helixRadius - Math.cos(angle + Math.PI) * helixRadius
                    ),
                    Math.atan2(
                      helixHeight / basePairs,
                      Math.sqrt(
                        Math.pow(Math.cos(((i + 1) / basePairs * Math.PI * 4) + Math.PI) * helixRadius - Math.cos(angle + Math.PI) * helixRadius, 2) +
                        Math.pow(Math.sin(((i + 1) / basePairs * Math.PI * 4) + Math.PI) * helixRadius - Math.sin(angle + Math.PI) * helixRadius, 2)
                      )
                    )
                  ]}
                >
                  <cylinderGeometry args={[0.12, 0.12, helixHeight / basePairs * 1.5, 8]} />
                  <meshPhysicalMaterial
                    color={0xFF1493}
                    emissive={0xFF1493}
                    emissiveIntensity={0.4}
                    metalness={0.9}
                    roughness={0.1}
                  />
                </mesh>
              </>
            )}
          </group>
        )
      })}
    </group>
  )
}

export default function ArchitecturalDNA() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#080814']} />
        <fog attach="fog" args={['#080814', 15, 35]} />

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00BFFF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#FF1493" />
        <pointLight position={[0, 0, 15]} intensity={1} color="#9370DB" />

        <DNAHelix />
      </Canvas>
    </div>
  )
}
