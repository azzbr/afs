'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowRight, ArrowLeft, BookOpen, Globe, Star, Users, MapPin, Phone, Mail, GraduationCap, Trophy, Zap, ChevronDown, Calendar, Shield, Award, CheckCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useCounter } from '@/hooks/useCounter'

/* ── Trust items ── */
const trustItems = {
  en: [
    { icon: Shield,      label: 'Bahrain MOE Licensed' },
    { icon: Award,       label: 'American Curriculum' },
    { icon: Star,        label: 'STAR 360 Assessment' },
    { icon: CheckCircle, label: 'Non-Profit Institution' },
    { icon: Globe,       label: 'Trilingual Education' },
    { icon: Users,       label: 'KG to Grade 5' },
  ],
  ar: [
    { icon: Shield,      label: 'مرخصة من وزارة التربية' },
    { icon: Award,       label: 'المنهج الأمريكي' },
    { icon: Star,        label: 'تقييم STAR 360' },
    { icon: CheckCircle, label: 'مؤسسة غير ربحية' },
    { icon: Globe,       label: 'تعليم ثلاثي اللغات' },
    { icon: Users,       label: 'من الروضة حتى الصف 5' },
  ],
}

/* ── Stats ── */
const statsData = {
  en: [
    { value: 15, suffix: '+', label: 'Years of Excellence', icon: Trophy },
    { value: 3,  suffix: '',  label: 'Languages of Instruction', icon: Globe },
    { value: 5,  suffix: '',  label: 'Grade Levels', icon: GraduationCap },
    { value: 100,suffix: '%', label: 'Ministry Accredited', icon: Zap },
  ],
  ar: [
    { value: 15, suffix: '+', label: 'سنة من التميز', icon: Trophy },
    { value: 3,  suffix: '',  label: 'لغات تعليم', icon: Globe },
    { value: 5,  suffix: '',  label: 'مراحل دراسية', icon: GraduationCap },
    { value: 100,suffix: '%', label: 'اعتماد وزاري', icon: Zap },
  ],
}

/* ── Events ── */
const eventsData = {
  en: [
    { month: 'AUG', date: '28', title: 'Open Day & School Tour', desc: 'Visit classrooms, meet teachers, and learn about our programs.' },
    { month: 'SEP', date: '1',  title: 'First Day of School 2025–26', desc: 'Academic year begins for all grades KG1 through Grade 5.' },
    { month: 'SEP', date: '15', title: 'Parent Welcome Night', desc: "Meet your child's teachers and discover the year's learning plan." },
    { month: 'OCT', date: '5',  title: 'Cultural Day 2025', desc: 'Celebrate diversity with costumes, food, and performances.' },
  ],
  ar: [
    { month: 'أغسطس', date: '28', title: 'اليوم المفتوح وجولة المدرسة', desc: 'زيارة الفصول والالتقاء بالمعلمين والتعرف على برامجنا.' },
    { month: 'سبتمبر', date: '1', title: 'أول يوم دراسي 2025–26', desc: 'يبدأ العام الدراسي لجميع الصفوف من KG1 حتى الصف الخامس.' },
    { month: 'سبتمبر', date: '15', title: 'ليلة ترحيب بالوالدين', desc: 'التعرف على معلمي أطفالكم والاطلاع على خطة التعلم للعام.' },
    { month: 'أكتوبر', date: '5', title: 'يوم الثقافة 2025', desc: 'الاحتفال بالتنوع بالأزياء والطعام والعروض الثقافية.' },
  ],
}

