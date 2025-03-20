import { GeistSans } from "geist/font/sans"
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata: Metadata = {
  title: "Brendan Ciccone - 0 → 1 Senior Product Designer",
  description:
    "Brendan Ciccone is a 0 → 1 Senior Product Designer with 7 years of experience turning ideas into fully realized B2B and B2C products across healthcare, cybersecurity, and finance.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Brendan Ciccone - 0 → 1 Senior Product Designer",
    description:
      "Brendan Ciccone is a 0 → 1 Senior Product Designer with 7 years of experience turning ideas into fully realized B2B and B2C products across healthcare, cybersecurity, and finance.",
    url: "https://brendanciccone.com",
    siteName: "Brendan Ciccone",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-image-mTJnoVTILGXx5KRnKHq6F3bGGzAcXA.png",
        width: 1200,
        height: 630,
        alt: "Brendan Ciccone - 0 → 1 Senior Product Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brendan Ciccone - 0 → 1 Senior Product Designer",
    description:
      "Brendan Ciccone is a 0 → 1 Senior Product Designer with 7 years of experience turning ideas into fully realized B2B and B2C products across healthcare, cybersecurity, and finance.",
    creator: "@brendanciccone",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opengraph-image-mTJnoVTILGXx5KRnKHq6F3bGGzAcXA.png",
        width: 1200,
        height: 630,
        alt: "Brendan Ciccone - 0 → 1 Senior Product Designer"
      }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <head>
        <link
          rel="preload"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Profile.jpg-al2nGt8LMiAxExrg2Jeb9tDq6VnRHb.jpeg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preconnect"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <ScrollToTop />
            {children}
            <Analytics />
            <SpeedInsights />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}