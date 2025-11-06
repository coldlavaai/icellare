'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'

interface ScientificDNAProps {
  growthProgress?: number
  enableGrowth?: boolean
  scrollProgress?: number
}

export function ScientificDNA({
  growthProgress = 1,
  enableGrowth = false,
  scrollProgress = 0
}: ScientificDNAProps = {}) {
  const groupRef = useRef<THREE.Group>(null)
  const baseRotation = useRef(0)

  // Load the GLTF model
  const gltf = useLoader(GLTFLoader, '/models/dna/scene.gltf')

  // Apply photorealistic materials to the loaded model
  useEffect(() => {
    if (gltf) {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh
          const originalMaterial = mesh.material as THREE.MeshStandardMaterial

          // Check material name or color to determine if it's backbone or base pairs
          const isBackbone = originalMaterial.name === 'Material.002' ||
                           (originalMaterial.color &&
                            originalMaterial.color.r > 0.7 &&
                            originalMaterial.color.g > 0.7 &&
                            originalMaterial.color.b > 0.7)

          if (isBackbone) {
            // Gray backbone - photorealistic glass-like material
            mesh.material = new THREE.MeshPhysicalMaterial({
              color: 0xB8B8B8, // Silver/gray
              transmission: 0.25,
              clearcoat: 0.4,
              clearcoatRoughness: 0.2,
              roughness: 0.4,
              metalness: 0,
              ior: 1.38,
              thickness: 0.5,
              envMapIntensity: 1.0,
              side: THREE.DoubleSide
            })
          } else {
            // Orange base pairs - keep original color but make photorealistic
            const baseColor = originalMaterial.color || new THREE.Color(0xCC7237)

            mesh.material = new THREE.MeshPhysicalMaterial({
              color: baseColor,
              transmission: 0.2,
              clearcoat: 0.35,
              clearcoatRoughness: 0.3,
              roughness: 0.4,
              metalness: 0,
              emissive: baseColor,
              emissiveIntensity: 0.15,
              ior: 1.38,
              thickness: 0.4,
              envMapIntensity: 0.8,
              side: THREE.DoubleSide
            })
          }
        }
      })
    }
  }, [gltf])

  // Animate the DNA
  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (enableGrowth) {
      // Growth animation during loading
      baseRotation.current += delta * 0.02
      groupRef.current.rotation.y = baseRotation.current
      groupRef.current.scale.y = growthProgress
      groupRef.current.position.y = -(1 - growthProgress) * 5
    } else {
      // After growth completes - idle rotation + scroll-based rotation
      baseRotation.current += delta * 0.1
      const scrollRotation = scrollProgress * Math.PI * 2
      groupRef.current.rotation.y = baseRotation.current + scrollRotation
      groupRef.current.position.y = 0
      groupRef.current.scale.set(1, 1, 1)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.5}>
      <primitive object={gltf.scene} />
    </group>
  )
}
