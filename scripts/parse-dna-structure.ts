import * as fs from 'fs'

interface Atom {
  x: number
  y: number
  z: number
  chain: string
  residue: string
  atomType: string
}

// Parse PDB file and extract backbone atoms
function parsePDB(filename: string): { chainA: Atom[], chainB: Atom[] } {
  const content = fs.readFileSync(filename, 'utf-8')
  const lines = content.split('\n')

  const chainA: Atom[] = []
  const chainB: Atom[] = []

  for (const line of lines) {
    if (line.startsWith('ATOM')) {
      const atomType = line.substring(12, 16).trim()
      const chain = line.substring(21, 22).trim()
      const residue = line.substring(17, 20).trim()
      const x = parseFloat(line.substring(30, 38))
      const y = parseFloat(line.substring(38, 46))
      const z = parseFloat(line.substring(46, 54))

      // Extract phosphate atoms (P) or C4' atoms for backbone trace
      if (atomType === 'P' || atomType === "C4'") {
        const atom = { x, y, z, chain, residue, atomType }
        if (chain === 'A') {
          chainA.push(atom)
        } else if (chain === 'B') {
          chainB.push(atom)
        }
      }
    }
  }

  return { chainA, chainB }
}

// Center and scale coordinates
function normalizeCoordinates(atoms: Atom[]): { x: number, y: number, z: number }[] {
  if (atoms.length === 0) return []

  // Find bounding box
  let minX = Infinity, maxX = -Infinity
  let minY = Infinity, maxY = -Infinity
  let minZ = Infinity, maxZ = -Infinity

  for (const atom of atoms) {
    minX = Math.min(minX, atom.x)
    maxX = Math.max(maxX, atom.x)
    minY = Math.min(minY, atom.y)
    maxY = Math.max(maxY, atom.y)
    minZ = Math.min(minZ, atom.z)
    maxZ = Math.max(maxZ, atom.z)
  }

  // Center coordinates
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const centerZ = (minZ + maxZ) / 2

  // Scale to fit our desired height (16 units)
  const height = maxZ - minZ
  const scaleFactor = 16 / height

  return atoms.map(atom => ({
    x: (atom.x - centerX) * scaleFactor,
    y: (atom.z - minZ) * scaleFactor - 8, // Center vertically around 0
    z: (atom.y - centerY) * scaleFactor
  }))
}

// Main execution
const { chainA, chainB } = parsePDB('./dna.pdb')

console.log('Chain A atoms:', chainA.length)
console.log('Chain B atoms:', chainB.length)

const normalizedA = normalizeCoordinates(chainA)
const normalizedB = normalizeCoordinates(chainB)

// Output as JSON for use in React component
const output = {
  strand1: normalizedA,
  strand2: normalizedB,
  info: {
    originalChainA: chainA.length,
    originalChainB: chainB.length,
    structure: '1BNA - B-DNA dodecamer'
  }
}

fs.writeFileSync('./public/dna-coords.json', JSON.stringify(output, null, 2))

console.log('\n✅ DNA coordinates extracted and saved to public/dna-coords.json')
console.log('\nSample coordinates (Chain A):')
console.log(normalizedA.slice(0, 3))
console.log('\nSample coordinates (Chain B):')
console.log(normalizedB.slice(0, 3))
