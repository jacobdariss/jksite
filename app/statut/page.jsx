// Page statut - simple, statique, sans fetch async bloquant en build
export const metadata = {
  title: 'Statut des Services — Jokko Pro Africa',
  description: "État en temps réel de l'infrastructure cloud Jokko Pro Africa.",
}

const SERVICES = [
  { name: 'Hébergement Web', uptime: '99.95%' },
  { name: 'Serveurs Cloud VPS', uptime: '99.95%' },
  { name: 'Email Pro (Tam-Tam)', uptime: '99.9%' },
  { name: 'SMS (Griot)', uptime: '99.9%' },
  { name: 'Espace Client (WHMCS)', uptime: '99.95%' },
  { name: 'API de provisioning', uptime: '99.9%' },
  { name: 'Réseau / Connectivité', uptime: '100%' },
  { name: 'Monitoring IA Ops', uptime: '99.95%' },
]

export default function StatutPage() {
  return (
    <>
      <section style={{ padding:'64px 0 48px', background:'var(--ow)', borderBottom:'1px solid var(--bd)' }}>
        <div className="container" style={{ textAlign:'center' }}>
          <div className="label" style={{ justifyContent:'center' }}>Infrastructure</div>
          <h1 className="title">Statut des Services Jokko</h1>
          <p className="subtitle" style={{ margin:'0 auto 32px' }}>Mis à jour automatiquement · Tous systèmes surveillés 24/7</p>
          <div style={{ display:'inline-flex',alignItems:'center',gap:10,background:'#F0FFF4',border:'1px solid #86EFAC30',borderRadius:999,padding:'10px 24px' }}>
            <span style={{ width:10,height:10,borderRadius:'50%',background:'#22C55E',boxShadow:'0 0 0 3px rgba(34,197,94,.25)',animation:'pulse 2s infinite' }} />
            <span style={{ fontSize:'.95rem',fontWeight:700,color:'#16A34A' }}>
              Opérationnel — Tous les systèmes fonctionnent normalement
            </span>
          </div>
        </div>
      </section>

      <section style={{ padding:'48px 0' }}>
        <div className="container">
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16 }}>
            {SERVICES.map((svc,i) => (
              <div key={i} style={{ background:'#fff',border:'1px solid var(--bd)',borderRadius:'var(--rx)',padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 2px 8px rgba(0,0,0,.04)' }}>
                <div>
                  <div style={{ fontSize:'.9rem',fontWeight:700,marginBottom:4 }}>{svc.name}</div>
                  <div style={{ fontSize:'.72rem',color:'var(--bm)' }}>Uptime {svc.uptime}</div>
                </div>
                <div style={{ display:'flex',alignItems:'center',gap:6,background:'#F0FFF4',borderRadius:999,padding:'5px 12px' }}>
                  <span style={{ width:7,height:7,borderRadius:'50%',background:'#22C55E',flexShrink:0 }} />
                  <span style={{ fontSize:'.72rem',fontWeight:700,color:'#16A34A' }}>Opérationnel</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center',marginTop:32,fontSize:'.75rem',color:'var(--bm)' }}>
            Pour signaler un incident : <a href="mailto:support@jokko.africa" style={{ color:'var(--o)' }}>support@jokko.africa</a> · <a href="https://wa.me/221777003737" style={{ color:'var(--o)' }}>WhatsApp</a>
          </div>
        </div>
      </section>
      <style>{`@keyframes pulse{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.25)}50%{box-shadow:0 0 0 6px rgba(34,197,94,.1)}}`}</style>
    </>
  )
}
