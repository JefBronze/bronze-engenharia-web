// Renders the e-mail signature logos (PNG, 2x) from inline SVG.
// E-mail clients don't show SVG or web fonts, so the signature uses these hosted PNGs.
// Usage: node scripts/render-email-logo.mjs
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', 'email')
await mkdir(out, { recursive: true })

const INK = '#1A1917'
const ACCENT = '#B5561A'

// Wordmark drawn as paths-free text in a system monospace font; rendered once to PNG, so the
// font only has to exist on the machine that runs this script.
const lockup = `<svg xmlns="http://www.w3.org/2000/svg" width="330" height="72" viewBox="0 0 330 72">
  <rect width="330" height="72" fill="#FFFFFF"/>
  <rect x="8" y="44" width="12" height="20" fill="${INK}"/>
  <rect x="26" y="32" width="12" height="32" fill="${INK}"/>
  <rect x="44" y="24" width="12" height="40" fill="${INK}"/>
  <rect x="4" y="10" width="64" height="6" fill="${ACCENT}"/>
  <text x="84" y="54" font-family="Menlo, Monaco, 'DejaVu Sans Mono', monospace" font-size="38" letter-spacing="-1.5" fill="${INK}">Data<tspan fill="${ACCENT}">_</tspan>Joule</text>
</svg>`

const mark = `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 36 36">
  <rect width="36" height="36" rx="6" fill="#FFFFFF"/>
  <rect x="4" y="22" width="6" height="10" fill="${INK}"/>
  <rect x="13" y="16" width="6" height="16" fill="${INK}"/>
  <rect x="22" y="12" width="6" height="20" fill="${INK}"/>
  <rect x="2" y="5" width="32" height="3" fill="${ACCENT}"/>
</svg>`

await sharp(Buffer.from(lockup), { density: 300 }).resize(660, 144).png({ compressionLevel: 9 }).toFile(join(out, 'logo-lockup.png'))
await sharp(Buffer.from(mark), { density: 600 }).resize(144, 144).png({ compressionLevel: 9 }).toFile(join(out, 'logo-mark.png'))
console.log('✓ public/email/logo-lockup.png (660×144) and logo-mark.png (144×144)')
