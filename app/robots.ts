import { MetadataRoute } from 'next'

// Metadata routes are route handlers; output: 'export' requires them to opt
// into static rendering explicitly.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://brendanciccone.com/sitemap.xml',
  }
} 