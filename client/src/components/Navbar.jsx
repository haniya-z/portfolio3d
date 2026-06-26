import { useState, useEffect } from 'react'
import './Navbar.css'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-bracket">&lt;</span>
          Haniya
          <span className="logo-bracket">/&gt;</span>
        </button>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l}>
              <button className="nav-link" onClick={() => scrollTo(l)}>
                <span className="nav-num">0{links.indexOf(l) + 1}.</span>
                {l}
              </button>
            </li>
          ))}
        </ul>

        <button className="nav-cta" onClick={() => scrollTo('Contact')}>
          Let's Talk →
        </button>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <button key={l} className="mobile-link" onClick={() => scrollTo(l)}>
            <span className="nav-num">0{links.indexOf(l) + 1}.</span> {l}
          </button>
        ))}
        <button className="btn-primary" onClick={() => scrollTo('Contact')} style={{ marginTop: 16 }}>
          Let's Talk →
        </button>
      </div>
    </nav>
  )
}
