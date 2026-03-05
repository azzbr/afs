'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowRight, ArrowLeft, CheckCircle, BookOpen, Globe, Star, Sparkles, Trophy, Languages, Lightbulb } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Academics', title: 'A World-Class', titleAccent: 'Bilingual Education', subtitle: 'AFS combines the American curriculum with Bahrain MOE standards, delivering rigorous, engaging education from KG to Grade 5.' },
    programs: {
      tag: 'Our Programs', title: 'Three Pillars of Learning',
      items: [
        { grad: 'from-brand-blue via-blue-700 to-indigo-900', badge: 'Core', title: 'American Curriculum', icon: Star, desc: 'Internationally recognized standards with critical thinking, project-based learning, and creativity at the forefront.', features: ['English Language Arts', 'Mathematics', 'Science', 'Social Studies', 'Art & Music', 'Physical Education'] },
        { grad: 'from-amber-400 via-orange-500 to-red-600', badge: 'National', title: 'MOE Curriculum', icon: BookOpen, desc: 'Bahrain Ministry of Education curriculum ensuring deep Arabic fluency, Islamic studies, and strong national identity.', features: ['Arabic Language & Literature', 'Islamic Education', 'Social Studies (Arabic)', 'National Identity', 'Civic Values'] },
        { grad: 'from-emerald-400 via-teal-500 to-cyan-700', badge: 'Languages', title: 'Trilingual Program', icon: Globe, desc: 'Students immersed in Arabic, English, and French from an early age — building genuine multilingual competence.', features: ['English Immersion', 'Arabic as First Language', 'French from KG', 'Integrated Language Arts', 'Cultural Appreciation'] },
      ],
    },
    star360: {
      tag: 'Assessment', title: 'STAR 360 Assessment System',
      body: "AFS uses the Renaissance STAR 360 platform — a globally trusted, evidence-based adaptive assessment system. STAR measures students' reading, early literacy, and mathematics skills, providing real-time, actionable data for teachers and parents alike.",
      features: [
        { title: 'Adaptive Testing', desc: "Questions adjust to each student's level, providing accurate measurement regardless of ability." },
        { title: 'Real-Time Reports', desc: 'Instant insights into student progress, helping teachers personalise instruction immediately.' },
        { title: 'Parent Transparency', desc: "Parents receive clear, understandable reports on their child's academic standing." },
        { title: 'Growth Tracking', desc: 'Track progress across assessments to measure growth and identify areas needing support.' },
      ],
    },
    grades: {
      tag: 'Grade Structure', title: 'From KG to Grade 5',
      items: [
        { grade: 'KG1', age: '2y 9m+', desc: 'Play-based learning, early numeracy and literacy foundations.' },
        { grade: 'KG2', age: '3y 9m+', desc: 'Structured learning, language development, social skills.' },
        { grade: 'KG3', age: '4y 9m+', desc: 'Pre-reading, pre-writing, foundational math concepts.' },
        { grade: 'Grade 1', age: '5y 9m+', desc: 'Formal reading, writing, and mathematics.' },
        { grade: 'Grade 2', age: '6y 9m+', desc: 'Expanding literacy and numeracy skills.' },
        { grade: 'Grade 3', age: '7y 9m+', desc: 'Critical thinking introduced across subjects.' },
        { grade: 'Grade 4', age: '8y 9m+', desc: 'Advanced reading comprehension, problem-solving.' },
        { grade: 'Grade 5', age: '9y 9m+', desc: 'Preparation for middle school, independent learning.' },
      ],
    },
    cta: { title: 'Enroll Your Child Today', btn: 'Apply for Admission' },
    learnLabel: 'What Students Learn',
  },
  ar: {
    hero: { tag: 'الأكاديمية', title: 'تعليم ثنائي اللغة', titleAccent: 'عالمي المستوى', subtitle: 'تجمع الفجر بين المنهج الأمريكي ومعايير وزارة التربية البحرينية، لتقديم تعليم صارم وجذاب من الروضة حتى الصف الخامس.' },
    programs: {
      tag: 'برامجنا', title: 'ثلاثة ركائز للتعلم',
      items: [
        { grad: 'from-brand-blue via-blue-700 to-indigo-900', badge: 'الأساسي', title: 'المنهج الأمريكي', icon: Star, desc: 'معايير دولية معترف بها مع التفكير النقدي والتعلم القائم على المشاريع والإبداع.', features: ['اللغة الإنجليزية', 'الرياضيات', 'العلوم', 'الدراسات الاجتماعية', 'الفنون والموسيقى', 'التربية البدنية'] },
        { grad: 'from-amber-400 via-orange-500 to-red-600', badge: 'الوطني', title: 'منهج وزارة التربية', icon: BookOpen, desc: 'منهج وزارة التربية البحرينية لضمان إتقان اللغة العربية والتربية الإسلامية والهوية الوطنية.', features: ['اللغة العربية وآدابها', 'التربية الإسلامية', 'الدراسات الاجتماعية', 'الهوية الوطنية', 'القيم المدنية'] },
        { grad: 'from-emerald-400 via-teal-500 to-cyan-700', badge: 'اللغات', title: 'البرنامج ثلاثي اللغات', icon: Globe, desc: 'يتعمق الطلاب في العربية والإنجليزية والفرنسية منذ سن مبكرة لبناء كفاءة متعددة اللغات.', features: ['اللغة الإنجليزية', 'العربية كلغة أولى', 'الفرنسية منذ الروضة', 'فنون اللغة المتكاملة', 'التقدير الثقافي'] },
      ],
    },
    star360: {
      tag: 'التقييم', title: 'نظام تقييم STAR 360',
      body: 'تستخدم الفجر منصة Renaissance STAR 360 — نظام تقييم تكيفي قائم على الأدلة وموثوق به عالمياً. يقيس STAR مهارات القراءة ومحو الأمية المبكرة والرياضيات، ويوفر بيانات فورية للمعلمين والأهالي.',
      features: [
        { title: 'اختبار تكيفي', desc: 'تتكيف الأسئلة مع مستوى كل طالب لتوفير قياس دقيق.' },
        { title: 'تقارير فورية', desc: 'رؤى فورية حول تقدم الطالب تساعد المعلمين على تخصيص التدريس.' },
        { title: 'شفافية للوالدين', desc: 'يتلقى الوالدان تقارير واضحة ومفهومة عن المستوى الأكاديمي لطفلهم.' },
        { title: 'تتبع النمو', desc: 'تتبع التقدم عبر التقييمات لقياس النمو.' },
      ],
    },
    grades: {
      tag: 'هيكل الصفوف', title: 'من الروضة حتى الصف الخامس',
      items: [
        { grade: 'KG1', age: '+سنتان 9م', desc: 'التعلم القائم على اللعب وأسس الأرقام والكتابة المبكرة.' },
        { grade: 'KG2', age: '+ثلاث 9م', desc: 'التعلم المنظم وتنمية اللغة والمهارات الاجتماعية.' },
        { grade: 'KG3', age: '+أربع 9م', desc: 'مفاهيم القراءة والكتابة الأساسية.' },
        { grade: 'الصف 1', age: '+خمس 9م', desc: 'القراءة والكتابة والرياضيات الرسمية.' },
        { grade: 'الصف 2', age: '+ست 9م', desc: 'توسيع مهارات القراءة والحساب.' },
        { grade: 'الصف 3', age: '+سبع 9م', desc: 'التفكير النقدي في جميع المواد.' },
        { grade: 'الصف 4', age: '+ثماني 9م', desc: 'الفهم القرائي المتقدم وحل المشكلات.' },
        { grade: 'الصف 5', age: '+تسع 9م', desc: 'الاستعداد للمرحلة المتوسطة.' },
      ],
    },
    cta: { title: 'سجّل طفلك اليوم', btn: 'تقدم بطلب القبول' },
    learnLabel: 'ما ستتعلمه',
  },
}

