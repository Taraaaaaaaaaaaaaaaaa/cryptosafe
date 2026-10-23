import { Link } from 'react-router-dom'
import { ArrowRight, KeyRound, Lock, Unlock, BookOpen } from 'lucide-react'
import { caesarEncrypt, caesarDecrypt } from '../utils/cryptoUtils.js'

// Pratinjau dihitung dengan fungsi yang sama seperti simulator, jadi hasilnya nyata.
const ENCRYPT_DEMO = { plain: 'RAHASIA', cipher: caesarEncrypt('RAHASIA', 3) }
const DECRYPT_DEMO = { cipher: caesarEncrypt('RAHASIA', 3), plain: caesarDecrypt(caesarEncrypt('RAHASIA', 3), 3) }

const FEATURE_CARDS = [
  {
    id: 'encrypt',
    icon: Lock,
    title: 'Enkripsi Pesan',
    text: 'Ubah plaintext menjadi ciphertext dengan Caesar atau Vigenère, lalu lihat perubahan setiap hurufnya secara langsung.',
    to: '/encrypt',
    cta: 'Buka Enkripsi & Dekripsi',
    preview: (
      <div className="mini-preview">
        <span className="mini-preview__row">
          <span className="mini-preview__label">Plaintext</span>
          <code className="mini-preview__value">{ENCRYPT_DEMO.plain}</code>
        </span>
        <span className="mini-preview__arrow" aria-hidden="true">
          <ArrowRight size={14} />
        </span>
        <span className="mini-preview__row">
          <span className="mini-preview__label">Ciphertext</span>
          <code className="mini-preview__value is-cipher">{ENCRYPT_DEMO.cipher}</code>
        </span>
      </div>
    ),
  },
  {
    id: 'decrypt',
    icon: Unlock,
    title: 'Dekripsi Pesan',
    text: 'Kembalikan ciphertext ke bentuk aslinya menggunakan kunci yang sama. Kunci yang salah akan menghasilkan teks yang tidak terbaca.',
    to: '/encrypt',
    cta: 'Coba Dekripsi',
    preview: (
      <div className="mini-preview">
        <span className="mini-preview__row">
          <span className="mini-preview__label">Ciphertext</span>
          <code className="mini-preview__value is-cipher">{DECRYPT_DEMO.cipher}</code>
        </span>
        <span className="mini-preview__arrow" aria-hidden="true">
          <ArrowRight size={14} />
        </span>
        <span className="mini-preview__row">
          <span className="mini-preview__label">Plaintext</span>
          <code className="mini-preview__value">{DECRYPT_DEMO.plain}</code>
        </span>
      </div>
    ),
  },
  {
    id: 'algorithms',
    icon: BookOpen,
    title: 'Pelajari Algoritma',
    text: 'Pahami dasar matematis Caesar, pola kunci berulang pada Vigenère, serta mengapa AES-GCM dipakai untuk kebutuhan modern.',
    to: '/algorithms',
    cta: 'Lihat Algoritma',
    preview: (
      <div className="chip-list">
        <span className="badge-chip">
          <KeyRound size={13} /> Caesar
        </span>
        <span className="badge-chip">
          <KeyRound size={13} /> Vigenère
        </span>
        <span className="badge-chip badge-chip--muted">
          <KeyRound size={13} /> AES-GCM
        </span>
      </div>
    ),
  },
]

export default function FeatureCards() {
  return (
    <section className="section" aria-labelledby="fitur-title">
      <div className="section__head">
        <h2 id="fitur-title" className="section__title">
          Fitur Inti
        </h2>
        <p className="section__desc">
          Tiga alur utama yang menyusun CryptoSafe.
        </p>
      </div>

      <div className="grid grid-3">
        {FEATURE_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <article key={card.id} className="card feature-card">
              <span className="card__icon">
                <Icon size={19} />
              </span>
              <h3 className="card__title">{card.title}</h3>
              <p className="card__text">{card.text}</p>
              <div className="feature-card__preview">{card.preview}</div>
              <Link to={card.to} className="btn btn--outline btn--block">
                {card.cta}
                <ArrowRight size={15} />
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
