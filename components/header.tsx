"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, X } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll detection for floating nav effect
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    // Activate floating style after scrolling 20px
    setIsScrolled(scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    // Check initial scroll position
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Top fade gradient - behind nav to fade content scrolling under */}
      <div
        className={`fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-40 pointer-events-none transition-opacity duration-150 ease-in-out ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-150 ease-in-out ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        {/* Floating container */}
        <div className="max-w-[1024px] mx-auto px-4">
          {/* Single unified container for mobile menu */}
          <div
            className={`transition-all duration-150 ease-in-out ${
              mobileMenuOpen
                ? "bg-background/90 backdrop-blur-xl rounded-[28px] border border-border/50 shadow-lg shadow-black/5"
                : ""
            }`}
          >
            {/* Top bar */}
            <div
              className={`flex h-14 items-center justify-between transition-all duration-150 ease-in-out ${
                mobileMenuOpen
                  ? "px-2"
                  : isScrolled
                    ? "px-2 bg-background/90 backdrop-blur-xl rounded-full border border-border/50 shadow-lg shadow-black/5"
                    : "bg-transparent"
              }`}
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Profile.jpg-al2nGt8LMiAxExrg2Jeb9tDq6VnRHb.jpeg"
                  alt="Profile picture of Brendan Ciccone"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  priority
                  quality={80}
                  sizes="40px"
                />
                <span className="font-medium">Brendan Ciccone</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center">
                <div className="flex space-x-2">
                  <Link
                    href="/"
                    className={`text-sm h-10 px-4 flex items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      pathname === "/"
                        ? "font-medium bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                    aria-current={pathname === "/" ? "page" : undefined}
                    prefetch={true}
                  >
                    Work
                  </Link>
                  <Link
                    href="/about"
                    className={`text-sm h-10 px-4 flex items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      pathname === "/about"
                        ? "font-medium bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                    aria-current={pathname === "/about" ? "page" : undefined}
                    prefetch={true}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className={`text-sm h-10 px-4 flex items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      pathname === "/contact"
                        ? "font-medium bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                    aria-current={pathname === "/contact" ? "page" : undefined}
                    prefetch={true}
                  >
                    Contact
                  </Link>
                </div>
              </nav>


              <div className="hidden md:flex items-center">
                <Button asChild variant="outline" className="rounded-full shadow-none">
                  <Link href="/contact" prefetch={true}>
                    Let's chat
                    <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
                  </Link>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center">
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setMobileMenuOpen(!mobileMenuOpen)
                    }
                    if (e.key === 'Escape' && mobileMenuOpen) {
                      setMobileMenuOpen(false)
                    }
                  }}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-9 w-9"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Menu - inside the unified container */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-150 ease-out ${
                mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
              }`}
              id="mobile-menu"
              aria-hidden={!mobileMenuOpen}
              role="navigation"
              aria-label="Mobile Navigation"
            >
              <div className="px-4 py-5 flex flex-col items-center space-y-4">
                <Link
                  href="/"
                  className={`text-sm inline-flex py-2 px-4 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    pathname === "/"
                      ? "font-medium bg-secondary text-foreground"
                      : "hover:bg-secondary/40 hover:text-foreground"
                  }`}
                  aria-current={pathname === "/" ? "page" : undefined}
                  prefetch={true}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  Work
                </Link>
                <Link
                  href="/about"
                  className={`text-sm inline-flex py-2 px-4 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    pathname === "/about"
                      ? "font-medium bg-secondary text-foreground"
                      : "hover:bg-secondary/40 hover:text-foreground"
                  }`}
                  aria-current={pathname === "/about" ? "page" : undefined}
                  prefetch={true}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`text-sm inline-flex py-2 px-4 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    pathname === "/contact"
                      ? "font-medium bg-secondary text-foreground"
                      : "hover:bg-secondary/40 hover:text-foreground"
                  }`}
                  aria-current={pathname === "/contact" ? "page" : undefined}
                  prefetch={true}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                >
                  Contact
                </Link>
                <Button asChild variant="outline" className="rounded-full shadow-none">
                  <Link 
                    href="/contact" 
                    prefetch={true}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                  >
                    Let's chat
                    <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

