'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import {
  User, Users, FileText, CheckCircle, ArrowRight, ArrowLeft,
  Sparkles, GraduationCap, AlertCircle, Loader2,
} from 'lucide-react'
import { clsx } from 'clsx'

/* ── Grade options ── */
const grades = ['KG1', 'KG2', 'KG3', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5']
const gradesAr = ['KG1', 'KG2', 'KG3', 'الصف 1', 'الصف 2', 'الصف 3', 'الصف 4', 'الصف 5']
const sources = ['Social Media', 'Friend / Family', 'Google Search', 'School Event', 'Billboard / Advertisement', 'Other']
const sourcesAr = ['وسائل التواصل الاجتماعي', 'صديق / عائلة', 'بحث جوجل', 'فعالية مدرسية', 'إعلان', 'أخرى']

const steps = {
  en: [
    { icon: User,        label: 'Student',  desc: 'Basic student details' },
    { icon: Users,       label: 'Parents',  desc: 'Guardian information' },
    { icon: FileText,    label: 'Documents', desc: 'Checklist & notes' },
    { icon: CheckCircle, label: 'Review',   desc: 'Confirm & submit' },
  ],
  ar: [
    { icon: User,        label: 'الطالب',      desc: 'بيانات الطالب الأساسية' },
    { icon: Users,       label: 'الوالدان',    desc: 'بيانات ولي الأمر' },
    { icon: FileText,    label: 'المستندات',   desc: 'قائمة التحقق والملاحظات' },
    { icon: CheckCircle, label: 'المراجعة',    desc: 'التأكيد والإرسال' },
  ],
}

const docs = {
  en: [
    { key: 'birth',     label: "Child's Birth Certificate" },
    { key: 'passport',  label: 'Passport Copy (child & parents)' },
    { key: 'report',    label: 'Previous School Report Card (not required for KG)' },
    { key: 'vaccine',   label: 'Vaccination Record' },
    { key: 'photo',     label: 'Recent Passport-Size Photo' },
    { key: 'cpr',       label: 'CPR / Residency Permit Copy' },
  ],
  ar: [
    { key: 'birth',     label: 'شهادة ميلاد الطفل' },
    { key: 'passport',  label: 'نسخة جواز السفر (الطفل والوالدان)' },
    { key: 'report',    label: 'كشف درجات المدرسة السابقة (غير مطلوب للروضة)' },
    { key: 'vaccine',   label: 'سجل التطعيمات' },
    { key: 'photo',     label: 'صورة شخصية حديثة' },
    { key: 'cpr',       label: 'نسخة CPR / تصريح الإقامة' },
  ],
}

type DocKey = 'birth' | 'passport' | 'report' | 'vaccine' | 'photo' | 'cpr'

interface StudentForm {
  firstName: string; lastName: string; firstNameAr: string; lastNameAr: string
  dob: string; gender: string; nationality: string; grade: string; previousSchool: string
}
interface ParentForm {
  fatherName: string; motherName: string; primaryPhone: string
  secondaryPhone: string; email: string; address: string; source: string
}

const emptyStudent: StudentForm = {
  firstName: '', lastName: '', firstNameAr: '', lastNameAr: '',
  dob: '', gender: '', nationality: '', grade: '', previousSchool: '',
}
const emptyParent: ParentForm = {
  fatherName: '', motherName: '', primaryPhone: '', secondaryPhone: '',
  email: '', address: '', source: '',
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-bold text-neutral-600 uppercase tracking-wide mb-1.5">
      {children}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
  )
}

function Input({ value, onChange, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200 hover:border-neutral-300"
      {...rest}
    />
  )
}

function Select({ value, onChange, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200 hover:border-neutral-300 appearance-none cursor-pointer"
      {...rest}
    >
      {children}
    </select>
  )
}

