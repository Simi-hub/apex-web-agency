'use client'
import { useRef, useCallback } from 'react'

export function useMagnetic(strength = 0.3) {
  const btnRef  = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const r  = btn.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width  / 2)) * strength
    const dy = (e.clientY - (r.top  + r.height / 2)) * strength
    btn.style.transform   = `translate(${dx}px, ${dy}px)`
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${dx * 0.4}px, ${dy * 0.4}px)`
    }
  }, [strength])

  const onLeave = useCallback(() => {
    if (btnRef.current)  btnRef.current.style.transform  = ''
    if (innerRef.current) innerRef.current.style.transform = ''
  }, [])

  return { btnRef, innerRef, onMove, onLeave }
}
