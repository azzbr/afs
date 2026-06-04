'use client'

import { useState } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { MapPin, Phone, Mail, Clock, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const t = {
  en: {
    hero: { tag: 'Contact Us', title: "We'd Love to", titleAccent: 'Hear From You', subtitle: 'Reach out to us for admissions enquiries, general information, or to schedule a visit to our campus.' },
    info: {
      tag: 'Find Us', title: 'Get in Touch',
      items: [
        { icon: MapPin, label: 'Address',      value: 'Building 1754, Road 4627, Block 346, Saar, Bahrain' },
        { icon: Phone,  label: 'Phone',        value: '+973 1761 2221' },
        { icon: Mail,   label: 'Email',        value: 'info@afs.edu.bh' },
        { icon: Clock,  label: 'Office Hours', value: 'Sunday – Thursday\n7:30 AM – 3:30 PM' },
      ],
    },
    form: {
      tag: 'Send a Message', title: 'Contact Form',
      fields: { name: 'Full Name', email: 'Email Address', phone: 'Phone Number', subject: 'Subject', message: 'Your Message', btn: 'Send Message' },
      subjects: ['General Inquiry', 'Admissions', 'Academics', 'School Tour', 'Other'],
    },
    map: { tag: 'Our Location', title: 'Visit Us in Saar' },
    sent: { title: 'Message Sent!', body: "We'll be in touch soon." },
  },
  ar: {
    hero: { tag: 'تواصل معنا', title: 'يسعدنا', titleAccent: 'التواصل معك', subtitle: 'تواصل معنا لاستفسارات القبول أو المعلومات العامة أو لتحديد موعد زيارة مدرستنا.' },
    info: {
      tag: 'موقعنا', title: 'تواصل معنا',
      items: [
        { icon: MapPin, label: 'العنوان',           value: 'مبنى 1754، طريق 4627، مجمع 346، صار، البحرين' },
        { icon: Phone,  label: 'الهاتف',            value: '+973 1761 2221' },
        { icon: Mail,   label: 'البريد الإلكتروني', value: 'info@afs.edu.bh' },
        { icon: Clock,  label: 'ساعات العمل',       value: 'الأحد – الخميس\n7:30 ص – 3:30 م' },
      ],
    },
    form: {
      tag: 'أرسل رسالة', title: 'نموذج الاتصال',
      fields: { name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', subject: 'الموضوع', message: 'رسالتك', btn: 'أرسل الرسالة' },
      subjects: ['استفسار عام', 'القبول', 'الأكاديمية', 'جولة في المدرسة', 'أخرى'],
    },
    map: { tag: 'موقعنا', title: 'زورونا في صار' },
    sent: { title: 'تم الإرسال!', body: 'سنتواصل معك قريباً.' },
  },
}

const MSG_MAX = 500

export default function ContactPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [msgLen, setMsgLen] = useState(0)
  const [focused, setFocused] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: t.en.form.subjects[0], message: '' })
  const isRTL = lang === 'ar'
  const c = t[lang]
  useScrollReveal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
      setLoading(false)
    }
  }

  const inputCls = (f: string, extra = '') =>
    clsx(
      'w-full px-4 pt-6 pb-2 border text-sm focus:outline-none transition-colors duration-200 bg-white',
      focused === f
        ? 'border-[var(--brand-navy)]'
        : 'border-[var(--border)] hover:border-[var(--brand-gold)]',
      isRTL && 'text-right',
      extra,
    )

  const labelCls = clsx(
    'absolute top-2 text-[10px] font-bold uppercase tracking-wide pointer-events-none px-4',
    isRTL ? 'right-0' : 'left-0',
  )

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col">
      <Header lang={lang} onLangChange={setLang} />
      <main className="flex-1">

        {/* Hero */}
        <section className="hero-dark py-24">
          <div className="container-custom">
            <div className={clsx('max-w-2xl', isRTL && 'text-right')}>
              <div className={clsx('section-tag mb-6', isRTL && 'flex-row-reverse')}>
                {c.hero.tag}
              </div>
              <h1 className="font-bold font-playfair leading-tight mb-5">
                <span className="block text-4xl md:text-5xl text-white">{c.hero.title}</span>
                <span className="block text-4xl md:text-5xl" style={{ color: 'var(--brand-gold)' }}>{c.hero.titleAccent}</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">{c.hero.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Info + Form */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

              {/* Contact Info */}
              <div>
                <div className={clsx('section-tag mb-4', isRTL && 'flex-row-reverse')}>
                  {c.info.tag}
                </div>
                <h2 className={clsx('text-2xl font-bold font-playfair mb-6', isRTL && 'text-right')} style={{ color: 'var(--ink)' }}>
                  {c.info.title}
                </h2>
                <div className="space-y-4">
                  {c.info.items.map((item) => (
                    <div
                      key={item.label}
                      className={clsx(
                        'flex items-start gap-4 p-5 border bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300',
                        isRTL && 'flex-row-reverse',
                      )}
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div
                        className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--brand-navy)' }}
                      >
                        <item.icon size={17} className="text-white" />
                      </div>
                      <div className={isRTL ? 'text-right' : ''}>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--ink)', opacity: 0.45 }}>{item.label}</div>
                        <div className="text-sm font-semibold whitespace-pre-line" style={{ color: 'var(--ink)' }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className={clsx('section-tag mb-4', isRTL && 'flex-row-reverse')}>
                  {c.form.tag}
                </div>
                <h2 className={clsx('text-2xl font-bold font-playfair mb-6', isRTL && 'text-right')} style={{ color: 'var(--ink)' }}>
                  {c.form.title}
                </h2>

                {submitted ? (
                  <div
                    className="p-10 border text-center"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'var(--brand-navy)' }}
                    >
                      <Mail size={28} className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--ink)' }}>{c.sent.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--ink)', opacity: 0.55 }}>{c.sent.body}</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input id="f-name" type="text" required placeholder=" "
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                          className={inputCls('name')} />
                        <label htmlFor="f-name" className={labelCls} style={{ color: 'var(--brand-navy)' }}>{c.form.fields.name}</label>
                      </div>
                      <div className="relative">
                        <input id="f-email" type="email" required placeholder=" "
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                          className={inputCls('email')} />
                        <label htmlFor="f-email" className={labelCls} style={{ color: 'var(--brand-navy)' }}>{c.form.fields.email}</label>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <input id="f-phone" type="tel" placeholder=" "
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                        className={inputCls('phone')} />
                      <label htmlFor="f-phone" className={labelCls} style={{ color: 'var(--brand-navy)' }}>{c.form.fields.phone}</label>
                    </div>

                    {/* Subject */}
                    <div className="relative">
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                        className={clsx(inputCls('subject', 'appearance-none cursor-pointer'))}
                      >
                        {c.form.subjects.map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <label className={labelCls} style={{ color: 'var(--brand-navy)' }}>{c.form.fields.subject}</label>
                      <ChevronDown size={14} className={clsx('absolute top-1/2 -translate-y-1/2 pointer-events-none', isRTL ? 'left-4' : 'right-4')} style={{ color: 'var(--ink)', opacity: 0.4 }} />
                    </div>

                    {/* Message + char counter */}
                    <div className="relative">
                      <textarea id="f-msg" rows={5} required maxLength={MSG_MAX} placeholder=" "
                        value={formData.message}
                        onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
                        onChange={(e) => { setMsgLen(e.target.value.length); setFormData(prev => ({ ...prev, message: e.target.value })) }}
                        className={clsx(inputCls('msg', 'pt-7 resize-none'))} />
                      <label htmlFor="f-msg" className={labelCls} style={{ color: 'var(--brand-navy)' }}>{c.form.fields.message}</label>
                      <span className={clsx(
                        'absolute bottom-3 text-[10px] font-medium tabular-nums',
                        isRTL ? 'left-4' : 'right-4',
                      )} style={{ color: msgLen > MSG_MAX * 0.9 ? '#dc2626' : 'var(--ink)', opacity: msgLen > MSG_MAX * 0.9 ? 1 : 0.4 }}>
                        {msgLen}/{MSG_MAX}
                      </span>
                    </div>

                    {error && (
                      <div className="flex items-start gap-3 p-4 border border-red-200 bg-red-50 text-red-700 text-sm" style={{ borderRadius: 0 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4a1 1 0 102 0V9a1 1 0 10-2 0zm0-4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ background: 'var(--brand-navy)', color: 'white' }}
                    >
                      {loading && (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      )}
                      {c.form.fields.btn}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-20" style={{ background: 'var(--cream)' }}>
          <div className="container-custom">
            <div className={clsx('mb-10', isRTL ? 'text-right' : 'text-center')}>
              <div className={clsx('section-tag mb-4', isRTL ? 'flex-row-reverse justify-end' : 'justify-center')}>
                {c.map.tag}
              </div>
              <h2 className="text-2xl font-bold font-playfair" style={{ color: 'var(--brand-navy)' }}>{c.map.title}</h2>
            </div>
            <div className="border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.562!2d50.49152!3d26.21389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af36e43e1c57%3A0x6b4b1b1de87f1a0b!2sSaar%2C%20Bahrain!5e0!3m2!1sen!2sbh!4v1700000000000!5m2!1sen!2sbh"
                width="100%"
                height="420"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Al Fajer School Location"
              />
            </div>
          </div>
        </section>

      </main>
      <Footer lang={lang} />
    </div>
  )
}
