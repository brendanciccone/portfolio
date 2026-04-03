import Header from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"
import { LightboxImage } from "@/components/lightbox"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Main content */}
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6">
        {/* Intro Section */}
        <FadeIn delay={0} duration={350}>
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight mb-3">Brendan Ciccone</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              0 → 1 Staff Product Designer and Founder with 8 years of experience shipping B2B products across healthcare, cybersecurity, and finance. Currently at <Link href="https://www.corellium.com" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:underline">Corellium</Link>, simplifying complex cybersecurity workflows.
            </p>
          </div>
        </FadeIn>

        {/* Selected Work label */}
        <FadeIn delay={25} duration={350}>
            <div className="sys-section-header">
              <p className="sys-section-label whitespace-nowrap">Selected Work</p>
              <div className="sys-section-line" />
            </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Project 1 - Corellium */}
          <Link href="/work/corellium" className="group block sys-panel transition-colors duration-200 hover:border-foreground">
            <div className="bg-muted overflow-hidden border-b border-border p-1">
              <div className="relative w-full overflow-hidden rounded-sm">
                <Image
                  src="/work/corellium/1.png"
                  alt="Corellium virtual device platform showing the device creation flow for mobile security testing"
                  width={1200}
                  height={800}
                  className="w-full transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.03] group-hover:-translate-y-0.5"
                  priority
                  fetchPriority="high"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
            </div>
            <div className="p-4 sm:p-7">
              <div className="mb-4">
                <h2 className="text-lg sm:text-xl font-heading font-semibold mb-1 uppercase tracking-wide">Corellium</h2>
                <p className="text-muted-foreground text-sm">Mobile virtualization for cybersecurity teams</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                <Badge>2023-Present</Badge>
                <Badge>Acquired</Badge>
                <Badge>Cybersecurity</Badge>
              </div>
            </div>
          </Link>

          {/* Project 2 - Immertec */}
          <FadeIn delay={75} duration={350}>
            <Link href="/work/immertec" className="group block sys-panel transition-colors duration-200 hover:border-foreground">
              <div className="bg-muted overflow-hidden border-b border-border p-1">
                <div className="relative w-full overflow-hidden rounded-sm">
                  <Image
                    src="/work/immertec/1.png"
                    alt="Immertec VR medical training platform showing a live surgical procedure with multiple participating doctors, medical imaging views, and interactive controls for remote learning"
                    width={1200}
                    height={800}
                    className="w-full transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.03] group-hover:-translate-y-0.5"
                    priority
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                  />
                </div>
              </div>
              <div className="p-4 sm:p-7">
                <div className="mb-4">
                  <h2 className="text-lg sm:text-xl font-heading font-semibold mb-1 uppercase tracking-wide">Immertec</h2>
                  <p className="text-muted-foreground text-sm">VR medical training for live surgical procedures</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  <Badge>2018-2023</Badge>
                  <Badge>Series A</Badge>
                  <Badge>Healthcare</Badge>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Project 3 - Spontivly */}
          <FadeIn delay={100} duration={350}>
            <Link href="/work/spontivly" className="group block sys-panel transition-colors duration-200 hover:border-foreground">
              <div className="bg-muted overflow-hidden border-b border-border p-1">
                <div className="relative w-full overflow-hidden rounded-sm">
                  <Image
                    src="/work/spontivly/1.png"
                    alt="Spontivly social analytics dashboard showing engagement metrics, impression trends, and top performing content"
                    width={1200}
                    height={800}
                    className="w-full transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.03] group-hover:-translate-y-0.5"
                    priority
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                  />
                </div>
              </div>
              <div className="p-4 sm:p-7">
                <div className="mb-4">
                  <h2 className="text-lg sm:text-xl font-heading font-semibold mb-1 uppercase tracking-wide">Spontivly</h2>
                  <p className="text-muted-foreground text-sm">Analytics dashboards for non-technical users</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  <Badge>2023</Badge>
                  <Badge>Seed</Badge>
                  <Badge>Analytics</Badge>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Project 4 - Paidly */}
          <FadeIn delay={125} duration={350}>
            <Link href="/work/paidly" className="group block sys-panel transition-colors duration-200 hover:border-foreground">
              <div className="bg-muted overflow-hidden border-b border-border p-1">
                <div className="relative w-full overflow-hidden rounded-sm">
                  <Image
                    src="/work/paidly/1.png"
                    alt="Paidly mobile app showing invoice list, automatic reminders feature, and customer creation form"
                    width={1200}
                    height={800}
                    className="w-full transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.03] group-hover:-translate-y-0.5"
                    priority
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                  />
                </div>
              </div>
              <div className="p-4 sm:p-7">
                <div className="mb-4">
                  <h2 className="text-lg sm:text-xl font-heading font-semibold mb-1 uppercase tracking-wide">Paidly</h2>
                  <p className="text-muted-foreground text-sm">Stripe-integrated invoicing mobile app for SMEs</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  <Badge>2020</Badge>
                  <Badge>Stripe Partner</Badge>
                  <Badge>Finance</Badge>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>

        {/* Other Work Section */}
        <FadeIn delay={175} duration={350}>
          <div className="sys-section-header pt-2 sm:pt-4">
            <p className="sys-section-label whitespace-nowrap">Other Work</p>
            <div className="sys-section-line" />
          </div>
        </FadeIn>

        {/* Other Work Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Magier */}
          <FadeIn delay={200} duration={350}>
            <div className="group sys-panel transition-colors duration-200 hover:border-foreground">
              <div className="bg-muted overflow-hidden border-b border-border p-1">
                <div className="relative w-full overflow-hidden rounded-sm [&_button]:cursor-zoom-in">
                  <LightboxImage
                    src="/work/magier/1.png"
                    alt="Magier AI chatbot mobile app screens showing settings, chat interface, and subscription options"
                    width={1200}
                    height={800}
                    className="w-full transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.03] group-hover:-translate-y-0.5"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 512px"
                  />
                </div>
              </div>
              <div className="p-4 sm:p-7">
                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-heading font-semibold mb-1 uppercase tracking-wide">Magier</h3>
                  <p className="text-sm text-muted-foreground">Privacy-focused AI chatbot mobile app</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  <Badge>2023</Badge>
                  <Badge>Acquired</Badge>
                  <Badge>AI</Badge>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Biobox */}
          <FadeIn delay={225} duration={350}>
            <div className="group sys-panel transition-colors duration-200 hover:border-foreground">
              <div className="bg-muted overflow-hidden border-b border-border p-1">
                <div className="relative w-full overflow-hidden rounded-sm [&_button]:cursor-zoom-in">
                  <LightboxImage
                    src="/work/biobox/1.png"
                    alt="Biobox link-in-bio platform leveraging onchain data"
                    width={1200}
                    height={800}
                    className="w-full transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.03] group-hover:-translate-y-0.5"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 512px"
                  />
                </div>
              </div>
              <div className="p-4 sm:p-7">
                <div className="mb-4">
                  <h3 className="text-base sm:text-lg font-heading font-semibold mb-1 uppercase tracking-wide">Biobox</h3>
                  <p className="text-sm text-muted-foreground">Link-in-bio platform leveraging onchain data</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  <Badge>2021</Badge>
                  <Badge>ETHGlobal Winner</Badge>
                  <Badge>Web3</Badge>
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
