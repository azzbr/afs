'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Megaphone } from 'lucide-react'

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
    <div className="relative z-[200] w-full bg-gradient-to-r from-brand-blue via-blue-600 to-indigo-700 text-white overflow-hidden">
      {/* Subtle shimmer sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
      <div className="relative container-custom flex items-center justify-between gap-4 py-2.5 px-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <Megaphone size={14} className="text-brand-gold flex-shrink-0 animate-pulse" />
          <p className="text-xs font-semibold truncate">
            <span className="hidden sm:inline">🎉 </span>
            Enrollment is now open for 2025–2026 — Limited seats available.{' '}
            <Link href="/admissions" className="underline underline-offset-2 hover:text-brand-gold transition-colors font-bold">
              Apply Now →
            </Link>
            <span className="mx-3 opacity-40 hidden md:inline">|</span>
            <span className="hidden md:inline opacity-80 arabic-text">
              التسجيل مفتوح الآن · {' '}
              <Link href="/admissions" className="underline underline-offset-2 hover:text-brand-gold transition-colors font-bold">
                سجّل الآن
              </Link>
            </span>
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="flex-shrink-0 w-6 h-6 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors duration-150"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  )
}