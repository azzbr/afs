'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, Globe } from 'lucide-react'
import { clsx } from 'clsx'

const navLinks = {
  en: [
    { label: 'Home', href: '/' },
    {
      label: 'Our School',
      href: '/about',
      children: [
        { label: 'Who We Are',         href: '/about' },
        { label: 'Vision & Values',    href: '/about#mission' },
        { label: 'From the Principal', href: '/about#principal' },
      ],
    },
    {
      label: 'Learning',
      href: '/academics',
      children: [
        { label: 'Our Curriculum',      href: '/academics' },
        { label: 'Programs & Languages',href: '/academics#programs' },
        { label: 'Assessment',          href: '/academics#star360' },
      ],
    },
    {
      label: 'Admissions',
      href: '/admissions',
      children: [
        { label: 'How to Apply',      href: '/admissions' },
        { label: 'Start Application', href: '/apply' },
        { label: 'School Fees',       href: '/fees' },
        { label: 'FAQ',               href: '/admissions#faq' },
      ],
    },
    {
      label: 'Families',
      href: '/parents',
      children: [
        { label: 'Parent Hub',      href: '/parents' },
        { label: 'School Calendar', href: '/calendar' },
        { label: 'News & Stories',  href: '/news' },
        { label: 'Photo Gallery',   href: '/gallery' },
      ],
    },
    {
      label: 'Our Team',
      href: '/staff',
      children: [
        { label: 'Staff & Faculty', href: '/staff' },
        { label: 'Careers',         href: '/careers' },
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
        { label: 'من نحن',        href: '/about' },
        { label: 'الرؤية والقيم', href: '/about#mission' },
        { label: 'كلمة المديرة',  href: '/about#principal' },
      ],
    },
    {
      label: 'التعلّم',
      href: '/academics',
      children: [
        { label: 'مناهجنا',         href: '/academics' },
        { label: 'البرامج واللغات',  href: '/academics#programs' },
        { label: 'التقييم',          href: '/academics#star360' },
      ],
    },
    {
      label: 'القبول',
      href: '/admissions',
      children: [
        { label: 'كيفية التقديم',    href: '/admissions' },
        { label: 'تقديم الطلب',      href: '/apply' },
        { label: 'الرسوم الدراسية',  href: '/fees' },
        { label: 'أسئلة شائعة',     href: '/admissions#faq' },
      ],
    },
    {
      label: 'الأسرة',
      href: '/parents',
      children: [
        { label: 'مركز الأهالي',    href: '/parents' },
        { label: 'التقويم المدرسي',  href: '/calendar' },
        { label: 'الأخبار',          href: '/news' },
        { label: 'معرض الصور',       href: '/gallery' },
      ],
    },
    {
      label: 'فريقنا',
      href: '/staff',
      children: [
        { label: 'الكادر التعليمي', href: '/staff' },
        { label: 'الوظائف',          href: '/careers' },
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
  const pathname = usePathname()
  const isRTL = lang === 'ar'
  const links = navLinks[lang]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 24)
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
      {/* Top strip */}
      <div className="hidden lg:block bg-[var(--brand-navy)] text-white/70 text-xs py-2">
        <div className="container-custom flex items-center justify-between">
          <div className={clsx('flex items-center gap-6', isRTL && 'flex-row-reverse')}>
            <a href="tel:+97317612221" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} />
              +973 1761 2221
            </a>
            <a href="mailto:info@afs.edu.bh" className="hover:text-white transition-colors">
              info@afs.edu.bh
            </a>
          </div>
          <span className="opacity-60 text-xs">
            {isRTL ? 'طريق البديع، بربر، البحرين' : 'Budaiya Highway, Barbar, Bahrain'}
          </span>
        </div>
      </div>

      {/* Main header */}
      <header
        className={clsx(
          'sticky top-0 z-50 w-full transition-all duration-300 border-b',
          scrolled
            ? 'glass border-neutral-200 shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
            : 'bg-white border-neutral-100',
        )}
      >
        <div className="container-custom">
          <div className={clsx('flex items-center justify-between h-18 py-3', isRTL && 'flex-row-reverse')}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-10 h-10 bg-[var(--brand-navy)] flex items-center justify-center overflow-hidden">
                <span className="text-white font-bold text-lg font-playfair">A</span>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--brand-gold)]" />
              </div>
              <div className={clsx(isRTL ? 'text-right' : 'text-left')}>
                <div className="font-bold text-sm text-[var(--brand-navy)] leading-tight font-playfair tracking-wide">
                  Al Fajer
                </div>
                <div className="text-[10px] text-neutral-500 leading-tight uppercase tracking-widest">
                  {isRTL ? 'مدرسة الفجر الخاصة' : 'Private School · Bahrain'}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className={clsx('hidden lg:flex items-center', isRTL && 'flex-row-reverse')}>
              {links.map((link) => (
                <div key={link.href} className="relative group">
                  {link.children ? (
                    <>
                      <Link
                        href={link.href}
                        className={clsx(
                          'flex items-center gap-1 px-3 py-6 text-sm font-medium transition-colors duration-200 border-b-2',
                          isActive(link.href)
                            ? 'text-[var(--brand-navy)] border-[var(--brand-gold)]'
                            : 'text-neutral-600 border-transparent hover:text-[var(--brand-navy)]',
                          isRTL && 'flex-row-reverse',
                        )}
                      >
                        {link.label}
                        <ChevronDown size={13} className="transition-transform duration-200 group-hover:rotate-180 opacity-60" />
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={clsx(
                          'absolute top-full w-52 bg-white border border-neutral-100 shadow-[0_8px_32px_rgba(0,0,0,0.10)] py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 -translate-y-1 group-hover:translate-y-0',
                          isRTL ? 'right-0' : 'left-0',
                        )}
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--brand-gold)]" />
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={clsx(
                              'block px-4 py-2.5 text-sm text-neutral-600 hover:text-[var(--brand-navy)] hover:bg-neutral-50 transition-colors',
                              isRTL && 'text-right',
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={clsx(
                        'block px-3 py-6 text-sm font-medium transition-colors duration-200 border-b-2',
                        isActive(link.href)
                          ? 'text-[var(--brand-navy)] border-[var(--brand-gold)]'
                          : 'text-neutral-600 border-transparent hover:text-[var(--brand-navy)]',
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className={clsx('hidden lg:flex items-center gap-3', isRTL && 'flex-row-reverse')}>
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 text-xs font-semibold text-neutral-600 hover:border-[var(--brand-navy)] hover:text-[var(--brand-navy)] transition-colors"
              >
                <Globe size={12} />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
              <Link href="/admissions" className="btn-primary text-xs px-5 py-2.5">
                {isRTL ? 'التسجيل' : 'Apply Now'}
              </Link>
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 px-2.5 py-1.5 border border-neutral-200 text-xs font-semibold text-neutral-600"
              >
                <Globe size={12} />
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-neutral-700 hover:text-[var(--brand-navy)] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={clsx(
            'lg:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-lg overflow-hidden transition-all duration-300',
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
          )}
        >
          <div className="container-custom py-4 space-y-0.5">
            {links.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'block px-4 py-2.5 text-sm font-medium transition-colors border-l-2',
                    isActive(link.href)
                      ? 'text-[var(--brand-navy)] bg-neutral-50 border-[var(--brand-gold)]'
                      : 'text-neutral-600 border-transparent hover:text-[var(--brand-navy)] hover:bg-neutral-50',
                    isRTL && 'text-right border-l-0 border-r-2',
                  )}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className={clsx('space-y-0.5', isRTL ? 'mr-4' : 'ml-4')}>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={clsx(
                          'block px-4 py-2 text-xs text-neutral-500 hover:text-[var(--brand-navy)] hover:bg-neutral-50 transition-colors',
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
            <div className="pt-3 pb-1 border-t border-neutral-100">
              <Link
                href="/admissions"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                {isRTL ? 'التسجيل الآن' : 'Apply Now'}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
