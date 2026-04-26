import Link from "next/link"

const social = [
  {
    href: "https://www.linkedin.com/in/brendanciccone/",
    label: "LinkedIn",
    short: "LI",
  },
  {
    href: "https://github.com/brendanciccone",
    label: "GitHub",
    short: "GH",
  },
  {
    href: "https://www.producthunt.com/@brendanciccone",
    label: "Product Hunt",
    short: "PH",
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border border-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-stretch">
        <div className="flex items-center gap-3 px-4 py-3 sm:border-r sm:border-foreground/30">
          <span className="sys-label">© {currentYear}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">Brendan Ciccone</span>
        </div>

        <div className="hidden sm:flex items-center px-4 py-3 border-t sm:border-t-0 border-foreground/30">
          <span className="sys-label">All rights reserved</span>
        </div>

        <ul className="flex divide-x divide-foreground/30 border-t sm:border-t-0 sm:border-l border-foreground/30">
          {social.map((item) => (
            <li key={item.href} className="flex-1 sm:flex-none">
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex items-center justify-center h-full min-h-[44px] px-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <span aria-hidden className="sm:hidden">{item.short}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
