'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import { ArrowRight, ArrowLeft, Calendar, Sun, Star, BookOpen, Flag } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Academic Calendar', title: 'School Year 2025 – 2026', subtitle: 'Stay organised with all term dates, public holidays, and key school events for the Al Fajer Private School academic year.' },
    legend: { title: 'Category Legend', terms: 'Terms & Breaks', holidays: 'Public Holidays', events: 'School Events', assessments: 'Assessments' },
    calSection: { tag: 'Term Dates', title: 'Academic Calendar Overview' },
    terms: [
      { label: 'Term 1', dates: 'Sep 1 – Nov 27, 2025', type: 'term' },
      { label: 'Term 1 Break', dates: 'Nov 28 – Dec 5, 2025', type: 'break' },
      { label: 'Term 2', dates: 'Dec 7, 2025 – Mar 5, 2026', type: 'term' },
      { label: 'Term 2 Break', dates: 'Mar 6 – Mar 20, 2026', type: 'break' },
      { label: 'Term 3', dates: 'Mar 22 – Jun 11, 2026', type: 'term' },
      { label: 'Summer Break', dates: 'Jun 12 – Aug 2026', type: 'break' },
    ],
    holidays: {
      tag: 'Public Holidays', title: 'Bahrain & Islamic Holidays',
      items: [
        { name: "Prophet's Birthday", date: 'Sep 4, 2025 (approx)', icon: Star },
        { name: 'Islamic New Year', date: 'Jun 26, 2025 (approx)', icon: Calendar },
        { name: 'Bahrain National Day', date: 'Dec 16 – 17, 2025', icon: Flag },
        { name: "New Year's Day", date: 'Jan 1, 2026', icon: Sun },
        { name: 'Eid Al Fitr', date: 'Mar 30 – Apr 2, 2026 (approx)', icon: Star },
        { name: 'Eid Al Adha', date: 'Jun 6 – 9, 2026 (approx)', icon: Star },
      ],
    },
    events: {
      tag: 'School Events', title: 'Key Events Timeline',
      months: [
        { month: 'September 2025', items: [{ day: 'Sep 1', label: 'First Day of School', type: 'event' }, { day: 'Sep 15', label: 'Parent Welcome Night', type: 'event' }] },
        { month: 'October 2025', items: [{ day: 'Oct 5', label: 'Cultural Day', type: 'event' }, { day: 'Oct 20', label: 'Sports Day Prep', type: 'event' }] },
        { month: 'November 2025', items: [{ day: 'Nov 10', label: 'Parent-Teacher Meetings', type: 'event' }, { day: 'Nov 17', label: 'STAR 360 Assessment', type: 'assessment' }, { day: 'Nov 28', label: 'Winter Break Begins', type: 'break' }] },
        { month: 'December 2025', items: [{ day: 'Dec 7', label: 'Term 2 Begins', type: 'break' }, { day: 'Dec 16', label: 'National Day Celebration', type: 'event' }] },
        { month: 'January 2026', items: [{ day: 'Jan', label: 'Mid-Year Reports Distributed', type: 'assessment' }] },
        { month: 'February 2026', items: [{ day: 'Feb 9', label: 'Open House', type: 'event' }, { day: 'Feb 23', label: 'Science Fair', type: 'event' }] },
        { month: 'March 2026', items: [{ day: 'Mar 6', label: 'Spring Break Begins', type: 'break' }, { day: 'Mar 22', label: 'Term 3 Begins', type: 'break' }] },
        { month: 'April 2026', items: [{ day: 'Apr 13', label: 'Art Exhibition', type: 'event' }, { day: 'Apr 20', label: 'STAR 360 Assessment – Round 2', type: 'assessment' }] },
        { month: 'May 2026', items: [{ day: 'May 11', label: 'Sports Day', type: 'event' }, { day: 'May', label: 'Ramadan Period Activities', type: 'event' }] },
        { month: 'June 2026', items: [{ day: 'Jun 1', label: 'Graduation Ceremony', type: 'event' }, { day: 'Jun 11', label: 'Last Day of School', type: 'event' }] },
      ],
    },
    cta: { title: 'Ready to Be Part of Our School Year?', subtitle: 'Join the Al Fajer family and experience a world-class bilingual education in Bahrain.', btn1: 'Apply for Admission', btn2: 'Contact Us' },
  },
  ar: {
    hero: { tag: 'التقويم الدراسي', title: 'العام الدراسي 2025 – 2026', subtitle: 'ابقَ منظماً مع جميع مواعيد الفصول والإجازات الرسمية والفعاليات المدرسية الرئيسية للعام الدراسي في مدرسة الفجر الخاصة.' },
    legend: { title: 'دليل الفئات', terms: 'الفصول والإجازات', holidays: 'العطل الرسمية', events: 'الفعاليات المدرسية', assessments: 'التقييمات' },
    calSection: { tag: 'مواعيد الفصول', title: 'نظرة عامة على التقويم الدراسي' },
    terms: [
      { label: 'الفصل الأول', dates: '1 سبتمبر – 27 نوفمبر 2025', type: 'term' },
      { label: 'إجازة الفصل الأول', dates: '28 نوفمبر – 5 ديسمبر 2025', type: 'break' },
      { label: 'الفصل الثاني', dates: '7 ديسمبر 2025 – 5 مارس 2026', type: 'term' },
      { label: 'إجازة الفصل الثاني', dates: '6 – 20 مارس 2026', type: 'break' },
      { label: 'الفصل الثالث', dates: '22 مارس – 11 يونيو 2026', type: 'term' },
      { label: 'الإجازة الصيفية', dates: 'يونيو 12 – أغسطس 2026', type: 'break' },
    ],
    holidays: {
      tag: 'العطل الرسمية', title: 'الأعياد البحرينية والإسلامية',
      items: [
        { name: 'المولد النبوي الشريف', date: '4 سبتمبر 2025 (تقريبي)', icon: Star },
        { name: 'رأس السنة الهجرية', date: '26 يونيو 2025 (تقريبي)', icon: Calendar },
        { name: 'اليوم الوطني البحريني', date: '16 – 17 ديسمبر 2025', icon: Flag },
        { name: 'رأس السنة الميلادية', date: '1 يناير 2026', icon: Sun },
        { name: 'عيد الفطر المبارك', date: '30 مارس – 2 أبريل 2026 (تقريبي)', icon: Star },
        { name: 'عيد الأضحى المبارك', date: '6 – 9 يونيو 2026 (تقريبي)', icon: Star },
      ],
    },
    events: {
      tag: 'الفعاليات المدرسية', title: 'جدول الفعاليات الرئيسية',
      months: [
        { month: 'سبتمبر 2025', items: [{ day: '1 سبتمبر', label: 'أول يوم دراسي', type: 'event' }, { day: '15 سبتمبر', label: 'ليلة الترحيب بالأولياء', type: 'event' }] },
        { month: 'أكتوبر 2025', items: [{ day: '5 أكتوبر', label: 'يوم التنوع الثقافي', type: 'event' }, { day: '20 أكتوبر', label: 'التحضير ليوم الرياضة', type: 'event' }] },
        { month: 'نوفمبر 2025', items: [{ day: '10 نوفمبر', label: 'اجتماعات أولياء الأمور والمعلمين', type: 'event' }, { day: '17 نوفمبر', label: 'تقييم STAR 360', type: 'assessment' }, { day: '28 نوفمبر', label: 'بداية إجازة الشتاء', type: 'break' }] },
        { month: 'ديسمبر 2025', items: [{ day: '7 ديسمبر', label: 'بداية الفصل الثاني', type: 'break' }, { day: '16 ديسمبر', label: 'احتفال اليوم الوطني', type: 'event' }] },
        { month: 'يناير 2026', items: [{ day: 'يناير', label: 'توزيع التقارير النصفية', type: 'assessment' }] },
        { month: 'فبراير 2026', items: [{ day: '9 فبراير', label: 'اليوم المفتوح', type: 'event' }, { day: '23 فبراير', label: 'معرض العلوم', type: 'event' }] },
        { month: 'مارس 2026', items: [{ day: '6 مارس', label: 'بداية إجازة الربيع', type: 'break' }, { day: '22 مارس', label: 'بداية الفصل الثالث', type: 'break' }] },
        { month: 'أبريل 2026', items: [{ day: '13 أبريل', label: 'معرض الفنون', type: 'event' }, { day: '20 أبريل', label: 'تقييم STAR 360 – الجولة 2', type: 'assessment' }] },
        { month: 'مايو 2026', items: [{ day: '11 مايو', label: 'يوم الرياضة', type: 'event' }, { day: 'مايو', label: 'أنشطة شهر رمضان', type: 'event' }] },
        { month: 'يونيو 2026', items: [{ day: '1 يونيو', label: 'حفل التخرج', type: 'event' }, { day: '11 يونيو', label: 'آخر يوم دراسي', type: 'event' }] },
      ],
    },
    cta: { title: 'هل أنت مستعد لتكون جزءاً من عامنا الدراسي؟', subtitle: 'انضم إلى عائلة الفجر واستمتع بتعليم ثنائي اللغة عالمي المستوى في البحرين.', btn1: 'تقدم بطلب القبول', btn2: 'تواصل معنا' },
  },
}

