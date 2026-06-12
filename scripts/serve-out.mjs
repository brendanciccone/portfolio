#!/usr/bin/env node
/**
 * Serves the static export in out/ the way Cloudflare Pages does:
 * clean URLs fall back to <path>.html, unknown routes get 404.html, and
 * /cdn-cgi/image/<options>/<src> (Cloudflare Image Transformations, which
 * only exist at Cloudflare's edge) passes through to the original asset so
 * images render in local previews.
 *
 * This is the `pnpm start` command: it serves the export locally and also
 * keeps the Railway fallback working (railway.json runs `pnpm start`), since
 * `next start` refuses to run with output: 'export'.
 *
 * Usage: pnpm build && pnpm start
 */

import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { dirname, extname, join, normalize } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, "..", "out")

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
}

// A miss (no such file, path is a directory, or a path segment is a file —
// e.g. /og.png/extra) means "try the next candidate"; anything else is a
// real failure and propagates.
const readFileOrNull = async (filePath) => {
  try {
    return await readFile(filePath)
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "EISDIR" || error?.code === "ENOTDIR") {
      return null
    }
    throw error
  }
}

const resolveRequestPath = (url) => {
  let pathname = decodeURIComponent(new URL(url, "http://localhost").pathname)
  // Cloudflare Image Transformations only exist at the edge — serve the source
  const cdnCgiMatch = pathname.match(/^\/cdn-cgi\/image\/[^/]+\/(.+)$/)
  if (cdnCgiMatch) {
    pathname = `/${cdnCgiMatch[1]}`
  }
  return pathname
}

export const serveOut = (port) => {
  const server = createServer(async (req, res) => {
    // decodeURIComponent throws URIError on malformed percent-encoding
    // (e.g. /%zz); answer 400 instead of crashing the server.
    let pathname
    try {
      pathname = resolveRequestPath(req.url ?? "/")
    } catch (error) {
      if (error instanceof URIError) {
        res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" })
        res.end("400 Bad Request")
        return
      }
      throw error
    }

    const candidates = pathname.endsWith("/")
      ? [`${pathname}index.html`]
      : [pathname, `${pathname}.html`]

    for (const candidate of candidates) {
      const filePath = join(outDir, normalize(candidate))
      if (!filePath.startsWith(outDir)) {
        break
      }
      const body = await readFileOrNull(filePath)
      if (body) {
        res.writeHead(200, {
          "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
        })
        res.end(body)
        return
      }
    }

    const notFoundPage = await readFileOrNull(join(outDir, "404.html"))
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
    res.end(notFoundPage ?? "404 Not Found")
  })
  server.listen(port)
  return server
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
  const port = Number(process.env.PORT ?? 4173)
  serveOut(port)
  console.log(`Serving out/ at http://localhost:${port}`)
}
