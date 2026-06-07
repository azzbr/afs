'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import MediaPlaceholder from '@/components/MediaPlaceholder/MediaPlaceholder'
import {
  ArrowRight, ArrowLeft, BookOpen, Globe, Star, Users, MapPin, Phone, Mail,
  GraduationCap, Trophy, Calendar, ChevronDown, CheckCircle, Shield, Award,
  Palette, Quote, ImageIcon,
} from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/* ── Trust / accreditation signals ── */
const trustItems = {
  en: [
    { icon: Shield, label: 'Bahrain MOE Licensed' },
    { icon: Award, label: 'American Curriculum' },
    { icon: Star, label: 'STAR 360 Assessment' },
    { icon: CheckCircle, label: 'Non-Profit Institution' },
    { icon: Globe, label: 'Trilingual Education' },
    { icon: Users, label: 'KG to Grade 5' },
  ],
  ar: [
    { icon: Shield, label: 'مرخصة من وزارة التربية' },
    { icon: Award, label: 'المنهج الأمريكي' },
    { icon: Star, label: 'تقييم STAR 360' },
    { icon: CheckCircle, label: 'مؤسسة غير ربحية' },
    { icon: Globe, label: 'تعليم ثلاثي اللغات' },
    { icon: Users, label: 'من الروضة حتى الصف 5' },
  ],
}

/* ── Upcoming Events ── */
const eventsData = {
  en: [
    { day: '28', month: 'AUG', title: 'Open Day & School Tour', desc: 'Visit classrooms, meet teachers, and learn about our programs.' },
    { day: '01', month: 'SEP', title: 'First Day of School 2025–26', desc: 'Academic year begins for all grades KG1 through Grade 5.' },
    { day: '15', month: 'SEP', title: 'Parent Welcome Night', desc: "Meet your child's teachers and discover the year's learning plan." },
    { day: '05', month: 'OCT', title: 'Cultural Day 2025', desc: 'Celebrate diversity with costumes, food, and performances.' },
  ],
  ar: [
    { day: '28', month: 'أغسطس', title: 'اليوم المفتوح وجولة المدرسة', desc: 'زيارة الفصول والالتقاء بالمعلمين والتعرف على برامجنا.' },
    { day: '01', month: 'سبتمبر', title: 'أول يوم دراسي 2025–26', desc: 'يبدأ العام الدراسي لجميع الصفوف من KG1 حتى الصف الخامس.' },
    { day: '15', month: 'سبتمبر', title: 'ليلة ترحيب بالوالدين', desc: 'التعرف على معلمي أطفالكم والاطلاع على خطة التعلم للعام.' },
    { day: '05', month: 'أكتوبر', title: 'يوم الثقافة 2025', desc: 'الاحتفال بالتنوع بالأزياء والطعام والعروض الثقافية.' },
  ],
}

/* ── News preview ── */
const newsPreviews = {
  en: [
    { cat: 'Achievement', icon: Award, tone: 'blue' as const, title: 'AFS Students Excel in STAR 360 Assessment', excerpt: 'Our students surpassed national benchmarks in reading and mathematics in the latest assessment cycle.', date: 'Mar 2025' },
    { cat: 'Event', icon: GraduationCap, tone: 'accent' as const, title: 'Annual Graduation Ceremony 2024–2025', excerpt: 'We proudly celebrated our Grade 5 graduates at a ceremony attended by families and staff.', date: 'Jun 2025' },
    { cat: 'Community', icon: Globe, tone: 'soft' as const, title: 'Cultural Day Celebrates Diversity', excerpt: 'Students, parents, and teachers came together to celebrate the rich culture of our school community.', date: 'Feb 2025' },
  ],
  ar: [
    { cat: 'إنجاز', icon: Award, tone: 'blue' as const, title: 'طلاب الفجر يتفوقون في تقييم STAR 360', excerpt: 'تجاوز طلابنا المعايير الوطنية في القراءة والرياضيات في دورة التقييم الأخيرة.', date: 'مارس 2025' },
    { cat: 'فعالية', icon: GraduationCap, tone: 'accent' as const, title: 'حفل التخرج السنوي 2024–2025', excerpt: 'احتفلنا بفخر بخريجي الصف الخامس في حفل حضره الأهالي وأعضاء هيئة التدريس.', date: 'يونيو 2025' },
    { cat: 'مجتمع', icon: Globe, tone: 'soft' as const, title: 'يوم الثقافة يحتفل بالتنوع', excerpt: 'اجتمع الطلاب والأهالي والمعلمون معاً للاحتفال بالنسيج الثقافي الغني لمجتمع مدرستنا.', date: 'فبراير 2025' },
  ],
}

