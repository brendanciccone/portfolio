import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.paidly.title,
  description: `${projectDetails.paidly.description} by Brendan Ciccone, a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized products.`,
  path: "/work/paidly",
  imageUrl: projectDetails.paidly.image.url,
  imageAlt: projectDetails.paidly.image.alt,
  imageWidth: 1200,
  imageHeight: 800,
});

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"
import {
  WorkSection,
  WorkHero,
  MetricGrid,
  WorkProse,
  WorkFigure,
} from "@/components/work-section"

export default function PaidlyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6">
        <FadeIn delay={0} duration={350}>
          <WorkHero
            num="004"
            name="Paidly"
            description="Stripe-integrated invoicing mobile app for SMEs."
            logo="/about/logos/paidly.jpeg"
            image="/work/paidly/1.png"
            imageAlt="Paidly mobile app showing invoice screens"
            tags={["Founder", "2020", "Stripe Partner", "Fintech"]}
          />
        </FadeIn>

        <FadeIn delay={50} duration={350}>
          <WorkSection num="01" title="Overview" meta="Context">
            <WorkProse>
              <p>
                As a freelancer, I experienced a common frustration: no way to send Stripe invoices on the go for free. In 2020, with remote work booming and freelancing on the rise, I saw an opportunity to solve my own problem at scale. After conducting market research, I founded Paidly and assembled a small team of developers, designing the entire application that launched on iOS and Android. From idea to launch took{" "}
                <span className="text-foreground font-medium">2.5 months</span>.
              </p>
            </WorkProse>
            <MetricGrid
              items={[
                { label: "Users", value: "2,000+", description: "Served over 2,000 small and medium business clients." },
                { label: "Partner", value: "Stripe", description: "Became an official Stripe integration partner." },
                { label: "Volume", value: "$500k+", description: "Processed over half a million dollars in invoices." },
              ]}
            />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={75} duration={350}>
          <WorkSection num="02" title="Research" meta="Discovery">
            <WorkProse>
              <p>
                Drawing on my experiences with invoicing, I looked into what was available in the market for iOS and Android. While many industry leaders had comprehensive invoicing in their mobile apps, I was surprised to find Stripe&apos;s app ecosystem lacking even the most basic features.
              </p>
              <p>
                Based upon this discovery and knowing how integral Stripe was to payments on the web, I started diving into hundreds of reviews, uncovering what people liked and disliked about existing applications. I discovered users preferred non-subscription-based access and the ability for all the core functions found on the web version of Stripe. To further validate, I surveyed{" "}
                <span className="text-foreground font-medium">over 300 users</span> and found that{" "}
                <span className="text-foreground font-medium">90% were open to switching</span> invoicing apps. That gave me the confidence to move forward.
              </p>
              <p>
                For the MVP, I focused on what would satisfy 90%+ of users: core Stripe invoice basics like sending, viewing status, changing amounts, and adding items. I deliberately deprioritized niche features to ship faster and validate demand.
              </p>
            </WorkProse>
            <div className="grid grid-cols-1 gap-4">
              <WorkFigure src="/work/paidly/2.png" alt="Paidly app screens showing onboarding flow, invoice creation, business setup, and Stripe integration" caption="Onboarding & Invoice Flow" />
              <WorkFigure src="/work/paidly/3.png" alt="Paidly brand identity showing the full logo and app icon variations" caption="Brand Identity" />
            </div>
          </WorkSection>
        </FadeIn>

        <FadeIn delay={100} duration={350}>
          <WorkSection num="03" title="Bringing Stripe Invoices to Mobile" meta="Build">
            <WorkProse>
              <p>
                Using a prototype in Figma and testing it in Maze, I was ready to take things to development and build an MVP. Realizing my development knowledge was not deep enough for the technical challenges ahead, I screened and hired a capable team of mobile developers.
              </p>
              <p>
                Our collaboration happened primarily through Slack for daily communication. I broke the product into a Kanban board,{" "}
                <span className="text-foreground font-medium">giving developers clear scope and priorities</span>{" "}
                while keeping momentum toward launch. They were provided with all the tools and documentation needed, including access to Figma and an extensively user-tested high-fidelity prototype.
              </p>
            </WorkProse>
            <WorkFigure src="/work/paidly/4.png" alt="Paidly app screens showing item management: adding items, empty state, and item creation form" caption="Item Management" />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={125} duration={350}>
          <WorkSection num="04" title="Insights" meta="Reflection">
            <WorkProse>
              <p>
                After 6 months live and 2,000 SMBs running $500K+ in invoices through the platform, a contractor issue forced me to wind it down. It taught me that technical{" "}
                <span className="text-foreground font-medium">vetting and code audits are non-negotiable</span>{" "}
                for anything high-stakes. That mindset now carries into every project I touch, especially in compliance-driven products.
              </p>
            </WorkProse>
            <WorkFigure src="/work/paidly/5.png" alt="Paidly app screens showing customer management: customer list, success confirmation, and customer details form" caption="Customer Management" />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={150} duration={350}>
          <section className="sys-cell sys-cell-inverted">
            <div className="p-7 sm:p-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-background/60 mb-3">
                Next / Contact
              </p>
              <h2 className="sys-display text-2xl sm:text-3xl mb-2">Let&apos;s build something great.</h2>
              <p className="font-mono text-[13px] text-background/80 mb-6">
                Ready to take your product from 0 → 1 or looking to expand your team?
              </p>
              <Button asChild variant="outline" size="lg" className="border-background bg-transparent text-background hover:bg-background hover:text-foreground hover:shadow-[4px_4px_0_0_var(--background)]">
                <Link href="/contact">
                  Reach out <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </FadeIn>

        <Footer />
      </div>
    </div>
  )
}
