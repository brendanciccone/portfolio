import Header from "@/components/header"
import Link from "next/link"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 w-full flex flex-col gap-8 flex-1">
        <FadeIn delay={0} duration={350}>
          <div className="sys-section">
            <span className="sys-section-num">[ER]</span>
            <span className="sys-section-title">Error / 404</span>
            <div className="sys-section-rule" />
            <span className="sys-section-meta">Not Found</span>
          </div>
        </FadeIn>

        <FadeIn delay={50} duration={350}>
          <section className="sys-cell">
            <header className="sys-cell-header">
              <span className="sys-cell-id">404</span>
              <span>Resource missing</span>
            </header>
            <div className="p-8 sm:p-12 text-center">
              <p className="sys-display text-5xl sm:text-7xl mb-5">404</p>
              <p className="font-mono text-[13px] text-muted-foreground mb-7 max-w-[40ch] mx-auto">
                The page you&apos;re looking for could not be found.
              </p>
              <Button asChild size="default">
                <Link href="/">Go home</Link>
              </Button>
            </div>
          </section>
        </FadeIn>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  )
}
