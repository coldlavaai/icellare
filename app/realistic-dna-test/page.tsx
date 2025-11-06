'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei'
import { RealisticDNA } from '@/components/RealisticDNA'

function Scene() {
  return (
    <>
      {/* Light gray fog */}
      <fog attach="fog" args={['#f5f5f5', 20, 50]} />

      {/* Camera positioned to view DNA */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 28]}
        fov={45}
        near={0.1}
        far={1000}
      />

      {/* Lighting setup for photorealistic materials */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={0.6}
        color="#ffffff"
        castShadow
      />

      <directionalLight
        position={[-10, 5, -10]}
        intensity={0.2}
        color="#ffffff"
      />

      <ambientLight intensity={0.5} color="#ffffff" />

      {/* Point light inside DNA */}
      <pointLight
        position={[0, 0, 0]}
        intensity={0.4}
        distance={15}
        color="#ffffff"
      />

      {/* Environment for reflections */}
      <Environment preset="apartment" />

      {/* Orbit controls for interaction */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={50}
      />

      {/* Realistic DNA with flattened ribbons */}
      <RealisticDNA />
    </>
  )
}

export default function RealisticDNATestPage() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="absolute top-4 left-4 z-10 bg-white/90 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Realistic DNA (Enhanced Visuals)
        </h1>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Same size as ArchitecturalDNA:</strong></p>
          <p>• Height: 16 units</p>
          <p>• Radius: 2.3 units</p>
          <p>• 6 complete turns</p>
          <br />
          <p><strong>Enhanced features:</strong></p>
          <p>• Flattened ribbon strands (2.5:1 ratio)</p>
          <p>• Scientific base pair colors:</p>
          <p className="ml-4">→ A (Adenine) = Red/Coral</p>
          <p className="ml-4">→ T (Thymine) = Cyan</p>
          <p className="ml-4">→ G (Guanine) = Yellow/Gold</p>
          <p className="ml-4">→ C (Cytosine) = Mint Green</p>
          <p>• Photorealistic materials</p>
          <p>• Organic surface texture</p>
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
