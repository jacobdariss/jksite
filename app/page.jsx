import Image from 'next/image'
import Link from 'next/link'
import HeroSlider from '@/components/HeroSlider'
import PaymentBand, { PaymentBloc } from '@/components/PaymentBand'
import SegmentCards from '@/components/SegmentCards'
import ValueCards from '@/components/ValueCards'
import CounterSection from '@/components/CounterSection'

export const metadata = {
  title: 'Jokko Pro Africa — Le 1er Cloud 100% Sénégalais',
  description: 'Hébergement cloud souverain pour Startups, Entreprises et Institutions. Datacenter Tier III+ à Dakar. Dès 2 000 FCFA/mois.',
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

const TESTIS = [
  { text: "Depuis que nous sommes chez Jokko, zéro souci technique. L'équipe est réactive et comprend nos besoins.", name: 'Amadou Diallo', role: 'DG — Agence Digitale Dakar', color: '#E85D04' },
  { text: "La souveraineté de nos données était non négociable. Jokko est le seul à offrir ça avec un SLA à pénalités.", name: 'Fatou Ndiaye', role: 'DSI — Institution Publique', color: '#6B4C9A' },
  { text: "Migration depuis OVH en 48h, zéro downtime. Le support local fait toute la différence.", name: 'Moussa Ba', role: 'CTO — Startup SaaS', color: '#0D0D0D' },
]

const FAQS = [
  { q: "Qu'est-ce que Jokko Pro Africa ?", a: "Le premier fournisseur cloud 100% sénégalais. Hébergement, serveurs cloud, email pro et SMS, hébergés dans un datacenter Tier III+ à Dakar." },
  { q: "Quelle offre choisir ?", a: "Startup : Racine ou Sahara. Entreprise : Baobab ou Fondation. Institution : Héritage ou Forteresse. Pas sûr ? Contactez-nous." },
  { q: "Mes données restent au Sénégal ?", a: "Oui, 100%. Datacenter Tier III+ à Dakar. Conformité totale APDP. Données jamais hors du territoire." },
  { q: "Quels moyens de paiement ?", a: "Mobile Money (Wave, Orange Money, MTN, Moov et +60 autres dans 10 pays africains) et CB (Visa, Mastercard). Provisioning automatique dès confirmation." },
  { q: "Puis-je migrer depuis un autre hébergeur ?", a: "Oui. Migration zéro downtime, formation, suivi 30 jours. Onboarding Accompagné dès 25 000 FCFA." },
  { q: "Comment fonctionne le support ?", a: "Startup : email J+1. Entreprise : email+tél 8h/5j. Institution : 24/7 dédié. Basé à Dakar, en français." },
]

const LOGOS = ['logo-secnsa-196x110.png','sonatel-accademy.png','logo-cnts.png','logo-batinov.png','logo-ctic.jpg','logo-omvs-300x171.png','logo-prodac.png','logo-Access-technologies.jpg','logo-olac-sn_bk.png','logo-abco.jpg','logo-enda-graf.jpg']

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <PaymentBand />

      {/* Segments */}
      <section style={{ padding:'80px 0', background:'#fff' }} id="segments">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:48 }}>
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
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center' }}>
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
              <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12 }}>
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
        <style>{`@media(max-width:900px){#dc .container>div{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Values */}
      <section style={{ padding:'80px 0', background:'#fff' }}>
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:48 }}>
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

      {/* Testimonials */}
      <section style={{ padding:'80px 0', background:'#fff' }}>
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:48 }}>
            <div className="label" style={{ justifyContent:'center' }}>Témoignages</div>
            <h2 className="title">Ce que nos clients disent</h2>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24 }}>
            {TESTIS.map((t,i) => (
              <div key={i} style={{ background:'#fff',border:'1px solid var(--bd)',borderRadius:'var(--rx)',overflow:'hidden' }}>
                <div style={{ height:4,background:t.color }} />
                <div style={{ padding:24 }}>
                  <div style={{ color:'var(--o)',fontSize:'.82rem',letterSpacing:1,marginBottom:14 }}>★★★★★</div>
                  <p style={{ fontFamily:'var(--fd)',fontSize:'.95rem',lineHeight:1.6,color:'var(--bs)',fontStyle:'italic',marginBottom:16 }}>« {t.text} »</p>
                  <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                    <div style={{ width:40,height:40,borderRadius:'50%',background:t.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.75rem',fontWeight:800,color:'#fff',flexShrink:0 }}>
                      {t.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize:'.85rem',fontWeight:700 }}>{t.name}</div>
                      <div style={{ fontSize:'.72rem',color:'var(--bm)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){section .container [style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      <PaymentBloc />

      {/* FAQ */}
      <section style={{ padding:'80px 0', background:'var(--ow)' }} id="faq">
        <div className="container" style={{ maxWidth:720 }}>
          <div style={{ textAlign:'center',marginBottom:44 }}>
            <div className="label" style={{ justifyContent:'center' }}>FAQ</div>
            <h2 className="title">Questions fréquentes</h2>
          </div>
          {FAQS.map((f,i) => (
            <details key={i} style={{ borderBottom:'1px solid var(--bd)',padding:'18px 0' }}>
              <summary style={{ fontWeight:600,fontSize:'.95rem',cursor:'pointer',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                {f.q}<span style={{ color:'var(--o)',fontSize:'1.2rem',flexShrink:0,marginLeft:12 }}>+</span>
              </summary>
              <p style={{ fontSize:'.88rem',color:'var(--bs)',lineHeight:1.7,marginTop:10 }}>{f.a}</p>
            </details>
          ))}
          <div style={{ textAlign:'center',marginTop:32 }}>
            <a href="https://help.jokko.africa/fr/" target="_blank" rel="noreferrer" className="btn btn-ol">Base de connaissances →</a>
          </div>
        </div>
      </section>

      <CounterSection />

      {/* Marquee logos */}
      <section style={{ padding:'36px 0',borderTop:'1px solid var(--bd)',borderBottom:'1px solid var(--bd)',overflow:'hidden',background:'var(--ow)' }}>
        <div style={{ fontSize:'.65rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'2px',color:'var(--bf)',textAlign:'center',marginBottom:14 }}>Ils nous font confiance</div>
        <div style={{ display:'flex',gap:40,alignItems:'center',flexWrap:'wrap',justifyContent:'center',padding:'0 24px' }}>
          {LOGOS.map(l => <img key={l} src={`/_assets/logos/${l}`} alt={l} style={{ height:45,maxWidth:140,objectFit:'contain',opacity:.8 }} />)}
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
