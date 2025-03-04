import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work | Brendan Ciccone",
  description: "Portfolio of Brendan Ciccone, a 0 → 1 Senior Product Designer with 7 years of experience.",
}

export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}

