'use client'

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import PageHero from '@/components/PageHero/PageHero'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import MediaPlaceholder from '@/components/MediaPlaceholder/MediaPlaceholder'
import { Mail, Phone, Award, BookOpen, Globe, GraduationCap, User } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const content = {
  en: {
    hero: { badge: 'Our People', title: 'Meet Our Dedicated Team', subtitle: 'Our educators bring passion, expertise, and care to every classroom — shaping curious minds and confident hearts.' },
    stats: [
      { value: '35+', label: 'Qualified Teachers' },
      { value: '12+', label: 'Years Avg. Experience' },
      { value: '8', label: 'Nationalities' },
      { value: '100%', label: 'Certified Educators' },
    ],
    leadership: { title: 'School Leadership', subtitle: 'Guiding our school with vision and care' },
    faculty: { title: 'Our Faculty', subtitle: 'Expert educators across every grade and subject' },
    departments: { title: 'Academic Departments', subtitle: 'Specialized teams delivering excellence' },
    join: { title: 'Join Our Team', subtitle: "We're always looking for passionate educators who want to make a difference.", cta: 'View Open Positions', email: 'careers@afs.edu.bh' },
    contact: 'Contact',
  },
  ar: {
    hero: { badge: 'فريقنا', title: 'تعرف على فريقنا المتميز', subtitle: 'يجلب معلمونا الشغف والخبرة والاهتمام إلى كل فصل دراسي — يشكّلون عقولاً فضولية وقلوباً واثقة.' },
    stats: [
      { value: '٣٥+', label: 'معلم مؤهل' },
      { value: '١٢+', label: 'سنة خبرة متوسطة' },
      { value: '٨', label: 'جنسيات' },
      { value: '١٠٠٪', label: 'مربون معتمدون' },
    ],
    leadership: { title: 'قيادة المدرسة', subtitle: 'توجيه مدرستنا برؤية واهتمام' },
    faculty: { title: 'هيئة التدريس', subtitle: 'معلمون متخصصون في جميع المراحل والمواد' },
    departments: { title: 'الأقسام الأكاديمية', subtitle: 'فرق متخصصة تقدم التميز' },
    join: { title: 'انضم إلى فريقنا', subtitle: 'نحن نبحث دائماً عن معلمين متحمسين يريدون إحداث فرق.', cta: 'عرض الوظائف المتاحة', email: 'careers@afs.edu.bh' },
    contact: 'تواصل',
  },
}

const leadership = [
  {
    name: { en: 'Ms. Fatima Al-Mannai', ar: 'الأستاذة فاطمة المناعي' },
    role: { en: 'School Principal', ar: 'مديرة المدرسة' },
    bio: {
      en: 'With over 20 years in education, Ms. Al-Mannai leads Al Fajer with a deep commitment to bilingual excellence, student well-being, and community partnership. She holds an M.Ed. from the University of Bahrain.',
      ar: 'بخبرة تمتد لأكثر من 20 عامًا في التعليم، تقود الأستاذة المناعي الفجر بالتزام عميق بالتميز ثنائي اللغة ورفاهية الطلاب وشراكة المجتمع. تحمل درجة الماجستير من جامعة البحرين.',
    },
    quals: ['M.Ed. University of Bahrain', 'Cambridge Leadership Certificate', 'MOE Certified Principal'],
    email: 'principal@afs.edu.bh',
  },
  {
    name: { en: 'Mr. Khalid Al-Rashid', ar: 'الأستاذ خالد الراشد' },
    role: { en: 'Vice Principal – Academics', ar: 'نائب المدير – الشؤون الأكاديمية' },
    bio: {
      en: 'Mr. Al-Rashid oversees curriculum development, teacher professional development, and academic assessment across all grade levels. He is a certified STAR 360 coordinator.',
      ar: 'يشرف الأستاذ الراشد على تطوير المناهج والتطوير المهني للمعلمين والتقييم الأكاديمي في جميع المراحل الدراسية. وهو منسق معتمد لـ STAR 360.',
    },
    quals: ['B.Ed. American University of Beirut', 'STAR 360 Coordinator', 'IB Trained'],
    email: 'vp.academics@afs.edu.bh',
  },
  {
    name: { en: 'Ms. Sara Hussain', ar: 'الأستاذة سارة حسين' },
    role: { en: 'Head of Student Affairs', ar: 'رئيسة شؤون الطلاب' },
    bio: {
      en: "Ms. Hussain champions student well-being, behavior support, and extracurricular activities. She coordinates the school's counseling program and parent communication.",
      ar: 'تدعم الأستاذة حسين رفاهية الطلاب والدعم السلوكي والأنشطة اللاصفية. تنسق برنامج الإرشاد المدرسي والتواصل مع أولياء الأمور.',
    },
    quals: ['B.Sc. Psychology, UOB', 'School Counselor Certificate', 'Child Safeguarding Trained'],
    email: 'student.affairs@afs.edu.bh',
  },
]

