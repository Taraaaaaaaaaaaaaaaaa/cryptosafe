import { Link } from 'react-router-dom'
import { CircleDashed, Info } from 'lucide-react'
import PageHeader from './PageHeader.jsx'

/**
 * Kerangka halaman yang konsisten untuk rute yang belum diimplementasikan.
 * Sengaja tidak memuat tombol aksi palsu: seluruh isi hanya informatif.
 */
export default function PlaceholderPage({
  eyebrow,
  title,
  description,
  icon,
  planned = [],
  note,
  relatedLink,
}) {
  return (
    <div className="container page">
      <PageHeader eyebrow={eyebrow} title={title} description={description} icon={icon} />

      <div className="card placeholder-card">
        <span className="status-badge status-badge--idle">
          <CircleDashed size={14} />
          Belum diimplementasikan
        </span>

        <h2 className="placeholder-card__title">Rencana pada tahap berikutnya</h2>
        <ul className="roadmap-list">
          {planned.map((item) => (
            <li key={item.title} className="roadmap-item">
              <h3 className="roadmap-item__title">{item.title}</h3>
              <p className="roadmap-item__text">{item.text}</p>
            </li>
          ))}
        </ul>

        {note && (
          <div className="notice notice--cyan">
            <Info size={16} />
            <p>{note}</p>
          </div>
        )}

        {relatedLink && (
          <Link to={relatedLink.to} className="btn btn--outline btn--sm">
            {relatedLink.label}
          </Link>
        )}
      </div>
    </div>
  )
}
