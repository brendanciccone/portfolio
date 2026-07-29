import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import path from 'path'

/*
 * The arrow face is wired up by hand: a url() string in CSS pointing at a file
 * dropped into public/. Nothing validates that pair — not the type checker, not
 * the build — so a rename or a lost asset would surface only as arrows quietly
 * falling back to the OS font, which is the exact bug the face exists to fix.
 */
const css = readFileSync(path.resolve(__dirname, '../app/globals.css'), 'utf8')
const arrowFace = css.match(/@font-face\s*\{[^}]*inter-arrows[^}]*\}/)?.[0] ?? ''

describe('arrow @font-face', () => {
  it('declares the Inter family, so the browser merges it in rather than treating it as a fallback', () => {
    expect(arrowFace).not.toBe('')
    expect(arrowFace).toMatch(/font-family:\s*Inter\s*;/)
  })

  it('spans U+2192, the glyph Google\'s latin subset leaves out', () => {
    const range = arrowFace.match(/unicode-range:\s*U\+([0-9A-F]+)-([0-9A-F]+)/i)
    expect(range).not.toBeNull()
    if (!range) return

    expect(parseInt(range[1], 16)).toBeLessThanOrEqual(0x2192)
    expect(parseInt(range[2], 16)).toBeGreaterThanOrEqual(0x2192)
  })

  it('points at a font file that is actually present', () => {
    const url = arrowFace.match(/url\("([^"]+)"\)/)?.[1]
    expect(url).toBeDefined()
    if (!url) return

    expect(existsSync(path.resolve(__dirname, '../public', url.replace(/^\//, '')))).toBe(true)
  })
})
