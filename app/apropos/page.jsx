export const metadata = {
  title: 'À propos — Jokko Pro Africa',
  description: 'Le 1er Cloud 100% Sénégalais. Datacenter Tier III+ à Dakar. Notre mission, nos valeurs, notre infrastructure.',
}

const MISSION_FEATS = [
  { title: 'Un interlocuteur clair', desc: 'Pas de transferts sans fin. Vous savez à qui parler.', icon: 'user-check' },
  { title: 'Anticipation, pas réaction', desc: 'Nous détectons les problèmes avant qu\'ils n\'arrivent.', icon: 'eye' },
  { title: 'Évolution sans rupture', desc: 'Vos offres grandissent avec vous, sans migration brutale.', icon: 'trend' },
  { title: 'Support humain et local', desc: 'En français, depuis Dakar, avec connaissance de votre contexte.', icon: 'headset' },
  { title: 'Engagements clairs', desc: 'SLA formalisés, pénalités, transparence totale.', icon: 'doc-check' },
  { title: 'Paiements dans toute l\'Afrique francophone', desc: 'Wave, Orange Money, MTN, Moov et plus de 60 autres moyens dans 10 pays. Provisioning automatique dès confirmation.', icon: 'globe' },
]

const INFRA = [
  { v: '99.95%', l: 'Disponibilité' }, { v: 'N+1', l: 'Redondance' },
  { v: 'AES-256', l: 'Chiffrement' }, { v: '24/7', l: 'Monitoring' },
  { v: '2N', l: 'Alimentation' }, { v: 'APDP', l: 'Conformité' },
]

const PAYS = [
  { code: 'SN', nom: 'Sénégal', moyens: 'Wave · Orange Money' },
  { code: 'CI', nom: 'Côte d\'Ivoire', moyens: 'Orange Money · MTN · Wave' },
  { code: 'CM', nom: 'Cameroun', moyens: 'MTN MoMo · Orange Money' },
  { code: 'ML', nom: 'Mali', moyens: 'Orange Money · Moov' },
  { code: 'BF', nom: 'Burkina Faso', moyens: 'Orange Money · Moov' },
  { code: 'TG', nom: 'Togo', moyens: 'T-Money · Flooz' },
  { code: 'BJ', nom: 'Bénin', moyens: 'MTN · Moov' },
  { code: 'GN', nom: 'Guinée', moyens: 'Orange Money · MTN' },
  { code: 'CD', nom: 'RDC', moyens: 'Airtel · Orange' },
  { code: '+195', nom: '+195 pays', moyens: 'Visa / Mastercard' },
]

