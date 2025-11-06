/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['static.wixstatic.com', 'cdn.builder.io', 'cdn.shopify.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
