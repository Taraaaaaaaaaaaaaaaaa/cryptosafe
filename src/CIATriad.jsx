import { EyeOff, FileCheck2, ServerCog, TriangleAlert } from 'lucide-react'

const CIA_ITEMS = [
  {
    id: 'confidentiality',
    icon: EyeOff,
    tone: 'cyan',
    title: 'Confidentiality',
    letter: 'C',
    text: 'Memastikan informasi hanya dapat dibaca oleh pihak yang berhak. Enkripsi adalah alat utamanya: tanpa kunci yang benar, isi pesan tidak dapat dipahami.',
    limit:
      'Enkripsi melindungi isi, tetapi tidak menyembunyikan keberadaan, ukuran, atau waktu pengiriman pesan.',
  },
  {
    id: 'integrity',
    icon: FileCheck2,
    tone: 'mint',
    title: 'Integrity',
    letter: 'I',
    text: 'Memastikan data tidak berubah tanpa terdeteksi. Ini memerlukan mekanisme verifikasi seperti MAC atau authentication tag, bukan hanya enkripsi biasa.',
    limit:
      'Cipher klasik seperti Caesar dan Vigenère tidak menyediakan verifikasi integritas sama sekali. Mode AEAD seperti AES-GCM barulah menyediakannya.',
  },
  {
    id: 'availability',
    icon: ServerCog,
    tone: 'amber',
    title: 'Availability',
    letter: 'A',
    text: 'Memastikan data dan layanan dapat diakses saat dibutuhkan oleh pihak yang berhak, termasuk lewat pencadangan, redundansi, dan pemulihan bencana.',
    limit:
      'Enkripsi tidak menambah ketersediaan. Kunci yang hilang justru membuat data tidak dapat diakses selamanya.',
  },
]

export default function CIATriad() {
  return (
    <section className="section" aria-labelledby="cia-title">
      <div className="section__head">
        <h2 id="cia-title" className="section__title">
          CIA Triad
        </h2>
        <p className="section__desc">
          Tiga prinsip dasar keamanan informasi yang biasanya dipakai sebagai kerangka penilaian.
        </p>
      </div>

      <div className="grid grid-3">
        {CIA_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.id} className={`card cia-card tone-${item.tone}`}>
              <div className="cia-card__head">
                <span className="card__icon">
                  <Icon size={19} />
                </span>
                <span className="cia-card__letter mono">{item.letter}</span>
              </div>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__text">{item.text}</p>
              <p className="cia-card__limit">
                <TriangleAlert size={14} />
                {item.limit}
              </p>
            </article>
          )
        })}
      </div>

      <div className="notice notice--cyan">
        <TriangleAlert size={16} />
        <p>
          Enkripsi saja tidak menjamin ketiga aspek CIA Triad. Confidentiality bisa dibantu enkripsi,
          Integrity membutuhkan mekanisme verifikasi tambahan, dan Availability bergantung pada
          infrastruktur serta pengelolaan kunci. Keamanan menyeluruh selalu merupakan gabungan
          kebijakan, proses, dan teknologi.
        </p>
      </div>
    </section>
  )
}
