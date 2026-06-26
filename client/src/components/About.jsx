import { useRef, useEffect } from 'react'
import './About.css'

const FACTS = [
  { icon: '🎓', label: 'Degree', value: 'B.Tech Information Technology' },
  { icon: '📍', label: 'Location', value: 'Chennai, Tamil Nadu' },
  { icon: '💼', label: 'Focus', value: 'AI SaaS & Business Automation' },
  { icon: '🚀', label: 'Status', value: 'Building ReplyAI · Open to Collab' },
]

function FloatingCard3D({ children, className = '' }) {
  const cardRef = useRef(null)
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const onMove = e => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`
    }
    const onLeave = () => { card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)' }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])
  return <div ref={cardRef} className={`float-card ${className}`} style={{ transition: 'transform 0.15s ease' }}>{children}</div>
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <p className="sec-eyebrow">About Me</p>
        <div className="about-grid">
          {/* Left */}
          <div className="about-left">
            <h2 className="sec-title">
              Builder by nature,<br />
              <span className="grad">entrepreneur</span> by ambition.
            </h2>
            <p className="about-p">
              I'm a <strong>B.Tech Information Technology student</strong> from Chennai —
              but my real classroom is building products. I live at the intersection of
              software engineering and business strategy, obsessing over how technology
              can solve real problems for real people.
            </p>
            <p className="about-p">
              My current focus is <strong>ReplyAI</strong> — a WhatsApp Business automation
              SaaS I'm taking from zero to paying pilots with hotels, D2C brands,
              and exporters across Tamil Nadu. Every decision — product, pricing,
              outreach, tech — I'm learning by doing.
            </p>
            <p className="about-p">
              I think like a <strong>founder even while still a student</strong>. I've built
              full investment memos, PRDs, BRDs, and financial models for startup concepts
              before writing a single line of code. Strategy first, then execution.
            </p>
            <div className="about-actions">
              <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}>
                Let's Connect →
              </a>
              <a href="/resume.pdf" className="btn-outline" target="_blank" rel="noopener noreferrer">
                📄 Download CV
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="about-right">
            {/* 3D tilt info card */}
            <FloatingCard3D className="glass-card about-info-card">
              <div className="card-top-bar">
                <div className="bar-dot red" /><div className="bar-dot yellow" /><div className="bar-dot green2" />
                <span className="bar-title">haniya.json</span>
              </div>
              <pre className="about-code"><code>{`{
  "name": "Haniya",
  "role": "IT Student & Founder",
  "location": "Chennai, India",
  "university": "B.Tech IT",
  "focus": [
    "AI/ML",
    "SaaS Products",
    "Business Automation",
    "Entrepreneurship"
  ],
  "building": "ReplyAI 🚀",
  "status": "Open to Collaborate"
}`}</code></pre>
            </FloatingCard3D>

            {/* Fact pills */}
            <div className="about-facts">
              {FACTS.map(f => (
                <div key={f.label} className="fact-pill glass-card">
                  <span className="fact-icon">{f.icon}</span>
                  <div>
                    <div className="fact-label">{f.label}</div>
                    <div className="fact-value">{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
