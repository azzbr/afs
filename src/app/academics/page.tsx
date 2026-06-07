'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import MediaPlaceholder from '@/components/MediaPlaceholder/MediaPlaceholder'
import { ArrowRight, ArrowLeft, CheckCircle, BookOpen, Globe, Star, Trophy, Languages, Lightbulb, Sprout, Rocket } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Academics', title: 'A World-Class Bilingual Education', subtitle: 'AFS combines the American curriculum with Bahrain MOE standards, delivering rigorous, engaging education from KG to Grade 5.' },
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
        { grade: 'KG1', age: '2y 9m+', icon: Sprout, tone: 'soft' as const, desc: 'Play-based exploration, sensory learning, and early social development in a nurturing environment.' },
        { grade: 'KG2', age: '3y 9m+', icon: Star, tone: 'accent' as const, desc: 'Structured activities, early phonics, number sense, and building independence through guided play.' },
        { grade: 'KG3', age: '4y 9m+', icon: Rocket, tone: 'blue' as const, desc: 'Pre-academic foundations: reading readiness, writing, mathematics, and bilingual immersion.' },
      ],
    },
    cta: { title: 'Enroll Your Child Today', btn: 'Apply for Admission' },
    learnLabel: 'What Students Learn',
  },
  ar: {
    hero: { tag: 'الأكاديمية', title: 'تعليم ثنائي اللغة عالمي المستوى', subtitle: 'تجمع الفجر بين المنهج الأمريكي ومعايير وزارة التربية البحرينية، لتقديم تعليم صارم وجذاب من الروضة حتى الصف الخامس.' },
    programs: {
      tag: 'برامجنا', title: 'ثلاث ركائز للتعلم',
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
        { grade: 'KG1', age: '+سنتان 9م', icon: Sprout, tone: 'soft' as const, desc: 'استكشاف قائم على اللعب وتعلم حسي وتنمية اجتماعية مبكرة في بيئة حنونة.' },
        { grade: 'KG2', age: '+ثلاث 9م', icon: Star, tone: 'accent' as const, desc: 'أنشطة منظمة وصوتيات مبكرة وحس الأرقام وبناء الاستقلالية من خلال اللعب الموجّه.' },
        { grade: 'KG3', age: '+أربع 9م', icon: Rocket, tone: 'blue' as const, desc: 'أسس ما قبل الأكاديمية: الاستعداد للقراءة والكتابة والرياضيات والانغماس ثنائي اللغة.' },
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
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-canvas">
      <Header lang={lang} onLangChange={setLang} />
      <main>
        <PageHero tag={c.hero.tag} title={c.hero.title} subtitle={c.hero.subtitle} isRTL={isRTL} align="left" />

        {/* Programs — tabbed (dark section) */}
        <section id="programs" className="section-padding bg-brand-800 text-white">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-10">
              <SectionHeading tag={c.programs.tag} title={c.programs.title} isRTL={isRTL} light />
            </div>

            <div data-reveal="fade" className="mb-10 flex flex-wrap justify-center gap-2">
              {c.programs.items.map((prog, i) => {
                const TabIcon = TAB_ICONS[i]
                return (
                  <button
                    key={prog.title}
                    onClick={() => setActiveProgram(i)}
                    className={clsx(
                      'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
                      activeProgram === i
                        ? 'bg-brand-600 text-white'
                        : 'border border-white/15 bg-white/5 text-white/65 hover:bg-white/10 hover:text-white',
                    )}
                  >
                    <TabIcon size={13} />
                    {prog.badge}
                  </button>
                )
              })}
            </div>

            {c.programs.items.map((prog, i) => (
              <div key={prog.title} className={activeProgram === i ? 'block' : 'hidden'}>
                <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
                  {/* Visual card */}
                  <div className={clsx('flex min-h-[280px] flex-col justify-end rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8', isRTL && 'text-right')}>
                    <span className="mb-4 self-start rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white/85">{prog.badge}</span>
                    <span className={clsx('grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white/10 text-white', isRTL && 'self-end')}>
                      <prog.icon size={22} />
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-bold text-white">{prog.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{prog.desc}</p>
                  </div>
                  {/* Features */}
                  <div className={clsx('rounded-2xl border border-white/10 bg-white/5 p-8', isRTL && 'text-right')}>
                    <div className={clsx('mb-6 flex items-center gap-2', isRTL && 'flex-row-reverse')}>
                      <Lightbulb size={16} className="text-accent-400" />
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white/80">{c.learnLabel}</h4>
                    </div>
                    <ul className="space-y-3">
                      {prog.features.map((f) => (
                        <li key={f} className={clsx('flex items-center gap-3 text-sm text-white/75', isRTL && 'flex-row-reverse')}>
                          <CheckCircle size={15} className="flex-shrink-0 text-accent-400" />
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
        <section id="star360" className="section-padding bg-canvas">
          <div className="container-custom">
            <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
              <div data-reveal="left">
                <SectionHeading tag={c.star360.tag} title={c.star360.title} align="left" isRTL={isRTL} className="mb-4" />
                <p className="leading-relaxed text-muted">{c.star360.body}</p>
              </div>
              <div data-reveal="right" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {c.star360.features.map((f, i) => (
                  <div key={f.title} data-reveal="scale" data-delay={String(i * 80)} className={clsx('card card-hover p-5', isRTL && 'text-right')}>
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
                      <BookOpen size={15} />
                    </span>
                    <h4 className="mb-1 mt-3 text-sm font-semibold text-ink">{f.title}</h4>
                    <p className="text-xs leading-relaxed text-muted">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KG Programs */}
        <section id="kg" className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading tag={c.kg.tag} title={c.kg.title} subtitle={c.kg.subtitle} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {c.kg.items.map((item, i) => (
                <div key={item.grade} data-reveal="scale" data-delay={String(i * 90)} className="card card-hover overflow-hidden">
                  <MediaPlaceholder aspect="16/9" tone={item.tone} icon={item.icon} rounded="rounded-none" />
                  <div className={clsx('p-6', isRTL && 'text-right')}>
                    <div className={clsx('mb-2 flex flex-wrap items-center gap-2', isRTL && 'flex-row-reverse justify-end')}>
                      <span className="font-display text-lg font-bold text-ink">{item.grade}</span>
                      <span className="text-xs font-medium text-faint">{item.age}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grades */}
        <section id="grades" className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-10">
              <SectionHeading tag={c.grades.tag} title={c.grades.title} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {c.grades.items.map(({ grade, age, desc }, i) => (
                <div key={grade} data-reveal="scale" data-delay={String(i * 50)} className={clsx('card card-hover p-5', isRTL && 'text-right')}>
                  <div className="text-sm font-bold text-brand-600">{grade}</div>
                  <div className="mb-2 text-xs font-medium text-faint">{age}</div>
                  <p className="text-xs leading-relaxed text-muted">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="dawn-hero relative overflow-hidden py-20 text-white">
          <div className="absolute inset-0 grid-faint opacity-40 pointer-events-none" />
          <div data-reveal="scale" className="container-custom relative text-center">
            <h2 className="mb-8 font-display text-3xl font-bold md:text-4xl">{c.cta.title}</h2>
            <Link href="/admissions" className="btn-secondary px-9 py-4">
              {c.cta.btn} <Arr size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
