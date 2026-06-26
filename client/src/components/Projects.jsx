import { useRef, useEffect, useState } from 'react'
import './Projects.css'

const PROJECTS = [
  {
    id: 1,
    name: 'ReplyAI',
    tagline: 'WhatsApp Automation SaaS for Indian SMBs',
    desc: 'AI-powered WhatsApp Business platform that automates customer replies, lead nurturing, and FAQ handling. Built for hotels, D2C brands, and exporters in Tamil Nadu. Currently piloting with a heritage hotel in Vellore.',
    badge: { text: 'Building', cls: 'badge-yellow' },
    icon: '💬',
    iconBg: 'rgba(99,102,241,0.15)',
    stack: ['Node.js', 'React', 'MongoDB', 'WhatsApp API', 'AI'],
    links: { github: '#', live: '#' },
    metrics: [{ val: '3+', label: 'Pilot Clients' }, { val: '60%', label: 'Response Time Saved' }],
    accent: '#6366f1',
  },
  {
    id: 2,
    name: 'VibeSec',
    tagline: 'AppSec Layer for AI-Generated Code',
    desc: 'Security-as-a-service platform targeting "vibe coders" — non-technical founders building with Lovable, Bolt, and Cursor. Full investment memo, PRD, BRD, competitor analysis, and 7-day MVP plan produced.',
    badge: { text: 'Research', cls: 'badge-cyan' },
    icon: '🛡️',
    iconBg: 'rgba(6,182,212,0.15)',
    stack: ['Python', 'FastAPI', 'React', 'SAST', 'AI Security'],
    links: { github: '#', live: '#' },
    metrics: [{ val: '$2B+', label: 'Target TAM' }, { val: '10k+', label: 'Target Users' }],
    accent: '#06b6d4',
  },
  {
    id: 3,
    name: 'NeuroGuard',
    tagline: 'AI Migraine Prediction Platform',
    desc: 'Smart migraine prediction system using the proprietary MIRAGE algorithm. Full IEEE research paper submitted to IEEE Transactions on Biomedical Engineering. 11-document research package, React Native + Node.js MVP.',
    badge: { text: 'Published', cls: 'badge-green' },
    icon: '🧠',
    iconBg: 'rgba(16,185,129,0.15)',
    stack: ['React Native', 'Node.js', 'Python', 'ML', 'Healthcare AI'],
    links: { github: '#', live: '#' },
    metrics: [{ val: 'IEEE', label: 'Submitted' }, { val: '11', label: 'Docs Produced' }],
    accent: '#10b981',
  },
  {
    id: 4,
    name: 'Shop AutoPilot',
    tagline: 'AI Back-Office for Chennai Kirana Stores',
    desc: 'Automated inventory tracking, order management, and supplier follow-ups for small retailers. Built with a WhatsApp-first interface so business owners with no tech background can use it instantly.',
    badge: { text: 'Exploring', cls: 'badge-blue' },
    icon: '🏪',
    iconBg: 'rgba(245,158,11,0.12)',
    stack: ['MERN Stack', 'WhatsApp API', 'AI', 'Automation'],
    links: { github: '#', live: '#' },
    metrics: [{ val: '₹B+', label: 'Kirana Market' }, { val: '0', label: 'Tech Knowledge Needed' }],
    accent: '#f59e0b',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const onMove = e => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`
    }
    const onLeave = () => {
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)'
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`project-card glass-card ${hovered ? 'hovered' : ''}`}
      style={{
        '--accent': project.accent,
        transition: 'transform 0.15s ease, box-shadow 0.3s, border-color 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent glow */}
      <div className="card-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}22, transparent 70%)` }} />

      {/* Header */}
      <div className="pc-header">
        <div className="pc-icon" style={{ background: project.iconBg }}>{project.icon}</div>
        <span className={`badge ${project.badge.cls}`}>
          <span className="badge-pulse" />
          {project.badge.text}
        </span>
      </div>

      {/* Body */}
      <h3 className="pc-name">{project.name}</h3>
      <p className="pc-tagline">{project.tagline}</p>
      <p className="pc-desc">{project.desc}</p>

      {/* Metrics */}
      <div className="pc-metrics">
        {project.metrics.map(m => (
          <div key={m.label} className="pc-metric">
            <span className="pm-val" style={{ color: project.accent }}>{m.val}</span>
            <span className="pm-label">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="pc-stack">
        {project.stack.map(s => (
          <span key={s} className="stack-tag">{s}</span>
        ))}
      </div>

      {/* Links */}
      <div className="pc-links">
        <a href={project.links.github} className="pc-link" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          GitHub
        </a>
        <a href={project.links.live} className="pc-link primary" target="_blank" rel="noopener noreferrer">
          ↗ Live Demo
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <p className="sec-eyebrow">Projects</p>
        <div className="projects-top">
          <h2 className="sec-title">Things I'm <span className="grad">building.</span></h2>
          <p className="sec-desc">Every project starts with a real problem. Here's what I'm working on.</p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
