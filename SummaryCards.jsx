import { Boxes, HardDrive, ShieldAlert } from 'lucide-react'

const SUMMARY_CARDS = [
  {
    id: 'algoritma',
    icon: Boxes,
    tone: 'cyan',
    title: '3 Algoritma Utama',
    value: 'Caesar · Vigenère · AES',
    text: 'Dua cipher klasik (Caesar, Vigenère) bisa langsung dicoba di Beranda. AES-GCM tersedia di browser melalui Web Crypto API dan akan diaktifkan pada tahap berikutnya.',
  },
  {
    id: 'lokal',
    icon: HardDrive,
    tone: 'mint',
    title: 'Pemrosesan Lokal',
    value: 'Tanpa pengiriman data',
    text: 'Enkripsi dan dekripsi dirancang berjalan di dalam browser Anda. Teks yang Anda tulis tidak dikirim ke server mana pun oleh CryptoSafe.',
  },
  {
    id: 'keamanan',
    icon: ShieldAlert,
    tone: 'amber',
    title: 'Keamanan Data',
    value: 'Batasan yang perlu dipahami',
    text: 'Menyimpan data hanya di perangkat mengurangi risiko kebocoran di server, tetapi tidak menghapus risiko lain: perangkat yang dipakai bersama, ekstensi browser, malware, atau kelemahan pada algoritma klasik itu sendiri.',
  },
]

export default function SummaryCards() {
  return (
    <section className="section" aria-labelledby="ringkasan-title">
      <div className="section__head">
        <h2 id="ringkasan-title" className="section__title">
          Ringkasan Platform
        </h2>
        <p className="section__desc">
          Gambaran singkat tentang apa yang sudah berjalan, di mana prosesnya terjadi, dan apa
          batasannya.
        </p>
      </div>

      <div className="grid grid-3">
        {SUMMARY_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <article key={card.id} className={`card summary-card tone-${card.tone}`}>
              <span className="card__icon">
                <Icon size={19} />
              </span>
              <h3 className="card__title">{card.title}</h3>
              <p className="card__meta mono">{card.value}</p>
              <p className="card__text">{card.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
