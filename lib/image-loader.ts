interface CloudflareImageLoaderParams {
  src: string
  width: number
  quality?: number
}

// next/image loader backed by Cloudflare Image Transformations (free tier).
// `/cdn-cgi/image/...` URLs are rewritten at Cloudflare's edge, so they only
// resolve on a zone with transformations enabled (brendanciccone.com) — not on
// localhost or *.pages.dev previews. Dev serves the untransformed source;
// `scripts/serve-out.mjs` strips the prefix for local previews of the export.
const cloudflareImageLoader = ({ src, width, quality }: CloudflareImageLoaderParams): string => {
  if (process.env.NODE_ENV === "development") {
    // Dev serves the untransformed file; the width param only exists so the
    // loader "implements width" (Next 16 warns otherwise) — it is ignored.
    // Splice it in query/hash-safely in case a src ever carries either.
    const [path, hash = ""] = src.split("#", 2)
    const separator = path.includes("?") ? "&" : "?"
    return `${path}${separator}width=${width}${hash ? `#${hash}` : ""}`
  }
  const params = [`width=${width}`, `quality=${quality ?? 75}`, "format=auto"]
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src
  return `/cdn-cgi/image/${params.join(",")}/${normalizedSrc}`
}

export default cloudflareImageLoader
