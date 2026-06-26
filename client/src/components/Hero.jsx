import { useEffect, useRef, useState } from 'react'
import './Hero.css'

/* ── Typed Text Hook ── */
function useTyped(words, speed = 100, deleteSpeed = 55, pause = 1800) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let delay = deleting ? deleteSpeed : speed
    if (!deleting && charIdx === word.length) delay = pause
    if (deleting && charIdx === 0) delay = 400

    const t = setTimeout(() => {
      if (!deleting && charIdx < word.length) {
        setText(word.slice(0, charIdx + 1)); setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === word.length) {
        setDeleting(true)
      } else if (deleting && charIdx > 0) {
        setText(word.slice(0, charIdx - 1)); setCharIdx(c => c - 1)
      } else {
        setDeleting(false); setWordIdx(i => (i + 1) % words.length)
      }
    }, delay)
    return () => clearTimeout(t)
  }, [charIdx, deleting, wordIdx])

  return text
}

/* ── 3D Globe Canvas ── */
function Globe3D() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    let THREE, renderer, scene, camera
    let sphere, wireframe, ring1, ring2, ring3, particles, goldParticles

    async function init() {
      THREE = (await import('three')).default || await import('three')
      const W = canvas.clientWidth
      const H = canvas.clientHeight

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
      camera.position.set(0, 0, 6)

      // Core sphere
      const geoS = new THREE.SphereGeometry(1.8, 80, 80)
      const matS = new THREE.MeshPhongMaterial({
        color: 0x0d1b35,
        emissive: 0x0a0f30,
        specular: 0x6366f1,
        shininess: 100,
        transparent: true,
        opacity: 0.92,
      })
      sphere = new THREE.Mesh(geoS, matS)
      scene.add(sphere)

      // Icosahedron inner glow
      const geoI = new THREE.IcosahedronGeometry(1.82, 1)
      const matI = new THREE.MeshBasicMaterial({
        color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.07,
      })
      wireframe = new THREE.Mesh(geoI, matI)
      scene.add(wireframe)

      // Dense wireframe sphere
      const geoW = new THREE.SphereGeometry(1.83, 32, 32)
      const matW = new THREE.MeshBasicMaterial({
        color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.12,
      })
      const wSphere = new THREE.Mesh(geoW, matW)
      scene.add(wSphere)
      sphere.userData.wSphere = wSphere

      // Ring 1 — indigo
      const geoR1 = new THREE.TorusGeometry(2.5, 0.03, 16, 120)
      const matR1 = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.35 })
      ring1 = new THREE.Mesh(geoR1, matR1)
      ring1.rotation.x = Math.PI / 2.2
      scene.add(ring1)

      // Ring 2 — cyan
      const geoR2 = new THREE.TorusGeometry(2.9, 0.025, 16, 120)
      const matR2 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.25 })
      ring2 = new THREE.Mesh(geoR2, matR2)
      ring2.rotation.x = Math.PI / 3
      ring2.rotation.z = Math.PI / 5
      scene.add(ring2)

      // Ring 3 — gold
      const geoR3 = new THREE.TorusGeometry(3.3, 0.02, 16, 120)
      const matR3 = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.18 })
      ring3 = new THREE.Mesh(geoR3, matR3)
      ring3.rotation.y = Math.PI / 4
      ring3.rotation.z = Math.PI / 6
      scene.add(ring3)

      // Indigo particles
      const pCount = 220
      const pPos = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        const r = 2.2 + Math.random() * 2.8
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        pPos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
        pPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
        pPos[i*3+2] = r * Math.cos(phi)
      }
      const geoP = new THREE.BufferGeometry()
      geoP.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      const matP = new THREE.PointsMaterial({ color: 0x818cf8, size: 0.05, transparent: true, opacity: 0.75 })
      particles = new THREE.Points(geoP, matP)
      scene.add(particles)

      // Gold particles
      const gCount = 80
      const gPos = new Float32Array(gCount * 3)
      for (let i = 0; i < gCount; i++) {
        const r = 1.9 + Math.random() * 1.4
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        gPos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
        gPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
        gPos[i*3+2] = r * Math.cos(phi)
      }
      const geoG = new THREE.BufferGeometry()
      geoG.setAttribute('position', new THREE.BufferAttribute(gPos, 3))
      const matG = new THREE.PointsMaterial({ color: 0xf59e0b, size: 0.065, transparent: true, opacity: 0.65 })
      goldParticles = new THREE.Points(geoG, matG)
      scene.add(goldParticles)

      // Cyan particles
      const cCount = 60
      const cPos = new Float32Array(cCount * 3)
      for (let i = 0; i < cCount; i++) {
        const r = 2.5 + Math.random() * 2.0
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        cPos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
        cPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
        cPos[i*3+2] = r * Math.cos(phi)
      }
      const geoC = new THREE.BufferGeometry()
      geoC.setAttribute('position', new THREE.BufferAttribute(cPos, 3))
      const matC = new THREE.PointsMaterial({ color: 0x06b6d4, size: 0.05, transparent: true, opacity: 0.6 })
      const cyanParticles = new THREE.Points(geoC, matC)
      scene.add(cyanParticles)
      sphere.userData.cyanParticles = cyanParticles

      // Lights
      scene.add(new THREE.AmbientLight(0x1a1060, 2.5))
      const l1 = new THREE.PointLight(0x6366f1, 8, 20)
      l1.position.set(4, 3, 4); scene.add(l1)
      const l2 = new THREE.PointLight(0xf59e0b, 4, 15)
      l2.position.set(-4, -2, 2); scene.add(l2)
      const l3 = new THREE.PointLight(0x06b6d4, 5, 18)
      l3.position.set(0, 5, -3); scene.add(l3)
      const l4 = new THREE.PointLight(0x8b5cf6, 3, 12)
      l4.position.set(-2, 4, 3); scene.add(l4)

      // Mouse
      let mx = 0, my = 0
      const onMM = e => {
        const rect = canvas.getBoundingClientRect()
        mx = ((e.clientX - rect.left) / W - 0.5) * 2
        my = -((e.clientY - rect.top) / H - 0.5) * 2
      }
      window.addEventListener('mousemove', onMM)
      canvas.userData = { onMM }

      let t = 0
      function animate() {
        animRef.current = requestAnimationFrame(animate)
        t += 0.007
        sphere.rotation.y += 0.003
        sphere.rotation.x += 0.001
        sphere.position.y = Math.sin(t * 0.8) * 0.18
        wireframe.rotation.y = sphere.rotation.y * 1.3
        wireframe.rotation.x = sphere.rotation.x * 0.9
        sphere.userData.wSphere.rotation.y = sphere.rotation.y
        sphere.userData.wSphere.position.y = sphere.position.y
        wireframe.position.y = sphere.position.y
        ring1.rotation.z += 0.005
        ring2.rotation.y += 0.004
        ring3.rotation.x += 0.003
        particles.rotation.y += 0.001
        goldParticles.rotation.y -= 0.0015
        goldParticles.rotation.x += 0.001
        sphere.userData.cyanParticles.rotation.x += 0.001
        sphere.userData.cyanParticles.rotation.z -= 0.0008
        matS.emissiveIntensity = 0.3 + Math.sin(t * 1.8) * 0.12
        matR1.opacity = 0.28 + Math.sin(t * 2.2) * 0.1
        camera.position.x += (mx * 0.8 - camera.position.x) * 0.04
        camera.position.y += (my * 0.5 - camera.position.y) * 0.04
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
      }
      animate()

      const onResize = () => {
        const nW = canvas.clientWidth, nH = canvas.clientHeight
        renderer.setSize(nW, nH)
        camera.aspect = nW / nH
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)
    }

    init().catch(console.error)

    return () => {
      cancelAnimationFrame(animRef.current)
      if (renderer) renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="globe-canvas" />
}

