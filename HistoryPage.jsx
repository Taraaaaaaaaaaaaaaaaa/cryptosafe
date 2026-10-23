
import { useEffect, useState } from 'react'
import { History, Trash2, RefreshCw } from 'lucide-react'
import {
  getHistory,
  deleteHistory,
  clearHistory,
} from '../utils/historyUtils.js'

export default function HistoryPage() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('Semua')

  const refreshHistory = () => {
    setItems(getHistory())
  }

  useEffect(() => {
    refreshHistory()
  }, [])

  const handleDelete = (id) => {
    deleteHistory(id)
    refreshHistory()
  }

  const handleClear = () => {
    if (!items.length) return
    if (!window.confirm('Hapus seluruh riwayat aktivitas?')) return
    clearHistory()
    refreshHistory()
  }

  const filteredItems = filter === 'Semua'
    ? items
    : items.filter((item) => item.algorithm === filter)

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return Number.isNaN(date.getTime())
      ? 'Waktu tidak tersedia'
      : date.toLocaleString('id-ID')
  }

  return (
    <main className="section">
      <div className="section__head">
        <p className="eyebrow">HALAMAN 04 — RIWAYAT</p>
        <h1 className="section__title">Riwayat Aktivitas</h1>
        <p className="section__desc">
          Catatan aktivitas kriptografi yang tersimpan secara lokal
          di browser ini. Pesan dan kunci rahasia tidak disimpan.
        </p>
      </div>

      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}>
          <div>
            <h2 className="section__title">
              <History size={20} style={{ verticalAlign: 'middle' }} />{' '}
              Catatan aktivitas
            </h2>
            <p className="field__hint">{items.length} aktivitas tersimpan</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={refreshHistory}
            >
              <RefreshCw size={14} /> Muat ulang
            </button>
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={handleClear}
              disabled={!items.length}
            >
              <Trash2 size={14} /> Hapus semua
            </button>
          </div>
        </div>

        <div className="field" style={{ maxWidth: '280px', marginBottom: '1rem' }}>
          <label className="field__label" htmlFor="history-filter">
            Filter algoritma
          </label>
          <select
            id="history-filter"
            className="input"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option>Semua</option>
            <option>Caesar Cipher</option>
            <option>Vigenère Cipher</option>
          </select>
        </div>

        {filteredItems.length === 0 ? (
          <div className="output-box" style={{ padding: '2rem', textAlign: 'center' }}>
            {items.length === 0
              ? 'Belum ada aktivitas tersimpan. Coba enkripsi pesan, lalu tekan Simpan ke Riwayat.'
              : 'Tidak ada aktivitas yang cocok dengan filter ini.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ padding: '0.8rem' }}>Waktu</th>
                  <th style={{ padding: '0.8rem' }}>Algoritma</th>
                  <th style={{ padding: '0.8rem' }}>Aktivitas</th>
                  <th style={{ padding: '0.8rem' }}>Status</th>
                  <th style={{ padding: '0.8rem' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: '0.8rem' }}>{formatDate(item.timestamp)}</td>
                    <td style={{ padding: '0.8rem' }}>{item.algorithm}</td>
                    <td style={{ padding: '0.8rem' }}>{item.operation}</td>
                    <td style={{ padding: '0.8rem' }}>{item.status}</td>
                    <td style={{ padding: '0.8rem' }}>
                      <button
                        type="button"
                        className="btn btn--outline btn--sm"
                        onClick={() => handleDelete(item.id)}
                        aria-label={`Hapus riwayat ${item.algorithm}`}
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
