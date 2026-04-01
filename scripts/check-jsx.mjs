#!/usr/bin/env node
/**
 * check-jsx.mjs — Vérification structurelle de page.jsx avant commit
 * Usage : node scripts/check-jsx.mjs
 */

import { readFileSync } from 'fs'

const files = ['app/page.jsx', 'app/layout.jsx']
let hasError = false

for (const file of files) {
  let code
  try { code = readFileSync(file, 'utf8') } catch { continue }

  const sections  = (code.match(/<section/g)  || []).length
  const sections_ = (code.match(/<\/section>/g) || []).length
  const divs      = (code.match(/<div/g)       || []).length
  const divs_     = (code.match(/<\/div>/g)     || []).length

  if (sections !== sections_) {
    console.error(`❌ ${file} : <section> déséquilibré (${sections} open / ${sections_} close)`)
    hasError = true
  } else {
    console.log(`✅ ${file} : sections OK (${sections})`)
  }

  if (divs !== divs_) {
    console.error(`❌ ${file} : <div> déséquilibré (${divs} open / ${divs_} close)`)
    hasError = true
  } else {
    console.log(`✅ ${file} : divs OK (${divs})`)
  }
}

if (hasError) {
  console.error('\n🚨 Erreurs JSX détectées. Corrige avant de committer.\n')
  process.exit(1)
} else {
  console.log('\n✅ Vérification JSX passée.\n')
}
