'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { clsx } from 'clsx'

interface FloatingCTAProps {
  lang?: 'en' | 'ar'
}

export default function FloatingCTA({ lang = 'en' }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false)
  const isRTL = lang === 'ar'

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const label = lang === 'ar' ? 'سجّل الآن' : 'Apply Now'
  const Arr = isRTL ? ArrowLeft : ArrowRight

  return (
    <div
      className={clsx(
        'fixed bottom-7 z-[150] transition-all duration-500',
        isRTL ? 'left-5' : 'right-5',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none',
      )}
    >
      <Link
        href="/admissions"
        className="group relative flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-gold text-neutral-900 font-bold text-sm shadow-[0_8px_30px_rgba(255,200,0,0.45)] hover:shadow-[0_12px_50px_rgba(255,200,0,0.7)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      >
        {/* Shimmer sweep */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out" />
        <span className="relative z-10">{label}</span>
        <Arr size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
      </Link>
    </div>
  )
}