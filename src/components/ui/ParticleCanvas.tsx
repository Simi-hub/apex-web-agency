'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  alpha: number
  maxAlpha: number
  life: number
  maxLife: number
  gold: boolean
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let raf: number

    const COUNT = window.innerWidth < 768 ? 30 : 60
    const particles: Particle[] = []

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      W = canvas.width
      H = canvas.height
    }

    resize()

    window.addEventListener('resize', resize, { passive: true })

    function makeParticle(init = false): Particle {
      return {
        x: Math.random() * W,
        y: init ? Math.random() * H : H + 10,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.5 + 0.2),
        alpha: 0,
        maxAlpha: Math.random() * 0.35 + 0.05,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        gold: Math.random() > 0.35,
      }
    }

    for (let i = 0; i < COUNT; i++) {
      particles.push(makeParticle(true))
    }

    function loop() {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.speedX
        p.y += p.speedY
        p.life++

        const half = p.maxLife / 2

        p.alpha =
          p.life < half
            ? (p.life / half) * p.maxAlpha
            : ((p.maxLife - p.life) / half) * p.maxAlpha

        if (p.life >= p.maxLife) {
          particles[i] = makeParticle()
          continue
        }

        ctx.save()

        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.gold
          ? 'rgb(201,162,39)'
          : 'rgb(168,168,179)'

        ctx.shadowBlur = 4
        ctx.shadowColor = p.gold
          ? 'rgba(201,162,39,0.8)'
          : 'rgba(168,168,179,0.5)'

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      raf = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  )
}