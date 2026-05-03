#!/usr/bin/env node
//
// One-time conversion of every PNG under public/work/**/ to WebP.
//
// - Quality 82 lossy (visually identical to source for UI screenshots)
// - Max width 2400px (covers 2x retina at the largest display width of ~1200)
// - Preserves alpha channel
// - Deletes the original .png on success
//
// Run once after pulling new mockups into public/work/.
//
// Usage: node scripts/optimize-mockups.mjs
//

import { readdir, stat, unlink } from "node:fs/promises"
import { dirname, extname, join, relative, sep } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = dirname(__dirname)
const workDir = join(root, "public", "work")
const MAX_WIDTH = 2400
const QUALITY = 82

const walkPngs = async (dir) => {
  const out = []
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...(await walkPngs(full)))
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".png") {
      out.push(full)
    }
  }
  return out
}

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`
}

const main = async () => {
  const pngs = await walkPngs(workDir)
  if (pngs.length === 0) {
    console.log("No PNGs found under public/work/.")
    return
  }

  console.log(`Converting ${pngs.length} PNG(s) to WebP (q${QUALITY}, max ${MAX_WIDTH}px wide)...\n`)

  let totalBefore = 0
  let totalAfter = 0

  for (const src of pngs) {
    const dest = src.replace(/\.png$/i, ".webp")
    const beforeBytes = (await stat(src)).size
    totalBefore += beforeBytes

    const meta = await sharp(src).metadata()
    const pipeline = sharp(src)
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline.resize({ width: MAX_WIDTH })
    }
    await pipeline.webp({ quality: QUALITY, effort: 6, alphaQuality: 90 }).toFile(dest)

    const afterBytes = (await stat(dest)).size
    totalAfter += afterBytes

    const pct = ((1 - afterBytes / beforeBytes) * 100).toFixed(1)
    const rel = relative(root, src).split(sep).join("/")
    console.log(`  ${rel}: ${formatBytes(beforeBytes)} -> ${formatBytes(afterBytes)} (-${pct}%)`)

    await unlink(src)
  }

  const totalPct = ((1 - totalAfter / totalBefore) * 100).toFixed(1)
  console.log(
    `\nTotal: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} (-${totalPct}%)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
