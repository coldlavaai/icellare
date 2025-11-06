'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei'
import { ScientificDNA } from '@/components/ScientificDNA'

function Scene() {
  return (
    <>
      {/* Light gray fog */}
      <fog attach="fog" args={['#f5f5f5', 2000, 5000]} />

      {/* Camera positioned to view DNA */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 2500]}
        fov={45}
        near={1}
        far={10000}
      />

      {/* Lighting setup for photorealistic materials */}
      <directionalLight
        position={[1000, 1500, 1000]}
        intensity={0.6}
        color="#ffffff"
        castShadow
      />

      <directionalLight
        position={[-1000, 500, -1000]}
        intensity={0.2}
        color="#ffffff"
      />

      <ambientLight intensity={0.5} color="#ffffff" />

      {/* Point light inside DNA */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.4}
        distance={2000}
        color="#ffffff"
      />

      {/* Environment for reflections */}
      <Environment preset="apartment" />

      {/* Orbit controls for interaction */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={800}
        maxDistance={4000}
      />

      {/* Scientific DNA */}
      <ScientificDNA />
    </>
  )
}

export default function DNATestPage() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="absolute top-4 left-4 z-10 bg-white/90 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Scientifically Accurate DNA
        </h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Radius: 200 units (1.0 nm scaled)</p>
          <p>• Pitch: 680 units (3.4 nm scaled)</p>
          <p>• 10 complete turns</p>
          <p>• 10.5 base pairs per turn</p>
          <p>• Flattened ribbon strands (2.5:1 ratio)</p>
          <p>• Photorealistic materials</p>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p>Controls:</p>
          <p>• Left mouse: Rotate</p>
          <p>• Right mouse: Pan</p>
          <p>• Scroll: Zoom</p>
        </div>
      </div>

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
