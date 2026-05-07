'use client'
import { useState, useRef } from 'react'
import type { ContactPayload } from '@/app/api/contact/route'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const SERVICES_OPTIONS = [
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

function validate(data: Partial<ContactPayload>) {
  const errors: Partial<Record<keyof ContactPayload, string>> = {}
  if (!data.name?.trim())    errors.name    = 'Name is required.'
  if (!data.email?.trim())   errors.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email.'
  if (!data.service?.trim()) errors.service = 'Please select a service.'
  if (!data.message?.trim()) errors.message = 'Project brief is required.'
  return errors
}

export default function Contact() {
  const [state,    setState]    = useState<FormState>('idle')
  const [errors,   setErrors]   = useState<Partial<Record<keyof ContactPayload, string>>>({})
  const [budget,   setBudget]   = useState('')
  const formRef                 = useRef<HTMLFormElement>(null)
  const btnRef                  = useRef<HTMLButtonElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload: Partial<ContactPayload> = {
      name:    fd.get('name')    as string,
      email:   fd.get('email')   as string,
      company: fd.get('company') as string,
      service: fd.get('service') as string,
      budget:  budget,
      message: fd.get('message') as string,
    }

    const clientErrors = validate(payload)
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      // Shake the button
      btnRef.current?.classList.add('shake')
      setTimeout(() => btnRef.current?.classList.remove('shake'), 500)
      return
    }
    setErrors({})
    setState('loading')

    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()

      if (!res.ok) {
        setErrors(json.errors ?? { message: 'Server error. Please try again.' })
        setState('error')
        return
      }

      setState('success')
      formRef.current?.reset()
      setBudget('')
      setTimeout(() => setState('idle'), 8000)
    } catch {
      setState('error')
      setErrors({ message: 'Network error. Please try again.' })
    }
  }

  const fieldClass = (field: keyof ContactPayload) =>
    `form-input${errors[field] ? ' error' : ''}`

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-inner">

          {/* Info */}
          <div className="contact-info">
            <p className="section-eyebrow">Get In Touch</p>
            <h2 className="section-title" id="contact-heading">
              Ready to Build Something <em>Legendary?</em>
            </h2>
            <p className="contact-body">
              Tell us about your project. We respond within 24 hours and offer a complimentary strategy consultation.
            </p>
            <div className="contact-details">
              {[
                { icon: '✉', label: 'Email',              value: 'hello@apexwebagency.com', href: 'mailto:hello@apexwebagency.com' },
                { icon: '☎', label: 'Phone / WhatsApp',   value: '+1 (234) 567-890',        href: 'tel:+1234567890' },
                { icon: '⏱', label: 'Response Time',      value: 'Within 24 Hours',         href: undefined },
              ].map(d => (
                <div key={d.label} className="contact-detail">
                  <span className="cd-icon">{d.icon}</span>
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

          {/* Form */}
          <div className="contact-form-wrap">
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input id="name" name="name" type="text" className={fieldClass('name')} placeholder="John Smith" required autoComplete="name" />
                  {errors.name && <span className="form-error visible" role="alert">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input id="email" name="email" type="email" className={fieldClass('email')} placeholder="john@company.com" required autoComplete="email" />
                  {errors.email && <span className="form-error visible" role="alert">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company" className="form-label">Company</label>
                  <input id="company" name="company" type="text" className="form-input" placeholder="Your Company" autoComplete="organization" />
                </div>
                <div className="form-group">
                  <label htmlFor="service" className="form-label">Service Needed *</label>
                  <select id="service" name="service" className={`${fieldClass('service')} form-select`} required defaultValue="">
                    <option value="" disabled>Select a service</option>
                    {SERVICES_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.service && <span className="form-error visible" role="alert">{errors.service}</span>}
                </div>
              </div>

              <div className="form-group form-group--full">
                <label className="form-label">Estimated Budget</label>
                <div className="budget-options" role="group">
                  {BUDGET_OPTIONS.map(o => (
                    <label key={o.value} className={`budget-opt${budget === o.value ? ' selected' : ''}`}>
                      <input type="radio" name="budget" value={o.value} checked={budget === o.value} onChange={() => setBudget(o.value)} />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group form-group--full">
                <label htmlFor="message" className="form-label">Project Brief *</label>
                <textarea id="message" name="message" className={`${fieldClass('message')} form-textarea`} placeholder="Tell us about your project, goals, and timeline..." rows={5} required />
                {errors.message && <span className="form-error visible" role="alert">{errors.message}</span>}
              </div>

              <button
                ref={btnRef}
                type="submit"
                className={`btn btn-gold w-full form-submit magnetic${state === 'loading' ? ' loading' : ''}`}
                disabled={state === 'loading'}
              >
                <span className="btn-inner">
                  <span className="submit-text">{state === 'loading' ? '' : 'Send Message'}</span>
                  {state === 'loading' && <span className="submit-spinner" aria-hidden="true" />}
                </span>
                <span className="btn-shine" aria-hidden="true" />
              </button>

              {state === 'success' && (
                <div className="form-success visible" role="alert" aria-live="polite">
                  <span className="fs-check">✓</span> Message sent! We&apos;ll be in touch within 24 hours.
                </div>
              )}
              {state === 'error' && errors.message && (
                <div className="form-error visible" role="alert" style={{ textAlign: 'center', marginTop: 8 }}>
                  {errors.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
