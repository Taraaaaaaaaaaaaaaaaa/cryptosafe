
const encoder = new TextEncoder()

function toBase64(bytes) {
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary)
}

function fromBase64(value) {
  const binary = atob(value)
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

async function deriveKey(password, salt) {
  if (!password || !password.trim()) {
    throw new Error('Kata sandi tidak boleh kosong.')
  }

  const material = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 250000,
      hash: 'SHA-256',
    },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

function ensureCryptoAvailable() {
  if (!globalThis.isSecureContext || !globalThis.crypto?.subtle) {
    throw new Error(
      'Web Crypto API memerlukan browser modern melalui localhost atau HTTPS.'
    )
  }
}

export async function encryptAesGcm(plaintext, password) {
  ensureCryptoAvailable()

  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt)

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(plaintext)
  )

  return [
    'cs1',
    toBase64(salt),
    toBase64(iv),
    toBase64(new Uint8Array(ciphertext)),
  ].join('.')
}

export async function decryptAesGcm(ciphertext, password) {
  ensureCryptoAvailable()

  const parts = ciphertext.trim().split('.')

  if (parts.length !== 4 || parts[0] !== 'cs1') {
    throw new Error(
      'Format ciphertext tidak valid. Gunakan ciphertext hasil AES-GCM CryptoSafe.'
    )
  }

  let salt
  let iv
  let encrypted

  try {
    salt = fromBase64(parts[1])
    iv = fromBase64(parts[2])
    encrypted = fromBase64(parts[3])
  } catch {
    throw new Error('Ciphertext tidak memiliki format Base64 yang valid.')
  }

  if (salt.length !== 16 || iv.length !== 12 || encrypted.length < 16) {
    throw new Error('Data ciphertext tidak lengkap atau rusak.')
  }

  const key = await deriveKey(password, salt)

  try {
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    )

    return new TextDecoder('utf-8', { fatal: true }).decode(plaintext)
  } catch {
    throw new Error(
      'Dekripsi gagal. Periksa kata sandi atau keutuhan ciphertext.'
    )
  }
}
