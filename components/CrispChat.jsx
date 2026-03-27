'use client'
import { useEffect } from 'react'

export default function CrispChat() {
  useEffect(() => {
    const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    if (!websiteId) return

    window.$crisp = []
    window.CRISP_WEBSITE_ID = websiteId

    const s = document.createElement('script')
    s.src = 'https://client.crisp.chat/l.js'
    s.async = true
    document.head.appendChild(s)

    return () => {
      // Cleanup on unmount
      delete window.$crisp
      delete window.CRISP_WEBSITE_ID
    }
  }, [])

  return null
}