/* ── News ── */
const newsPreviews = {
  en: [
    { cat: 'Achievement', title: 'AFS Students Excel in STAR 360 Assessment', excerpt: 'Our students surpassed national benchmarks in reading and mathematics in the latest assessment cycle.', date: 'Mar 2025' },
    { cat: 'Event',       title: 'Annual Graduation Ceremony 2024–2025', excerpt: 'We proudly celebrated our Grade 5 graduates at a heartwarming ceremony attended by families and staff.', date: 'Jun 2025' },
    { cat: 'Community',   title: 'Cultural Day Celebrates Diversity', excerpt: 'Students, parents, and teachers came together to celebrate the rich cultural tapestry of our school community.', date: 'Feb 2025' },
  ],
  ar: [
    { cat: 'إنجاز',  title: 'طلاب الفجر يتفوقون في تقييم STAR 360', excerpt: 'تجاوز طلابنا المعايير الوطنية في القراءة والرياضيات في دورة التقييم الأخيرة.', date: 'مارس 2025' },
    { cat: 'فعالية', title: 'حفل التخرج السنوي 2024–2025', excerpt: 'احتفلنا بفخر بخريجي الصف الخامس في حفل دافئ حضره الأهالي وأعضاء هيئة التدريس.', date: 'يونيو 2025' },
    { cat: 'مجتمع',  title: 'يوم الثقافة يحتفل بالتنوع', excerpt: 'اجتمع الطلاب والأهالي والمعلمون معاً للاحتفال بالنسيج الثقافي الغني لمجتمع مدرستنا.', date: 'فبراير 2025' },
  ],
}

/* ── FAQ ── */
const faqData = {
  en: [
    { q: 'What age does KG1 accept?',           a: 'KG1 accepts children who are at least 2 years and 9 months old by September 1 of the enrollment year.' },
    { q: 'What curriculum does AFS follow?',    a: 'AFS runs a dual curriculum — the American curriculum alongside the Bahrain Ministry of Education (MOE) curriculum, plus a trilingual program in Arabic, English, and French.' },
    { q: 'Is there a school bus service?',      a: 'Yes, AFS provides a school bus service covering major areas across Bahrain. Contact the admissions office for current routes and fees.' },
    { q: 'When does enrollment open?',          a: 'Enrollment for the 2025–2026 academic year is currently open. Seats are limited, so early application is strongly advised.' },
    { q: 'How can I schedule a campus visit?',  a: 'Call us at +973 1761 2221 or email info@afs.edu.bh during school hours (Sun–Thu, 7:30 AM – 3:30 PM) to arrange a personal tour.' },
    { q: 'Does AFS offer after-school clubs?',  a: 'Yes — AFS offers a variety of after-school programs including arts, sports, drama, and language enrichment activities.' },
  ],
  ar: [
    { q: 'ما الحد الأدنى لعمر القبول في KG1؟',  a: 'يقبل KG1 الأطفال الذين لا يقل عمرهم عن سنتين و9 أشهر بحلول 1 سبتمبر من سنة التسجيل.' },
    { q: 'ما المناهج التي تتبعها الفجر؟',        a: 'تتبع الفجر منهجاً مزدوجاً: المنهج الأمريكي إلى جانب منهج وزارة التربية البحرينية، إضافة إلى برنامج ثلاثي اللغات (عربي وإنجليزي وفرنسي).' },
    { q: 'هل تتوفر خدمة الحافلة المدرسية؟',      a: 'نعم، تُوفر الفجر خدمة حافلة تغطي مناطق رئيسية في البحرين. تواصل مع مكتب القبول للاستفسار عن المسارات والرسوم.' },
    { q: 'متى يفتح باب التسجيل؟',               a: 'التسجيل للعام الدراسي 2025–2026 مفتوح حالياً. المقاعد محدودة، لذا ننصح بالتقديم المبكر.' },
    { q: 'كيف أرتب زيارة للحرم المدرسي؟',        a: 'اتصل بنا على +973 1761 2221 أو راسلنا على info@afs.edu.bh خلال ساعات الدوام (الأحد–الخميس، 7:30ص–3:30م).' },
    { q: 'هل تُقدم الفجر أنشطة لامنهجية؟',       a: 'نعم — تُقدم الفجر برامج متنوعة بعد الدراسة منها الفنون والرياضة والمسرح وأنشطة إثراء اللغات.' },
  ],
}

