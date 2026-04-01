export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/statut',
          '/candidature',
        ],
      },
    ],
    sitemap: 'https://jokko.africa/sitemap.xml',
    host: 'https://jokko.africa',
  }
}
