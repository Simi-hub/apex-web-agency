'use client'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone]         = useState(false)
  const [hidden, setHidden]     = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const inc = prev < 70 ? 3 + Math.random() * 5 : 0.6 + Math.random() * 1.2
        return Math.min(prev + inc, 98)
      })
    }, 60)

    const finish = () => {
      clearInterval(intervalRef.current)
      setProgress(100)
      setTimeout(() => {
        setDone(true)
        setTimeout(() => setHidden(true), 600)
      }, 300)
    }

    if (document.readyState === 'complete') {
      setTimeout(finish, 800)
    } else {
      window.addEventListener('load', () => setTimeout(finish, 400), { once: true })
      setTimeout(finish, 3000)
    }

    return () => clearInterval(intervalRef.current)
  }, [])

  if (hidden) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'var(--black)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'opacity 0.6s, visibility 0.6s',
        opacity: done ? 0 : 1,
        visibility: done ? 'hidden' : 'visible',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <Image
          src="/eagle.png" alt="" width={100} height={80}
          style={{ filter: 'drop-shadow(0 0 20px rgba(201,162,39,0.5))', animation: 'loaderPulse 1.5s ease-in-out infinite' }}
          priority
        />
        <div style={{ width: 200, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, #9a7a1a, #e8c04a, #9a7a1a)',
            borderRadius: 1, boxShadow: '0 0 8px #c9a227',
            transition: 'width 0.05s linear',
          }} />
        </div>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)' }}>
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  )
}
