'use client'
import { useState, useEffect, useCallback } from 'react'

const MKT_URL = '/api/marketplace'
const PER_PAGE = 9

const CAT_COLORS = {
  service: { bg: '#EFF6FF', color: '#1D4ED8', label: 'Service' },
  product: { bg: '#F0FDF4', color: '#15803D', label: 'Produit' },
  bundle:  { bg: '#FDF4FF', color: '#7E22CE', label: 'Bundle' },
}

function initials(s) {
  return (s || '').replace(/[^a-zA-ZÀ-ÿ ]/g,'').trim().split(' ').slice(0,2).map(w => w[0] || '').join('').toUpperCase() || '?'
}

function priceLabel(o) {
  if (o.price?.label) return o.price.label
  if (o.price_type === 'quote') return 'Sur devis'
  const n = o.price?.amount || 0
  if (!n) return 'Sur devis'
  if (n >= 1000000) return (n/1000000).toFixed(1) + ' M FCFA'
  if (n >= 1000)    return Math.round(n/1000) + ' K FCFA'
  return n.toLocaleString('fr-FR') + ' FCFA'
}

const DEMO_OFFERS = [
  { id: 1, title: 'Intégration WordPress & Jokko Cloud', category: 'service', short_desc: 'Migration et intégration complète de votre site WordPress vers l\'hébergement Jokko Cloud. Configuration, optimisation, formation.', price: { amount: 150000 }, company_name: 'Digital Solutions Dakar', is_featured: true },
  { id: 2, title: 'Audit sécurité & conformité APDP', category: 'service', short_desc: 'Audit complet de votre infrastructure, rapport de conformité APDP, plan d\'action personnalisé.', price: { label: 'À partir de 200 000 FCFA' }, company_name: 'SecurIT Africa' },
  { id: 3, title: 'Pack démarrage e-commerce', category: 'bundle', short_desc: 'WooCommerce + hébergement Sahara + email pro Tam-Tam + formation 2h. Tout pour lancer votre boutique en ligne.', price: { amount: 350000 }, company_name: 'Teranga Digital', is_featured: false },
]

const DEMO_PROFILES = [
  { id: 1, company_name: 'Digital Solutions Dakar', headline: 'Intégration web & cloud pour les PME sénégalaises', sector: 'IT & Digital' },
  { id: 2, company_name: 'SecurIT Africa', headline: 'Cybersécurité et conformité APDP pour institutions', sector: 'Finance & Assurance' },
  { id: 3, company_name: 'Teranga Digital', headline: 'Solutions e-commerce et présence en ligne', sector: 'Commerce & Distribution' },
]

