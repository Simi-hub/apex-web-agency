'use client'
import { useState, useRef, useLayoutEffect } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { PORTFOLIO_ITEMS, type PortfolioCategory } from '@/data/site'

const FILTERS: { label: string; value: PortfolioCategory }[] = [
  { label: 'All',         value: 'all' },
  { label: 'Design',      value: 'design' },
  { label: 'Development', value: 'development' },
  { label: 'Redesign',    value: 'redesign' },
]

function PortfolioCard({ item }: { item: typeof PORTFOLIO_ITEMS[0] }) {
  const ref = null

  return (
    <article
     className={`portfolio-card${item.wide ? ' portfolio-card--wide' : ''}`}
      data-category={item.category}
    >
      <div className="portfolio-img-wrap">
        <div
          className="pp"
          style={{ '--a': item.accentColor, '--b': item.bgColor } as React.CSSProperties}
        >
          <div className="pp-grid" />
          {item.wide
            ? <div className="pp-wide-art" />
            : item.category === 'development'
              ? <div className="pp-bars" />
              : item.category === 'redesign'
                ? <div className="pp-diamond" />
                : <div className="pp-circle" />
          }
          <div className="pp-label">{item.label}</div>
        </div>
        <div className="portfolio-overlay">
          <span className="po-tag">{item.tag}</span>
          <h3 className="po-title">{item.title}</h3>
          <a href="#contact" className="po-btn">Case Study ↗</a>
        </div>
      </div>
      <div className="portfolio-meta">
        <div>
          <span className="portfolio-tag">{item.tag}</span>
          <h3 className="portfolio-title">{item.title}</h3>
        </div>
        <span className="portfolio-client">{item.client} →</span>
      </div>
    </article>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioCategory>('all')
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = PORTFOLIO_ITEMS.filter(
    item => active === 'all' || item.category === active
  )

  // FLIP animation when filter changes
  const prevPositions = useRef<Map<number, DOMRect>>(new Map())

  const handleFilter = (cat: PortfolioCategory) => {
    // Snapshot current positions
    const grid = gridRef.current
    if (grid) {
      prevPositions.current = new Map()
      grid.querySelectorAll('.portfolio-card').forEach(card => {
        const id = parseInt((card as HTMLElement).dataset.id ?? '0')
        prevPositions.current.set(id, card.getBoundingClientRect())
      })
    }
    setActive(cat)
  }

  useLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid || prevPositions.current.size === 0) return
    grid.querySelectorAll('.portfolio-card').forEach(card => {
      const id  = parseInt((card as HTMLElement).dataset.id ?? '0')
      const old = prevPositions.current.get(id)
      if (!old) return
      const now = card.getBoundingClientRect()
      const dx  = old.left - now.left
      const dy  = old.top  - now.top
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return
      ;(card as HTMLElement).style.transition = 'none'
      ;(card as HTMLElement).style.transform  = `translate(${dx}px,${dy}px)`
      card.getBoundingClientRect() // force reflow
      ;(card as HTMLElement).style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
      ;(card as HTMLElement).style.transform  = ''
    })
  }, [active])

  return (
    <section className="portfolio section" id="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Our Work</p>
          <h2 className="section-title" id="portfolio-heading">
            Projects That <em>Speak</em> for Themselves
          </h2>
        </div>

        {/* Filters */}
        <div className="portfolio-filters" role="group" aria-label="Filter portfolio">
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`filter-btn${active === f.value ? ' active' : ''}`}
              onClick={() => handleFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="portfolio-grid" ref={gridRef}>
          {filtered.map((item, i) => (
            <div key={item.id} data-id={item.id} style={{ display: 'contents' }}>
              <PortfolioCard item={item} />
            </div>
          ))}
        </div>

        <div className="portfolio-cta-wrap">
          <a href="#contact" className="btn btn-ghost magnetic">
            <span className="btn-inner"><span className="btn-text">Discuss Your Project</span></span>
          </a>
        </div>
      </div>
    </section>
  )
}
