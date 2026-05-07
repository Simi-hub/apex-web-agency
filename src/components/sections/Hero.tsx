'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useCounter } from '@/hooks/useCounter'
import { STATS } from '@/data/site'

function StatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(target)
  return (
    <div className="stat">
      <div className="stat-top">
        <span className="stat-num" ref={ref as React.RefObject<HTMLSpanElement>}>{count}</span>
        <span className="stat-suffix">{suffix}</span>
      </div>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function Hero() {
  const eagleRef = useRef<HTMLDivElement>(null)

  /* ── Parallax eagle on scroll ────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      if (!eagleRef.current) return
      const y = window.scrollY
      if (y > window.innerHeight) return
      eagleRef.current.style.transform = `translateY(calc(-50% + ${y * 0.22}px))`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Reveal elements on mount ────────────────────────── */
useEffect(() => {
  const els = document.querySelectorAll('.hero-content .reveal')

  els.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible')
    }, 200 + i * 120)
  })
}, [])

  return (
    <section className="hero" id="home" aria-label="Hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <div className="hero-content">
        {/* Eyebrow */}
        <div className="hero-eyebrow-wrap reveal">
          <div className="eyebrow-line" aria-hidden="true" />
          <p className="hero-eyebrow">Global Web Agency</p>
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          <span className="hero-line reveal reveal-delay-1">We Design & Build</span>
          <br />
          <em className="hero-line reveal reveal-delay-2">High-Converting Websites</em>
          <br />
          <span className="hero-line hero-outline reveal reveal-delay-3">For Businesses Worldwide</span>
        </h1>

        {/* Sub */}
        <p className="hero-sub reveal reveal-delay-4">
          From modern designs to full website builds and upgrades — 
          <br className="br-desk" />
          we create fast, professional websites that attract clients and grow your business.
        </p>

        {/* CTAs */}
        <div className="hero-actions reveal reveal-delay-5">
          <a href="#contact" className="btn btn-gold magnetic" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <span className="btn-inner">
              <span className="btn-text">Start Your Project</span>
              <span className="btn-arrow">↗</span>
            </span>
            <span className="btn-shine" aria-hidden="true" />
          </a>
          <a href="#portfolio" className="btn btn-ghost magnetic" onClick={e => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}>
            <span className="btn-inner">
              <span className="btn-text">View Our Work</span>
            </span>
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats reveal reveal-delay-5">
        {STATS.map((s, i) => (
  <div key={s.label} className="stat-group">
    {i > 0 && (
      <div className="stat-divider" aria-hidden="true" />
    )}

    <StatItem
      target={s.target}
      suffix={s.suffix}
      label={s.label}
    />
  </div>
))}
        </div>
      </div>

      {/* Eagle watermark */}
      <div
        className="hero-eagle-wrap"
        ref={eagleRef}
        aria-hidden="true"
      >
        <Image
          src="/eagle.png"
          alt=""
          fill
          style={{
            objectFit: 'contain',
            opacity: 0.11,
            filter: 'blur(0.5px) brightness(1.2)',
          }}
          className="hero-eagle-bg"
        />

        <div className="hero-eagle-glow" />
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}