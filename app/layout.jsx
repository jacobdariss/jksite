import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import CrispChat from '@/components/CrispChat'
import ScrollRevealInit from '@/components/ScrollRevealInit'

export const metadata = {
  title: 'Jokko Pro Africa — Le 1er Cloud 100% Sénégalais',
  description: 'Hébergement cloud souverain pour Startups, Entreprises et Institutions. Datacenter Tier III+ à Dakar. Dès 2 000 FCFA/mois.',
  keywords: 'hébergement sénégal, cloud souverain, datacenter dakar, jokko pro africa',
  openGraph: {
    title: 'Jokko Pro Africa — Le 1er Cloud 100% Sénégalais',
    description: 'Hébergement cloud souverain pour Startups, Entreprises et Institutions.',
    url: 'https://jokko.africa',
    siteName: 'Jokko Pro Africa',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'fr_SN',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/_assets/logos/jokko-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body>
        <Topbar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CrispChat />
        <ScrollRevealInit />
      </body>
    </html>
  )
}