export default function ApplyPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [step, setStep] = useState(0)
  const [student, setStudent] = useState<StudentForm>(emptyStudent)
  const [parent, setParent] = useState<ParentForm>(emptyParent)
  const [checkedDocs, setCheckedDocs] = useState<Record<DocKey, boolean>>({
    birth: false, passport: false, report: false, vaccine: false, photo: false, cpr: false,
  })
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')

  const isRTL = lang === 'ar'
  const Arr = isRTL ? ArrowLeft : ArrowRight
  const stepList = steps[lang]
  const docList  = docs[lang]
  const gradeList = isRTL ? gradesAr : grades

  const su = (k: keyof StudentForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setStudent(p => ({ ...p, [k]: e.target.value }))
  const pu = (k: keyof ParentForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setParent(p => ({ ...p, [k]: e.target.value }))

  const canNext = () => {
    if (step === 0) return !!(student.firstName && student.lastName && student.dob && student.gender && student.nationality && student.grade)
    if (step === 1) return !!(parent.primaryPhone && parent.email && (parent.fatherName || parent.motherName))
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student, parent, documents: checkedDocs, notes }),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(data.error || 'Submission failed. Please try again.')
        setSubmitting(false)
      } else {
        setRefNumber(data.ref)
        setSubmitted(true)
      }
    } catch {
      setSubmitError('Network error. Please check your connection.')
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen">
        <Header lang={lang} onLangChange={setLang} />
        <main className="py-24 bg-neutral-50 min-h-[80vh] flex items-center">
          <div className="container-custom">
            <div className="max-w-lg mx-auto text-center animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-[0_8px_30px_rgba(52,211,153,0.4)]">
                <CheckCircle size={36} className="text-white" />
              </div>
              <h1 className={clsx('text-3xl font-bold text-neutral-900 mb-3', !isRTL && 'font-playfair')}>
                {isRTL ? 'تم استلام طلبك!' : 'Application Received!'}
              </h1>
              <p className="text-neutral-500 mb-2">
                {isRTL ? 'سيتواصل معك فريق القبول في غضون 2–3 أيام عمل.' : 'Our admissions team will be in touch within 2–3 business days.'}
              </p>
              <div className="inline-flex items-center gap-2 mt-4 mb-8 px-5 py-2.5 bg-white rounded-full border border-neutral-200 shadow-sm">
                <span className="text-xs text-neutral-500 font-medium">{isRTL ? 'رقم المرجع:' : 'Reference:'}</span>
                <span className="text-sm font-bold text-brand-blue font-mono">{refNumber}</span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/" className="btn-primary text-sm px-6 py-3">
                  {isRTL ? 'العودة للرئيسية' : 'Back to Home'}
                </Link>
                <Link href="/contact" className="btn-outline text-sm px-6 py-3">
                  {isRTL ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer lang={lang} />
      </div>
    )
  }

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen">
      <Header lang={lang} onLangChange={setLang} />
      <main>

        {/* Hero */}
        <section className="mesh-bg noise relative overflow-hidden py-20 lg:py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-float-slow absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-blue/20 blur-[110px]" />
            <div className="animate-pulse-glow absolute bottom-0 right-0 w-[400px] h-[250px] rounded-full bg-brand-gold/8 blur-[90px]" />
            <div className="absolute inset-0 dot-pattern opacity-25" />
          </div>
          <div className="container-custom relative z-10">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('flex mb-5 animate-bounce-in', isRTL && 'justify-end')}>
                <span className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-4 py-2 text-white/65 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
                  <Sparkles size={11} className="text-brand-gold" />
                  {isRTL ? 'طلب القبول' : 'Enrollment Application'}
                </span>
              </div>
              <h1 className={clsx('font-bold leading-tight mb-4', !isRTL && 'font-playfair')}>
                <span className="block text-4xl md:text-5xl text-white/92 animate-slide-up" style={{ animationDelay: '100ms' }}>
                  {isRTL ? 'ابدأ رحلة طفلك' : "Start Your Child's"}
                </span>
                <span className="block text-4xl md:text-5xl text-gradient-gold text-glow animate-slide-up" style={{ animationDelay: '250ms' }}>
                  {isRTL ? 'في مدرسة الفجر' : 'Journey at AFS'}
                </span>
              </h1>
              <p className="text-white/60 text-base leading-relaxed animate-fade-in" style={{ animationDelay: '400ms' }}>
                {isRTL
                  ? 'أكمل النموذج أدناه — سيتواصل معك فريق القبول في غضون يومي عمل.'
                  : 'Complete the form below — our admissions team will follow up within 2 business days.'}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 70" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full block">
              <path d="M0 70L1440 70L1440 25C1250 65 980 5 720 32C460 59 200 5 0 28L0 70Z" />
            </svg>
          </div>
        </section>

        {/* Form area */}
        <section className="section-padding bg-neutral-50 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="container-custom relative z-10 max-w-3xl mx-auto">

            {/* Step indicator */}
            <div className="mb-10">
              <div className={clsx('flex items-center gap-0', isRTL && 'flex-row-reverse')}>
                {stepList.map((s, i) => (
                  <div key={s.label} className={clsx('flex items-center flex-1', isRTL && 'flex-row-reverse')}>
                    <button
                      onClick={() => i < step && setStep(i)}
                      className={clsx(
                        'flex flex-col items-center gap-1 flex-shrink-0 group cursor-default',
                        i < step && 'cursor-pointer',
                      )}
                    >
                      <div className={clsx(
                        'w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 font-bold text-sm',
                        step === i ? 'bg-brand-blue text-white shadow-brand scale-110'
                          : i < step ? 'bg-emerald-500 text-white'
                          : 'bg-white border-2 border-neutral-200 text-neutral-400',
                      )}>
                        {i < step ? <CheckCircle size={16} /> : <s.icon size={16} />}
                      </div>
                      <span className={clsx(
                        'text-[10px] font-bold hidden sm:block',
                        step === i ? 'text-brand-blue' : i < step ? 'text-emerald-600' : 'text-neutral-400',
                      )}>{s.label}</span>
                    </button>
                    {i < stepList.length - 1 && (
                      <div className={clsx(
                        'flex-1 h-0.5 mx-2 transition-colors duration-300',
                        i < step ? 'bg-emerald-400' : 'bg-neutral-200',
                      )} />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="text-xs text-neutral-400 font-medium">
                  {isRTL ? `خطوة ${step + 1} من ${stepList.length}` : `Step ${step + 1} of ${stepList.length}`}
                  {' — '}{stepList[step].desc}
                </span>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">

              {/* ── STEP 0: Student ── */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <h2 className={clsx('text-xl font-bold text-neutral-900 mb-1', !isRTL && 'font-playfair')}>
                      {isRTL ? 'بيانات الطالب' : 'Student Information'}
                    </h2>
                    <p className="text-sm text-neutral-500">{isRTL ? 'الأسماء كما في جواز السفر أو شهادة الميلاد' : 'Names as they appear on passport or birth certificate'}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>{isRTL ? 'الاسم الأول (إنجليزي)' : 'First Name (English)'}</FieldLabel>
                      <Input value={student.firstName} onChange={su('firstName')} placeholder="e.g. Ahmad" required />
                    </div>
                    <div>
                      <FieldLabel required>{isRTL ? 'اسم العائلة (إنجليزي)' : 'Last Name (English)'}</FieldLabel>
                      <Input value={student.lastName} onChange={su('lastName')} placeholder="e.g. Al-Dosari" required />
                    </div>
                    <div>
                      <FieldLabel>{isRTL ? 'الاسم الأول (عربي)' : 'First Name (Arabic)'}</FieldLabel>
                      <Input value={student.firstNameAr} onChange={su('firstNameAr')} placeholder="مثال: أحمد" dir="rtl" />
                    </div>
                    <div>
                      <FieldLabel>{isRTL ? 'اسم العائلة (عربي)' : 'Last Name (Arabic)'}</FieldLabel>
                      <Input value={student.lastNameAr} onChange={su('lastNameAr')} placeholder="مثال: الدوسري" dir="rtl" />
                    </div>
                    <div>
                      <FieldLabel required>{isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}</FieldLabel>
                      <Input type="date" value={student.dob} onChange={su('dob')} required />
                    </div>
                    <div>
                      <FieldLabel required>{isRTL ? 'الجنس' : 'Gender'}</FieldLabel>
                      <Select value={student.gender} onChange={su('gender')} required>
                        <option value="">{isRTL ? '— اختر —' : '— Select —'}</option>
                        <option value="male">{isRTL ? 'ذكر' : 'Male'}</option>
                        <option value="female">{isRTL ? 'أنثى' : 'Female'}</option>
                      </Select>
                    </div>
                    <div>
                      <FieldLabel required>{isRTL ? 'الجنسية' : 'Nationality'}</FieldLabel>
                      <Input value={student.nationality} onChange={su('nationality')} placeholder={isRTL ? 'مثال: بحريني' : 'e.g. Bahraini'} required />
                    </div>
                    <div>
                      <FieldLabel required>{isRTL ? 'الصف المطلوب' : 'Grade Applying For'}</FieldLabel>
                      <Select value={student.grade} onChange={su('grade')} required>
                        <option value="">{isRTL ? '— اختر الصف —' : '— Select Grade —'}</option>
                        {gradeList.map((g) => <option key={g} value={g}>{g}</option>)}
                      </Select>
                    </div>
                  </div>
                  <div>
                    <FieldLabel>{isRTL ? 'المدرسة السابقة (إن وجدت)' : 'Previous School Attended (if any)'}</FieldLabel>
                    <Input value={student.previousSchool} onChange={su('previousSchool')} placeholder={isRTL ? 'اتركه فارغاً للطلاب الجدد' : 'Leave blank for new students'} />
                  </div>
                </div>
              )}

              {/* ── STEP 1: Parents ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className={clsx('text-xl font-bold text-neutral-900 mb-1', !isRTL && 'font-playfair')}>
                      {isRTL ? 'بيانات ولي الأمر' : 'Parent / Guardian Information'}
                    </h2>
                    <p className="text-sm text-neutral-500">{isRTL ? 'يكفي تعبئة أحد الوالدين كجهة اتصال رئيسية' : 'At least one parent name is required as the primary contact'}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>{isRTL ? 'اسم الأب (كامل)' : "Father's Full Name"}</FieldLabel>
                      <Input value={parent.fatherName} onChange={pu('fatherName')} placeholder={isRTL ? 'الاسم الكامل' : 'Full name'} />
                    </div>
                    <div>
                      <FieldLabel>{isRTL ? 'اسم الأم (كامل)' : "Mother's Full Name"}</FieldLabel>
                      <Input value={parent.motherName} onChange={pu('motherName')} placeholder={isRTL ? 'الاسم الكامل' : 'Full name'} />
                    </div>
                    <div>
                      <FieldLabel required>{isRTL ? 'رقم الهاتف الرئيسي' : 'Primary Phone Number'}</FieldLabel>
                      <Input type="tel" value={parent.primaryPhone} onChange={pu('primaryPhone')} placeholder="+973 XXXX XXXX" required />
                    </div>
                    <div>
                      <FieldLabel>{isRTL ? 'رقم هاتف بديل' : 'Secondary Phone (optional)'}</FieldLabel>
                      <Input type="tel" value={parent.secondaryPhone} onChange={pu('secondaryPhone')} placeholder="+973 XXXX XXXX" />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel required>{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</FieldLabel>
                      <Input type="email" value={parent.email} onChange={pu('email')} placeholder="name@example.com" required />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>{isRTL ? 'منطقة السكن' : 'Area of Residence'}</FieldLabel>
                      <Input value={parent.address} onChange={pu('address')} placeholder={isRTL ? 'مثال: صار، بربر، الرفاع...' : 'e.g. Saar, Barbar, Riffa...'} />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>{isRTL ? 'كيف سمعت عن الفجر؟' : 'How did you hear about AFS?'}</FieldLabel>
                      <Select value={parent.source} onChange={pu('source')}>
                        <option value="">{isRTL ? '— اختر —' : '— Select —'}</option>
                        {(isRTL ? sourcesAr : sources).map((s) => <option key={s} value={s}>{s}</option>)}
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Documents ── */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className={clsx('text-xl font-bold text-neutral-900 mb-1', !isRTL && 'font-playfair')}>
                      {isRTL ? 'قائمة المستندات' : 'Documents Checklist'}
                    </h2>
                    <p className="text-sm text-neutral-500">
                      {isRTL
                        ? 'يرجى الإشارة إلى المستندات المتوفرة لديك. ستحتاج إلى إحضارها عند زيارة المدرسة.'
                        : 'Tick the documents you have ready. You will need to bring originals to the school visit.'}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {docList.map((doc) => (
                      <label
                        key={doc.key}
                        className={clsx(
                          'flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200',
                          checkedDocs[doc.key as DocKey]
                            ? 'border-brand-blue/30 bg-brand-blue/4'
                            : 'border-neutral-200 bg-white hover:border-neutral-300',
                          isRTL && 'flex-row-reverse',
                        )}
                      >
                        <div className={clsx(
                          'w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
                          checkedDocs[doc.key as DocKey]
                            ? 'bg-brand-blue border-brand-blue'
                            : 'border-neutral-300',
                        )}>
                          {checkedDocs[doc.key as DocKey] && <CheckCircle size={12} className="text-white" strokeWidth={3} />}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={checkedDocs[doc.key as DocKey]}
                          onChange={(e) => setCheckedDocs(p => ({ ...p, [doc.key]: e.target.checked }))}
                        />
                        <span className="text-sm text-neutral-700 font-medium">{doc.label}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <FieldLabel>{isRTL ? 'ملاحظات إضافية (اختياري)' : 'Additional Notes (optional)'}</FieldLabel>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isRTL
                        ? 'أي احتياجات خاصة، حالات طبية، أو أسئلة للفريق الأكاديمي...'
                        : 'Any special needs, medical conditions, or questions for the admissions team...'}
                      className={clsx(
                        'w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all duration-200 resize-none',
                        isRTL && 'text-right',
                      )}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 3: Review ── */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className={clsx('text-xl font-bold text-neutral-900 mb-1', !isRTL && 'font-playfair')}>
                      {isRTL ? 'مراجعة الطلب' : 'Review & Submit'}
                    </h2>
                    <p className="text-sm text-neutral-500">{isRTL ? 'يرجى مراجعة البيانات قبل الإرسال.' : 'Please review your information before submitting.'}</p>
                  </div>

                  {/* Student summary */}
                  <div className={clsx('rounded-2xl border border-neutral-100 p-5', isRTL && 'text-right')}>
                    <div className={clsx('flex items-center gap-2 mb-3', isRTL && 'flex-row-reverse')}>
                      <div className="w-7 h-7 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                        <GraduationCap size={13} className="text-brand-blue" />
                      </div>
                      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{isRTL ? 'الطالب' : 'Student'}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {[
                        [isRTL ? 'الاسم' : 'Name', `${student.firstName} ${student.lastName}`],
                        [isRTL ? 'تاريخ الميلاد' : 'Date of Birth', student.dob],
                        [isRTL ? 'الجنس' : 'Gender', student.gender],
                        [isRTL ? 'الجنسية' : 'Nationality', student.nationality],
                        [isRTL ? 'الصف المطلوب' : 'Grade', student.grade],
                        [isRTL ? 'المدرسة السابقة' : 'Prev. School', student.previousSchool || (isRTL ? 'لا يوجد' : 'N/A')],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <span className="text-neutral-400 text-xs">{k}</span>
                          <div className="font-semibold text-neutral-800">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Parent summary */}
                  <div className={clsx('rounded-2xl border border-neutral-100 p-5', isRTL && 'text-right')}>
                    <div className={clsx('flex items-center gap-2 mb-3', isRTL && 'flex-row-reverse')}>
                      <div className="w-7 h-7 rounded-xl bg-violet-100 flex items-center justify-center">
                        <Users size={13} className="text-violet-600" />
                      </div>
                      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{isRTL ? 'الوالدان' : 'Parent / Guardian'}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {[
                        [isRTL ? 'الأب' : 'Father', parent.fatherName || '—'],
                        [isRTL ? 'الأم' : 'Mother', parent.motherName || '—'],
                        [isRTL ? 'الهاتف' : 'Phone', parent.primaryPhone],
                        [isRTL ? 'البريد' : 'Email', parent.email],
                        [isRTL ? 'المنطقة' : 'Area', parent.address || '—'],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <span className="text-neutral-400 text-xs">{k}</span>
                          <div className="font-semibold text-neutral-800 break-words">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Docs summary */}
                  <div className={clsx('rounded-2xl border border-neutral-100 p-5', isRTL && 'text-right')}>
                    <div className={clsx('flex items-center gap-2 mb-3', isRTL && 'flex-row-reverse')}>
                      <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <FileText size={13} className="text-emerald-600" />
                      </div>
                      <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{isRTL ? 'المستندات المتوفرة' : 'Documents Ready'}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {docList.filter((d) => checkedDocs[d.key as DocKey]).map((d) => (
                        <span key={d.key} className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
                          <CheckCircle size={10} /> {d.label.split('(')[0].trim()}
                        </span>
                      ))}
                      {!Object.values(checkedDocs).some(Boolean) && (
                        <span className="text-xs text-neutral-400">{isRTL ? 'لم يتم تحديد أي مستند' : 'No documents checked'}</span>
                      )}
                    </div>
                  </div>

                  {submitError && (
                    <div className="flex items-center gap-2.5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                      <AlertCircle size={16} className="flex-shrink-0" /> {submitError}
                    </div>
                  )}

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {isRTL
                      ? 'بالإرسال توافق على التواصل معك من قِبل فريق القبول في مدرسة الفجر الخاصة.'
                      : 'By submitting, you agree to be contacted by the Al Fajer Private School admissions team regarding this application.'}
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className={clsx('flex items-center justify-between mt-8 pt-6 border-t border-neutral-100', isRTL && 'flex-row-reverse')}>
                {step > 0 ? (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    className={clsx('inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 transition-all duration-200', isRTL && 'flex-row-reverse')}
                  >
                    {isRTL ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                    {isRTL ? 'السابق' : 'Back'}
                  </button>
                ) : (
                  <Link href="/admissions" className="text-sm text-neutral-400 hover:text-brand-blue transition-colors">
                    {isRTL ? '← صفحة القبول' : '← Admissions info'}
                  </Link>
                )}

                {step < 3 ? (
                  <button
                    onClick={() => canNext() && setStep(s => s + 1)}
                    disabled={!canNext()}
                    className={clsx(
                      'shimmer-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300',
                      canNext()
                        ? 'bg-brand-blue text-white hover:bg-brand-blue-dark hover:shadow-[0_8px_24px_rgba(0,40,255,0.3)] hover:-translate-y-0.5'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    {isRTL ? 'التالي' : 'Next'} <Arr size={15} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={clsx(
                      'shimmer-btn inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-gold text-neutral-900 font-bold text-sm hover:shadow-[0_8px_30px_rgba(255,215,0,0.5)] hover:-translate-y-0.5 transition-all duration-300',
                      submitting && 'opacity-70 cursor-not-allowed',
                      isRTL && 'flex-row-reverse',
                    )}
                  >
                    {submitting
                      ? <><Loader2 size={15} className="animate-spin" />{isRTL ? 'جارٍ الإرسال...' : 'Submitting...'}</>
                      : <>{isRTL ? 'أرسل الطلب' : 'Submit Application'} <Arr size={15} /></>
                    }
                  </button>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