type EventType = 'term' | 'break' | 'event' | 'assessment'

const typeStyles: Record<EventType, { dot: string; badge: string }> = {
  term: { dot: 'bg-brand-500', badge: 'bg-brand-50 border-brand-100 text-brand-700' },
  break: { dot: 'bg-accent-500', badge: 'bg-accent-100 border-accent-200 text-accent-700' },
  event: { dot: 'bg-teal-500', badge: 'bg-teal-50 border-teal-100 text-teal-700' },
  assessment: { dot: 'bg-rose-500', badge: 'bg-rose-50 border-rose-100 text-rose-700' },
}

const legendDots = ['bg-brand-500', 'bg-accent-500', 'bg-teal-500', 'bg-rose-500']

export default function CalendarPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const isRTL = lang === 'ar'
  const c = t[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight
  useScrollReveal()

  const legendItems = [c.legend.terms, c.legend.holidays, c.legend.events, c.legend.assessments]

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} isRTL={isRTL} align="left">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/45">{c.legend.title}</p>
            <div className={clsx('flex flex-wrap gap-2.5', isRTL && 'justify-end')}>
              {legendItems.map((label, i) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75">
                  <span className={clsx('h-2 w-2 rounded-full', legendDots[i])} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </PageHero>

        {/* Term dates */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.calSection.tag} title={c.calSection.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.terms.map((term, i) => {
                const isTerm = term.type === 'term'
                return (
                  <div key={term.label} data-reveal="scale" data-delay={String(i * 70)} className={clsx('card card-hover border-t-4 p-6', isTerm ? 'border-t-brand-500' : 'border-t-accent-500', isRTL && 'text-right')}>
                    <span className={clsx('grid h-10 w-10 place-items-center rounded-xl text-white', isTerm ? 'bg-brand-600' : 'bg-accent-500')}>
                      {isTerm ? <BookOpen size={16} /> : <Sun size={16} />}
                    </span>
                    <h3 className="mb-2 mt-4 font-display text-base font-bold text-ink">{term.label}</h3>
                    <p className={clsx('text-sm font-semibold', isTerm ? 'text-brand-600' : 'text-accent-700')}>{term.dates}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Public holidays */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.holidays.tag} title={c.holidays.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.holidays.items.map(({ name, date, icon: Icon }, i) => (
                <div key={name} data-reveal data-delay={String((i % 3) * 80)} className={clsx('card card-hover flex items-start gap-4 p-5', isRTL && 'flex-row-reverse text-right')}>
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-accent-100 text-accent-600">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="mb-1 text-sm font-bold text-ink">{name}</p>
                    <p className="text-xs font-semibold text-accent-700">{date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events timeline */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.events.tag} title={c.events.title} isRTL={isRTL} />
            </div>
            <div className="relative">
              <div className={clsx('pointer-events-none absolute bottom-0 top-0 hidden w-px bg-line lg:block', isRTL ? 'right-1/2' : 'left-1/2')} />
              <div className="space-y-8">
                {c.events.months.map((monthBlock, mi) => (
                  <div key={monthBlock.month} data-reveal data-delay={String(mi * 50)} className={clsx('relative grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8', isRTL && 'text-right')}>
                    <div className={clsx('items-center lg:flex', mi % 2 === 0 ? 'lg:col-start-1 lg:justify-end' : 'lg:col-start-2 lg:row-start-1 lg:justify-start')}>
                      <div className={clsx('inline-flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50 px-5 py-3 text-sm font-bold text-brand-700', mi % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8')}>
                        <Calendar size={14} />{monthBlock.month}
                      </div>
                    </div>
                    <div className={clsx('flex flex-col gap-2', mi % 2 === 0 ? 'lg:col-start-2 lg:row-start-1' : 'lg:col-start-1')}>
                      {monthBlock.items.map((item) => {
                        const styles = typeStyles[item.type as EventType]
                        return (
                          <div key={item.label} className={clsx('inline-flex items-center gap-3 rounded-xl border px-4 py-3 text-sm', styles.badge, isRTL && 'flex-row-reverse')}>
                            <span className={clsx('h-2 w-2 flex-shrink-0 rounded-full', styles.dot)} />
                            <span className="font-bold">{item.day}</span>
                            <span className="text-ink/70">{item.label}</span>
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

        {/* CTA */}
        <section className="dawn-hero relative overflow-hidden py-20 text-white">
          <div className="absolute inset-0 grid-faint opacity-40 pointer-events-none" />
          <div data-reveal="scale" className="container-custom relative text-center">
            <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">{c.cta.title}</h2>
            <p className="mx-auto mb-8 max-w-xl text-white/70">{c.cta.subtitle}</p>
            <div className={clsx('flex flex-wrap justify-center gap-4', isRTL && 'flex-row-reverse')}>
              <Link href="/admissions" className="btn-secondary px-8 py-4">{c.cta.btn1} <Arr size={16} /></Link>
              <Link href="/contact" className="btn-ghost px-8 py-4">{c.cta.btn2}</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
