'use client'
import { useState, useEffect, useRef } from 'react'

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function useCounter(target: number, duration = 2200) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  // Intersection observer to start counting when visible
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  // Animation loop
  useEffect(() => {
    if (!started) return
    const startTime = performance.now()

    const frame = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      setCount(Math.round(easeOut(t) * target))
      if (t < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }, [started, target, duration])

  return { count, ref }
}
