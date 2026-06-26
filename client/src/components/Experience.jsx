import './Experience.css'

const TIMELINE = [
  {
    date: '2025 – Present',
    role: 'Founder & Product Builder',
    org: 'ReplyAI',
    orgColor: '#6366f1',
    desc: 'Conceived, designed, and began piloting a WhatsApp Business automation SaaS. Handling everything end-to-end: product architecture, GTM strategy, pilot outreach, pricing, and technical build on MERN stack.',
    tags: ['MERN Stack', 'SaaS', 'WhatsApp API', 'Product Strategy'],
    icon: '🚀',
  },
  {
    date: '2024 – 2025',
    role: 'AI Security Product Researcher',
    org: 'VibeSec (Independent)',
    orgColor: '#06b6d4',
    desc: 'Built a consulting-grade startup package independently: full competitor analysis, financial projections, investment memo, PRD, BRD, and pricing strategy for an AI AppSec platform targeting vibe coders.',
    tags: ['Cybersecurity', 'AI', 'Product Research', 'Investment Memo'],
    icon: '🛡️',
  },
  {
    date: '2024',
    role: 'Research Author — IEEE Submission',
    org: 'NeuroGuard / MIRAGE Algorithm',
    orgColor: '#10b981',
    desc: 'Developed the MIRAGE (Migraine Risk Assessment & Guided Event) algorithm for migraine prediction. Submitted full research paper to IEEE Transactions on Biomedical Engineering with 11-document bundle.',
    tags: ['IEEE', 'ML Research', 'Healthcare AI', 'React Native'],
    icon: '🧠',
  },
  {
    date: '2024 – Present',
    role: 'B.Tech Information Technology - SIMATS University',
    org: 'Chennai, Tamil Nadu',
    orgColor: '#f59e0b',
    desc: 'Studying at the intersection of engineering and enterprise. Applying classroom frameworks to real products in real markets. Best Poster Award for AI email spam classification research.',
    tags: ['Information Technology', 'AI/ML', 'Best Poster Award'],
    icon: '🎓',
  },
]

const SECTORS = [
  { icon: '🏨', title: 'Hospitality & Hotels', desc: 'Piloting ReplyAI with a heritage hotel in Vellore — real revenue context, real operational constraints.', color: '#6366f1' },
  { icon: '👟', title: 'D2C & Footwear', desc: 'Automation scoping with Hundreds Shoes for a growing direct-to-consumer footwear brand.', color: '#06b6d4' },
  { icon: '🏭', title: 'Manufacturing & Export', desc: 'Enterprise automation scoping with Farida Group — large leather exporters with 1,000+ supplier touchpoints.', color: '#f59e0b' },
]

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <p className="sec-eyebrow">Experience</p>
        <h2 className="sec-title">The <span className="gold">journey</span> so far.</h2>

        <div className="exp-layout">
          {/* Timeline */}
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div key={i} className="t-item">
                <div className="t-connector">
                  <div className="t-dot" style={{ background: item.orgColor, boxShadow: `0 0 14px ${item.orgColor}88` }}>
                    <span>{item.icon}</span>
                  </div>
                  {i < TIMELINE.length - 1 && <div className="t-line" />}
                </div>
                <div className="t-body glass-card">
                  <div className="t-date-badge">
                    <span className="t-date">{item.date}</span>
                  </div>
                  <h3 className="t-role">{item.role}</h3>
                  <p className="t-org" style={{ color: item.orgColor }}>{item.org}</p>
                  <p className="t-desc">{item.desc}</p>
                  <div className="t-tags">
                    {item.tags.map(t => <span key={t} className="stack-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sectors */}
          <div className="sectors">
            <h3 className="skills-sub-title"><span className="cyan-txt">Industry</span> Experience</h3>
            <div className="sector-list">
              {SECTORS.map(s => (
                <div key={s.title} className="sector-card glass-card">
                  <div className="sector-icon" style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="sector-title" style={{ color: s.color }}>{s.title}</div>
                    <div className="sector-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Award card */}
            <div className="award-card glass-card">
              <div className="award-top">
                <span className="award-icon">🏆</span>
                <span className="award-badge badge badge-yellow">Achievement</span>
              </div>
              <div className="award-title">Best Poster Award</div>
              <div className="award-desc">AI Email Spam Classification Research · B.Tech IT Dept</div>
            </div>

            {/* Stats */}
            <div className="exp-stats">
              {[
                { val: '100+', label: 'Git Commits', color: '#6366f1' },
                { val: '4+', label: 'Projects', color: '#06b6d4' },
                { val: '1', label: 'IEEE Paper', color: '#10b981' },
              ].map(s => (
                <div key={s.label} className="exp-stat glass-card">
                  <div className="es-val" style={{ color: s.color }}>{s.val}</div>
                  <div className="es-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
