import Header from "@/components/header"
import Link from "next/link"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      {/* pt-24 accounts for fixed floating header height */}
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 w-full flex flex-col gap-6">
        <div className="flex-1 flex items-center justify-center my-12 sm:my-24">
          <FadeIn delay={0} duration={350}>
            <div className="w-full border border-border rounded-xl p-6 sm:p-8">
              <div className="text-center">
                <FadeIn delay={50} duration={350}>
                  <h1 className="text-xl sm:text-[24px] font-semibold mb-1 sm:mb-2">Page not found</h1>
                </FadeIn>
                <FadeIn delay={75} duration={350}>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                    The page you're looking for could not be found.
                  </p>
                </FadeIn>
                <FadeIn delay={100} duration={350}>
                  <Button asChild size="sm" className="sm:size-default w-full">
                    <Link href="/">Go home</Link>
                  </Button>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </div>

        <Footer />
      </div>
    </div>
  )
}

