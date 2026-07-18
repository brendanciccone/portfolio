"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, type KeyboardEvent } from "react"
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

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleMenuToggle = () => {
    setMobileMenuOpen((isOpen) => !isOpen)
  }

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1024px] mx-auto px-5">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" aria-label="Brendan Ciccone — home" className="flex items-center gap-2.5">
            <Image
              src="/avatar-dithered.png"
              alt="Profile picture of Brendan Ciccone"
              width={34}
              height={34}
              className="rounded-none object-cover border border-border"
              priority
              quality={80}
              sizes="34px"
            />
            <span className="font-heading font-extrabold uppercase tracking-[-0.01em] text-sm sm:text-base">
              Brendan Ciccone
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:block" aria-label="Main Navigation">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-[13px] font-semibold uppercase tracking-[0.04em] h-8 px-4 flex items-center justify-center transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      active
                        ? "bg-primary-fill text-primary-fill-foreground"
                        : "text-ink-faint hover:text-foreground relative after:absolute after:left-4 after:right-4 after:bottom-0.5 after:h-[2px] after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 motion-reduce:after:transition-none",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Mobile hamburger — three hairline bars per the Swiss spec */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={handleMenuToggle}
              onKeyDown={handleMenuKeyDown}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="h-9 w-9 flex flex-col items-center justify-center gap-[5px] border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span
                className={cn(
                  "block w-5 h-[2px] bg-foreground transition-transform duration-150 motion-reduce:transition-none",
                  mobileMenuOpen && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block w-5 h-[2px] bg-foreground transition-opacity duration-150 motion-reduce:transition-none",
                  mobileMenuOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block w-5 h-[2px] bg-foreground transition-transform duration-150 motion-reduce:transition-none",
                  mobileMenuOpen && "-translate-y-[7px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-150 ease-out motion-reduce:transition-none",
            mobileMenuOpen ? "max-h-60 opacity-100 border-t border-border" : "max-h-0 opacity-0",
          )}
          id="mobile-menu"
          aria-hidden={!mobileMenuOpen}
          role="navigation"
          aria-label="Mobile Navigation"
        >
          <div className="py-3 flex flex-col">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] font-semibold uppercase tracking-[0.04em] w-full text-center py-3 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    active
                      ? "bg-primary-fill text-primary-fill-foreground"
                      : "text-ink-faint hover:text-foreground",
                  )}
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
    </header>
  )
}
