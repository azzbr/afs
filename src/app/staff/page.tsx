'use client'

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Mail, Phone, BookOpen, Globe } from 'lucide-react'
import { clsx } from 'clsx'

const content = {
  en: {
    hero: {
      badge: 'Our People',
      title: 'Meet Our',
      titleHighlight: 'Dedicated Team',
      subtitle: 'Our educators bring passion, expertise, and care to every classroom — shaping curious minds and confident hearts.',
    },
    stats: [
      { value: '35+', label: 'Qualified Teachers' },
      { value: '12+', label: 'Years Avg. Experience' },
      { value: '8', label: 'Nationalities' },
      { value: '100%', label: 'Certified Educators' },
    ],
    leadership: {
      title: 'School Leadership',
      subtitle: 'Guiding our school with vision and care',
    },
    faculty: {
      title: 'Our Faculty',
      subtitle: 'Expert educators across every grade and subject',
    },
    departments: {
      title: 'Academic Departments',
      subtitle: 'Specialized teams delivering excellence',
    },
    join: {
      title: 'Join Our Team',
      subtitle: "We're always looking for passionate educators who want to make a difference.",
      cta: 'View Open Positions',
      email: 'careers@afs.edu.bh',
    },
    contact: 'Contact',
  },
  ar: {
    hero: {
      badge: 'فريقنا',
      title: 'تعرف على',
      titleHighlight: 'فريقنا المتميز',
      subtitle: 'يجلب معلمونا الشغف والخبرة والاهتمام إلى كل فصل دراسي — يشكّلون عقولاً فضولية وقلوباً واثقة.',
    },
    stats: [
      { value: '٣٥+', label: 'معلم مؤهل' },
      { value: '١٢+', label: 'سنة خبرة متوسطة' },
      { value: '٨', label: 'جنسيات' },
      { value: '١٠٠٪', label: 'مربون معتمدون' },
    ],
    leadership: {
      title: 'قيادة المدرسة',
      subtitle: 'توجيه مدرستنا برؤية واهتمام',
    },
    faculty: {
      title: 'هيئة التدريس',
      subtitle: 'معلمون متخصصون في جميع المراحل والمواد',
    },
    departments: {
      title: 'الأقسام الأكاديمية',
      subtitle: 'فرق متخصصة تقدم التميز',
    },
    join: {
      title: 'انضم إلى فريقنا',
      subtitle: 'نحن نبحث دائماً عن معلمين متحمسين يريدون إحداث فرق.',
      cta: 'عرض الوظائف المتاحة',
      email: 'careers@afs.edu.bh',
    },
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
    initials: 'FM',
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
    initials: 'KR',
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
    initials: 'SH',
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
  {
    icon: BookOpen,
    name: { en: 'English Language Arts', ar: 'اللغة الإنجليزية' },
    desc: { en: 'Reading, writing, phonics, and communication — building strong English foundations from KG through Grade 5.', ar: 'القراءة والكتابة وتأسيس لغوي قوي من الروضة حتى الصف الخامس.' },
    count: { en: '5 teachers', ar: '٥ معلمين' },
  },
  {
    icon: Globe,
    name: { en: 'Arabic & Islamic Studies', ar: 'العربية والإسلامية' },
    desc: { en: 'MOE-aligned Arabic language and Islamic education, with dedicated native-speaker teachers for all grades.', ar: 'تعليم عربي وإسلامي متوافق مع وزارة التربية، مع معلمين متحدثين بالعربية لجميع الصفوف.' },
    count: { en: '4 teachers', ar: '٤ معلمين' },
  },
  {
    icon: BookOpen,
    name: { en: 'Mathematics', ar: 'الرياضيات' },
    desc: { en: 'Singapore Math-influenced curriculum building number sense, problem-solving, and mathematical thinking.', ar: 'منهج رياضيات مستوحى من سنغافورة يبني الإحساس بالأرقام وحل المشكلات والتفكير الرياضي.' },
    count: { en: '4 teachers', ar: '٤ معلمين' },
  },
  {
    icon: Globe,
    name: { en: 'Science & Technology', ar: 'العلوم والتكنولوجيا' },
    desc: { en: 'Hands-on inquiry-based learning with dedicated lab time, coding basics, and STEM integration from Grade 1.', ar: 'تعلم قائم على الاستفسار مع وقت مخبري وأسس البرمجة وتكامل STEM من الصف الأول.' },
    count: { en: '3 teachers', ar: '٣ معلمين' },
  },
]

export default function StaffPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const t = content[lang]
  const isRTL = lang === 'ar'

  return (
    <div className={clsx('min-h-screen flex flex-col', isRTL && 'rtl')} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1">

        {/* Hero */}
        <section className="hero-dark py-24">
          <div className="container-custom text-center text-white">
            <div className={clsx('section-tag justify-center mb-6', isRTL && 'flex-row-reverse')}>
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              {t.hero.title}{' '}
              <span style={{ color: 'var(--brand-gold)' }}>{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">{t.hero.subtitle}</p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b" style={{ background: 'var(--cream)', borderColor: 'var(--border)' }}>
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold font-playfair mb-1" style={{ color: 'var(--brand-navy)' }}>{s.value}</div>
                  <div className="text-sm" style={{ color: 'var(--ink)', opacity: 0.55 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')}>
              <div className={clsx('section-tag mb-4', isRTL ? 'flex-row-reverse justify-end' : 'justify-center')}>
                {t.leadership.title}
              </div>
              <p className="text-sm" style={{ color: 'var(--ink)', opacity: 0.55 }}>{t.leadership.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((person) => (
                <div
                  key={person.email}
                  className="border bg-white p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className={clsx('flex items-center gap-4 mb-4', isRTL && 'flex-row-reverse')}>
                    <div
                      className="w-14 h-14 flex items-center justify-center flex-shrink-0 text-white font-bold font-playfair text-xl"
                      style={{ background: 'var(--brand-navy)' }}
                    >
                      {person.initials}
                    </div>
                    <div className={clsx(isRTL && 'text-right')}>
                      <h3 className="text-base font-bold font-playfair" style={{ color: 'var(--ink)' }}>{person.name[lang]}</h3>
                      <p className="text-sm font-medium" style={{ color: 'var(--brand-gold)' }}>{person.role[lang]}</p>
                    </div>
                  </div>
                  <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink)', opacity: 0.7 }}>{person.bio[lang]}</p>
                  <ul className="space-y-1 mb-5">
                    {person.quals.map((q) => (
                      <li key={q} className={clsx('flex items-center gap-2 text-xs', isRTL && 'flex-row-reverse')} style={{ color: 'var(--ink)', opacity: 0.55 }}>
                        <span className="w-1.5 h-1.5 flex-shrink-0 rounded-full" style={{ background: 'var(--brand-gold)' }} />
                        {q}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:${person.email}`}
                    className={clsx('flex items-center gap-2 text-xs font-medium transition-colors hover:opacity-80', isRTL && 'flex-row-reverse')}
                    style={{ color: 'var(--brand-navy)' }}
                  >
                    <Mail size={13} />
                    {t.contact}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-20" style={{ background: 'var(--cream)' }}>
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')}>
              <div className={clsx('section-tag mb-4', isRTL ? 'flex-row-reverse justify-end' : 'justify-center')}>
                {t.departments.title}
              </div>
              <p className="text-sm" style={{ color: 'var(--ink)', opacity: 0.55 }}>{t.departments.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dep) => {
                const Icon = dep.icon
                return (
                  <div
                    key={dep.name.en}
                    className={clsx('border bg-white p-6 flex gap-4 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300', isRTL && 'flex-row-reverse')}
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--brand-navy)' }}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <div className={clsx(isRTL && 'text-right')}>
                      <div className={clsx('flex items-center gap-2 mb-1 flex-wrap', isRTL && 'flex-row-reverse')}>
                        <h3 className="font-bold text-sm" style={{ color: 'var(--ink)' }}>{dep.name[lang]}</h3>
                        <span className="text-xs" style={{ color: 'var(--ink)', opacity: 0.45 }}>{dep.count[lang]}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.65 }}>{dep.desc[lang]}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className={clsx('mb-12', isRTL ? 'text-right' : 'text-center')}>
              <div className={clsx('section-tag mb-4', isRTL ? 'flex-row-reverse justify-end' : 'justify-center')}>
                {t.faculty.title}
              </div>
              <p className="text-sm" style={{ color: 'var(--ink)', opacity: 0.55 }}>{t.faculty.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.map((member) => (
                <div
                  key={member.name.en}
                  className={clsx('border bg-white p-6 flex gap-4 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300', isRTL && 'flex-row-reverse')}
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold font-playfair"
                    style={{ background: 'var(--brand-navy)' }}
                  >
                    {member.name.en.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                  <div className={clsx('flex-1 min-w-0', isRTL && 'text-right')}>
                    <h3 className="font-semibold text-sm leading-tight" style={{ color: 'var(--ink)' }}>{member.name[lang]}</h3>
                    <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--brand-gold)' }}>{member.role[lang]}</p>
                    <div className={clsx('flex items-center gap-3 mt-2 flex-wrap', isRTL && 'flex-row-reverse')}>
                      <span className="inline-flex items-center gap-1 text-xs" style={{ color: 'var(--ink)', opacity: 0.5 }}>
                        <BookOpen size={10} />
                        {member.subject[lang]}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--ink)', opacity: 0.4 }}>{member.exp}</span>
                      <span className="inline-flex items-center gap-1 text-xs" style={{ color: 'var(--ink)', opacity: 0.4 }}>
                        <Globe size={10} />
                        {member.lang}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="hero-dark py-24">
          <div className="container-custom text-center text-white">
            <h2 className="text-3xl font-bold font-playfair mb-3">{t.join.title}</h2>
            <p className="max-w-xl mx-auto mb-8 text-white/70">{t.join.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${t.join.email}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold transition-opacity hover:opacity-90"
                style={{ background: 'var(--brand-gold)', color: 'var(--cream)' }}
              >
                <Mail size={16} />
                {t.join.cta}
              </a>
              <a
                href={`mailto:${t.join.email}`}
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
              >
                <Phone size={14} />
                {t.join.email}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
