/** Judul halaman yang konsisten untuk seluruh halaman selain Beranda. */
export default function PageHeader({ eyebrow, title, description, icon: Icon }) {
  return (
    <header className="page-header">
      {eyebrow && (
        <p className="eyebrow-line">
          <span className="eyebrow-dot" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <div className="page-header__title-row">
        {Icon && (
          <span className="page-header__icon">
            <Icon size={22} />
          </span>
        )}
        <h1 className="page-header__title">{title}</h1>
      </div>
      {description && <p className="page-header__desc">{description}</p>}
    </header>
  )
}
