/**
 * Lightweight XOR + Base64 obfuscation for portfolio strings.
 *
 * Prefer: edit portfolio.private.json → npm run encode:portfolio
 * Low-level: node scripts/encode-string.mjs "your text"
 *
 * Deterrence only — not strong cryptography. Plaintext stays local in
 * portfolio.private.json (gitignored); only encoded values ship in the site.
 */

const KEY = 'slim08-portfolio-v1'

function xorBytes(bytes: Uint8Array): Uint8Array {
  const keyBytes = new TextEncoder().encode(KEY)
  const out = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) {
    out[i] = bytes[i] ^ keyBytes[i % keyBytes.length]
  }
  return out
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function base64ToBytes(encoded: string): Uint8Array {
  const binary = atob(encoded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

/** Obfuscate a UTF-8 string for storage in the source of truth. */
export function obfuscate(plain: string): string {
  return bytesToBase64(xorBytes(new TextEncoder().encode(plain)))
}

/** Reveal an obfuscated string at runtime (client-side only). */
export function deobfuscate(encoded: string): string {
  return new TextDecoder().decode(xorBytes(base64ToBytes(encoded)))
}

/** Type helper: mark a field as obfuscated payload. */
export type Obfuscated = string & { readonly __obfuscated: unique symbol }

export function o(encoded: string): Obfuscated {
  return encoded as Obfuscated
}
