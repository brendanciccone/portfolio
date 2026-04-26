import { Archivo_Black, JetBrains_Mono } from "next/font/google"
import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import { ErrorBoundary } from "@/components/error-boundary"
import JsonLd from "@/components/json-ld"
import { PageFrame } from "@/components/page-frame"

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
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
  title: "Brendan Ciccone — 0 → 1 Staff Product Designer",
  description:
    "Brendan Ciccone is a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized B2B products across healthcare, cybersecurity, and fintech.",
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
    title: "Brendan Ciccone — 0 → 1 Staff Product Designer",
    description:
      "Brendan Ciccone is a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized B2B products across healthcare, cybersecurity, and fintech.",
    url: "https://brendanciccone.com",
    siteName: "Brendan Ciccone",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Brendan Ciccone — 0 → 1 Staff Product Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brendan Ciccone — 0 → 1 Staff Product Designer",
    description:
      "Brendan Ciccone is a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized B2B products across healthcare, cybersecurity, and fintech.",
    creator: "@brendanciccone",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Brendan Ciccone — 0 → 1 Staff Product Designer",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivoBlack.variable} ${jetbrainsMono.variable} ${jetbrainsMono.className}`}
    >
      <head>
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme-v2" disableTransitionOnChange>
          <ErrorBoundary>
            <PageFrame />
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
