import { Space_Mono, Space_Grotesk } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ErrorBoundary } from "@/components/error-boundary"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://brendanciccone.com"),
  title: "Brendan Ciccone - 0 → 1 Staff Product Designer",
  description:
    "Brendan Ciccone is a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized B2B products across healthcare, cybersecurity, and finance.",
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
      "Brendan Ciccone is a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized B2B products across healthcare, cybersecurity, and finance.",
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
      "Brendan Ciccone is a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized B2B products across healthcare, cybersecurity, and finance.",
    creator: "@brendanciccone",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Brendan Ciccone - 0 → 1 Staff Product Designer"
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
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${spaceGrotesk.className} ${spaceMono.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme-v2" disableTransitionOnChange>
          <ErrorBoundary>
            <ScrollToTop />
            <main id="main-content">
              {children}
            </main>
            <Analytics />
            <SpeedInsights />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}