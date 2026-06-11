/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages — the site has no runtime server.
  // redirects() and headers() are ignored under output: 'export', so:
  //  - www → apex (permanent 308) lives in a Cloudflare zone Redirect Rule
  //  - legacy /work/*.png → .webp redirects live in public/_redirects
  //  - image Cache-Control headers live in public/_headers
  // See DEPLOY.md for the dashboard pieces.
  output: 'export',
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Cloudflare Image Transformations replace the built-in optimizer, which
    // needs a running server. The loader builds /cdn-cgi/image/... URLs that
    // Cloudflare's edge resizes/re-encodes on the fly (free tier).
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    // Force a non-WASM hash function to avoid WasmHash crashes on some Node versions
    if (config.output) {
      config.output.hashFunction = 'sha256'
    }
    return config
  },
}

export default nextConfig
