import type React from "react"
import type { Metadata } from "next"
import { ReadingProgress } from "@/components/reading-progress"

export const metadata: Metadata = {
  title: "Work | Brendan Ciccone",
  description: "Portfolio of Brendan Ciccone, a staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups.",
}

/* The reading-progress rail is scoped to case studies, and this layout is the
   scope. /work has no index route — only the four case-study segments — so
   mounting here is exactly "every case study and nothing else", with no
   pathname matching to keep in sync as routes are added.

   It briefly lived in the root layout on the argument that it belongs to the
   motion system rather than to case studies. That was wrong in a way the
   scale-x-0 bug hid: the rail never painted on any page, so "it measures every
   page" was never actually seen. A rail promises a length worth tracking, and
   the home, about and contact pages do not have one.

   The component still keys its effect on pathname, which matters here: this
   layout persists across case-study navigations, so the rail stays mounted
   while the document under it changes height. */
export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ReadingProgress />
      {children}
    </>
  )
}

