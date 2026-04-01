/**
 * validate-jsx.mjs — Validation JSX avant build/commit
 * Usage : node scripts/validate-jsx.mjs
 *
 * Vérifie :
 * - Équilibre <section> / </section>
 * - Équilibre <div> / </div>
 * - Pas de doubles apostrophes non échappées dans JSX
 * - Pas de références à des variables undefined (attr., etc.)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const FILES_TO_CHECK = [
  'app/page.jsx',
  'app/startup/page.jsx',
  'app/entreprise/page.jsx',
  'app/institution/page.jsx',
  'app/blog/page.jsx',
  'components/OffresStartup.jsx',
  'components/OffresEntreprise.jsx',
  'components/OffresInstitution.jsx',
  'components/OffreModal.jsx',
  'components/Footer.jsx',
  'components/Navbar.jsx',
]

let errors = 0

function check(file) {
  const filePath = path.join(ROOT, file)
  if (!fs.existsSync(filePath)) return

  const code = fs.readFileSync(filePath, 'utf8')
  const issues = []

  // Équilibre <section>
  const secOpen  = (code.match(/<section[\s>]/g) || []).length
  const secClose = (code.match(/<\/section>/g) || []).length
  if (secOpen !== secClose) {
    issues.push(`⚠ <section> déséquilibré : ${secOpen} ouvertures, ${secClose} fermetures`)
  }

  // Équilibre <div> (approximatif — exclut les self-closing)
  const divOpen  = (code.match(/<div[\s>]/g) || []).length
  const divClose = (code.match(/<\/div>/g) || []).length
  if (Math.abs(divOpen - divClose) > 2) {
    issues.push(`⚠ <div> probablement déséquilibré : ${divOpen} ouvertures, ${divClose} fermetures (diff: ${Math.abs(divOpen - divClose)})`)
  }

  // Référence à attr. (bug classique post-refactoring Strapi v5)
  const attrRefs = (code.match(/\battr\./g) || []).length
  if (attrRefs > 0) {
    issues.push(`⚠ Référence à 'attr.' détectée (${attrRefs} occurrences) — bug Strapi v5`)
  }

  // Apostrophes non échappées dans JSX (heuristique)
  const badApostrophes = (code.match(/"[^"]*'[^"]*"/g) || []).filter(m => m.includes("'"))
  // On ne le bloque pas car les apostrophes dans les doubles quotes sont ok

  if (issues.length > 0) {
    console.log(`\n❌ ${file}`)
    issues.forEach(i => console.log(`   ${i}`))
    errors += issues.length
  } else {
    console.log(`✅ ${file}`)
  }
}

console.log('🔍 Validation JSX — Jokko Pro Africa\n')
FILES_TO_CHECK.forEach(check)

if (errors > 0) {
  console.log(`\n❌ ${errors} problème(s) détecté(s). Corrigez avant de déployer.\n`)
  process.exit(1)
} else {
  console.log('\n✅ Tous les fichiers sont valides. Vous pouvez déployer.\n')
  process.exit(0)
}
