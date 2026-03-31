'use client'
import { useState } from 'react'

const APPLY_URL = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/apply.php'

const TYPES = [
  { key: 'affiliate',     icon: '🔗', label: 'Affilié',        desc: 'Recommandez & gagnez des commissions' },
  { key: 'reseller',      icon: '🛍', label: 'Revendeur',      desc: 'Commercialisez nos solutions' },
  { key: 'integrator',    icon: '⚙️', label: 'Intégrateur',   desc: 'Déployez & intégrez' },
  { key: 'agency',        icon: '🏢', label: 'Agence',         desc: 'Conseil & accompagnement' },
  { key: 'institutional', icon: '🏛', label: 'Institutionnel', desc: 'Partenariat stratégique' },
]

const COUNTRIES = [
  { v: 'SN', l: 'Sénégal' }, { v: 'CI', l: "Côte d'Ivoire" }, { v: 'ML', l: 'Mali' },
  { v: 'BF', l: 'Burkina Faso' }, { v: 'GN', l: 'Guinée' }, { v: 'TG', l: 'Togo' },
  { v: 'BJ', l: 'Bénin' }, { v: 'CM', l: 'Cameroun' }, { v: 'FR', l: 'France' }, { v: 'OTHER', l: 'Autre' },
]

const SECTORS = ['IT & Digital', 'Commerce & Distribution', 'Finance & Assurance', 'Éducation & Formation', 'Santé', 'Agriculture & Agroalimentaire', 'BTP & Immobilier', 'Transport & Logistique', 'Autre']
const ZONES   = ['Dakar & périphérie', 'Thiès', 'Saint-Louis', 'Ziguinchor', 'Kaolack', 'Tambacounda', "Afrique de l'Ouest", 'International']

