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
    { label: 'Enroll', href: '/admissions' },
    { label: 'Campus Life', href: '/gallery' },
    { label: 'Stories', href: '/news' },
    { label: 'Reach Us', href: '/contact' },
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
    { label: 'التسجيل', href: '/admissions' },
    { label: 'الحياة المدرسية', href: '/gallery' },
    { label: 'أخبارنا', href: '/news' },
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
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en'
    onLangChange?.(next)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-brand-blue text-white text-xs py-2">
        <div className="container-custom flex items-center justify-between">
          <div className={clsx('flex items-center gap-6', isRTL && 'flex-row-reverse')}>
            <a
              href="tel:+97317612221"
              className="flex items-center gap-1.5 hover:text-brand-gold transition-colors"
            >
              <Phone size={12} />
              <span>+973 1761 2221</span>
            </a>
            <a
              href="mailto:info@afs.edu.bh"
              className="hover:text-brand-gold transition-colors"
            >
              info@afs.edu.bh
            </a>
          </div>
          <div className={clsx('flex items-center gap-4', isRTL && 'flex-row-reverse')}>
            <span className="opacity-70">
              {isRTL ? 'طريق البديع، بربر، البحرين' : 'Budaiya Highway, Barbar, Bahrain'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={clsx(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'glass-white shadow-glass border-b border-white/40'
            : 'bg-white/95 backdrop-blur-sm border-b border-neutral-100',
        )}
      >
        <div className="container-custom">
          <div className={clsx('flex items-center justify-between h-18 py-3', isRTL && 'flex-row-reverse')}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center shadow-brand overflow-hidden">
                <span className="text-white font-bold text-lg font-playfair">A</span>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold" />
              </div>
              <div className={clsx(isRTL ? 'text-right' : 'text-left')}>
                <div className="font-bold text-sm text-neutral-900 leading-tight font-playfair group-hover:text-brand-blue transition-colors">
                  Al Fajer
                </div>
                <div className="text-xs text-neutral-500 leading-tight">
                  {isRTL ? 'مدرسة الفجر الخاصة' : 'Private School'}
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className={clsx('hidden lg:flex items-center gap-1', isRTL && 'flex-row-reverse')}>
              {links.map((link) => (
                <div key={link.href} className="relative group">
                  {link.children ? (
                    <Link
                      href={link.href}
                      className={clsx(
                        'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative',
                        isActive(link.href)
                          ? 'text-brand-blue bg-blue-50 font-semibold'
                          : 'text-neutral-700 hover:text-brand-blue hover:bg-blue-50',
                        isRTL && 'flex-row-reverse',
                      )}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-brand-blue" />
                      )}
                      <ChevronDown
                        size={14}
                        className={clsx(
                          'transition-transform duration-200',
                          activeDropdown === link.label && 'rotate-180',
                        )}
                      />
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className={clsx(
                        'relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 block',
                        isActive(link.href)
                          ? 'text-brand-blue bg-blue-50 font-semibold'
                          : 'text-neutral-700 hover:text-brand-blue hover:bg-blue-50',
                      )}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-brand-blue" />
                      )}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {link.children && (
                    <div
                      className={clsx(
                        'absolute top-full mt-2 w-56 bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-neutral-100 py-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 scale-95 group-hover:scale-100 origin-top',
                        isRTL ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
                        'translate-y-1 group-hover:translate-y-0',
                      )}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {/* Top accent */}
                      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={clsx(
                            'flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-600 hover:text-brand-blue hover:bg-blue-50/70 transition-all duration-150 group/item',
                            isRTL && 'text-right flex-row-reverse',
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/30 group-hover/item:bg-brand-blue group-hover/item:scale-125 transition-all duration-150 flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className={clsx('hidden lg:flex items-center gap-3', isRTL && 'flex-row-reverse')}>
              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-600 hover:border-brand-blue hover:text-brand-blue hover:bg-blue-50 transition-all duration-200"
              >
                <Globe size={13} />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>

              {/* CTA Button */}
              <Link href="/admissions" className="btn-primary text-xs px-5 py-2.5">
                {isRTL ? 'التسجيل الآن' : 'Apply Now'}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-600"
              >
                <Globe size={12} />
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-neutral-700 hover:text-brand-blue hover:bg-blue-50 transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            'lg:hidden absolute top-full left-0 right-0 glass-white border-b border-white/40 shadow-glass overflow-hidden transition-all duration-300',
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
          )}
        >
          <div className="container-custom py-4 space-y-1">
            {links.map((link) => (
              <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'block px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      isActive(link.href)
                        ? 'text-brand-blue bg-blue-50 font-semibold border-l-2 border-brand-blue'
                        : 'text-neutral-700 hover:text-brand-blue hover:bg-blue-50',
                      isRTL && 'text-right',
                    )}
                  >
                    {link.label}
                  </Link>
                {link.children && (
                  <div className="ml-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={clsx(
                          'block px-4 py-2 rounded-lg text-xs text-neutral-500 hover:text-brand-blue hover:bg-blue-50 transition-all',
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