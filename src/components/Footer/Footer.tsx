'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react'
import { clsx } from 'clsx'
import Logo from '@/components/Logo/Logo'

const content = {
  en: {
    tagline: 'Learning extends beyond walls',
    description:
      'A non-profit, coeducational school offering high-quality bilingual education from Kindergarten to Grade 5.',
    quickLinks: {
      title: 'Quick Links',
      links: [
        { label: 'About AFS', href: '/about' },
        { label: 'Academic Programs', href: '/academics' },
        { label: 'Admissions', href: '/admissions' },
        { label: 'School Fees', href: '/fees' },
        { label: 'Parent Hub', href: '/parents' },
        { label: 'School Calendar', href: '/calendar' },
        { label: 'News & Events', href: '/news' },
        { label: 'Staff & Faculty', href: '/staff' },
        { label: 'Contact Us', href: '/contact' },
      ],
    },
    academics: {
      title: 'Academics',
      links: [
        { label: 'American Curriculum', href: '/academics' },
        { label: 'MOE Curriculum', href: '/academics' },
        { label: 'STAR 360 Assessment', href: '/academics#star360' },
        { label: 'Trilingual Program', href: '/academics#programs' },
        { label: 'KG Programs', href: '/academics#kg' },
        { label: 'Grade 1–5', href: '/academics#grades' },
      ],
    },
    contact: {
      title: 'Get in Touch',
      address: 'Budaiya Highway, Barbar, Bahrain',
      phone: '+973 1761 2221',
      email: 'info@afs.edu.bh',
      hours: 'Sun – Thu: 7:00 AM – 3:00 PM',
    },
    social: 'Follow Us',
    copyright: '© 2025 Al Fajer Private School. All Rights Reserved.',
    nonprofit: 'Non-Profit · Coeducational · Licensed by Bahrain MOE',
  },
  ar: {
    tagline: 'التعلم يمتد إلى ما هو أبعد من الجدران',
    description:
      'مدرسة غير ربحية مختلطة تقدّم تعليماً ثنائي اللغة عالي الجودة من رياض الأطفال حتى الصف الخامس.',
    quickLinks: {
      title: 'روابط سريعة',
      links: [
        { label: 'عن الفجر', href: '/about' },
        { label: 'البرامج الأكاديمية', href: '/academics' },
        { label: 'القبول والتسجيل', href: '/admissions' },
        { label: 'الرسوم الدراسية', href: '/fees' },
        { label: 'مركز الأهالي', href: '/parents' },
        { label: 'التقويم المدرسي', href: '/calendar' },
        { label: 'الأخبار والفعاليات', href: '/news' },
        { label: 'الكادر التعليمي', href: '/staff' },
        { label: 'تواصل معنا', href: '/contact' },
      ],
    },
    academics: {
      title: 'الأكاديمية',
      links: [
        { label: 'المنهج الأمريكي', href: '/academics' },
        { label: 'منهج وزارة التربية', href: '/academics' },
        { label: 'تقييم STAR 360', href: '/academics#star360' },
        { label: 'برنامج ثلاثي اللغات', href: '/academics#programs' },
        { label: 'برامج الروضة', href: '/academics#kg' },
        { label: 'الصفوف 1 – 5', href: '/academics#grades' },
      ],
    },
    contact: {
      title: 'تواصل معنا',
      address: 'طريق البديع، بربر، البحرين',
      phone: '+973 1761 2221',
      email: 'info@afs.edu.bh',
      hours: 'الأحد – الخميس: 7:00 ص – 3:00 م',
    },
    social: 'تابعونا',
    copyright: '© 2025 مدرسة الفجر الخاصة. جميع الحقوق محفوظة.',
    nonprofit: 'غير ربحية · مختلطة · مرخصة من وزارة التربية',
  },
}

interface FooterProps {
  lang?: 'en' | 'ar'
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const t = content[lang]
  const isRTL = lang === 'ar'

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const linkClass = clsx(
    'group flex w-fit items-center gap-2 text-sm text-white/65 transition-colors hover:text-accent-400',
    isRTL && 'flex-row-reverse',
  )
  const dotClass = 'h-1 w-1 flex-shrink-0 rounded-full bg-white/30 transition-colors group-hover:bg-accent-400'

  return (
    <footer className="bg-brand-700 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="border-t-2 border-accent-500" />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Logo lang={lang} theme="dark" className="mb-5" />
            <p className="mb-3 text-sm font-medium text-accent-400">{t.tagline}</p>
            <p className={clsx('mb-6 text-sm leading-relaxed text-white/65', isRTL && 'text-right')}>
              {t.description}
            </p>
            <p className={clsx('mb-3 text-xs font-semibold uppercase tracking-widest text-white/45', isRTL && 'text-right')}>
              {t.social}
            </p>
            <div className={clsx('flex gap-2', isRTL && 'flex-row-reverse')}>
              {[
                { icon: Instagram, href: 'https://instagram.com/alfajrschool', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 bg-white/5 text-white/70 transition-colors hover:border-accent-400/50 hover:bg-white/10 hover:text-accent-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className={clsx('mb-5 text-sm font-bold uppercase tracking-wider text-white', isRTL && 'text-right')}>
              {t.quickLinks.title}
            </h4>
            <ul className="space-y-2.5">
              {t.quickLinks.links.map((link) => (
                <li key={link.href} className={isRTL ? 'flex justify-end' : ''}>
                  <Link href={link.href} className={linkClass}>
                    <span className={dotClass} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className={clsx('mb-5 text-sm font-bold uppercase tracking-wider text-white', isRTL && 'text-right')}>
              {t.academics.title}
            </h4>
            <ul className="space-y-2.5">
              {t.academics.links.map((link) => (
                <li key={link.label} className={isRTL ? 'flex justify-end' : ''}>
                  <Link href={link.href} className={linkClass}>
                    <span className={dotClass} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={clsx('mb-5 text-sm font-bold uppercase tracking-wider text-white', isRTL && 'text-right')}>
              {t.contact.title}
            </h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: t.contact.address },
                { icon: Phone, text: t.contact.phone, href: 'tel:+97317612221' },
                { icon: Mail, text: t.contact.email, href: 'mailto:info@afs.edu.bh' },
                { icon: Clock, text: t.contact.hours },
              ].map(({ icon: Icon, text, href }) => {
                const inner = (
                  <>
                    <Icon size={15} className="mt-0.5 flex-shrink-0 text-accent-400" />
                    <span dir={href?.startsWith('tel') ? 'ltr' : undefined}>{text}</span>
                  </>
                )
                return (
                  <li key={text}>
                    {href ? (
                      <a href={href} className={clsx('flex items-start gap-3 text-sm text-white/65 transition-colors hover:text-accent-400', isRTL && 'flex-row-reverse text-right')}>
                        {inner}
                      </a>
                    ) : (
                      <div className={clsx('flex items-start gap-3 text-sm text-white/65', isRTL && 'flex-row-reverse text-right')}>
                        {inner}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <div className={clsx('text-center', isRTL ? 'sm:text-right' : 'sm:text-left')}>
            <p className="text-xs text-white/50">{t.nonprofit}</p>
            <p className="mt-0.5 text-xs text-white/40">{t.copyright}</p>
          </div>
          <button
            onClick={scrollToTop}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 bg-white/5 text-white/60 transition-colors hover:border-accent-400/50 hover:text-accent-400"
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
