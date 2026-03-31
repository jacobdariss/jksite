'use client'
import { useState, useEffect, useCallback } from 'react'

const API = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/marketplace.php'
const PER_PAGE = 9

function initials(s) {
  return (s || '').replace(/[^a-zA-ZÀ-ÿ ]/g, '').trim()
    .split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase() || '?'
}

function fcfa(n) {
  if (!n || n <= 0) return 'Sur devis'
  if (n >= 1000000) return (n / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' M FCFA'
  if (n >= 1000) return Math.round(n / 1000) + ' K FCFA'
  return n.toLocaleString('fr-FR') + ' FCFA'
}

function priceLabel(type, amount) {
  if (type === 'quote') return 'Sur devis'
  if (type === 'starting_from') return 'À partir de ' + fcfa(amount)
  return fcfa(amount)
}

const CAT_COLORS = {
  service: { bg: '#EFF6FF', color: '#1D4ED8', label: 'Service' },
  product: { bg: '#F0FDF4', color: '#15803D', label: 'Produit' },
  bundle:  { bg: '#FDF4FF', color: '#7E22CE', label: 'Bundle' },
}

export default function PartenaireMarketplace({ defaultView = 'offers' }) {
  const [view, setView] = useState(defaultView)
  const [offers, setOffers]         = useState([])
  const [offersTotal, setOffersTotal] = useState(0)
  const [offersPage, setOffersPage] = useState(1)
  const [offersSearch, setOffersSearch] = useState('')
  const [offersCat, setOffersCat]   = useState('')
  const [offersLoading, setOffersLoading] = useState(false)

  const [profiles, setProfiles]     = useState([])
  const [profilesTotal, setProfilesTotal] = useState(0)
  const [profilesPage, setProfilesPage] = useState(1)
  const [profilesSearch, setProfilesSearch] = useState('')
  const [profilesLoading, setProfilesLoading] = useState(false)

  const [modal, setModal] = useState(null)

  // ── Fetch offres ─────────────────────────────────────────────────
  const loadOffers = useCallback(async () => {
    setOffersLoading(true)
    try {
      const offset = (offersPage - 1) * PER_PAGE
      let url = `${API}?action=offers&limit=${PER_PAGE}&offset=${offset}`
      if (offersSearch) url += `&search=${encodeURIComponent(offersSearch)}`
      if (offersCat)    url += `&category=${encodeURIComponent(offersCat)}`
      const res  = await fetch(url, { mode: 'cors', credentials: 'omit' })
      const data = await res.json()
      if (data.success) { setOffers(data.data || []); setOffersTotal(data.total || 0) }
    } catch { setOffers([]) } finally { setOffersLoading(false) }
  }, [offersPage, offersSearch, offersCat])

  // ── Fetch profils ────────────────────────────────────────────────
  const loadProfiles = useCallback(async () => {
    setProfilesLoading(true)
    try {
      const offset = (profilesPage - 1) * PER_PAGE
      let url = `${API}?action=profiles&limit=${PER_PAGE}&offset=${offset}`
      if (profilesSearch) url += `&search=${encodeURIComponent(profilesSearch)}`
      const res  = await fetch(url, { mode: 'cors', credentials: 'omit' })
      const data = await res.json()
      if (data.success) { setProfiles(data.data || []); setProfilesTotal(data.total || 0) }
    } catch { setProfiles([]) } finally { setProfilesLoading(false) }
  }, [profilesPage, profilesSearch])

  useEffect(() => { if (view === 'offers') loadOffers() }, [view, loadOffers])
  useEffect(() => { if (view === 'profiles') loadProfiles() }, [view, loadProfiles])

  // ── Debounce search ─────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => { setOffersPage(1); loadOffers() }, 400)
    return () => clearTimeout(t)
  }, [offersSearch, offersCat])

  useEffect(() => {
    const t = setTimeout(() => { setProfilesPage(1); loadProfiles() }, 400)
    return () => clearTimeout(t)
  }, [profilesSearch])

  // ── Pagination ──────────────────────────────────────────────────
  const Pagination = ({ page, total, onPage }) => {
    const pages = Math.ceil(total / PER_PAGE)
    if (pages <= 1) return null
    return (
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 20 }}>
        <button onClick={() => onPage(page - 1)} disabled={page <= 1} style={pgBtn(false)}>←</button>
        {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onPage(p)} style={pgBtn(p === page)}>{p}</button>
        ))}
        <button onClick={() => onPage(page + 1)} disabled={page >= pages} style={pgBtn(false)}>→</button>
      </div>
    )
  }

  const pgBtn = (active) => ({
    padding: '7px 13px', border: `1.5px solid ${active ? 'var(--o)' : 'var(--bd)'}`,
    borderRadius: 7, fontSize: '.82rem', fontWeight: 600,
    background: active ? 'var(--o)' : '#fff',
    color: active ? '#fff' : 'var(--bm)', cursor: 'pointer',
  })

  const TOOLBAR = { display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20, alignItems: 'center' }
  const SINPUT  = { flex: 1, minWidth: 200, padding: '9px 14px', border: '1.5px solid var(--bd)', borderRadius: 8, fontSize: '.84rem', outline: 'none', fontFamily: 'inherit' }
  const SSELECT = { padding: '9px 12px', border: '1.5px solid var(--bd)', borderRadius: 8, fontSize: '.82rem', background: '#fff', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#F1F5F9', padding: 4, borderRadius: 10, marginBottom: 24, width: 'fit-content' }}>
        {[{ key: 'offers', label: '🛍 Offres' }, { key: 'profiles', label: '🤝 Partenaires' }].map(t => (
          <button key={t.key} onClick={() => setView(t.key)} style={{
            padding: '7px 18px', borderRadius: 7, fontSize: '.84rem', fontWeight: 600, cursor: 'pointer',
            border: 'none', background: view === t.key ? '#fff' : 'transparent',
            color: view === t.key ? 'var(--b)' : 'var(--bm)',
            boxShadow: view === t.key ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── VUE OFFRES ── */}
      {view === 'offers' && (
        <div>
          <div style={TOOLBAR}>
            <input style={SINPUT} placeholder="🔍 Rechercher une offre…" value={offersSearch} onChange={e => setOffersSearch(e.target.value)} />
            <select style={SSELECT} value={offersCat} onChange={e => setOffersCat(e.target.value)}>
              <option value="">Toutes catégories</option>
              <option value="service">⚙️ Services</option>
              <option value="product">📦 Produits</option>
              <option value="bundle">🎁 Bundles</option>
            </select>
          </div>

          {offersLoading ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--bm)' }}>⏳ Chargement des offres…</div>
          ) : offers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--bm)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🛍</div>
              <div>Aucune offre disponible pour ces critères.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 18 }}>
              {offers.map(o => {
                const price = o.price?.label || priceLabel(o.price_type, o.price?.amount || 0)
                const pName = o.partner?.name || o.company_name || ''
                const cat   = CAT_COLORS[o.category] || { bg: '#F5F5F5', color: '#444', label: o.category }
                return (
                  <div key={o.id} className="hover-lift" onClick={() => setModal(o)}
                    style={{ background: o.is_featured ? 'linear-gradient(135deg,#FFFBEB,#FFF7ED)' : '#fff', border: `1.5px solid ${o.is_featured ? '#FED7AA' : 'var(--bd)'}`, borderRadius: 12, padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {o.is_featured && <div style={{ fontSize: '.65rem', fontWeight: 700, color: '#D97706', background: '#FEF9C3', border: '1px solid #FDE68A', padding: '2px 8px', borderRadius: 20, width: 'fit-content' }}>⭐ Mise en avant</div>}
                    <span style={{ ...cat, fontSize: '.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.5px', padding: '3px 10px', borderRadius: 20, width: 'fit-content' }}>{cat.label}</span>
                    <h3 style={{ fontFamily: 'var(--fd)', fontSize: '.95rem', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>{o.title}</h3>
                    {o.short_desc && <p style={{ fontSize: '.82rem', color: 'var(--bs)', lineHeight: 1.6, margin: 0, flex: 1 }}>{o.short_desc}</p>}
                    <div style={{ fontFamily: 'var(--fd)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--o)' }}>{price}</div>
                    {pName && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,var(--o),var(--ol))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.7rem', fontWeight: 700 }}>{initials(pName)}</div>
                        <span style={{ fontSize: '.75rem', color: 'var(--bm)' }}>{pName}</span>
                      </div>
                    )}
                    <button style={{ width: '100%', padding: '9px 0', background: 'var(--o)', color: '#fff', border: 'none', borderRadius: 8, fontSize: '.82rem', fontWeight: 600, cursor: 'pointer' }}>Voir le détail →</button>
                  </div>
                )
              })}
            </div>
          )}
          <Pagination page={offersPage} total={offersTotal} onPage={p => { setOffersPage(p); loadOffers() }} />
        </div>
      )}

      {/* ── VUE PROFILS ── */}
      {view === 'profiles' && (
        <div>
          <div style={TOOLBAR}>
            <input style={SINPUT} placeholder="🔍 Rechercher un partenaire…" value={profilesSearch} onChange={e => setProfilesSearch(e.target.value)} />
          </div>

          {profilesLoading ? (
            <div style={{ textAlign: 'center', padding: 40, color: 'var(--bm)' }}>⏳ Chargement…</div>
          ) : profiles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--bm)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
              <div>Aucun partenaire public disponible.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 18 }}>
              {profiles.map(p => (
                <div key={p.id} className="hover-lift" style={{ background: '#fff', border: '1.5px solid var(--bd)', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#9333EA,#3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', fontWeight: 800, margin: '0 auto 12px' }}>{initials(p.company_name)}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, marginBottom: 4 }}>{p.company_name}</div>
                  {p.headline && <div style={{ fontSize: '.8rem', color: 'var(--bs)', lineHeight: 1.5, marginBottom: 8 }}>{p.headline}</div>}
                  {p.sector && <div style={{ fontSize: '.7rem', background: '#F1F5F9', color: 'var(--bm)', padding: '3px 10px', borderRadius: 20, display: 'inline-block', marginBottom: 12 }}>{p.sector}</div>}
                  {p.public_slug && <a href={`/partenaires/${p.public_slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 14px', border: '1.5px solid #9333EA', color: '#9333EA', borderRadius: 7, fontSize: '.78rem', fontWeight: 600, textDecoration: 'none' }}>Voir le profil →</a>}
                </div>
              ))}
            </div>
          )}
          <Pagination page={profilesPage} total={profilesTotal} onPage={p => { setProfilesPage(p); loadProfiles() }} />
        </div>
      )}

      {/* ── MODAL ── */}
      {modal && (
        <div onClick={e => e.target === e.currentTarget && setModal(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto', padding: 28 }}>
            <button onClick={() => setModal(null)} style={{ float: 'right', background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--bm)', lineHeight: 1 }}>✕</button>
            {(() => {
              const cat   = CAT_COLORS[modal.category] || { bg: '#F5F5F5', color: '#444', label: modal.category }
              const price = modal.price?.label || priceLabel(modal.price_type, modal.price?.amount || 0)
              const pName = modal.partner?.name || modal.company_name || ''
              return (
                <>
                  <span style={{ ...cat, fontSize: '.65rem', fontWeight: 800, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20 }}>{cat.label}</span>
                  <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 700, margin: '12px 0 4px' }}>{modal.title}</h2>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--o)', margin: '12px 0 8px' }}>{price}</div>
                  {(modal.full_desc || modal.short_desc) && <p style={{ fontSize: '.88rem', color: 'var(--bs)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{modal.full_desc || modal.short_desc}</p>}
                  {pName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0', padding: '12px 0', borderTop: '1px solid var(--bd)' }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--o),var(--ol))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.75rem', fontWeight: 700 }}>{initials(pName)}</div>
                      <span style={{ fontWeight: 600, fontSize: '.88rem' }}>{pName}</span>
                    </div>
                  )}
                  <a href={`mailto:partenaires@jokko.africa?subject=Offre ${modal.title}`}
                    style={{ display: 'block', textAlign: 'center', padding: '12px', background: 'var(--o)', color: '#fff', borderRadius: 10, fontWeight: 700, textDecoration: 'none', marginTop: 16 }}>
                    ✉ Contacter ce partenaire
                  </a>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
