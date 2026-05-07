'use client'
import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SERVICES } from '@/data/site'

/* SVG icons for each service */
const ICONS = [
  // Website Design
  <svg key="design" viewBox="0 0 60 60" fill="none"><rect x="5" y="10" width="50" height="35" rx="3" stroke="currentColor" strokeWidth="1.5"/><line x1="5" y1="20" x2="55" y2="20" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="15" r="2" fill="currentColor"/><circle cx="20" cy="15" r="2" fill="currentColor"/><circle cx="28" cy="15" r="2" fill="currentColor"/><rect x="12" y="27" width="16" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/><line x1="33" y1="29" x2="48" y2="29" stroke="currentColor" strokeWidth="1.5"/><line x1="33" y1="33" x2="44" y2="33" stroke="currentColor" strokeWidth="1.5"/><line x1="33" y1="37" x2="46" y2="37" stroke="currentColor" strokeWidth="1.5"/><line x1="22" y1="45" x2="38" y2="45" stroke="currentColor" strokeWidth="2"/><line x1="30" y1="45" x2="30" y2="50" stroke="currentColor" strokeWidth="2"/><line x1="20" y1="50" x2="40" y2="50" stroke="currentColor" strokeWidth="2"/></svg>,
  // Development
  <svg key="dev" viewBox="0 0 60 60" fill="none"><polyline points="18,22 8,30 18,38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><polyline points="42,22 52,30 42,38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="35" y1="14" x2="25" y2="46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // Redesign
  <svg key="redesign" viewBox="0 0 60 60" fill="none"><path d="M10 30 A20 20 0 1 1 30 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><polyline points="26,45 30,50 26,55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="30" cy="25" r="6" stroke="currentColor" strokeWidth="1.5"/><line x1="30" y1="10" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5"/><line x1="30" y1="34" x2="30" y2="40" stroke="currentColor" strokeWidth="1.5"/><line x1="45" y1="25" x2="39" y2="25" stroke="currentColor" strokeWidth="1.5"/><line x1="21" y1="25" x2="15" y2="25" stroke="currentColor" strokeWidth="1.5"/></svg>,
]

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useScrollReveal<HTMLElement>({ threshold: 0.1 })
  const glowRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current) return
    const r  = e.currentTarget.getBoundingClientRect()
    glowRef.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%')
    glowRef.current.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%')
  }

  return (
    <article
      ref={ref}
     className={`service-card ${service.featured ? ' service-card--featured' : ''}`}
      onMouseMove={onMouseMove}
    >
      <div className="sc-glow" ref={glowRef} aria-hidden="true" />
      <div className="sc-border" aria-hidden="true" />
      {service.featured && <div className="service-badge">Most Popular</div>}

      <div className="service-icon" aria-hidden="true">
        {ICONS[index]}
      </div>
      <span className="service-num" aria-hidden="true">{service.num}</span>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.desc}</p>
      <ul className="service-features">
        {service.features.map(f => <li key={f}>{f}</li>)}
      </ul>
      <a href="#contact" className="service-link">
        Learn More <span className="sl-arrow">→</span>
      </a>
    </article>
  )
}

export default function Services() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="services section" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <p className="section-eyebrow">What We Offer</p>
          <h2 className="section-title" id="services-heading">
            Services Built for <em>World-Class</em> Results
          </h2>
         <p className="section-desc">
            From concept to launch, we deliver end-to-end web solutions that command attention and convert visitors into loyal customers.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
