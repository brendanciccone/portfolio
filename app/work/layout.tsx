import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work | Brendan Ciccone",
  description: "Portfolio of Brendan Ciccone, a staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups.",
}

/* The reading-progress rail moved to the root layout — it's part of the
   motion system now, not a case-study feature, so it measures every page. */
export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}

