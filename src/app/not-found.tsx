'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Home, BookOpen, Phone, ArrowLeft, ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'

const content = {
  en: {
    code: '404',
    title: 'Page Not Found',
    subtitle: "We couldn't find the page you were looking for. It may have been moved or the link might be incorrect.",
    links: [
      { label: 'Go Home', href: '/', icon: Home },
      { label: 'Admissions', href: '/admissions', icon: BookOpen },
      { label: 'Contact Us', href: '/contact', icon: Phone },
    ],
    back: 'Go Back',
  },
  ar: {
    code: '٤٠٤',
    title: 'الصفحة غير موجودة',
    subtitle: 'لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو أن الرابط غير صحيح.',
    links: [
      { label: 'الرئيسية', href: '/', icon: Home },
      { label: 'القبول', href: '/admissions', icon: BookOpen },
      { label: 'تواصل معنا', href: '/contact', icon: Phone },
    ],
    back: 'رجوع',
  },
}

export default function NotFound() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const t = content[lang]
  const isRTL = lang === 'ar'
  const BackIcon = isRTL ? ArrowRight : ArrowLeft

  return (
    <div className={clsx('min-h-screen flex flex-col', isRTL && 'rtl')} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1 flex items-center justify-center hero-dark py-24">
        <div className="container-custom text-center max-w-2xl text-white">

          {/* Large code + logo mark */}
          <div className="relative inline-block mb-8">
            <span
              className="text-[9rem] font-black font-playfair leading-none select-none"
              style={{ color: 'var(--brand-gold)', opacity: 0.15 }}
            >
              {t.code}
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-24 h-24 flex items-center justify-center"
                style={{ background: 'var(--brand-gold)' }}
              >
                <span className="text-white font-bold text-3xl font-playfair">A</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-white">{t.title}</h1>
          <p className="text-white/60 text-lg mb-10 max-w-md mx-auto leading-relaxed">{t.subtitle}</p>

          {/* Quick links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            {t.links.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-2 px-5 py-3 border text-sm font-medium transition-all duration-200',
                  isRTL && 'flex-row-reverse',
                )}
                style={{
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brand-gold)'
                  e.currentTarget.style.color = 'white'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.10)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => window.history.back()}
            className={clsx('inline-flex items-center gap-2 text-sm transition-colors text-white/40 hover:text-white/80', isRTL && 'flex-row-reverse')}
          >
            <BackIcon size={14} />
            {t.back}
          </button>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
