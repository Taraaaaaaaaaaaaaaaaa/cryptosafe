import { Info, Layers, ShieldAlert, ShieldCheck } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

const SPEC = [
  { label: 'Nama produk', value: 'CryptoSafe' },
  { label: 'Tagline', value: 'Amankan Pesan Anda dengan Kriptografi' },
  { label: 'Versi', value: 'V2.4-SEC' },
  { label: 'Jenis', value: 'Website edukasi dan simulasi kriptografi' },
  { label: 'Platform', value: 'Aplikasi web sisi klien' },
]

const TECH = [
  { label: 'Framework', value: 'React.js dengan Vite' },
  { label: 'Bahasa', value: 'JavaScript (JSX)' },
  { label: 'Styling', value: 'CSS biasa dengan CSS variables' },
  { label: 'Ikon', value: 'Lucide React' },
  { label: 'Kriptografi', value: 'Web Crypto API (window.crypto.subtle)' },
]

export default function AboutPage() {
  return (
    <div className="container page">
      <PageHeader
        eyebrow="HALAMAN 05 — TENTANG"
        title="Tentang CryptoSafe"
        description="CryptoSafe adalah media belajar kriptografi yang menekankan pemahaman proses, bukan sekadar hasil akhir. Setiap klaim di dalamnya dijaga agar sesuai dengan apa yang benar-benar dihitung aplikasi."
        icon={Info}
      />

      <div className="grid grid-2">
        <article className="card">
          <span className="card__icon">
            <ShieldCheck size={19} />
          </span>
          <h2 className="card__title">Identitas produk</h2>
          <dl className="spec-list">
            {SPEC.map((item) => (
              <div key={item.label} className="spec-row">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="card">
          <span className="card__icon">
            <Layers size={19} />
          </span>
          <h2 className="card__title">Teknologi</h2>
          <dl className="spec-list">
            {TECH.map((item) => (
              <div key={item.label} className="spec-row">
                <dt>{item.label}</dt>
                <dd className="mono">{item.value}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>

      <div className="grid grid-2">
        <article className="card">
          <span className="card__icon card__icon--soft">
            <ShieldAlert size={19} />
          </span>
          <h2 className="card__title">Status &amp; batasan</h2>
          <ul className="dot-list">
            <li>Tahap pertama berfokus pada fondasi proyek dan halaman Beranda.</li>
            <li>Caesar dan Vigenère sudah berfungsi nyata; AES-GCM belum diimplementasikan.</li>
            <li>Halaman Enkripsi &amp; Dekripsi, Algoritma, serta Riwayat masih berupa rencana.</li>
            <li>
              Belum diaudit dan belum tersertifikasi oleh pihak ketiga, jadi tidak ditujukan untuk
              melindungi data sensitif.
            </li>
          </ul>
        </article>

        <article className="card">
          <span className="card__icon card__icon--soft">
            <Info size={19} />
          </span>
          <h2 className="card__title">Prinsip penyajian</h2>
          <ul className="dot-list">
            <li>Tidak ada ciphertext contoh yang dipalsukan, terutama untuk AES.</li>
            <li>Angka teknis hanya ditampilkan bila benar-benar dihitung aplikasi.</li>
            <li>Pemrosesan dijelaskan apa adanya: berjalan di browser Anda.</li>
            <li>Setiap algoritma disertai penjelasan keterbatasannya, bukan hanya keunggulannya.</li>
          </ul>
        </article>
      </div>
    </div>
  )
}
