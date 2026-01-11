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
        
        {/* Hero Image */}
        <FadeIn delay={0} duration={350}>
          <div className="bg-muted rounded-xl overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-ZvLOgtuigyMw4YHmpEcm0a6xW4SS0t.png"
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
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center bg-card overflow-hidden flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uvNlfL0W1id65iarhG9wcUaT3aA-wvwBeKadRSwDEpSkFpeHnvcna1xp85.webp"
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
              <Badge>Finance</Badge>
            </div>
          </div>
        </FadeIn>

        {/* Overview + Highlights */}
        <FadeIn delay={50} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-6">
              During 2020, I noticed an increase in interest in entrepreneurship and freelancing, likely due to a
              lack of job security spurred on by the pandemic. I believed this would increase demand for tools like
              invoicing, and as someone with a freelancer background, I knew the importance. After conducting market
              research, I founded Paidly and assembled a small team of developers, designing the entire application that
              launched on iOS and Android.
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
                <p className="text-base font-semibold mb-1">4+ star rating</p>
                <p className="text-sm text-muted-foreground">Maintained high ratings on the App Store and Play Store</p>
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
                found on the web version of Stripe. To further validate this project, I surveyed relevant users and
                found that 90% of respondents were open to switching invoicing apps. The survey gave me the extra
                confidence to move forward and start designing.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-muted rounded-xl overflow-hidden">
                <LightboxImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-KqqHEHgnDGs24Q3dtjmHD3eReZb68N.png"
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-Pc0Tpc99z68zE31Dw1IGIZ5heLRbum.png"
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
                Our collaboration happened primarily through Slack for daily communication and Trello for tracking our
                progress and feature implementation. The developers were provided with all the tools and documentation
                needed, including access to Figma and an extensively user-tested high-fidelity prototype, to ensure a
                smooth process for the MVP and beyond.
              </p>
            </div>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-ZhXGY50aBYRlkHytNcqwMPoUEOqrxA.png"
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
                Building on a 3rd party platform often comes with benefits like an existing user base you can tap
                into, partnerships, and a powerful underlying API. At the same time, it also comes with the risk of
                locking your product into an ecosystem where the platform and supported features may not align with
                the needs of your users or product vision.
              </p>
              <p>
                My key takeaway is that any product largely reliant on third-party platforms should have an actively
                updated plan to become independent if needed. It's hard to predict what can happen, but deviating can
                be necessary to enhance user experience, gain a broader market reach, or even remain in business.
              </p>
            </div>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-0qjyaHWB67eHnejL4hiWKJ13XJ32o0.png"
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
