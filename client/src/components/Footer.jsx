import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grad-line" />
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-bracket">&lt;</span>Haniya<span className="logo-bracket">/&gt;</span>
          </div>
          <p className="footer-copy">
            © {year} Haniya · Built with <span className="heart">♥</span> using MERN Stack + Three.js · Chennai
          </p>
          <div className="footer-links">
            {['About', 'Projects', 'Experience', 'Contact'].map(l => (
              <button key={l} className="footer-link"
                onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