/* ── Hero ── */
export default function Hero() {
  const typed = useTyped([
    'IT Student.',
    'Founder.',
    'Builder.',
    'Automator.',
    'Entrepreneur.',
    'Problem Solver.',
  ])

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="home">
      {/* Glow blobs */}
      <div className="hero-blob blob-1" />
      <div className="hero-blob blob-2" />
      <div className="hero-blob blob-3" />

      <div className="hero-grid-overlay" />

      <div className="hero-inner">
        {/* Left — content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span className="eyebrow-code">const</span>
            <span className="eyebrow-var"> haniya</span>
            <span className="eyebrow-eq"> = </span>
            <span className="eyebrow-val">"Chennai, India"</span>
          </div>

          <h1 className="hero-h1">
            Hi, I'm{' '}
            <span className="h1-name">Haniya.</span>
            <br />
            <span className="h1-sub">
              I'm a <span className="h1-typed">{typed}<span className="cursor" /></span>
            </span>
          </h1>

          <p className="hero-desc">
            B.Tech Information Technology student with a <strong>founder's mindset</strong>.
            I build AI-powered products, automate real business workflows, and obsess over
            the intersection of <strong>tech and entrepreneurship</strong>.
          </p>

          <div className="hero-tags">
            {['React', 'Node.js', 'MongoDB', 'AI/ML', 'WhatsApp API', 'SaaS'].map(t => (
              <span key={t} className="hero-tag">{t}</span>
            ))}
          </div>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>
              🚀 View My Work
            </button>
            <button className="btn-outline" onClick={() => scrollTo('contact')}>
              Connect With Me →
            </button>
          </div>

          <div className="hero-stats">
            {[
              { val: '3+', label: 'Live Projects' },
              { val: '3+', label: 'Pilot Clients' },
              { val: '∞', label: 'Problems to Solve' },
            ].map(s => (
              <div key={s.label} className="hero-stat">
                <span className="stat-val">{s.val}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D Globe */}
        <div className="hero-3d">
          <Globe3D />
          <div className="globe-label top-left">
            <span className="gl-dot indigo" />
            ReplyAI
          </div>
          <div className="globe-label top-right">
            <span className="gl-dot cyan" />
            B.Tech IT
          </div>
          <div className="globe-label bottom-left">
            <span className="gl-dot gold" />
            Chennai
          </div>
          <div className="globe-label bottom-right">
            <span className="gl-dot green" />
            Open to Work
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll" onClick={() => scrollTo('about')}>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
