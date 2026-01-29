import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.corellium.title,
  description: `${projectDetails.corellium.description} by Brendan Ciccone, a 0 → 1 Staff Product Designer with 7 years of experience turning ideas into fully realized products.`,
  path: "/work/corellium",
  imageUrl: projectDetails.corellium.image.url,
  imageAlt: projectDetails.corellium.image.alt,
  imageWidth: 1200,
  imageHeight: 800,
});

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, TrendingUp, Handshake, Eye } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"
import { LightboxImage } from "@/components/lightbox"

export default function CorelliumPage() {
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
                src="/work/corellium/1.png"
                alt="Corellium virtual device platform dashboard"
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
                    src="/about/logos/corellium.jpeg"
                    alt="Corellium logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    quality={80}
                    sizes="48px"
                  />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold">Corellium</h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Mobile virtualization for cybersecurity teams
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Staff Product Designer</Badge>
                <Badge>2023-Present</Badge>
                <Badge>Acquired</Badge>
                <Badge>Cybersecurity</Badge>
              </div>
            </div>
          </FadeIn>
        </header>

        {/* Overview + Highlights */}
        <FadeIn delay={50} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-6">
              In 2023, I joined Corellium as the <span className="text-foreground font-medium">solo designer</span> on a virtualization platform used by security researchers, enterprises, and government agencies to test mobile applications and firmware. I owned end-to-end product design across web and mobile, partnering with product and engineering teams to ship improvements while navigating the constraints of a complex platform.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
              <li>Shipped CI/CD-integrated mobile threat analysis tool, reducing review time for security teams</li>
              <li>Built the entire platform in Figma for the first time, with full mobile parity and a scalable design system</li>
              <li>Led WCAG accessibility initiative, enabling enterprise sales and streamlining compliance</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-4">
                <TrendingUp className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">SUS 81</p>
                <p className="text-sm text-muted-foreground">Achieved 81 System Usability Scale score post-launch</p>
              </div>
              <div className="bg-card rounded-xl p-4">
                <Handshake className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">$200M acquisition</p>
                <p className="text-sm text-muted-foreground">WCAG and design system work helped make the platform acquisition-ready</p>
              </div>
              <div className="bg-card rounded-xl p-4">
                <Eye className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">WCAG 2.1 AA</p>
                <p className="text-sm text-muted-foreground">Led accessibility initiative enabling enterprise sales</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* The Problem - Old Flow */}
        <FadeIn delay={75} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Device Creation: The Core Experience</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                Device creation is the most critical flow in the platform. It's how every user starts their work. But the existing experience required a <span className="text-foreground font-medium">minimum of 6 steps</span>, and no changes were saved between steps. Going back to change something as simple as which project a device belonged to would revert all your selections, adding up to 6 more steps. That's 12 steps worst case for a flow every single user hits.
              </p>
              <p>
                The problems were clear from design heuristics alone: unclear decision points, redundant inputs, and a structure that punished users for changing their mind or making the wrong selection. I mapped the existing flow to make the friction tangible for the product team and PMs.
              </p>
            </div>
            {/* FigJam - Original Flow */}
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/corellium/2.png"
                alt="FigJam diagram showing the original device creation flow with multiple steps and decision points"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </section>
        </FadeIn>

        {/* Finding the Right Moment */}
        <FadeIn delay={100} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Bringing the Idea Forward</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                This is a core feature that affects every user on the platform. The whole point of Corellium is to create virtual devices to test on. If this flow is painful, the entire product feels painful, every time you create a new device.
              </p>
              <p>
                I advocated for this redesign for <span className="text-foreground font-medium">over a year</span>, waiting for the right window. The opportunity came when a PM's roadmap had capacity and I could demonstrate how the fix would solve pain points for his user segment. I presented first to him and the head of front-end engineering to get buy-in, then shared it with the wider product team. Timing and alignment mattered as much as the solution.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* The Redesign - New Flow */}
        <FadeIn delay={125} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Simplifying the Experience</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                The goal was to reduce cognitive load and eliminate unnecessary steps without sacrificing flexibility. I redesigned the flow to <span className="text-foreground font-medium">3 steps</span>. One click gives you the latest iOS, Android, or IoT device with smart defaults. Power users can still customize everything, but the common path is now fast.
              </p>
              <p>
                Making changes no longer punished users with extra steps. The new flow let users adjust device type, OS version, project, and even advanced options without starting over.
              </p>
            </div>
            {/* FigJam - New Flow */}
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/corellium/3.png"
                alt="FigJam diagram showing the redesigned device creation flow with simplified steps"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </section>
        </FadeIn>

        {/* The Shipped Design */}
        <FadeIn delay={150} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">The Result</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                The redesigned flow shipped. What previously took a minimum of 6 steps (and up to 12 if you needed to go back) now takes <span className="text-foreground font-medium">3</span>. Device creation takes <span className="text-foreground font-medium">half the time or less</span> compared to the previous setup. The product team finally had something flexible that simplified the experience for end users while enabling future feature requests without rearchitecting.
              </p>
              <p>
                I designed the system to be <span className="text-foreground font-medium">modular</span>. It handles complex IoT devices with unique configuration requirements just as easily as straightforward iOS or Android setups. Future device types can be added without rearchitecting the experience, whether for niche use cases or entirely new industries and revenue lines.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {/* Select a project */}
              <div className="bg-muted rounded-xl overflow-hidden">
                <LightboxImage
                  src="/work/corellium/4.png"
                  alt="Corellium project selection interface"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
              {/* Device selection - iOS full width */}
              <div className="bg-muted rounded-xl overflow-hidden">
                <LightboxImage
                  src="/work/corellium/5.png"
                  alt="Corellium iOS device selection interface"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
              {/* Android + Modal side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/corellium/6.png"
                    alt="Corellium Android device selection"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/corellium/8.png"
                    alt="Corellium device creation modal"
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

        {/* Insights */}
        <FadeIn delay={175} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Insights</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                In B2B enterprise, customer requests translate directly to revenue, which means platform-wide UX improvements often lose the prioritization battle. This took over a year to land. Find the intersection between what users need and what a PM can justify on their roadmap to get foundational work shipped.
              </p>
              <p>
                Beyond this project, I partnered with the head of front-end engineering to lead the <span className="text-foreground font-medium">WCAG accessibility initiative</span> that unblocked enterprise sales. He handled engineering, I handled design, and together we aligned the entire design system. I also <span className="text-foreground font-medium">standardized the product design process</span> across 3 PMs, 2 POs, and their respective teams. The previous setup relied on one large file that was constantly out of sync. I created a system that fit into their existing workflows while ensuring design specs were always current for specific tickets and bodies of work.
              </p>
            </div>
            {/* IoT device selection - demonstrates modular system */}
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/corellium/7.png"
                alt="Corellium IoT device selection showing modular configuration"
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
        <FadeIn delay={200} duration={350}>
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
