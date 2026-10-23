import { Activity, BarChart3, Ruler, Info } from 'lucide-react'

const CHARACTERISTICS = [
  {
    icon: Ruler,
    title: 'Panjang tetap terjaga',
    text: 'Pada Caesar dan Vigenère, ciphertext memiliki jumlah karakter yang sama dengan plaintext. Panjang pesan tetap terlihat oleh pengamat, jadi enkripsi tidak menyembunyikan ukuran data.',
  },
  {
    icon: BarChart3,
    title: 'Distribusi huruf berubah',
    text: 'Caesar hanya menggeser seluruh alfabet secara seragam, sehingga pola frekuensi huruf bergeser tetapi bentuknya tetap. Vigenère mengaburkan pola itu, namun masih bisa dianalisis bila kunci terlalu pendek atau pesan terlalu panjang.',
  },
  {
    icon: Activity,
    title: 'Keteraturan tetap tersisa',
    text: 'Spasi dan tanda baca yang dibiarkan apa adanya menyimpan petunjuk tentang struktur kalimat. Cipher klasik tidak menghapus petunjuk tersebut, dan itu salah satu alasan cipher ini tidak layak untuk data nyata.',
  },
]

export default function InfoCheckCard() {
  return (
    <section className="section" aria-labelledby="pemeriksaan-title">
      <div className="section__head">
        <h2 id="pemeriksaan-title" className="section__title">
          Pemeriksaan Informasi
        </h2>
        <p className="section__desc">
          Cara membaca ciphertext, dan mengapa angka seperti &ldquo;skor keamanan&rdquo; tidak
          boleh ditampilkan sembarangan.
        </p>
      </div>

      <div className="grid grid-3">
        {CHARACTERISTICS.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.title} className="card info-card">
              <span className="card__icon card__icon--soft">
                <Icon size={18} />
              </span>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__text">{item.text}</p>
            </article>
          )
        })}
      </div>

      <div className="card entropy-card">
        <div className="entropy-card__main">
          <h3 className="card__title">Entropi dan skor keamanan</h3>
          <p className="card__text">
            Entropi Shannon mengukur ketidakpastian distribusi simbol dengan rumus{' '}
            <code className="mono">H = -Σ p(x) · log₂ p(x)</code>. Untuk data 1 byte, nilai
            maksimumnya 8 bit per byte. Nilai ini informatif untuk memeriksa keacakan, tetapi bukan
            jaminan keamanan: ciphertext yang tampak acak tetap bisa lemah bila kunci mudah
            ditebak atau nonce dipakai ulang.
          </p>
          <p className="card__text">
            Dua ciphertext bisa punya entropi tinggi walaupun tingkat keamanannya berbeda jauh.
            Karena itu entropi hanya boleh dibaca sebagai salah satu indikator, bukan kesimpulan.
          </p>
        </div>

        <aside className="entropy-card__status">
          <span className="status-badge status-badge--idle">
            <Info size={14} />
            Belum dihitung
          </span>
          <p className="entropy-card__status-title">Skor entropi</p>
          <p className="entropy-card__status-value mono">—</p>
          <p className="field__hint">
            CryptoSafe belum menghitung entropi ciphertext Anda. Alih-alih menampilkan angka
            perkiraan, bagian ini menampilkan status apa adanya sampai perhitungannya benar-benar
            tersedia.
          </p>
        </aside>
      </div>
    </section>
  )
}
