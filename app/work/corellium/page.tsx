import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.corellium.title,
  description: `${projectDetails.corellium.description} by Brendan Ciccone, a staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups.`,
  path: "/work/corellium",
  imageUrl: projectDetails.corellium.image.url,
  imageAlt: projectDetails.corellium.image.alt,
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
import { DrawnRule } from "@/components/drawn-rule"
import { FadeIn } from "@/components/fade-in"
import { FigureFrame } from "@/components/figure-frame"
import { SectionLabel } from "@/components/section-label"
import { SectionNav } from "@/components/section-nav"
import { LightboxImage } from "@/components/lightbox"
import { ImageComparison } from "@/components/image-comparison"

const sections = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "device-creation", number: "02", label: "Devices" },
  { id: "simplifying", number: "03", label: "Simplifying" },
  { id: "insights", number: "04", label: "Insights" },
]

export default function CorelliumPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <SectionNav items={sections} />

      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col">

        {/* Page header — full-bleed hero image in a mat frame, then title row */}
        <header>
          <FadeIn delay={0} duration={350}>
            <div className="bg-mockup-frame border border-border p-3 anim-rise">
              <LightboxImage
                src="/work/corellium/1.webp"
                alt="Corellium virtual device platform dashboard"
                width={1200}
                height={800}
                className="w-full"
                priority
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
            <div className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4">
              <Image
                src="/about/logos/corellium.jpeg"
                alt="Corellium logo"
                width={60}
                height={60}
                className="w-12 h-12 sm:w-[60px] sm:h-[60px] object-cover border border-input flex-shrink-0 anim-rise [animation-delay:60ms]"
                quality={80}
                sizes="60px"
              />
              <div className="flex-1 min-w-0 anim-rise [animation-delay:100ms]">
                <h1 className="font-heading font-extrabold uppercase tracking-[-0.02em] text-2xl sm:text-[32px] leading-none">Corellium</h1>
                <p className="text-[15px] text-muted-foreground mt-1.5">
                  Mobile virtualization for cybersecurity teams
                </p>
              </div>
              <div className="flex flex-col gap-1.5 sm:items-end anim-rise [animation-delay:180ms]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Staff Product Designer</p>
                <div className="flex flex-wrap gap-1.5 sm:justify-end">
                  <Badge>2023-Present</Badge>
                  <Badge>Acquired</Badge>
                  <Badge>Cybersecurity</Badge>
                </div>
              </div>
            </div>
            <DrawnRule />
          </FadeIn>
        </header>

        {/* Overview + Highlights */}
        <FadeIn delay={50} duration={350}>
          <section id="overview" className="py-8 sm:py-9 border-b border-border scroll-mt-16">
            <SectionLabel title="Overview" number="01" className="mb-5" />
            <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
              In 2023, I joined Corellium as the <span className="text-foreground font-semibold">solo designer</span> on a virtualization platform used by security researchers, enterprises, and government agencies to test mobile applications and firmware. I owned end-to-end product design across web and mobile, partnering with product and engineering teams to ship improvements while navigating the constraints of a complex platform.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px] leading-[1.7] text-ink-soft mb-6">
              <li>Shipped CI/CD-integrated mobile threat analysis tool, reducing review time for security teams</li>
              <li>Built the entire platform in Figma for the first time, with full mobile parity and a scalable design system</li>
              <li>Led WCAG accessibility initiative, enabling enterprise sales and streamlining compliance</li>
            </ul>
            {/* Metric box — 3 cells in one hairline frame, Archivo accent stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-border bg-card">
              <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
                <p className="text-[22px] font-heading font-extrabold text-primary leading-tight">SUS 81</p>
                <p className="text-[13px] leading-normal text-muted-foreground mt-2">Achieved 81 System Usability Scale score post-launch via in-product surveys</p>
              </div>
              <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
                <p className="text-[22px] font-heading font-extrabold text-primary leading-tight">$200M acquisition</p>
                <p className="text-[13px] leading-normal text-muted-foreground mt-2">WCAG and design system work helped make the platform acquisition-ready</p>
              </div>
              <div className="px-5 py-[18px]">
                <p className="text-[22px] font-heading font-extrabold text-primary leading-tight">WCAG 2.1 AA</p>
                <p className="text-[13px] leading-normal text-muted-foreground mt-2">Led accessibility initiative enabling enterprise sales</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* The Problem - Old Flow */}
        <FadeIn delay={75} duration={350}>
          <section id="device-creation" className="py-8 sm:py-9 border-b border-border scroll-mt-16">
            <SectionLabel title="Device Creation: The Core Experience" number="02" className="mb-5" />
            <div className="space-y-3.5 text-[15px] leading-[1.6] text-ink-soft mb-6">
              <p>
                Device creation is the most critical flow in the platform. It&apos;s how every user starts their work. If this flow is painful, the entire product feels painful.
              </p>
              <p>
                I first identified the friction through patterns in{' '}
                <span className="text-foreground font-semibold">Intercom survey responses</span>
                , then mapped the existing flow to make it tangible for the product team. The existing experience required a{' '}
                <span className="text-foreground font-semibold">minimum of 6 steps</span>, and no changes were saved between steps. Going back to change something as simple as which project a device belonged to would revert all your selections, adding up to 6 more steps. That&apos;s{' '}
                <span className="text-foreground font-semibold">12 steps worst case</span> for a flow every single user hits. Unclear decision points, redundant inputs, and a structure that punished users for changing their mind.
              </p>
              <p>
                I advocated for this redesign for over a year. It was consistently deprioritized because the roadmap favored feature additions that kept us ahead of competitors and that existing customers were actively requesting.{' '}
                <span className="text-foreground font-semibold">Foundational UX work rarely has a customer asking for it by name.</span>{' '}
                The opportunity came when a PM&apos;s roadmap had capacity and I could demonstrate how the fix would solve pain points for his user segment. I presented first to him and the head of front-end engineering, then shared it with the wider product team. Timing and alignment mattered as much as the solution.
              </p>
            </div>
            {/* Before/After: original vs redesigned device creation flow (FigJam) */}
            <FigureFrame number="01" caption="Device creation flow, original vs redesigned">
              <ImageComparison
                beforeSrc="/work/corellium/2.webp"
                afterSrc="/work/corellium/3.webp"
                beforeAlt="FigJam diagram showing the original device creation flow with multiple steps and decision points"
                afterAlt="FigJam diagram showing the redesigned device creation flow with simplified steps"
                width={1200}
                height={800}
              />
            </FigureFrame>
          </section>
        </FadeIn>

        {/* Redesign narrative + redesigned UI */}
        <FadeIn delay={100} duration={350}>
          <section id="simplifying" className="py-8 sm:py-9 border-b border-border scroll-mt-16">
            <SectionLabel title="Simplifying the Experience" number="03" className="mb-5" />
            <div className="space-y-3.5 text-[15px] leading-[1.6] text-ink-soft mb-6">
              <p>
                The goal was to reduce cognitive load and eliminate unnecessary steps without sacrificing flexibility. I redesigned the flow down to <span className="text-foreground font-semibold">3 steps</span>. In the new design, one click gives you the latest iOS, Android, or IoT device with smart defaults. Power users can still customize everything, but the common path is fast. Changing your mind no longer punishes you with extra steps: device type, OS version, project, and advanced options can all be adjusted without starting over.
              </p>
              <p>
                <span className="text-foreground font-semibold">
                  A flow that took up to 3 minutes drops to an estimated 10 to 30 seconds
                </span>
                {' '}depending on complexity.{' '}
                I designed the system to be modular, handling complex IoT devices with unique configuration requirements just as easily as standard iOS or Android setups. Future device types can be added without rearchitecting the experience, whether for new use cases or entirely new revenue lines.
              </p>
              <p>
                The redesign is <span className="text-foreground font-semibold">fully designed and approved</span>, but a major internal shift reprioritized the roadmap before it reached engineering, and it&apos;s currently queued for implementation. That outcome reinforced the lesson at the heart of this project: in enterprise B2B, foundational UX work has to be re-sold as priorities change, not just sold once.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {/* Select a project */}
              <FigureFrame number="02" caption="Project selection">
                <LightboxImage
                  src="/work/corellium/4.webp"
                  alt="Corellium project selection interface"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </FigureFrame>
              {/* Device selection - iOS full width */}
              <FigureFrame number="03" caption="iOS device selection">
                <LightboxImage
                  src="/work/corellium/5.webp"
                  alt="Corellium iOS device selection interface"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </FigureFrame>
              {/* Android + Modal side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FigureFrame number="04" caption="Android device selection" padding="tight">
                  <LightboxImage
                    src="/work/corellium/6.webp"
                    alt="Corellium Android device selection"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </FigureFrame>
                <FigureFrame number="05" caption="Device creation modal" padding="tight">
                  <LightboxImage
                    src="/work/corellium/8.webp"
                    alt="Corellium device creation modal"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </FigureFrame>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Insights */}
        <FadeIn delay={125} duration={350}>
          <section id="insights" className="py-8 sm:py-9 border-b border-border scroll-mt-16">
            <SectionLabel title="Insights" number="04" className="mb-5" />
            <div className="space-y-3.5 text-[15px] leading-[1.6] text-ink-soft mb-6">
              <p>
                In B2B enterprise, customer requests translate directly to revenue, which means platform-wide UX improvements often lose the prioritization battle. Find the intersection between what users need and what a PM can justify on their roadmap to get foundational work prioritized.
              </p>
              <p>
                Beyond this project, I partnered with the head of front-end engineering to lead the{' '}
                <span className="text-foreground font-semibold">
                  WCAG accessibility initiative that unblocked enterprise sales
                </span>
                . He handled engineering, I handled design, and together we aligned the entire design system. I also{' '}
                <span className="text-foreground font-semibold">
                  standardized the product design process across 3 PMs, 2 POs, and their teams
                </span>
                , replacing one constantly out-of-sync file with a system that kept design specs current for specific tickets and bodies of work.
              </p>
            </div>
            {/* IoT device selection - demonstrates modular system */}
            <FigureFrame number="06" caption="IoT device configuration">
              <LightboxImage
                src="/work/corellium/7.webp"
                alt="Corellium IoT device selection showing modular configuration"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </FigureFrame>
          </section>
        </FadeIn>

        {/* CTA Section */}
        <FadeIn delay={150} duration={350}>
          <section className="py-10 sm:py-12 text-center">
            <h2 className="title-display text-2xl sm:text-[30px] mb-2">Let&apos;s ship something <span className="text-primary">great.</span></h2>
            <p className="text-[15px] text-muted-foreground mb-6">
              Looking for feedback on your product or how to take an idea from 0 → 1?
            </p>
            <Button asChild size="lg" className="px-6 group">
              <Link href="/contact">
                Reach out <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
              </Link>
            </Button>
          </section>
        </FadeIn>

        <Footer />
      </div>
    </div>
  )
}
