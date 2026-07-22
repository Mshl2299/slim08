/**
 * Encode plaintext for src/data/portfolio.ts
 *
 * Usage: node scripts/encode-string.mjs "NAME"
 *        node scripts/encode-string.mjs "BUILT ABC" "BECAUSE OF XYZ"
 */

const KEY = 'slim08-portfolio-v1'

function encode(plain) {
  const bytes = Buffer.from(plain, 'utf8')
  const key = Buffer.from(KEY, 'utf8')
  const out = Buffer.alloc(bytes.length)
  for (let i = 0; i < bytes.length; i++) {
    out[i] = bytes[i] ^ key[i % key.length]
  }
  return out.toString('base64')
}

const inputs = process.argv.slice(2)
if (inputs.length === 0) {
  console.error('Usage: node scripts/encode-string.mjs "text" ["text2" ...]')
  process.exit(1)
}

for (const text of inputs) {
  console.log(`${JSON.stringify(text)} => ${encode(text)}`)
}
