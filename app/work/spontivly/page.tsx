import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.spontivly.title,
  description: `${projectDetails.spontivly.description} by Brendan Ciccone, a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized products.`,
  path: "/work/spontivly",
  imageUrl: projectDetails.spontivly.image.url,
  imageAlt: projectDetails.spontivly.image.alt,
  imageWidth: 1200,
  imageHeight: 800,
});

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ImageComparison } from "@/components/image-comparison"
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
  WorkFigureSmall,
} from "@/components/work-section"

export default function SpontivlyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6">
        <FadeIn delay={0} duration={350}>
          <WorkHero
            num="003"
            name="Spontivly"
            description="Analytics dashboards for non-technical users."
            logo="/about/logos/spontivly.jpeg"
            image="/work/spontivly/1.png"
            imageAlt="Spontivly social analytics dashboard showing engagement metrics, impression trends, and top performing content"
            tags={["Senior Designer (Contract)", "2023", "Seed", "Analytics"]}
          />
        </FadeIn>

        <FadeIn delay={50} duration={350}>
          <WorkSection num="01" title="Overview" meta="Context">
            <WorkProse>
              <p>
                In 2023, I joined Spontivly as the{" "}
                <span className="text-foreground font-medium">only designer at a venture-backed startup</span> focused on democratizing analytics dashboards. I also took on PM responsibilities: working directly with cofounders to understand vision and business goals, partnering with the head of engineering to prioritize and roadmap features, and{" "}
                <span className="text-foreground font-medium">regularly joining sales calls and talking to customers</span> to inform product direction.
              </p>
            </WorkProse>
            <ul className="list-none border-t border-foreground/15 divide-y divide-foreground/15">
              {[
                "Adopted by professional sports teams including the Tampa Bay Rowdies.",
                "Used by Carta and other notable B2B companies for stakeholder reporting.",
                "Unified fragmented brand identity across marketing site and core platform.",
              ].map((line) => (
                <li key={line} className="py-2.5 flex gap-3 font-mono text-[13px] leading-relaxed text-muted-foreground">
                  <span className="text-foreground/40 flex-shrink-0">→</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <MetricGrid
              items={[
                { label: "Integrations", value: "120+", description: "API integrations supported in the newly designed platform." },
                { label: "Site Relaunch", value: "−1 Month", description: "Relaunched marketing website ahead of schedule, doubling inbound leads." },
                { label: "Demo Coverage", value: "90%+", description: "Interactive prototypes powering personalized sales demos." },
              ]}
            />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={75} duration={350}>
          <WorkSection num="02" title="Website Redesign" meta="Brand">
            <WorkProse>
              <p>
                My first project at Spontivly was redesigning the marketing website to <span className="text-foreground font-medium">drive more leads</span> and establish a consistent brand voice. The brand was fragmented, so this redesign extended beyond the site to the core platform&apos;s visual identity. I <span className="text-foreground font-medium">managed the project end-to-end</span>: scoping with marketing and founders, designing the system, advocating for an accessible CMS so anyone could manage content, then hiring and leading engineers to build it. We launched <span className="text-foreground font-medium">over a month ahead of schedule</span> and <span className="text-foreground font-medium">doubled inbound leads</span>.
              </p>
            </WorkProse>
            <div className="border border-foreground/30 bg-mockup-frame">
              <ImageComparison
                beforeSrc="/work/spontivly/2a.png"
                afterSrc="/work/spontivly/2b.png"
                beforeAlt="Spontivly website before redesign"
                afterAlt="Spontivly website after redesign"
                width={1200}
                height={800}
              />
            </div>
          </WorkSection>
        </FadeIn>

        <FadeIn delay={100} duration={350}>
          <WorkSection num="03" title="Dashboard Builder" meta="Core Surface">
            <WorkProse>
              <p>
                I led the design of the analytics dashboard builder and an admin dashboard for managing user-created dashboards and permissions. The goal was to enable users to connect any API from social media, CRMs, and more and customize the generated charts and tables in a drag-and-drop builder. I collaborated closely with marketing, engineering, and co-founders to understand our users and their varied goals, from providing stakeholder reports to making data-driven decisions. I tried to steer the design toward something that felt familiar while still incorporating all of the features that make Spontivly a unique platform for data analysis.
              </p>
              <p>
                I was regularly on sales calls and talking directly to customers, which meant I had a clear view of what users actually needed. The biggest challenge was{" "}
                <span className="text-foreground font-medium">managing outsized demand against a small engineering team</span>. Not everything could ship immediately, so I worked with the engineering lead to prioritize ruthlessly and helped stakeholders understand constraints and timelines.
              </p>
            </WorkProse>
            <div className="grid grid-cols-1 gap-4">
              <WorkFigure src="/work/spontivly/3.png" alt="Spontivly dashboard overview showing multiple dashboard cards for different purposes" caption="Dashboard Overview" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <WorkFigureSmall src="/work/spontivly/4.png" alt="Spontivly profile settings interface" />
                <WorkFigureSmall src="/work/spontivly/5.png" alt="Spontivly team management interface" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <WorkFigureSmall src="/work/spontivly/6.png" alt="Spontivly dashboard interface" />
                <WorkFigureSmall src="/work/spontivly/7.png" alt="Spontivly data visualization interface" />
              </div>
              <WorkFigure src="/work/spontivly/8.png" alt="Spontivly dashboard builder interface" caption="Dashboard Builder" />
            </div>
          </WorkSection>
        </FadeIn>

        <FadeIn delay={125} duration={350}>
          <WorkSection num="04" title="Chart Customization" meta="Detail">
            <WorkProse>
              <p>
                Users needed granular control over their visualizations, but APIs returned data in wildly inconsistent formats. I worked with engineering to design{" "}
                <span className="text-foreground font-medium">smart defaults and fallback states</span> so the charting experience felt consistent regardless of the data source. The goal was balancing power-user features with approachability so anyone could create meaningful visualizations without understanding the underlying data.
              </p>
            </WorkProse>
            <WorkFigure src="/work/spontivly/9.png" alt="Spontivly chart builder interface showing customization options" caption="Chart Builder" />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={150} duration={350}>
          <WorkSection num="05" title="Insights" meta="Reflection">
            <WorkProse>
              <p>
                The hardest part wasn&apos;t the design work. It was managing a team of developers while keeping founder and customer expectations realistic against what we could actually ship. At a seed-stage startup with strong inbound interest, everyone wants everything now. My job was to absorb that pressure and translate it into a{" "}
                <span className="text-foreground font-medium">buildable roadmap</span>{" "}
                without burning out the engineering team or losing stakeholder trust. I built the prioritization process across design, engineering, and founders:{" "}
                <span className="text-foreground font-medium">shared criteria for what shipped next</span>
                , explicit tradeoffs when scope conflicted, and a rhythm that kept build capacity aligned with business goals.
              </p>
            </WorkProse>
            <WorkFigure src="/work/spontivly/10.png" alt="Spontivly platform interface" caption="Platform Surface" />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={175} duration={350}>
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
