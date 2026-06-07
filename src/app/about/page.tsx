'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import { ArrowRight, ArrowLeft, Star, Users, Heart, Globe, Award, BookOpen, GraduationCap, Trophy, Shield, Quote } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    let start: number | null = null
    const dur = 1600
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [started, target])
  return <span ref={ref} className="counter-num">{count}{suffix}</span>
}

const t = {
  en: {
    hero: {
      tag: 'About AFS',
      title: 'More Than a School — A Community',
      subtitle: 'Al Fajer Private School has been nurturing young minds in Barbar, Bahrain since 2013, building a legacy of academic excellence, character, and community.',
    },
    story: {
      tag: 'Our Story',
      title: 'From a Vision to a Legacy',
      body: "Al Fajer Private School (AFS) was founded with a clear vision: to create a learning environment where every child is seen, heard, and given the tools to succeed academically and personally. As a non-profit, coeducational institution licensed by the Bahrain Ministry of Education, we have grown from a small community school into one of Barbar's most trusted educational institutions.",
      body2: 'The name "Al Fajer" means "The Dawn" — a fitting metaphor for the beginning of every child\'s educational journey. We believe that education is the light that illuminates potential, and our role is to guide each student toward their own bright future.',
      pillars: [
        { icon: Star, label: 'Academic Excellence' },
        { icon: Users, label: 'Community Focus' },
        { icon: Heart, label: 'Caring Environment' },
        { icon: Globe, label: 'Global Perspective' },
      ],
    },
    mission: {
      tag: 'Mission & Vision',
      title: 'What We Stand For',
      mission: { label: 'Our Mission', text: 'To provide an exceptional bilingual education that empowers students to become compassionate, critical thinkers and confident global citizens — rooted in Bahraini values.' },
      vision: { label: 'Our Vision', text: 'To be the leading bilingual private school in Bahrain, recognized for academic excellence, innovation, and the holistic development of every student.' },
      values: { label: 'Our Values', items: ['Excellence', 'Integrity', 'Respect', 'Innovation', 'Community', 'Compassion'] },
    },
    principal: {
      tag: "Principal's Message",
      title: 'A Word from Our Principal',
      body: "Welcome to Al Fajer Private School — a place where every child's journey is celebrated and every family is embraced as part of our community. At AFS, we are committed to delivering an education that goes beyond textbooks. We nurture curiosity, build character, and inspire a love of learning that will carry our students throughout their lives. I invite you to explore what makes AFS truly special and to join our growing family.",
      name: 'The Principal',
      role: 'Al Fajer Private School',
    },
    facts: {
      tag: 'School Profile',
      title: 'Key Facts About AFS',
      items: [
        { label: 'Founded', value: '2013' },
        { label: 'Location', value: 'Barbar, Bahrain' },
        { label: 'Type', value: 'Non-Profit, Coed' },
        { label: 'Grades', value: 'KG1 – Grade 5' },
        { label: 'Languages', value: 'Arabic, English, French' },
        { label: 'Curriculum', value: 'American + MOE' },
        { label: 'Assessment', value: 'STAR 360' },
        { label: 'Licensed by', value: 'Bahrain MOE' },
      ],
    },
    cta: { title: 'Ready to Join the AFS Family?', subtitle: 'We welcome inquiries from families interested in enrolling their children.', btn1: 'Apply for Admission', btn2: 'Contact Us' },
  },
  ar: {
    hero: {
      tag: 'عن الفجر',
      title: 'أكثر من مدرسة — مجتمع متكامل',
      subtitle: 'ترعى مدرسة الفجر الخاصة العقول الشابة في بربر، البحرين منذ عام 2013، بناءً على إرث من التميز الأكاديمي والشخصية والمجتمع.',
    },
    story: {
      tag: 'قصتنا',
      title: 'من رؤية إلى إرث',
      body: 'تأسست مدرسة الفجر الخاصة برؤية واضحة: خلق بيئة تعليمية يُرى فيها كل طفل ويُسمع ويُمنح الأدوات اللازمة للنجاح أكاديمياً وشخصياً. بوصفها مؤسسة غير ربحية مختلطة مرخصة من وزارة التربية والتعليم البحرينية، نمت من مدرسة مجتمعية صغيرة إلى واحدة من أكثر المؤسسات التعليمية موثوقية في بربر.',
      body2: 'اسم "الفجر" يرمز إلى بداية رحلة كل طفل التعليمية. نؤمن بأن التعليم هو النور الذي يضيء الإمكانات.',
      pillars: [
        { icon: Star, label: 'التميز الأكاديمي' },
        { icon: Users, label: 'التركيز على المجتمع' },
        { icon: Heart, label: 'بيئة داعمة' },
        { icon: Globe, label: 'منظور عالمي' },
      ],
    },
    mission: {
      tag: 'الرسالة والرؤية',
      title: 'ما نؤمن به',
      mission: { label: 'رسالتنا', text: 'تقديم تعليم ثنائي اللغة استثنائي يمكّن الطلاب من أن يصبحوا مفكرين نقديين متعاطفين ومواطنين عالميين واثقين — متجذرين في القيم البحرينية.' },
      vision: { label: 'رؤيتنا', text: 'أن نكون المدرسة الخاصة ثنائية اللغة الرائدة في البحرين، معترفاً بها لتميزها الأكاديمي وابتكارها والتطوير الشامل لكل طالب.' },
      values: { label: 'قيمنا', items: ['التميز', 'النزاهة', 'الاحترام', 'الابتكار', 'المجتمع', 'التعاطف'] },
    },
    principal: {
      tag: 'رسالة المديرة',
      title: 'كلمة من مديرتنا',
      body: 'أهلاً بكم في مدرسة الفجر الخاصة — حيث تُحتفى برحلة كل طفل وتُحتضن كل أسرة كجزء من مجتمعنا. في الفجر، نلتزم بتقديم تعليم يتجاوز الكتب المدرسية. نغذي الفضول ونبني الشخصية ونلهم حب التعلم الذي سيرافق طلابنا طوال حياتهم.',
      name: 'المديرة',
      role: 'مدرسة الفجر الخاصة',
    },
    facts: {
      tag: 'ملف المدرسة',
      title: 'حقائق أساسية عن الفجر',
      items: [
        { label: 'سنة التأسيس', value: '2013' },
        { label: 'الموقع', value: 'بربر، البحرين' },
        { label: 'النوع', value: 'غير ربحية، مختلطة' },
        { label: 'الصفوف', value: 'KG1 – الصف 5' },
        { label: 'اللغات', value: 'العربية، الإنجليزية، الفرنسية' },
        { label: 'المنهج', value: 'أمريكي + وزاري' },
        { label: 'التقييم', value: 'STAR 360' },
        { label: 'مرخصة من', value: 'وزارة التربية' },
      ],
    },
    cta: { title: 'هل أنت مستعد للانضمام إلى عائلة الفجر؟', subtitle: 'نرحب باستفسارات الأسر المهتمة بتسجيل أطفالها.', btn1: 'تقدم بطلب القبول', btn2: 'تواصل معنا' },
  },
}

