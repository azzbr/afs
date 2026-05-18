'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import {
  ArrowRight, ArrowLeft, Calendar, Sun, Star, BookOpen,
  Flag, Sparkles, Clock, Layers, Trophy, FlaskConical, Palette, Music
} from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/* ─────────────────────────── translations ─────────────────────────── */
const t = {
  en: {
    hero: {
      tag: 'Academic Calendar',
      title: 'School Year',
      titleAccent: '2025 – 2026',
      subtitle: 'Stay organised with all term dates, public holidays, and key school events for the Al Fajer Private School academic year.',
    },
    legend: {
      title: 'Category Legend',
      terms: 'Terms & Breaks',
      holidays: 'Public Holidays',
      events: 'School Events',
      assessments: 'Assessments',
    },
    calSection: {
      tag: 'Term Dates',
      title: 'Academic Calendar Overview',
    },
    terms: [
      { label: 'Term 1',       dates: 'Sep 1 – Nov 27, 2025',      type: 'term' },
      { label: 'Term 1 Break', dates: 'Nov 28 – Dec 5, 2025',      type: 'break' },
      { label: 'Term 2',       dates: 'Dec 7, 2025 – Mar 5, 2026', type: 'term' },
      { label: 'Term 2 Break', dates: 'Mar 6 – Mar 20, 2026',      type: 'break' },
      { label: 'Term 3',       dates: 'Mar 22 – Jun 11, 2026',     type: 'term' },
      { label: 'Summer Break', dates: 'Jun 12 – Aug 2026',         type: 'break' },
    ],
    holidays: {
      tag: 'Public Holidays',
      title: 'Bahrain & Islamic Holidays',
      items: [
        { name: "Prophet's Birthday",    date: 'Sep 4, 2025 (approx)',      icon: Star },
        { name: 'Islamic New Year',       date: 'Jun 26, 2025 (approx)',     icon: Calendar },
        { name: 'Bahrain National Day',   date: 'Dec 16 – 17, 2025',         icon: Flag },
        { name: "New Year's Day",         date: 'Jan 1, 2026',               icon: Sun },
        { name: 'Eid Al Fitr',            date: 'Mar 30 – Apr 2, 2026 (approx)', icon: Star },
        { name: 'Eid Al Adha',            date: 'Jun 6 – 9, 2026 (approx)',  icon: Star },
      ],
    },
    events: {
      tag: 'School Events',
      title: 'Key Events Timeline',
      months: [
        {
          month: 'September 2025',
          items: [
            { day: 'Sep 1',  label: 'First Day of School',    type: 'event' },
            { day: 'Sep 15', label: 'Parent Welcome Night',   type: 'event' },
          ],
        },
        {
          month: 'October 2025',
          items: [
            { day: 'Oct 5',  label: 'Cultural Day',           type: 'event' },
            { day: 'Oct 20', label: 'Sports Day Prep',        type: 'event' },
          ],
        },
        {
          month: 'November 2025',
          items: [
            { day: 'Nov 10', label: 'Parent-Teacher Meetings', type: 'event' },
            { day: 'Nov 17', label: 'STAR 360 Assessment',     type: 'assessment' },
            { day: 'Nov 28', label: 'Winter Break Begins',     type: 'break' },
          ],
        },
        {
          month: 'December 2025',
          items: [
            { day: 'Dec 7',  label: 'Term 2 Begins',           type: 'break' },
            { day: 'Dec 16', label: 'National Day Celebration', type: 'event' },
          ],
        },
        {
          month: 'January 2026',
          items: [
            { day: 'Jan',    label: 'Mid-Year Reports Distributed', type: 'assessment' },
          ],
        },
        {
          month: 'February 2026',
          items: [
            { day: 'Feb 9',  label: 'Open House',              type: 'event' },
            { day: 'Feb 23', label: 'Science Fair',            type: 'event' },
          ],
        },
        {
          month: 'March 2026',
          items: [
            { day: 'Mar 6',  label: 'Spring Break Begins',     type: 'break' },
            { day: 'Mar 22', label: 'Term 3 Begins',           type: 'break' },
          ],
        },
        {
          month: 'April 2026',
          items: [
            { day: 'Apr 13', label: 'Art Exhibition',          type: 'event' },
            { day: 'Apr 20', label: 'STAR 360 Assessment – Round 2', type: 'assessment' },
          ],
        },
        {
          month: 'May 2026',
          items: [
            { day: 'May 11', label: 'Sports Day',              type: 'event' },
            { day: 'May',    label: 'Ramadan Period Activities', type: 'event' },
          ],
        },
        {
          month: 'June 2026',
          items: [
            { day: 'Jun 1',  label: 'Graduation Ceremony',     type: 'event' },
            { day: 'Jun 11', label: 'Last Day of School',      type: 'event' },
          ],
        },
      ],
    },
    cta: {
      title: 'Ready to Be Part of Our School Year?',
      subtitle: 'Join the Al Fajer family and experience a world-class bilingual education in Bahrain.',
      btn1: 'Apply for Admission',
      btn2: 'Contact Us',
    },
  },
  ar: {
    hero: {
      tag: 'التقويم الدراسي',
      title: 'العام الدراسي',
      titleAccent: '2025 – 2026',
      subtitle: 'ابقَ منظماً مع جميع مواعيد الفصول والإجازات الرسمية والفعاليات المدرسية الرئيسية للعام الدراسي في مدرسة الفجر الخاصة.',
    },
    legend: {
      title: 'دليل الألوان',
      terms: 'الفصول والإجازات',
      holidays: 'العطل الرسمية',
      events: 'الفعاليات المدرسية',
      assessments: 'التقييمات',
    },
    calSection: {
      tag: 'مواعيد الفصول',
      title: 'نظرة عامة على التقويم الدراسي',
    },
    terms: [
      { label: 'الفصل الأول',          dates: '1 سبتمبر – 27 نوفمبر 2025',   type: 'term' },
      { label: 'إجازة الفصل الأول',    dates: '28 نوفمبر – 5 ديسمبر 2025',   type: 'break' },
      { label: 'الفصل الثاني',         dates: '7 ديسمبر 2025 – 5 مارس 2026', type: 'term' },
      { label: 'إجازة الفصل الثاني',   dates: '6 – 20 مارس 2026',            type: 'break' },
      { label: 'الفصل الثالث',         dates: '22 مارس – 11 يونيو 2026',     type: 'term' },
      { label: 'الإجازة الصيفية',      dates: 'يونيو 12 – أغسطس 2026',       type: 'break' },
    ],
    holidays: {
      tag: 'العطل الرسمية',
      title: 'الأعياد البحرينية والإسلامية',
      items: [
        { name: 'المولد النبوي الشريف',   date: '4 سبتمبر 2025 (تقريبي)',      icon: Star },
        { name: 'رأس السنة الهجرية',      date: '26 يونيو 2025 (تقريبي)',      icon: Calendar },
        { name: 'اليوم الوطني البحريني',  date: '16 – 17 ديسمبر 2025',        icon: Flag },
        { name: 'رأس السنة الميلادية',    date: '1 يناير 2026',               icon: Sun },
        { name: 'عيد الفطر المبارك',      date: '30 مارس – 2 أبريل 2026 (تقريبي)', icon: Star },
        { name: 'عيد الأضحى المبارك',     date: '6 – 9 يونيو 2026 (تقريبي)', icon: Star },
      ],
    },
    events: {
      tag: 'الفعاليات المدرسية',
      title: 'جدول الفعاليات الرئيسية',
      months: [
        {
          month: 'سبتمبر 2025',
          items: [
            { day: '1 سبتمبر',  label: 'أول يوم دراسي',              type: 'event' },
            { day: '15 سبتمبر', label: 'ليلة الترحيب بالأولياء',     type: 'event' },
          ],
        },
        {
          month: 'أكتوبر 2025',
          items: [
            { day: '5 أكتوبر',  label: 'يوم التنوع الثقافي',         type: 'event' },
            { day: '20 أكتوبر', label: 'التحضير ليوم الرياضة',       type: 'event' },
          ],
        },
        {
          month: 'نوفمبر 2025',
          items: [
            { day: '10 نوفمبر', label: 'اجتماعات أولياء الأمور والمعلمين', type: 'event' },
            { day: '17 نوفمبر', label: 'تقييم STAR 360',              type: 'assessment' },
            { day: '28 نوفمبر', label: 'بداية إجازة الشتاء',          type: 'break' },
          ],
        },
        {
          month: 'ديسمبر 2025',
          items: [
            { day: '7 ديسمبر',  label: 'بداية الفصل الثاني',         type: 'break' },
            { day: '16 ديسمبر', label: 'احتفال اليوم الوطني',        type: 'event' },
          ],
        },
        {
          month: 'يناير 2026',
          items: [
            { day: 'يناير',     label: 'توزيع التقارير النصفية',     type: 'assessment' },
          ],
        },
        {
          month: 'فبراير 2026',
          items: [
            { day: '9 فبراير',  label: 'اليوم المفتوح',              type: 'event' },
            { day: '23 فبراير', label: 'معرض العلوم',                type: 'event' },
          ],
        },
        {
          month: 'مارس 2026',
          items: [
            { day: '6 مارس',    label: 'بداية إجازة الربيع',         type: 'break' },
            { day: '22 مارس',   label: 'بداية الفصل الثالث',        type: 'break' },
          ],
        },
        {
          month: 'أبريل 2026',
          items: [
            { day: '13 أبريل',  label: 'معرض الفنون',               type: 'event' },
            { day: '20 أبريل',  label: 'تقييم STAR 360 – الجولة 2', type: 'assessment' },
          ],
        },
        {
          month: 'مايو 2026',
          items: [
            { day: '11 مايو',   label: 'يوم الرياضة',               type: 'event' },
            { day: 'مايو',      label: 'أنشطة شهر رمضان',           type: 'event' },
          ],
        },
        {
          month: 'يونيو 2026',
          items: [
            { day: '1 يونيو',   label: 'حفل التخرج',                type: 'event' },
            { day: '11 يونيو',  label: 'آخر يوم دراسي',             type: 'event' },
          ],
        },
      ],
    },
    cta: {
      title: 'هل أنت مستعد لتكون جزءاً من عامنا الدراسي؟',
      subtitle: 'انضم إلى عائلة الفجر واستمتع بتعليم ثنائي اللغة عالمي المستوى في البحرين.',
      btn1: 'تقدم بطلب القبول',
      btn2: 'تواصل معنا',
    },
  },
}

