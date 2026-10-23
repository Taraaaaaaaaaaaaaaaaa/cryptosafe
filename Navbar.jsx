import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ShieldCheck, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/encrypt', label: 'Enkripsi & Dekripsi' },
  { to: '/algorithms', label: 'Algoritma' },
  { to: '/history', label: 'Riwayat' },
  { to: '/about', label: 'Tentang' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Tutup menu mobile setiap kali rute berubah.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const linkClass = ({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="brand" aria-label="CryptoSafe - Beranda">
          <span className="brand__logo">
            <ShieldCheck size={20} strokeWidth={2.2} />
          </span>
          <span className="brand__name">CryptoSafe</span>
          <span className="badge-version">V2.4-SEC</span>
        </Link>

        <nav className="nav-links nav-links--desktop" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__right">
          <span className="nav-status" title="Aplikasi sedang berjalan di browser Anda">
            <span className="status-dot" aria-hidden="true" />
            <span className="nav-status__text">Runtime Lokal Aktif</span>
          </span>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="nav-mobile"
            aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="nav-mobile" className="nav-mobile" aria-label="Navigasi mobile">
          <div className="container nav-mobile__inner">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-link nav-link--mobile${isActive ? ' nav-link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <span className="nav-status nav-status--mobile">
              <span className="status-dot" aria-hidden="true" />
              <span className="nav-status__text">Runtime Lokal Aktif</span>
            </span>
          </div>
        </nav>
      )}
    </header>
  )
}
