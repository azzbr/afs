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

const typeStyles: Record<EventType, { dot: string; rowStyle: string; dayColor: string }> = {
  term:       { dot: 'bg-[var(--brand-navy)]',  rowStyle: 'border-[var(--border)] bg-white',                          dayColor: 'text-[var(--brand-navy)]' },
  break:      { dot: 'bg-[var(--brand-gold)]',  rowStyle: 'border-[var(--border)] bg-white',                          dayColor: 'text-[var(--brand-gold)]' },
  event:      { dot: 'bg-[var(--brand-navy)]',  rowStyle: 'border-[var(--border)] bg-white',                          dayColor: 'text-[var(--brand-navy)]' },
  assessment: { dot: 'bg-neutral-400',           rowStyle: 'border-[var(--border)] bg-white',                          dayColor: 'text-neutral-500' },
}

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
        <section className="hero-dark relative overflow-hidden py-28 lg:py-36">
          <div className="container-custom relative z-10">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('mb-5', isRTL && 'flex justify-end')}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>
                  {c.hero.tag}
                </div>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/92">
                  {c.hero.title}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[var(--brand-gold)]">
                  {c.hero.titleAccent}
                </span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed">
                {c.hero.subtitle}
              </p>

              {/* Legend inside hero */}
              <div className="mt-8">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-semibold">{c.legend.title}</p>
                <div className={clsx('flex flex-wrap gap-3', isRTL && 'justify-end')}>
                  {[
                    { color: 'bg-[var(--brand-navy)]', label: c.legend.terms },
                    { color: 'bg-[var(--brand-gold)]',  label: c.legend.holidays },
                    { color: 'bg-[var(--brand-navy)]',  label: c.legend.events },
                    { color: 'bg-neutral-400',           label: c.legend.assessments },
                  ].map(({ color, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 bg-white/8 border border-white/15 rounded-full px-3 py-1.5 text-white/70 text-xs font-medium">
                      <span className={clsx('w-2 h-2 rounded-full', color)} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Academic Calendar Overview ── */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('section-tag mx-auto', isRTL && 'flex-row-reverse')}>{c.calSection.tag}</div>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.calSection.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.terms.map((term, i) => (
                <div
                  key={term.label}
                  data-reveal="scale"
                  data-delay={String(i * 80)}
                  className={clsx(
                    'rounded-2xl p-6 border border-[var(--border)] bg-[var(--cream)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 cursor-default',
                    isRTL && 'text-right'
                  )}
                >
                  <div className={clsx(
                    'w-10 h-10 rounded-lg flex items-center justify-center mb-4',
                    term.type === 'term' ? 'bg-[var(--brand-navy)]' : 'bg-[var(--brand-gold)]'
                  )}>
                    {term.type === 'term'
                      ? <BookOpen size={16} className="text-white" />
                      : <Sun size={16} className="text-white" />
                    }
                  </div>
                  <h3 className={clsx('font-bold text-[var(--ink)] text-base mb-2', !isRTL && 'font-playfair')}>{term.label}</h3>
                  <p className={clsx('text-sm font-semibold', term.type === 'term' ? 'text-[var(--brand-navy)]' : 'text-[var(--brand-gold)]')}>{term.dates}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Public Holidays ── */}
        <section className="section-padding bg-[var(--cream)]">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className={clsx('section-tag mx-auto', isRTL && 'flex-row-reverse')}>{c.holidays.tag}</div>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.holidays.title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.holidays.items.map(({ name, date, icon: Icon }, i) => (
                <div
                  key={name}
                  data-reveal
                  data-delay={String(i * 80)}
                  className={clsx(
                    'flex items-start gap-4 rounded-2xl p-5 bg-white border border-[var(--border)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300',
                    isRTL && 'flex-row-reverse text-right'
                  )}
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[var(--brand-navy)] flex items-center justify-center">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[var(--ink)] text-sm mb-1">{name}</p>
                    <p className="text-[var(--brand-gold)] text-xs font-semibold">{date}</p>
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
              <div className={clsx('section-tag mx-auto', isRTL && 'flex-row-reverse')}>{c.events.tag}</div>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.events.title}</h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className={clsx('hidden lg:block absolute top-0 bottom-0 w-px bg-[var(--border)] pointer-events-none', isRTL ? 'right-1/2' : 'left-1/2')} />

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
                        'inline-flex items-center gap-2 rounded-xl px-5 py-3 border border-[var(--border)] bg-[var(--cream)] font-bold text-sm',
                        'text-[var(--brand-navy)]',
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
                              'flex items-center gap-3 rounded-xl px-4 py-3 border text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm cursor-default border-l-4 border-[var(--brand-gold)] bg-white border-[var(--border)]',
                              isRTL && 'flex-row-reverse border-l-0 border-r-4'
                            )}
                          >
                            <span className={clsx('shrink-0 w-2 h-2 rounded-full', styles.dot)} />
                            <span className={clsx('font-bold', styles.dayColor)}>{item.day}</span>
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
        <section className="hero-dark relative overflow-hidden py-24">
          <div className="container-custom relative z-10 text-center" data-reveal="scale">
            <h2 className={clsx('text-3xl md:text-4xl font-bold text-white mb-4', !isRTL && 'font-playfair')}>{c.cta.title}</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">{c.cta.subtitle}</p>
            <div className={clsx('flex flex-wrap gap-4 justify-center', isRTL && 'flex-row-reverse')}>
              <Link href="/admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--brand-gold)] text-white font-bold rounded-xl text-sm hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5">
                {c.cta.btn1} <Arr size={16} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white font-semibold rounded-xl text-sm hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5">
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
