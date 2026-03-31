'use client'
import { useState } from 'react'

const APPLY_URL = 'https://manage.jokko.africa/modules/addons/jokko_partner/api/apply.php'

const TYPES = [
  { key: 'affiliate',     icon: '🔗', label: 'Affilié',        desc: 'Recommandez & gagnez des commissions' },
  { key: 'reseller',      icon: '🛍', label: 'Revendeur',      desc: 'Commercialisez nos solutions' },
  { key: 'integrator',    icon: '⚙️', label: 'Intégrateur',    desc: 'Déployez & intégrez' },
  { key: 'agency',        icon: '🏢', label: 'Agence',          desc: 'Conseil & accompagnement' },
  { key: 'institutional', icon: '🏛', label: 'Institutionnel', desc: 'Partenariat stratégique' },
]

const COUNTRIES = ['Sénégal','Côte d\'Ivoire','Mali','Burkina Faso','Guinée','Togo','Bénin','Cameroun','France','Autre']
const SECTORS   = ['IT & Digital','Commerce & Distribution','Finance & Assurance','Éducation & Formation','Santé','Agriculture & Agroalimentaire','BTP & Immobilier','Transport & Logistique','Autre']
const ZONES     = ['Dakar & périphérie','Thiès','Saint-Louis','Ziguinchor','Kaolack','Tambacounda','Afrique de l\'Ouest','International']

function Input({ label, required, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: '.8rem', fontWeight: 700, color: '#334155' }}>
        {label} {required && <span style={{ color: 'var(--o)' }}>*</span>}
      </label>}
      <input {...props} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--bd)', borderRadius: 9, fontSize: '.88rem', outline: 'none', transition: 'border-color .2s', fontFamily: 'inherit', ...props.style }} />
    </div>
  )
}

function Select({ label, children, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && <label style={{ fontSize: '.8rem', fontWeight: 700, color: '#334155' }}>{label}</label>}
      <select {...props} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--bd)', borderRadius: 9, fontSize: '.88rem', background: '#fff', outline: 'none', fontFamily: 'inherit' }}>
        {children}
      </select>
    </div>
  )
}

