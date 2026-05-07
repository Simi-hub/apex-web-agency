/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow SVG imports and image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Strict mode for catching bugs early
  reactStrictMode: true,
}

module.exports = nextConfig
