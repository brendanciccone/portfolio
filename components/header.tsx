"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Header() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        mobileMenuOpen
          ? "bg-background"
          : "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      }`}
    >
      <div className="max-w-[1024px] mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Profile.jpg-al2nGt8LMiAxExrg2Jeb9tDq6VnRHb.jpeg"
            alt="Brendan Ciccone"
            width={40}
            height={40}
            className="rounded-full object-cover"
            priority
          />
          <span className="font-medium">Brendan Ciccone</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex space-x-2">
            <Link
              href="/"
              className={`text-sm h-10 px-4 flex items-center justify-center rounded-md transition-colors duration-200 ${
                pathname === "/"
                  ? "font-medium bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              }`}
              prefetch={true}
            >
              Work
            </Link>
            <Link
              href="/about"
              className={`text-sm h-10 px-4 flex items-center justify-center rounded-md transition-colors duration-200 ${
                pathname === "/about"
                  ? "font-medium bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              }`}
              prefetch={true}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm h-10 px-4 flex items-center justify-center rounded-md transition-colors duration-200 ${
                pathname === "/contact"
                  ? "font-medium bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              }`}
              prefetch={true}
            >
              Contact
            </Link>
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {mounted && <ThemeSwitcher />}
          <Button asChild>
            <Link href="/contact" prefetch={true}>
              Let's chat
              <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          {mounted && <ThemeSwitcher />}
          <Button
            variant="default"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-background absolute left-0 right-0 shadow-md border-b border-border transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-[1024px] mx-auto px-4 py-5 flex flex-col items-center space-y-5">
          <div>
            <Link
              href="/"
              className={`text-sm inline-flex py-2 px-3 rounded-md transition-colors duration-200 ${
                pathname === "/"
                  ? "font-medium bg-secondary text-foreground"
                  : "hover:bg-secondary/40 hover:text-foreground"
              }`}
              prefetch={true}
            >
              Work
            </Link>
          </div>
          <div>
            <Link
              href="/about"
              className={`text-sm inline-flex py-2 px-3 rounded-md transition-colors duration-200 ${
                pathname === "/about"
                  ? "font-medium bg-secondary text-foreground"
                  : "hover:bg-secondary/40 hover:text-foreground"
              }`}
              prefetch={true}
            >
              About
            </Link>
          </div>
          <div>
            <Link
              href="/contact"
              className={`text-sm inline-flex py-2 px-3 rounded-md transition-colors duration-200 ${
                pathname === "/contact"
                  ? "font-medium bg-secondary text-foreground"
                  : "hover:bg-secondary/40 hover:text-foreground"
              }`}
              prefetch={true}
            >
              Contact
            </Link>
          </div>
          <Button asChild className="max-w-[200px]">
            <Link href="/contact" prefetch={true}>
              Let's chat
              <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