export default function MarketplaceClient() {
  const [tab,        setTab]        = useState('offers')
  const [offers,     setOffers]     = useState([])
  const [profiles,   setProfiles]   = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState('')
  const [search,     setSearch]     = useState('')
  const [cat,        setCat]        = useState('')
  const [page,       setPage]       = useState(1)
  const [total,      setTotal]      = useState(0)
  const [modal,      setModal]      = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const offset = (page - 1) * PER_PAGE
      const params = new URLSearchParams({
        action: tab, limit: PER_PAGE, offset,
        ...(search && { search }),
        ...(cat    && { category: cat }),
      })
      const res  = await fetch(`${MKT_URL}?${params}`)
      const text = await res.text()

      if (!text || text.trim() === '') {
        // API vide — afficher données statiques demo
        if (tab === 'offers') { setOffers(DEMO_OFFERS); setTotal(DEMO_OFFERS.length) }
        if (tab === 'profiles') { setProfiles(DEMO_PROFILES); setTotal(DEMO_PROFILES.length) }
        setLoading(false)
        return
      }

      const data = JSON.parse(text)
      if (!data.success) throw new Error(data.error || 'Erreur API')
      if (tab === 'offers')   { setOffers(data.data?.length ? data.data : DEMO_OFFERS);   setTotal(data.total || DEMO_OFFERS.length) }
      if (tab === 'profiles') { setProfiles(data.data?.length ? data.data : DEMO_PROFILES); setTotal(data.total || DEMO_PROFILES.length) }
    } catch (e) {
      // Fallback statique en cas d'erreur
      if (tab === 'offers') { setOffers(DEMO_OFFERS); setTotal(DEMO_OFFERS.length) }
      if (tab === 'profiles') { setProfiles(DEMO_PROFILES); setTotal(DEMO_PROFILES.length) }
    } finally {
      setLoading(false)
    }
  }, [tab, page, search, cat])

  useEffect(() => { load() }, [load])

  const totalPages = Math.ceil(total / PER_PAGE)

  const pill = (bg, color, label) => (
    <span style={{ background: bg, color, fontSize: '.65rem', fontWeight: 800, padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
  )

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#F1F5F9', padding: 4, borderRadius: 10, marginBottom: 24, width: 'fit-content' }}>
        {[['offers','🛍 Offres'],['profiles','🤝 Partenaires']].map(([k,l]) => (
          <button key={k} onClick={() => { setTab(k); setPage(1); setSearch('') }}
            style={{ padding: '7px 18px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: '.84rem', fontWeight: 600, transition: 'all .15s',
              background: tab === k ? '#fff' : 'transparent', color: tab === k ? '#0D0D0D' : '#64748B',
              boxShadow: tab === k ? '0 1px 4px rgba(0,0,0,.08)' : 'none' }}>
            {l}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder={tab === 'offers' ? '🔍 Rechercher une offre…' : '🔍 Rechercher un partenaire…'}
          style={{ flex: 1, minWidth: 200, padding: '9px 14px', border: '1.5px solid var(--bd)', borderRadius: 8, fontSize: '.88rem', outline: 'none', fontFamily: 'inherit' }} />
        {tab === 'offers' && (
          <select value={cat} onChange={e => { setCat(e.target.value); setPage(1) }}
            style={{ padding: '9px 12px', border: '1.5px solid var(--bd)', borderRadius: 8, fontSize: '.84rem', background: '#fff', outline: 'none', fontFamily: 'inherit' }}>
            <option value="">Toutes catégories</option>
            <option value="service">⚙️ Services</option>
            <option value="product">📦 Produits</option>
            <option value="bundle">🎁 Bundles</option>
          </select>
        )}
      </div>

      {/* States */}
      {loading && <div style={{ textAlign: 'center', padding: 48, color: 'var(--bm)' }}>⏳ Chargement…</div>}
      {error   && <div style={{ textAlign: 'center', padding: 48 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
        <div style={{ color: 'var(--bm)', fontSize: '.9rem' }}>{error}</div>
        <button onClick={load} className="btn btn-o" style={{ marginTop: 16 }}>Réessayer</button>
      </div>}

      {/* Offres grid */}
      {!loading && !error && tab === 'offers' && (
        <>
          {offers.length === 0 && (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--bm)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛍</div>
              <div>Aucune offre disponible pour ces critères.</div>
            </div>
          )}
          <div className="mkt-grid">
            {offers.map(o => {
              const cc = CAT_COLORS[o.category] || { bg: '#F5F5F5', color: '#444', label: o.category }
              const pName = o.partner?.name || o.company_name || ''
              return (
                <div key={o.id} onClick={() => setModal({type:'offer', data:o})} className="hover-lift"
                  style={{ background: o.is_featured ? '#FFFBEB' : '#fff',
                    border: `1.5px solid ${o.is_featured ? '#FED7AA' : 'var(--bd)'}`,
                    borderRadius: 'var(--rx)', padding: 20, cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {o.is_featured && <span style={{ fontSize: '.65rem', fontWeight: 700, color: '#D97706', background: '#FEF9C3', border: '1px solid #FDE68A', padding: '2px 8px', borderRadius: 20, width: 'fit-content' }}>⭐ Mise en avant</span>}
                  {pill(cc.bg, cc.color, cc.label)}
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, margin: 0 }}>{o.title}</h3>
                  {o.short_desc && <p style={{ fontSize: '.84rem', color: 'var(--bs)', lineHeight: 1.6, flex: 1, margin: 0 }}>{o.short_desc}</p>}
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--o)' }}>{priceLabel(o)}</div>
                  {pName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,var(--o),var(--ol))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.7rem', fontWeight: 700, flexShrink: 0 }}>
                        {initials(pName)}
                      </div>
                      <span style={{ fontSize: '.78rem', color: 'var(--bm)' }}>{pName}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Profiles grid */}
      {!loading && !error && tab === 'profiles' && (
        <>
          {profiles.length === 0 && (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--bm)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
              <div>Aucun partenaire public disponible.</div>
            </div>
          )}
          <div className="mkt-profiles-grid">
            {profiles.map(p => (
              <div key={p.id} className="hover-lift"
                style={{ background: '#fff', border: '1.5px solid var(--bd)', borderRadius: 'var(--rx)', padding: 20, textAlign: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg,#9333EA,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', fontWeight: 800, margin: '0 auto 12px' }}>
                  {initials(p.company_name)}
                </div>
                <div style={{ fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>{p.company_name}</div>
                {p.headline && <div style={{ fontSize: '.82rem', color: 'var(--bs)', lineHeight: 1.5, marginBottom: 10 }}>{p.headline}</div>}
                {p.sector && <span style={{ fontSize: '.7rem', fontWeight: 600, background: '#F1F5F9', color: 'var(--bm)', padding: '3px 10px', borderRadius: 20 }}>{p.sector}</span>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 32 }}>
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page <= 1} className="btn btn-ol" style={{ padding: '7px 14px' }}>←</button>
          {Array.from({length: totalPages}, (_, i) => i+1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={`btn ${p === page ? 'btn-o' : 'btn-ol'}`} style={{ padding: '7px 14px' }}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page >= totalPages} className="btn btn-ol" style={{ padding: '7px 14px' }}>→</button>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div onClick={e => e.target === e.currentTarget && setModal(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,.25)' }}>
            <div style={{ padding: '22px 24px', borderBottom: '1px solid #F0F0F2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  {modal.data.category && (() => {
                    const cc = CAT_COLORS[modal.data.category] || { bg: '#F5F5F5', color: '#444', label: modal.data.category }
                    return pill(cc.bg, cc.color, cc.label)
                  })()}
                  <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.4rem', fontWeight: 700, margin: '10px 0 4px' }}>{modal.data.title || modal.data.company_name}</h3>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--o)' }}>{priceLabel(modal.data)}</div>
                </div>
                <button onClick={() => setModal(null)} style={{ background: '#F4F4F6', border: 'none', cursor: 'pointer', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', flexShrink: 0 }}>✕</button>
              </div>
            </div>
            <div style={{ padding: 24 }}>
              {(modal.data.full_desc || modal.data.short_desc) && (
                <p style={{ fontSize: '.9rem', color: 'var(--bs)', lineHeight: 1.7, marginBottom: 20 }}>{modal.data.full_desc || modal.data.short_desc}</p>
              )}
              {(modal.data.partner?.name || modal.data.company_name) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 0', borderTop: '1px solid var(--bd)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,var(--o),var(--ol))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.8rem', fontWeight: 700 }}>
                    {initials(modal.data.partner?.name || modal.data.company_name)}
                  </div>
                  <span style={{ fontWeight: 600 }}>{modal.data.partner?.name || modal.data.company_name}</span>
                </div>
              )}
              <a href={`mailto:partenaires@jokko.africa?subject=Offre ${encodeURIComponent(modal.data.title || '')}`}
                className="btn btn-o btn-lg" style={{ display: 'block', textAlign: 'center', marginTop: 16, textDecoration: 'none' }}>
                ✉ Contacter ce partenaire
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .mkt-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        .mkt-profiles-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        @media(max-width:900px) { .mkt-grid, .mkt-profiles-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:600px) { .mkt-grid, .mkt-profiles-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  )
}
