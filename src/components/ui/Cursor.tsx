'use client'
import { useEffect, useRef, useState } from 'react'

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [isFine, setIsFine]   = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setIsFine(true)

    let mx = 0, my = 0, rx = 0, ry = 0, raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top  = my + 'px'
      }
      // Hover detection
      const el = document.elementFromPoint(mx, my)
      const isLink = el?.closest('a, button, .filter-btn, .t-btn, label, .budget-opt')
      setHovered(!!isLink)
    }

    const tick = () => {
      rx = lerp(rx, mx, 0.1)
      ry = lerp(ry, my, 0.1)
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top  = ry + 'px'
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    // Click ripple
    const onClick = (e: MouseEvent) => {
      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position:fixed; left:${e.clientX}px; top:${e.clientY}px;
        width:0; height:0; border-radius:50%;
        border:1.5px solid rgba(201,162,39,0.7);
        transform:translate(-50%,-50%);
        pointer-events:none; z-index:9997;
        animation:cursorBurst 0.55s cubic-bezier(0.16,1,0.3,1) forwards;
      `
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!isFine) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', zIndex: 9999, pointerEvents: 'none',
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          background: hovered ? 'transparent' : 'var(--gold-light)',
          boxShadow: hovered ? 'none' : '0 0 10px var(--gold), 0 0 20px rgba(201,162,39,0.4)',
          width:  hovered ? 0 : 8,
          height: hovered ? 0 : 8,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', zIndex: 9998, pointerEvents: 'none',
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          border: `${hovered ? 2 : 1}px solid ${hovered ? 'var(--gold)' : 'rgba(201,162,39,0.5)'}`,
          width:  hovered ? 64 : 40,
          height: hovered ? 64 : 40,
          background: hovered ? 'rgba(201,162,39,0.06)' : 'transparent',
          transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.25s, border-width 0.25s',
        }}
      />
    </>
  )
}
