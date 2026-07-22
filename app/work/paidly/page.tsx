import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.paidly.title,
  description: `${projectDetails.paidly.description} by Brendan Ciccone, a staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups.`,
  path: "/work/paidly",
  imageUrl: projectDetails.paidly.image.url,
  imageAlt: projectDetails.paidly.image.alt,
  imageWidth: 1200,
  imageHeight: 800,
});

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FigureFrame } from "@/components/figure-frame"
import { SectionLabel } from "@/components/section-label"
import { SectionNav } from "@/components/section-nav"
import { LightboxImage } from "@/components/lightbox"

const sections = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "research", number: "02", label: "Research" },
  { id: "mobile-invoicing", number: "03", label: "Mobile App" },
  { id: "insights", number: "04", label: "Insights" },
]

export default function PaidlyPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <SectionNav items={sections} />
      
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-8 sm:gap-10">
        
        {/* Page header — full-bleed hero image in a mat frame, then title row */}
        <header>
          <div className="bg-mockup-frame border border-border p-3 anim-rise [view-transition-name:vt-paidly]">
            <LightboxImage
              src="/work/paidly/1.webp"
              alt="Paidly mobile app showing invoice screens"
              width={1200}
              height={800}
              className="w-full"
              priority
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
            />
          </div>
          <div className="pt-6 sm:pt-7 flex flex-col sm:flex-row sm:items-center gap-4">
            <Image
              src="/about/logos/paidly.jpeg"
              alt="Paidly logo"
              width={60}
              height={60}
              className="w-12 h-12 sm:w-[60px] sm:h-[60px] object-cover border border-input flex-shrink-0 anim-rise [animation-delay:60ms]"
              quality={80}
              sizes="60px"
            />
            <div className="min-w-0 anim-rise [animation-delay:100ms]">
              <h1 className="font-heading font-extrabold uppercase tracking-[-0.02em] text-2xl sm:text-[32px] leading-none sm:whitespace-nowrap">Paidly</h1>
              <p className="text-[15px] text-muted-foreground mt-1.5 sm:whitespace-nowrap">
                Stripe-integrated invoicing mobile app for SMEs
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:gap-1.5 sm:flex-1 sm:min-w-0 sm:items-end anim-rise [animation-delay:180ms]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Founder</p>
              <div className="flex flex-wrap gap-1.5 sm:justify-end">
                <Badge>2020</Badge>
                <Badge>Stripe Partner</Badge>
                <Badge>Fintech</Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Overview + Highlights */}
        <section id="overview" className="scroll-mt-16">
          <SectionLabel title="Overview" number="01" className="mb-6" />
          <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
            As a freelancer, I experienced a common frustration: no way to send Stripe invoices on the go for free. In 2020, with remote work booming and freelancing on the rise, I saw an opportunity to solve my own problem at scale. After conducting market research, I founded Paidly and assembled a small team of developers, designing the entire application that launched on iOS and Android. From idea to launch took <span className="text-foreground font-semibold">2.5 months</span>.
          </p>
          {/* Metric box — same cell anatomy as the home stat bar: red caps
              label, ink value, description only where it adds a fact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border border-border bg-card">
            <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Users</p>
              <p className="text-lg sm:text-[26px] font-heading font-bold leading-tight tabular-nums mt-1.5">2,000+</p>
              <p className="text-[13px] leading-normal text-muted-foreground mt-1.5">Small and medium businesses</p>
            </div>
            <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Partnership</p>
              <p className="text-lg sm:text-[26px] font-heading font-bold leading-tight tabular-nums mt-1.5">Stripe</p>
              <p className="text-[13px] leading-normal text-muted-foreground mt-1.5">Official integration partner</p>
            </div>
            <div className="px-5 py-[18px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Volume</p>
              <p className="text-lg sm:text-[26px] font-heading font-bold leading-tight tabular-nums mt-1.5">$500k+</p>
              <p className="text-[13px] leading-normal text-muted-foreground mt-1.5">Invoiced through the platform</p>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section id="research" className="scroll-mt-16">
          <SectionLabel title="Research" number="02" className="mb-6" />
          <div className="space-y-3.5 text-[15px] leading-[1.6] text-ink-soft mb-6">
            <p>
              Drawing on my experiences with invoicing, I looked into what was available in the market for iOS and
              Android. While many industry leaders had comprehensive invoicing in their mobile apps, I was surprised
              to find Stripe&apos;s app ecosystem lacking even the most basic features.
            </p>
            <p>
              Based upon this discovery and knowing how integral Stripe was to payments on the web, I started diving
              into hundreds of reviews, uncovering what people liked and disliked about existing applications. I
              discovered users preferred non-subscription-based access and the ability for all the core functions
              found on the web version of Stripe. To further validate, I surveyed <span className="text-foreground font-semibold">over 300 users</span> and found that <span className="text-foreground font-semibold">90% were open to switching</span> invoicing apps. That gave me the confidence to move forward.
            </p>
            <p>
              For the MVP, I focused on what would satisfy 90%+ of users: core Stripe invoice basics like sending, viewing status, changing amounts, and adding items. I deliberately deprioritized niche features to ship faster and validate demand.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <FigureFrame number="01" caption="Onboarding and invoice creation">
              <LightboxImage
                src="/work/paidly/2.webp"
                alt="Paidly app screens showing onboarding flow, invoice creation, business setup, and Stripe integration"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </FigureFrame>
            <FigureFrame number="02" caption="Brand identity and app icons">
              <LightboxImage
                src="/work/paidly/3.webp"
                alt="Paidly brand identity showing the full logo and app icon variations"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </FigureFrame>
          </div>
        </section>

        {/* Stripe-Based Invoicing App Section */}
        <section id="mobile-invoicing" className="scroll-mt-16">
          <SectionLabel title="Bringing Stripe Invoices to Mobile" number="03" className="mb-6" />
          <div className="space-y-3.5 text-[15px] leading-[1.6] text-ink-soft mb-6">
            <p>
              Using a prototype in Figma and testing it in Maze, I was ready to take things to development and build
              an MVP. Realizing my development knowledge was not deep enough for the technical challenges ahead, I
              screened and hired a capable team of mobile developers.
            </p>
            <p>
              Our collaboration happened primarily through Slack for daily communication. I broke the product into a Kanban board,{' '}
              <span className="text-foreground font-semibold">giving developers clear scope and priorities</span>
              {' '}while keeping momentum toward launch. They were provided with all the tools and documentation needed, including access to Figma and an extensively user-tested high-fidelity prototype.
            </p>
          </div>
          <FigureFrame number="03" caption="Item management flow">
            <LightboxImage
              src="/work/paidly/4.webp"
              alt="Paidly app screens showing item management: adding items, empty state, and item creation form"
              width={1200}
              height={800}
              className="w-full"
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
            />
          </FigureFrame>
        </section>

        {/* Insights Section */}
        <section id="insights" className="scroll-mt-16">
          <SectionLabel title="Insights" number="04" className="mb-6" />
          <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
            After 6 months live and 2,000 SMBs running $500K+ in invoices through the platform, a contractor issue forced me to wind it down. It taught me that technical{' '}
            <span className="text-foreground font-semibold">vetting and code audits are non-negotiable</span>
            {' '}for anything high-stakes. That mindset now carries into every project I touch, especially in compliance-driven products.
          </p>
          <FigureFrame number="04" caption="Customer management flow">
            <LightboxImage
              src="/work/paidly/5.webp"
              alt="Paidly app screens showing customer management: customer list, success confirmation, and customer details form"
              width={1200}
              height={800}
              className="w-full"
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
            />
          </FigureFrame>
        </section>

        {/* CTA Section */}
        <section className="py-4 sm:py-6 text-center">
          <h2 className="title-display text-2xl sm:text-[30px] mb-2">Let&apos;s ship something <span className="text-primary">great.</span></h2>
          <p className="text-[15px] text-muted-foreground mb-6">
            Looking for feedback on your product or how to take an idea from 0 → 1?
          </p>
          <Button asChild size="lg" className="px-6 group">
            <Link href="/contact">
              Reach out <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-(--motion-settle) group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
            </Link>
          </Button>
        </section>

        <Footer />
      </div>
    </div>
  )
}
