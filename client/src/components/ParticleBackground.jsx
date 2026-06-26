import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, particles, animId, mouse = { x: 0, y: 0 }

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    function createParticles() {
      particles = Array.from({ length: 160 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.6
          ? `rgba(99,102,241,`
          : Math.random() > 0.5
            ? `rgba(6,182,212,`
            : `rgba(245,158,11,`
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }

        // Mouse repulsion
        const mdx = particles[i].x - mouse.x
        const mdy = particles[i].y - mouse.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 100) {
          particles[i].x += mdx * 0.03
          particles[i].y += mdy * 0.03
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.opacity})`
        ctx.fill()

        // Glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        grd.addColorStop(0, `${p.color}0.08)`)
        grd.addColorStop(1, `${p.color}0)`)
        ctx.fillStyle = grd
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    const onMouse = e => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onTouch = e => {
      mouse.x = e.touches[0].clientX
      mouse.y = e.touches[0].clientY
    }

    resize()
    createParticles()
    draw()

    window.addEventListener('resize', () => { resize(); createParticles() })
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  )
}
