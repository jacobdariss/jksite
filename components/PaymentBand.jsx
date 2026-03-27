import Image from 'next/image'

export function PaymentBand() {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid var(--bd)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, padding: '14px 0' }}>
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--obg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--o)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--b)', lineHeight: 1.2 }}>Provisioning automatique</div>
              <div style={{ fontSize: '.7rem', color: 'var(--bm)' }}>Votre service est actif en moins de 5 minutes</div>
            </div>
          </div>

          {/* Center */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--bf)', marginRight: 4 }}>Paiements acceptés</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 8px', background: '#fff', borderRadius: 6, border: '1px solid rgba(0,0,0,.08)' }}>
              <Image src="/_assets/logos/logo-wave.png" alt="Wave" width={52} height={18} style={{ objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 8px', background: '#fff', borderRadius: 6, border: '1px solid rgba(0,0,0,.08)' }}>
              <Image src="/_assets/logos/logo-orange-money.png" alt="Orange Money" width={52} height={18} style={{ objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 12px', background: '#1A1F71', borderRadius: 6, fontSize: '.72rem', fontWeight: 800, color: '#fff' }}>
              VISA / Mastercard
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 28, padding: '0 10px', background: '#F0FFF4', border: '1px solid #86EFAC', borderRadius: 6, fontSize: '.7rem', fontWeight: 700, color: '#16A34A' }}>
              +64 moyens · 10 pays Afrique
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--obg)', border: '1px solid var(--obg2)', borderRadius: 20, padding: '6px 14px' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', flexShrink: 0, boxShadow: '0 0 0 2px rgba(34,197,94,.25)' }} />
            <span style={{ fontSize: '.73rem', fontWeight: 700, color: 'var(--o)' }}>Actif &lt; 5 min</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PaymentBloc() {
  return (
    <section style={{ padding: '64px 0', background: '#fff' }}>
      <div className="container">
        <div style={{ background: 'linear-gradient(135deg,#FFF3E8 0%,#FFE0C0 40%,#FFD4A0 100%)', borderRadius: 20, overflow: 'hidden', position: 'relative', border: '1px solid #FFD0A0' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(232,93,4,.12)', pointerEvents: 'none' }} />

          <div className="container" style={{ padding: '48px 40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
              {/* Left */}
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--o)', border: '1px solid var(--od)', borderRadius: 20, padding: '5px 14px', marginBottom: 16 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  <span style={{ fontSize: '.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#fff' }}>Provisioning automatique</span>
                </div>
                <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.9rem', fontWeight: 700, color: 'var(--b)', lineHeight: 1.25, margin: '0 0 14px' }}>
                  Commandez.<br />Payez.<br /><em style={{ color: 'var(--od)', fontStyle: 'italic' }}>C&apos;est en ligne.</em>
                </h2>
                <p style={{ fontSize: '.9rem', color: '#555', lineHeight: 1.7, margin: '0 0 24px', maxWidth: 340 }}>
                  Pas d&apos;attente, pas d&apos;email de validation. Dès que votre paiement est confirmé, votre service se déploie automatiquement — en moins de 5 minutes.
                </p>
                {[
                  { n: '1', t: 'Choisissez votre offre', c: 'var(--o)' },
                  { n: '2', t: 'Payez — Wave, Orange Money, CB et +60 autres', c: 'var(--o)' },
                  { n: '✓', t: <>Votre service est actif <strong style={{ color: '#16A34A' }}>en &lt; 5 min</strong></>, c: '#22C55E' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: step.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{step.n}</div>
                    <span style={{ fontSize: '.85rem', color: '#333' }}>{step.t}</span>
                  </div>
                ))}
              </div>

              {/* Right */}
              <div>
                <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.2px', color: '#888', marginBottom: 20 }}>Moyens de paiement acceptés</div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: '#888' }}>Mobile Money</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#F0FFF4', border: '1px solid #86EFAC', borderRadius: 10, padding: '3px 9px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
                      <span style={{ fontSize: '.65rem', fontWeight: 700, color: '#16A34A' }}>10 pays d&apos;Afrique</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {[
                      { img: 'logo-wave.png', alt: 'Wave' },
                      { img: 'logo-orange-money.png', alt: 'Orange Money' },
                    ].map(p => (
                      <div key={p.alt} style={{ display:'flex',alignItems:'center',justifyContent:'center',background:'#fff',border:'1px solid rgba(0,0,0,.08)',borderRadius:10,padding:'10px 20px',boxShadow:'0 2px 8px rgba(0,0,0,.06)' }}>
                        <Image src={`/_assets/logos/${p.img}`} alt={p.alt} width={80} height={22} style={{ objectFit: 'contain' }} />
                      </div>
                    ))}
                    <div style={{ display:'flex',alignItems:'center',gap:7,background:'#fff',border:'1px solid rgba(0,0,0,.08)',borderRadius:10,padding:'10px 14px',boxShadow:'0 2px 8px rgba(0,0,0,.06)' }}>
                      <div style={{ width:26,height:26,borderRadius:6,background:'var(--o)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.6rem',fontWeight:800,color:'#fff',flexShrink:0 }}>+62</div>
                      <span style={{ fontSize:'.78rem',fontWeight:600,color:'#333',lineHeight:1.3 }}>MTN, Moov, Flooz…<br /><span style={{ fontSize:'.68rem',color:'#888' }}>et +60 autres</span></span>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: '#888', marginBottom: 10 }}>Carte bancaire</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: 10, padding: '10px 16px', boxShadow: '0 2px 8px rgba(0,0,0,.06)', display: 'inline-flex' }}>
                    <div style={{ width:28,height:28,borderRadius:6,background:'#1A1F71',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.55rem',fontWeight:800,color:'#fff' }}>CB</div>
                    <span style={{ fontSize:'.82rem',fontWeight:600,color:'#333' }}>Visa / Mastercard</span>
                  </div>
                </div>

                <div style={{ marginTop: 20, padding: '12px 16px', background: '#F0FFF4', border: '1px solid #86EFAC', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A', flexShrink: 0, boxShadow: '0 0 0 3px rgba(22,163,74,.2)' }} />
                  <span style={{ fontSize: '.8rem', fontWeight: 600, color: '#333' }}>Paiement sécurisé · Provisioning instantané · Disponible dans 10 pays africains</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.pay-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

export default PaymentBand
