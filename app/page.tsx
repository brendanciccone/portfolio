import Header from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"
import { Lock } from "lucide-react"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* pt-24 accounts for fixed floating header height */}
      <div className="max-w-[1024px] mx-auto px-4 pt-24 pb-6 sm:pb-8 flex flex-col gap-6">
        {/* Grid: 1 column on mobile, 2 columns on md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Project 1 - Spontivly */}
          <FadeIn delay={50} duration={350}>
            <Link href="/work/spontivly" className="group block bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5">
              <div className="bg-muted border-b border-border">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-WhNtJkfUVhAkOhZSBPAbhHNURWpkYU.png"
                  alt="Spontivly social analytics dashboard showing engagement metrics, impression trends, and top performing content"
                  width={1200}
                  height={800}
                  className="w-full"
                  priority
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
              <div className="p-4 sm:p-6">
                {/* Group title and description closer together */}
                <div className="mb-3">
                  <h2 className="text-lg sm:text-xl font-semibold mb-1">Spontivly</h2>
                  <p className="text-muted-foreground">Analytics dashboards for non-technical users</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Badge>2023</Badge>
                  <Badge>Seed</Badge>
                  <Badge>Analytics</Badge>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Project 2 - Immertec */}
          <FadeIn delay={75} duration={350}>
            <Link href="/work/immertec" className="group block bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5">
              <div className="bg-muted border-b border-border">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-REigS5TLwDhOSRkjUpSoZzM0XHLPy1.png"
                  alt="Immertec VR medical training platform showing a live surgical procedure with multiple participating doctors, medical imaging views, and interactive controls for remote learning"
                  width={1200}
                  height={800}
                  className="w-full"
                  priority
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
              <div className="p-4 sm:p-6">
                {/* Group title and description closer together */}
                <div className="mb-3">
                  <h2 className="text-lg sm:text-xl font-semibold mb-1">Immertec</h2>
                  <p className="text-muted-foreground">VR medical training for live surgical procedures</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Badge>2018 - 2023</Badge>
                  <Badge>Series A</Badge>
                  <Badge>Medtech</Badge>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Project 3 - Paidly */}
          <FadeIn delay={100} duration={350}>
            <Link href="/work/paidly" className="group block bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5">
              <div className="bg-muted border-b border-border">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-T3wsvxOlM1iRLfYYJAzhzlAlH5YblJ.png"
                  alt="Paidly mobile app showing invoice list, automatic reminders feature, and customer creation form"
                  width={1200}
                  height={800}
                  className="w-full"
                  priority
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
              <div className="p-4 sm:p-6">
                {/* Group title and description closer together */}
                <div className="mb-3">
                  <h2 className="text-lg sm:text-xl font-semibold mb-1">Paidly</h2>
                  <p className="text-muted-foreground">Stripe-integrated invoicing mobile app for SMEs</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Badge>2020</Badge>
                  <Badge>Fintech</Badge>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Project 4 - Magier (Coming soon, not clickable) */}
          <FadeIn delay={125} duration={350}>
            <div className="relative bg-card border border-border rounded-xl overflow-hidden cursor-not-allowed">
              {/* Coming soon indicator - outside the faded content */}
              <div className="absolute top-3 right-3 z-10 bg-background border border-border rounded-full p-2" aria-label="Coming soon">
                <Lock className="w-4 h-4 text-foreground" />
              </div>
              {/* Faded content */}
              <div className="opacity-50">
                <div className="bg-muted border-b border-border">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-WtDzPw61Kv4Intp9oftbRM5XbqtNAi.png"
                    alt="Magier AI chatbot mobile app screens showing settings, chat interface, and subscription options"
                    width={1200}
                    height={800}
                    className="w-full"
                    priority
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  {/* Group title and description closer together */}
                  <div className="mb-3">
                    <h2 className="text-lg sm:text-xl font-semibold mb-1">Magier</h2>
                    <p className="text-muted-foreground">Privacy-focused AI chatbot mobile app</p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Badge>2023</Badge>
                    <Badge>Acquired</Badge>
                    <Badge>AI</Badge>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <Footer />
      </div>
    </div>
  )
}

