import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.spontivly.title,
  description: `${projectDetails.spontivly.description} by Brendan Ciccone, a 0 → 1 Staff Product Designer with 7 years of experience turning ideas into fully realized products.`,
  path: "/work/spontivly",
  imageUrl: projectDetails.spontivly.image.url,
  imageAlt: projectDetails.spontivly.image.alt,
  imageWidth: 1200,
  imageHeight: 800,
});

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"

export default function SpontivlyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-8 sm:gap-12">
        
        {/* Hero Section */}
        <FadeIn delay={0} duration={350}>
          <div className="flex flex-col gap-6">
            {/* Title + Description */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center bg-card overflow-hidden flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sdtEuqGIPQw38owJSawPdDh1myE-dMMHZU0Y0hIYLLG1OoLVxrDe6ZqZlF.webp"
                  alt="Spontivly logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  quality={80}
                  sizes="48px"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold mb-1">Spontivly</h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Analytics dashboards for non-technical users
                </p>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="bg-muted rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-WdXXd2S7UErPJUOdDGGcki7Gq9r0TN.png"
                alt="Spontivly social dashboard showing analytics and engagement metrics"
                width={1200}
                height={800}
                className="w-full"
                priority
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </div>
        </FadeIn>

        {/* Project Details Grid */}
        <FadeIn delay={50} duration={350}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Role</p>
              <p className="font-medium">Senior Product Designer</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Timeline</p>
              <p className="font-medium">2023–2024</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Team</p>
              <p className="font-medium">Solo designer</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Stage</p>
              <p className="font-medium">Seed</p>
            </div>
          </div>
        </FadeIn>

        {/* Impact Highlights */}
        <FadeIn delay={75} duration={350}>
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
            <h2 className="text-sm text-muted-foreground uppercase tracking-wide mb-4">Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-2xl sm:text-3xl font-semibold mb-1">120+</p>
                <p className="text-sm text-muted-foreground">API integrations designed for the dashboard platform</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-semibold mb-1">1 month</p>
                <p className="text-sm text-muted-foreground">Ahead of schedule on website redesign launch</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-semibold mb-1">Sales prototypes</p>
                <p className="text-sm text-muted-foreground">Interactive Figma demos to shorten sales cycles</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Context Section */}
        <FadeIn delay={100} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Context</h2>
            <p className="text-muted-foreground max-w-3xl">
              I joined Spontivly as the only designer at a venture-backed startup focused on democratizing 
              data dashboards. I designed a platform that allowed non-technical users to build custom dashboards 
              without engineering support, enabling faster, more informed decisions across teams.
            </p>
          </section>
        </FadeIn>

        {/* Website Redesign Section */}
        <FadeIn delay={125} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Website Redesign</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              My first project was redesigning the marketing website to create a more consistent message and visual language. 
              I collaborated with marketing, advocated for an accessible CMS, and led development with contractors I brought in. 
              We launched over a month ahead of schedule.
            </p>
            <div className="bg-muted rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-WtBgFu7RPx0w5ppbt7HCyV17wHHwsK.png"
                alt="Spontivly marketing website showing data dashboards without technical fuss tagline"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </section>
        </FadeIn>

        {/* Dashboard Builder Section */}
        <FadeIn delay={150} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Dashboard Builder</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              I led the design of a drag-and-drop dashboard builder that let users connect APIs from social media, CRMs, 
              and other tools. The goal was to make something familiar yet powerful enough for data-driven decision making.
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-muted rounded-xl overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-K6zVOHyu0haPpgDtEStbsDrwqDl1Lt.png"
                  alt="Spontivly dashboard overview showing multiple dashboard cards for different purposes"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-xl overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-GhS5M97fmuUUo2QbvcNDyiW97xc3bc.png"
                    alt="Spontivly profile settings interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-muted rounded-xl overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-nAN6iIm4GpTngSI9u7hKN7O5l3tP9L.png"
                    alt="Spontivly team management interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Chart Builder Section */}
        <FadeIn delay={175} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Chart Customization</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              Users needed granular control over their visualizations. I designed a chart builder that balanced 
              power-user features with approachability for non-technical users.
            </p>
            <div className="bg-muted rounded-xl overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-QASqlEIRz1pkUNGGxmLRjjUfAqOjDq.png"
                alt="Spontivly chart builder interface showing customization options"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </section>
        </FadeIn>

        {/* Takeaway */}
        <FadeIn delay={200} duration={350}>
          <section className="bg-card border border-border rounded-xl p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">Takeaway</h2>
            <p className="text-muted-foreground">
              This project taught me how to balance complexity for power users without alienating newcomers. 
              The key is progressive disclosure—prioritize the most relevant features upfront and keep advanced 
              options within reach but not in the way.
            </p>
          </section>
        </FadeIn>

        {/* CTA Section */}
        <FadeIn delay={225} duration={350}>
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
