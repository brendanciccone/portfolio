import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.immertec.title,
  description: `${projectDetails.immertec.description} by Brendan Ciccone, a 0 → 1 Staff Product Designer with 8 years of experience turning ideas into fully realized products.`,
  path: "/work/immertec",
  imageUrl: projectDetails.immertec.image.url,
  imageAlt: projectDetails.immertec.image.alt,
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
  WorkFigureSmall,
} from "@/components/work-section"

export default function ImmertecPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6">
        <FadeIn delay={0} duration={350}>
          <WorkHero
            num="002"
            name="Immertec"
            description="VR medical training for live surgical procedures."
            logo="/about/logos/immertec.jpeg"
            image="/work/immertec/1.png"
            imageAlt="Immertec platform showing a live surgical procedure with multiple participants"
            tags={["Founding Designer", "2018—2023", "Series A", "Healthcare"]}
          />
        </FadeIn>

        <FadeIn delay={50} duration={350}>
          <WorkSection num="01" title="Overview" meta="Context">
            <WorkProse>
              <p>
                In 2018, I joined Immertec as the{" "}
                <span className="text-foreground font-medium">founding designer and second hire</span>. For the first two years, there was no product team. It was the cofounders and me shaping the product together across VR, web, and mobile. Over five years, we grew to{" "}
                <span className="text-foreground font-medium">50+ team members</span>, secured a{" "}
                <span className="text-foreground font-medium">$12M Series A</span>, and worked with top medtech companies to train surgical teams using real-time VR.
              </p>
            </WorkProse>
            <ul className="list-none border-t border-foreground/15 divide-y divide-foreground/15">
              {[
                "Participated in investor meetings and created materials that contributed to $12M Series A.",
                "Hired and managed 2 designers, establishing critique practices and documentation standards.",
                "Published 3 papers on accessibility and VR in HFES and SSH journals.",
                "Contributed to 4 company awards, including Startup of the Year (2019).",
              ].map((line) => (
                <li key={line} className="py-2.5 flex gap-3 font-mono text-[13px] leading-relaxed text-muted-foreground">
                  <span className="text-foreground/40 flex-shrink-0">→</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <MetricGrid
              items={[
                { label: "SUS Score", value: "68 → 83", description: "Increased usability score by 15 points through full redesign." },
                { label: "Sales Cycle", value: "−50%", description: "Reduced average customer sales cycles by half." },
                { label: "NPS", value: "80+", description: "Maintained exceptional user satisfaction and retention." },
              ]}
            />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={75} duration={350}>
          <WorkSection num="02" title="Virtual Reality Viewer" meta="Core Surface">
            <WorkProse>
              <p>
                At the core of our platform was the Virtual Reality Viewer, immersing healthcare professionals as if they were in the operating room. These were not simulations. When users donned a VR headset, they&apos;d view live medical procedures and engage with peers in real-time from across the world.
              </p>
              <p>
                We conducted formal and informal research, observing real physicians during live procedures and collecting feedback after. For accessibility, we ran controlled in-person studies. Working with my colleague Dr. Shannon Bailey, we compiled <span className="text-foreground font-medium">30 years of VR human factors research</span> into a reusable design template <span className="text-foreground font-medium">before industry standards existed</span>. This R&amp;D meant the designers I later hired could follow a proven process from day one, even without prior VR experience.
              </p>
              <p>
                I built designs in Sketch and previewed them using A-Frame, a JavaScript framework built on Three.js, to validate placement and comfort in the actual space. This template became the foundation for future design work, a repeatable system that enabled consistent VR experiences at scale. These improvements contributed to raising the platform&apos;s <span className="text-foreground font-medium">SUS score from 68 to 83</span>.
              </p>
              <p>
                One thing I pushed back on was showing a large list of active speakers in the VR environment. In an immersive space, sudden visual changes feel jarring. Instead, I advocated for highlighting speakers within the participant list, which rarely exceeded 10 people in most sessions.
              </p>
            </WorkProse>
            <WorkFigure src="/work/immertec/2.png" alt="Immertec VR interface showing participant list, medical imaging with annotations, and surgical procedure views" caption="VR Viewer — Live Procedure" />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={100} duration={350}>
          <WorkSection num="03" title="Admin Dashboard" meta="Operations">
            <WorkProse>
              <p>
                Our primary users were physicians and surgeons in orthopedics, ENT, and other specialties, including those from Cleveland Clinic and Baylor. A smaller subset were sales managers and salespeople from medical device companies who scheduled events and managed invitations.
              </p>
              <p>
                Logistics were initially tracked event-by-event in a mobile app to maintain HIPAA compliance, verifying attendee identities since many of these were real surgeries. Without a unified view, customer success was buried in manual coordination.
              </p>
              <p>
                I designed the dashboard around three distinct user needs:{" "}
                <span className="text-foreground font-medium">sales reps creating and managing device training events, instructors preparing to lead live procedures, and attending physicians or students who just needed to show up informed</span>. Role-based permissions let each group see only what was relevant to them, reducing noise and eliminating the friction of one interface trying to serve everyone the same way.
              </p>
            </WorkProse>
            <div className="grid grid-cols-1 gap-4">
              <WorkFigure src="/work/immertec/3.png" alt="Immertec admin dashboard showing analytics overview, attendance trends, and user management interface" caption="Admin Dashboard — Overview" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <WorkFigureSmall src="/work/immertec/4.png" alt="Immertec event metrics and calendar interface" />
                <WorkFigureSmall src="/work/immertec/5.png" alt="Immertec headset request management interface" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <WorkFigureSmall src="/work/immertec/6.png" alt="Immertec event list interface" />
                <WorkFigureSmall src="/work/immertec/7.png" alt="Immertec media library interface" />
              </div>
            </div>
          </WorkSection>
        </FadeIn>

        <FadeIn delay={125} duration={350}>
          <WorkSection num="04" title="Interactive Web Viewer" meta="Pivot">
            <WorkProse>
              <p>
                I noticed recurring issues while collaborating with customer success where users struggled to access events. Initially, it appeared to be an authentication user flow issue. I eventually discovered the core problem: joining events in a headset requires more steps than many of our users had the time to complete.
              </p>
              <p>
                To make joining an event seamless, <span className="text-foreground font-medium">I pitched a web-based interface</span>, allowing live event access on any device with a browser. It was a technical feat, as our engineering team managed to take live video initially meant for VR and display it perfectly on a 2D screen. This shift minimized the hassles of headset distribution and simplified event access while allowing for flexibility between VR and web-based experiences.
              </p>
              <p>
                The web viewer required alignment across the team since the company&apos;s core vision was VR and 3D medical training. The results validated the decision: customer success tickets for missing headsets and registration issues nearly disappeared. It let us get more attendees into events in whatever format worked for them, which <span className="text-foreground font-medium">cut sales cycles by 50%</span> for our medical device partners.
              </p>
              <p>New event? Just send the user a link.</p>
            </WorkProse>
            <WorkFigure src="/work/immertec/8.png" alt="Immertec web viewer interface showing live surgical procedure with participant list and interactive controls" caption="Web Viewer — Live Surgical Procedure" />
          </WorkSection>
        </FadeIn>

        <FadeIn delay={150} duration={350}>
          <WorkSection num="05" title="Insights" meta="Reflection">
            <WorkProse>
              <p>
                The web viewer taught me that the best design decisions sometimes challenge a company&apos;s core assumptions. The entire business was built around VR, but users needed flexibility. I pushed for a browser-based alternative, built support across the team, and the results validated it. Today I&apos;d pair that conviction with earlier prototypes and data to bring stakeholders along faster.
              </p>
              <p>
                Five years as a founding designer in healthcare also shaped how I think about constraints.{" "}
                <span className="text-foreground font-medium">HIPAA, legal review, and compliance are design inputs from day one</span>
                , not afterthoughts.
              </p>
            </WorkProse>
            <WorkFigure src="/work/immertec/9.png" alt="Immertec sign-in interface showing streamlined authentication options" caption="Streamlined Sign-In" />
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
