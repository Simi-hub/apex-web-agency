'use client'
import { useEffect, useState } from 'react'

/* ── Back to Top ──────────────────────────────────────────── */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`back-top${visible ? ' visible' : ''}`}
    >
      ↑
    </button>
  )
}

/* ── Read Progress Bar ────────────────────────────────────── */
export function ReadProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 1001,
        height: 2, width: `${pct}%`,
        background: 'linear-gradient(90deg, #9a7a1a, #e8c04a, #9a7a1a)',
        backgroundSize: '200% 100%',
        animation: 'gradShift 3s linear infinite',
        transition: 'width 0.1s',
        pointerEvents: 'none',
        boxShadow: '0 0 8px rgba(201,162,39,0.6)',
      }}
    />
  )
}

/* ── Noise Overlay ────────────────────────────────────────── */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="noise"
    />
  )
}

/* Default exports for individual imports */
export default BackToTop
