'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue transition-none"
        style={{ width: `${progress}%` }}
      />
      {/* Glowing tip */}
      <div
        className="absolute top-0 h-[3px] w-12 bg-white/60 blur-[3px] -translate-x-full"
        style={{ left: `${progress}%` }}
      />
    </div>
  )
}