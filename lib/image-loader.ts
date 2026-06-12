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
    return src
  }
  const params = [`width=${width}`, `quality=${quality ?? 75}`, "format=auto"]
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src
  return `/cdn-cgi/image/${params.join(",")}/${normalizedSrc}`
}

export default cloudflareImageLoader
