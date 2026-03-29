import LegalPage from '@/components/LegalPage'

export const metadata = { title: 'Politique de Confidentialité — Jokko Pro Africa' }

export default function PolitiqueConfidentialite() {
  return (
    <LegalPage title="Politique de Confidentialité" subtitle="Protection des données personnelles · Conformité APDP · Mars 2026">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { title: 'Données hébergées 100% au Sénégal', sub: 'Datacenter Tier III+ · jamais transférées hors territoire' },
          { title: 'Conformité APDP', sub: 'Loi sénégalaise n° 2008-12 du 25 janvier 2008' },
          { title: 'Vos droits garantis', sub: 'Accès · Rectification · Suppression · Opposition' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#F8F9FA', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: '.86rem', fontWeight: 700, color: 'var(--b)', marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: '.8rem', color: 'var(--bm)', lineHeight: 1.5 }}>{c.sub}</div>
          </div>
        ))}
        <style>{`@media(max-width:600px){div[style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </div>

      <p>Jokko Pro Africa (opéré par DARISS CONSULTING, SAS) accorde une importance primordiale à la protection de vos données personnelles. La présente Politique décrit les conditions dans lesquelles vos données sont collectées, traitées et protégées.</p>

      <h2>Article 1 — Responsable du traitement</h2>
      <p><strong>Entité :</strong> DARISS CONSULTING (Jokko Pro Africa)<br/>
      <strong>Président :</strong> M. Papa Yankhoba Ndiaye<br/>
      <strong>RCCM :</strong> SN DKR 2025 B 15074 · <strong>NINEA :</strong> 012077493<br/>
      <strong>Adresse :</strong> Mermoz VDN Dakar, Immeuble Zanardo, Sénégal</p>

      <h2>Article 2 — Données collectées</h2>
      <p>Nous collectons les données suivantes :</p>
      <ul>
        <li><strong>Données d&apos;identification :</strong> nom, prénom, email, téléphone</li>
        <li><strong>Données de facturation :</strong> adresse, numéro RCCM/NINEA pour les entreprises</li>
        <li><strong>Données techniques :</strong> adresse IP, logs de connexion, cookies de session</li>
        <li><strong>Données d&apos;usage :</strong> services utilisés, volumes consommés</li>
      </ul>

      <h2>Article 3 — Finalités du traitement</h2>
      <ul>
        <li>Gestion du Compte Client et fourniture des Services</li>
        <li>Facturation et recouvrement</li>
        <li>Support technique et communication</li>
        <li>Amélioration des Services et statistiques d&apos;usage</li>
        <li>Respect des obligations légales et réglementaires</li>
      </ul>

      <h2>Article 4 — Durée de conservation</h2>
      <p>Les données sont conservées pendant la durée du Contrat et jusqu&apos;à 5 ans après sa résiliation pour respecter les obligations légales de conservation. Les données de facturation sont conservées 10 ans conformément au Code général des impôts sénégalais.</p>

      <h2>Article 5 — Hébergement & transferts</h2>
      <p>Toutes les données personnelles sont hébergées exclusivement dans notre Datacenter Tier III+ situé à Dakar, Sénégal. Aucun transfert de données vers l&apos;étranger n&apos;est effectué sans votre consentement explicite.</p>

      <h2>Article 6 — Sécurité des données</h2>
      <p>Jokko Pro Africa met en oeuvre des mesures techniques et organisationnelles adaptées : chiffrement AES-256, contrôle d&apos;accès, journalisation, sauvegardes quotidiennes, conformité APDP.</p>

      <h2>Article 7 — Cookies & traceurs</h2>
      <p>Le site utilise des cookies techniques nécessaires au fonctionnement et des cookies analytiques anonymisés. Vous pouvez paramétrer votre navigateur pour refuser les cookies à tout moment.</p>

      <h2>Article 8 — Vos droits</h2>
      <p>Conformément à la loi n° 2008-12, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression, de limitation et d&apos;opposition. Pour exercer ces droits : <a href="mailto:support@jokko.africa">support@jokko.africa</a></p>

      <h2>Article 9 — Contact DPO</h2>
      <p>Pour toute question relative à la protection de vos données : <a href="mailto:support@jokko.africa">support@jokko.africa</a> · +221 33 842 57 35</p>
    </LegalPage>
  )
}
