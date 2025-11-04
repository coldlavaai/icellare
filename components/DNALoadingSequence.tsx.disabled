'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Floating DNA strand particle
function FloatingStrand({
  position,
  delay,
  assembling,
  targetPosition,
  onAssembled
}: {
  position: [number, number, number]
  delay: number
  assembling: boolean
  targetPosition: [number, number, number]
  onAssembled: () => void
}) {
  const meshRef = useRef<THREE.Group>(null)
  const [assembled, setAssembled] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    if (!assembling) {
      // Float randomly before assembly
      meshRef.current.position.x = position[0] + Math.sin(time * 0.5 + delay) * 2
      meshRef.current.position.y = position[1] + Math.cos(time * 0.3 + delay) * 2
      meshRef.current.position.z = position[2] + Math.sin(time * 0.4 + delay) * 1
      meshRef.current.rotation.x = time * 0.5
      meshRef.current.rotation.y = time * 0.3
    } else if (!assembled) {
      // Move to target position
      const current = meshRef.current.position
      const target = new THREE.Vector3(...targetPosition)
      const distance = current.distanceTo(target)

      if (distance < 0.1) {
        setAssembled(true)
        onAssembled()
      } else {
        current.lerp(target, 0.05)
        meshRef.current.rotation.x += 0.1
        meshRef.current.rotation.y += 0.1
      }
    }
  })

  return (
    <group ref={meshRef}>
      {/* DNA base pair visualization */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#D4AF7A"
          emissive="#D4AF7A"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0.6, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#9C7D5C"
          emissive="#9C7D5C"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
        <meshStandardMaterial
          color="#B89968"
          emissive="#B89968"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

// Assembled DNA Helix
function AssembledHelix({ spinning }: { spinning: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    if (spinning) {
      groupRef.current.rotation.y += 0.03
    }
  })

  // Create helix structure
  const basePairs = []
  const count = 30
  const height = 15
  const radius = 2

  for (let i = 0; i < count; i++) {
    const t = i / count
    const angle = t * Math.PI * 2 * 3
    const y = (t - 0.5) * height

    const x1 = Math.cos(angle) * radius
    const z1 = Math.sin(angle) * radius
    const x2 = Math.cos(angle + Math.PI) * radius
    const z2 = Math.sin(angle + Math.PI) * radius

    basePairs.push({
      key: i,
      pos1: [x1, y, z1] as [number, number, number],
      pos2: [x2, y, z2] as [number, number, number],
      y
    })
  }

  return (
    <group ref={groupRef}>
      {basePairs.map((bp) => (
        <group key={bp.key}>
          {/* Base pair spheres */}
          <mesh position={bp.pos1}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial
              color="#D4AF7A"
              emissive="#D4AF7A"
              emissiveIntensity={0.7}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          <mesh position={bp.pos2}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial
              color="#9C7D5C"
              emissive="#9C7D5C"
              emissiveIntensity={0.7}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Connecting bar */}
          <mesh
            position={[
              (bp.pos1[0] + bp.pos2[0]) / 2,
              bp.y,
              (bp.pos1[2] + bp.pos2[2]) / 2
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.08, 0.08, 4, 8]} />
            <meshStandardMaterial
              color="#B89968"
              emissive="#B89968"
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function DNAScene({ stage }: { stage: 'floating' | 'assembling' | 'spinning' | 'complete' }) {
  const [assembledCount, setAssembledCount] = useState(0)
  const totalStrands = 20

  // Generate random starting positions for strands
  const strandPositions = useRef(
    Array.from({ length: totalStrands }, () => [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ] as [number, number, number])
  ).current

  // Target positions for assembly
  const targetPositions = useRef(
    Array.from({ length: totalStrands }, (_, i) => {
      const t = i / totalStrands
      const angle = t * Math.PI * 2 * 3
      const y = (t - 0.5) * 15
      const x = Math.cos(angle) * 2
      const z = Math.sin(angle) * 2
      return [x, y, z] as [number, number, number]
    })
  ).current

  const handleAssembled = () => {
    setAssembledCount((c) => c + 1)
  }

  return (
    <>
      <color attach="background" args={['#F8F6F3']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[0, 0, 10]} intensity={1.5} color="#D4AF7A" />
      <pointLight position={[0, 0, -10]} intensity={1.5} color="#9C7D5C" />

      {(stage === 'floating' || stage === 'assembling') && (
        <>
          {strandPositions.map((pos, i) => (
            <FloatingStrand
              key={i}
              position={pos}
              delay={i * 0.3}
              assembling={stage === 'assembling'}
              targetPosition={targetPositions[i]}
              onAssembled={handleAssembled}
            />
          ))}
        </>
      )}

      {(stage === 'spinning' || stage === 'complete') && (
        <AssembledHelix spinning={stage === 'spinning' || stage === 'complete'} />
      )}
    </>
  )
}

export default function DNALoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'floating' | 'assembling' | 'spinning' | 'complete'>('floating')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const sequence = async () => {
      // Float for 1.5s
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStage('assembling')

      // Assemble for 2.5s
      await new Promise(resolve => setTimeout(resolve, 2500))
      setStage('spinning')

      // Spin for 1.5s
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStage('complete')

      // Fade out
      await new Promise(resolve => setTimeout(resolve, 800))
      onComplete()
    }

    sequence()

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-50 bg-cream flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 3D DNA Animation */}
          <div className="w-full h-full absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 20], fov: 50 }}
              gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping,
              }}
            >
              <DNAScene stage={stage} />
            </Canvas>
          </div>

          {/* Loading Text */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h2
              className="font-serif text-4xl md:text-5xl text-charcoal mb-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {stage === 'floating' && 'Initializing Your Journey'}
              {stage === 'assembling' && 'Assembling Cellular Intelligence'}
              {stage === 'spinning' && 'Activating Regenerative Potential'}
            </motion.h2>

            {/* Progress Bar */}
            <div className="w-80 h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur-xl">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-gold to-bronze rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <p className="text-rose-gold text-sm font-medium mt-4 tracking-wider">
              {Math.round(progress)}% COMPLETE
            </p>
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-rose-gold rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
