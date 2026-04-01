import Image from 'next/image'
import Link from 'next/link'
import HeroSlider from '@/components/HeroSlider'
import PaymentBand, { PaymentBloc } from '@/components/PaymentBand'
import SegmentCards from '@/components/SegmentCards'
import ValueCards from '@/components/ValueCards'
import CounterSection from '@/components/CounterSection'
import FaqSection from '@/components/FaqSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import { getTestimonials, getPartners, getSeoByPage } from '@/lib/strapi'

export async function generateMetadata() {
  const seo = await getSeoByPage('home')
  return {
    title:       seo.title,
    description: seo.description,
    keywords:    seo.keywords,
    alternates:  { canonical: 'https://jokko.africa' },
    openGraph: {
      title:       seo.ogTitle       || seo.title,
      description: seo.ogDescription || seo.description,
      url:         'https://jokko.africa',
      siteName:    'Jokko Pro Africa',
      locale:      'fr_SN',
      type:        'website',
      images:      seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630 }] : [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  }
}

const DC_STATS = [
  { label: 'Disponibilité', value: '99.95%' },
  { label: 'Redondance', value: 'N+1' },
  { label: 'Chiffrement', value: 'AES-256' },
  { label: 'Monitoring', value: '24/7' },
  { label: 'Alimentation', value: '2N' },
  { label: 'Conformité', value: 'APDP' },
]

const WHY = [
  { title: 'Compréhension locale', desc: 'Nous connaissons votre marché et votre réalité.' },
  { title: 'Souveraineté des données', desc: '100% Sénégal. Jamais hors du territoire.' },
  { title: 'Relation humaine', desc: 'Un référent qui connaît votre contexte par cœur.' },
  { title: 'Flexibilité contractuelle', desc: 'Des contrats adaptés, pas génériques.' },
  { title: 'Engagement réel', desc: 'SLA formalisés, pénalités, transparence.' },
]


const FAQS = [
  { q: "Qu'est-ce que Jokko Pro Africa ?", a: "Le premier fournisseur cloud 100% sénégalais. Hébergement, serveurs cloud, email pro et SMS, hébergés dans un datacenter Tier III+ à Dakar. Opéré par DARISS CONSULTING SAS." },
  { q: "Quelle offre choisir ?", a: "Startup : Racine ou Sahara. Entreprise : Baobab ou Fondation. Institution : Héritage ou Forteresse. Pas sûr ? Contactez-nous — on vous oriente en 5 minutes." },
  { q: "Mes données restent au Sénégal ?", a: "Oui, 100%. Datacenter Tier III+ à Dakar. Conformité totale APDP. Vos données ne quittent jamais le territoire national, garanti par contrat." },
  { q: "Qu'est-ce qu'un datacenter Tier III+ ?", a: "Un datacenter Tier III+ garantit une redondance N+1 sur toutes ses infrastructures (alimentation, refroidissement, réseau), assurant 99.95% de disponibilité avec zéro interruption planifiée." },
  { q: "Que signifie le SLA contractuel ?", a: "Le SLA (Service Level Agreement) est un engagement de disponibilité formalisé dans votre contrat. Entreprise : 99,9%. Institution : 99,95% avec pénalités financières en cas de non-atteinte." },
  { q: "Puis-je migrer depuis un autre hébergeur ?", a: "Oui. Migration zéro downtime, configuration complète, formation de votre équipe et suivi 30 jours post-migration. Onboarding Accompagné dès 25 000 FCFA." },
  { q: "Comment fonctionne le support ?", a: "Startup : email J+1. Entreprise : email + téléphone 8h/5j, incident traité sous 4h. Institution : support 24/7 dédié, incident sous 1h. Toujours basé à Dakar, en français." },
  { q: "Puis-je évoluer vers une offre supérieure ?", a: "Oui, c'est conçu pour ça. Racine → Sahara → Baobab → Savane → Kilimandjaro. Migration fluide sans interruption ni perte de données. Vous ne changez jamais de prestataire." },
  { q: "Quels moyens de paiement ?", a: "Wave, Orange Money et +60 moyens de paiement dans 10 pays africains. Visa, Mastercard. Provisioning automatique dès confirmation du paiement." },
  { q: "Comment devenir partenaire ?", a: "Rejoignez le Programme Partenaires Jokko — Affilié, Revendeur ou Intégrateur. Contactez-nous ou consultez la page Partenaires pour découvrir les niveaux et conditions." },
]

