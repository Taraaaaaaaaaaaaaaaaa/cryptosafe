/**
 * Utilitas kriptografi klasik.
 *
 * Catatan penting:
 * - Caesar dan Vigenere di sini adalah cipher klasik yang hanya menggeser huruf
 *   alfabet Latin (A-Z, a-z). Karakter lain (spasi, angka, tanda baca) dibiarkan
 *   apa adanya. Cipher klasik TIDAK aman untuk data nyata, fungsinya edukasi.
 * - AES-GCM belum diimplementasikan pada tahap ini. Implementasinya akan memakai
 *   Web Crypto API (window.crypto.subtle) dan tidak disimulasikan di sini.
 */

const UPPER_A = 65
const UPPER_Z = 90
const LOWER_A = 97
const LOWER_Z = 122

/** Mengubah nilai geseran menjadi rentang 0..25. */
export function normalizeShift(shift) {
  const numeric = Number.parseInt(shift, 10)
  if (!Number.isFinite(numeric)) return 0
  return ((numeric % 26) + 26) % 26
}

function shiftLetter(code, shift, base) {
  return String.fromCharCode(base + (((code - base + shift) % 26) + 26) % 26)
}

/** Inti Caesar cipher: geseran positif = enkripsi, negatif = dekripsi. */
export function caesarCipher(text, shift) {
  const amount = Number.parseInt(shift, 10)
  const safeShift = Number.isFinite(amount) ? amount : 0

  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0)
      if (code >= UPPER_A && code <= UPPER_Z) return shiftLetter(code, safeShift, UPPER_A)
      if (code >= LOWER_A && code <= LOWER_Z) return shiftLetter(code, safeShift, LOWER_A)
      return char
    })
    .join('')
}

export function caesarEncrypt(text, shift) {
  return caesarCipher(text, normalizeShift(shift))
}

export function caesarDecrypt(text, shift) {
  return caesarCipher(text, -normalizeShift(shift))
}

/** Mengubah kunci Vigenere menjadi daftar geseran 0..25 (hanya huruf yang dipakai). */
export function vigenereShifts(key) {
  const shifts = []
  for (const char of Array.from(key || '')) {
    const code = char.toUpperCase().charCodeAt(0)
    if (code >= UPPER_A && code <= UPPER_Z) shifts.push(code - UPPER_A)
  }
  return shifts
}

/** true bila kunci Vigenere punya minimal satu huruf. */
export function hasVigenereKey(key) {
  return vigenereShifts(key).length > 0
}

/**
 * Inti Vigenere cipher. Hanya huruf pada plaintext yang menggeser posisi kunci,
 * sehingga spasi dan tanda baca tidak memutus siklus kunci.
 */
export function vigenereCipher(text, key, direction = 1) {
  const shifts = vigenereShifts(key)
  if (shifts.length === 0) return text

  let keyIndex = 0
  return Array.from(text)
    .map((char) => {
      const code = char.charCodeAt(0)
      const shift = shifts[keyIndex % shifts.length] * direction

      if (code >= UPPER_A && code <= UPPER_Z) {
        keyIndex += 1
        return shiftLetter(code, shift, UPPER_A)
      }
      if (code >= LOWER_A && code <= LOWER_Z) {
        keyIndex += 1
        return shiftLetter(code, shift, LOWER_A)
      }
      return char
    })
    .join('')
}

export function vigenereEncrypt(text, key) {
  return vigenereCipher(text, key, 1)
}

export function vigenereDecrypt(text, key) {
  return vigenereCipher(text, key, -1)
}

/**
 * Deteksi dukungan Web Crypto API secara nyata di browser pengguna.
 * Dipakai hanya untuk menampilkan ketersediaan API, bukan skor keamanan.
 */
export function isWebCryptoAvailable() {
  if (typeof window === 'undefined' || !window.crypto) return false
  return typeof window.crypto.subtle !== 'undefined'
}

/** Menyalin teks ke clipboard. Mengembalikan Promise<boolean>. */
export async function copyToClipboard(text) {
  if (!text) return false
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // lanjut ke fallback di bawah
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}
