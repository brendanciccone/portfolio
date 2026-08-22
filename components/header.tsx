"use client"

import Image from "next/image"
import { TransitionLink } from "@/components/view-transition-link"
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

/*
 * Nav items are pills, not underlined labels: 40px tall, fully round, and the
 * current page is marked by an accent-filled pill rather than a coloured rule.
 * A monochrome palette has no second colour to spend on state, so state is a
 * surface. The press nudge stays — it is the one bit of physical feedback the
 * pill can carry without borrowing a colour.
 *
 * Fully round rather than 6px: the shell around them is a stadium and the mail
 * button beside them is a circle, so a slightly-rounded rectangle in between
 * was the only corner in the bar that disagreed with the rest.
 */
const navItemClasses =
  "h-10 px-4 inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-(--motion-touch) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background active:translate-y-px motion-reduce:active:translate-none"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setMobileMenuOpen((isOpen) => !isOpen)
  }

  // Attached to both the toggle button and the open menu so Escape works
  // wherever focus currently sits
  const handleMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") setMobileMenuOpen(false)
  }

  /*
   * The menu is hidden at md+ by CSS, but hiding it does not unset it. Open the
   * menu on a phone, rotate to landscape or widen the window, and the panel
   * vanishes while the state stays true — leaving the shell stuck at the menu's
   * 24px corner instead of returning to the 32px pill, with no control on
   * screen able to close it. Matching the breakpoint here keeps the state and
   * the layout telling the same story.
   */
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)")
    const close = () => {
      if (wide.matches) setMobileMenuOpen(false)
    }
    close()

    wide.addEventListener("change", close)
    return () => wide.removeEventListener("change", close)
  }, [])

  return (
    /*
     * The nav floats rather than spanning the viewport, and it stops exactly
     * where the content does: both read --page-width, which pages override on
     * their own wrapper. Header renders inside that wrapper, so the variable
     * simply inherits — no prop to thread through eight pages, and the two
     * can't drift apart. Content passes behind the shell through the blur.
     *
     * It floats at every scroll position and every breakpoint. It briefly sat
     * flat on the page until you scrolled, which sounded better than it looked:
     * with no container the pills read as loose elements rather than a nav, the
     * row jumped 16px sideways the moment the surface arrived, and mobile had
     * to opt out of the whole thing — leaving the bar meaning two different
     * things at two different widths for no gain.
     *
     * The shell is a pill while it is a single row. It cannot stay one once the
     * mobile menu drops out of it — a 9999px radius on a 240px-tall box gives
     * you a lozenge, not a rounded rectangle — so the open state steps down to
     * a large fixed corner instead.
     *
     * overflow-hidden is what lets that menu grow inside the rounded shell —
     * without it the expanding panel squares off the bottom corners.
     */
    /* z-50 sits above the page and the case-study rail, and below the
       lightbox. It was z-70 while contact was an overlay that deliberately kept
       the nav live above it; with that gone, a floating bar drawn on top of a
       fullscreen image viewer is just a bar in the way of the photo. */
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50">
      <div className="max-w-[var(--page-width)] mx-auto px-5">
        <div
          className={cn(
            "mx-auto w-full overflow-hidden border border-border/70 backdrop-blur-xl",
            "bg-background supports-[backdrop-filter:blur(0px)]:bg-background/70 shadow-[var(--shadow-float)]",
            /* 32px, not rounded-full, and the same 32px open or closed. Closed,
               it is exactly half the 64px row, so the bar is a true stadium;
               open, it is the same corner on a taller box, which is what keeps
               the panel reading as this bar expanded rather than as a second
               object that replaced it.
               (It used to drop to 24px on open, which is what made the corners
               change character mid-animation. rounded-full is still wrong here
               for a different reason: it computes to ~3.4e7px, and any future
               radius transition would spend its whole duration in the millions
               — all rendering identically — before snapping at the very end.) */
            "rounded-[32px]",
          )}
        >
          <div
            className="flex h-16 items-center justify-between gap-3 px-3"
            /* 12px, not 16. Two rounded shapes nest concentrically when the gap
               equals the difference in their radii: the shell is a 32px pill
               and everything in it — the 40px avatar, the 40px pills — has a
               20px radius, so 32 - 20 = 12. At 16 they sat proud of the cap
               with the gap visibly wider at the middle than at the corners. */
          >
            {/* Identity anchors the left; every control the bar offers — the
                two nav pills and Contact — is grouped on the right, so the
                shell reads as "who this is" then "what you can do" instead of
                scattering three clusters across it. */}
            <div className="flex items-center">
              <TransitionLink
                href="/"
                className="inline-flex items-center gap-2.5 rounded-full pr-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src="/avatar-dithered.png"
                  alt="Profile picture of Brendan Ciccone"
                  width={40}
                  height={40}
                  className="rounded-full object-cover shrink-0"
                  priority
                  quality={80}
                  sizes="40px"
                />
                {/* Shows at every width now that Contact has moved into the
                    menu and stopped competing for the mobile bar. No aria-label
                    on the link: it would override this visible name. */}
                <span className="text-base font-semibold whitespace-nowrap">
                  Brendan Ciccone
                </span>
              </TransitionLink>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
            {/* Desktop nav */}
            <nav className="hidden md:block" aria-label="Main Navigation">
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <TransitionLink
                      key={item.href}
                      href={item.href}
                      className={cn(
                        navItemClasses,
                        active
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/60",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </TransitionLink>
                  )
                })}
              </div>
            </nav>

            <div className="flex items-center gap-2">
              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={handleMenuToggle}
                onKeyDown={handleMenuKeyDown}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                className="md:hidden size-10 flex flex-col items-center justify-center gap-[5px] rounded-full border border-input transition-colors duration-(--motion-touch) hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
              >
                <span
                  className={cn(
                    "block w-4 h-[1.5px] bg-foreground transition-transform duration-(--motion-settle) ease-(--ease-settle) motion-reduce:transition-none",
                    mobileMenuOpen && "translate-y-[6.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block w-4 h-[1.5px] bg-foreground transition-opacity duration-(--motion-settle) ease-(--ease-settle) motion-reduce:transition-none",
                    mobileMenuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block w-4 h-[1.5px] bg-foreground transition-transform duration-(--motion-settle) ease-(--ease-settle) motion-reduce:transition-none",
                    mobileMenuOpen && "-translate-y-[6.5px] -rotate-45",
                  )}
                />
              </button>
            </div>
            </div>
          </div>

          {/*
            Mobile menu.

            The open/close runs on grid-template-rows rather than max-height.
            max-height has to be guessed at a value larger than the content —
            it was max-h-60, or 240px, against a panel that is closer to 150 —
            so the visible motion finished about two thirds of the way through
            the transition and the rest was dead time. That is what makes the
            max-height pattern feel like it stutters and then stops: the easing
            curve is being applied to a distance the content never travels.
            0fr → 1fr interpolates to the panel's real height, so the curve
            describes the motion you actually see.

            It also moved off --motion-touch (150ms, the token for colour and
            opacity) onto --motion-settle (250ms) with the settle curve, which
            is what everything else that physically moves on this site uses.
          */}
          <div
            className={cn(
              "md:hidden grid transition-[grid-template-rows,opacity] duration-(--motion-settle) ease-(--ease-settle) motion-reduce:transition-none",
              mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
            id="mobile-menu"
            aria-hidden={!mobileMenuOpen}
            role="navigation"
            aria-label="Mobile Navigation"
            onKeyDown={handleMenuKeyDown}
          >
            {/* The clipping wrapper the grid-rows technique needs; the border
                lives on the content so it isn't a stray line at zero height */}
            <div className="overflow-hidden">
              <div className="border-t border-border p-3 flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <TransitionLink
                      key={item.href}
                      href={item.href}
                      className={cn(
                        navItemClasses,
                        "w-full justify-start",
                        active ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent/60",
                      )}
                      aria-current={active ? "page" : undefined}
                      tabIndex={mobileMenuOpen ? 0 : -1}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </TransitionLink>
                  )
                })}

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
