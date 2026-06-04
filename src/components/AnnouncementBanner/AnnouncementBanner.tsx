'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

const STORAGE_KEY = 'afs-banner-dismissed-v1'

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* noop */ }
  }

  if (!visible) return null

  return (
    <div className="relative z-[200] w-full bg-[var(--brand-navy)] text-white">
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--brand-gold)]" />
      <div className="container-custom flex items-center justify-between gap-4 py-2.5 px-4">
        <p className="text-xs font-medium text-white/80 truncate">
          Enrollment open for 2025–2026 — Limited seats.{' '}
          <Link href="/admissions" className="font-bold text-[var(--brand-gold-light)] hover:text-white transition-colors">
            Apply Now →
          </Link>
          <span className="mx-3 opacity-30 hidden md:inline">|</span>
          <span className="hidden md:inline opacity-70">
            التسجيل مفتوح ·{' '}
            <Link href="/admissions" className="font-bold text-[var(--brand-gold-light)] hover:text-white transition-colors">
              سجّل الآن
            </Link>
          </span>
        </p>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  )
}
