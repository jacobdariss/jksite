/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  trailingSlash: false,
  // Plus de rewrites vers static-html : toutes les pages sont gérées par Next.js App Router
}

module.exports = nextConfig
