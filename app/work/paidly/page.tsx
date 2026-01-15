import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.paidly.title,
  description: `${projectDetails.paidly.description} by Brendan Ciccone, a 0 → 1 Staff Product Designer with 7 years of experience turning ideas into fully realized products.`,
  path: "/work/paidly",
  imageUrl: projectDetails.paidly.image.url,
  imageAlt: projectDetails.paidly.image.alt,
  imageWidth: 1200,
  imageHeight: 800,
});

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, Star, Handshake } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"
import { LightboxImage } from "@/components/lightbox"

export default function PaidlyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-8 sm:gap-12">
        
        {/* Page Header - Hero + Title + Badges */}
        <header className="pb-8 sm:pb-12 border-b border-border">
          {/* Hero Image */}
          <FadeIn delay={0} duration={350}>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/paidly/1.png"
                alt="Paidly mobile app showing invoice screens"
                width={1200}
                height={800}
                className="w-full"
                priority
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </FadeIn>

          {/* Title + Description + Badges */}
          <FadeIn delay={25} duration={350}>
            <div className="mt-8 sm:mt-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center bg-card overflow-hidden flex-shrink-0">
                  <Image
                    src="/about/logos/paidly.jpeg"
                    alt="Paidly logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    quality={80}
                    sizes="48px"
                  />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold">Paidly</h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Stripe-integrated invoicing mobile app for SMEs
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Founder</Badge>
                <Badge>2020</Badge>
                <Badge>Stripe Partner</Badge>
                <Badge>Finance</Badge>
              </div>
            </div>
          </FadeIn>
        </header>

        {/* Overview + Highlights */}
        <FadeIn delay={50} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-6">
              As a freelancer, I experienced a common frustration: no way to send Stripe invoices on the go for free. In 2020, with remote work booming and freelancing on the rise, I saw an opportunity to solve my own problem at scale. After conducting market research, I founded Paidly and assembled a small team of developers, designing the entire application that launched on iOS and Android. From idea to launch took <span className="text-foreground font-medium">2.5 months</span>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4">
                <Users className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">2,000+ users served</p>
                <p className="text-sm text-muted-foreground">Served over 2,000 small and medium business clients</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <Handshake className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">Stripe partner</p>
                <p className="text-sm text-muted-foreground">Became an official Stripe integration partner</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <Star className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">$500k+ invoicing volume</p>
                <p className="text-sm text-muted-foreground">Processed over half a million dollars in invoices</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Research Section */}
        <FadeIn delay={75} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Research</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                Drawing on my experiences with invoicing, I looked into what was available in the market for iOS and
                Android. While many industry leaders had comprehensive invoicing in their mobile apps, I was surprised
                to find Stripe's app ecosystem lacking even the most basic features.
              </p>
              <p>
                Based upon this discovery and knowing how integral Stripe was to payments on the web, I started diving
                into hundreds of reviews, uncovering what people liked and disliked about existing applications. I
                discovered users preferred non-subscription-based access and the ability for all the core functions
                found on the web version of Stripe. To further validate, I surveyed <span className="text-foreground font-medium">over 300 users</span> and found that <span className="text-foreground font-medium">90% were open to switching</span> invoicing apps. That gave me the confidence to move forward.
              </p>
              <p>
                For the MVP, I focused on what would satisfy 90%+ of users: core Stripe invoice basics like sending, viewing status, changing amounts, and adding items. I deliberately deprioritized niche features to ship faster and validate demand.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-muted rounded-xl overflow-hidden">
                <LightboxImage
                  src="/work/paidly/2.png"
                  alt="Paidly app screens showing onboarding flow, invoice creation, business setup, and Stripe integration"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
              <div className="bg-muted rounded-xl overflow-hidden">
                <LightboxImage
                  src="/work/paidly/3.png"
                  alt="Paidly brand identity showing the full logo and app icon variations"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Stripe-Based Invoicing App Section */}
        <FadeIn delay={100} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Bringing Stripe Invoices to Mobile</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                Using a prototype in Figma and testing it in Maze, I was ready to take things to development and build
                an MVP. Realizing my development knowledge was not deep enough for the technical challenges ahead, I
                screened and hired a capable team of mobile developers.
              </p>
              <p>
                Our collaboration happened primarily through Slack for daily communication. I broke the product into a Kanban board, giving developers clear scope and priorities while keeping momentum toward launch. They were provided with all the tools and documentation needed, including access to Figma and an extensively user-tested high-fidelity prototype.
              </p>
            </div>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/paidly/4.png"
                alt="Paidly app screens showing item management: adding items, empty state, and item creation form"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </section>
        </FadeIn>

        {/* Insights Section */}
        <FadeIn delay={125} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Insights</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                Paidly was my first attempt at building a startup. After having the platform up for around 6 months, and having 2,000 SMBs trust the product enough to run $500K+ in invoices through it, I decided to end the project earlier than planned after a security issue with a contractor I hired introduced technical issues that became a constant headache.
              </p>
              <p>
                It taught me that technical vetting is a founder responsibility, not something you can outsource to reputation or references. I now treat security review and code audits as non-negotiable before shipping anything financial or high stakes, even at the MVP stage.
              </p>
            </div>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/paidly/5.png"
                alt="Paidly app screens showing customer management: customer list, success confirmation, and customer details form"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </section>
        </FadeIn>

        {/* CTA Section */}
        <FadeIn delay={150} duration={350}>
          <section className="py-10 sm:py-16 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Let's go to market</h2>
            <p className="text-muted-foreground mb-6">
              Ready to take your product from 0 → 1 or looking to expand your team?
            </p>
            <Button asChild size="lg" className="px-4">
              <Link href="/contact">
                Contact Me <ArrowRight className="ml-1 h-4 w-4 transition-all duration-200" />
              </Link>
            </Button>
          </section>
        </FadeIn>

        <Footer />
      </div>
    </div>
  )
}
