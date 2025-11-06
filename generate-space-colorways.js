const fs = require('fs');
const path = require('path');

// 12 Space-themed colorways - Blues, Purples, Pinks, Cyans, Magentas only
const spaceColorways = [
  {
    name: 'cosmic-ocean',
    displayName: 'Cosmic Ocean',
    dnaColors: { A: '0x00BFFF', T: '0xFF1493', G: '0x9370DB', C: '0x00CED1' }, // Deep Sky Blue, Deep Pink, Medium Purple, Dark Turquoise
    background: 'radial-gradient(ellipse at 50% 20%, #0a1929 0%, #020814 25%, #000510 50%, #000208 75%, #000000 100%)',
    fogColor: '#020814',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 191, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'deep-space',
    displayName: 'Deep Space',
    dnaColors: { A: '0x4169E1', T: '0xFF69B4', G: '0x9932CC', C: '0x00FFFF' }, // Royal Blue, Hot Pink, Dark Orchid, Cyan
    background: 'radial-gradient(ellipse at 50% 20%, #0d0d20 0%, #050510 25%, #020208 50%, #000000 75%, #000000 100%)',
    fogColor: '#050510',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(65, 105, 225, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 105, 180, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'nebula-purple',
    displayName: 'Nebula Purple',
    dnaColors: { A: '0x8A2BE2', T: '0xFF00FF', G: '0x4B0082', C: '0x00FFFF' }, // Blue Violet, Magenta, Indigo, Cyan
    background: 'radial-gradient(ellipse at 50% 20%, #1a0a2e 0%, #0f0624 25%, #0a0412 50%, #050208 75%, #000000 100%)',
    fogColor: '#0a0412',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(138, 43, 226, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'midnight-blue',
    displayName: 'Midnight Blue',
    dnaColors: { A: '0x191970', T: '0xFF1493', G: '0x6A5ACD', C: '0x40E0D0' }, // Midnight Blue, Deep Pink, Slate Blue, Turquoise
    background: 'radial-gradient(ellipse at 50% 20%, #0f1729 0%, #070b14 25%, #030508 50%, #010203 75%, #000000 100%)',
    fogColor: '#070b14',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(25, 25, 112, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'electric-violet',
    displayName: 'Electric Violet',
    dnaColors: { A: '0x9400D3', T: '0xFF00FF', G: '0x4169E1', C: '0x00CED1' }, // Dark Violet, Magenta, Royal Blue, Dark Turquoise
    background: 'radial-gradient(ellipse at 50% 20%, #1a0a29 0%, #0d0514 25%, #06020a 50%, #020105 75%, #000000 100%)',
    fogColor: '#0d0514',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(148, 0, 211, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'sapphire-nights',
    displayName: 'Sapphire Nights',
    dnaColors: { A: '0x0F52BA', T: '0xFF69B4', G: '0x7B68EE', C: '0x48D1CC' }, // Sapphire, Hot Pink, Medium Slate Blue, Medium Turquoise
    background: 'radial-gradient(ellipse at 50% 20%, #0a1525 0%, #051020 25%, #02080f 50%, #010408 75%, #000000 100%)',
    fogColor: '#051020',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(15, 82, 186, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 105, 180, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'aurora-magenta',
    displayName: 'Aurora Magenta',
    dnaColors: { A: '0xFF00FF', T: '0x00BFFF', G: '0xDA70D6', C: '0x00FFFF' }, // Magenta, Deep Sky Blue, Orchid, Cyan
    background: 'radial-gradient(ellipse at 50% 20%, #1a0a20 0%, #0d0512 25%, #06020a 50%, #030105 75%, #000000 100%)',
    fogColor: '#0d0512',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(255, 0, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'indigo-fusion',
    displayName: 'Indigo Fusion',
    dnaColors: { A: '0x4B0082', T: '0xFF1493', G: '0x1E90FF', C: '0x9370DB' }, // Indigo, Deep Pink, Dodger Blue, Medium Purple
    background: 'radial-gradient(ellipse at 50% 20%, #0e0a20 0%, #070514 25%, #03020a 50%, #010103 75%, #000000 100%)',
    fogColor: '#070514',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(75, 0, 130, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 20, 147, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'cyber-blue',
    displayName: 'Cyber Blue',
    dnaColors: { A: '0x00FFFF', T: '0xFF00FF', G: '0x0000FF', C: '0xFF69B4' }, // Cyan, Magenta, Blue, Hot Pink
    background: 'radial-gradient(ellipse at 50% 20%, #0a1a2e 0%, #051020 25%, #020810 50%, #010405 75%, #000000 100%)',
    fogColor: '#051020',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'plum-twilight',
    displayName: 'Plum Twilight',
    dnaColors: { A: '0xDDA0DD', T: '0x00CED1', G: '0x8B008B', C: '0x4682B4' }, // Plum, Dark Turquoise, Dark Magenta, Steel Blue
    background: 'radial-gradient(ellipse at 50% 20%, #150a20 0%, #0b0512 25%, #05020a 50%, #020105 75%, #000000 100%)',
    fogColor: '#0b0512',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(221, 160, 221, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(0, 206, 209, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'stellar-pink',
    displayName: 'Stellar Pink',
    dnaColors: { A: '0xFF1493', T: '0x00BFFF', G: '0xC71585', C: '0x6495ED' }, // Deep Pink, Deep Sky Blue, Medium Violet Red, Cornflower Blue
    background: 'radial-gradient(ellipse at 50% 20%, #1a0a20 0%, #0d0512 25%, #06020a 50%, #030105 75%, #000000 100%)',
    fogColor: '#0d0512',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(255, 20, 147, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)'
  },
  {
    name: 'periwinkle-dream',
    displayName: 'Periwinkle Dream',
    dnaColors: { A: '0xCCCCFF', T: '0xFF00FF', G: '0x6A5ACD', C: '0x00FFFF' }, // Periwinkle, Magenta, Slate Blue, Cyan
    background: 'radial-gradient(ellipse at 50% 20%, #0f0f2e 0%, #080814 25%, #04040a 50%, #020205 75%, #000000 100%)',
    fogColor: '#080814',
    accentGradient: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(204, 204, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 80% 70%, rgba(255, 0, 255, 0.1) 0%, transparent 50%)'
  }
];

console.log(`Creating ${spaceColorways.length} space-themed colorways...`);
console.log('Color palette: Blues, Purples, Pinks, Cyans, Magentas only');
console.log('Backgrounds: Various shades of dark blue (nearly black to deep blue/purple)\n');

spaceColorways.forEach((colorway, index) => {
  console.log(`${index + 1}. ${colorway.displayName} - ${colorway.name}`);
});

console.log('\nRun: node generate-space-pages.js to create the actual page files');
