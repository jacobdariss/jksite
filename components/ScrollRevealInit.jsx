'use client'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// Composant vide — juste pour activer le hook dans les server pages
export default function ScrollRevealInit() {
  useScrollReveal()
  return null
}
