import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Header />
      {/* pt-24 accounts for fixed header height */}
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 w-full flex flex-col gap-6 flex-1">
        <div className="flex-1 flex items-center my-16 sm:my-28">
          <div className="w-full">
            {/* Dossier-style section label, same grammar as the case studies */}
            <div className="flex items-center gap-3 w-full anim-rise">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                <span className="text-primary">404</span>
                <span className="text-ink-faint"> / Page not found</span>
              </p>
              <div aria-hidden className="sys-section-line" />
            </div>

            <h1 className="title-display text-[44px] sm:text-6xl md:text-[72px] mt-6 anim-rise [animation-delay:100ms]">
              Nothing here<span className="text-primary inline-block anim-stamp">.</span>
            </h1>

            <p className="text-[15px] leading-[1.55] text-ink-soft mt-4 max-w-[440px] anim-rise [animation-delay:200ms]">
              This page doesn&apos;t exist — the address may have changed, or it never shipped.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center text-[13px] font-semibold uppercase tracking-[0.04em] text-foreground anim-rise [animation-delay:300ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-(--motion-settle) motion-reduce:after:transition-none"
            >
              Back to work
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