const LOGOS = Array.from({length: 30}, (_, i) => `${i + 1}.png`)

export const revalidate = 3600

export default async function HomePage() {
  const [testimonials, partners] = await Promise.all([getTestimonials(), getPartners()])
  return (
    <>
      <HeroSlider />
      <PaymentBand />

      {/* Segments */}
      <section style={{ padding:'80px 0', background:'#fff' }} id="segments">
        <div className="container">
          <div className="reveal" style={{ textAlign:'center', marginBottom:48 }}>
            <div className="label" style={{ justifyContent:'center' }}>Nos Solutions</div>
            <h2 className="title">3 segments, une seule exigence</h2>
            <p className="subtitle" style={{ margin:'0 auto' }}>Même philosophie. Même exigence. Des niveaux de service différents.</p>
          </div>
          <SegmentCards />
        </div>
      </section>

      {/* Datacenter */}
      <section style={{ padding:'80px 0', background:'var(--ow)' }} id="dc">
        <div className="container">
          <div className="dc-grid">
            <div style={{ position:'relative', borderRadius:'var(--rx)', overflow:'hidden', boxShadow:'var(--shl)' }}>
              <img src="/_assets/logos/datacenter.jpg" alt="Datacenter Jokko" style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover' }} />
              <div style={{ position:'absolute',top:12,left:12,background:'rgba(0,0,0,.7)',color:'#fff',fontSize:'.72rem',fontWeight:700,padding:'5px 12px',borderRadius:999 }}>Tier III+ Certifié</div>
              <div style={{ position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(to top,rgba(0,0,0,.7),transparent)',padding:'20px 20px 16px' }}>
                <div style={{ color:'#fff',fontWeight:700,fontSize:'.88rem' }}>Datacenter Jokko · Dakar, Sénégal</div>
                <div style={{ color:'rgba(255,255,255,.7)',fontSize:'.75rem' }}>Infrastructure souveraine · Conformité APDP</div>
              </div>
            </div>
            <div>
              <div className="label">Infrastructure</div>
              <h2 className="title">Datacenter Tier III+ au cœur de l&apos;Afrique de l&apos;Ouest</h2>
              <p className="subtitle">Infrastructure 100% localisée au Sénégal. Les données ne quittent jamais le territoire national.</p>
              <div className="dc-stats-grid">
                {DC_STATS.map(s => (
                  <div key={s.label} style={{ background:'#fff',borderRadius:12,padding:'14px 16px',textAlign:'center',border:'1px solid var(--bd)' }}>
                    <div style={{ fontFamily:'var(--fd)',fontSize:'1.2rem',fontWeight:700,color:'var(--o)' }}>{s.value}</div>
                    <div style={{ fontSize:'.68rem',color:'var(--bm)',textTransform:'uppercase',letterSpacing:'1px',marginTop:3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .dc-grid { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:center; }
          .dc-stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
          @media(max-width:900px) {
            .dc-grid { grid-template-columns:1fr !important; gap:32px !important; }
            .dc-stats-grid { grid-template-columns:repeat(3,1fr) !important; }
          }
          @media(max-width:480px) {
            .dc-stats-grid { grid-template-columns:repeat(2,1fr) !important; }
          }
        `}</style>
      </section>

      {/* Values */}
      <section style={{ padding:'80px 0', background:'#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign:'center',marginBottom:48 }}>
            <div className="label" style={{ justifyContent:'center' }}>Nos Valeurs</div>
            <h2 className="title">Ce qui fait Jokko</h2>
            <p style={{ fontSize:'.95rem',color:'var(--bs)',fontStyle:'italic' }}>« Le vrai risque, ce n&apos;est pas la panne. C&apos;est l&apos;absence de responsabilité. »</p>
          </div>
          <ValueCards />
        </div>
      </section>

      {/* Why Jokko */}
      <section style={{ padding:'80px 0', background:'var(--ow)' }}>
        <div className="container">
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'center' }}>
            <div style={{ borderRadius:'var(--rx)',overflow:'hidden',boxShadow:'var(--sh)' }}>
              <img src="/_assets/logos/equipe-jokko.png" alt="Équipe Jokko" style={{ width:'100%',aspectRatio:'4/3',objectFit:'cover' }} />
            </div>
            <div>
              <div className="label">Pourquoi Jokko</div>
              <h2 className="title">Pourquoi Jokko, pas un géant global ?</h2>
              <p style={{ fontSize:'.95rem',color:'var(--bs)',marginBottom:24,fontStyle:'italic' }}>Les grands acteurs sont puissants. Mais ils ne sont pas responsables de votre contexte.</p>
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                {WHY.map(w => (
                  <div key={w.title} style={{ display:'flex',alignItems:'flex-start',gap:14 }}>
                    <div style={{ width:42,height:42,minWidth:42,borderRadius:12,background:'var(--obg2)',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--o)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <h4 style={{ fontFamily:'var(--fd)',fontSize:'.95rem',fontWeight:700,marginBottom:3 }}>{w.title}</h4>
                      <p style={{ fontSize:'.84rem',color:'var(--bs)' }}>{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){section .container [style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>

            <TestimonialsSection testimonials={testimonials} />

      {/* Marquee logos */}
      <section style={{ padding:'36px 0',borderTop:'1px solid var(--bd)',borderBottom:'1px solid var(--bd)',overflow:'hidden',background:'var(--ow)' }}>
        <div style={{ fontSize:'.65rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'2px',color:'var(--bf)',textAlign:'center',marginBottom:14 }}>Ils nous font confiance</div>
        <div style={{ overflow:'hidden' }}>
          <div className="marquee-track">
            {partners.length > 0
              ? [...partners, ...partners].map((p, i) => (
                  <img key={i} src={p.logo} alt={p.name} title={p.name} />
                ))
              : [...LOGOS, ...LOGOS].map((l, i) => (
                  <img key={i} src={`/_assets/partenaires/${l}`} alt={`Partenaire ${l.replace('.png','')}`} />
                ))
            }
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 0', background:'#fff' }}>
        <div className="container">
          <div style={{ background:'linear-gradient(135deg,var(--o),var(--ol))',borderRadius:'var(--rx)',padding:'56px 48px',textAlign:'center',color:'#fff',position:'relative',overflow:'hidden' }}>
            <div style={{ position:'absolute',top:-50,right:-50,width:200,height:200,borderRadius:'50%',background:'rgba(255,255,255,.08)' }} />
            <h2 style={{ fontFamily:'var(--fd)',fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:700,marginBottom:10 }}>Qui assume votre continuité numérique ?</h2>
            <p style={{ fontSize:'.98rem',color:'rgba(255,255,255,.85)',margin:'0 auto 24px',maxWidth:460 }}>
              La bonne question n&apos;est pas combien coûte l&apos;hébergement. C&apos;est qui en prend la responsabilité. <strong>Jokko assume.</strong>
            </p>
            <div style={{ display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap' }}>
              <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-w btn-lg">Espace Client →</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background:'rgba(255,255,255,.15)',color:'#fff',border:'1.5px solid rgba(255,255,255,.3)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background:'rgba(255,255,255,.15)',color:'#fff',border:'1.5px solid rgba(255,255,255,.25)',display:'flex',alignItems:'center',gap:6 }}>
                <Image src="/_assets/logos/logo-whatsapp.png" alt="WA" width={18} height={18} style={{ objectFit:'contain',borderRadius:4 }} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
