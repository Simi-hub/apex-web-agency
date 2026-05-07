'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { TESTIMONIALS } from '@/data/site'

export default function Testimonials() {
  const [cur, setCur]     = useState(0)
  const autoRef           = useRef<ReturnType<typeof setInterval>>()
  const wrapRef           = useRef<HTMLDivElement>(null)
  const startXRef         = useRef(0)
  const total             = TESTIMONIALS.length

  const go = useCallback((i: number) => {
    setCur(((i % total) + total) % total)
  }, [total])

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current)
    autoRef.current = setInterval(() => go(cur + 1), 5500)
  }, [cur, go])

  useEffect(() => {
    startAuto()
    return () => clearInterval(autoRef.current)
  }, [cur]) // eslint-disable-line react-hooks/exhaustive-deps

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { startXRef.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = startXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) go(diff > 0 ? cur + 1 : cur - 1)
  }

  return (
    <section className="testimonials section" aria-label="Client testimonials">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Client Voices</p>
          <h2 className="section-title">
            What Global Leaders <em>Say</em>
          </h2>
        </div>

        <div
          className="testimonial-track-wrap"
          ref={wrapRef}
          onMouseEnter={() => clearInterval(autoRef.current)}
          onMouseLeave={startAuto}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="testimonial-track"
            style={{ transform: `translateX(-${cur * 100}%)` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <blockquote
                key={t.name}
                className="testimonial-card"
                style={{
                  opacity: i === cur ? 1 : 0.4,
                  transform: i === cur ? 'scale(1)' : 'scale(0.97)',
                  transition: 'opacity 0.5s, transform 0.5s',
                }}
              >
                <div className="tc-mark" aria-hidden="true">&ldquo;</div>
                <p className="testimonial-quote">{t.quote}</p>
                <footer className="testimonial-author">
                  <div className="author-avatar" aria-hidden="true">{t.initials}</div>
                  <div>
                    <cite className="author-name">{t.name}</cite>
                    <span className="author-title">{t.title}</span>
                  </div>
                  <div className="tc-stars" aria-label="5 stars">★★★★★</div>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="testimonial-controls" aria-label="Testimonial navigation">
            <button className="t-btn" onClick={() => go(cur - 1)} aria-label="Previous">←</button>
            <div className="t-dots" role="tablist">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`t-dot${i === cur ? ' active' : ''}`}
                  onClick={() => go(i)}
                  role="tab"
                  aria-label={`Slide ${i + 1}`}
                  aria-selected={i === cur}
                />
              ))}
            </div>
            <button className="t-btn" onClick={() => go(cur + 1)} aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </section>
  )
}
