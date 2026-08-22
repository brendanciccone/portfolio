import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen text-foreground flex flex-col">
      <Header />
      {/* Clears the floating nav (16px offset + 64px bar) with room to spare */}
      <div className="max-w-[var(--page-width)] mx-auto px-5 pt-32 sm:pt-36 pb-6 sm:pb-8 w-full flex flex-col gap-6 flex-1">
        <div className="flex-1 flex items-center my-16 sm:my-28">
          <div className="w-full">
            {/* Same label grammar as the case studies */}
            <div className="anim-rise">
              <p className="text-sm font-medium text-muted-foreground">
                <span className="text-foreground font-semibold">404</span>
                <span className="text-ink-faint"> / Page not found</span>
              </p>
            </div>

            <h1 className="title-display text-2xl mt-6 anim-rise [animation-delay:100ms]">
              Nothing here
            </h1>

            <p className="text-base leading-[1.6] text-ink-soft mt-4 max-w-[440px] anim-rise [animation-delay:200ms]">
              This page doesn&apos;t exist — the address may have changed, or it never shipped.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center text-sm text-foreground anim-rise [animation-delay:300ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-foreground after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-(--motion-settle) motion-reduce:after:transition-none"
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
