import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.spontivly.title,
  description: `${projectDetails.spontivly.description} by Brendan Ciccone, a staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups.`,
  path: "/work/spontivly",
  imageUrl: projectDetails.spontivly.image.url,
  imageAlt: projectDetails.spontivly.image.alt,
  imageWidth: 1200,
  imageHeight: 800,
});

import Image from "next/image"
import { LightboxImage } from "@/components/lightbox"
import { ImageComparison } from "@/components/image-comparison"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FigureFrame } from "@/components/figure-frame"
import { SectionLabel } from "@/components/section-label"
import { SectionNav } from "@/components/section-nav"

const sections = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "website-redesign", number: "02", label: "Website" },
  { id: "dashboard-builder", number: "03", label: "Dashboards" },
  { id: "chart-customization", number: "04", label: "Charts" },
  { id: "insights", number: "05", label: "Insights" },
]

export default function SpontivlyPage() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <SectionNav items={sections} />
      
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-8 sm:gap-10">
        
        {/* Page header — full-bleed hero image in a mat frame, then title row */}
        <header>
          <div className="bg-mockup-frame border border-border p-3 anim-rise [view-transition-name:vt-spontivly]">
            <LightboxImage
              src="/work/spontivly/1.webp"
              alt="Spontivly social analytics dashboard showing engagement metrics, impression trends, and top performing content"
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
              src="/about/logos/spontivly.jpeg"
              alt="Spontivly logo"
              width={60}
              height={60}
              className="w-12 h-12 sm:w-[60px] sm:h-[60px] object-cover border border-input flex-shrink-0 anim-rise [animation-delay:60ms]"
              quality={80}
              sizes="60px"
            />
            <div className="min-w-0 anim-rise [animation-delay:100ms]">
              <h1 className="font-heading font-extrabold uppercase tracking-[-0.02em] text-2xl sm:text-[32px] leading-none sm:whitespace-nowrap">Spontivly</h1>
              <p className="text-[15px] text-muted-foreground mt-1.5 sm:whitespace-nowrap">
                Analytics dashboards for non-technical users
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:gap-1.5 sm:flex-1 sm:min-w-0 sm:items-end anim-rise [animation-delay:180ms]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Senior Product Designer (Contract)</p>
              <div className="flex flex-wrap gap-1.5 sm:justify-end">
                <Badge>2023</Badge>
                <Badge>Seed</Badge>
                <Badge>Analytics</Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Overview + Highlights */}
        <section id="overview" className="scroll-mt-16">
          <SectionLabel title="Overview" number="01" className="mb-6" />
          <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
            In 2023, I joined Spontivly as the <span className="text-foreground font-semibold">only designer at a venture-backed startup</span> focused on democratizing analytics dashboards. I also took on PM responsibilities: working directly with cofounders to understand vision and business goals, partnering with the head of engineering to prioritize and roadmap features, and <span className="text-foreground font-semibold">regularly joining sales calls and talking to customers</span> to inform product direction.
          </p>
          <ul className="list-[square] pl-5 space-y-2 text-[15px] leading-[1.7] text-ink-soft mb-6">
            <li>Adopted by professional sports teams including the Tampa Bay Rowdies</li>
            <li>Used by Carta and other notable B2B companies for stakeholder reporting</li>
            <li>Unified fragmented brand identity across marketing site and core platform</li>
          </ul>
          {/* Metric box — same cell anatomy as the home stat bar: red caps
              label, ink value, description only where it adds a fact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border border-border bg-card">
            <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Integrations</p>
              <p className="text-lg sm:text-[26px] font-heading font-bold leading-tight tabular-nums mt-1.5">120+ APIs</p>
              <p className="text-[13px] leading-normal text-muted-foreground mt-1.5">Supported in the redesigned platform</p>
            </div>
            <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Inbound leads</p>
              <p className="text-lg sm:text-[26px] font-heading font-bold leading-tight tabular-nums mt-1.5">2×</p>
              <p className="text-[13px] leading-normal text-muted-foreground mt-1.5">After relaunching the marketing site a month ahead of schedule</p>
            </div>
            <div className="px-5 py-[18px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Sales demos</p>
              <p className="text-lg sm:text-[26px] font-heading font-bold leading-tight tabular-nums mt-1.5">90%+</p>
              <p className="text-[13px] leading-normal text-muted-foreground mt-1.5">Powered by interactive prototypes personalized to each prospect</p>
            </div>
          </div>
        </section>

        {/* Website Redesign Section */}
        <section id="website-redesign" className="scroll-mt-16">
          <SectionLabel title="Website Redesign" number="02" className="mb-6" />
          <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
            My first project at Spontivly was redesigning the marketing website to <span className="text-foreground font-semibold">drive more leads</span> and establish a consistent brand voice. The brand was fragmented, so this redesign extended beyond the site to the core platform&apos;s visual identity. I <span className="text-foreground font-semibold">managed the project end-to-end</span>: scoping with marketing and founders, designing the system, advocating for an accessible CMS so anyone could manage content, then hiring and leading engineers to build it. We launched <span className="text-foreground font-semibold">over a month ahead of schedule</span> and <span className="text-foreground font-semibold">doubled inbound leads</span>.
          </p>
          {/* Before/After comparison slider */}
          <FigureFrame number="01" caption="Marketing site, before and after">
            <ImageComparison
              beforeSrc="/work/spontivly/2a.webp"
              afterSrc="/work/spontivly/2b.webp"
              beforeAlt="Spontivly website before redesign"
              afterAlt="Spontivly website after redesign"
              width={1200}
              height={800}
            />
          </FigureFrame>
        </section>

        {/* Dashboard Builder Section */}
        <section id="dashboard-builder" className="scroll-mt-16">
          <SectionLabel title="Dashboard Builder" number="03" className="mb-6" />
          <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
            I led the design of the analytics dashboard builder and an admin dashboard for managing user-created
            dashboards and permissions. The goal was to enable users to connect any API from social media, CRMs,
            and more and customize the generated charts and tables in a drag-and-drop builder. I collaborated
            closely with marketing, engineering, and co-founders to understand our users and their varied goals,
            from providing stakeholder reports to making data-driven decisions. I tried to steer the design toward
            something that felt familiar while still incorporating all of the features that make Spontivly a
            unique platform for data analysis.
          </p>
          <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
            I was regularly on sales calls and talking directly to customers, which meant I had a clear view of what users actually needed. The biggest challenge was <span className="text-foreground font-semibold">managing outsized demand against a small engineering team</span>. Not everything could ship immediately, so I worked with the engineering lead to prioritize ruthlessly and helped stakeholders understand constraints and timelines.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {/* Full width - Dashboard overview */}
            <FigureFrame number="02" caption="Dashboard overview">
              <LightboxImage
                src="/work/spontivly/3.webp"
                alt="Spontivly dashboard overview showing multiple dashboard cards for different purposes"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </FigureFrame>
            {/* 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FigureFrame number="03" caption="Profile settings">
                <LightboxImage
                  src="/work/spontivly/4.webp"
                  alt="Spontivly profile settings interface"
                  width={600}
                  height={400}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </FigureFrame>
              <FigureFrame number="04" caption="Team management">
                <LightboxImage
                  src="/work/spontivly/5.webp"
                  alt="Spontivly team management interface"
                  width={600}
                  height={400}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </FigureFrame>
            </div>
            {/* 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FigureFrame number="05" caption="Custom dashboard">
                <LightboxImage
                  src="/work/spontivly/6.webp"
                  alt="Spontivly dashboard interface"
                  width={600}
                  height={400}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </FigureFrame>
              <FigureFrame number="06" caption="Data visualization">
                <LightboxImage
                  src="/work/spontivly/7.webp"
                  alt="Spontivly data visualization interface"
                  width={600}
                  height={400}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </FigureFrame>
            </div>
            {/* Full width */}
            <FigureFrame number="07" caption="Drag-and-drop dashboard builder">
              <LightboxImage
                src="/work/spontivly/8.webp"
                alt="Spontivly dashboard builder interface"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </FigureFrame>
          </div>
        </section>

        {/* Chart Builder Section */}
        <section id="chart-customization" className="scroll-mt-16">
          <SectionLabel title="Chart Customization" number="04" className="mb-6" />
          <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
            Users needed granular control over their visualizations, but APIs returned data in wildly inconsistent formats. I worked with engineering to design{' '}
            <span className="text-foreground font-semibold">smart defaults and fallback states</span> so the charting experience felt consistent regardless of the data source. The goal was balancing power-user features with approachability so anyone could create meaningful visualizations without understanding the underlying data.
          </p>
          <FigureFrame number="08" caption="Chart customization">
            <LightboxImage
              src="/work/spontivly/9.webp"
              alt="Spontivly chart builder interface showing customization options"
              width={1200}
              height={800}
              className="w-full"
              quality={80}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
            />
          </FigureFrame>
        </section>

        {/* Insights */}
        <section id="insights" className="scroll-mt-16">
          <SectionLabel title="Insights" number="05" className="mb-6" />
          <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
            The hardest part wasn&apos;t the design work. It was managing a team of developers while keeping founder and customer expectations realistic against what we could actually ship. At a seed-stage startup with strong inbound interest, everyone wants everything now. My job was to absorb that pressure and translate it into a{" "}
            <span className="text-foreground font-semibold">buildable roadmap</span>
            {' '}without burning out the engineering team or losing stakeholder trust. I built the prioritization process across design, engineering, and founders:{' '}
            <span className="text-foreground font-semibold">shared criteria for what shipped next</span>
            , explicit tradeoffs when scope conflicted, and a rhythm that kept build capacity aligned with business goals.
          </p>
          <FigureFrame number="09" caption="Platform overview">
            <LightboxImage
              src="/work/spontivly/10.webp"
              alt="Spontivly platform interface"
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
