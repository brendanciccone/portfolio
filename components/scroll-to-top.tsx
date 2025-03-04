"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  // This effect will run whenever the pathname changes
  useEffect(() => {
    // Scroll to top on page navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" instead of "smooth" to avoid visual issues during navigation
    })
  }, [pathname]) // Dependency on pathname ensures this runs on every route change

  return null
}

