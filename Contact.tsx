'use client'
import { useState, useRef, useCallback } from 'react'
import type { ContactPayload } from '@/app/api/contact/route'

// ─── Types ────────────────────────────────────────────────────────
type FormState  = 'idle' | 'loading' | 'success' | 'error'
type FieldKey   = keyof ContactPayload
type FieldErrors = Partial<Record<FieldKey | 'general', string>>

// ─── Constants ────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const SERVICE_OPTIONS = [
  { value: 'design',      label: 'Website Design' },
  { value: 'development', label: 'Website Development' },
  { value: 'redesign',    label: 'Redesign / Upgrade' },
  { value: 'ecommerce',   label: 'E-Commerce' },
  { value: 'other',       label: 'Other' },
]

const BUDGET_OPTIONS = [
  { value: 'under-2k', label: 'Under $2K' },
  { value: '2k-5k',    label: '$2K–$5K' },
  { value: '5k-15k',   label: '$5K–$15K' },
  { value: '15k-plus', label: '$15K+' },
]

const CONTACT_DETAILS = [
  { icon: '✉', label: 'Email',           value: 'hello@apexwebagency.com', href: 'mailto:hello@apexwebagency.com' },
  { icon: '☎', label: 'Phone/WhatsApp',  value: '+1 (234) 567-890',        href: 'tel:+12345678900' },
  { icon: '⏱', label: 'Response Time',   value: 'Within 24 Hours',         href: undefined },
]

// ─── Client-side validation (mirrors server) ─────────────────────
function validateForm(data: Partial<ContactPayload>): FieldErrors {
  const e: FieldErrors = {}
  if (!data.name?.trim())              e.name    = 'Name is required.'
  if (!data.email?.trim())             e.email   = 'Email is required.'
  else if (!EMAIL_RE.test(data.email)) e.email   = 'Please enter a valid email address.'
  if (!data.service?.trim())           e.service = 'Please select a service.'
  if (!data.message?.trim())           e.message = 'Project brief is required.'
  else if (data.message.trim().length < 10)
                                       e.message = 'Please provide a bit more detail (10+ characters).'
  return e
}

// ─── Sub-components ───────────────────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return (
    <span className="form-error visible" role="alert" aria-live="polite">
      {msg}
    </span>
  )
}