const TAB_ICONS = [Trophy, BookOpen, Languages]

export default function AcademicsPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [activeProgram, setActiveProgram] = useState(0)
  const isRTL = lang === 'ar'
  const c = t[lang]
  const Arr = isRTL ? ArrowLeft : ArrowRight
  useScrollReveal()

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen">
      <Header lang={lang} onLangChange={setLang} />
      <main>

        {/* Hero */}
        <section className="mesh-bg noise relative overflow-hidden py-28 lg:py-36">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-float-slow absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-blue/20 blur-[110px]" />
            <div className="animate-pulse-glow absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-brand-gold/8 blur-[90px]" />
            <div className="absolute inset-0 dot-pattern opacity-25" />
          </div>
          <div className="container-custom relative z-10">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('flex mb-5 animate-bounce-in', isRTL && 'justify-end')}>
                <span className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 text-white/65 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                  <Sparkles size={11} className="text-brand-gold" />{c.hero.tag}
                </span>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white/92 animate-slide-up" style={{ animationDelay: '100ms' }}>{c.hero.title}</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-gradient-gold text-glow animate-slide-up" style={{ animationDelay: '250ms' }}>{c.hero.titleAccent}</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '400ms' }}>{c.hero.subtitle}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 70" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 70L1440 70L1440 25C1250 65 980 5 720 32C460 59 200 5 0 28L0 70Z" />
            </svg>
          </div>
        </section>

        {/* Programs — tabbed */}
        <section id="programs" className="section-padding relative overflow-hidden" style={{ background: '#030712' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/10 blur-[120px] rounded-full" />
            <div className="absolute inset-0 dot-pattern opacity-18" />
          </div>
          <div className="container-custom relative z-10">
            <div className={clsx('mb-10', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-5 py-1.5 text-white/55 text-xs font-bold tracking-widest uppercase mb-4 mr-0">{c.programs.tag}</span>
              <h2 className={clsx('section-title-white', !isRTL && 'font-playfair')}>{c.programs.title}</h2>
            </div>

            {/* Tab buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-10" data-reveal="fade">
              {c.programs.items.map((prog, i) => {
                const TabIcon = TAB_ICONS[i]
                const activeGradients = ['bg-gradient-to-r from-brand-blue to-blue-700', 'bg-gradient-to-r from-amber-400 to-orange-500', 'bg-gradient-to-r from-emerald-400 to-teal-600']
                return (
                  <button
                    key={prog.title}
                    onClick={() => setActiveProgram(i)}
                    className={clsx(
                      'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                      activeProgram === i
                        ? clsx('text-white shadow-lg scale-105', activeGradients[i])
                        : 'bg-white/8 border border-white/15 text-white/60 hover:bg-white/15 hover:text-white',
                    )}
                  >
                    <TabIcon size={13} />
                    {prog.badge}
                  </button>
                )
              })}
            </div>

            {/* Active panel */}
            {c.programs.items.map((prog, i) => (
              <div key={prog.title} className={clsx('transition-all duration-400', activeProgram === i ? 'block' : 'hidden')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Visual card */}
                  <div className={clsx('relative rounded-3xl overflow-hidden min-h-[280px] flex flex-col justify-end p-8 bg-gradient-to-br', prog.grad)} data-reveal="left">
                    <div className="animate-spin-slow absolute -top-16 -right-16 w-56 h-56 rounded-full border border-white/8 pointer-events-none" />
                    <div className="animate-spin-slow absolute bottom-0 -left-8 w-32 h-32 rounded-full border border-white/8 pointer-events-none" style={{ animationDirection: 'reverse' }} />
                    <span className="text-xs font-bold bg-white/15 rounded-full px-3 py-1 text-white/85 border border-white/20 self-start mb-4">{prog.badge}</span>
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-4 border border-white/20">
                      <prog.icon size={22} className="text-white" />
                    </div>
                    <h3 className={clsx('text-2xl font-bold text-white mb-2', !isRTL && 'font-playfair')}>{prog.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{prog.desc}</p>
                  </div>
                  {/* Features list */}
                  <div className="rounded-3xl bg-white/5 border border-white/10 p-8" data-reveal="right">
                    <div className={clsx('flex items-center gap-2 mb-6', isRTL && 'flex-row-reverse')}>
                      <Lightbulb size={16} className="text-brand-gold" />
                      <h4 className="text-white/80 text-sm font-bold uppercase tracking-wider">{c.learnLabel}</h4>
                    </div>
                    <ul className="space-y-3">
                      {prog.features.map((f) => (
                        <li key={f} className={clsx('flex items-center gap-3 text-sm text-white/70', isRTL && 'flex-row-reverse')}>
                          <CheckCircle size={14} className="text-brand-gold flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STAR 360 */}
        <section id="star360" className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-blue/3 rounded-full blur-3xl pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className={clsx(isRTL && 'text-right')} data-reveal="left">
                <span className="section-tag">{c.star360.tag}</span>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.star360.title}</h2>
                <p className="text-neutral-600 leading-relaxed">{c.star360.body}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-reveal="right">
                {c.star360.features.map((f, i) => (
                  <div
                    key={f.title}
                    data-reveal="scale"
                    data-delay={String(i * 100)}
                    className={clsx('group relative rounded-2xl p-5 bg-white border border-neutral-100 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(0,40,255,0.08)] transition-all duration-400 hover:-translate-y-1 overflow-hidden', isRTL && 'text-right')}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <BookOpen size={15} className="text-brand-blue" />
                    </div>
                    <h4 className="font-bold text-neutral-900 text-sm mb-1">{f.title}</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Grades */}
        <section id="grades" className="section-padding bg-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
          <div className="container-custom relative z-10">
            <div className={clsx('mb-10', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <span className="section-tag mx-auto">{c.grades.tag}</span>
              <h2 className={clsx('section-title mx-auto', !isRTL && 'font-playfair')}>{c.grades.title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {c.grades.items.map(({ grade, age, desc }, i) => (
                <div
                  key={grade}
                  data-reveal="scale"
                  data-delay={String(i * 60)}
                  className={clsx('group relative rounded-2xl p-5 bg-white border border-neutral-100 hover:border-brand-blue/25 hover:shadow-[0_12px_40px_rgba(0,40,255,0.07)] transition-all duration-400 hover:-translate-y-1 overflow-hidden', isRTL && 'text-right')}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="font-bold text-brand-blue text-sm mb-1">{grade}</div>
                  <div className="text-xs text-neutral-400 font-medium mb-2">{age}</div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mesh-bg noise relative overflow-hidden py-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-pulse-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/18 blur-[100px] rounded-full" />
            <div className="absolute inset-0 dot-pattern opacity-18" />
          </div>
          <div className="container-custom relative z-10 text-center" data-reveal="scale">
            <h2 className={clsx('text-3xl md:text-4xl font-bold text-white mb-8', !isRTL && 'font-playfair')}>{c.cta.title}</h2>
            <Link href="/admissions" className="shimmer-btn inline-flex items-center gap-2 px-9 py-4 bg-brand-gold text-neutral-900 font-bold rounded-2xl text-sm hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-all duration-300 hover:-translate-y-1">
              {c.cta.btn} <Arr size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}