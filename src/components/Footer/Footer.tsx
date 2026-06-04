'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react'
import { clsx } from 'clsx'

const content = {
  en: {
    tagline: 'Learning extends beyond walls',
    description:
      'A non-profit, coeducational institution dedicated to high-quality bilingual education for students from Kindergarten to Grade 5 in Barbar, Bahrain.',
    quickLinks: {
      title: 'Quick Links',
      links: [
        { label: 'About AFS',       href: '/about' },
        { label: 'Academic Programs',href: '/academics' },
        { label: 'Admissions',      href: '/admissions' },
        { label: 'School Fees',     href: '/fees' },
        { label: 'Parent Hub',      href: '/parents' },
        { label: 'School Calendar', href: '/calendar' },
        { label: 'News & Events',   href: '/news' },
        { label: 'Staff & Faculty', href: '/staff' },
        { label: 'Contact Us',      href: '/contact' },
      ],
    },
    academics: {
      title: 'Academics',
      links: [
        { label: 'American Curriculum',  href: '/academics' },
        { label: 'MOE Curriculum',       href: '/academics' },
        { label: 'STAR 360 Assessment',  href: '/academics#star360' },
        { label: 'Trilingual Program',   href: '/academics#programs' },
        { label: 'KG Programs',          href: '/academics#kg' },
        { label: 'Grade 1–5',            href: '/academics#grades' },
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
      'مؤسسة غير ربحية مشتركة تكرس نفسها لتقديم تعليم ثنائي اللغة عالي الجودة للطلاب من رياض الأطفال حتى الصف الخامس في بربر، البحرين.',
    quickLinks: {
      title: 'روابط سريعة',
      links: [
        { label: 'عن الفجر',           href: '/about' },
        { label: 'البرامج الأكاديمية',  href: '/academics' },
        { label: 'القبول والتسجيل',     href: '/admissions' },
        { label: 'الرسوم الدراسية',     href: '/fees' },
        { label: 'مركز الأهالي',        href: '/parents' },
        { label: 'التقويم المدرسي',     href: '/calendar' },
        { label: 'الأخبار والفعاليات',  href: '/news' },
        { label: 'الكادر التعليمي',     href: '/staff' },
        { label: 'تواصل معنا',          href: '/contact' },
      ],
    },
    academics: {
      title: 'الأكاديمية',
      links: [
        { label: 'المنهج الأمريكي',          href: '/academics' },
        { label: 'منهج وزارة التربية',         href: '/academics' },
        { label: 'تقييم STAR 360',             href: '/academics#star360' },
        { label: 'برنامج ثلاثي اللغات',        href: '/academics#programs' },
        { label: 'برامج الروضة',               href: '/academics#kg' },
        { label: 'الصفوف 1 – 5',              href: '/academics#grades' },
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

  return (
    <footer
      className={clsx('bg-[var(--brand-navy)] text-white', isRTL && 'rtl')}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Gold top rule */}
      <div className="h-[3px] bg-[var(--brand-gold)]" />

      {/* Main */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                <span className="text-white font-bold text-lg font-playfair">A</span>
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--brand-gold)]" />
              </div>
              <div className={clsx(isRTL ? 'text-right' : 'text-left')}>
                <div className="font-bold text-sm text-white leading-tight font-playfair tracking-wide">
                  Al Fajer
                </div>
                <div className="text-[10px] text-white/50 leading-tight uppercase tracking-widest">
                  Private School
                </div>
              </div>
            </Link>

            <p className={clsx('text-[var(--brand-gold-light)] text-sm font-medium italic mb-4', isRTL && 'text-right')}>
              {t.tagline}
            </p>
            <p className={clsx('text-white/50 text-sm leading-relaxed mb-6', isRTL && 'text-right')}>
              {t.description}
            </p>

            <div>
              <p className={clsx('text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3', isRTL && 'text-right')}>
                {t.social}
              </p>
              <div className={clsx('flex gap-2', isRTL && 'flex-row-reverse')}>
                {[
                  { icon: Instagram, href: 'https://instagram.com/alfajrschool', label: 'Instagram' },
                  { icon: Facebook,  href: '#',                                  label: 'Facebook' },
                  { icon: Twitter,   href: '#',                                  label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={clsx('text-xs font-bold uppercase tracking-widest text-white/40 mb-5', isRTL && 'text-right')}>
              {t.quickLinks.title}
            </h4>
            <ul className="space-y-2.5">
              {t.quickLinks.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      'text-sm text-white/60 hover:text-white transition-colors',
                      isRTL && 'block text-right',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className={clsx('text-xs font-bold uppercase tracking-widest text-white/40 mb-5', isRTL && 'text-right')}>
              {t.academics.title}
            </h4>
            <ul className="space-y-2.5">
              {t.academics.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={clsx(
                      'text-sm text-white/60 hover:text-white transition-colors',
                      isRTL && 'block text-right',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={clsx('text-xs font-bold uppercase tracking-widest text-white/40 mb-5', isRTL && 'text-right')}>
              {t.contact.title}
            </h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: t.contact.address },
                { icon: Phone,  text: t.contact.phone, href: 'tel:+97317612221' },
                { icon: Mail,   text: t.contact.email, href: 'mailto:info@afs.edu.bh' },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a
                      href={href}
                      className={clsx(
                        'flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors',
                        isRTL && 'flex-row-reverse text-right',
                      )}
                    >
                      <Icon size={14} className="mt-0.5 flex-shrink-0 text-[var(--brand-gold-light)]" />
                      {text}
                    </a>
                  ) : (
                    <div className={clsx('flex items-start gap-3 text-sm text-white/60', isRTL && 'flex-row-reverse text-right')}>
                      <Icon size={14} className="mt-0.5 flex-shrink-0 text-[var(--brand-gold-light)]" />
                      {text}
                    </div>
                  )}
                </li>
              ))}
              <li className={clsx('text-xs text-white/40', isRTL && 'text-right')}>{t.contact.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/8">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className={clsx('text-center sm:text-left', isRTL && 'sm:text-right')}>
            <p className="text-xs text-white/30">{t.nonprofit}</p>
            <p className="text-xs text-white/30 mt-0.5">{t.copyright}</p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}
