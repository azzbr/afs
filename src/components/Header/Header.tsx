'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, ChevronDown, Globe } from 'lucide-react'
import { clsx } from 'clsx'
import Logo from '@/components/Logo/Logo'

const navLinks = {
  en: [
    { label: 'Home', href: '/' },
    {
      label: 'Our School',
      href: '/about',
      children: [
        { label: 'Who We Are', href: '/about' },
        { label: 'Vision & Values', href: '/about#mission' },
        { label: 'From the Principal', href: '/about#principal' },
      ],
    },
    {
      label: 'Learning',
      href: '/academics',
      children: [
        { label: 'Our Curriculum', href: '/academics' },
        { label: 'Programs & Languages', href: '/academics#programs' },
        { label: 'Assessment', href: '/academics#star360' },
      ],
    },
    {
      label: 'Admissions',
      href: '/admissions',
      children: [
        { label: 'How to Apply', href: '/admissions' },
        { label: 'Start Application', href: '/apply' },
        { label: 'School Fees', href: '/fees' },
        { label: 'FAQ', href: '/admissions#faq' },
      ],
    },
    {
      label: 'Families',
      href: '/parents',
      children: [
        { label: 'Parent Hub', href: '/parents' },
        { label: 'School Calendar', href: '/calendar' },
        { label: 'News & Stories', href: '/news' },
        { label: 'Photo Gallery', href: '/gallery' },
      ],
    },
    {
      label: 'Our Team',
      href: '/staff',
      children: [
        { label: 'Staff & Faculty', href: '/staff' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/' },
    {
      label: 'مدرستنا',
      href: '/about',
      children: [
        { label: 'من نحن', href: '/about' },
        { label: 'الرؤية والقيم', href: '/about#mission' },
        { label: 'كلمة المديرة', href: '/about#principal' },
      ],
    },
    {
      label: 'التعلّم',
      href: '/academics',
      children: [
        { label: 'مناهجنا', href: '/academics' },
        { label: 'البرامج واللغات', href: '/academics#programs' },
        { label: 'التقييم', href: '/academics#star360' },
      ],
    },
    {
      label: 'القبول',
      href: '/admissions',
      children: [
        { label: 'كيفية التقديم', href: '/admissions' },
        { label: 'تقديم الطلب', href: '/apply' },
        { label: 'الرسوم الدراسية', href: '/fees' },
        { label: 'أسئلة شائعة', href: '/admissions#faq' },
      ],
    },
    {
      label: 'الأسرة',
      href: '/parents',
      children: [
        { label: 'مركز الأهالي', href: '/parents' },
        { label: 'التقويم المدرسي', href: '/calendar' },
        { label: 'الأخبار', href: '/news' },
        { label: 'معرض الصور', href: '/gallery' },
      ],
    },
    {
      label: 'فريقنا',
      href: '/staff',
      children: [
        { label: 'الكادر التعليمي', href: '/staff' },
        { label: 'الوظائف', href: '/careers' },
      ],
    },
    { label: 'تواصل معنا', href: '/contact' },
  ],
}

interface HeaderProps {
  lang?: 'en' | 'ar'
  onLangChange?: (lang: 'en' | 'ar') => void
}

export default function Header({ lang = 'en', onLangChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const isRTL = lang === 'ar'
  const links = navLinks[lang]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 16)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleLang = () => onLangChange?.(lang === 'en' ? 'ar' : 'en')

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden lg:block border-b border-line bg-white text-xs text-muted">
        <div className="container-custom flex h-9 items-center justify-between">
          <div className={clsx('flex items-center gap-6', isRTL && 'flex-row-reverse')}>
            <a href="tel:+97317612221" className="flex items-center gap-1.5 hover:text-brand-600 transition-colors">
              <Phone size={12} />
              <span dir="ltr">+973 1761 2221</span>
            </a>
            <a href="mailto:info@afs.edu.bh" className="flex items-center gap-1.5 hover:text-brand-600 transition-colors">
              <Mail size={12} />
              info@afs.edu.bh
            </a>
          </div>
          <span className="text-faint">
            {isRTL ? 'الأحد – الخميس · 7:00 ص – 3:00 م' : 'Sun – Thu · 7:00 AM – 3:00 PM'}
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <header
        className={clsx(
          'sticky top-0 z-50 w-full border-b bg-white transition-shadow duration-300',
          scrolled ? 'border-line shadow-card' : 'border-line/70',
        )}
      >
        <div className="container-custom">
          <div className={clsx('flex h-[68px] items-center justify-between', isRTL && 'flex-row-reverse')}>

            <Logo lang={lang} theme="light" />

            {/* Desktop nav */}
            <nav className={clsx('hidden items-center gap-1 lg:flex', isRTL && 'flex-row-reverse')}>
              {links.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={clsx(
                      'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive(link.href)
                        ? 'text-brand-600'
                        : 'text-ink/80 hover:text-brand-600',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        size={14}
                        className={clsx(
                          'text-faint transition-transform duration-200',
                          activeDropdown === link.label && 'rotate-180',
                        )}
                      />
                    )}
                  </Link>
                  {isActive(link.href) && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-600" />
                  )}

                  {/* Dropdown */}
                  {link.children && (
                    <div
                      className={clsx(
                        'absolute top-full w-56 pt-2 transition-all duration-200',
                        isRTL ? 'right-0' : 'left-0',
                        activeDropdown === link.label
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible -translate-y-1 opacity-0',
                      )}
                    >
                      <div className="overflow-hidden rounded-xl border border-line bg-white py-2 shadow-lift">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={clsx(
                              'flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted transition-colors hover:bg-brand-50 hover:text-brand-600',
                              isRTL && 'flex-row-reverse text-right',
                            )}
                          >
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-200" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className={clsx('hidden items-center gap-2.5 lg:flex', isRTL && 'flex-row-reverse')}>
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                <Globe size={13} />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
              <Link href="/admissions" className="btn-primary px-5 py-2.5 text-sm">
                {isRTL ? 'سجّل الآن' : 'Apply Now'}
              </Link>
            </div>

            {/* Mobile toggles */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-muted"
              >
                <Globe size={12} />
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="grid h-9 w-9 place-items-center rounded-lg text-ink hover:bg-brand-50 hover:text-brand-600 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={clsx(
            'absolute left-0 right-0 top-full overflow-hidden border-b border-line bg-white shadow-lift transition-all duration-300 lg:hidden',
            mobileOpen ? 'max-h-[85vh] overflow-y-auto opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
          )}
        >
          <div className="container-custom space-y-1 py-4">
            {links.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'block rounded-lg px-4 py-3 text-sm font-semibold transition-colors',
                    isActive(link.href) ? 'bg-brand-50 text-brand-600' : 'text-ink hover:bg-brand-50 hover:text-brand-600',
                    isRTL && 'text-right',
                  )}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className={clsx('space-y-0.5 py-0.5', isRTL ? 'mr-4' : 'ml-4')}>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={clsx(
                          'block rounded-lg px-4 py-2 text-[13px] text-muted transition-colors hover:bg-brand-50 hover:text-brand-600',
                          isRTL && 'text-right',
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-line pt-3">
              <Link
                href="/admissions"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full"
              >
                {isRTL ? 'سجّل الآن' : 'Apply Now'}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
