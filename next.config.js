/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  trailingSlash: false,
  // Rewrites : les URLs propres → fichiers HTML statiques dans public/
  async rewrites() {
    return [
      { source: '/', destination: '/static-html/index.html' },
      { source: '/startup', destination: '/static-html/startup/index.html' },
      { source: '/entreprise', destination: '/static-html/entreprise/index.html' },
      { source: '/institution', destination: '/static-html/institution/index.html' },
      { source: '/services', destination: '/static-html/services/index.html' },
      { source: '/partenaires', destination: '/static-html/partenaires/index.html' },
      { source: '/apropos', destination: '/static-html/apropos/index.html' },
      { source: '/cgu', destination: '/static-html/cgu/index.html' },
      { source: '/mentions-legales', destination: '/static-html/mentions-legales/index.html' },
      { source: '/politique-confidentialite', destination: '/static-html/politique-confidentialite/index.html' },
      { source: '/droits-domaine', destination: '/static-html/droits-domaine/index.html' },
    ]
  },
}

module.exports = nextConfig
