'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowRight, ArrowLeft, Star, Users, Heart, Globe, Award, BookOpen, Sparkles, GraduationCap, Trophy, Zap } from 'lucide-react'
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
    const dur = 1800
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
  return <span ref={ref}>{count}{suffix}</span>
}

const t = {
  en: {
    hero: {
      tag: 'About AFS',
      title: 'More Than a School —',
      titleAccent: 'A Community',
      subtitle: 'Al Fajer Private School has been nurturing young minds in Barbar, Bahrain since 2013, building a legacy of academic excellence, character, and community.',
    },
    story: {
      tag: 'Our Story',
      title: 'From a Vision to a Legacy',
      body: "Al Fajer Private School (AFS) was founded with a clear vision: to create a learning environment where every child is seen, heard, and given the tools to succeed academically and personally. As a non-profit, coeducational institution licensed by the Bahrain Ministry of Education, we have grown from a small community school into one of Barbar's most trusted educational institutions.",
      body2: 'The name "Al Fajer" means "The Dawn" — a fitting metaphor for the beginning of every child\'s educational journey. We believe that education is the light that illuminates potential, and our role is to guide each student toward their own bright future.',
      pillars: [
        { icon: Star, label: 'Academic Excellence', grad: 'from-brand-blue to-blue-700' },
        { icon: Users, label: 'Community Focus', grad: 'from-amber-400 to-orange-500' },
        { icon: Heart, label: 'Caring Environment', grad: 'from-rose-400 to-pink-600' },
        { icon: Globe, label: 'Global Perspective', grad: 'from-emerald-400 to-teal-600' },
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
      title: 'أكثر من مدرسة —',
      titleAccent: 'مجتمع متكامل',
      subtitle: 'ترعى مدرسة الفجر الخاصة العقول الشابة في بربر، البحرين منذ عام 2013، بناءً على إرث من التميز الأكاديمي والشخصية والمجتمع.',
    },
    story: {
      tag: 'قصتنا',
      title: 'من رؤية إلى إرث',
      body: 'تأسست مدرسة الفجر الخاصة برؤية واضحة: خلق بيئة تعليمية يُرى فيها كل طفل ويُسمع ويُمنح الأدوات اللازمة للنجاح أكاديمياً وشخصياً. بوصفها مؤسسة غير ربحية مختلطة مرخصة من وزارة التربية والتعليم البحرينية، نمت من مدرسة مجتمعية صغيرة إلى واحدة من أكثر المؤسسات التعليمية موثوقية في بربر.',
      body2: 'اسم "الفجر" يرمز إلى بداية رحلة كل طفل التعليمية. نؤمن بأن التعليم هو النور الذي يضيء الإمكانات.',
      pillars: [
        { icon: Star, label: 'التميز الأكاديمي', grad: 'from-brand-blue to-blue-700' },
        { icon: Users, label: 'التركيز على المجتمع', grad: 'from-amber-400 to-orange-500' },
        { icon: Heart, label: 'بيئة داعمة', grad: 'from-rose-400 to-pink-600' },
        { icon: Globe, label: 'منظور عالمي', grad: 'from-emerald-400 to-teal-600' },
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
    { icon: Trophy,        value: 12,  suffix: '+', label: 'Years of Excellence' },
    { icon: GraduationCap, value: 500, suffix: '+', label: 'Graduates to Date' },
    { icon: Globe,         value: 3,   suffix: '',  label: 'Languages Taught' },
    { icon: Zap,           value: 100, suffix: '%', label: 'MOE Accredited' },
  ],
  ar: [
    { icon: Trophy,        value: 12,  suffix: '+', label: 'سنة من التميز' },
    { icon: GraduationCap, value: 500, suffix: '+', label: 'خريج حتى الآن' },
    { icon: Globe,         value: 3,   suffix: '',  label: 'لغات تعليم' },
    { icon: Zap,           value: 100, suffix: '%', label: 'اعتماد وزاري' },
  ],
}

export default function AboutPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const isRTL = lang === 'ar'
  const c = t[lang]
  const stats = statsData[lang]
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
                  <Sparkles size={11} className="text-brand-gold" />
                  {c.hero.tag}
                </span>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/92 animate-slide-up" style={{ animationDelay: '100ms' }}>
                  {c.hero.title}
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-gradient-gold text-glow animate-slide-up" style={{ animationDelay: '250ms' }}>
                  {c.hero.titleAccent}
                </span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '400ms' }}>
                {c.hero.subtitle}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 70" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 70L1440 70L1440 25C1250 65 980 5 720 32C460 59 200 5 0 28L0 70Z" />
            </svg>
          </div>
        </section>

        {/* ── Stats row ── */}
        <section className="py-16 relative overflow-hidden bg-gradient-to-r from-brand-blue via-blue-700 to-indigo-800 animate-gradient">
          <div className="absolute inset-0 dot-pattern opacity-18 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={s.label} data-reveal data-delay={String(i * 120)} className="text-center group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                    <s.icon size={20} className="text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1 font-playfair">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/60 text-sm font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section id="story" className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={clsx(isRTL && 'text-right')} data-reveal="left">
                <span className="section-tag">{c.story.tag}</span>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.story.title}</h2>
                <p className="text-neutral-600 leading-relaxed mb-4">{c.story.body}</p>
                <p className="text-neutral-600 leading-relaxed">{c.story.body2}</p>
              </div>
              <div className="grid grid-cols-2 gap-4" data-reveal="right">
                {c.story.pillars.map(({ icon: Icon, label, grad }, i) => (
                  <div
                    key={label}
                    data-reveal="scale"
                    data-delay={String(i * 100)}
                    className={clsx('group relative rounded-3xl p-6 text-center border border-neutral-100 bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-1.5 overflow-hidden cursor-default', isRTL && 'text-right')}
                  >
                    <div className={clsx('w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg', grad)}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <p className="text-xs font-bold text-neutral-700">{label}</p>
                    <div className={clsx('absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-400', grad)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section id="mission" className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/4 rounded-full blur-3xl pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-14', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.mission.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.mission.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { card: c.mission.mission, color: 'border-brand-blue', iconBg: 'bg-brand-blue/10', iconColor: 'text-brand-blue', Icon: BookOpen, delay: '100' },
                { card: c.mission.vision, color: 'border-brand-gold', iconBg: 'bg-brand-gold/10', iconColor: 'text-amber-500', Icon: Star, delay: '200' },
                { card: null, color: 'border-emerald-500', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', Icon: Award, delay: '300' },
              ].map(({ card, color, iconBg, iconColor, Icon, delay }, i) => (
                <div
                  key={i}
                  data-reveal
                  data-delay={delay}
                  className={clsx(`group relative rounded-3xl p-8 bg-white border-t-4 ${color} hover:shadow-[0_20px_60px_rgba(0,0,0,0.09)] transition-all duration-500 hover:-translate-y-2 overflow-hidden`, isRTL && 'text-right')}
                >
                  <div className={clsx(`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`)}>
                    <Icon size={22} className={iconColor} />
                  </div>
                  {card ? (
                    <>
                      <h3 className={clsx('font-bold text-neutral-900 mb-3 text-base', !isRTL && 'font-playfair')}>{card.label}</h3>
                      <p className="text-neutral-600 text-sm leading-relaxed">{card.text}</p>
                    </>
                  ) : (
                    <>
                      <h3 className={clsx('font-bold text-neutral-900 mb-4 text-base', !isRTL && 'font-playfair')}>{c.mission.values.label}</h3>
                      <div className="flex flex-wrap gap-2">
                        {c.mission.values.items.map((v) => (
                          <span key={v} className="text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">{v}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Principal's Message ── */}
        <section id="principal" className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('max-w-3xl mx-auto', isRTL ? 'text-right' : 'text-center')} data-reveal="scale">
              <span className="section-tag mx-auto">{c.principal.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.principal.title}</h2>
              <div className="relative mt-8 rounded-3xl p-10 bg-white border border-neutral-100 hover:shadow-[0_24px_64px_rgba(0,40,255,0.07)] transition-all duration-500 overflow-hidden">
                {/* Gradient accent top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-blue" />
                {/* Decorative quote mark */}
                <div className="absolute top-6 left-8 text-8xl text-brand-gold/15 font-playfair leading-none select-none">"</div>
                <p className={clsx('text-neutral-600 leading-relaxed text-lg italic mb-8 relative z-10', isRTL && 'text-right')}>
                  {c.principal.body}
                </p>
                <div className={clsx('flex items-center gap-4 relative z-10', isRTL ? 'flex-row-reverse justify-end' : 'justify-center')}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-blue-700 flex items-center justify-center shadow-brand">
                    <Users size={20} className="text-white" />
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="font-bold text-neutral-900 text-sm">{c.principal.name}</div>
                    <div className="text-xs text-neutral-500">{c.principal.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key Facts ── */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.facts.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.facts.title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {c.facts.items.map(({ label, value }, i) => (
                <div
                  key={label}
                  data-reveal="scale"
                  data-delay={String(i * 60)}
                  className={clsx('group relative rounded-2xl p-5 bg-white border border-neutral-100 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(0,40,255,0.07)] transition-all duration-400 hover:-translate-y-1 overflow-hidden', isRTL && 'text-right')}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-1.5">{label}</div>
                  <div className="font-bold text-neutral-900 text-sm">{value}</div>
                </div>
              ))}
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