const INPUT  = { width: '100%', padding: '10px 14px', border: '1.5px solid var(--bd)', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', color: 'var(--b)', background: '#fff', outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s' }
const LABEL  = { fontSize: '.78rem', fontWeight: 700, color: '#334155', marginBottom: 4, display: 'block' }
const REQ    = { color: 'var(--o)', marginLeft: 2 }

export default function PartenaireCandidatureForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    company_name: '', contact_name: '', email: '', phone: '',
    country: 'SN', city: '', desired_type: '', activity_description: '',
    channel_description: '', sector: '', zone: '',
    has_legal_structure: false, has_experience: false, accepts_conditions: false,
  })
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    if (step === 1) {
      if (!form.company_name.trim()) return 'Raison sociale obligatoire.'
      if (!form.contact_name.trim()) return 'Nom du contact obligatoire.'
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Email invalide.'
    }
    if (step === 2) {
      if (!form.desired_type) return 'Veuillez choisir un type de partenariat.'
    }
    if (step === 3) {
      if (!form.accepts_conditions) return 'Vous devez accepter les conditions du programme.'
    }
    return ''
  }

  const next = () => {
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const prev = () => { setError(''); setStep(s => s - 1) }

  const submit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setLoading(true); setError('')
    try {
      const res = await fetch(APPLY_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json', 'X-JPN-Secret': process.env.NEXT_PUBLIC_TRACKING_SECRET || '' },
        body: JSON.stringify({ ...form, source: 'nextjs' }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(data)
      } else {
        setError(data.error || 'Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setError('Erreur de connexion. Contactez partenaires@jokko.africa')
    } finally {
      setLoading(false)
    }
  }

  // Progress bar
  const Progress = () => (
    <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
      {[1, 2, 3].map(n => (
        <div key={n} style={{ flex: 1, height: 3, borderRadius: 3, background: n <= step ? 'var(--o)' : '#F1F5F9', transition: 'background .3s' }} />
      ))}
    </div>
  )

  if (success) return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
      <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 700, marginBottom: 8 }}>Candidature envoyée !</h3>
      <p style={{ fontSize: '.9rem', color: 'var(--bs)', marginBottom: 16 }}>{success.message || "Notre équipe vous contactera sous 48h."}</p>
      {success.ref && <div style={{ fontSize: '.78rem', color: 'var(--bm)' }}>Référence : <strong>{success.ref}</strong></div>}
    </div>
  )

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', borderRadius: '16px 16px 0 0', padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,.1)' }} />
        <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 900, margin: '0 0 4px', position: 'relative', zIndex: 1 }}>Rejoindre le réseau Jokko</h2>
        <p style={{ color: 'rgba(255,255,255,.85)', fontSize: '.84rem', margin: 0, position: 'relative', zIndex: 1 }}>Devenez partenaire et développez votre activité avec les solutions Jokko Pro Africa.</p>
      </div>

      {/* Body */}
      <div style={{ background: '#fff', border: '1.5px solid var(--bd)', borderTop: 'none', borderRadius: '0 0 16px 16px', padding: 28 }}>
        <Progress />

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: 10, padding: '12px 16px', fontSize: '.84rem', fontWeight: 600, marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          {/* ─── ÉTAPE 1 : Identité ─── */}
          {step === 1 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                {[
                  { k: 'company_name', l: 'Raison sociale / Nom', ph: 'Ex : Teranga Solutions', req: true },
                  { k: 'contact_name', l: 'Nom & Prénom du contact', ph: 'Ex : Moussa Diallo', req: true },
                  { k: 'email', l: 'Email professionnel', ph: 'contact@entreprise.sn', req: true, type: 'email' },
                  { k: 'phone', l: 'Téléphone', ph: '+221 77 000 00 00' },
                ].map(f => (
                  <div key={f.k}>
                    <label style={LABEL}>{f.l}{f.req && <span style={REQ}>*</span>}</label>
                    <input type={f.type || 'text'} value={form[f.k]} onChange={e => set(f.k, e.target.value)}
                      placeholder={f.ph} style={INPUT} />
                  </div>
                ))}
                <div>
                  <label style={LABEL}>Pays</label>
                  <select value={form.country} onChange={e => set('country', e.target.value)} style={INPUT}>
                    {COUNTRIES.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
                  </select>
                </div>
                <div>
                  <label style={LABEL}>Ville</label>
                  <input type="text" value={form.city} onChange={e => set('city', e.target.value)} placeholder="Ex : Dakar" style={INPUT} />
                </div>
              </div>
              <div style={{ textAlign: 'right', marginTop: 20 }}>
                <button type="button" onClick={next} style={{ padding: '11px 28px', background: 'var(--o)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.88rem', cursor: 'pointer' }}>
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* ─── ÉTAPE 2 : Type & Activité ─── */}
          {step === 2 && (
            <div>
              <label style={{ ...LABEL, marginBottom: 10 }}>Type de partenariat souhaité <span style={REQ}>*</span></label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))', gap: 8, marginBottom: 20 }}>
                {TYPES.map(t => (
                  <label key={t.key} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '12px 8px',
                    border: `1.5px solid ${form.desired_type === t.key ? 'var(--o)' : 'var(--bd)'}`,
                    background: form.desired_type === t.key ? '#FFF7EE' : '#FAFAFA',
                    borderRadius: 10, cursor: 'pointer', textAlign: 'center', transition: 'all .15s',
                  }}>
                    <input type="radio" name="desired_type" value={t.key} checked={form.desired_type === t.key}
                      onChange={() => set('desired_type', t.key)} style={{ display: 'none' }} />
                    <span style={{ fontSize: 22 }}>{t.icon}</span>
                    <strong style={{ fontSize: '.72rem', color: form.desired_type === t.key ? '#C2410C' : 'var(--b)' }}>{t.label}</strong>
                    <span style={{ fontSize: '.65rem', color: 'var(--bm)', lineHeight: 1.3 }}>{t.desc}</span>
                  </label>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-grid">
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={LABEL}>Description de votre activité</label>
                  <textarea value={form.activity_description} onChange={e => set('activity_description', e.target.value)}
                    placeholder="Décrivez brièvement votre activité, vos clients cibles et votre territoire..."
                    style={{ ...INPUT, minHeight: 80, resize: 'vertical' }} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={LABEL}>Canal de distribution / Réseau</label>
                  <textarea value={form.channel_description} onChange={e => set('channel_description', e.target.value)}
                    placeholder="Réseaux sociaux, bouche-à-oreille, e-commerce, boutique physique..."
                    style={{ ...INPUT, minHeight: 60, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={LABEL}>Secteur</label>
                  <select value={form.sector} onChange={e => set('sector', e.target.value)} style={INPUT}>
                    <option value="">— Sélectionner</option>
                    {SECTORS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={LABEL}>Zone géographique</label>
                  <select value={form.zone} onChange={e => set('zone', e.target.value)} style={INPUT}>
                    <option value="">— Sélectionner</option>
                    {ZONES.map(z => <option key={z}>{z}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, gap: 10 }}>
                <button type="button" onClick={prev} style={{ padding: '11px 24px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.88rem', cursor: 'pointer' }}>← Retour</button>
                <button type="button" onClick={next} style={{ padding: '11px 28px', background: 'var(--o)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.88rem', cursor: 'pointer' }}>Continuer →</button>
              </div>
            </div>
          )}

          {/* ─── ÉTAPE 3 : Confirmation ─── */}
          {step === 3 && (
            <div>
              {/* Récap */}
              <div style={{ background: '#F8FAFC', border: '1px solid var(--bd)', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
                <div style={{ fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.5px', color: '#94A3B8', marginBottom: 12 }}>Récapitulatif</div>
                {[
                  ['Entreprise', form.company_name],
                  ['Contact', form.contact_name],
                  ['Email', form.email],
                  ['Téléphone', form.phone || '—'],
                  ['Pays / Ville', `${form.country}${form.city ? ' / ' + form.city : ''}`],
                  ['Type', TYPES.find(t => t.key === form.desired_type)?.label || '—'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 10, marginBottom: 6, fontSize: '.84rem' }}>
                    <span style={{ minWidth: 100, fontWeight: 700, color: '#64748B', fontSize: '.75rem' }}>{k}</span>
                    <span style={{ color: 'var(--b)' }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Checkboxes */}
              {[
                { k: 'has_legal_structure', l: "Je dispose d'une structure légale (registre commerce, NINEA) ou je m'engage à me régulariser." },
                { k: 'has_experience', l: "J'ai une expérience commerciale ou technique dans mon domaine." },
                { k: 'accepts_conditions', l: "J'accepte les conditions du programme partenaires et la charte éthique Jokko.", req: true },
              ].map(c => (
                <label key={c.k} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 12 }}>
                  <input type="checkbox" checked={form[c.k]} onChange={e => set(c.k, e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: 'var(--o)', marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: '.84rem', color: '#334155', lineHeight: 1.5 }}>
                    {c.l}{c.req && <span style={REQ}> *</span>}
                  </span>
                </label>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, gap: 10 }}>
                <button type="button" onClick={prev} style={{ padding: '11px 24px', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.88rem', cursor: 'pointer' }}>← Retour</button>
                <button type="submit" disabled={loading} style={{ padding: '11px 32px', background: loading ? '#ccc' : 'var(--o)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '.88rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? '⏳ Envoi…' : 'Envoyer ma candidature 🚀'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <style>{`@media(max-width:560px){ .form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
