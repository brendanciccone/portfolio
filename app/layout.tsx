import { GeistSans } from "geist/font/sans"
import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollToTop from "@/components/scroll-to-top"
import { ErrorBoundary } from "@/components/error-boundary"
import { GridOverlay } from "@/components/grid-overlay"
import { ScrollFlow } from "@/components/scroll-flow"
import { ViewTransitionSettler } from "@/components/view-transition-link"
import JsonLd from "@/components/json-ld"

// One face for the whole site: Geist carries display, body, UI, and the small
// meta labels, tags and dates alike. It ships as a variable font, so the whole
// 100–900 range arrives in a single file and the three weights the system uses
// (400, 500, 600) are all real rather than synthesised. Self-hosted from the
// package, so there is no third-party font request on any page.
//
// The root takes the variable plus the semantic font-sans utility rather than
// GeistSans.className. Both resolve to the same stack — GeistSans followed by
// the metric-adjusted "GeistSans Fallback" — but going through the utility
// makes --font-sans load-bearing instead of a token nothing reads.

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
  /* app/icon.svg serves the dark-mode-aware SVG mark; the PNG/ICO set below
     is generated from it via scripts/generate-favicons.mjs */
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
    // data-entrance ships on in the served HTML so a cold load plays its
    // choreography with no script involved and no flash of final state;
    // TransitionLink clears it for navigations that morph instead.
    <html lang="en" suppressHydrationWarning data-entrance="" className={`${GeistSans.variable} font-sans`}>
      <head>
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme-v3" disableTransitionOnChange>
          <ErrorBoundary>
            <ScrollToTop />
            <ViewTransitionSettler />
            {/* Motion system, mounted once for every route. The reading
                progress rail is NOT here: it lives in app/work/layout.tsx,
                because a progress rail is a promise that there is a length
                worth tracking, and only a case study has one. On the home,
                about and contact pages it measured a screen or two of scroll
                and read as a loading bar for a page that had already loaded.

                It was global until now only because it never painted — the
                scale-x-0 bug meant nobody saw it anywhere, so the wrong scope
                went unnoticed. Fixing the paint is what surfaced it.

                GridOverlay is the G easter egg — the site's one grid reveal,
                and deliberately the only one; an ambient background lattice did
                the same job permanently and spent this one's payoff before
                anybody found it. */}
            <ScrollFlow />
            <GridOverlay />
            <main id="main-content">
              {children}
            </main>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}