/* ── FAQ ── */
const faqData = {
  en: [
    { q: 'What age does KG1 accept?', a: 'KG1 accepts children who are at least 2 years and 9 months old by September 1 of the enrollment year.' },
    { q: 'What curriculum does AFS follow?', a: 'AFS runs a dual curriculum — the American curriculum alongside the Bahrain Ministry of Education (MOE) curriculum, plus a trilingual program in Arabic, English, and French.' },
    { q: 'Is there a school bus service?', a: 'Yes, AFS provides a school bus service covering major areas across Bahrain. Contact the admissions office for current routes and fees.' },
    { q: 'When does enrollment open?', a: 'Enrollment for the 2025–2026 academic year is currently open. Seats are limited, so early application is strongly advised.' },
    { q: 'How can I schedule a campus visit?', a: 'Call us at +973 1761 2221 or email info@afs.edu.bh during school hours (Sun–Thu, 7:30 AM – 3:30 PM) to arrange a personal tour.' },
    { q: 'Does AFS offer after-school clubs?', a: 'Yes — AFS offers a variety of after-school programs including arts, sports, drama, and language enrichment activities.' },
  ],
  ar: [
    { q: 'ما الحد الأدنى لعمر القبول في KG1؟', a: 'يقبل KG1 الأطفال الذين لا يقل عمرهم عن سنتين و9 أشهر بحلول 1 سبتمبر من سنة التسجيل.' },
    { q: 'ما المناهج التي تتبعها الفجر؟', a: 'تتبع الفجر منهجاً مزدوجاً: المنهج الأمريكي إلى جانب منهج وزارة التربية البحرينية، إضافة إلى برنامج ثلاثي اللغات (عربي وإنجليزي وفرنسي).' },
    { q: 'هل تتوفر خدمة الحافلة المدرسية؟', a: 'نعم، تُوفر الفجر خدمة حافلة تغطي مناطق رئيسية في البحرين. تواصل مع مكتب القبول للاستفسار عن المسارات والرسوم.' },
    { q: 'متى يفتح باب التسجيل؟', a: 'التسجيل للعام الدراسي 2025–2026 مفتوح حالياً. المقاعد محدودة، لذا ننصح بالتقديم المبكر.' },
    { q: 'كيف أرتب زيارة للحرم المدرسي؟', a: 'اتصل بنا على +973 1761 2221 أو راسلنا على info@afs.edu.bh خلال ساعات الدوام (الأحد–الخميس، 7:30ص–3:30م).' },
    { q: 'هل تُقدم الفجر أنشطة لامنهجية؟', a: 'نعم — تُقدم الفجر برامج متنوعة بعد الدراسة منها الفنون والرياضة والمسرح وأنشطة إثراء اللغات.' },
  ],
}

/* ── stat items with raw numeric target ── */
const statsData = {
  en: [
    { value: 15, suffix: '+', label: 'Years Serving Families', icon: Trophy },
    { value: 3, suffix: '', label: 'Languages of Instruction', icon: Globe },
    { value: 5, suffix: '', label: 'Grade Levels (KG–5)', icon: GraduationCap },
    { value: 100, suffix: '%', label: 'Ministry Accredited', icon: Shield },
  ],
  ar: [
    { value: 15, suffix: '+', label: 'سنة خدمة الأسر', icon: Trophy },
    { value: 3, suffix: '', label: 'لغات تعليم', icon: Globe },
    { value: 5, suffix: '', label: 'مراحل دراسية (KG–5)', icon: GraduationCap },
    { value: 100, suffix: '%', label: 'اعتماد وزاري', icon: Shield },
  ],
}