export default function CandidatureForm() {
  const [step, setStep]     = useState(1)
  const [error, setError]   = useState('')
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm]     = useState({
    company_name: '', contact_name: '', email: '', phone: '',
    country: 'Sénégal', city: '', desired_type: '',
    activity_description: '', channel_description: '',
    sector: '', zone: '',
    has_legal_structure: false, has_experience: false, accepts_conditions: false,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  function validateStep(s) {
    if (s === 1) {
      if (!form.company_name.trim()) return 'Raison sociale obligatoire.'
      if (!form.contact_name.trim()) return 'Nom du contact obligatoire.'
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Email invalide.'
    }
    if (s === 2 && !form.desired_type) return 'Choisissez un type de partenariat.'
    return ''
  }

  function next() {
    const err = validateStep(step)
    if (err) { setError(err); return }
    setError('')
    setStep(s => s + 1)
  }

  async function submit(e) {
    e.preventDefault()
    if (!form.accepts_conditions) { setError('Vous devez accepter les conditions.'); return }
    setError('')
    setLoading(true)
    try {
      const secret = ''  // clé gérée côté WHMCS via header X-JPN-Secret
      const res = await fetch(APPLY_URL, {
        method: 'POST', mode: 'cors', credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, secret }),
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

  const grid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }
  const gridFull = { gridColumn: '1 / -1' }

  if (success) return (
    <div style={{ textAlign: 'center', padding: '40px 24px', background: '#F0FDF4', borderRadius: 'var(--rx)', border: '1px solid #86EFAC' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
      <h3 style={{ fontFamily: 'var(--fd)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 8, color: '#15803D' }}>Candidature envoyée !</h3>
      <p style={{ fontSize: '.9rem', color: '#166534' }}>{success.message || "Notre équipe vous contactera sous 48h."}</p>
      {success.ref && <p style={{ fontSize: '.78rem', color: '#15803D', marginTop: 8 }}>Référence : <strong>{success.ref}</strong></p>}
    </div>
  )

  return (
    <div style={{ background: '#fff', border: '1.5px solid var(--bd)', borderRadius: 'var(--rx)', overflow: 'hidden', boxShadow: 'var(--sh)' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,var(--o),var(--ol))', padding: '24px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,.1)' }} />
        <h2 style={{ fontFamily: 'var(--fd)', fontSize: '1.3rem', fontWeight: 900, color: '#fff', margin: '0 0 4px', position: 'relative' }}>
          Rejoindre le réseau Jokko
        </h2>
        <p style={{ fontSize: '.84rem', color: 'rgba(255,255,255,.85)', margin: 0, position: 'relative' }}>
          Devenez partenaire et développez votre activité avec les solutions Jokko Pro Africa.
        </p>
      </div>

      <div style={{ padding: 28 }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 3, background: s <= step ? 'var(--o)' : '#F1F5F9', transition: 'background .3s' }} />
          ))}
        </div>

        {/* Erreur */}
        {error && <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: 8, padding: '12px 16px', fontSize: '.84rem', marginBottom: 16 }}>{error}</div>}

        <form onSubmit={submit}>
          {/* Étape 1 */}
          {step === 1 && (
            <div style={grid}>
              <Input label="Raison sociale / Nom" required value={form.company_name} onChange={e => set('company_name', e.target.value)} placeholder="Ex : Teranga Solutions" />
              <Input label="Nom & Prénom du contact" required value={form.contact_name} onChange={e => set('contact_name', e.target.value)} placeholder="Ex : Moussa Diallo" />
              <Input label="Email professionnel" required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="contact@entreprise.sn" />
              <Input label="Téléphone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+221 77 000 00 00" />
              <Select label="Pays" value={form.country} onChange={e => set('country', e.target.value)}>
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </Select>
              <Input label="Ville" value={form.city} onChange={e => set('city', e.target.value)} placeholder="Ex : Dakar" />
              <div style={{ ...gridFull, textAlign: 'right', marginTop: 8 }}>
                <button type="button" onClick={next} className="btn btn-o btn-lg">Continuer →</button>
              </div>
            </div>
          )}

          {/* Étape 2 */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: '.8rem', fontWeight: 700, color: '#334155', marginBottom: 10 }}>
                  Type de partenariat <span style={{ color: 'var(--o)' }}>*</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 8 }}>
                  {TYPES.map(t => (
                    <label key={t.key} onClick={() => set('desired_type', t.key)} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                      padding: '12px 8px', border: `1.5px solid ${form.desired_type === t.key ? 'var(--o)' : 'var(--bd)'}`,
                      background: form.desired_type === t.key ? '#FFF7EE' : '#FAFAFA',
                      borderRadius: 10, cursor: 'pointer', textAlign: 'center', transition: 'all .15s',
                    }}>
                      <span style={{ fontSize: 22 }}>{t.icon}</span>
                      <strong style={{ fontSize: '.78rem', color: form.desired_type === t.key ? 'var(--od)' : '#333' }}>{t.label}</strong>
                      <span style={{ fontSize: '.68rem', color: '#94A3B8', lineHeight: 1.3 }}>{t.desc}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div style={grid}>
                <div style={gridFull}>
                  <label style={{ fontSize: '.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 5 }}>Description de votre activité</label>
                  <textarea value={form.activity_description} onChange={e => set('activity_description', e.target.value)}
                    placeholder="Décrivez votre activité, vos clients cibles et votre territoire..."
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--bd)', borderRadius: 9, fontSize: '.88rem', minHeight: 90, resize: 'vertical', fontFamily: 'inherit', outline: 'none' }} />
                </div>
                <Select label="Secteur d'activité" value={form.sector} onChange={e => set('sector', e.target.value)}>
                  <option value="">— Sélectionner</option>
                  {SECTORS.map(s => <option key={s}>{s}</option>)}
                </Select>
                <Select label="Zone géographique" value={form.zone} onChange={e => set('zone', e.target.value)}>
                  <option value="">— Sélectionner</option>
                  {ZONES.map(z => <option key={z}>{z}</option>)}
                </Select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, gap: 10 }}>
                <button type="button" onClick={() => { setError(''); setStep(1) }} className="btn btn-ol btn-lg">← Retour</button>
                <button type="button" onClick={next} className="btn btn-o btn-lg">Continuer →</button>
              </div>
            </div>
          )}

          {/* Étape 3 */}
          {step === 3 && (
            <div>
              {/* Récap */}
              <div style={{ background: '#F8FAFC', border: '1px solid var(--bd)', borderRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
                <div style={{ fontSize: '.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#94A3B8', marginBottom: 12 }}>Récapitulatif</div>
                {[
                  ['Entreprise', form.company_name],
                  ['Contact', form.contact_name],
                  ['Email', form.email],
                  ['Pays / Ville', `${form.country}${form.city ? ' / ' + form.city : ''}`],
                  ['Type', TYPES.find(t => t.key === form.desired_type)?.label || '—'],
                  ['Secteur', form.sector || '—'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: '.84rem' }}>
                    <span style={{ minWidth: 100, fontWeight: 700, color: '#64748B', fontSize: '.78rem' }}>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
              {/* Checkboxes */}
              {[
                ['has_legal_structure', "Je dispose d'une structure légale (NINEA) ou m'engage à me régulariser."],
                ['has_experience', "J'ai une expérience commerciale ou technique dans mon domaine."],
                ['accepts_conditions', (<>J&apos;accepte les <a href="/partenaires" style={{ color: 'var(--o)', fontWeight: 700 }}>conditions du programme partenaires</a> et la charte éthique Jokko. <span style={{ color: 'var(--o)' }}>*</span></>)],
              ].map(([key, label]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: 'var(--o)', marginTop: 2, flexShrink: 0, cursor: 'pointer' }} />
                  <span style={{ fontSize: '.84rem', color: '#334155', lineHeight: 1.5 }}>{label}</span>
                </label>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, gap: 10 }}>
                <button type="button" onClick={() => { setError(''); setStep(2) }} className="btn btn-ol btn-lg">← Retour</button>
                <button type="submit" disabled={loading} className="btn btn-o btn-lg" style={{ opacity: loading ? .7 : 1 }}>
                  {loading ? 'Envoi…' : 'Envoyer ma candidature 🚀'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
