import { Globe, KeyRound, Laptop, ScrollText, ShieldOff } from 'lucide-react'

const POINTS = [
  {
    icon: Laptop,
    title: 'Diproses di browser',
    text: 'Enkripsi dan dekripsi dirancang berjalan di dalam tab browser Anda. Tidak ada kode backend pada proyek ini, jadi tidak ada endpoint yang menerima plaintext, kunci, atau ciphertext Anda.',
  },
  {
    icon: Globe,
    title: 'Tidak ada pengiriman ke server',
    text: 'Teks yang Anda tulis di simulator tetap berada di memori halaman. Memuat ulang atau menutup tab akan menghapusnya.',
  },
  {
    icon: ShieldOff,
    title: 'Tetap ada risiko',
    text: 'Pemrosesan lokal mengurangi permukaan risiko, tetapi tidak menghilangkannya. Perangkat yang dipakai bersama, malware, ekstensi browser, dan reporter crash tetap berpotensi membaca isi halaman.',
  },
  {
    icon: ScrollText,
    title: 'Status audit',
    text: 'CryptoSafe belum diaudit dan belum tersertifikasi oleh pihak ketiga. Jangan gunakan untuk melindungi data sensitif atau data produksi.',
  },
]

export default function PrivacyPanel() {
  return (
    <section className="section" aria-labelledby="privasi-title">
      <div className="card privacy-panel">
        <div className="privacy-panel__intro">
          <span className="card__icon">
            <KeyRound size={19} />
          </span>
          <div>
            <h2 id="privasi-title" className="section__title">
              Privasi &amp; Cara Kerja
            </h2>
            <p className="section__desc">
              Transparansi tentang di mana data Anda berada selama memakai CryptoSafe.
            </p>
          </div>
        </div>

        <div className="privacy-panel__grid">
          {POINTS.map((point) => {
            const Icon = point.icon
            return (
              <article key={point.title} className="privacy-point">
                <span className="privacy-point__icon">
                  <Icon size={16} />
                </span>
                <h3 className="privacy-point__title">{point.title}</h3>
                <p className="privacy-point__text">{point.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