/* ── Campus life (image-ready) ── */
const campusLife = {
  en: [
    { icon: BookOpen, label: 'Modern Classrooms', tone: 'blue' as const, span: 'sm:col-span-2 sm:row-span-2' },
    { icon: Trophy, label: 'Sports Day', tone: 'soft' as const, span: '' },
    { icon: Palette, label: 'Art Exhibition', tone: 'accent' as const, span: '' },
    { icon: GraduationCap, label: 'Graduation', tone: 'soft' as const, span: '' },
    { icon: Globe, label: 'Cultural Day', tone: 'blue' as const, span: '' },
  ],
  ar: [
    { icon: BookOpen, label: 'فصولنا الحديثة', tone: 'blue' as const, span: 'sm:col-span-2 sm:row-span-2' },
    { icon: Trophy, label: 'يوم الرياضة', tone: 'soft' as const, span: '' },
    { icon: Palette, label: 'معرض الفنون', tone: 'accent' as const, span: '' },
    { icon: GraduationCap, label: 'حفل التخرج', tone: 'soft' as const, span: '' },
    { icon: Globe, label: 'يوم الثقافة', tone: 'blue' as const, span: '' },
  ],
}

const content = {
  en: {
    hero: {
      badge: 'Est. 2010 · Saar, Bahrain',
      h1a: 'Where Excellence',
      h1b: 'Meets Belonging',
      sub: 'A world-class bilingual education combining the American curriculum and Bahrain MOE standards, from KG through Grade 5 — in a warm, nurturing community.',
      cta1: 'Apply for Admission',
      cta2: 'Explore Programs',
      visual: 'Campus Life',
      miniStats: [
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
        { icon: BookOpen, title: 'Dual Curriculum', desc: 'American curriculum + Bahrain MOE — rigour without compromise.' },
        { icon: Globe, title: 'Trilingual Education', desc: 'Arabic, English, and French from KG — a genuine multilingual foundation.' },
        { icon: Star, title: 'STAR 360 Assessment', desc: "Adaptive, evidence-based testing tracks every student's growth." },
        { icon: Users, title: 'Small Class Sizes', desc: 'Personalised attention — no child is ever left behind.' },
      ],
    },
    programs: {
      tag: 'Our Programs',
      title: 'Three Pillars of Learning',
      sub: 'A balanced education that develops the whole child — academically, culturally, and linguistically.',
      items: [
        { icon: GraduationCap, title: 'American Curriculum', desc: 'Critical thinking, project-based learning, and internationally recognised standards.', badge: 'Core', href: '/academics' },
        { icon: BookOpen, title: 'MOE Curriculum', desc: 'Arabic fluency, Islamic studies, and Bahraini national identity at the heart of every lesson.', badge: 'National', href: '/academics' },
        { icon: Globe, title: 'Trilingual Program', desc: 'English, Arabic, and French — communicative fluency from day one.', badge: 'Languages', href: '/academics' },
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
    testimonialsTag: 'Parent Voices',
    testimonialsTitle: 'What Our Families Say',
    campusTag: 'Campus Life',
    campusTitle: 'Moments at AFS',
    viewGallery: 'View Gallery',
    eventsTag: 'Upcoming Events',
    eventsTitle: "What's Coming at AFS",
    allNews: 'All News',
    newsTag: 'School News',
    newsTitle: 'Latest from AFS',
    viewAllStories: 'View All Stories',
    readMore: 'Read More',
    faqTag: 'FAQ',
    faqTitle: 'Common Parent Questions',
    faqSub: 'Quick answers to the questions we hear most from families.',
    viewAllFaqs: 'View All FAQs',
    learnMore: 'Learn More',
  },
  ar: {
    hero: {
      badge: 'تأسست 2010 · صار، البحرين',
      h1a: 'حيث يلتقي التميز',
      h1b: 'بالانتماء',
      sub: 'تعليم ثنائي اللغة يجمع المنهج الأمريكي ومعايير وزارة التربية البحرينية، من الروضة حتى الصف الخامس — في بيئة دافئة وراعية.',
      cta1: 'سجّل الآن',
      cta2: 'استعرض البرامج',
      visual: 'الحياة المدرسية',
      miniStats: [
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
        { icon: BookOpen, title: 'منهجان متكاملان', desc: 'المنهج الأمريكي + وزارة التربية البحرينية — أكاديمية صارمة بلا تنازل.' },
        { icon: Globe, title: 'تعليم ثلاثي اللغات', desc: 'العربية والإنجليزية والفرنسية منذ الروضة — أساس متعدد اللغات حقيقي.' },
        { icon: Star, title: 'تقييم STAR 360', desc: 'اختبارات تكيفية قائمة على الأدلة تتتبع نمو كل طالب.' },
        { icon: Users, title: 'فصول صغيرة', desc: 'اهتمام شخصي في كل فصل حتى لا يتأخر أي طفل.' },
      ],
    },
    programs: {
      tag: 'برامجنا',
      title: 'ثلاث ركائز للتعلم',
      sub: 'تعليم متوازن ينمّي الطفل بالكامل — أكاديمياً وثقافياً ولغوياً.',
      items: [
        { icon: GraduationCap, title: 'المنهج الأمريكي', desc: 'التفكير النقدي والتعلم القائم على المشاريع والمعايير الدولية.', badge: 'الأساسي', href: '/academics' },
        { icon: BookOpen, title: 'منهج الوزارة', desc: 'إتقان العربية والتربية الإسلامية والهوية الوطنية في صميم كل درس.', badge: 'الوطني', href: '/academics' },
        { icon: Globe, title: 'البرنامج ثلاثي اللغات', desc: 'الإنجليزية والعربية والفرنسية — طلاقة تواصلية منذ اليوم الأول.', badge: 'اللغات', href: '/academics' },
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
    testimonialsTag: 'آراء الأهالي',
    testimonialsTitle: 'ماذا تقول عائلاتنا',
    campusTag: 'الحياة المدرسية',
    campusTitle: 'لحظات من الفجر',
    viewGallery: 'عرض المعرض',
    eventsTag: 'الفعاليات القادمة',
    eventsTitle: 'ما الذي ينتظرك في الفجر',
    allNews: 'كل الأخبار',
    newsTag: 'أخبار المدرسة',
    newsTitle: 'آخر أخبار الفجر',
    viewAllStories: 'عرض كل القصص',
    readMore: 'اقرأ المزيد',
    faqTag: 'أسئلة شائعة',
    faqTitle: 'أسئلة يسألها الأهالي',
    faqSub: 'إجابات للأسئلة الأكثر شيوعاً حول مدرستنا.',
    viewAllFaqs: 'عرض كل الأسئلة',
    learnMore: 'اعرف المزيد',
  },
}

const testimonials = {
  en: [
    { name: 'Sarah Al-Matw', role: 'Parent of Grade 3 student', quote: "Since joining AFS, my daughter's academic performance has improved remarkably. The teachers treat every child like their own.", initials: 'SM' },
    { name: 'Ahmed Al-Ziani', role: 'Parent of KG3 student', quote: 'My son started speaking French in his first weeks at AFS. The trilingual program is genuinely exceptional — we are so glad we enrolled.', initials: 'AZ' },
    { name: 'Noura Al-Buainain', role: 'Parent of Grade 1 & 4 students', quote: 'I chose AFS because the environment is warm and motivating. The academic team is outstanding across every subject.', initials: 'NB' },
  ],
  ar: [
    { name: 'سارة المطوع', role: 'أم طالبة في الصف 3', quote: 'منذ انضمت ابنتي إلى الفجر، تحسّن مستواها الأكاديمي بشكل ملحوظ. الأساتذة يعاملون كل طفل كأنه ابنهم.', initials: 'س.م' },
    { name: 'أحمد الزياني', role: 'أب طالب في KG3', quote: 'أسعدني أن ابني بدأ يتحدث الفرنسية منذ أول أسابيعه في المدرسة. البرنامج ثلاثي اللغات استثنائي حقاً.', initials: 'أ.ز' },
    { name: 'نورة البوعينين', role: 'أم طالبتين في الصف 1 و4', quote: 'اخترت الفجر لأبنائي لأن البيئة المدرسية دافئة ومحفِّزة، والفريق الأكاديمي متميز في كل المواد.', initials: 'ن.ب' },
  ],
}

/* ── Animated counter ── */
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
    const duration = 1600
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

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const isRTL = lang === 'ar'
  const c = content[lang]
  const stats = statsData[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight

  useScrollReveal()

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>

        {/* ═══════════ HERO ═══════════ */}
        <section className="dawn-hero relative overflow-hidden text-white">
          <div className="absolute inset-0 grid-faint opacity-40 pointer-events-none" />
          <div className="container-custom relative py-16 lg:py-24">
            <div className={clsx('grid items-center gap-12 lg:grid-cols-2', isRTL && 'text-right')}>
              {/* Text */}
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/75">
                  {c.hero.badge}
                </span>
                <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-balance md:text-5xl lg:text-[3.4rem]">
                  <span className="block">{c.hero.h1a}</span>
                  <span className="block text-accent-400">{c.hero.h1b}</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                  {c.hero.sub}
                </p>
                <div className={clsx('mt-8 flex flex-wrap gap-3', isRTL && 'flex-row-reverse')}>
                  <Link href="/admissions" className="btn-secondary group px-7 py-3.5 text-[15px]">
                    {c.hero.cta1}
                    <Arr size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link href="/academics" className="btn-ghost px-7 py-3.5 text-[15px]">
                    {c.hero.cta2}
                  </Link>
                </div>
                {/* Mini stats */}
                <div className={clsx('mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4', isRTL && 'text-right')}>
                  {c.hero.miniStats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                      <div className="mt-1 text-xs text-white/55">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: '120ms' }}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-lift">
                  <MediaPlaceholder
                    aspect="4/5"
                    tone="navy"
                    icon={ImageIcon}
                    label={c.hero.visual}
                    rounded="rounded-2xl"
                  />
                </div>
                <div className={clsx('absolute -bottom-5 rounded-2xl border border-white/10 bg-white px-5 py-4 shadow-lift', isRTL ? '-left-5' : '-right-5')}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-100 text-accent-600">
                      <GraduationCap size={20} />
                    </span>
                    <div className={isRTL ? 'text-right' : ''}>
                      <div className="font-display text-lg font-bold text-ink">KG – Grade 5</div>
                      <div className="text-xs text-muted">{isRTL ? 'تعليم ابتدائي' : 'Primary education'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ TRUST BAR ═══════════ */}
        <section className="border-b border-line bg-white py-5">
          <div className="container-custom">
            <div className={clsx('flex flex-wrap items-center justify-center gap-x-8 gap-y-3', isRTL && 'flex-row-reverse')}>
              {trustItems[lang].map((item) => (
                <div key={item.label} className={clsx('flex items-center gap-2 text-xs font-semibold text-muted', isRTL && 'flex-row-reverse')}>
                  <item.icon size={14} className="flex-shrink-0 text-brand-600" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ WHY AFS ═══════════ */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-14">
              <SectionHeading tag={c.why.tag} title={c.why.title} subtitle={c.why.sub} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.why.items.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-delay={String((i + 1) * 80)}
                  className={clsx('card card-hover p-7', isRTL && 'text-right')}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <item.icon size={22} strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ PROGRAMS ═══════════ */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-14">
              <SectionHeading tag={c.programs.tag} title={c.programs.title} subtitle={c.programs.sub} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {c.programs.items.map((prog, i) => (
                <Link
                  key={prog.title}
                  href={prog.href}
                  data-reveal
                  data-delay={String((i + 1) * 100)}
                  className={clsx('group card card-hover flex flex-col p-7', isRTL && 'text-right')}
                >
                  <div className={clsx('flex items-center justify-between', isRTL && 'flex-row-reverse')}>
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white">
                      <prog.icon size={22} strokeWidth={1.9} />
                    </span>
                    <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-700">
                      {prog.badge}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">{prog.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{prog.desc}</p>
                  <span className={clsx('mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600', isRTL && 'flex-row-reverse')}>
                    {c.learnMore}
                    <Arr size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-14">
              <SectionHeading tag={c.testimonialsTag} title={c.testimonialsTitle} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials[lang].map((t, i) => (
                <div
                  key={t.name}
                  data-reveal
                  data-delay={String(i * 100)}
                  className={clsx('card p-7', isRTL && 'text-right')}
                >
                  <Quote size={28} className="text-brand-200" />
                  <div className={clsx('mt-4 flex gap-0.5', isRTL && 'flex-row-reverse justify-end')}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} className="fill-accent-500 text-accent-500" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/80">{t.quote}</p>
                  <div className={clsx('mt-6 flex items-center gap-3', isRTL && 'flex-row-reverse')}>
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                      {t.initials}
                    </span>
                    <div className={isRTL ? 'text-right' : ''}>
                      <div className="text-sm font-semibold text-ink">{t.name}</div>
                      <div className="text-xs text-faint">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CAMPUS LIFE ═══════════ */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className={clsx('mb-10 flex items-end justify-between gap-4', isRTL && 'flex-row-reverse')}>
              <SectionHeading tag={c.campusTag} title={c.campusTitle} align="left" isRTL={isRTL} className="mb-0" />
              <Link href="/gallery" className={clsx('hidden flex-shrink-0 items-center gap-2 text-sm font-semibold text-brand-600 md:inline-flex hover:gap-3 transition-all', isRTL && 'flex-row-reverse')}>
                {c.viewGallery} <Arr size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {campusLife[lang].map((item, i) => (
                <Link
                  key={item.label}
                  href="/gallery"
                  data-reveal="scale"
                  data-delay={String(i * 70)}
                  className={clsx('group relative block', item.span)}
                >
                  <MediaPlaceholder
                    aspect={item.span ? '1/1' : '4/3'}
                    tone={item.tone}
                    icon={item.icon}
                    label={item.label}
                    className="h-full transition-shadow duration-300 group-hover:shadow-card-hover"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ STATS ═══════════ */}
        <section className="bg-brand-700 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((s, i) => (
                <div key={s.label} data-reveal data-delay={String(i * 100)} className="text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-accent-400">
                    <s.icon size={22} />
                  </span>
                  <div className="mt-4 font-display text-4xl font-bold text-white lg:text-5xl">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ GRADES ═══════════ */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.grades.tag} title={c.grades.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
              {c.grades.items.map((g, i) => (
                <div
                  key={g.g}
                  data-reveal="scale"
                  data-delay={String(i * 50)}
                  className={clsx(
                    'rounded-xl p-4 text-center transition-transform duration-200 hover:-translate-y-1',
                    g.kg ? 'bg-brand-600 text-white' : 'border border-line bg-white',
                  )}
                >
                  <div className={clsx('font-display text-sm font-bold', g.kg ? 'text-white' : 'text-ink')}>{g.g}</div>
                  <div className={clsx('mt-1 text-xs leading-tight', g.kg ? 'text-white/70' : 'text-faint')}>{g.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ EVENTS ═══════════ */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className={clsx('mb-10 flex items-end justify-between gap-4', isRTL && 'flex-row-reverse')}>
              <SectionHeading tag={c.eventsTag} title={c.eventsTitle} align="left" isRTL={isRTL} className="mb-0" />
              <Link href="/news" className={clsx('hidden flex-shrink-0 items-center gap-2 text-sm font-semibold text-brand-600 md:inline-flex hover:gap-3 transition-all', isRTL && 'flex-row-reverse')}>
                {c.allNews} <Arr size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {eventsData[lang].map((ev, i) => (
                <div
                  key={ev.title}
                  data-reveal
                  data-delay={String(i * 90)}
                  className={clsx('card card-hover flex gap-4 p-5', isRTL && 'flex-row-reverse text-right')}
                >
                  <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <span className="font-display text-xl font-bold leading-none">{ev.day}</span>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-brand-500">{ev.month}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold leading-snug text-ink">{ev.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ NEWS ═══════════ */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className={clsx('mb-10 flex items-end justify-between gap-4', isRTL && 'flex-row-reverse')}>
              <SectionHeading tag={c.newsTag} title={c.newsTitle} align="left" isRTL={isRTL} className="mb-0" />
              <Link href="/news" className={clsx('hidden flex-shrink-0 items-center gap-2 text-sm font-semibold text-brand-600 md:inline-flex hover:gap-3 transition-all', isRTL && 'flex-row-reverse')}>
                {c.viewAllStories} <Arr size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {newsPreviews[lang].map((item, i) => (
                <Link
                  key={item.title}
                  href="/news"
                  data-reveal
                  data-delay={String(i * 100)}
                  className={clsx('group card card-hover overflow-hidden', isRTL && 'text-right')}
                >
                  <MediaPlaceholder aspect="16/9" tone={item.tone} icon={item.icon} rounded="rounded-none" />
                  <div className="p-5">
                    <div className={clsx('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
                      <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600">{item.cat}</span>
                      <span className={clsx('flex items-center gap-1 text-xs text-faint', isRTL && 'flex-row-reverse')}>
                        <Calendar size={11} />{item.date}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-brand-600">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{item.excerpt}</p>
                    <span className={clsx('mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600', isRTL && 'flex-row-reverse')}>
                      {c.readMore} <Arr size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FAQ ═══════════ */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.faqTag} title={c.faqTitle} subtitle={c.faqSub} isRTL={isRTL} />
            </div>
            <div className="mx-auto max-w-3xl space-y-3">
              {faqData[lang].map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  data-delay={String(i * 50)}
                  className="overflow-hidden rounded-xl border border-line bg-white"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={clsx(
                      'flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-semibold transition-colors',
                      openFaq === i ? 'text-brand-600' : 'text-ink hover:text-brand-600',
                      isRTL && 'flex-row-reverse text-right',
                    )}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={16} className={clsx('flex-shrink-0 text-faint transition-transform duration-300', openFaq === i && 'rotate-180 text-brand-600')} />
                  </button>
                  <div className={clsx('grid transition-all duration-300', openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                    <div className="overflow-hidden">
                      <p className={clsx('border-t border-line px-6 py-4 text-sm leading-relaxed text-muted', isRTL && 'text-right')}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/admissions#faq" className={clsx('inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:gap-3 transition-all', isRTL && 'flex-row-reverse')}>
                {c.viewAllFaqs} <Arr size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ CTA BANNER ═══════════ */}
        <section className="dawn-hero relative overflow-hidden py-24 text-white">
          <div className="absolute inset-0 grid-faint opacity-40 pointer-events-none" />
          <div className="container-custom relative text-center">
            <div data-reveal="scale">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/75">
                {c.cta.tag}
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight text-balance md:text-5xl">
                <span className="block">{c.cta.h}</span>
                <span className="block text-accent-400">{c.cta.accent}</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-white/70">{c.cta.sub}</p>
              <Link href="/admissions" className="btn-secondary group mt-8 px-8 py-4 text-base">
                {c.cta.btn} <Arr size={17} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ CONTACT ═══════════ */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.contact.tag} title={c.contact.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {c.contact.items.map((item, i) => (
                <div
                  key={item.label}
                  data-reveal
                  data-delay={String(i * 100)}
                  className={clsx('card card-hover flex items-start gap-4 p-7', isRTL && 'flex-row-reverse text-right')}
                >
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
                    <item.icon size={20} />
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-faint">{item.label}</div>
                    <div className="mt-1 text-sm font-semibold leading-snug text-ink" dir={item.label === 'Phone' || item.label === 'هاتف' ? 'ltr' : undefined}>{item.value}</div>
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
