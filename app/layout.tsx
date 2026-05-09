import { Google_Sans_Flex } from "next/font/google"
import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import { ErrorBoundary } from "@/components/error-boundary"
import JsonLd from "@/components/json-ld"

// Variable font with weight (100-1000) and width (25-151) axes.
// Site uses default 100% width across body and titles; the wdth axis is
// preloaded so we can dial up width via font-stretch later if needed.
const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-google-sans-flex",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://brendanciccone.com"),
  alternates: {
    canonical: "/",
  },
  title: "Brendan Ciccone - 0 → 1 Staff Product Designer",
  description:
    "Brendan Ciccone is a staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups in healthcare, cybersecurity, and finance.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Brendan Ciccone - 0 → 1 Staff Product Designer",
    description:
      "Brendan Ciccone is a staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups in healthcare, cybersecurity, and finance.",
    url: "https://brendanciccone.com",
    siteName: "Brendan Ciccone",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Brendan Ciccone - 0 → 1 Staff Product Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brendan Ciccone - 0 → 1 Staff Product Designer",
    description:
      "Brendan Ciccone is a staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups in healthcare, cybersecurity, and finance.",
    creator: "@brendanciccone",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Brendan Ciccone - 0 → 1 Staff Product Designer",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${googleSansFlex.variable} ${googleSansFlex.className}`}>
      <head>
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme-v2" disableTransitionOnChange>
          <ErrorBoundary>
            <ScrollToTop />
            <main id="main-content">
              {children}
            </main>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}