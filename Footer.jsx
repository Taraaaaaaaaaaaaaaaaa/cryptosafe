import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

/** Tautan footer: pakai rute bila tersedia, atau tandai "Segera" bila belum ada. */
function FooterLink({ to, children }) {
  if (to) {
    return (
      <Link to={to} className="footer-link">
        {children}
      </Link>
    )
  }

  return (
    <span className="footer-link footer-link--disabled" aria-disabled="true">
      {children}
      <span className="badge-soon">Segera</span>
    </span>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand-col">
          <div className="brand brand--footer">
            <span className="brand__logo">
              <ShieldCheck size={20} strokeWidth={2.2} />
            </span>
            <span className="brand__name">CryptoSafe</span>
            <span className="badge-version">V2.4-SEC</span>
          </div>
          <p className="footer__desc">
            CryptoSafe adalah media edukasi dan simulasi kriptografi yang berjalan di browser.
            Fokusnya membantu memahami cara kerja enkripsi dan dekripsi, bukan menggantikan
            perangkat keamanan produksi.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Sumber Daya</h4>
          <FooterLink to="/algorithms">Dokumentasi Algoritma</FooterLink>
          <FooterLink>API Spec</FooterLink>
          <FooterLink to="/about">Kebijakan Privasi</FooterLink>
          <FooterLink>Standar Audit</FooterLink>
        </div>

        <div className="footer__col">
          <h4 className="footer__title">Navigasi</h4>
          <FooterLink to="/">Beranda</FooterLink>
          <FooterLink to="/encrypt">Enkripsi &amp; Dekripsi</FooterLink>
          <FooterLink to="/algorithms">Algoritma</FooterLink>
          <FooterLink to="/history">Riwayat</FooterLink>
          <FooterLink to="/about">Tentang</FooterLink>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} CryptoSafe. Dibuat untuk tujuan edukasi.</p>
        <p className="footer__note">
          Belum diaudit atau tersertifikasi oleh pihak ketiga.
        </p>
      </div>
    </footer>
  )
}
