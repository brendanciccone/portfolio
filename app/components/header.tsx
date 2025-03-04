"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Brendan Ciccone"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="ml-2 font-medium">Brendan Ciccone</span>
        </div>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className={`text-sm ${pathname === "/" ? "font-medium" : ""}`}>
                Work
              </Link>
            </li>
            <li>
              <Link href="/about" className={`text-sm ${pathname === "/about" ? "font-medium" : ""}`}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`text-sm ${pathname === "/contact" ? "font-medium" : ""}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          )}
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground hover:bg-primary/90 ml-4 px-4 py-2 text-sm"
          >
            Let's chat
          </Link>
        </div>
      </div>
    </header>
  )
}

