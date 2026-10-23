
import { useMemo, useState } from 'react'
import {
  Check,
  Copy,
  History,
  ShieldCheck,
  LockKeyhole,
} from 'lucide-react'

import {
  caesarEncrypt,
  copyToClipboard,
  hasVigenereKey,
  normalizeShift,
  vigenereEncrypt,
} from '../utils/cryptoUtils.js'

import {
  encryptAesGcm,
  decryptAesGcm,
} from '../utils/aesGcmUtils.js'

import { addHistory } from '../utils/historyUtils.js'

const DEFAULT_PLAINTEXT = 'Serangan fajar pukul 05:30 di titik koordinat!'

export default function EncryptionSimulator() {
  const [activeTab, setActiveTab] = useState('caesar')

  const [plaintext, setPlaintext] = useState(DEFAULT_PLAINTEXT)
  const [shift, setShift] = useState(3)
  const [vigenereKey, setVigenereKey] = useState('KUNCI')

  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  const [aesOperation, setAesOperation] = useState('encrypt')
  const [aesInput, setAesInput] = useState(DEFAULT_PLAINTEXT)
  const [aesPassword, setAesPassword] = useState('')
  const [aesResult, setAesResult] = useState('')
  const [aesError, setAesError] = useState('')
  const [aesBusy, setAesBusy] = useState(false)
  const [aesCopied, setAesCopied] = useState(false)
  const [aesSaved, setAesSaved] = useState(false)

  const isCaesar = activeTab === 'caesar'
  const isVigenere = activeTab === 'vigenere'
  const isAes = activeTab === 'aes'

  const shiftValue = normalizeShift(shift)
  const keyReady = hasVigenereKey(vigenereKey)

  const result = useMemo(() => {
    if (!plaintext) return ''

    if (isCaesar) {
      return caesarEncrypt(plaintext, shiftValue)
    }

    if (isVigenere && keyReady) {
      return vigenereEncrypt(plaintext, vigenereKey)
    }

    return ''
  }, [
    plaintext,
    isCaesar,
    isVigenere,
    shiftValue,
    vigenereKey,
    keyReady,
  ])

  const canProcess = Boolean(result) &&
    (isCaesar || (isVigenere && keyReady))

  function selectTab(tab) {
    setActiveTab(tab)
    setCopied(false)
    setSaved(false)
    setAesError('')
    setAesResult('')
    setAesCopied(false)
    setAesSaved(false)
  }

  async function handleCopy() {
    if (!canProcess) return

    const ok = await copyToClipboard(result)
    setCopied(ok)
  }

  async function handleAesCopy() {
    if (!aesResult) return

    const ok = await copyToClipboard(aesResult)
    setAesCopied(ok)
  }

  async function handleAesProcess() {
    if (!aesInput.trim()) {
      setAesError(
        aesOperation === 'encrypt'
          ? 'Masukkan pesan yang ingin dienkripsi.'
          : 'Masukkan ciphertext yang ingin didekripsi.'
      )
      return
    }

    if (!aesPassword.trim()) {
      setAesError('Masukkan kata sandi terlebih dahulu.')
      return
    }

    setAesBusy(true)
    setAesError('')
    setAesResult('')
    setAesCopied(false)
    setAesSaved(false)

    try {
      const output = aesOperation === 'encrypt'
        ? await encryptAesGcm(aesInput, aesPassword)
        : await decryptAesGcm(aesInput, aesPassword)

      setAesResult(output)
    } catch (error) {
      setAesError(
        error?.message || 'Proses AES-GCM gagal.'
      )
    } finally {
      setAesBusy(false)
    }
  }

  function handleSaveHistory() {
    if (!canProcess) return

    try {
      addHistory({
        algorithm: isCaesar ? 'Caesar Cipher' : 'Vigenère Cipher',
        operation: 'Enkripsi',
        status: 'Berhasil',
      })

      setSaved(true)
    } catch (error) {
      console.error('Gagal menyimpan riwayat:', error)
    }
  }

  function handleSaveAesHistory() {
    if (!aesResult) return

    try {
      addHistory({
        algorithm: 'AES-GCM',
        operation: aesOperation === 'encrypt'
          ? 'Enkripsi'
          : 'Dekripsi',
        status: 'Berhasil',
      })

      setAesSaved(true)
    } catch (error) {
      console.error('Gagal menyimpan riwayat:', error)
      setAesError('Hasil tersedia, tetapi riwayat gagal disimpan.')
    }
  }

  return (
    <section className="section">
      <div className="section__head">
        <h2 className="section__title">
          Pipeline Enkripsi Dinamis
        </h2>

        <p className="section__desc">
          Masukkan pesan, pilih algoritma, lalu lihat hasil enkripsi.
          Simpan aktivitas ke riwayat tanpa menyimpan pesan atau kunci.
        </p>
      </div>

      <div className="card sim">
        <div
          className="sim__tabs"
          role="tablist"
          aria-label="Pilih algoritma"
        >
          <button
            type="button"
            role="tab"
            aria-selected={isCaesar}
            className={`sim__tab${isCaesar ? ' sim__tab--active' : ''}`}
            onClick={() => selectTab('caesar')}
          >
            Caesar Cipher
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={isVigenere}
            className={`sim__tab${isVigenere ? ' sim__tab--active' : ''}`}
            onClick={() => selectTab('vigenere')}
          >
            Vigenère Cipher
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={isAes}
            className={`sim__tab${isAes ? ' sim__tab--active' : ''}`}
            onClick={() => selectTab('aes')}
          >
            AES-GCM
          </button>
        </div>

        {isAes ? (
          <div className="sim__panel">
            <div className="sim__body">
              <div className="sim__inputs">
                <div className="field">
                  <label className="field__label">
                    Operasi AES-GCM
                  </label>

                  <div className="sim__tabs">
                    <button
                      type="button"
                      className={`sim__tab${aesOperation === 'encrypt' ? ' sim__tab--active' : ''}`}
                      onClick={() => {
                        setAesOperation('encrypt')
                        setAesInput(DEFAULT_PLAINTEXT)
                        setAesResult('')
                        setAesError('')
                        setAesSaved(false)
                      }}
                    >
                      Enkripsi
                    </button>

                    <button
                      type="button"
                      className={`sim__tab${aesOperation === 'decrypt' ? ' sim__tab--active' : ''}`}
                      onClick={() => {
                        setAesOperation('decrypt')
                        setAesInput('')
                        setAesResult('')
                        setAesError('')
                        setAesSaved(false)
                      }}
                    >
                      Dekripsi
                    </button>
                  </div>
                </div>

                <div className="field">
                  <label
                    className="field__label"
                    htmlFor="aes-input"
                  >
                    {aesOperation === 'encrypt'
                      ? 'Plaintext'
                      : 'Ciphertext'}
                  </label>

                  <textarea
                    id="aes-input"
                    className="textarea mono"
                    rows={5}
                    value={aesInput}
                    onChange={(event) => {
                      setAesInput(event.target.value)
                      setAesResult('')
                      setAesError('')
                      setAesSaved(false)
                    }}
                    placeholder={
                      aesOperation === 'encrypt'
                        ? 'Tulis pesan yang ingin dienkripsi...'
                        : 'Tempel ciphertext yang dimulai dengan cs1...'
                    }
                  />
                </div>

                <div className="field">
                  <label
                    className="field__label"
                    htmlFor="aes-password"
                  >
                    Kata sandi
                  </label>

                  <input
                    id="aes-password"
                    className="input mono"
                    type="password"
                    autoComplete="new-password"
                    value={aesPassword}
                    onChange={(event) => {
                      setAesPassword(event.target.value)
                      setAesResult('')
                      setAesError('')
                      setAesSaved(false)
                    }}
                    placeholder="Masukkan kata sandi"
                  />

                  <p className="sim__disclaimer">
                    Gunakan kata sandi yang sama saat mendekripsi.
                    Kata sandi tidak disimpan ke riwayat.
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleAesProcess}
                  disabled={aesBusy}
                >
                  <LockKeyhole size={16} />

                  {aesBusy
                    ? 'Sedang memproses...'
                    : aesOperation === 'encrypt'
                      ? 'Enkripsi dengan AES-GCM'
                      : 'Dekripsi dengan AES-GCM'}
                </button>

                {aesError && (
                  <p
                    className="notice notice--amber"
                    role="alert"
                  >
                    {aesError}
                  </p>
                )}
              </div>

              <div className="sim__output">
                <div className="sim__output-head">
                  <span className="field__label">
                    {aesOperation === 'encrypt'
                      ? 'Ciphertext'
                      : 'Plaintext hasil dekripsi'}
                  </span>

                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={handleAesCopy}
                    disabled={!aesResult}
                  >
                    {aesCopied
                      ? <Check size={14} />
                      : <Copy size={14} />}

                    {aesCopied ? 'Tersalin' : 'Salin hasil'}
                  </button>
                </div>

                <div
                  className={`output-box mono${aesResult ? '' : ' output-box--empty'}`}
                  style={{
                    overflowWrap: 'anywhere',
                    whiteSpace: 'pre-wrap',
                  }}
                  aria-live="polite"
                >
                  {aesResult ||
                    (aesBusy
                      ? 'Sedang memproses...'
                      : 'Hasil akan muncul di sini.')}
                </div>

                <div
                  className="sim__actions"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginTop: '1rem',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={handleSaveAesHistory}
                    disabled={!aesResult}
                  >
                    <History size={14} />
                    Simpan ke Riwayat
                  </button>

                  {aesSaved && (
                    <span className="metric-ok" role="status">
                      <Check size={14} />
                      Aktivitas tersimpan
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="sim__panel">
            <div className="sim__body">
              <div className="sim__inputs">
                <div className="field">
                  <label
                    className="field__label"
                    htmlFor="sim-plaintext"
                  >
                    Plaintext
                  </label>

                  <textarea
                    id="sim-plaintext"
                    className="textarea mono"
                    rows={5}
                    value={plaintext}
                    onChange={(event) => {
                      setPlaintext(event.target.value)
                      setSaved(false)
                      setCopied(false)
                    }}
                    placeholder="Tulis pesan..."
                  />
                </div>

                {isCaesar ? (
                  <div className="field">
                    <label
                      className="field__label"
                      htmlFor="sim-shift"
                    >
                      Geseran kunci (0–25)
                    </label>

                    <input
                      id="sim-shift"
                      className="input mono"
                      type="number"
                      min="0"
                      max="25"
                      value={shift}
                      onChange={(event) => {
                        setShift(event.target.value)
                        setSaved(false)
                      }}
                    />

                    <input
                      className="range"
                      type="range"
                      min="0"
                      max="25"
                      value={shiftValue}
                      onChange={(event) => {
                        setShift(event.target.value)
                        setSaved(false)
                      }}
                      aria-label="Atur geseran Caesar"
                    />
                  </div>
                ) : (
                  <div className="field">
                    <label
                      className="field__label"
                      htmlFor="sim-key"
                    >
                      Kata kunci
                    </label>

                    <input
                      id="sim-key"
                      className="input mono"
                      value={vigenereKey}
                      onChange={(event) => {
                        setVigenereKey(event.target.value)
                        setSaved(false)
                      }}
                      placeholder="Contoh: KUNCI"
                    />
                  </div>
                )}
              </div>

              <div className="sim__output">
                <div className="sim__output-head">
                  <span className="field__label">
                    Ciphertext
                  </span>

                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={handleCopy}
                    disabled={!canProcess}
                  >
                    {copied
                      ? <Check size={14} />
                      : <Copy size={14} />}

                    {copied ? 'Tersalin' : 'Salin hasil'}
                  </button>
                </div>

                <div
                  className={`output-box mono${canProcess ? '' : ' output-box--empty'}`}
                >
                  {canProcess
                    ? result
                    : isVigenere && !keyReady
                      ? 'Masukkan kunci yang valid.'
                      : 'Masukkan pesan untuk memulai.'}
                </div>

                <div
                  className="sim__actions"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginTop: '1rem',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={handleSaveHistory}
                    disabled={!canProcess}
                  >
                    <History size={14} />
                    Simpan ke Riwayat
                  </button>

                  {saved && (
                    <span className="metric-ok" role="status">
                      <Check size={14} />
                      Aktivitas tersimpan
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="transform">
              <div className="transform__row">
                <span className="transform__label">
                  Plaintext
                </span>

                <code className="transform__value mono">
                  {plaintext || '—'}
                </code>
              </div>

              <div className="transform__row">
                <span className="transform__label">
                  Ciphertext
                </span>

                <code className="transform__value transform__value--cipher mono">
                  {canProcess ? result : '—'}
                </code>
              </div>
            </div>
          </div>
        )}

        <p
          className="sim__disclaimer"
          style={{ padding: '0 1rem 1rem' }}
        >
          <ShieldCheck size={15} />
          Riwayat hanya menyimpan metadata aktivitas, bukan pesan,
          ciphertext, atau kata sandi.
        </p>
      </div>
    </section>
  )
}
