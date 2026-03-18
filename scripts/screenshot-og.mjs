#!/usr/bin/env node
/**
 * Renders the real site in a headless browser and saves the top portion
 * as public/og.png for OpenGraph / README. Run after building the site.
 *
 * Usage: pnpm build && node scripts/screenshot-og.mjs
 *    or: pnpm og:capture   (runs build then this script)
 */

import { spawn } from "node:child_process"
import { mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
// Use 3099 so we don't conflict with pnpm dev on 3000
const port = 3099
const ogWidth = 1200
const ogHeight = 630

function waitForPort(ms = 200, maxAttempts = 60) {
  return new Promise((resolve, reject) => {
    const check = (attempt) => {
      import("node:net")
        .then(({ default: net }) => {
          const socket = net.createConnection(port, "127.0.0.1", () => {
            socket.destroy()
            resolve()
          })
          socket.on("error", () => {
            if (attempt >= maxAttempts) reject(new Error("Port never ready"))
            else setTimeout(() => check(attempt + 1), ms)
          })
        })
        .catch(reject)
    }
    check(0)
  })
}

async function main() {
  let server

  try {
    // Start production server (assumes you've run pnpm build already, or we run it)
    console.log("Starting server on port", port, "...")
    server = spawn("pnpm", ["start"], {
      cwd: root,
      stdio: "pipe",
      env: { ...process.env, PORT: String(port) },
    })
    server.stdout?.on("data", (d) => process.stdout.write(d))
    server.stderr?.on("data", (d) => process.stderr.write(d))

    await waitForPort()
    // Give the page a moment to paint
    await new Promise((r) => setTimeout(r, 1500))

    const { chromium } = await import("playwright")
    let browser
    try {
      browser = await chromium.launch()
    } catch (e) {
      if (e.message?.includes("Executable doesn't exist") || e.message?.includes("browserType.launch")) {
        console.log("Installing Chromium for Playwright (one-time)...")
        const { execSync } = await import("node:child_process")
        execSync("pnpm exec playwright install chromium", { cwd: root, stdio: "inherit" })
        browser = await chromium.launch()
      } else {
        throw e
      }
    }
    const page = await browser.newPage({
      viewport: { width: ogWidth, height: ogHeight },
      deviceScaleFactor: 1,
    })

    await page.goto(`http://127.0.0.1:${port}/`, {
      waitUntil: "networkidle",
      timeout: 15000,
    })

    const outPath = join(root, "public", "og.png")
    await mkdir(dirname(outPath), { recursive: true })
    await page.screenshot({
      path: outPath,
      type: "png",
    })

    await browser.close()
    console.log("Saved:", outPath)
  } finally {
    if (server) {
      server.kill("SIGTERM")
      console.log("Stopped server.")
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
