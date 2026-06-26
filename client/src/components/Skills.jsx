import { useRef, useEffect, useState } from 'react'
import './Skills.css'

const TECH = [
  { name: 'React', icon: '⚛️', level: 85, color: '#61dafb', cat: 'Frontend' },
  { name: 'Node.js', icon: '🟢', level: 82, color: '#68a063', cat: 'Backend' },
  { name: 'MongoDB', icon: '🍃', level: 78, color: '#4db33d', cat: 'Database' },
  { name: 'Express', icon: '⚡', level: 80, color: '#6366f1', cat: 'Backend' },
  { name: 'JavaScript', icon: '🌐', level: 88, color: '#f7df1e', cat: 'Language' },
  { name: 'Python', icon: '🐍', level: 75, color: '#3776ab', cat: 'Language' },
  { name: 'Three.js', icon: '🔮', level: 70, color: '#06b6d4', cat: 'Frontend' },
  { name: 'AI/ML', icon: '🤖', level: 72, color: '#8b5cf6', cat: 'AI' },
  { name: 'WhatsApp API', icon: '📱', level: 85, color: '#25d366', cat: 'Integration' },
  { name: 'Git', icon: '📦', level: 85, color: '#f05032', cat: 'DevOps' },
  { name: 'Figma', icon: '🎨', level: 78, color: '#f24e1e', cat: 'Design' },
  { name: 'SQL', icon: '🗄️', level: 74, color: '#00758f', cat: 'Database' },
]

const BUSINESS = [
  { name: 'Product Strategy', icon: '🧠', desc: 'PRD, BRD, roadmaps from scratch' },
  { name: 'SaaS Architecture', icon: '🏗️', desc: 'Subscription models, pricing, GTM' },
  { name: 'Market Research', icon: '📊', desc: 'TAM/SAM/SOM, competitor analysis' },
  { name: 'Business Automation', icon: '⚙️', desc: 'Zapier, Make.com, custom APIs' },
  { name: 'Financial Modelling', icon: '💹', desc: 'P&L, projections, investor memos' },
  { name: 'Growth Marketing', icon: '📈', desc: 'SEO, content, social, outreach' },
]

function SkillBar({ skill, visible }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-icon">{skill.icon}</span>
        <span className="skill-name">{skill.name}</span>
        <span className="skill-cat">{skill.cat}</span>
        <span className="skill-pct">{skill.level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            boxShadow: `0 0 12px ${skill.color}55`,
            transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  )
}

function BusinessCard({ skill }) {
  return (
    <div className="biz-card glass-card">
      <div className="biz-icon">{skill.icon}</div>
      <div className="biz-name">{skill.name}</div>
      <div className="biz-desc">{skill.desc}</div>
    </div>
  )
}

export default function Skills() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="section skills-section" id="skills">
      <div className="container" ref={ref}>
        <p className="sec-eyebrow">Tech Stack</p>
        <div className="skills-header">
          <h2 className="sec-title">
            Tools I build <span className="grad">with.</span>
          </h2>
          <p className="sec-desc">
            Full-stack MERN developer with a product mindset. I don't just code — I architect solutions.
          </p>
        </div>

        <div className="skills-grid-layout">
          {/* Tech Bars */}
          <div className="skills-bars">
            <h3 className="skills-sub-title"><span className="cyan-txt">01.</span> Technical Skills</h3>
            <div className="bars-list">
              {TECH.map(s => <SkillBar key={s.name} skill={s} visible={visible} />)}
            </div>
          </div>

          {/* Business Skills */}
          <div className="skills-biz">
            <h3 className="skills-sub-title"><span className="cyan-txt">02.</span> Business & Strategy</h3>
            <div className="biz-grid">
              {BUSINESS.map(s => <BusinessCard key={s.name} skill={s} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
