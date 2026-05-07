import Image from 'next/image'
import { FOOTER_LINKS } from '@/data/site'

const SOCIAL = [
  { label: 'X / Twitter', href: '#', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
  { label: 'LinkedIn',    href: '#', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
  { label: 'Instagram',   href: '#', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
  { label: 'Behance',     href: '#', icon: <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.051-2.053-5.051-5.02 0-3.08 1.977-5.042 5.051-5.042 3.06 0 5.015 1.957 5.101 5.073H15.35c.094 1.64 1.062 2.27 2.273 2.27 1.218 0 1.948-.549 2.103-1.281H23.726zM15.351 10.7h3.872c-.06-1.3-.824-2-1.908-2-1.083 0-1.845.7-1.964 2zM5.186 14.104c0 1.054-.655 1.664-2.018 1.664H2v-3.396h1.014c1.519 0 2.172.585 2.172 1.732zM5.078 9.4c0 1.014-.618 1.577-1.875 1.577H2V7.852h1.082c1.312 0 1.996.514 1.996 1.548zM0 5v14h4.77c2.783 0 4.6-1.3 4.6-3.645 0-1.45-.786-2.745-2.23-3.195C8.378 11.73 9 10.6 9 9.33 9 7.157 7.431 5 4.77 5H0z" /> },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">

          {/* Brand column */}
          <div className="footer-brand">
            <a href="#home" className="footer-logo" aria-label="Home">
              <Image src="/eagle.png" alt="Apex eagle" width={40} height={33} className="footer-eagle" />
              <span className="footer-brand-name">APEX</span>
            </a>
            <p className="footer-tagline">
              Crafting digital empires for ambitious brands across the globe.
            </p>
            <div className="footer-social" aria-label="Social media">
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} className="social-link" aria-label={s.label}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width={15} height={15}>
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <nav className="footer-nav" aria-label="Footer navigation">
            {Object.entries(FOOTER_LINKS).map(([col, links]) => (
              <div key={col} className="footer-col">
                <h4 className="footer-col-title">{col}</h4>
                <ul role="list">
                  {links.map(l => (
                    <li key={l.label}><a href={l.href}>{l.label}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {year} Apex Web Agency. All rights reserved.</p>
          <p className="footer-made">Crafted with precision. Built for the world.</p>
        </div>
      </div>
    </footer>
  )
}
