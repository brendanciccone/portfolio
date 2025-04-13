import Header from "@/components/header"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-[1024px] mx-auto px-4 py-6 sm:py-8">
        <FadeIn delay={0} duration={350}>
          <p className="text-base sm:text-lg mb-8 sm:mb-12 text-muted-foreground font-medium">
            <span className="text-foreground">0 → 1 Senior Product Designer</span> with 7 years of experience turning
            ideas into fully realized B2B and B2C products across healthcare, cybersecurity, and finance.
          </p>
        </FadeIn>

        <div className="space-y-6 sm:space-y-8">
          {/* Project 1 */}
          <FadeIn delay={50} duration={350}>
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="bg-muted border-b border-border">
                <Link href="/work/spontivly">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-WhNtJkfUVhAkOhZSBPAbhHNURWpkYU.png"
                    alt="Spontivly social analytics dashboard showing engagement metrics, impression trends, and top performing content"
                    width={1200}
                    height={800}
                    className="w-full"
                    priority
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                  />
                </Link>
              </div>
              <div className="p-4 sm:p-6">
                {/* Group title and description closer together */}
                <div className="mb-3">
                  <h2 className="text-lg sm:text-xl font-semibold mb-1">Spontivly</h2>
                  <p className="text-muted-foreground">Data dashboards for non-technical users</p>
                </div>

                {/* Badges in the middle with proper spacing */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">2023</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">Seed</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">Data</span>
                </div>

                {/* Button with proper spacing */}
                <Button asChild size="lg" className="px-4">
                  <Link href="/work/spontivly">
                    View work <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Project 2 */}
          <FadeIn delay={75} duration={350}>
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="bg-muted border-b border-border">
                <Link href="/work/immertec">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-REigS5TLwDhOSRkjUpSoZzM0XHLPy1.png"
                    alt="Immertec VR medical training platform showing a live surgical procedure with multiple participating doctors, medical imaging views, and interactive controls for remote learning"
                    width={1200}
                    height={800}
                    className="w-full"
                    priority
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                  />
                </Link>
              </div>
              <div className="p-4 sm:p-6">
                {/* Group title and description closer together */}
                <div className="mb-3">
                  <h2 className="text-lg sm:text-xl font-semibold mb-1">Immertec</h2>
                  <p className="text-muted-foreground">VR medical training for live surgical procedures</p>
                </div>

                {/* Badges in the middle with proper spacing */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">2018 - 2023</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">Series A</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">Medtech</span>
                </div>

                {/* Button with proper spacing */}
                <Button asChild size="lg" className="px-4">
                  <Link href="/work/immertec">
                    View work <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Project 3 */}
          <FadeIn delay={100} duration={350}>
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="bg-muted border-b border-border">
                <Link href="/work/paidly">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-T3wsvxOlM1iRLfYYJAzhzlAlH5YblJ.png"
                    alt="Paidly mobile app showing invoice list, automatic reminders feature, and customer creation form"
                    width={1200}
                    height={800}
                    className="w-full"
                    priority
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                  />
                </Link>
              </div>
              <div className="p-4 sm:p-6">
                {/* Group title and description closer together */}
                <div className="mb-3">
                  <h2 className="text-lg sm:text-xl font-semibold mb-1">Paidly</h2>
                  <p className="text-muted-foreground">Stripe-integrated invoicing mobile app for SMEs</p>
                </div>

                {/* Badges in the middle with proper spacing */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">2020</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">Fintech</span>
                </div>

                {/* Button with proper spacing */}
                <Button asChild size="lg" className="px-4">
                  <Link href="/work/paidly">
                    View work <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Project 4 */}
          <FadeIn delay={125} duration={350}>
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="bg-muted border-b border-border">
                <Link href="#">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-WtDzPw61Kv4Intp9oftbRM5XbqtNAi.png"
                    alt="Magier AI chatbot mobile app screens showing settings, chat interface, and subscription options"
                    width={1200}
                    height={800}
                    className="w-full"
                    priority
                    quality={85}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                  />
                </Link>
              </div>
              <div className="p-4 sm:p-6">
                {/* Group title and description closer together */}
                <div className="mb-3">
                  <h2 className="text-lg sm:text-xl font-semibold mb-1">Magier</h2>
                  <p className="text-muted-foreground">Privacy-focused AI chatbot mobile app</p>
                </div>

                {/* Badges in the middle with proper spacing */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">2023</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">Acquired</span>
                  <span className="text-xs bg-secondary px-3 py-1 rounded-full">AI</span>
                </div>

                {/* Button with proper spacing */}
                <Button variant="secondary" disabled size="lg" className="px-4">
                  Coming soon
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>

        <Footer />
      </div>
    </div>
  )
}

