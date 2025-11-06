const fs = require('fs');
const path = require('path');

const spaceColorways = [
  {
    name: 'cosmic-ocean',
    displayName: 'Cosmic Ocean',
    dnaColors: { A: '0x00BFFF', T: '0xFF1493', G: '0x9370DB', C: '0x00CED1' },
    background: 'radial-gradient(ellipse at 50% 20%, #0a1929 0%, #020814 25%, #000510 50%, #000208 75%, #000000 100%)',
    fogColor: '#020814',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 191, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'deep-space',
    displayName: 'Deep Space',
    dnaColors: { A: '0x4169E1', T: '0xFF69B4', G: '0x9932CC', C: '0x00FFFF' },
    background: 'radial-gradient(ellipse at 50% 20%, #0d0d20 0%, #050510 25%, #020208 50%, #000000 75%, #000000 100%)',
    fogColor: '#050510',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(65, 105, 225, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 105, 180, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'nebula-purple',
    displayName: 'Nebula Purple',
    dnaColors: { A: '0x8A2BE2', T: '0xFF00FF', G: '0x4B0082', C: '0x00FFFF' },
    background: 'radial-gradient(ellipse at 50% 20%, #1a0a2e 0%, #0f0624 25%, #0a0412 50%, #050208 75%, #000000 100%)',
    fogColor: '#0a0412',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(138, 43, 226, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'midnight-blue',
    displayName: 'Midnight Blue',
    dnaColors: { A: '0x191970', T: '0xFF1493', G: '0x6A5ACD', C: '0x40E0D0' },
    background: 'radial-gradient(ellipse at 50% 20%, #0f1729 0%, #070b14 25%, #030508 50%, #010203 75%, #000000 100%)',
    fogColor: '#070b14',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(25, 25, 112, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'electric-violet',
    displayName: 'Electric Violet',
    dnaColors: { A: '0x9400D3', T: '0xFF00FF', G: '0x4169E1', C: '0x00CED1' },
    background: 'radial-gradient(ellipse at 50% 20%, #1a0a29 0%, #0d0514 25%, #06020a 50%, #020105 75%, #000000 100%)',
    fogColor: '#0d0514',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(148, 0, 211, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'sapphire-nights',
    displayName: 'Sapphire Nights',
    dnaColors: { A: '0x0F52BA', T: '0xFF69B4', G: '0x7B68EE', C: '0x48D1CC' },
    background: 'radial-gradient(ellipse at 50% 20%, #0a1525 0%, #051020 25%, #02080f 50%, #010408 75%, #000000 100%)',
    fogColor: '#051020',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(15, 82, 186, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 105, 180, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'aurora-magenta',
    displayName: 'Aurora Magenta',
    dnaColors: { A: '0xFF00FF', T: '0x00BFFF', G: '0xDA70D6', C: '0x00FFFF' },
    background: 'radial-gradient(ellipse at 50% 20%, #1a0a20 0%, #0d0512 25%, #06020a 50%, #030105 75%, #000000 100%)',
    fogColor: '#0d0512',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(255, 0, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'indigo-fusion',
    displayName: 'Indigo Fusion',
    dnaColors: { A: '0x4B0082', T: '0xFF1493', G: '0x1E90FF', C: '0x9370DB' },
    background: 'radial-gradient(ellipse at 50% 20%, #0e0a20 0%, #070514 25%, #03020a 50%, #010103 75%, #000000 100%)',
    fogColor: '#070514',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(75, 0, 130, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'cyber-blue',
    displayName: 'Cyber Blue',
    dnaColors: { A: '0x00FFFF', T: '0xFF00FF', G: '0x0000FF', C: '0xFF69B4' },
    background: 'radial-gradient(ellipse at 50% 20%, #0a1a2e 0%, #051020 25%, #020810 50%, #010405 75%, #000000 100%)',
    fogColor: '#051020',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'plum-twilight',
    displayName: 'Plum Twilight',
    dnaColors: { A: '0xDDA0DD', T: '0x00CED1', G: '0x8B008B', C: '0x4682B4' },
    background: 'radial-gradient(ellipse at 50% 20%, #150a20 0%, #0b0512 25%, #05020a 50%, #020105 75%, #000000 100%)',
    fogColor: '#0b0512',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(221, 160, 221, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(0, 206, 209, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'stellar-pink',
    displayName: 'Stellar Pink',
    dnaColors: { A: '0xFF1493', T: '0x00BFFF', G: '0xC71585', C: '0x6495ED' },
    background: 'radial-gradient(ellipse at 50% 20%, #1a0a20 0%, #0d0512 25%, #06020a 50%, #030105 75%, #000000 100%)',
    fogColor: '#0d0512',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(255, 20, 147, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'periwinkle-dream',
    displayName: 'Periwinkle Dream',
    dnaColors: { A: '0xCCCCFF', T: '0xFF00FF', G: '0x6A5ACD', C: '0x00FFFF' },
    background: 'radial-gradient(ellipse at 50% 20%, #0f0f2e 0%, #080814 25%, #04040a 50%, #020205 75%, #000000 100%)',
    fogColor: '#080814',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(204, 204, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)'
  }
];

// Create directories and files for each colorway
spaceColorways.forEach(colorway => {
  const dir = path.join(__dirname, 'app', `loading-test-${colorway.name}`);
  const componentsDir = path.join(dir, 'components');

  // Create directories
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  // Create ArchitecturalDNA.tsx component
  const dnaComponent = `'use client'

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
    A: ${colorway.dnaColors.A},
    T: ${colorway.dnaColors.T},
    G: ${colorway.dnaColors.G},
    C: ${colorway.dnaColors.C},
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
          <group key={\`strand\${i}\`}>
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
        <color attach="background" args={['${colorway.fogColor}']} />
        <fog attach="fog" args={['${colorway.fogColor}', 15, 35]} />

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00BFFF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#FF1493" />
        <pointLight position={[0, 0, 15]} intensity={1} color="#9370DB" />

        <DNAHelix />
      </Canvas>
    </div>
  )
}
`;

  fs.writeFileSync(path.join(componentsDir, 'ArchitecturalDNA.tsx'), dnaComponent);

  // Create page.tsx
  const pageContent = `'use client'

import { motion } from 'framer-motion'
import ArchitecturalDNA from './components/ArchitecturalDNA'
import { ColorSchemeNav } from '@/components/ColorSchemeNav'

export default function ${colorway.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Page() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden" style={{ background: '${colorway.background}' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: '${colorway.accentGradient}' }} />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <ArchitecturalDNA />
        </div>

        <motion.div
          className="relative z-20 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)',
              textShadow: '0 0 30px rgba(0,191,255,0.5), 0 0 60px rgba(255,20,147,0.3)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            ${colorway.displayName}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/80 mb-8 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Architectural Excellence Encoded
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 font-medium">
              Explore Projects
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:from-cyan-500/30 hover:to-pink-500/30 transition-all duration-300 font-medium">
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </div>

      <ColorSchemeNav />

      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center z-[150] pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <p className="text-white/40 text-sm tracking-wider">SCROLL TO DISCOVER</p>
      </motion.div>
    </main>
  )
}
`;

  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);

  console.log(`✓ Created ${colorway.displayName} (loading-test-${colorway.name})`);
});

console.log(`\nSuccessfully created ${spaceColorways.length} space-themed colorway pages!`);
console.log('Each colorway has:');
console.log('- Unique DNA colors (blues, purples, pinks, cyans, magentas)');
console.log('- Blue-based background gradients (nearly black to deep blue/purple)');
console.log('- ArchitecturalDNA component with matching colors');
console.log('- Full page layout with ColorSchemeNav at bottom');
