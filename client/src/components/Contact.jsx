import { useState } from 'react'
import axios from 'axios'
import './Contact.css'

const LINKS = [
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/haniya', url: 'https://www.linkedin.com/in/haniyaharmain/', color: '#0a66c2' },
  { icon: '✉️', label: 'Email', value: 'haniya2078@gmail.com', url: 'mailto:haniya2078@gmail.com', color: '#6366f1' },
  { icon: '⌨️', label: 'GitHub', value: 'github.com/haniya', url: 'https://github.com/haniya-z', color: '#e2e8f0' },
  { icon: '📱', label: 'WhatsApp', value: 'Message me directly', url: 'https://wa.me/8838797842', color: '#25d366' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [toast, setToast] = useState('')

  const showToast = msg => {
    setToast(msg)
    setTimeout(() => setToast(''), 4000)
  }

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      showToast('⚠️ Please fill in all fields.')
      return
    }
    setStatus('loading')
    try {
      const res = await axios.post('https://portfolio3d-backend.onrender.com/api/contact',form)
      setStatus('success')
      showToast(`✅ ${res.data.message}`)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      showToast('❌ Something went wrong. Please email me directly.')
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <p className="sec-eyebrow">Contact</p>
        <div className="contact-layout">
          {/* Left */}
          <div className="contact-left">
            <div className="open-badge">
              <div className="open-dot" />
              Open to conversations
            </div>
            <h2 className="sec-title">
              Let's build<br /><span className="grad">something</span><br />together.
            </h2>
            <p className="contact-desc">
              Whether you're a founder, investor, recruiter, or business owner with a
              problem worth automating — I'd love to connect. Based in Chennai,
              available anywhere online.
            </p>

            <div className="contact-links">
              {LINKS.map(l => (
                <a key={l.label} href={l.url} className="contact-link glass-card" target="_blank" rel="noopener noreferrer">
                  <div className="cl-icon" style={{ background: `${l.color}18`, border: `1px solid ${l.color}30` }}>
                    {l.icon}
                  </div>
                  <div className="cl-info">
                    <div className="cl-label">{l.label}</div>
                    <div className="cl-value">{l.value}</div>
                  </div>
                  <span className="cl-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-right">
            <div className="contact-form-card glass-card">
              <div className="form-header">
                <h3 className="form-title">Send a Message</h3>
                <p className="form-sub">I reply within 24 hours.</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      className="form-input"
                      type="text"
                      name="name"
                      placeholder="Priya Sharma"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      name="email"
                      placeholder="priya@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    className="form-input"
                    type="text"
                    name="subject"
                    placeholder="Let's collaborate on..."
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input form-textarea"
                    name="message"
                    placeholder="Tell me about your project or how I can help..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary form-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <><span className="spinner" />Sending...</>
                  ) : (
                    <>🚀 Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <div className="toast show">{toast}</div>}
    </section>
  )
}
