import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/stores/scrollStore'

export function DynamicLighting() {
  const directionalLight1 = useRef<THREE.DirectionalLight>(null)
  const directionalLight2 = useRef<THREE.DirectionalLight>(null)
  const pointLight1 = useRef<THREE.PointLight>(null)
  const pointLight2 = useRef<THREE.PointLight>(null)
  const scrollProgress = useScrollStore((state) => state.scrollProgress)

  useFrame((state) => {
    if (!directionalLight1.current || !directionalLight2.current) return
    if (!pointLight1.current || !pointLight2.current) return

    // Lighting keyframes for each section (matching camera keyframes)
    const lightingKeyframes = [
      // Hero section - bright clean
      {
        dir1Intensity: 1.2,
        dir2Intensity: 0.5,
        point1Intensity: 0.8,
        point2Intensity: 0.6,
        dir1Color: new THREE.Color(0xF8F8F8),
        point1Color: new THREE.Color(0xFFFFFF),
        point2Color: new THREE.Color(0x64c8ff)
      },
      // Stem Cells - warm tones
      {
        dir1Intensity: 1.0,
        dir2Intensity: 0.6,
        point1Intensity: 1.0,
        point2Intensity: 0.8,
        dir1Color: new THREE.Color(0xFFE8E0),
        point1Color: new THREE.Color(0xFFD4CC),
        point2Color: new THREE.Color(0xff6b9d)
      },
      // Genetics - cool scientific
      {
        dir1Intensity: 1.3,
        dir2Intensity: 0.4,
        point1Intensity: 0.9,
        point2Intensity: 1.0,
        dir1Color: new THREE.Color(0xE8F4FF),
        point1Color: new THREE.Color(0xD4E8FF),
        point2Color: new THREE.Color(0x64c8ff)
      },
      // Vitamins - golden glow
      {
        dir1Intensity: 1.1,
        dir2Intensity: 0.5,
        point1Intensity: 1.1,
        point2Intensity: 0.7,
        dir1Color: new THREE.Color(0xFFF8E8),
        point1Color: new THREE.Color(0xFFECD4),
        point2Color: new THREE.Color(0xffe66d)
      },
      // Aesthetics - elegant purple/pink
      {
        dir1Intensity: 1.0,
        dir2Intensity: 0.6,
        point1Intensity: 0.8,
        point2Intensity: 1.0,
        dir1Color: new THREE.Color(0xF8E8FF),
        point1Color: new THREE.Color(0xFFE8F4),
        point2Color: new THREE.Color(0xff6b9d)
      },
      // Contact - return to clean white
      {
        dir1Intensity: 1.2,
        dir2Intensity: 0.5,
        point1Intensity: 0.7,
        point2Intensity: 0.5,
        dir1Color: new THREE.Color(0xFFFFFF),
        point1Color: new THREE.Color(0xFFFFFF),
        point2Color: new THREE.Color(0xFFFFFF)
      }
    ]

    // Interpolate between keyframes
    const totalKeyframes = lightingKeyframes.length
    const keyframeProgress = scrollProgress * (totalKeyframes - 1)
    const currentIndex = Math.floor(keyframeProgress)
    const nextIndex = Math.min(currentIndex + 1, totalKeyframes - 1)
    const t = keyframeProgress - currentIndex

    // Smooth easing
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const current = lightingKeyframes[currentIndex]
    const next = lightingKeyframes[nextIndex]

    // Interpolate intensities
    directionalLight1.current.intensity = THREE.MathUtils.lerp(
      current.dir1Intensity,
      next.dir1Intensity,
      eased
    )
    directionalLight2.current.intensity = THREE.MathUtils.lerp(
      current.dir2Intensity,
      next.dir2Intensity,
      eased
    )
    pointLight1.current.intensity = THREE.MathUtils.lerp(
      current.point1Intensity,
      next.point1Intensity,
      eased
    )
    pointLight2.current.intensity = THREE.MathUtils.lerp(
      current.point2Intensity,
      next.point2Intensity,
      eased
    )

    // Interpolate colors
    directionalLight1.current.color.copy(current.dir1Color).lerp(next.dir1Color, eased)
    pointLight1.current.color.copy(current.point1Color).lerp(next.point1Color, eased)
    pointLight2.current.color.copy(current.point2Color).lerp(next.point2Color, eased)

    // Subtle breathing effect on point lights
    const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    pointLight1.current.intensity += breathe
    pointLight2.current.intensity += breathe * 0.5

    // Move point lights subtly with scroll
    pointLight2.current.position.y = 5 + (scrollProgress - 0.5) * 5
  })

  return (
    <>
      {/* Main directional light */}
      <directionalLight
        ref={directionalLight1}
        position={[10, 10, 5]}
        intensity={1.2}
        color="#F8F8F8"
        castShadow
      />

      {/* Fill light */}
      <directionalLight
        ref={directionalLight2}
        position={[-5, -3, -4]}
        intensity={0.5}
        color="#F0F0F0"
      />

      {/* Accent point light 1 */}
      <pointLight
        ref={pointLight1}
        position={[0, 5, 8]}
        intensity={0.8}
        color="#FFFFFF"
        distance={20}
        decay={2}
      />

      {/* Accent point light 2 - moves with scroll */}
      <pointLight
        ref={pointLight2}
        position={[0, 5, -8]}
        intensity={0.6}
        color="#64c8ff"
        distance={25}
        decay={2}
      />
    </>
  )
}
