import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.corellium.title,
  description: `${projectDetails.corellium.description} by Brendan Ciccone, a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized products.`,
  path: "/work/corellium",
  imageUrl: projectDetails.corellium.image.url,
  imageAlt: projectDetails.corellium.image.alt,
  imageWidth: 1200,
  imageHeight: 800,
});

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"
import { ImageComparison } from "@/components/image-comparison"
import {
  WorkSection,
  WorkHero,
  MetricGrid,
  WorkProse,
  WorkFigure,
} from "@/components/work-section"

export default function CorelliumPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6">
        <FadeIn delay={0} duration={350}>
          <WorkHero
            num="001"
            name="Corellium"
            description="Mobile virtualization for cybersecurity teams."
            logo="/about/logos/corellium.jpeg"
            image="/work/corellium/1.png"
            imageAlt="Corellium virtual device platform dashboard"
            tags={["Staff Product Designer", "2023—Present", "Acquired", "Cybersecurity"]}
          />
        </FadeIn>

        <FadeIn delay={50} duration={350}>
          <WorkSection num="01" title="Overview" meta="Context">
            <WorkProse>
              <p>
                In 2023, I joined Corellium as the{" "}
                <span className="text-foreground font-medium">solo designer</span> on a virtualization platform used by security researchers, enterprises, and government agencies to test mobile applications and firmware. I owned end-to-end product design across web and mobile, partnering with product and engineering teams to ship improvements while navigating the constraints of a complex platform.
              </p>
            </WorkProse>
            <ul className="list-none border-t border-foreground/15 divide-y divide-foreground/15">
              <li className="py-2.5 flex gap-3 font-mono text-[13px] leading-relaxed text-muted-foreground">
                <span className="text-foreground/40 flex-shrink-0">→</span>
                <span>Shipped CI/CD-integrated mobile threat analysis tool, reducing review time for security teams.</span>
              </li>
              <li className="py-2.5 flex gap-3 font-mono text-[13px] leading-relaxed text-muted-foreground">
                <span className="text-foreground/40 flex-shrink-0">→</span>
                <span>Built the entire platform in Figma for the first time, with full mobile parity and a scalable design system.</span>
              </li>
              <li className="py-2.5 flex gap-3 font-mono text-[13px] leading-relaxed text-muted-foreground">
                <span className="text-foreground/40 flex-shrink-0">→</span>
                <span>Led WCAG accessibility initiative, enabling enterprise sales and streamlining compliance.</span>
              </li>
            </ul>
            <MetricGrid
              items={[
                { label: "SUS Score", value: "81", description: "System Usability Scale post-launch." },
                { label: "Acquisition", value: "$200M", description: "WCAG and design system work helped make the platform acquisition-ready." },
                { label: "Compliance", value: "WCAG 2.1 AA", description: "Led accessibility initiative enabling enterprise sales." },
              ]}
            />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={75} duration={350}>
          <WorkSection num="02" title="Device Creation: The Core Experience" meta="Problem">
            <WorkProse>
              <p>
                Device creation is the most critical flow in the platform. It&apos;s how every user starts their work. If this flow is painful, the entire product feels painful.
              </p>
              <p>
                I first identified the friction through patterns in{" "}
                <span className="text-foreground font-medium">Intercom survey responses</span>
                , then mapped the existing flow to make it tangible for the product team. The existing experience required a{" "}
                <span className="text-foreground font-medium">minimum of 6 steps</span>, and no changes were saved between steps. Going back to change something as simple as which project a device belonged to would revert all your selections, adding up to 6 more steps. That&apos;s{" "}
                <span className="text-foreground font-medium">12 steps worst case</span> for a flow every single user hits. Unclear decision points, redundant inputs, and a structure that punished users for changing their mind.
              </p>
              <p>
                I advocated for this redesign for over a year. It was consistently deprioritized because the roadmap favored feature additions that kept us ahead of competitors and that existing customers were actively requesting.{" "}
                <span className="text-foreground font-medium">Foundational UX work rarely has a customer asking for it by name.</span>{" "}
                The opportunity came when a PM&apos;s roadmap had capacity and I could demonstrate how the fix would solve pain points for his user segment. I presented first to him and the head of front-end engineering, then shared it with the wider product team. Timing and alignment mattered as much as the solution.
              </p>
            </WorkProse>
            <div className="border border-foreground/30 bg-mockup-frame">
              <ImageComparison
                beforeSrc="/work/corellium/2.png"
                afterSrc="/work/corellium/3.png"
                beforeAlt="FigJam diagram showing the original device creation flow with multiple steps and decision points"
                afterAlt="FigJam diagram showing the redesigned device creation flow with simplified steps"
                width={1200}
                height={800}
              />
            </div>
          </WorkSection>
        </FadeIn>

        <FadeIn delay={100} duration={350}>
          <WorkSection num="03" title="Simplifying the Experience" meta="Solution">
            <WorkProse>
              <p>
                The goal was to reduce cognitive load and eliminate unnecessary steps without sacrificing flexibility. I redesigned the flow to <span className="text-foreground font-medium">3 steps</span>. One click gives you the latest iOS, Android, or IoT device with smart defaults. Power users can still customize everything, but the common path is now fast. Making changes no longer punished users with extra steps. Users could adjust device type, OS version, project, and advanced options without starting over.
              </p>
              <p>
                <span className="text-foreground font-medium">
                  What previously took up to 3 minutes now takes 10 to 30 seconds
                </span>
                {" "}depending on complexity. I designed the system to be modular, handling complex IoT devices with unique configuration requirements just as easily as standard iOS or Android setups. Future device types can be added without rearchitecting the experience, whether for new use cases or entirely new revenue lines.
              </p>
            </WorkProse>
            <div className="grid grid-cols-1 gap-4">
              <WorkFigure src="/work/corellium/4.png" alt="Corellium project selection interface" caption="Step 01 — Project Selection" />
              <WorkFigure src="/work/corellium/5.png" alt="Corellium iOS device selection interface" caption="Step 02 — Device Selection" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <WorkFigure src="/work/corellium/6.png" alt="Corellium Android device selection" caption="Android Variant" />
                <WorkFigure src="/work/corellium/8.png" alt="Corellium device creation modal" caption="Confirmation Modal" />
              </div>
            </div>
          </WorkSection>
        </FadeIn>

        <FadeIn delay={125} duration={350}>
          <WorkSection num="04" title="Insights" meta="Reflection">
            <WorkProse>
              <p>
                In B2B enterprise, customer requests translate directly to revenue, which means platform-wide UX improvements often lose the prioritization battle. Find the intersection between what users need and what a PM can justify on their roadmap to get foundational work shipped.
              </p>
              <p>
                Beyond this project, I partnered with the head of front-end engineering to lead the{" "}
                <span className="text-foreground font-medium">
                  WCAG accessibility initiative that unblocked enterprise sales
                </span>
                . He handled engineering, I handled design, and together we aligned the entire design system. I also{" "}
                <span className="text-foreground font-medium">
                  standardized the product design process across 3 PMs, 2 POs, and their teams
                </span>
                , replacing one constantly out-of-sync file with a system that kept design specs current for specific tickets and bodies of work.
              </p>
            </WorkProse>
            <WorkFigure src="/work/corellium/7.png" alt="Corellium IoT device selection showing modular configuration" caption="Modular IoT Configuration" />
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
