'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { NAV_LINKS } from '@/data/site'

function scrollTo(id: string) {
  const el = document.querySelector(id)
  if (!el) return
  window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [hidden,   setHidden]     = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [activeId, setActiveId]   = useState('')
  const lastY = useRef(0)

  /* ── Scroll behaviour ──────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      if (y > 300) setHidden(y > lastY.current + 4)
      else setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Scroll spy ────────────────────────────────────────── */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveId(e.target.id)
      })
    }, { rootMargin: '-40% 0px -55% 0px' })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  /* ── Mobile menu body lock ─────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (href: string) => {
    scrollTo(href)
    setMenuOpen(false)
  }

  return (
    <nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
      role="navigation" aria-label="Main navigation"
    >
      <div className="nav-inner">
        {/* Logo */}
        <a href="#home" className="nav-logo" aria-label="Apex home" onClick={e => { e.preventDefault(); handleNav('#home') }}>
          <div className="nav-eagle-wrap">
            <Image src="/eagle.png" alt="Apex Eagle" width={36} height={30} className="nav-eagle" priority />
            <div className="nav-eagle-glow" aria-hidden="true" />
          </div>
          <span className="nav-brand">APEX</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link${activeId === link.href.slice(1) ? ' active' : ''}`}
                onClick={e => { e.preventDefault(); handleNav(link.href) }}
              >
                <span>{link.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="nav-link nav-cta"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
            >
              <span>Get Started</span>
              <div className="cta-shine" aria-hidden="true" />
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="hb-line" />
          <span className="hb-line" />
          <span className="hb-line" />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="menu">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-link"
            role="menuitem"
            onClick={e => { e.preventDefault(); handleNav(link.href) }}
          >
            <span className="ml-num">{link.num}</span>
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-link mobile-cta"
          role="menuitem"
          onClick={e => { e.preventDefault(); handleNav('#contact') }}
        >
          Get Started →
        </a>
      </div>
    </nav>
  )
}
