'use client'
import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { PRICING_PLANS } from '@/data/site'

function PricingCard({ plan, index }: { plan: typeof PRICING_PLANS[0]; index: number }) {
  const ref = null
  const glowRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!glowRef.current) return
    const r = e.currentTarget.getBoundingClientRect()
    glowRef.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%')
    glowRef.current.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%')
  }

  return (
    <article  
      className={`pricing-card${plan.featured ? ' pricing-card--featured' : ''}`}
    >
      <div className="pc-glow" ref={glowRef} aria-hidden="true" />
      {plan.featured && <div className="pricing-popular">Most Popular</div>}

      <div className="pricing-header">
        <span className="pricing-tier">{plan.tier}</span>
        <div className="pricing-price">
          {plan.price ? (
            <>
              <span className="price-currency">$</span>
              <span className="price-amount">{plan.price}</span>
            </>
          ) : (
            <span className="price-amount price-custom">Custom</span>
          )}
        </div>
        <p className="pricing-tagline">{plan.tagline}</p>
      </div>

      <ul className="pricing-features" role="list">
        {plan.features.map(f => (
          <li key={f.text} className={f.available ? '' : 'unavailable'}>{f.text}</li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`btn ${plan.featured ? 'btn-gold' : 'btn-ghost'} w-full`}
      >
        {plan.cta}
      </a>
    </article>
  )
}

export default function Pricing() {
  return (
    <section className="pricing section" id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Investment</p>
          <h2 className="section-title" id="pricing-heading">
            Transparent <em>Pricing</em> Plans
          </h2>
          <p className="section-desc">
            Clear, no-surprise pricing for every stage of your digital journey. All plans include dedicated support.
          </p>
        </div>

        <div className="pricing-grid">
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={plan.tier} plan={plan} index={i} />
          ))}
        </div>

        <p className="pricing-note">
          All prices are starting rates. Final quotes based on scope.{' '}
          <a href="#contact">Contact us</a> for a free consultation.
        </p>
      </div>
    </section>
  )
}