/* ─────────────────────────── helpers ─────────────────────────── */
type EventType = 'term' | 'break' | 'event' | 'assessment'

const typeStyles: Record<EventType, { dot: string; badge: string; text: string }> = {
  term:       { dot: 'bg-blue-500',   badge: 'bg-blue-50 border-blue-200 text-blue-700',   text: 'text-blue-600' },
  break:      { dot: 'bg-amber-400',  badge: 'bg-amber-50 border-amber-200 text-amber-700', text: 'text-amber-600' },
  event:      { dot: 'bg-violet-500', badge: 'bg-violet-50 border-violet-200 text-violet-700', text: 'text-violet-600' },
  assessment: { dot: 'bg-rose-500',   badge: 'bg-rose-50 border-rose-200 text-rose-700',   text: 'text-rose-600' },
}

const termCardStyle = (type: 'term' | 'break') =>
  type === 'term'
    ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50'
    : 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50'

const termIconStyle = (type: 'term' | 'break') =>
  type === 'term'
    ? 'bg-blue-500 text-white'
    : 'bg-amber-400 text-white'

/* ─────────────────────────── component ─────────────────────────── */
export default function CalendarPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const isRTL = lang === 'ar'
  const c = t[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight
  useScrollReveal()

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen">
      <Header lang={lang} onLangChange={setLang} />
      <main>

        {/* ── Hero ── */}
        <section className="mesh-bg noise relative overflow-hidden py-28 lg:py-36">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-float-slow absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-blue/20 blur-[110px]" />
            <div className="animate-pulse-glow absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-500/15 blur-[100px]" />
            <div className="absolute inset-0 dot-pattern opacity-25" />
          </div>
          <div className="container-custom relative z-10">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('flex mb-5 animate-bounce-in', isRTL && 'justify-end')}>
                <span className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 text-white/65 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                  <Calendar size={11} className="text-brand-gold" />
                  {c.hero.tag}
                </span>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/92 animate-slide-up" style={{ animationDelay: '100ms' }}>
                  {c.hero.title}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-gradient-gold animate-slide-up" style={{ animationDelay: '250ms' }}>
                  {c.hero.titleAccent}
                </span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '400ms' }}>
                {c.hero.subtitle}
              </p>

              {/* Legend inside hero */}
              <div className="mt-8 animate-fade-in" style={{ animationDelay: '550ms' }}>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-semibold">{c.legend.title}</p>
                <div className={clsx('flex flex-wrap gap-3', isRTL && 'justify-end')}>
                  {[
                    { color: 'bg-blue-400',   label: c.legend.terms },
                    { color: 'bg-amber-400',  label: c.legend.holidays },
                    { color: 'bg-violet-400', label: c.legend.events },
                    { color: 'bg-rose-400',   label: c.legend.assessments },
                  ].map(({ color, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 bg-white/8 border border-white/15 rounded-full px-3 py-1.5 text-white/70 text-xs font-medium backdrop-blur-sm">
                      <span className={clsx('w-2 h-2 rounded-full', color)} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 70" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 70L1440 70L1440 25C1250 65 980 5 720 32C460 59 200 5 0 28L0 70Z" />
            </svg>
          </div>
        </section>

        {/* ── Academic Calendar Overview ── */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.calSection.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.calSection.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.terms.map((term, i) => (
                <div
                  key={term.label}
                  data-reveal="scale"
                  data-delay={String(i * 80)}
                  className={clsx(
                    'group relative rounded-3xl p-6 border-2 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] overflow-hidden cursor-default',
                    termCardStyle(term.type as 'term' | 'break'),
                    isRTL && 'text-right'
                  )}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/40 blur-2xl pointer-events-none" />
                  <div className={clsx('w-10 h-10 rounded-2xl flex items-center justify-center mb-4 shadow-sm', termIconStyle(term.type as 'term' | 'break'))}>
                    {term.type === 'term' ? <BookOpen size={16} /> : <Sun size={16} />}
                  </div>
                  <h3 className={clsx('font-bold text-neutral-900 text-base mb-2', !isRTL && 'font-playfair')}>{term.label}</h3>
                  <p className={clsx('text-sm font-semibold', term.type === 'term' ? 'text-blue-600' : 'text-amber-600')}>{term.dates}</p>
                  <div className={clsx('absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-400 opacity-0 group-hover:opacity-100', term.type === 'term' ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 'bg-gradient-to-r from-amber-400 to-orange-400')} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Public Holidays ── */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.holidays.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.holidays.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.holidays.items.map(({ name, date, icon: Icon }, i) => (
                <div
                  key={name}
                  data-reveal
                  data-delay={String(i * 80)}
                  className={clsx(
                    'group flex items-start gap-4 rounded-2xl p-5 bg-white border border-amber-100 hover:border-amber-300 hover:shadow-[0_12px_40px_rgba(251,191,36,0.12)] transition-all duration-400 hover:-translate-y-1',
                    isRTL && 'flex-row-reverse text-right'
                  )}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-200 flex items-center justify-center group-hover:bg-amber-400 group-hover:border-amber-400 transition-all duration-300">
                    <Icon size={16} className="text-amber-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-sm mb-1">{name}</p>
                    <p className="text-amber-600 text-xs font-semibold">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Key Events Timeline ── */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.events.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.events.title}</h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className={clsx('hidden lg:block absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue/20 via-violet-300/40 to-brand-blue/10 pointer-events-none', isRTL ? 'right-1/2' : 'left-1/2')} />

              <div className="space-y-8">
                {c.events.months.map((monthBlock, mi) => (
                  <div
                    key={monthBlock.month}
                    data-reveal
                    data-delay={String(mi * 60)}
                    className={clsx('relative grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8', isRTL ? 'text-right' : '')}
                  >
                    {/* Month label — alternating sides on large screens */}
                    <div className={clsx(
                      'lg:flex items-center',
                      mi % 2 === 0 ? 'lg:col-start-1 lg:justify-end' : 'lg:col-start-2 lg:justify-start lg:row-start-1',
                    )}>
                      <div className={clsx(
                        'inline-flex items-center gap-2 rounded-2xl px-5 py-3 border bg-gradient-to-r font-bold text-sm shadow-sm',
                        'from-brand-blue/5 to-indigo-50 border-brand-blue/15 text-brand-blue',
                        mi % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8',
                      )}>
                        <Calendar size={14} />
                        {monthBlock.month}
                      </div>
                    </div>

                    {/* Events */}
                    <div className={clsx(
                      'flex flex-col gap-2',
                      mi % 2 === 0 ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-1',
                    )}>
                      {monthBlock.items.map((item) => {
                        const styles = typeStyles[item.type as EventType]
                        return (
                          <div
                            key={item.label}
                            className={clsx(
                              'inline-flex items-center gap-3 rounded-xl px-4 py-3 border text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm cursor-default',
                              styles.badge,
                              isRTL && 'flex-row-reverse'
                            )}
                          >
                            <span className={clsx('shrink-0 w-2 h-2 rounded-full', styles.dot)} />
                            <span className="font-bold">{item.day}</span>
                            <span className="text-neutral-600">{item.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mesh-bg noise relative overflow-hidden py-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-pulse-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/18 blur-[100px] rounded-full" />
            <div className="absolute inset-0 dot-pattern opacity-18" />
          </div>
          <div className="container-custom relative z-10 text-center" data-reveal="scale">
            <h2 className={clsx('text-3xl md:text-4xl font-bold text-white mb-4', !isRTL && 'font-playfair')}>{c.cta.title}</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">{c.cta.subtitle}</p>
            <div className={clsx('flex flex-wrap gap-4 justify-center', isRTL && 'flex-row-reverse')}>
              <Link href="/admissions" className="shimmer-btn ripple-btn inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-neutral-900 font-bold rounded-2xl text-sm hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-300 hover:-translate-y-1">
                {c.cta.btn1} <Arr size={16} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white font-semibold rounded-2xl text-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                {c.cta.btn2}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
