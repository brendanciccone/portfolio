import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
})

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
        url: "/opengraph-image.png", // This will use the image we're now generating
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
    images: ["/opengraph-image.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ScrollToTop />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'