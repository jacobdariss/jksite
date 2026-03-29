import PageHero from '@/components/PageHero'

const VALEURS = [
  { title: 'Souveraineté', desc: 'Vos données restent au Sénégal. Datacenter Tier III+ à Dakar, conformité APDP, jamais hors territoire.', icon: '<path d="M12 3l8 4v5c0 5-4 9-8 10C8 21 4 17 4 12V7z"/>' },
  { title: 'Proximité', desc: 'Un interlocuteur clair. Support humain et local, en français, depuis Dakar. Pas de transferts sans fin.', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>' },
  { title: 'Fiabilité', desc: '99.95% de disponibilité. Monitoring IA 24/7, SLA formalisés avec pénalités contractuelles.', icon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
  { title: 'Évolution', desc: 'Startup → Entreprise → Institution, sans migration brutale. Votre offre grandit avec vous.', icon: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>' },
]

const STATS = [
  { value: '+350', label: 'Services actifs' },
  { value: '99.95%', label: 'Uptime garanti' },
  { value: '12', label: 'Offres cloud' },
  { value: '10', label: 'Pays Afrique' },
  { value: '24/7', label: 'Support dédié' },
]

const TEAM = [
  { name: 'Papa Yankhoba Ndiaye', role: 'Président — DARISS CONSULTING', initials: 'PYN' },
  { name: 'Équipe Technique', role: 'Ingénieurs Cloud & Infrastructure', initials: 'ET' },
  { name: 'Support Client', role: 'Disponible 8h–18h GMT · 24/7 Institution', initials: 'SC' },
]

const PAYS = [
  { code: 'SN', name: 'Sénégal', pay: 'Wave · Orange Money' },
  { code: 'CI', name: "Côte d'Ivoire", pay: 'Orange Money · MTN · Wave' },
  { code: 'CM', name: 'Cameroun', pay: 'Orange Money · MTN · Wave' },
  { code: 'ML', name: 'Mali', pay: 'Orange Money · Wave' },
  { code: 'BF', name: 'Burkina Faso', pay: 'Orange Money · Moov' },
  { code: 'GN', name: 'Guinée', pay: 'Orange Money · MTN' },
  { code: 'TG', name: 'Togo', pay: 'Togocel · Moov' },
  { code: 'BJ', name: 'Bénin', pay: 'MTN · Moov' },
  { code: 'NE', name: 'Niger', pay: 'Airtel · Orange Money' },
  { code: 'GA', name: 'Gabon', pay: 'Airtel · Moov' },
]

export default function APropos() {
  return (
    <>
      <PageHero
        label="À propos"
        title="Votre partenaire Cloud"
        titleEm="souverain."
        desc="Jokko Pro Africa est le premier fournisseur de cloud 100% sénégalais. Fondé à Dakar par DARISS CONSULTING SAS, nous hébergeons vos données sur le territoire national avec un engagement de continuité sans compromis."
        img="/_assets/logos/equipe-jokko.png"
        badge="DARISS CONSULTING SAS"
        color="var(--o)"
        ctas={[
          { label: 'Voir nos offres →', href: '/#segments' },
          { label: 'Nous contacter', href: 'https://manage.jokko.africa/submitticket.php' },
        ]}
      />

      {/* Mission */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Notre mission</div>
            <h2 className="title">Avant de parler de technologie,<br/>parlons de vous.</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>La majorité des hébergeurs vendent des ressources. Pas des résultats. Jokko prend la responsabilité de votre continuité numérique.</p>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {VALEURS.map((v, i) => (
              <div key={i} className="hover-lift" style={{ background: 'var(--ow)', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--obg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'var(--o)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: v.icon }} />
                </div>
                <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: '.84rem', color: 'var(--bs)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){section .container [style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:500px){section .container [style*="repeat(4,1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 0', background: 'var(--ow)', borderTop: '1px solid var(--bd)' }}>
        <div className="container">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 'var(--rx)', padding: '28px 16px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,.04)' }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '2rem', fontWeight: 700, color: 'var(--o)' }}>{s.value}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--bm)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){section .container [style*="repeat(5,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* Infrastructure */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div className="reveal">
              <div style={{ borderRadius: 'var(--rx)', overflow: 'hidden', boxShadow: 'var(--shl)' }}>
                <img src="/_assets/logos/datacenter.jpg" alt="Datacenter Jokko" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="label">Infrastructure</div>
              <h2 className="title">Datacenter Tier III+<br/>au coeur de Dakar</h2>
              <p style={{ fontSize: '.95rem', color: 'var(--bs)', lineHeight: 1.7, marginBottom: 24 }}>Infrastructure 100% localisée au Sénégal. Les données ne quittent jamais le territoire national, conformément à la législation APDP.</p>
              {[
                { title: 'Redondance N+1', desc: 'Alimentation 2N, climatisation redondante, 99.95% garanti' },
                { title: 'Sécurité maximale', desc: 'Chiffrement AES-256, contrôle biométrique, vidéosurveillance 24/7' },
                { title: 'Souveraineté totale', desc: 'Conformité APDP · Rapports audit trimestriels · Données 100% Sénégal' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--o)', marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: '.84rem', color: 'var(--bs)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){section .container [style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Couverture africaine */}
      <section style={{ padding: '80px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Couverture africaine</div>
            <h2 className="title">Disponible dans 10 pays</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>Mobile Money, carte bancaire — votre service s&apos;active en moins de 5 minutes, où que vous soyez en Afrique francophone.</p>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
            {PAYS.map((p, i) => (
              <div key={i} className="hover-lift" style={{ background: '#fff', border: '1px solid var(--bd)', borderRadius: 12, padding: '16px', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '.72rem', color: 'var(--o)', letterSpacing: 1, marginBottom: 4 }}>{p.code}</div>
                <div style={{ fontWeight: 700, fontSize: '.88rem', marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--bm)' }}>{p.pay}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){section .container [style*="repeat(5,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* Equipe */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="label" style={{ justifyContent: 'center' }}>L&apos;équipe</div>
            <h2 className="title">Des humains derrière chaque ticket</h2>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {TEAM.map((m, i) => (
              <div key={i} className="hover-lift" style={{ background: 'var(--ow)', border: '1px solid var(--bd)', borderRadius: 'var(--rx)', padding: '28px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,var(--o),var(--ol))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '.85rem', color: '#fff', flexShrink: 0 }}>{m.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: 4 }}>{m.name}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--bm)' }}>{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){section .container [style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div className="reveal" style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>Qui assume votre continuité numérique ?</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}>La bonne question n&apos;est pas combien coûte l&apos;hébergement. <strong>Jokko assume.</strong></p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://manage.jokko.africa/" target="_blank" rel="noreferrer" className="btn btn-w btn-lg">Espace Client →</a>
              <a href="tel:+221338425735" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>+221 33 842 57 35</a>
              <a href="https://wa.me/221777003737" target="_blank" rel="noreferrer" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.25)' }}>WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