const content = {
  en: {
    hero: {
      eyebrow: 'Est. 2010 · Barbar, Bahrain',
      h1: 'Where Excellence\nMeets Belonging',
      sub: 'Al Fajer Private School — a bilingual education combining the American curriculum and Bahrain MOE standards, from KG through Grade 5.',
      cta1: 'Apply for Admission',
      cta2: 'Explore Programs',
      stats: [
        { value: '15+', label: 'Years of Excellence' },
        { value: 'KG–5', label: 'All Grade Levels' },
        { value: '3', label: 'Languages Taught' },
        { value: '100%', label: 'MOE Accredited' },
      ],
    },
    why: {
      tag: 'Why AFS',
      title: 'Built for Your Child',
      sub: 'We combine international standards with a warm environment where every child is known, valued, and inspired.',
      items: [
        { icon: BookOpen,      title: 'Dual Curriculum',      desc: 'American curriculum + Bahrain MOE — rigour without compromise.' },
        { icon: Globe,         title: 'Trilingual Education', desc: 'Arabic, English, and French from KG — a genuine multilingual foundation.' },
        { icon: Star,          title: 'STAR 360 Assessment',  desc: "Adaptive, evidence-based testing tracks every student's growth." },
        { icon: Users,         title: 'Small Class Sizes',    desc: 'Personalised attention — no child is ever left behind.' },
      ],
    },
    programs: {
      tag: 'Our Programs',
      title: 'Three Pillars of Learning',
      items: [
        { icon: GraduationCap, title: 'American Curriculum', desc: 'Critical thinking, project-based learning, and internationally recognised standards.', badge: 'Core', href: '/academics' },
        { icon: BookOpen,      title: 'MOE Curriculum',      desc: 'Arabic fluency, Islamic studies, and Bahraini national identity at the heart of every lesson.', badge: 'National', href: '/academics' },
        { icon: Globe,         title: 'Trilingual Program',  desc: 'English, Arabic, and French — communicative fluency from day one.', badge: 'Languages', href: '/academics' },
      ],
    },
    grades: {
      tag: 'Grade Structure',
      title: 'KG Through Grade 5',
      items: [
        { g: 'KG1', a: '2y 9m+', kg: true },
        { g: 'KG2', a: '3y 9m+', kg: true },
        { g: 'KG3', a: '4y 9m+', kg: true },
        { g: 'Gr 1', a: '5y 9m+', kg: false },
        { g: 'Gr 2', a: '6y 9m+', kg: false },
        { g: 'Gr 3', a: '7y 9m+', kg: false },
        { g: 'Gr 4', a: '8y 9m+', kg: false },
        { g: 'Gr 5', a: '9y 9m+', kg: false },
      ],
    },
    cta: { tag: 'Admissions Open', h: "Secure Your Child's Place for 2025–2026", sub: 'Limited seats available. Apply early to join the Al Fajer family.', btn: 'Start Application' },
    contact: {
      tag: 'Find Us',
      title: 'Visit Al Fajer School',
      items: [
        { icon: MapPin, label: 'Address', value: 'Building 1754, Road 4627, Block 346, Saar, Bahrain' },
        { icon: Phone,  label: 'Phone',   value: '+973 1761 2221' },
        { icon: Mail,   label: 'Email',   value: 'info@afs.edu.bh' },
      ],
    },
  },
  ar: {
    hero: {
      eyebrow: 'تأسست 2010 · صار، البحرين',
      h1: 'حيث يلتقي التميز\nبالانتماء',
      sub: 'مدرسة الفجر الخاصة — تعليم ثنائي اللغة يجمع المنهج الأمريكي ومعايير وزارة التربية البحرينية، من الروضة حتى الصف الخامس.',
      cta1: 'سجّل الآن',
      cta2: 'استعرض البرامج',
      stats: [
        { value: '+15', label: 'سنة من التميز' },
        { value: 'KG–5', label: 'جميع المراحل' },
        { value: '3', label: 'لغات تدريس' },
        { value: '100%', label: 'معتمدة وزارياً' },
      ],
    },
    why: {
      tag: 'لماذا الفجر',
      title: 'مبنية لطفلك',
      sub: 'نجمع بين المعايير الدولية وبيئة دافئة حيث يُعرف كل طفل ويُقدَّر ويُلهَم.',
      items: [
        { icon: BookOpen, title: 'منهجان متكاملان',    desc: 'المنهج الأمريكي + وزارة التربية البحرينية — أكاديمية صارمة بلا تنازل.' },
        { icon: Globe,    title: 'تعليم ثلاثي اللغات', desc: 'العربية والإنجليزية والفرنسية منذ الروضة — أساس متعدد اللغات حقيقي.' },
        { icon: Star,     title: 'تقييم STAR 360',      desc: 'اختبارات تكيفية قائمة على الأدلة تتتبع نمو كل طالب.' },
        { icon: Users,    title: 'فصول صغيرة',          desc: 'اهتمام شخصي في كل فصل حتى لا يتأخر أي طفل.' },
      ],
    },
    programs: {
      tag: 'برامجنا',
      title: 'ثلاثة ركائز للتعلم',
      items: [
        { icon: GraduationCap, title: 'المنهج الأمريكي',        desc: 'التفكير النقدي والتعلم القائم على المشاريع والمعايير الدولية.', badge: 'الأساسي', href: '/academics' },
        { icon: BookOpen,      title: 'منهج الوزارة',            desc: 'إتقان العربية والتربية الإسلامية والهوية الوطنية في صميم كل درس.', badge: 'الوطني', href: '/academics' },
        { icon: Globe,         title: 'البرنامج ثلاثي اللغات',  desc: 'الإنجليزية والعربية والفرنسية — طلاقة تواصلية منذ اليوم الأول.', badge: 'اللغات', href: '/academics' },
      ],
    },
    grades: {
      tag: 'هيكل الصفوف',
      title: 'من الروضة حتى الصف الخامس',
      items: [
        { g: 'KG1', a: '+سنتان 9م', kg: true },
        { g: 'KG2', a: '+ثلاث 9م',  kg: true },
        { g: 'KG3', a: '+أربع 9م',  kg: true },
        { g: 'ص 1', a: '+خمس 9م',   kg: false },
        { g: 'ص 2', a: '+ست 9م',    kg: false },
        { g: 'ص 3', a: '+سبع 9م',   kg: false },
        { g: 'ص 4', a: '+ثماني 9م', kg: false },
        { g: 'ص 5', a: '+تسع 9م',   kg: false },
      ],
    },
    cta: { tag: 'القبول مفتوح', h: 'احجز مقعد طفلك للعام 2025–2026', sub: 'المقاعد محدودة. قدّم مبكراً للانضمام إلى عائلة الفجر.', btn: 'ابدأ التقديم' },
    contact: {
      tag: 'زورونا',
      title: 'تفضل بزيارة مدرسة الفجر',
      items: [
        { icon: MapPin, label: 'العنوان', value: 'مبنى 1754، طريق 4627، مجمع 346، صار، البحرين' },
        { icon: Phone,  label: 'هاتف',   value: '+973 1761 2221' },
        { icon: Mail,   label: 'البريد',  value: 'info@afs.edu.bh' },
      ],
    },
  },
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { count, ref } = useCounter(target)
  return <span ref={ref} className="counter-num">{count}{suffix}</span>
}

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const isRTL = lang === 'ar'
  const c = content[lang]
  const stats = statsData[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight

  useScrollReveal()

  const twEn = useTypewriter(['Excellence Meets Belonging', 'Bilingual. Forward. Inspired.', 'Arabic · English · French'], 70, 2400)
  const twAr = useTypewriter(['التميز يلتقي بالانتماء', 'ثنائي اللغة. متقدم. ملهِم.', 'عربي · إنجليزي · فرنسي'], 85, 2600)
  const tw = isRTL ? twAr : twEn

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header lang={lang} onLangChange={setLang} />
      <main>

        {/* ════════════════════════════ HERO ════════════════════════════ */}
        <section className="hero-dark relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
          {/* Subtle diagonal lines pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(135deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '28px 28px' }}
          />

          <div className="container-custom relative z-10 py-24 lg:py-32">
            <div className={clsx('max-w-4xl', isRTL && 'text-right')}>

              {/* Eyebrow */}
              <div className={clsx('flex items-center gap-3 mb-8 animate-fade-in', isRTL && 'justify-end')} style={{ animationDelay: '0ms' }}>
                <div className="w-8 h-px bg-[var(--brand-gold)]" />
                <span className="text-[var(--brand-gold-light)] text-xs font-bold uppercase tracking-widest">
                  {c.hero.eyebrow}
                </span>
              </div>

              {/* Typewriter line */}
              <div className={clsx('flex mb-5 animate-fade-in', isRTL && 'justify-end')} style={{ animationDelay: '80ms' }}>
                <span className="text-white/40 text-sm font-mono tracking-wider min-h-[1.25rem]">
                  {tw}
                  <span className="text-[var(--brand-gold)] opacity-80 ml-0.5">|</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className={clsx('font-bold leading-[1.05] mb-8', !isRTL && 'font-playfair')}>
                {c.hero.h1.split('\n').map((line, i) => (
                  <span
                    key={i}
                    className={clsx(
                      'block animate-slide-up',
                      i === 0
                        ? 'text-4xl md:text-6xl lg:text-7xl text-white'
                        : 'text-4xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]',
                    )}
                    style={{ animationDelay: `${80 + i * 140}ms` }}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              {/* Sub */}
              <p
                className="text-white/55 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl animate-fade-in"
                style={{ animationDelay: '380ms' }}
              >
                {c.hero.sub}
              </p>

              {/* CTAs */}
              <div
                className={clsx('flex flex-wrap gap-4 mb-16 animate-fade-in', isRTL && 'flex-row-reverse')}
                style={{ animationDelay: '480ms' }}
              >
                <Link href="/admissions" className="btn-secondary flex items-center gap-2">
                  {c.hero.cta1} <Arr size={15} />
                </Link>
                <Link href="/academics" className="btn-ghost flex items-center gap-2">
                  {c.hero.cta2}
                </Link>
              </div>

              {/* Mini stats */}
              <div
                className={clsx('grid grid-cols-2 md:grid-cols-4 gap-px border border-white/10 animate-fade-in', isRTL && 'text-right')}
                style={{ animationDelay: '580ms' }}
              >
                {c.hero.stats.map((s) => (
                  <div key={s.label} className="px-5 py-4 border-r border-white/10 last:border-r-0">
                    <div className="font-bold text-2xl text-white font-playfair">{s.value}</div>
                    <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ TRUST BAR ════════════════════════════ */}
        <section className="bg-white border-b border-neutral-100 py-4 overflow-hidden">
          <div className="container-custom">
            <div className={clsx('flex flex-wrap items-center justify-center gap-x-8 gap-y-3', isRTL && 'flex-row-reverse')}>
              {trustItems[lang].map((item, i) => (
                <div key={item.label} className={clsx('flex items-center gap-2 text-neutral-400 text-xs font-semibold uppercase tracking-wider', isRTL && 'flex-row-reverse')}>
                  <item.icon size={13} className="text-[var(--brand-gold)] flex-shrink-0" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ WHY AFS ════════════════════════════ */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('max-w-2xl mb-14', isRTL && 'text-right ml-auto')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.why.tag}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.why.title}</h2>
              <p className="section-subtitle">{c.why.sub}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.why.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-delay={String(i * 80)}
                  className={clsx('group border border-[var(--border)] p-7 bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default', isRTL && 'text-right')}
                >
                  <div className={clsx('w-12 h-12 bg-[var(--brand-navy)] flex items-center justify-center mb-5', isRTL && 'mr-auto')}>
                    <item.icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--ink)] text-base mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                  <div className={clsx('mt-5 w-8 h-0.5 bg-[var(--brand-gold)] transition-all duration-300 group-hover:w-14', isRTL && 'mr-auto')} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ PROGRAMS ════════════════════════════ */}
        <section className="section-padding section-dark">
          <div className="container-custom">
            <div className={clsx('max-w-2xl mb-14', isRTL && 'text-right ml-auto')} data-reveal="fade">
              <div className={clsx('section-tag-light', isRTL && 'flex-row-reverse')}>{c.programs.tag}</div>
              <h2 className={clsx('section-title-white', !isRTL && 'font-playfair')}>{c.programs.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.programs.items.map((prog, i) => (
                <Link
                  key={prog.title}
                  href={prog.href}
                  data-reveal
                  data-delay={String(i * 120)}
                  className={clsx('group block border border-white/10 p-8 bg-white/5 hover:bg-white/10 hover:border-[var(--brand-gold)] transition-all duration-300', isRTL && 'text-right')}
                >
                  <div className={clsx('flex items-center justify-between mb-8', isRTL && 'flex-row-reverse')}>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-gold-light)] border border-[var(--brand-gold)]/30 px-3 py-1">
                      {prog.badge}
                    </span>
                    <prog.icon size={20} className="text-white/30 group-hover:text-[var(--brand-gold)] transition-colors" />
                  </div>
                  <h3 className={clsx('text-xl font-bold text-white mb-3', !isRTL && 'font-playfair')}>{prog.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{prog.desc}</p>
                  <div className={clsx('flex items-center gap-2 text-white/40 text-xs font-semibold uppercase tracking-wider group-hover:text-[var(--brand-gold)] transition-colors', isRTL && 'flex-row-reverse')}>
                    {isRTL ? 'اعرف المزيد' : 'Learn More'}
                    <Arr size={13} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ TESTIMONIALS ════════════════════════════ */}
        <section className="section-padding section-cream">
          <div className="container-custom">
            <div className={clsx('max-w-2xl mb-14', isRTL && 'text-right ml-auto')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{isRTL ? 'آراء الأهالي' : 'Parent Voices'}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>
                {isRTL ? 'ماذا تقول عائلاتنا' : 'What Our Families Say'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(isRTL ? [
                { name: 'سارة المطوع',     role: 'أم طالبة في الصف 3',         quote: 'منذ انضمت ابنتي إلى الفجر، تحسّن مستواها الأكاديمي بشكل ملحوظ. الأساتذة يعاملون كل طفل كأنه ابنهم.', initials: 'س.م' },
                { name: 'أحمد الزياني',    role: 'أب طالب في KG3',             quote: 'أسعدني أن ابني بدأ يتحدث الفرنسية منذ أول أسابيعه في المدرسة. البرنامج ثلاثي اللغات استثنائي حقاً.', initials: 'أ.ز' },
                { name: 'نورة البوعينين', role: 'أم طالبتين في الصف 1 و4',    quote: 'اخترت الفجر لأبنائي لأن البيئة المدرسية دافئة ومحفِّزة، والفريق الأكاديمي متميز في كل المواد.', initials: 'ن.ب' },
              ] : [
                { name: 'Sarah Al-Matw',      role: 'Parent of Grade 3 student',        quote: "Since joining AFS, my daughter's academic performance has improved remarkably. The teachers treat every child like their own.", initials: 'SM' },
                { name: 'Ahmed Al-Ziani',     role: 'Parent of KG3 student',            quote: 'My son started speaking French in his first weeks. The trilingual program is genuinely exceptional — we are so glad we enrolled.', initials: 'AZ' },
                { name: 'Noura Al-Buainain', role: 'Parent of Grade 1 & 4 students',   quote: "I chose AFS because the environment is warm and motivating. Both of my children love coming to school every day.", initials: 'NB' },
              ]).map((t, i) => (
                <div
                  key={t.name}
                  data-reveal
                  data-delay={String(i * 100)}
                  className={clsx('group bg-white border border-[var(--border)] p-7 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 cursor-default', isRTL && 'text-right')}
                >
                  {/* Stars */}
                  <div className={clsx('flex gap-0.5 mb-5', isRTL && 'flex-row-reverse justify-end')}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={12} className="text-[var(--brand-gold)] fill-[var(--brand-gold)]" />
                    ))}
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className={clsx('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                    <div className="w-9 h-9 bg-[var(--brand-navy)] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-[var(--ink)] text-sm">{t.name}</div>
                      <div className="text-xs text-neutral-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ STATS ════════════════════════════ */}
        <section className="py-20 hero-dark">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {stats.map((s, i) => (
                <div key={s.label} data-reveal data-delay={String(i * 100)} className={clsx('px-8 py-4 text-center cursor-default', isRTL && 'text-center')}>
                  <s.icon size={18} className="text-[var(--brand-gold)] mx-auto mb-4 opacity-80" />
                  <div className="text-5xl font-bold text-white mb-1 font-playfair">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ GRADES ════════════════════════════ */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('max-w-2xl mb-12', isRTL && 'text-right ml-auto')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.grades.tag}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.grades.title}</h2>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {c.grades.items.map((g, i) => (
                <div
                  key={g.g}
                  data-reveal="scale"
                  data-delay={String(i * 50)}
                  className={clsx(
                    'group p-4 text-center border transition-all duration-200 hover:-translate-y-1 cursor-default',
                    g.kg
                      ? 'bg-[var(--brand-navy)] border-[var(--brand-navy)]'
                      : 'bg-white border-[var(--border)] hover:border-[var(--brand-navy)]',
                  )}
                >
                  <div className={clsx('font-bold text-sm', g.kg ? 'text-white' : 'text-[var(--ink)]')}>{g.g}</div>
                  <div className={clsx('text-xs mt-1', g.kg ? 'text-white/60' : 'text-neutral-400')}>{g.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ EVENTS ════════════════════════════ */}
        <section className="section-padding section-cream">
          <div className="container-custom">
            <div className={clsx('flex items-end justify-between gap-4 mb-12', isRTL && 'flex-row-reverse')} data-reveal="fade">
              <div className={isRTL ? 'text-right' : ''}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{isRTL ? 'الفعاليات القادمة' : 'Upcoming Events'}</div>
                <h2 className={clsx('section-title mb-0', !isRTL && 'font-playfair')}>
                  {isRTL ? 'ما الذي ينتظرك' : "What's Coming"}
                </h2>
              </div>
              <Link href="/news" className={clsx('hidden md:flex items-center gap-2 text-[var(--brand-navy)] text-sm font-semibold hover:gap-3 transition-all flex-shrink-0 pb-2', isRTL && 'flex-row-reverse')}>
                {isRTL ? 'كل الأخبار' : 'All News'} <Arr size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventsData[lang].map((ev, i) => (
                <div
                  key={ev.title}
                  data-reveal
                  data-delay={String(i * 80)}
                  className={clsx('group bg-white border border-[var(--border)] p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 cursor-default', isRTL && 'text-right')}
                >
                  <div className={clsx('flex items-start gap-4 mb-4', isRTL && 'flex-row-reverse')}>
                    <div className="text-center flex-shrink-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-gold)]">{ev.month}</div>
                      <div className="text-3xl font-bold text-[var(--brand-navy)] font-playfair leading-none">{ev.date}</div>
                    </div>
                    <div className="w-px h-10 bg-[var(--border)] flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-[var(--ink)] text-sm leading-snug">{ev.title}</h3>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-xs leading-relaxed">{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ NEWS ════════════════════════════ */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('flex items-end justify-between gap-4 mb-12', isRTL && 'flex-row-reverse')} data-reveal="fade">
              <div className={isRTL ? 'text-right' : ''}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{isRTL ? 'أخبار المدرسة' : 'School News'}</div>
                <h2 className={clsx('section-title mb-0', !isRTL && 'font-playfair')}>
                  {isRTL ? 'آخر أخبار الفجر' : 'Latest from AFS'}
                </h2>
              </div>
              <Link href="/news" className={clsx('hidden md:flex items-center gap-2 text-[var(--brand-navy)] text-sm font-semibold hover:gap-3 transition-all flex-shrink-0 pb-2', isRTL && 'flex-row-reverse')}>
                {isRTL ? 'كل الأخبار' : 'View All'} <Arr size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsPreviews[lang].map((item, i) => (
                <Link
                  key={item.title}
                  href="/news"
                  data-reveal
                  data-delay={String(i * 100)}
                  className={clsx('group block border border-[var(--border)] bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300', isRTL && 'text-right')}
                >
                  {/* Placeholder image area */}
                  <div className="h-44 bg-[var(--cream)] border-b border-[var(--border)] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-0.5 bg-[var(--brand-gold)] mx-auto mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-gold)]">{item.cat}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className={clsx('flex items-center gap-2 mb-3', isRTL && 'flex-row-reverse')}>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-gold)]">{item.cat}</span>
                      <span className="text-neutral-300">·</span>
                      <span className="flex items-center gap-1 text-xs text-neutral-400">
                        <Calendar size={10} />{item.date}
                      </span>
                    </div>
                    <h3 className={clsx('font-bold text-[var(--ink)] text-sm mb-2 leading-snug group-hover:text-[var(--brand-navy)] transition-colors', !isRTL && 'font-playfair')}>{item.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 mb-4">{item.excerpt}</p>
                    <div className={clsx('flex items-center gap-1.5 text-[var(--brand-navy)] text-xs font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all', isRTL && 'flex-row-reverse')}>
                      {isRTL ? 'اقرأ المزيد' : 'Read More'} <Arr size={11} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════ FAQ ════════════════════════════ */}
        <section className="section-padding section-cream">
          <div className="container-custom">
            <div className={clsx('max-w-2xl mb-12', isRTL ? 'text-right ml-auto' : 'text-center mx-auto')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL ? 'flex-row-reverse' : 'justify-center')}>{isRTL ? 'أسئلة شائعة' : 'FAQ'}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>
                {isRTL ? 'أسئلة يسألها الأهالي' : 'Common Parent Questions'}
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-2">
              {faqData[lang].map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  data-delay={String(i * 60)}
                  className="bg-white border border-[var(--border)] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={clsx(
                      'w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-sm transition-colors',
                      openFaq === i ? 'text-[var(--brand-navy)]' : 'text-[var(--ink)] hover:text-[var(--brand-navy)]',
                      isRTL && 'text-right flex-row-reverse',
                    )}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={15}
                      className={clsx(
                        'flex-shrink-0 text-neutral-400 transition-transform duration-300',
                        openFaq === i && 'rotate-180 text-[var(--brand-navy)]',
                      )}
                    />
                  </button>
                  <div className={clsx(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0',
                  )}>
                    <p className={clsx('px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-[var(--border)] pt-4', isRTL && 'text-right')}>
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className={clsx('mt-8 flex', isRTL ? 'justify-start flex-row-reverse' : 'justify-center')} data-reveal="fade">
              <Link href="/admissions#faq" className={clsx('flex items-center gap-2 text-[var(--brand-navy)] text-sm font-semibold hover:gap-3 transition-all', isRTL && 'flex-row-reverse')}>
                {isRTL ? 'عرض كل الأسئلة' : 'View All FAQs'} <Arr size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ CTA BANNER ════════════════════════════ */}
        <section className="hero-dark relative overflow-hidden py-28">
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(135deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '28px 28px' }}
          />
          <div className="container-custom relative z-10 text-center">
            <div data-reveal="scale">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px bg-[var(--brand-gold)]" />
                <span className="text-[var(--brand-gold-light)] text-xs font-bold uppercase tracking-widest">{c.cta.tag}</span>
                <div className="w-8 h-px bg-[var(--brand-gold)]" />
              </div>
              <h2 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-3xl md:text-5xl lg:text-6xl text-white">{c.cta.h}</span>
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-sm mx-auto">{c.cta.sub}</p>
              <Link href="/admissions" className="btn-secondary inline-flex items-center gap-3">
                {c.cta.btn} <Arr size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════ CONTACT ════════════════════════════ */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('max-w-2xl mb-12', isRTL && 'text-right ml-auto')} data-reveal="fade">
              <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.contact.tag}</div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.contact.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.contact.items.map((item, i) => (
                <div
                  key={item.label}
                  data-reveal
                  data-delay={String(i * 100)}
                  className={clsx('group border border-[var(--border)] p-7 bg-white hover:border-[var(--brand-navy)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300', isRTL && 'text-right')}
                >
                  <div className={clsx('flex items-start gap-4', isRTL && 'flex-row-reverse')}>
                    <div className="w-10 h-10 bg-[var(--brand-navy)] flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="text-sm font-semibold text-[var(--ink)] leading-snug">{item.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
