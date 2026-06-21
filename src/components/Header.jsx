const navItems = [
  { label: 'Profile', href: '#profile' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

function Header({ activeSection, onPresentationMode }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Back to top">
        Lin Huanbiao / Portfolio 2026
      </a>
      <nav aria-label="Portfolio sections">
        {navItems.map((item) => (
          <a
            className={activeSection === item.href.slice(1) ? 'is-active' : ''}
            href={item.href}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="header-mode" type="button" onClick={onPresentationMode}>
          Presentation Mode
        </button>
        <a className="header-cta" href="#contact">
          Contact Me
        </a>
      </div>
    </header>
  )
}

export default Header