// ─── Main Component ───────────────────────────────────────────────
export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors,    setErrors]    = useState<FieldErrors>({})
  const [budget,    setBudget]    = useState('')
  const [touched,   setTouched]   = useState<Partial<Record<FieldKey, boolean>>>({})

  const formRef = useRef<HTMLFormElement>(null)
  const btnRef  = useRef<HTMLButtonElement>(null)

  // Mark field as touched on blur → enable real-time validation
  const handleBlur = useCallback((field: FieldKey) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }, [])

  // Re-validate on change only if the field has already been touched
  const handleChange = useCallback((field: FieldKey, value: string) => {
    if (!touched[field]) return
    const fd = new FormData(formRef.current!)
    const data: Partial<ContactPayload> = {
      name:    fd.get('name')    as string,
      email:   fd.get('email')   as string,
      service: fd.get('service') as string,
      message: fd.get('message') as string,
      [field]: value,
    }
    const newErrors = validateForm(data)
    setErrors(prev => ({ ...prev, [field]: newErrors[field] }))
  }, [touched])

  const shakeButton = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    btn.classList.add('shake')
    btn.addEventListener('animationend', () => btn.classList.remove('shake'), { once: true })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formState === 'loading') return

    const fd = new FormData(e.currentTarget)
    const payload: Partial<ContactPayload> = {
      name:    (fd.get('name')    as string).trim(),
      email:   (fd.get('email')   as string).trim(),
      company: (fd.get('company') as string).trim(),
      service: fd.get('service') as string,
      budget,
      message: (fd.get('message') as string).trim(),
    }

    // Client-side validation first
    const clientErrors = validateForm(payload)
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      // Mark all fields as touched so errors display
      setTouched({ name: true, email: true, service: true, message: true })
      shakeButton()
      // Scroll to first error
      formRef.current?.querySelector('.form-input.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setErrors({})
    setFormState('loading')

    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })

      const json: { success: boolean; errors?: FieldErrors; message?: string } = await res.json()

      if (!res.ok || !json.success) {
        setErrors(json.errors ?? { general: 'Something went wrong. Please try again.' })
        setFormState('error')
        shakeButton()
        return
      }

      setFormState('success')
      formRef.current?.reset()
      setBudget('')
      setTouched({})
      setErrors({})

      // Reset to idle after 8s so the form can be used again
      setTimeout(() => setFormState('idle'), 8000)

    } catch (err) {
      console.error('[Contact form]', err)
      setErrors({ general: 'Network error. Please check your connection and try again.' })
      setFormState('error')
      shakeButton()
    }
  }

  // CSS class helpers
  const inputClass = (field: FieldKey) =>
    `form-input${touched[field] && errors[field] ? ' error' : ''}`

  const isLoading = formState === 'loading'
  const isSuccess = formState === 'success'

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-inner">

          {/* ── Left: Info ───────────────────────────────────── */}
          <div className="contact-info reveal">
            <p className="section-eyebrow">Get In Touch</p>
            <h2 className="section-title" id="contact-heading">
              Ready to Build Something <em>Legendary?</em>
            </h2>
            <p className="contact-body">
              Tell us about your project. We respond within 24 hours and offer a
              complimentary strategy consultation.
            </p>

            <div className="contact-details">
              {CONTACT_DETAILS.map(d => (
                <div key={d.label} className="contact-detail">
                  <span className="cd-icon" aria-hidden="true">{d.icon}</span>
                  <div>
                    <span className="cd-label">{d.label}</span>
                    {d.href
                      ? <a href={d.href} className="cd-value">{d.value}</a>
                      : <span className="cd-value">{d.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Form ──────────────────────────────────── */}
          <div className="contact-form-wrap reveal reveal-delay-2">
            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >

              {/* Row 1: Name + Email */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cf-name" className="form-label">Full Name *</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    className={inputClass('name')}
                    placeholder="John Smith"
                    required
                    autoComplete="name"
                    disabled={isLoading || isSuccess}
                    onBlur={() => handleBlur('name')}
                    onChange={e => handleChange('name', e.target.value)}
                  />
                  <FieldError msg={touched.name ? errors.name : undefined} />
                </div>

                <div className="form-group">
                  <label htmlFor="cf-email" className="form-label">Email Address *</label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className={inputClass('email')}
                    placeholder="john@company.com"
                    required
                    autoComplete="email"
                    disabled={isLoading || isSuccess}
                    onBlur={() => handleBlur('email')}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                  <FieldError msg={touched.email ? errors.email : undefined} />
                </div>
              </div>

              {/* Row 2: Company + Service */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cf-company" className="form-label">Company</label>
                  <input
                    id="cf-company"
                    name="company"
                    type="text"
                    className="form-input"
                    placeholder="Your Company"
                    autoComplete="organization"
                    disabled={isLoading || isSuccess}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cf-service" className="form-label">Service Needed *</label>
                  <select
                    id="cf-service"
                    name="service"
                    className={`${inputClass('service')} form-select`}
                    required
                    defaultValue=""
                    disabled={isLoading || isSuccess}
                    onBlur={() => handleBlur('service')}
                    onChange={e => handleChange('service', e.target.value)}
                  >
                    <option value="" disabled>Select a service</option>
                    {SERVICE_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <FieldError msg={touched.service ? errors.service : undefined} />
                </div>
              </div>

              {/* Budget */}
              <div className="form-group form-group--full">
                <label className="form-label" id="budget-label">Estimated Budget</label>
                <div className="budget-options" role="group" aria-labelledby="budget-label">
                  {BUDGET_OPTIONS.map(o => (
                    <label
                      key={o.value}
                      className={`budget-opt${budget === o.value ? ' selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={o.value}
                        checked={budget === o.value}
                        onChange={() => setBudget(o.value)}
                        disabled={isLoading || isSuccess}
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="form-group form-group--full">
                <label htmlFor="cf-message" className="form-label">Project Brief *</label>
                <textarea
                  id="cf-message"
                  name="message"
                  className={`${inputClass('message')} form-textarea`}
                  placeholder="Tell us about your project, goals, and timeline..."
                  rows={5}
                  required
                  disabled={isLoading || isSuccess}
                  onBlur={() => handleBlur('message')}
                  onChange={e => handleChange('message', e.target.value)}
                />
                <FieldError msg={touched.message ? errors.message : undefined} />
              </div>

              {/* General API error */}
              {formState === 'error' && errors.general && (
                <div
                  className="form-error visible"
                  role="alert"
                  aria-live="assertive"
                  style={{ textAlign: 'center', padding: '12px', background: 'rgba(224,82,82,0.08)', borderRadius: '4px', border: '1px solid rgba(224,82,82,0.2)' }}
                >
                  {errors.general}
                </div>
              )}

              {/* Submit */}
              <button
                ref={btnRef}
                type="submit"
                className={`btn btn-gold w-full form-submit magnetic${isLoading ? ' loading' : ''}`}
                disabled={isLoading || isSuccess}
                aria-label={isLoading ? 'Sending message…' : 'Send message'}
              >
                <span className="btn-inner">
                  {isLoading ? (
                    <>
                      <span className="submit-spinner" aria-hidden="true" />
                      <span className="submit-text" style={{ marginLeft: 10 }}>Sending…</span>
                    </>
                  ) : isSuccess ? (
                    <span className="submit-text">✓ Message Sent!</span>
                  ) : (
                    <>
                      <span className="submit-text">Send Message</span>
                      <span className="btn-arrow" aria-hidden="true">↗</span>
                    </>
                  )}
                </span>
                <span className="btn-shine" aria-hidden="true" />
              </button>

              {/* Success banner */}
              {isSuccess && (
                <div
                  className="form-success visible"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="fs-check" aria-hidden="true">✓</span>
                  {' '}Message sent successfully! Check your inbox — we&rsquo;ve sent a confirmation.
                  We&rsquo;ll be in touch within 24 hours.
                </div>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
