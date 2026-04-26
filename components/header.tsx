"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/", label: "Work", num: "01" },
  { href: "/about", label: "About", num: "02" },
  { href: "/contact", label: "Contact", num: "03" },
]

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/" || pathname.startsWith("/work")
  return pathname === href || pathname.startsWith(href + "/")
}

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-30 pointer-events-none transition-opacity duration-150 ease-in-out ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 right-0 z-40 py-4">
        <div className="max-w-[1024px] mx-auto px-5">
          <div
            className={`transition-colors duration-150 ease-in-out border ${
              isScrolled || mobileMenuOpen
                ? "bg-background/95 backdrop-blur-md border-foreground"
                : "bg-background border-foreground"
            }`}
          >
            <div className="flex h-12 items-stretch justify-between">
              {/* Wordmark cell */}
              <Link
                href="/"
                className="flex items-center gap-3 pl-3 pr-4 border-r border-foreground"
              >
                <Image
                  src="/avatar-dithered.png"
                  alt="Profile picture of Brendan Ciccone"
                  width={28}
                  height={28}
                  className="object-cover border border-foreground"
                  priority
                  quality={80}
                  sizes="28px"
                />
                <span className="font-display text-sm uppercase tracking-tight leading-none">Brendan Ciccone</span>
              </Link>

              {/* Desktop nav — divided cells */}
              <nav className="hidden md:flex items-stretch ml-auto" aria-label="Main Navigation">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      prefetch
                      aria-current={active ? "page" : undefined}
                      className={`relative h-full px-5 inline-flex items-center gap-2 text-[11px] font-mono font-medium uppercase tracking-[0.16em] border-l border-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        active
                          ? "bg-foreground text-background"
                          : "bg-transparent text-foreground hover:bg-foreground hover:text-background"
                      }`}
                    >
                      <span className={`text-[10px] ${active ? "text-background/70" : "text-muted-foreground"}`}>
                        {item.num}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
                <ThemeToggle />
              </nav>

              {/* Mobile hamburger */}
              <div className="flex md:hidden ml-auto items-stretch">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setMobileMenuOpen(!mobileMenuOpen)
                    }
                    if (e.key === "Escape" && mobileMenuOpen) {
                      setMobileMenuOpen(false)
                    }
                  }}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                  tabIndex={0}
                  className="h-12 w-12 inline-flex items-center justify-center border-l border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <div
              className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-150 ease-out ${
                mobileMenuOpen ? "max-h-96 opacity-100 border-t border-foreground" : "max-h-0 opacity-0"
              }`}
              id="mobile-menu"
              aria-hidden={!mobileMenuOpen}
              role="navigation"
              aria-label="Mobile Navigation"
            >
              <ul className="flex flex-col">
                {navItems.map((item, idx) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <li
                      key={item.href}
                      className={idx > 0 ? "border-t border-foreground/30" : ""}
                    >
                      <Link
                        href={item.href}
                        prefetch
                        aria-current={active ? "page" : undefined}
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        className={`flex items-center gap-3 px-4 py-3 text-[11px] font-mono font-medium uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          active
                            ? "bg-foreground text-background"
                            : "text-foreground hover:bg-foreground hover:text-background"
                        }`}
                      >
                        <span className={`text-[10px] ${active ? "text-background/70" : "text-muted-foreground"}`}>
                          {item.num}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
