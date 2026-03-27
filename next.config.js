/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Pour Plesk sans CDN
  },
  // Pas de trailing slash pour rester cohérent avec le site HTML actuel
  trailingSlash: false,
}

module.exports = nextConfig