const faculty = [
  { name: { en: 'Ms. Aisha Noor', ar: 'أعيشة نور' }, role: { en: 'KG1 & KG2 Lead Teacher', ar: 'معلمة أولى — KG1 و KG2' }, subject: { en: 'Early Childhood', ar: 'الطفولة المبكرة' }, exp: '9 yrs', lang: 'EN / AR' },
  { name: { en: 'Mr. James Doyle', ar: 'جيمس دويل' }, role: { en: 'Grade 1–2 English Teacher', ar: 'معلم إنجليزي — الصف ١–٢' }, subject: { en: 'English Language Arts', ar: 'اللغة الإنجليزية' }, exp: '11 yrs', lang: 'EN' },
  { name: { en: 'Ms. Mona Al-Zayani', ar: 'منى الزياني' }, role: { en: 'Arabic & Islamic Studies', ar: 'اللغة العربية والتربية الإسلامية' }, subject: { en: 'Arabic / Islamic', ar: 'عربي / إسلامية' }, exp: '14 yrs', lang: 'AR' },
  { name: { en: 'Mr. Yusuf Karimi', ar: 'يوسف كريمي' }, role: { en: 'Mathematics Lead — Gr. 3–5', ar: 'معلم الرياضيات — الصف ٣–٥' }, subject: { en: 'Mathematics', ar: 'الرياضيات' }, exp: '8 yrs', lang: 'EN / AR' },
  { name: { en: 'Ms. Priya Sharma', ar: 'بريا شارما' }, role: { en: 'Science Teacher — Gr. 1–5', ar: 'معلمة العلوم — الصف ١–٥' }, subject: { en: 'Science', ar: 'العلوم' }, exp: '7 yrs', lang: 'EN' },
  { name: { en: 'Mr. Hassan Al-Qassim', ar: 'حسن القاسم' }, role: { en: 'Social Studies & Civics', ar: 'الدراسات الاجتماعية' }, subject: { en: 'Social Studies', ar: 'اجتماعيات' }, exp: '10 yrs', lang: 'AR / EN' },
  { name: { en: 'Ms. Lena Fischer', ar: 'لينا فيشر' }, role: { en: 'Art & Design Teacher', ar: 'معلمة الفنون والتصميم' }, subject: { en: 'Visual Arts', ar: 'الفنون البصرية' }, exp: '6 yrs', lang: 'EN' },
  { name: { en: 'Mr. Ahmed Al-Balooshi', ar: 'أحمد البلوشي' }, role: { en: 'Physical Education', ar: 'التربية البدنية' }, subject: { en: 'P.E. & Sports', ar: 'التربية البدنية والرياضة' }, exp: '12 yrs', lang: 'AR / EN' },
  { name: { en: 'Ms. Nadia Karim', ar: 'نادية كريم' }, role: { en: 'Music & Performing Arts', ar: 'الموسيقى والفنون الأدائية' }, subject: { en: 'Music', ar: 'الموسيقى' }, exp: '5 yrs', lang: 'EN' },
]

const departments = [
  { icon: BookOpen, name: { en: 'English Language Arts', ar: 'اللغة الإنجليزية' }, desc: { en: 'Reading, writing, phonics, and communication — building strong English foundations from KG through Grade 5.', ar: 'القراءة والكتابة وتأسيس لغوي قوي من الروضة حتى الصف الخامس.' }, count: { en: '5 teachers', ar: '٥ معلمين' } },
  { icon: Globe, name: { en: 'Arabic & Islamic Studies', ar: 'العربية والإسلامية' }, desc: { en: 'MOE-aligned Arabic language and Islamic education, with dedicated native-speaker teachers for all grades.', ar: 'تعليم عربي وإسلامي متوافق مع وزارة التربية، مع معلمين متحدثين بالعربية لجميع الصفوف.' }, count: { en: '4 teachers', ar: '٤ معلمين' } },
  { icon: Award, name: { en: 'Mathematics', ar: 'الرياضيات' }, desc: { en: 'Singapore Math-influenced curriculum building number sense, problem-solving, and mathematical thinking.', ar: 'منهج رياضيات مستوحى من سنغافورة يبني الإحساس بالأرقام وحل المشكلات والتفكير الرياضي.' }, count: { en: '4 teachers', ar: '٤ معلمين' } },
  { icon: GraduationCap, name: { en: 'Science & Technology', ar: 'العلوم والتكنولوجيا' }, desc: { en: 'Hands-on inquiry-based learning with dedicated lab time, coding basics, and STEM integration from Grade 1.', ar: 'تعلم قائم على الاستفسار مع وقت مخبري وأسس البرمجة وتكامل STEM من الصف الأول.' }, count: { en: '3 teachers', ar: '٣ معلمين' } },
]

