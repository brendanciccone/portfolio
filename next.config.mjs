/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80], // Allowed quality values for next/image
    minimumCacheTTL: 604800,
  },
  webpack: (config) => {
    // Force a non-WASM hash function to avoid WasmHash crashes on some Node versions
    if (config.output) {
      config.output.hashFunction = 'sha256'
    }
    return config
  },
  headers: async () => {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          }
        ],
      },
      {
        source: '/_next/image/:all*',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          }
        ],
      },
    ]
  },
}

export default nextConfig
