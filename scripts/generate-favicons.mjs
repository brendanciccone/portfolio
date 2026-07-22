#!/usr/bin/env node
/**
 * Regenerates the PNG/ICO favicon set from the site mark (the red stamp
 * period on paper — keep in sync with app/icon.svg, which serves the
 * dark-mode-aware SVG favicon for modern browsers).
 *
 * Usage: node scripts/generate-favicons.mjs
 */

import { readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, "..", "public")

// app/icon.svg is the canonical mark. Its prefers-color-scheme dark override
// never matches during rasterization, so PNGs come out in the light (paper)
// variant — which is what fixed-color rasters should be.
const markSvg = await readFile(join(__dirname, "..", "app", "icon.svg"))

const renderPng = (size) => sharp(markSvg).resize(size, size).png().toBuffer()

/*
 * Minimal ICO container holding one PNG image. Modern browsers accept
 * PNG-encoded ICO entries; this keeps /favicon.ico consistent with the mark
 * without another dependency.
 */
const wrapPngInIco = (png, size) => {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(1, 4) // image count

  const entry = Buffer.alloc(16)
  entry.writeUInt8(size === 256 ? 0 : size, 0) // width
  entry.writeUInt8(size === 256 ? 0 : size, 1) // height
  entry.writeUInt8(0, 2) // palette
  entry.writeUInt8(0, 3) // reserved
  entry.writeUInt16LE(1, 4) // color planes
  entry.writeUInt16LE(32, 6) // bits per pixel
  entry.writeUInt32LE(png.length, 8) // image size
  entry.writeUInt32LE(22, 12) // image offset (6 + 16)

  return Buffer.concat([header, entry, png])
}

const targets = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
]

for (const [name, size] of targets) {
  await writeFile(join(publicDir, name), await renderPng(size))
  console.log(`public/${name} (${size}x${size})`)
}

await writeFile(join(publicDir, "favicon.ico"), wrapPngInIco(await renderPng(32), 32))
console.log("public/favicon.ico (32x32 PNG-in-ICO)")
