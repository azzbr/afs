'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { ArrowRight, ArrowLeft, CheckCircle, BookOpen, Globe, Star, Trophy, Languages, Lightbulb } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Academics', title: 'A World-Class', titleAccent: 'Bilingual Education', subtitle: 'AFS combines the American curriculum with Bahrain MOE standards, delivering rigorous, engaging education from KG to Grade 5.' },
    programs: {
      tag: 'Our Programs', title: 'Three Pillars of Learning',
      items: [
        { badge: 'Core', title: 'American Curriculum', icon: Star, desc: 'Internationally recognized standards with critical thinking, project-based learning, and creativity at the forefront.', features: ['English Language Arts', 'Mathematics', 'Science', 'Social Studies', 'Art & Music', 'Physical Education'] },
        { badge: 'National', title: 'MOE Curriculum', icon: BookOpen, desc: 'Bahrain Ministry of Education curriculum ensuring deep Arabic fluency, Islamic studies, and strong national identity.', features: ['Arabic Language & Literature', 'Islamic Education', 'Social Studies (Arabic)', 'National Identity', 'Civic Values'] },
        { badge: 'Languages', title: 'Trilingual Program', icon: Globe, desc: 'Students immersed in Arabic, English, and French from an early age — building genuine multilingual competence.', features: ['English Immersion', 'Arabic as First Language', 'French from KG', 'Integrated Language Arts', 'Cultural Appreciation'] },
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
    kg: {
      tag: 'Early Childhood', title: 'Our Kindergarten Programs',
      subtitle: "AFS offers three KG levels designed to provide a warm, structured, and stimulating start to every child's educational journey.",
      items: [
        { grade: 'KG1', age: '2y 9m+', desc: 'Play-based exploration, sensory learning, and early social development in a nurturing environment.' },
        { grade: 'KG2', age: '3y 9m+', desc: 'Structured activities, early phonics, number sense, and building independence through guided play.' },
        { grade: 'KG3', age: '4y 9m+', desc: 'Pre-academic foundations: reading readiness, writing, mathematics, and bilingual immersion.' },
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
        { badge: 'الأساسي', title: 'المنهج الأمريكي', icon: Star, desc: 'معايير دولية معترف بها مع التفكير النقدي والتعلم القائم على المشاريع والإبداع.', features: ['اللغة الإنجليزية', 'الرياضيات', 'العلوم', 'الدراسات الاجتماعية', 'الفنون والموسيقى', 'التربية البدنية'] },
        { badge: 'الوطني', title: 'منهج وزارة التربية', icon: BookOpen, desc: 'منهج وزارة التربية البحرينية لضمان إتقان اللغة العربية والتربية الإسلامية والهوية الوطنية.', features: ['اللغة العربية وآدابها', 'التربية الإسلامية', 'الدراسات الاجتماعية', 'الهوية الوطنية', 'القيم المدنية'] },
        { badge: 'اللغات', title: 'البرنامج ثلاثي اللغات', icon: Globe, desc: 'يتعمق الطلاب في العربية والإنجليزية والفرنسية منذ سن مبكرة لبناء كفاءة متعددة اللغات.', features: ['اللغة الإنجليزية', 'العربية كلغة أولى', 'الفرنسية منذ الروضة', 'فنون اللغة المتكاملة', 'التقدير الثقافي'] },
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
    kg: {
      tag: 'الطفولة المبكرة', title: 'برامج رياض الأطفال',
      subtitle: 'تقدم الفجر ثلاثة مستويات للروضة مصممة لتوفير بداية دافئة ومنظمة ومحفزة لكل طفل.',
      items: [
        { grade: 'KG1', age: '+سنتان 9م', desc: 'استكشاف قائم على اللعب وتعلم حسي وتنمية اجتماعية مبكرة في بيئة حنونة.' },
        { grade: 'KG2', age: '+ثلاث 9م', desc: 'أنشطة منظمة وصوتيات مبكرة وحس الأرقام وبناء الاستقلالية من خلال اللعب الموجّه.' },
        { grade: 'KG3', age: '+أربع 9م', desc: 'أسس ما قبل الأكاديمية: الاستعداد للقراءة والكتابة والرياضيات والانغماس ثنائي اللغة.' },
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

        {/* ── Hero ── */}
        <section className="hero-dark py-28 lg:py-36">
          <div className="container-custom">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('mb-5', isRTL ? 'text-right' : '')}>
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>
                  {c.hero.tag}
                </div>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-5', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-white">{c.hero.title}</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-[var(--brand-gold)]">{c.hero.titleAccent}</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed">{c.hero.subtitle}</p>
            </div>
          </div>
        </section>

        {/* ── Programs — tabbed ── */}
        <section id="programs" className="section-dark section-padding">
          <div className="container-custom">
            <div className={clsx('mb-10', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className="text-center">
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.programs.tag}</div>
              </div>
              <h2 className={clsx('section-title-white', !isRTL && 'font-playfair')}>{c.programs.title}</h2>
            </div>

            {/* Tab buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-10" data-reveal="fade">
              {c.programs.items.map((prog, i) => {
                const TabIcon = TAB_ICONS[i]
                return (
                  <button
                    key={prog.title}
                    onClick={() => setActiveProgram(i)}
                    className={clsx(
                      'inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300',
                      activeProgram === i
                        ? 'bg-[var(--brand-navy)] border border-[var(--brand-gold)]/40 text-[var(--brand-gold)] shadow-lg scale-105'
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
                  <div
                    className={clsx('relative min-h-[280px] flex flex-col justify-end p-8 bg-[var(--brand-navy)] border border-white/10', isRTL && 'text-right')}
                    data-reveal="left"
                  >
                    <div className="border border-[var(--brand-gold)]/40 text-[var(--brand-gold)] text-[10px] uppercase tracking-widest px-3 py-1 self-start mb-4">
                      {prog.badge}
                    </div>
                    <div className="w-12 h-12 bg-[var(--brand-gold)]/10 border border-[var(--brand-gold)]/20 flex items-center justify-center mb-4">
                      <prog.icon size={22} className="text-[var(--brand-gold)]" />
                    </div>
                    <h3 className={clsx('text-2xl font-bold text-white mb-2', !isRTL && 'font-playfair')}>{prog.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{prog.desc}</p>
                  </div>
                  {/* Features list */}
                  <div className="bg-white/5 border border-white/10 p-8" data-reveal="right">
                    <div className={clsx('flex items-center gap-2 mb-6', isRTL && 'flex-row-reverse')}>
                      <Lightbulb size={16} className="text-[var(--brand-gold)]" />
                      <h4 className="text-white/80 text-sm font-bold uppercase tracking-wider">{c.learnLabel}</h4>
                    </div>
                    <ul className="space-y-3">
                      {prog.features.map((f) => (
                        <li key={f} className={clsx('flex items-center gap-3 text-sm text-white/70', isRTL && 'flex-row-reverse')}>
                          <CheckCircle size={14} className="text-[var(--brand-gold)] flex-shrink-0" />
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

        {/* ── STAR 360 ── */}
        <section id="star360" className="section-cream section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className={clsx(isRTL && 'text-right')} data-reveal="left">
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.star360.tag}</div>
                <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.star360.title}</h2>
                <p className="text-neutral-600 leading-relaxed">{c.star360.body}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-reveal="right">
                {c.star360.features.map((f, i) => (
                  <div
                    key={f.title}
                    data-reveal="scale"
                    data-delay={String(i * 100)}
                    className={clsx('group p-5 bg-white border border-[var(--border)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all', isRTL && 'text-right')}
                  >
                    <div className="w-9 h-9 bg-[var(--brand-navy)] flex items-center justify-center mb-3">
                      <BookOpen size={15} className="text-white" />
                    </div>
                    <h4 className="font-bold text-neutral-900 text-sm mb-1">{f.title}</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── KG Programs ── */}
        <section id="kg" className="section-padding bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className="text-center">
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.kg.tag}</div>
              </div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.kg.title}</h2>
              <p className="section-subtitle text-center">{c.kg.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.kg.items.map((item, i) => (
                <div
                  key={item.grade}
                  data-reveal="scale"
                  data-delay={String(i * 100)}
                  className="group hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 border border-[var(--border)]"
                >
                  {/* Navy header */}
                  <div className="relative h-40 bg-[var(--brand-navy)] flex items-center justify-center">
                    <span className={clsx('text-3xl font-bold text-[var(--brand-gold)]', !isRTL && 'font-playfair')}>{item.grade}</span>
                  </div>
                  <div className={clsx('p-6 bg-white', isRTL && 'text-right')}>
                    <div className={clsx('flex items-center gap-2 mb-2 flex-wrap', isRTL && 'flex-row-reverse')}>
                      <span className="text-lg font-bold font-playfair text-neutral-900">{item.grade}</span>
                      <span className="text-xs text-neutral-400 font-medium">{item.age}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Grades ── */}
        <section id="grades" className="section-cream section-padding">
          <div className="container-custom">
            <div className={clsx('mb-10', isRTL ? 'text-right' : 'text-center')} data-reveal="fade">
              <div className="text-center">
                <div className={clsx('section-tag', isRTL && 'flex-row-reverse')}>{c.grades.tag}</div>
              </div>
              <h2 className={clsx('section-title', !isRTL && 'font-playfair')}>{c.grades.title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {c.grades.items.map(({ grade, age, desc }, i) => {
                const isKG = grade.startsWith('KG') || grade === 'KG1' || grade === 'KG2' || grade === 'KG3'
                return (
                  <div
                    key={grade}
                    data-reveal="scale"
                    data-delay={String(i * 60)}
                    className={clsx(
                      'group p-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all',
                      isKG
                        ? 'bg-[var(--brand-navy)] border border-white/10'
                        : 'bg-white border border-[var(--border)]',
                      isRTL && 'text-right',
                    )}
                  >
                    <div className={clsx('font-bold text-sm mb-1', isKG ? 'text-[var(--brand-gold)]' : 'text-[var(--brand-navy)]')}>{grade}</div>
                    <div className={clsx('text-xs font-medium mb-2', isKG ? 'text-white/50' : 'text-neutral-400')}>{age}</div>
                    <p className={clsx('text-xs leading-relaxed', isKG ? 'text-white/65' : 'text-neutral-500')}>{desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="hero-dark py-24">
          <div className="container-custom text-center" data-reveal="scale">
            <h2 className={clsx('text-3xl md:text-4xl font-bold text-white mb-8', !isRTL && 'font-playfair')}>{c.cta.title}</h2>
            <Link href="/admissions" className="btn-primary inline-flex items-center gap-2">
              {c.cta.btn} <Arr size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
