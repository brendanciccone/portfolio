import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import path from 'path'

/*
 * "0 → 1" appears in the home intro, the About bio, the contact standfirst and
 * every case-study CTA. If the active typeface lacks U+2192 the arrow silently
 * falls back to the OS font — a different weight, a different width, no error
 * anywhere. Inter's Google subset had exactly that hole, which is why the site
 * used to ship a hand-cut arrow @font-face patch alongside it.
 *
 * Geist covers the block natively, so the patch is gone. What has to be
 * defended now is the reason it could go: this reads the font binary the site
 * actually loads and asserts the glyph is really in it. Swap to a face that
 * omits it and this fails, rather than the arrows quietly changing shape.
 */
const FONT = path.resolve(
  __dirname,
  '../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.ttf',
)

/* Arrows the copy relies on, plus the neighbours a future edit might reach for */
const REQUIRED = [
  { cp: 0x2192, name: '→ U+2192' },
  { cp: 0x2190, name: '← U+2190' },
  { cp: 0x2191, name: '↑ U+2191' },
  { cp: 0x2193, name: '↓ U+2193' },
]

/*
 * Minimal cmap format-4 reader. Pulling in a font-parsing dependency to answer
 * one yes/no question about four codepoints is not worth the supply chain.
 */
const buildCoverage = (file: string): ((cp: number) => boolean) => {
  const buf = readFileSync(file)
  const tableCount = buf.readUInt16BE(4)

  let cmapOffset: number | null = null
  for (let i = 0; i < tableCount; i++) {
    const record = 12 + i * 16
    if (buf.toString('ascii', record, record + 4) === 'cmap') {
      cmapOffset = buf.readUInt32BE(record + 8)
    }
  }
  if (cmapOffset === null) throw new Error('font has no cmap table')

  // Take the last format-4 subtable; that is the Unicode BMP mapping
  let subtable: number | null = null
  const subtableCount = buf.readUInt16BE(cmapOffset + 2)
  for (let i = 0; i < subtableCount; i++) {
    const record = cmapOffset + 4 + i * 8
    const offset = cmapOffset + buf.readUInt32BE(record + 4)
    if (buf.readUInt16BE(offset) === 4) subtable = offset
  }
  if (subtable === null) throw new Error('font has no format-4 cmap subtable')

  const segCountX2 = buf.readUInt16BE(subtable + 6)
  const segCount = segCountX2 / 2
  const endCodes = subtable + 14
  const startCodes = endCodes + segCountX2 + 2
  const idDeltas = startCodes + segCountX2
  const idRangeOffsets = idDeltas + segCountX2

  return (cp: number): boolean => {
    for (let i = 0; i < segCount; i++) {
      if (cp > buf.readUInt16BE(endCodes + i * 2)) continue

      const start = buf.readUInt16BE(startCodes + i * 2)
      if (cp < start) return false

      const rangeOffset = buf.readUInt16BE(idRangeOffsets + i * 2)
      if (rangeOffset === 0) {
        return ((cp + buf.readInt16BE(idDeltas + i * 2)) & 0xffff) !== 0
      }
      const glyphIndex = buf.readUInt16BE(idRangeOffsets + i * 2 + rangeOffset + (cp - start) * 2)
      return glyphIndex !== 0
    }
    return false
  }
}

describe('arrow glyph coverage', () => {
  it('ships the font binary the site loads', () => {
    expect(existsSync(FONT)).toBe(true)
  })

  it.each(REQUIRED)('covers $name natively, so no patch face is needed', ({ cp }) => {
    expect(buildCoverage(FONT)(cp)).toBe(true)
  })

  it('has no leftover arrow patch in the stylesheet', () => {
    const css = readFileSync(path.resolve(__dirname, '../app/globals.css'), 'utf8')
    expect(css).not.toMatch(/arrows?\.woff2/)
  })
})
