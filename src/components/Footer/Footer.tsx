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
        { label: 'About AFS', href: '/about' },
        { label: 'Academic Programs', href: '/academics' },
        { label: 'Admissions', href: '/admissions' },
        { label: 'School Fees', href: '/fees' },
        { label: 'Parent Hub', href: '/parents' },
        { label: 'School Calendar', href: '/calendar' },
        { label: 'News & Events', href: '/news' },
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
      'مؤسسة غير ربحية مشتركة تكرس نفسها لتقديم تعليم ثنائي اللغة عالي الجودة للطلاب من رياض الأطفال حتى الصف الخامس في بربر، البحرين.',
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={clsx('relative bg-neutral-950 text-white overflow-hidden', isRTL && 'rtl')} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-brand-blue/6 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-brand-gold/4 blur-[100px] rounded-full" />
      </div>
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

      {/* Main Footer */}
      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center shadow-brand flex-shrink-0 relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg font-playfair">A</span>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-gold" />
                {/* Shine on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className={clsx(isRTL ? 'text-right' : 'text-left')}>
                <div className="font-bold text-sm text-white leading-tight font-playfair group-hover:text-brand-gold transition-colors duration-300">
                  Al Fajer
                </div>
                <div className="text-xs text-neutral-400 leading-tight">Private School</div>
              </div>
            </Link>
            <p className="text-brand-gold text-sm font-medium italic mb-4">{t.tagline}</p>
            <p className={clsx('text-neutral-400 text-sm leading-relaxed mb-6', isRTL && 'text-right')}>
              {t.description}
            </p>

            {/* Social Links */}
            <div>
              <p className={clsx('text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3', isRTL && 'text-right')}>
                {t.social}
              </p>
              <div className={clsx('flex gap-2', isRTL && 'flex-row-reverse')}>
                {[
                  { icon: Instagram, href: 'https://instagram.com/alfajrschool', label: 'Instagram', color: 'hover:border-pink-500/50 hover:text-pink-400 hover:bg-pink-500/5' },
                  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5' },
                  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:border-sky-500/50 hover:text-sky-400 hover:bg-sky-500/5' },
                ].map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={clsx(
                      'w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                      color,
                    )}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={clsx('text-sm font-bold text-white uppercase tracking-wider mb-5', isRTL && 'text-right')}>
              {t.quickLinks.title}
            </h4>
            <ul className="space-y-2.5">
              {t.quickLinks.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      'group relative text-sm text-neutral-400 hover:text-brand-gold transition-colors duration-200 flex items-center gap-2 w-fit',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-blue group-hover:bg-brand-gold group-hover:scale-150 transition-all duration-200 flex-shrink-0" />
                    <span className="relative">
                      {link.label}
                      {/* Underline wipe */}
                      <span className="absolute bottom-0 left-0 h-px bg-brand-gold w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className={clsx('text-sm font-bold text-white uppercase tracking-wider mb-5', isRTL && 'text-right')}>
              {t.academics.title}
            </h4>
            <ul className="space-y-2.5">
              {t.academics.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={clsx(
                      'group relative text-sm text-neutral-400 hover:text-brand-gold transition-colors duration-200 flex items-center gap-2 w-fit',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-blue group-hover:bg-brand-gold group-hover:scale-150 transition-all duration-200 flex-shrink-0" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-px bg-brand-gold w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={clsx('text-sm font-bold text-white uppercase tracking-wider mb-5', isRTL && 'text-right')}>
              {t.contact.title}
            </h4>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: t.contact.address },
                { icon: Phone, text: t.contact.phone, href: 'tel:+97317612221' },
                { icon: Mail, text: t.contact.email, href: 'mailto:info@afs.edu.bh' },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a
                      href={href}
                      className={clsx(
                        'group flex items-start gap-3 text-sm text-neutral-400 hover:text-brand-gold transition-colors',
                        isRTL && 'flex-row-reverse text-right',
                      )}
                    >
                      <Icon size={15} className="text-brand-blue mt-0.5 flex-shrink-0 group-hover:text-brand-gold group-hover:scale-110 transition-all duration-200" />
                      {text}
                    </a>
                  ) : (
                    <div className={clsx('flex items-start gap-3 text-sm text-neutral-400', isRTL && 'flex-row-reverse text-right')}>
                      <Icon size={15} className="text-brand-blue mt-0.5 flex-shrink-0" />
                      {text}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className={clsx('text-center sm:text-left', isRTL && 'sm:text-right')}>
            <p className="text-xs text-neutral-600">{t.nonprofit}</p>
            <p className="text-xs text-neutral-600 mt-0.5">{t.copyright}</p>
          </div>
          <button
            onClick={scrollToTop}
            className="group w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 hover:text-brand-gold hover:border-brand-gold/40 hover:bg-brand-gold/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,215,0,0.2)]"
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  )
}