const statsData = {
  en: [
    { icon: Trophy, value: 12, suffix: '+', label: 'Years of Excellence' },
    { icon: GraduationCap, value: 500, suffix: '+', label: 'Graduates to Date' },
    { icon: Globe, value: 3, suffix: '', label: 'Languages Taught' },
    { icon: Shield, value: 100, suffix: '%', label: 'MOE Accredited' },
  ],
  ar: [
    { icon: Trophy, value: 12, suffix: '+', label: 'سنة من التميز' },
    { icon: GraduationCap, value: 500, suffix: '+', label: 'خريج حتى الآن' },
    { icon: Globe, value: 3, suffix: '', label: 'لغات تعليم' },
    { icon: Shield, value: 100, suffix: '%', label: 'اعتماد وزاري' },
  ],
}

export default function AboutPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const isRTL = lang === 'ar'
  const c = t[lang]
  const stats = statsData[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight
  useScrollReveal()

  const missionCards = [
    { label: c.mission.mission.label, text: c.mission.mission.text, icon: BookOpen },
    { label: c.mission.vision.label, text: c.mission.vision.text, icon: Star },
  ]

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} isRTL={isRTL} align="left" />

        {/* Stats */}
        <section className="bg-brand-700 py-14">
          <div className="container-custom">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((s, i) => (
                <div key={s.label} data-reveal data-delay={String(i * 100)} className="text-center">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-accent-400">
                    <s.icon size={20} />
                  </span>
                  <div className="mt-3 font-display text-4xl font-bold text-white">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section id="story" className="section-padding bg-canvas">
          <div className="container-custom">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
              <div data-reveal="left" className={clsx(isRTL && 'text-right')}>
                <SectionHeading tag={c.story.tag} title={c.story.title} align="left" isRTL={isRTL} className="mb-5" />
                <p className="mb-4 leading-relaxed text-muted">{c.story.body}</p>
                <p className="leading-relaxed text-muted">{c.story.body2}</p>
              </div>
              <div data-reveal="right" className="grid grid-cols-2 gap-4">
                {c.story.pillars.map(({ icon: Icon, label }, i) => (
                  <div
                    key={label}
                    data-reveal="scale"
                    data-delay={String(i * 80)}
                    className={clsx('card card-hover p-6 text-center', isRTL && 'text-right')}
                  >
                    <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon size={20} strokeWidth={1.9} />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-ink">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-14">
              <SectionHeading tag={c.mission.tag} title={c.mission.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {missionCards.map((card, i) => (
                <div key={card.label} data-reveal data-delay={String((i + 1) * 100)} className={clsx('card border-t-4 border-t-brand-600 p-8', isRTL && 'text-right')}>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <card.icon size={22} />
                  </span>
                  <h3 className="mb-3 mt-4 font-display text-lg font-semibold text-ink">{card.label}</h3>
                  <p className="text-sm leading-relaxed text-muted">{card.text}</p>
                </div>
              ))}
              <div data-reveal data-delay="300" className={clsx('card border-t-4 border-t-accent-500 p-8', isRTL && 'text-right')}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-100 text-accent-600">
                  <Award size={22} />
                </span>
                <h3 className="mb-4 mt-4 font-display text-lg font-semibold text-ink">{c.mission.values.label}</h3>
                <div className={clsx('flex flex-wrap gap-2', isRTL && 'justify-end')}>
                  {c.mission.values.items.map((v) => (
                    <span key={v} className="rounded-full border border-line bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principal's Message */}
        <section id="principal" className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-10">
              <SectionHeading tag={c.principal.tag} title={c.principal.title} isRTL={isRTL} />
            </div>
            <div data-reveal="scale" className={clsx('mx-auto max-w-3xl card border-t-4 border-t-accent-500 p-10', isRTL && 'text-right')}>
              <Quote size={36} className="text-brand-200" />
              <p className={clsx('mt-4 text-lg leading-relaxed text-ink/80', isRTL && 'text-right')}>{c.principal.body}</p>
              <div className={clsx('mt-8 flex items-center gap-4', isRTL && 'flex-row-reverse')}>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white">
                  <Users size={20} />
                </span>
                <div className={isRTL ? 'text-right' : ''}>
                  <div className="text-sm font-semibold text-ink">{c.principal.name}</div>
                  <div className="text-xs text-faint">{c.principal.role}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Facts */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.facts.tag} title={c.facts.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {c.facts.items.map(({ label, value }, i) => (
                <div key={label} data-reveal="scale" data-delay={String(i * 50)} className={clsx('card card-hover p-5', isRTL && 'text-right')}>
                  <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-faint">{label}</div>
                  <div className="text-sm font-bold text-ink">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="dawn-hero relative overflow-hidden py-20 text-white">
          <div className="absolute inset-0 grid-faint opacity-40 pointer-events-none" />
          <div data-reveal="scale" className="container-custom relative text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">{c.cta.title}</h2>
            <p className="mx-auto mb-8 mt-4 max-w-xl text-white/70">{c.cta.subtitle}</p>
            <div className={clsx('flex flex-wrap justify-center gap-4', isRTL && 'flex-row-reverse')}>
              <Link href="/admissions" className="btn-secondary px-8 py-4">
                {c.cta.btn1} <Arr size={16} />
              </Link>
              <Link href="/contact" className="btn-ghost px-8 py-4">
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
