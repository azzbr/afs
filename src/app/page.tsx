'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowRight, ArrowLeft, BookOpen, Globe, Star, Users, MapPin, Phone, Mail, Sparkles, GraduationCap, Trophy, Zap, ChevronDown, Calendar, Clock, CheckCircle, Shield, Award } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal, useTilt, useSpotlight } from '@/hooks/useScrollReveal'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useMagneticButton } from '@/hooks/useMagneticButton'

/* ── Trust / accreditation signals ── */
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

/* ── Upcoming Events ── */
const eventsData = {
  en: [
    { date: 'Aug 28', month: 'AUG', title: 'Open Day & School Tour', desc: 'Visit classrooms, meet teachers, and learn about our programs.', color: 'from-brand-blue to-blue-700', emoji: '🏫' },
    { date: 'Sep 1',  month: 'SEP', title: 'First Day of School 2025–26', desc: 'Academic year begins for all grades KG1 through Grade 5.', color: 'from-amber-400 to-orange-500', emoji: '🎒' },
    { date: 'Sep 15', month: 'SEP', title: 'Parent Welcome Night', desc: "Meet your child's teachers and discover the year's learning plan.", color: 'from-emerald-400 to-teal-600', emoji: '🤝' },
    { date: 'Oct 5',  month: 'OCT', title: 'Cultural Day 2025', desc: 'Celebrate diversity with costumes, food, and performances.', color: 'from-violet-400 to-purple-600', emoji: '🌍' },
  ],
  ar: [
    { date: '28 أغ', month: 'أغسطس', title: 'اليوم المفتوح وجولة المدرسة', desc: 'زيارة الفصول والالتقاء بالمعلمين والتعرف على برامجنا.', color: 'from-brand-blue to-blue-700', emoji: '🏫' },
    { date: '1 سبت', month: 'سبتمبر', title: 'أول يوم دراسي 2025–26', desc: 'يبدأ العام الدراسي لجميع الصفوف من KG1 حتى الصف الخامس.', color: 'from-amber-400 to-orange-500', emoji: '🎒' },
    { date: '15 سبت', month: 'سبتمبر', title: 'ليلة ترحيب بالوالدين', desc: 'التعرف على معلمي أطفالكم والاطلاع على خطة التعلم للعام.', color: 'from-emerald-400 to-teal-600', emoji: '🤝' },
    { date: '5 أكت', month: 'أكتوبر', title: 'يوم الثقافة 2025', desc: 'الاحتفال بالتنوع بالأزياء والطعام والعروض الثقافية.', color: 'from-violet-400 to-purple-600', emoji: '🌍' },
  ],
}

