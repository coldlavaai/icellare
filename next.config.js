/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static.wixstatic.com', 'cdn.builder.io'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
