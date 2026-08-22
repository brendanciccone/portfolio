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
import { StatRows, type StatRow } from "@/components/stat-rows"
import { CountUp } from "@/components/count-up"
import { FigureFrame } from "@/components/figure-frame"
import { SectionLabel } from "@/components/section-label"
import { SectionNav } from "@/components/section-nav"
import { LightboxImage } from "@/components/lightbox"
import { ImageComparison } from "@/components/image-comparison"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "device-creation", label: "Devices" },
  { id: "simplifying", label: "Simplifying" },
  { id: "insights", label: "Insights" },
]

const caseMeta: readonly StatRow[] = [
  { label: "Role", value: "Staff Product Designer" },
  { label: "Timeline", value: "2023–Present" },
  { label: "Status", value: "Acquired" },
  { label: "Industry", value: "Cybersecurity" },
]

export default function CorelliumPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <SectionNav items={sections} />

      <div className="max-w-[var(--page-width)] mx-auto px-5 pt-32 sm:pt-36 pb-6 sm:pb-8 flex flex-col gap-10 sm:gap-12">

        {/* Page header: title row, then the hero image, then the particulars
            as stat rows. The role used to ride above the image in the chip row,
            where it sat as one tag among four and competed with the project name
            two lines above it. */}
        <header>
          {/* The framed hero below is left alone: it carries the
              shared-element name for the card→case-study morph */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Image
              src="/about/logos/corellium.jpeg"
              alt="Corellium logo"
              width={60}
              height={60}
              className="w-12 h-12 sm:w-[60px] sm:h-[60px] object-cover rounded-lg border border-border flex-shrink-0 anim-rise [animation-delay:60ms]"
              quality={80}
              sizes="60px"
            />
            <div className="min-w-0 anim-rise [animation-delay:100ms]">
              <h1 className="title-display text-2xl">Corellium</h1>
              <p className="text-base leading-[1.6] text-ink-soft mt-1.5 sm:whitespace-nowrap">
                Mobile virtualization for cybersecurity teams
              </p>
            </div>
          </div>
          <div className="mt-6 sm:mt-7 bg-mockup-frame rounded-xl border border-border p-3 anim-rise [animation-delay:140ms] [view-transition-name:vt-corellium]">
            <LightboxImage
              src="/work/corellium/1.webp"
              alt="Corellium virtual device platform dashboard"
              width={1200}
              height={900}
              className="w-full"
              priority
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 680px"
            />
          </div>
          {/* Under the image, not above it: as chips these four wrapped to two
              rows at 390px and orphaned the last one, and the role — the only
              fact here about the designer rather than the company — read as a
              peer of "Acquired". Below the hero they are also read in the right
              order: what the project is, then what it looked like, then the
              particulars. Same component as the home hero. */}
          <StatRows rows={caseMeta} className="mt-6 anim-rise [animation-delay:180ms]" />
        </header>

        {/* Overview + Highlights */}
        <section id="overview" className="scroll-mt-16">
          <SectionLabel flow title="Overview" className="mb-6" />
          <p data-flow="0.5" className="text-base leading-[1.6] text-ink-soft mb-5">
            In 2023, I joined Corellium as the <span className="text-foreground font-semibold">solo designer</span> on a virtualization platform used by security researchers, enterprises, and government agencies to test mobile applications and firmware. I owned end-to-end product design across web and mobile, partnering with product and engineering teams to ship improvements while navigating the constraints of a complex platform.
          </p>
          <ul data-flow="0.5" className="list-disc pl-5 space-y-2 text-base leading-[1.6] text-ink-soft mb-6">
            <li>Shipped CI/CD-integrated mobile threat analysis tool, reducing review time for security teams</li>
            <li>Built the entire platform in Figma for the first time, with full mobile parity and a scalable design system</li>
            <li>Led WCAG accessibility initiative, enabling enterprise sales and streamlining compliance</li>
          </ul>
          {/* Metric box — same cell anatomy as the home stat bar: muted
              label, ink value, description only where it adds a fact */}
          <div data-flow className="grid grid-cols-1 sm:grid-cols-3 rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
              <p className="text-xs font-medium text-muted-foreground">Usability</p>
              <p className="text-lg sm:text-xl font-heading font-semibold leading-tight tabular-nums mt-1.5">SUS <CountUp to={81} /></p>
              <p className="text-sm leading-normal text-muted-foreground mt-1.5">Post-launch score via in-product surveys</p>
            </div>
            <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
              <p className="text-xs font-medium text-muted-foreground">Exit</p>
              <p className="text-lg sm:text-xl font-heading font-semibold leading-tight tabular-nums mt-1.5"><CountUp to={200} prefix="$" suffix="M" /></p>
              <p className="text-sm leading-normal text-muted-foreground mt-1.5">WCAG and design system work made the platform acquisition-ready</p>
            </div>
            <div className="px-5 py-[18px]">
              <p className="text-xs font-medium text-muted-foreground">Compliance</p>
              <p className="text-lg sm:text-xl font-heading font-semibold leading-tight tabular-nums mt-1.5">WCAG 2.1 AA</p>
              <p className="text-sm leading-normal text-muted-foreground mt-1.5">Accessibility work that unblocked enterprise sales</p>
            </div>
          </div>
        </section>

        {/* The Problem - Old Flow */}
        <section id="device-creation" className="scroll-mt-16">
          <SectionLabel flow title="Device Creation: The Core Experience" className="mb-6" />
          <div data-flow="0.5" className="space-y-3.5 text-base leading-[1.6] text-ink-soft mb-6">
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
          <FigureFrame number="01" caption="Device creation flow, original vs redesigned" variant="comparison">
            <ImageComparison
              beforeSrc="/work/corellium/2.webp"
              afterSrc="/work/corellium/3.webp"
              beforeAlt="FigJam diagram showing the original device creation flow with multiple steps and decision points"
              afterAlt="FigJam diagram showing the redesigned device creation flow with simplified steps"
              width={1200}
              height={900}
            />
          </FigureFrame>
        </section>

        {/* Redesign narrative + redesigned UI */}
        <section id="simplifying" className="scroll-mt-16">
          <SectionLabel flow title="Simplifying the Experience" className="mb-6" />
          <div data-flow="0.5" className="space-y-3.5 text-base leading-[1.6] text-ink-soft mb-6">
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
                height={900}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 680px"
              />
            </FigureFrame>
            {/* Before/After: original vs redesigned device configuration */}
            <FigureFrame number="03" caption="Device configuration, original vs redesigned" variant="comparison">
              <ImageComparison
                beforeSrc="/work/corellium/9.webp"
                afterSrc="/work/corellium/5.webp"
                beforeAlt="Original Corellium device configuration screen with separate firmware, storage, CPU, and RAM fields"
                afterAlt="Redesigned Corellium device selection interface"
                width={1200}
                height={900}
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

        {/* Insights */}
        <section id="insights" className="scroll-mt-16">
          <SectionLabel flow title="Insights" className="mb-6" />
          <div data-flow="0.5" className="space-y-3.5 text-base leading-[1.6] text-ink-soft mb-6">
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
              height={900}
              className="w-full"
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 680px"
            />
          </FigureFrame>
        </section>

        {/* CTA Section */}
        <section data-flow className="py-4 sm:py-6 text-center">
          <h2 className="title-display text-lg sm:text-xl mb-2">Let&apos;s ship something great.</h2>
          <p className="text-base text-muted-foreground mb-6">
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