function Icon({ name }) {
  const paths = {
    'user-check': <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></>,
    'eye': <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    'trend': <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    'headset': <><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></>,
    'doc-check': <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>,
    'globe': <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></>,
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: '72px 0 56px', background: 'var(--ow)', borderBottom: '1px solid var(--bd)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img src="/_assets/logos/jokko-icon.png" alt="Jokko" style={{ width: 48, height: 48, objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.3rem' }}>Jokko<span style={{ color: 'var(--o)' }}>Pro</span></div>
              <div style={{ fontSize: '.6rem', color: 'var(--bm)', fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase' }}>AFRICA · CLOUD SOUVERAIN</div>
            </div>
          </div>
          <h1 className="title">Votre partenaire Cloud <em style={{ color: 'var(--o)' }}>souverain</em></h1>
          <p className="subtitle">Le 1er fournisseur cloud 100% sénégalais. Datacenter Tier III+ à Dakar. Chez Jokko, vous n&apos;êtes pas un ticket. Vous êtes un client.</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="#mission" className="btn btn-o btn-lg">Notre mission ↓</a>
            <a href="https://manage.jokko.africa/submitticket.php" target="_blank" rel="noreferrer" className="btn btn-ol btn-lg">Nous contacter</a>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section style={{ padding: '72px 0', background: 'linear-gradient(160deg,#1E2A3A 0%,#2D3E50 50%,#1A2535 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(232,93,4,.18)', pointerEvents: 'none' }} />
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 24 }}>
                <img src="/_assets/logos/jokko-icon-white.png" alt="Jokko" style={{ width: 56, height: 56, objectFit: 'contain' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.6rem', color: '#fff', lineHeight: 1 }}>Jokko<span style={{ color: 'var(--o)' }}>Pro</span></div>
                  <div style={{ fontSize: '.6rem', color: 'rgba(255,255,255,.35)', fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase' }}>AFRICA · CLOUD SOUVERAIN</div>
                </div>
              </div>
              <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,.3)', marginBottom: 20 }}>DARISS CONSULTING SAS · Dakar, Sénégal</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                {[['Fondé à Dakar','var(--o)'],['Opérationnel 24/7','#22C55E'],['Tier III+ Certifié','rgba(255,255,255,.4)']].map(([l,c]) => (
                  <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,.08)', border: `1px solid ${c}40`, borderRadius: 20, padding: '5px 14px', fontSize: '.72rem', fontWeight: 700, color: c }}>{l}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--o)', marginBottom: 14 }}>Notre identité</div>
              <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.8rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 18 }}>
                Le 1er Cloud<br /><em style={{ color: 'var(--o)', fontStyle: 'italic' }}>100% Sénégalais.</em>
              </h2>
              <p style={{ fontSize: '.92rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.8, marginBottom: 28 }}>
                Jokko Pro Africa est le premier fournisseur cloud souverain basé au Sénégal. Nous hébergeons vos services dans un datacenter Tier III+ à Dakar — vos données ne quittent jamais le territoire national. Notre philosophie : avant de parler de technologie, nous parlons de vous.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[{v:'+350',l:'Services actifs'},{v:'10',l:'Pays africains'},{v:'99.95%',l:'Uptime garanti'},{v:'2026',l:'Catalogue v7',c:'#22C55E'}].map(s => (
                  <div key={s.l} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 10, padding: '14px 16px' }}>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: '1.6rem', fontWeight: 700, color: s.c || 'var(--o)', lineHeight: 1 }}>{s.v}</div>
                    <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '.8px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){section .container [style*="1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* Mission */}
      <section id="mission" style={{ padding: '72px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div style={{ borderRadius: 'var(--rx)', overflow: 'hidden', boxShadow: 'var(--shl)', aspectRatio: '4/3' }}>
              <img src="/_assets/logos/datacenter.jpg" alt="Datacenter Jokko" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div className="label">Notre Mission</div>
              <h2 className="title">Avant de parler de technologie, parlons de vous.</h2>
              <p className="subtitle">Nos clients ont le même problème : leur activité dépend du numérique, mais ils n&apos;ont ni le temps, ni l&apos;envie de gérer l&apos;infrastructure.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {MISSION_FEATS.map(f => (
                  <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 42, height: 42, minWidth: 42, borderRadius: 12, background: 'var(--obg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--o)' }}>
                      <Icon name={f.icon} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--fd)', fontSize: '.95rem', fontWeight: 700, marginBottom: 3 }}>{f.title}</h4>
                      <p style={{ fontSize: '.84rem', color: 'var(--bs)' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Infrastructure</div>
            <h2 className="title">Datacenter Tier III+ · Dakar, Sénégal</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>Infrastructure 100% localisée au Sénégal. Les données ne quittent jamais le territoire national.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
            {INFRA.map(s => (
              <div key={s.l} style={{ background: 'var(--obg)', border: '1px solid var(--obg2)', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--o)', marginBottom: 4 }}>{s.v}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--bm)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ borderRadius: 'var(--rx)', overflow: 'hidden', boxShadow: 'var(--sh)', maxHeight: 400 }}>
            <img src="/_assets/logos/datacenter.jpg" alt="Datacenter" style={{ width: '100%', height: 400, objectFit: 'cover' }} />
          </div>
        </div>
        <style>{`@media(max-width:768px){section .container [style*="repeat(3,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* Couverture africaine */}
      <section style={{ padding: '72px 0', background: 'var(--ow)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="label" style={{ justifyContent: 'center' }}>Accessibilité</div>
            <h2 className="title">Commandez depuis toute l&apos;Afrique francophone</h2>
            <p className="subtitle" style={{ margin: '0 auto' }}>Mobile Money, carte bancaire — votre service s&apos;active en moins de 5 minutes, où que vous soyez.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 32 }}>
            {PAYS.map(p => (
              <div key={p.code} style={{ background: '#fff', border: '1px solid var(--obg2)', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--o)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 900, color: '#fff', marginBottom: 8 }}>{p.code}</div>
                <div style={{ fontSize: '.82rem', fontWeight: 700, marginBottom: 3 }}>{p.nom}</div>
                <div style={{ fontSize: '.7rem', color: 'var(--muted, #888)' }}>{p.moyens}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--obg)', border: '1px solid var(--obg2)', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, maxWidth: 600, margin: '0 auto' }}>
            <div style={{ width: 44, height: 44, minWidth: 44, borderRadius: 12, background: 'var(--o)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '.88rem', fontWeight: 700, marginBottom: 3 }}>Provisioning automatique · Actif en moins de 5 minutes</div>
              <div style={{ fontSize: '.8rem', color: 'var(--bs)' }}>Dès que votre paiement est confirmé, votre service se déploie instantanément — sans intervention manuelle, 24h/24.</div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section .container [style*="repeat(5,1fr)"]{grid-template-columns:repeat(2,1fr)!important}}`}</style>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', borderRadius: 'var(--rx)', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, marginBottom: 10 }}>Qui assume votre continuité numérique ?</h2>
            <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.85)', marginBottom: 24 }}><strong>Jokko assume.</strong> Un seul partenaire, de votre lancement jusqu&apos;à votre montée en charge.</p>
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