export default function StaffPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const t = content[lang]
  const isRTL = lang === 'ar'
  useScrollReveal()

  return (
    <div className="flex min-h-screen flex-col bg-canvas" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1">
        <PageHero tag={t.hero.badge} title={t.hero.title} subtitle={t.hero.subtitle} isRTL={isRTL} />

        {/* Stats */}
        <section className="border-b border-line bg-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {t.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-brand-600">{s.value}</div>
                  <div className="mt-1 text-sm text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading title={t.leadership.title} subtitle={t.leadership.subtitle} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {leadership.map((person, i) => (
                <div key={person.email} data-reveal data-delay={String(i * 100)} className="card card-hover overflow-hidden">
                  <MediaPlaceholder aspect="4/3" tone="navy" icon={User} rounded="rounded-none" />
                  <div className={clsx('p-6', isRTL && 'text-right')}>
                    <h3 className="font-display text-lg font-bold text-ink">{person.name[lang]}</h3>
                    <p className="mb-3 text-sm font-medium text-brand-600">{person.role[lang]}</p>
                    <p className="mb-4 text-sm leading-relaxed text-muted">{person.bio[lang]}</p>
                    <ul className="mb-5 space-y-1">
                      {person.quals.map((q) => (
                        <li key={q} className={clsx('flex items-center gap-2 text-xs text-muted', isRTL && 'flex-row-reverse')}>
                          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-400" />
                          {q}
                        </li>
                      ))}
                    </ul>
                    <a href={`mailto:${person.email}`} className={clsx('inline-flex items-center gap-2 text-xs font-semibold text-brand-600 hover:text-brand-700', isRTL && 'flex-row-reverse')}>
                      <Mail size={13} />{t.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="section-padding dawn-soft">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading title={t.departments.title} subtitle={t.departments.subtitle} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {departments.map((dep, i) => {
                const Icon = dep.icon
                return (
                  <div key={dep.name.en} data-reveal data-delay={String(i * 80)} className={clsx('card flex gap-4 p-6', isRTL && 'flex-row-reverse')}>
                    <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon size={22} />
                    </span>
                    <div className={clsx(isRTL && 'text-right')}>
                      <div className={clsx('mb-1 flex flex-wrap items-center gap-2', isRTL && 'flex-row-reverse')}>
                        <h3 className="font-semibold text-ink">{dep.name[lang]}</h3>
                        <span className="text-xs font-medium text-faint">{dep.count[lang]}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted">{dep.desc[lang]}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Faculty */}
        <section className="section-padding bg-canvas">
          <div className="container-custom">
            <div data-reveal="fade" className="mb-12">
              <SectionHeading title={t.faculty.title} subtitle={t.faculty.subtitle} isRTL={isRTL} />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {faculty.map((member, i) => (
                <div key={member.name.en} data-reveal data-delay={String((i % 3) * 80)} className={clsx('card card-hover flex gap-4 p-5', isRTL && 'flex-row-reverse')}>
                  <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-brand-50 font-display text-sm font-bold text-brand-600">
                    {member.name.en.split(' ').filter(w => w !== 'Ms.' && w !== 'Mr.').map((n) => n[0]).slice(0, 2).join('')}
                  </span>
                  <div className={clsx('min-w-0 flex-1', isRTL && 'text-right')}>
                    <h3 className="text-sm font-semibold leading-tight text-ink">{member.name[lang]}</h3>
                    <p className="mt-0.5 text-xs font-medium text-brand-600">{member.role[lang]}</p>
                    <div className={clsx('mt-2 flex flex-wrap items-center gap-3', isRTL && 'flex-row-reverse')}>
                      <span className="inline-flex items-center gap-1 text-xs text-muted"><BookOpen size={10} />{member.subject[lang]}</span>
                      <span className="text-xs text-faint">{member.exp}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-faint"><Globe size={10} />{member.lang}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="bg-brand-700 py-20 text-white">
          <div className="container-custom text-center">
            <h2 className="mb-3 font-display text-3xl font-bold">{t.join.title}</h2>
            <p className="mx-auto mb-8 max-w-xl text-white/70">{t.join.subtitle}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={`mailto:${t.join.email}`} className="btn-secondary px-8 py-3.5">
                <Mail size={16} />{t.join.cta}
              </a>
              <a href={`mailto:${t.join.email}`} className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white">
                <Phone size={14} />{t.join.email}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
