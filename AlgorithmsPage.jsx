import { BookOpen } from 'lucide-react'
import PlaceholderPage from '../components/PlaceholderPage.jsx'

export default function AlgorithmsPage() {
  return (
    <PlaceholderPage
      eyebrow="HALAMAN 03 — ALGORITMA"
      title="Algoritma"
      description="Penjelasan bertahap tentang cara kerja setiap algoritma yang dipakai di CryptoSafe, beserta kelebihan dan keterbatasannya."
      icon={BookOpen}
      planned={[
        {
          title: 'Caesar Cipher',
          text: 'Dasar pergeseran alfabet seragam sebesar nilai kunci, dilengkapi ilustrasi rotasi alfabet dan alasan mengapa hanya ada 25 kemungkinan kunci.',
        },
        {
          title: 'Vigenère Cipher',
          text: 'Penggunaan kata kunci berulang yang menghasilkan geseran berbeda per huruf, termasuk contoh tabel Vigenère dan alasan kunci pendek mudah dianalisis.',
        },
        {
          title: 'AES-GCM',
          text: 'Cipher blok simetris modern dengan mode AEAD: penjelasan blok 128 bit, panjang kunci 128/192/256 bit, IV unik, dan fungsi authentication tag.',
        },
        {
          title: 'Perbandingan',
          text: 'Tabel ringkas yang menempatkan cipher klasik dan AES-GCM berdampingan berdasarkan kekuatan kunci dan jenis serangan yang relevan.',
        },
      ]}
      note="Seluruh materi akan bersifat edukatif dan tidak akan menampilkan nilai tingkat keamanan yang tidak benar-benar dihitung."
      relatedLink={{ to: '/', label: 'Kembali ke Beranda' }}
    />
  )
}
