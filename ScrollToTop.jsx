import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Mengembalikan posisi scroll ke atas setiap kali rute berubah.
 * Berguna karena SPA tidak memuat ulang dokumen.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
