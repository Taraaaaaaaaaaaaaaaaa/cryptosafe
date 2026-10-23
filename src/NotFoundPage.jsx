import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

export default function NotFoundPage() {
  return (
    <div className="container page">
      <PageHeader
        eyebrow="RUTE TIDAK DITEMUKAN"
        title="404"
        description="Alamat yang Anda buka tidak ada di dalam CryptoSafe."
        icon={Compass}
      />
      <div className="card placeholder-card">
        <h2 className="placeholder-card__title">Periksa kembali tautannya</h2>
        <p className="card__text">
          Halaman yang tersedia saat ini adalah Beranda, Enkripsi &amp; Dekripsi, Algoritma,
          Riwayat, dan Tentang.
        </p>
        <Link to="/" className="btn btn--outline btn--sm">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
