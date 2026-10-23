
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Cpu,
  Lock,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Info,
} from 'lucide-react'
import { isWebCryptoAvailable } from '../utils/cryptoUtils.js'

function Sparkline({ onClick, running, result }) {
  return (
    <button
      type="button"
      className="runtime-chart-button"
      onClick={onClick}
      disabled={running}
      aria-label="Klik untuk mengukur performa AES-GCM"
      title="Jalankan tes performa AES-GCM"
    >
      <svg
        className="sparkline"
        viewBox="0 0 320 110"
        role="img"
        aria-label="Grafik ilustrasi runtime kriptografi"
      >
        <defs>
          <linearGradient id="sparkStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5F5" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#00E5F5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00E5F5" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00E5F5" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#00E5F5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[22, 44, 66, 88].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="320"
            y2={y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        <path
          d="M0 84 L28 78 L56 66 L84 70 L112 52 L140 56 L168 38 L196 44 L224 28 L252 32 L280 18 L320 22 L320 110 L0 110 Z"
          fill="url(#sparkFill)"
        />

        <path
          d="M0 84 L28 78 L56 66 L84 70 L112 52 L140 56 L168 38 L196 44 L224 28 L252 32 L280 18 L320 22"
          fill="none"
          stroke="url(#sparkStroke)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="280" cy="18" r="7" fill="#00E5F5" opacity="0.18" />
        <circle cx="280" cy="18" r="3.5" fill="#00E5F5" />
      </svg>

      <span className="runtime-chart-hint">
        {running
          ? 'Sedang mengukur performa...'
          : result
            ? `Hasil benchmark: ${result}`
            : 'Klik grafik untuk menjalankan tes AES-GCM'}
      </span>
    </button>
  )
}

function RuntimeCard() {
  const navigate = useNavigate()
  const webCryptoReady = isWebCryptoAvailable()

  const [details, setDetails] = useState('')
  const [running, setRunning] = useState(false)
  const [benchmark, setBenchmark] = useState('')
  const [error, setError] = useState('')

  async function runBenchmark() {
    console.log('Grafik diklik — benchmark dimulai')

    if (!webCryptoReady) {
      setError('Web Crypto API tidak tersedia di browser ini.')
      return
    }

    if (!window.isSecureContext || !window.crypto?.subtle) {
      setError(
        'Benchmark membutuhkan browser modern melalui localhost atau HTTPS.'
      )
      return
    }

    setRunning(true)
    setError('')
    setBenchmark('')

    try {
      const key = await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
      )

      const data = new TextEncoder().encode(
        'CryptoSafe benchmark edukasi '.repeat(100)
      )

      // Pemanasan awal sebelum pengukuran.
      await window.crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: window.crypto.getRandomValues(new Uint8Array(12)),
        },
        key,
        data
      )

      const runs = 20
      const start = performance.now()

      for (let i = 0; i < runs; i += 1) {
        const iv = window.crypto.getRandomValues(new Uint8Array(12))

        await window.crypto.subtle.encrypt(
          { name: 'AES-GCM', iv },
          key,
          data
        )
      }

      const elapsed = performance.now() - start
      setBenchmark(`${(elapsed / runs).toFixed(3)} ms per enkripsi`)
    } catch (err) {
      console.error('Benchmark AES-GCM gagal:', err)
      setError(err.message || 'Benchmark gagal dijalankan.')
    } finally {
      setRunning(false)
    }
  }

  function openAes() {
    navigate('/encrypt', { state: { algorithm: 'aes' } })
  }

  function toggleDetails(section) {
    setDetails((current) => (current === section ? '' : section))
  }

  return (
    <aside className="runtime-card">
      <div className="runtime-card__head">
        <div>
          <p className="runtime-card__eyebrow">Runtime Kriptografi</p>
          <h3 className="runtime-card__title">Proses di Sisi Klien</h3>
        </div>

        <button
          type="button"
          className="badge-chip runtime-clickable"
          onClick={() => toggleDetails('browser')}
          aria-expanded={details === 'browser'}
        >
          <Cpu size={13} />
          Browser
        </button>
      </div>

      <Sparkline
        onClick={runBenchmark}
        running={running}
        result={benchmark}
      />

      {benchmark && (
        <div className="runtime-message runtime-message--success" role="status">
          <Activity size={16} />
          <span>
            Rata-rata waktu enkripsi AES-GCM:{' '}
            <strong>{benchmark}</strong>. Hasil bergantung pada perangkat dan
            beban browser.
          </span>
        </div>
      )}

      {error && (
        <div className="runtime-message runtime-message--warning" role="alert">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}

      {details && (
        <div className="runtime-message">
          <Info size={16} />
          <span>
            {details === 'browser'
              ? 'Panel ini berjalan di browser Anda. Benchmark mengukur operasi enkripsi lokal, bukan seluruh performa perangkat.'
              : details === 'crypto'
                ? webCryptoReady
                  ? 'Web Crypto API terdeteksi. Keberhasilan operasi tetap bergantung pada konteks browser.'
                  : 'Web Crypto API tidak terdeteksi. Coba browser modern melalui localhost atau HTTPS.'
                : 'Simulasi diproses di browser. Gunakan data contoh untuk demonstrasi edukasi.'}
          </span>
        </div>
      )}

      <dl className="runtime-metrics">
        <div className="runtime-metric">
          <dt>Web Crypto API</dt>
          <dd>
            <button
              type="button"
              className={`runtime-value ${webCryptoReady ? 'metric-ok' : 'metric-warn'}`}
              onClick={() => toggleDetails('crypto')}
              aria-expanded={details === 'crypto'}
            >
              {webCryptoReady ? 'Tersedia di browser ini' : 'Tidak terdeteksi'}
            </button>
          </dd>
        </div>

        <div className="runtime-metric">
          <dt>Lokasi pemrosesan</dt>
          <dd>
            <button
              type="button"
              className="runtime-value"
              onClick={() => toggleDetails('local')}
              aria-expanded={details === 'local'}
            >
              Perangkat Anda
            </button>
          </dd>
        </div>

        <div className="runtime-metric">
          <dt>Mesin klasik aktif</dt>
          <dd>
            <button
              type="button"
              className="runtime-value runtime-value--link"
              onClick={() => navigate('/encrypt')}
            >
              Caesar &amp; Vigenère <ArrowRight size={14} />
            </button>
          </dd>
        </div>

        <div className="runtime-metric">
          <dt>AES-GCM</dt>
          <dd>
            <button
              type="button"
              className="runtime-value runtime-value--link metric-warn"
              onClick={openAes}
            >
              Buka simulator <ArrowRight size={14} />
            </button>
          </dd>
        </div>
      </dl>
    </aside>
  )
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="eyebrow-line">
          <span className="eyebrow-dot" aria-hidden="true" />
          V2.4 — ENGINE KRIPTOGRAFI EDUKATIF
        </p>

        <h1 className="hero__title">
          Amankan Pesan Anda dengan{' '}
          <span className="text-accent">Kriptografi</span>
        </h1>

        <p className="hero__desc">
          Enkripsi mengubah pesan yang bisa dibaca menjadi ciphertext yang
          tampak acak, sedangkan dekripsi mengembalikannya ke bentuk semula
          dengan kunci yang tepat. CryptoSafe membantu Anda mencoba proses
          tersebut secara langsung, sambil memahami alasan di balik setiap
          langkahnya.
        </p>

        <div className="hero__actions">
          <Link to="/encrypt" className="btn btn--primary">
            <Lock size={17} />
            Mulai Enkripsi Sekarang
            <ArrowRight size={16} />
          </Link>

          <Link to="/algorithms" className="btn btn--ghost">
            <BookOpen size={17} />
            Pelajari Kriptografi
          </Link>
        </div>

        <p className="hero__footnote">
          <ShieldCheck size={15} />
          Caesar dan Vigenère tersedia untuk simulasi edukasi. Benchmark AES-GCM
          dapat dijalankan melalui panel interaktif.
        </p>
      </div>

      <RuntimeCard />
    </section>
  )
}