/* ── News preview ── */
const newsPreviews = {
  en: [
    { cat: 'Achievement', title: 'AFS Students Excel in STAR 360 Assessment', excerpt: 'Our students surpassed national benchmarks in reading and mathematics in the latest assessment cycle.', date: 'Mar 2025', color: 'from-brand-blue to-blue-700', emoji: '⭐' },
    { cat: 'Event', title: 'Annual Graduation Ceremony 2024–2025', excerpt: 'We proudly celebrated our Grade 5 graduates at a heartwarming ceremony attended by families and staff.', date: 'Jun 2025', color: 'from-amber-400 to-orange-500', emoji: '🎓' },
    { cat: 'Community', title: 'Cultural Day Celebrates Diversity', excerpt: 'Students, parents, and teachers came together to celebrate the rich cultural tapestry of our school community.', date: 'Feb 2025', color: 'from-rose-400 to-pink-600', emoji: '🌍' },
  ],
  ar: [
    { cat: 'إنجاز', title: 'طلاب الفجر يتفوقون في تقييم STAR 360', excerpt: 'تجاوز طلابنا المعايير الوطنية في القراءة والرياضيات في دورة التقييم الأخيرة.', date: 'مارس 2025', color: 'from-brand-blue to-blue-700', emoji: '⭐' },
    { cat: 'فعالية', title: 'حفل التخرج السنوي 2024–2025', excerpt: 'احتفلنا بفخر بخريجي الصف الخامس في حفل دافئ حضره الأهالي وأعضاء هيئة التدريس.', date: 'يونيو 2025', color: 'from-amber-400 to-orange-500', emoji: '🎓' },
    { cat: 'مجتمع', title: 'يوم الثقافة يحتفل بالتنوع', excerpt: 'اجتمع الطلاب والأهالي والمعلمون معاً للاحتفال بالنسيج الثقافي الغني لمجتمع مدرستنا.', date: 'فبراير 2025', color: 'from-rose-400 to-pink-600', emoji: '🌍' },
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

/* ── stat items with raw numeric target ── */
const statsData = {
  en: [
    { value: 15, suffix: '+', label: 'Years Serving Families', icon: Trophy },
    { value: 3, suffix: '', label: 'Languages of Instruction', icon: Globe },
    { value: 5, suffix: '', label: 'Grade Levels (KG–5)', icon: GraduationCap },
    { value: 100, suffix: '%', label: 'Ministry Accredited', icon: Zap },
  ],
  ar: [
    { value: 15, suffix: '+', label: 'سنة خدمة الأسر', icon: Trophy },
    { value: 3, suffix: '', label: 'لغات تعليم', icon: Globe },
    { value: 5, suffix: '', label: 'مراحل دراسية (KG–5)', icon: GraduationCap },
    { value: 100, suffix: '%', label: 'اعتماد وزاري', icon: Zap },
  ],
}

const content = {
  en: {
    hero: {
      badge: 'Est. 2010 · Saar, Bahrain',
      h1a: 'Where Excellence',
      h1b: 'Meets Belonging',
      sub: 'Al Fajer Private School — a world-class bilingual education combining the American curriculum and Bahrain MOE standards, from KG through Grade 5.',
      cta1: 'Apply for Admission',
      cta2: 'Explore Programs',
      miniStats: [
        { value: '15+', label: 'Years of Excellence' },
        { value: 'KG–5', label: 'All Grade Levels' },
        { value: '3', label: 'Languages Taught' },
        { value: '100%', label: 'MOE Accredited' },
      ],
    },
    why: {
      tag: 'Why AFS',
      title: 'Built Different.',
      accent: 'Built for Your Child.',
      sub: 'We combine international standards with a warm, nurturing environment where every child is known, valued, and inspired.',
      items: [
        { icon: BookOpen, grad: 'from-blue-600 to-brand-blue', title: 'Dual Curriculum', desc: 'American curriculum + Bahrain MOE — rigour without compromise.' },
        { icon: Globe, grad: 'from-emerald-500 to-teal-600', title: 'Trilingual Education', desc: 'Arabic, English, and French from KG — a genuine multilingual foundation.' },
        { icon: Star, grad: 'from-amber-400 to-orange-500', title: 'STAR 360 Assessment', desc: "Adaptive, evidence-based testing tracks every student's growth." },
        { icon: Users, grad: 'from-violet-500 to-purple-600', title: 'Small Class Sizes', desc: 'Personalised attention — no child is ever left behind.' },
      ],
    },
    programs: {
      tag: 'Our Programs',
      title: 'Three Pillars of Learning',
      items: [
        { grad: 'from-brand-blue via-blue-700 to-indigo-900', icon: GraduationCap, title: 'American Curriculum', desc: 'Critical thinking, project-based learning, and internationally recognised standards.', badge: 'Core', href: '/academics' },
        { grad: 'from-amber-400 via-orange-500 to-red-600', icon: BookOpen, title: 'MOE Curriculum', desc: 'Arabic fluency, Islamic studies, and Bahraini national identity at the heart of every lesson.', badge: 'National', href: '/academics' },
        { grad: 'from-emerald-400 via-teal-500 to-cyan-700', icon: Globe, title: 'Trilingual Program', desc: 'English, Arabic, and French — communicative fluency from day one.', badge: 'Languages', href: '/academics' },
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
    cta: { tag: 'Admissions Open', h: "Secure Your Child's Place", accent: 'for 2025–2026', sub: 'Limited seats available. Apply early to join the Al Fajer family.', btn: 'Start Application' },
    contact: {
      tag: 'Find Us',
      title: 'Visit Al Fajer School',
      items: [
        { icon: MapPin, label: 'Address', value: 'Building 1754, Road 4627, Block 346, Saar, Bahrain' },
        { icon: Phone, label: 'Phone', value: '+973 1761 2221' },
        { icon: Mail, label: 'Email', value: 'info@afs.edu.bh' },
      ],
    },
  },
  ar: {
    hero: {
      badge: 'تأسست 2010 · صار، البحرين',
      h1a: 'حيث يلتقي التميز',
      h1b: 'بالانتماء',
      sub: 'مدرسة الفجر الخاصة — تعليم ثنائي اللغة يجمع المنهج الأمريكي ومعايير وزارة التربية البحرينية، من الروضة حتى الصف الخامس.',
      cta1: 'سجّل الآن',
      cta2: 'استعرض البرامج',
      miniStats: [
        { value: '+15', label: 'سنة من التميز' },
        { value: 'KG–5', label: 'جميع المراحل' },
        { value: '3', label: 'لغات تدريس' },
        { value: '100%', label: 'معتمدة وزارياً' },
      ],
    },
    why: {
      tag: 'لماذا الفجر',
      title: 'مختلفة.',
      accent: 'مبنية لطفلك.',
      sub: 'نجمع بين المعايير الدولية وبيئة دافئة حيث يُعرف كل طفل ويُقدَّر ويُلهَم.',
      items: [
        { icon: BookOpen, grad: 'from-blue-600 to-brand-blue', title: 'منهجان متكاملان', desc: 'المنهج الأمريكي + وزارة التربية البحرينية — أكاديمية صارمة بلا تنازل.' },
        { icon: Globe, grad: 'from-emerald-500 to-teal-600', title: 'تعليم ثلاثي اللغات', desc: 'العربية والإنجليزية والفرنسية منذ الروضة — أساس متعدد اللغات حقيقي.' },
        { icon: Star, grad: 'from-amber-400 to-orange-500', title: 'تقييم STAR 360', desc: 'اختبارات تكيفية قائمة على الأدلة تتتبع نمو كل طالب.' },
        { icon: Users, grad: 'from-violet-500 to-purple-600', title: 'فصول صغيرة', desc: 'اهتمام شخصي في كل فصل حتى لا يتأخر أي طفل.' },
      ],
    },
    programs: {
      tag: 'برامجنا',
      title: 'ثلاثة ركائز للتعلم',
      items: [
        { grad: 'from-brand-blue via-blue-700 to-indigo-900', icon: GraduationCap, title: 'المنهج الأمريكي', desc: 'التفكير النقدي والتعلم القائم على المشاريع والمعايير الدولية.', badge: 'الأساسي', href: '/academics' },
        { grad: 'from-amber-400 via-orange-500 to-red-600', icon: BookOpen, title: 'منهج الوزارة', desc: 'إتقان العربية والتربية الإسلامية والهوية الوطنية في صميم كل درس.', badge: 'الوطني', href: '/academics' },
        { grad: 'from-emerald-400 via-teal-500 to-cyan-700', icon: Globe, title: 'البرنامج ثلاثي اللغات', desc: 'الإنجليزية والعربية والفرنسية — طلاقة تواصلية منذ اليوم الأول.', badge: 'اللغات', href: '/academics' },
      ],
    },
    grades: {
      tag: 'هيكل الصفوف',
      title: 'من الروضة حتى الصف الخامس',
      items: [
        { g: 'KG1', a: '+سنتان 9م', kg: true },
        { g: 'KG2', a: '+ثلاث 9م', kg: true },
        { g: 'KG3', a: '+أربع 9م', kg: true },
        { g: 'ص 1', a: '+خمس 9م', kg: false },
        { g: 'ص 2', a: '+ست 9م', kg: false },
        { g: 'ص 3', a: '+سبع 9م', kg: false },
        { g: 'ص 4', a: '+ثماني 9م', kg: false },
        { g: 'ص 5', a: '+تسع 9م', kg: false },
      ],
    },
    cta: { tag: 'القبول مفتوح', h: 'احجز مقعد طفلك', accent: 'للعام 2025–2026', sub: 'المقاعد محدودة. قدّم مبكراً للانضمام إلى عائلة الفجر.', btn: 'ابدأ التقديم' },
    contact: {
      tag: 'زورونا',
      title: 'تفضل بزيارة مدرسة الفجر',
      items: [
        { icon: MapPin, label: 'العنوان', value: 'مبنى 1754، طريق 4627، مجمع 346، صار، البحرين' },
        { icon: Phone, label: 'هاتف', value: '+973 1761 2221' },
        { icon: Mail, label: 'البريد', value: 'info@afs.edu.bh' },
      ],
    },
  },
}

/* ── Animated counter component ── */
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const duration = 1800
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [started, target])

  return <span ref={ref} className="counter-num">{count}{suffix}</span>
}

/* ── Ripple on click ── */
function addRipple(e: React.MouseEvent<HTMLElement>) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const span = document.createElement('span')
  const size = Math.max(rect.width, rect.height)
  span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`
  span.className = 'ripple'
  btn.appendChild(span)
  span.addEventListener('animationend', () => span.remove())
}

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const isRTL = lang === 'ar'
  const c = content[lang]
  const stats = statsData[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight

  const pageRef = useRef<HTMLDivElement>(null)
  const whyRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useScrollReveal()
  useTilt(whyRef as React.RefObject<HTMLElement>)
  useSpotlight(contactRef as React.RefObject<HTMLElement>)

  /* Typewriter cycling taglines */
  const twEn = useTypewriter(
    ['Excellence Meets Belonging', 'Bilingual. Forward. Inspired.', 'Arabic · English · French'],
    75, 2400,
  )
  const twAr = useTypewriter(
    ['التميز يلتقي بالانتماء', 'ثنائي اللغة. متقدم. ملهِم.', 'عربي · إنجليزي · فرنسي'],
    85, 2600,
  )
  const typewriterText = isRTL ? twAr : twEn

  /* Magnetic primary CTA */
  const { ref: magRef, onMouseMove: magMove, onMouseLeave: magLeave } = useMagneticButton(0.28)

  /* hero mouse parallax */
  const heroRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const orbs = el.querySelectorAll<HTMLElement>('.parallax-orb')
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.4
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`
      })
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])

  return (
    <div ref={pageRef} dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header lang={lang} onLangChange={setLang} />
      <main>

        {/* ═══════════════════════════════════════
            HERO
        ═══════════════════════════════════════ */}
        <section ref={heroRef} className="mesh-bg noise relative overflow-hidden min-h-[92vh] flex flex-col justify-center">
          {/* Parallax orbs */}
          <div className="parallax-orb absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-brand-blue/18 blur-[130px] transition-transform duration-200 ease-out" />
          <div className="parallax-orb absolute top-1/3 -right-52 w-[600px] h-[600px] rounded-full bg-indigo-500/12 blur-[110px] transition-transform duration-200 ease-out" />
          <div className="parallax-orb animate-pulse-glow absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-brand-gold/6 blur-[100px]" />
          <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />
          <div className="animate-spin-slow absolute -top-24 right-20 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
          <div className="animate-spin-slow absolute bottom-10 -left-16 w-72 h-72 rounded-full border border-brand-blue/15 pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

          <div className="container-custom relative z-10 py-28 lg:py-40">
            <div className={clsx('max-w-4xl', isRTL && 'text-right')}>

              {/* Badge — bounces in */}
              <div className={clsx('flex mb-7 animate-bounce-in', isRTL && 'justify-end')}>
                <span className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-5 py-2 text-white/65 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                  <Sparkles size={11} className="text-brand-gold animate-pulse" />
                  {c.hero.badge}
                </span>
              </div>

              {/* Typewriter line */}
              <div className={clsx('flex mb-4 animate-fade-in', isRTL && 'justify-end')} style={{ animationDelay: '60ms' }}>
                <span className="text-brand-gold/80 text-sm font-mono tracking-wider min-h-[1.25rem]">
                  {typewriterText}
                  <span className="animate-pulse ml-0.5 text-brand-gold">|</span>
                </span>
              </div>

              {/* Line 1 — slide up */}
              <h1 className={clsx('font-bold leading-[1.05] mb-7', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-6xl lg:text-7xl text-white/92 animate-slide-up" style={{ animationDelay: '100ms' }}>
                  {c.hero.h1a}
                </span>
                {/* Line 2 — gradient gold, delayed */}
                <span className="block text-4xl md:text-6xl lg:text-7xl text-gradient-gold text-glow animate-slide-up" style={{ animationDelay: '250ms' }}>
                  {c.hero.h1b}
                </span>
              </h1>

              {/* Sub — fade in delayed */}
              <p className="text-white/55 text-lg md:text-xl leading-relaxed mb-11 max-w-2xl animate-fade-in" style={{ animationDelay: '420ms' }}>
                {c.hero.sub}
              </p>

              {/* CTAs */}
              <div className={clsx('flex flex-wrap gap-4 mb-16 animate-fade-in', isRTL && 'flex-row-reverse')} style={{ animationDelay: '550ms' }}>
                <Link
                  href="/admissions"
                  ref={magRef as React.RefObject<HTMLAnchorElement>}
                  onMouseMove={magMove as React.MouseEventHandler<HTMLAnchorElement>}
                  onMouseLeave={magLeave}
                  onClick={addRipple}
                  className="ripple-btn shimmer-btn group relative inline-flex items-center gap-2.5 px-9 py-4 bg-brand-gold text-neutral-900 font-bold rounded-2xl text-sm tracking-wide hover:shadow-[0_0_50px_rgba(255,215,0,0.55)] transition-all duration-300 hover:-translate-y-1.5"
                >
                  {c.hero.cta1} <Arr size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/academics"
                  className="inline-flex items-center gap-2.5 px-9 py-4 border border-white/20 text-white/85 font-semibold rounded-2xl text-sm hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300 hover:-translate-y-1.5 backdrop-blur-sm"
                >
                  {c.hero.cta2}
                </Link>
              </div>

              {/* Mini stat cards */}
              <div className={clsx('grid grid-cols-2 md:grid-cols-4 gap-3 animate-fade-in', isRTL && 'text-right')} style={{ animationDelay: '680ms' }}>
                {c.hero.miniStats.map((s, i) => (
                  <div key={s.label} className="group relative glass rounded-2xl px-5 py-4 border border-white/10 hover:border-white/28 transition-all duration-400 hover:-translate-y-1 cursor-default overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="relative font-bold text-2xl text-white font-playfair">{s.value}</div>
                    <div className="relative text-white/48 text-xs mt-0.5">{s.label}</div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 90" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 90L1440 90L1440 35C1300 75 1060 5 720 38C380 71 130 10 0 42L0 90Z" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            TRUST BAR — accreditations
        ═══════════════════════════════════════ */}
        <section className="bg-white border-b border-neutral-100 py-5 overflow-hidden">
          <div className="container-custom">
            <div className={clsx('flex flex-wrap items-center justify-center gap-x-8 gap-y-3', isRTL && 'flex-row-reverse')}>
              {trustItems[lang].map((item) => (
                <div key={item.label} className={clsx('flex items-center gap-2 text-neutral-500 text-xs font-semibold', isRTL && 'flex-row-reverse')}>
                  <item.icon size={14} className="text-brand-blue flex-shrink-0" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            WHY AFS — tilt cards
        ═══════════════════════════════════════ */}
        <section ref={whyRef} className="section-padding bg-white overflow-hidden">
          <div className="container-custom">
            <div className={clsx('mb-16', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{c.why.tag}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>
                {c.why.title} <span className="text-gradient-blue">{c.why.accent}</span>
              </h2>
              <p className={clsx('section-subtitle mx-auto', isRTL ? '' : 'text-center')}>{c.why.sub}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.why.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-delay={String((i + 1) * 100)}
                  className={clsx('tilt-card group relative rounded-3xl p-7 border border-neutral-100 bg-white hover:shadow-[0_24px_64px_rgba(0,0,0,0.11)] transition-shadow duration-500 overflow-hidden cursor-default', isRTL && 'text-right')}
                >
                  {/* Hover bg wash */}
                  <div className={clsx('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500', item.grad)} />
                  {/* Icon */}
                  <div className={clsx('relative w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-400', item.grad)}>
                    <item.icon size={22} className="text-white relative z-10" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent" />
                  </div>
                  <h3 className="font-bold text-neutral-900 text-base mb-2 leading-snug">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                  {/* Bottom accent */}
                  <div className={clsx('absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500', item.grad)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            PROGRAMS — dark, glow cards
        ═══════════════════════════════════════ */}
        <section className="section-padding relative overflow-hidden" style={{ background: '#030712' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-brand-blue/10 blur-[130px] rounded-full" />
            <div className="absolute inset-0 dot-pattern opacity-18" />
          </div>

          <div className="container-custom relative z-10">
            <div className={clsx('mb-16', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-5 py-1.5 text-white/55 text-xs font-bold tracking-widest uppercase mb-5">
                {c.programs.tag}
              </span>
              <h2 className={clsx('section-title-white', !isRTL && 'font-playfair')}>{c.programs.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.programs.items.map((prog, i) => (
                <Link
                  key={prog.title}
                  href={prog.href}
                  data-reveal
                  data-delay={String((i + 1) * 150)}
                  className={clsx('card-shine glow-card group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_90px_rgba(0,0,0,0.6)]', isRTL && 'text-right')}
                >
                  <div className={clsx('relative bg-gradient-to-br p-8 pb-10 min-h-[300px] flex flex-col', prog.grad)}>
                    <div className="animate-spin-slow absolute -top-12 -right-12 w-48 h-48 rounded-full border border-white/8 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full border border-white/8 pointer-events-none" />

                    <span className="self-start text-xs font-bold px-3 py-1 rounded-full mb-6 bg-white/12 text-white/80 border border-white/20">
                      {prog.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
                      <prog.icon size={22} className="text-white" />
                    </div>
                    <h3 className={clsx('text-2xl font-bold text-white mb-3', !isRTL && 'font-playfair')}>{prog.title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed flex-1">{prog.desc}</p>
                    <div className={clsx('flex items-center gap-2 mt-6 text-white/70 text-sm font-semibold group-hover:text-white transition-colors', isRTL && 'flex-row-reverse')}>
                      {isRTL ? 'اعرف المزيد' : 'Learn More'}
                      <Arr size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            TESTIMONIALS
        ═══════════════════════════════════════ */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-blue/4 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-14', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{isRTL ? 'آراء الأهالي' : 'Parent Voices'}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>
                {isRTL ? 'ماذا تقول عائلاتنا' : 'What Our Families Say'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(isRTL ? [
                { name: 'سارة المطوع', role: 'أم طالبة في الصف 3', quote: 'منذ انضمت ابنتي إلى الفجر، تحسّن مستواها الأكاديمي بشكل ملحوظ. الأساتذة يعاملون كل طفل كأنه ابنهم.', stars: 5, color: 'from-brand-blue to-blue-700', initials: 'س.م' },
                { name: 'أحمد الزياني', role: 'أب طالب في KG3', quote: 'أسعدني أن ابني بدأ يتحدث الفرنسية منذ أول أسابيعه في المدرسة. البرنامج ثلاثي اللغات استثنائي حقاً.', stars: 5, color: 'from-amber-400 to-orange-500', initials: 'أ.ز' },
                { name: 'نورة البوعينين', role: 'أم طالبتين في الصف 1 و4', quote: 'اخترت الفجر لأبنائي لأن البيئة المدرسية دافئة ومحفِّزة، والفريق الأكاديمي متميز في كل المواد.', stars: 5, color: 'from-emerald-400 to-teal-600', initials: 'ن.ب' },
              ] : [
                { name: 'Sarah Al-Matw', role: 'Parent of Grade 3 student', quote: "Since joining AFS, my daughter's academic performance has improved remarkably. The teachers treat every child like their own.", stars: 5, color: 'from-brand-blue to-blue-700', initials: 'SM' },
                { name: 'Ahmed Al-Ziani', role: 'Parent of KG3 student', quote: 'My son started speaking French in his first weeks at AFS. The trilingual program is genuinely exceptional — we are so glad we enrolled.', stars: 5, color: 'from-amber-400 to-orange-500', initials: 'AZ' },
                { name: 'Noura Al-Buainain', role: 'Parent of Grade 1 & 4 students', quote: "I chose AFS because the environment is warm and motivating. The academic team is outstanding across every subject—both of my children love coming to school.", stars: 5, color: 'from-emerald-400 to-teal-600', initials: 'NB' },
              ]).map((t, i) => (
                <div
                  key={t.name}
                  data-reveal
                  data-delay={String(i * 130)}
                  className={clsx('group relative rounded-3xl p-7 bg-white border border-neutral-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.09)] hover:border-neutral-200 hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-default', isRTL && 'text-right')}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Stars */}
                  <div className={clsx('flex gap-0.5 mb-4', isRTL && 'flex-row-reverse justify-end')}>
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} size={13} className="text-brand-gold fill-brand-gold" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div className={clsx('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                    <div className={clsx('w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold flex-shrink-0', t.color)}>
                      {t.initials}
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <div className="font-bold text-neutral-900 text-sm">{t.name}</div>
                      <div className="text-xs text-neutral-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CAMPUS LIFE PREVIEW
        ═══════════════════════════════════════ */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-10 flex items-end justify-between gap-4', isRTL && 'flex-row-reverse')} data-reveal="fade">
              <div className={isRTL ? 'text-right' : ''}>
                <span className="section-tag">{isRTL ? 'الحياة المدرسية' : 'Campus Life'}</span>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>
                  {isRTL ? 'لحظات من الفجر' : 'Moments at AFS'}
                </h2>
              </div>
              <Link
                href="/gallery"
                className={clsx('hidden md:inline-flex items-center gap-2 text-brand-blue text-sm font-semibold hover:gap-3 transition-all duration-200 flex-shrink-0', isRTL && 'flex-row-reverse')}
              >
                {isRTL ? 'عرض المعرض' : 'View Gallery'} <Arr size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { emoji: '📚', label: isRTL ? 'فصولنا الحديثة' : 'Modern Classrooms', color: 'from-blue-400 to-indigo-600', span: 'md:col-span-2 md:row-span-2' },
                { emoji: '⚽', label: isRTL ? 'يوم الرياضة'    : 'Sports Day',        color: 'from-emerald-400 to-teal-600',  span: '' },
                { emoji: '🎨', label: isRTL ? 'معرض الفنون'    : 'Art Exhibition',    color: 'from-rose-400 to-pink-600',     span: '' },
                { emoji: '🎓', label: isRTL ? 'حفل التخرج'     : 'Graduation',        color: 'from-violet-400 to-purple-600', span: '' },
                { emoji: '🌍', label: isRTL ? 'يوم الثقافة'    : 'Cultural Day',      color: 'from-amber-400 to-orange-500',  span: '' },
              ].map((item, i) => (
                <Link
                  key={item.label}
                  href="/gallery"
                  data-reveal="scale"
                  data-delay={String(i * 70)}
                  className={clsx(
                    'group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]',
                    item.span,
                  )}
                  style={{ aspectRatio: item.span ? '1/1' : '1/1', minHeight: '140px' }}
                >
                  <div className={clsx('absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-110', item.color)} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <span className="text-4xl drop-shadow-lg">{item.emoji}</span>
                    <span className="text-white/90 font-bold text-xs px-2 text-center">{item.label}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Link href="/gallery" className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold">
                {isRTL ? 'عرض المعرض كاملاً' : 'View Full Gallery'} <Arr size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            STATS — count-up
        ═══════════════════════════════════════ */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-r from-brand-blue via-blue-700 to-indigo-800 animate-gradient">
          <div className="absolute inset-0 dot-pattern opacity-18 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={s.label} data-reveal data-delay={String(i * 120)} className={clsx('text-center group cursor-default', isRTL && 'text-center')}>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                    <s.icon size={22} className="text-white" />
                  </div>
                  <div className="text-5xl font-bold text-white mb-1 font-playfair">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/58 text-sm font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            GRADES
        ═══════════════════════════════════════ */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/3 rounded-full blur-3xl pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{c.grades.tag}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.grades.title}</h2>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {c.grades.items.map((g, i) => (
                <div
                  key={g.g}
                  data-reveal="scale"
                  data-delay={String(i * 60)}
                  className={clsx(
                    'group rounded-2xl p-4 text-center border transition-all duration-300 hover:-translate-y-1.5 cursor-default',
                    g.kg
                      ? 'bg-gradient-to-br from-brand-blue to-blue-700 border-transparent shadow-brand hover:shadow-[0_8px_30px_rgba(0,40,255,0.4)]'
                      : 'bg-white border-neutral-200 hover:border-brand-blue/30 hover:shadow-md',
                  )}
                >
                  <div className={clsx('font-bold text-sm', g.kg ? 'text-white' : 'text-neutral-800')}>{g.g}</div>
                  <div className={clsx('text-xs mt-1 leading-tight', g.kg ? 'text-white/68' : 'text-neutral-400')}>{g.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            UPCOMING EVENTS
        ═══════════════════════════════════════ */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-brand-gold/4 rounded-full blur-3xl pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-10 flex items-end justify-between gap-4', isRTL && 'flex-row-reverse')} data-reveal="fade">
              <div className={isRTL ? 'text-right' : ''}>
                <span className="section-tag">{isRTL ? 'الفعاليات القادمة' : 'Upcoming Events'}</span>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>
                  {isRTL ? 'ما الذي ينتظرك في الفجر' : "What's Coming at AFS"}
                </h2>
              </div>
              <Link href="/news" className={clsx('hidden md:inline-flex items-center gap-2 text-brand-blue text-sm font-semibold hover:gap-3 transition-all duration-200 flex-shrink-0', isRTL && 'flex-row-reverse')}>
                {isRTL ? 'كل الأخبار' : 'All News'} <Arr size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventsData[lang].map((ev, i) => (
                <div
                  key={ev.title}
                  data-reveal
                  data-delay={String(i * 100)}
                  className={clsx('group relative rounded-3xl overflow-hidden border border-neutral-100 bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 cursor-default', isRTL && 'text-right')}
                >
                  {/* Color top bar */}
                  <div className={clsx('h-1.5 bg-gradient-to-r', ev.color)} />
                  <div className="p-5">
                    {/* Date badge */}
                    <div className={clsx('flex items-center gap-3 mb-4', isRTL && 'flex-row-reverse')}>
                      <div className={clsx('w-11 h-11 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-sm text-white text-lg', ev.color)}>
                        {ev.emoji}
                      </div>
                      <div className={isRTL ? 'text-right' : ''}>
                        <div className="text-xs font-bold text-brand-blue uppercase tracking-wider">{ev.month}</div>
                        <div className="text-sm font-bold text-neutral-800">{ev.date}</div>
                      </div>
                    </div>
                    <h3 className="font-bold text-neutral-900 text-sm mb-1.5 leading-snug">{ev.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed">{ev.desc}</p>
                  </div>
                  <div className={clsx('absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-400', ev.color)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            NEWS PREVIEW
        ═══════════════════════════════════════ */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-brand-blue/4 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-10 flex items-end justify-between gap-4', isRTL && 'flex-row-reverse')} data-reveal="fade">
              <div className={isRTL ? 'text-right' : ''}>
                <span className="section-tag">{isRTL ? 'أخبار المدرسة' : 'School News'}</span>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>
                  {isRTL ? 'آخر أخبار الفجر' : 'Latest from AFS'}
                </h2>
              </div>
              <Link href="/news" className={clsx('hidden md:inline-flex items-center gap-2 text-brand-blue text-sm font-semibold hover:gap-3 transition-all duration-200 flex-shrink-0', isRTL && 'flex-row-reverse')}>
                {isRTL ? 'كل الأخبار' : 'View All Stories'} <Arr size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsPreviews[lang].map((item, i) => (
                <Link
                  key={item.title}
                  href="/news"
                  data-reveal
                  data-delay={String(i * 120)}
                  className={clsx('group relative rounded-3xl overflow-hidden border border-neutral-100 bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500', isRTL && 'text-right')}
                >
                  <div className={clsx('relative h-36 flex items-center justify-center bg-gradient-to-br overflow-hidden', item.color)}>
                    <div className="animate-spin-slow absolute -top-8 -right-8 w-28 h-28 rounded-full border border-white/10 pointer-events-none" />
                    <span className="text-5xl">{item.emoji}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className={clsx('flex items-center gap-2 mb-2', isRTL && 'flex-row-reverse')}>
                      <span className="text-xs font-bold text-brand-blue bg-brand-blue/8 px-2.5 py-1 rounded-full">{item.cat}</span>
                      <span className="flex items-center gap-1 text-xs text-neutral-400"><Calendar size={10} />{item.date}</span>
                    </div>
                    <h3 className={clsx('font-bold text-neutral-900 text-sm mb-2 leading-snug group-hover:text-brand-blue transition-colors', !isRTL && 'font-playfair')}>{item.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">{item.excerpt}</p>
                    <div className={clsx('flex items-center gap-1.5 mt-3 text-brand-blue text-xs font-semibold group-hover:gap-2.5 transition-all', isRTL && 'flex-row-reverse')}>
                      {isRTL ? 'اقرأ المزيد' : 'Read More'} <Arr size={11} />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Link href="/news" className="inline-flex items-center gap-2 text-brand-blue text-sm font-semibold">
                {isRTL ? 'كل الأخبار' : 'View All Stories'} <Arr size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            FAQ
        ═══════════════════════════════════════ */}
        <section className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/3 rounded-full blur-3xl pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{isRTL ? 'أسئلة شائعة' : 'FAQ'}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>
                {isRTL ? 'أسئلة يسألها الأهالي' : 'Common Parent Questions'}
              </h2>
              <p className={clsx('section-subtitle mx-auto', isRTL ? '' : 'text-center')}>
                {isRTL ? 'إجابات للأسئلة الأكثر شيوعاً حول مدرستنا.' : 'Quick answers to the questions we hear most from families.'}
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqData[lang].map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  data-delay={String(i * 70)}
                  className="group rounded-2xl border border-neutral-100 bg-white overflow-hidden hover:border-brand-blue/20 transition-colors duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={clsx(
                      'w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-sm transition-colors duration-200',
                      openFaq === i ? 'text-brand-blue' : 'text-neutral-800 hover:text-brand-blue',
                      isRTL && 'text-right flex-row-reverse',
                    )}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={clsx(
                        'flex-shrink-0 text-neutral-400 transition-transform duration-300',
                        openFaq === i ? 'rotate-180 text-brand-blue' : 'group-hover:text-brand-blue',
                      )}
                    />
                  </button>
                  <div className={clsx(
                    'overflow-hidden transition-all duration-400 ease-in-out',
                    openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0',
                  )}>
                    <p className={clsx('px-6 pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-50 pt-3', isRTL && 'text-right')}>
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className={clsx('mt-10 flex justify-center', isRTL && 'flex-row-reverse')} data-reveal="fade">
              <Link href="/admissions#faq" className={clsx('inline-flex items-center gap-2 text-brand-blue text-sm font-semibold hover:gap-3 transition-all duration-200', isRTL && 'flex-row-reverse')}>
                {isRTL ? 'عرض كل الأسئلة الشائعة' : 'View All FAQs on Admissions Page'} <Arr size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CTA BANNER
        ═══════════════════════════════════════ */}
        <section className="mesh-bg noise relative overflow-hidden py-32">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-pulse-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-blue/18 blur-[110px] rounded-full" />
            <div className="absolute inset-0 dot-pattern opacity-18" />
          </div>
          <div className="container-custom relative z-10 text-center">
            <div data-reveal="scale">
              <span className="inline-flex items-center gap-2 bg-white/8 border border-white/14 rounded-full px-5 py-2 mb-7 text-white/55 text-xs font-bold tracking-widest uppercase">
                <Sparkles size={11} className="text-brand-gold animate-pulse" />
                {c.cta.tag}
              </span>
              <h2 className={clsx('font-bold leading-tight mb-4', !isRTL && 'font-playfair')}>
                <span className="block text-3xl md:text-5xl lg:text-6xl text-white/92">{c.cta.h}</span>
                <span className="block text-3xl md:text-5xl lg:text-6xl text-gradient-gold text-glow">{c.cta.accent}</span>
              </h2>
              <p className="text-white/50 text-lg mb-11 max-w-sm mx-auto">{c.cta.sub}</p>
              <button
                onClick={(e) => { addRipple(e); window.location.href = '/admissions' }}
                className="ripple-btn shimmer-btn inline-flex items-center gap-3 px-12 py-5 bg-brand-gold text-neutral-900 font-bold rounded-2xl text-base hover:shadow-[0_0_70px_rgba(255,215,0,0.55)] transition-all duration-300 hover:-translate-y-2 group"
              >
                {c.cta.btn} <Arr size={17} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════ */}
        <section ref={contactRef} className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag">{c.contact.tag}</span>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.contact.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.contact.items.map((item, i) => (
                <div
                  key={item.label}
                  data-reveal
                  data-delay={String(i * 120)}
                  className={clsx('spotlight group relative rounded-3xl p-7 border border-neutral-100 bg-white hover:shadow-[0_20px_60px_rgba(0,40,255,0.09)] hover:border-brand-blue/20 transition-all duration-500 hover:-translate-y-1 overflow-hidden', isRTL && 'text-right')}
                >
                  <div className={clsx('flex items-start gap-4 relative z-10', isRTL && 'flex-row-reverse')}>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-700 flex items-center justify-center flex-shrink-0 shadow-brand group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-sm font-semibold text-neutral-800 leading-snug">{item.value}</div>
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