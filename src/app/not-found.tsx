'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { LogoMark } from '@/components/Logo/Logo'
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
    <div className="flex min-h-screen flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex flex-1 items-center justify-center bg-canvas py-24">
        <div className="container-custom max-w-2xl text-center">
          <div className="mb-8 flex flex-col items-center">
            <LogoMark size={64} />
            <span className="mt-6 font-display text-7xl font-extrabold leading-none text-brand-100 md:text-8xl">
              {t.code}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">{t.title}</h1>
          <p className="mx-auto mb-10 mt-4 max-w-md text-lg leading-relaxed text-muted">{t.subtitle}</p>

          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {t.links.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} className="btn-outline px-5 py-3 text-sm">
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-faint transition-colors hover:text-brand-600"
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
