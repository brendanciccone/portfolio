"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

function isActive(pathname: string, href: string) {
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
        className={`fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-40 pointer-events-none transition-opacity duration-150 ease-in-out ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[padding] duration-150 ease-in-out",
          isScrolled ? "py-3" : "py-4",
        )}
      >
        <div className="max-w-[1024px] mx-auto px-5">
          <div
            className={cn(
              "transition-all duration-150 ease-in-out",
              mobileMenuOpen && "bg-background/90 backdrop-blur-xl rounded-sm border border-border",
            )}
          >
            <div
              className={cn(
                "flex h-14 items-center justify-between transition-all duration-150 ease-in-out",
                mobileMenuOpen
                  ? "px-4 sm:px-7"
                  : isScrolled
                    ? "px-4 sm:px-7 bg-background/85 backdrop-blur-xl rounded-sm border border-border"
                    : "bg-transparent",
              )}
            >
              <Link href="/" aria-label="Brendan Ciccone — home" className="flex items-center gap-2">
                <Image
                  src="/avatar-dithered.png"
                  alt="Profile picture of Brendan Ciccone"
                  width={32}
                  height={32}
                  className="rounded-none object-cover border border-border"
                  priority
                  quality={80}
                  sizes="32px"
                />
                <span className="font-heading font-medium">Brendan Ciccone</span>
              </Link>

              {/* Desktop nav — button group */}
              <nav className="hidden md:flex items-center" aria-label="Main Navigation">
                <div className="flex border border-border rounded-none overflow-hidden divide-x divide-border">
                  {navItems.map((item) => {
                    const active = isActive(pathname, item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm font-medium h-9 px-5 flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                          active
                            ? "bg-foreground text-background font-medium"
                            : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </nav>

              {/* Mobile hamburger */}
              <div className="flex md:hidden items-center gap-2">
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                  className="h-9 w-9"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile menu */}
            <div
              className={cn(
                "md:hidden overflow-hidden transition-all duration-150 ease-out",
                mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
              )}
              id="mobile-menu"
              aria-hidden={!mobileMenuOpen}
              role="navigation"
              aria-label="Mobile Navigation"
            >
              <div className="px-4 py-4 flex flex-col items-center space-y-1">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium w-full text-center py-2.5 px-4 rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                        active
                          ? "bg-foreground text-background font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                      aria-current={active ? "page" : undefined}
                      tabIndex={mobileMenuOpen ? 0 : -1}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
