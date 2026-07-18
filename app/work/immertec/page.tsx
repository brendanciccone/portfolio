import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.immertec.title,
  description: `${projectDetails.immertec.description} by Brendan Ciccone, a staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups.`,
  path: "/work/immertec",
  imageUrl: projectDetails.immertec.image.url,
  imageAlt: projectDetails.immertec.image.alt,
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

const sections = [
  { id: "overview", number: "01", label: "Overview" },
  { id: "vr-viewer", number: "02", label: "VR Viewer" },
  { id: "admin-dashboard", number: "03", label: "Dashboard" },
  { id: "web-viewer", number: "04", label: "Web Viewer" },
  { id: "insights", number: "05", label: "Insights" },
]

export default function ImmertecPage() {
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
                src="/work/immertec/1.webp"
                alt="Immertec platform showing a live surgical procedure with multiple participants"
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
                src="/about/logos/immertec.jpeg"
                alt="Immertec logo"
                width={60}
                height={60}
                className="w-12 h-12 sm:w-[60px] sm:h-[60px] object-cover border border-input flex-shrink-0 anim-rise [animation-delay:60ms]"
                quality={80}
                sizes="60px"
              />
              <div className="min-w-0 anim-rise [animation-delay:100ms]">
                <h1 className="font-heading font-extrabold uppercase tracking-[-0.02em] text-2xl sm:text-[32px] leading-none sm:whitespace-nowrap">Immertec</h1>
                <p className="text-[15px] text-muted-foreground mt-1.5 sm:whitespace-nowrap">
                  VR medical training for live surgical procedures
                </p>
              </div>
              <div className="flex flex-col gap-1.5 mt-2 sm:mt-0 sm:flex-1 sm:min-w-0 sm:items-end anim-rise [animation-delay:180ms]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Founding Designer</p>
                <div className="flex flex-wrap gap-1.5 sm:justify-end">
                  <Badge>2018-2023</Badge>
                  <Badge>Series A</Badge>
                  <Badge>Healthcare</Badge>
                </div>
              </div>
            </div>
            <DrawnRule />
          </FadeIn>
        </header>

        {/* Overview + Highlights */}
        <FadeIn delay={50} duration={350}>
          <section id="overview" className="py-8 sm:py-9 border-b border-border scroll-mt-16">
            <SectionLabel title="Overview" number="01" className="mb-6" />
            <p className="text-[15px] leading-[1.6] text-ink-soft mb-5">
              In 2018, I joined Immertec as the <span className="text-foreground font-semibold">founding designer and second hire</span>. For the first two years, there was no product team. It was the cofounders and me shaping the product together across VR, web, and mobile. Over five years, we grew to <span className="text-foreground font-semibold">50+ team members</span>, secured a <span className="text-foreground font-semibold">$12M Series A</span>, and worked with top medtech companies to train surgical teams using real-time VR.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[15px] leading-[1.7] text-ink-soft mb-6">
              <li>Participated in investor meetings and created materials that contributed to $12M Series A</li>
              <li>Hired and managed 2 designers, establishing critique practices and documentation standards</li>
              <li>Published 3 papers on accessibility and VR in HFES and SSH journals</li>
              <li>Contributed to 4 company awards, including Startup of the Year (2019)</li>
            </ul>
            {/* Metric box — 3 cells in one hairline frame, Archivo accent stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-border bg-card">
              <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
                <p className="text-[22px] font-heading font-extrabold text-primary leading-tight">SUS 68 → 83</p>
                <p className="text-[13px] leading-normal text-muted-foreground mt-2">Increased usability score by 15 points through full redesign</p>
              </div>
              <div className="px-5 py-[18px] border-b border-border sm:border-b-0 sm:border-r">
                <p className="text-[22px] font-heading font-extrabold text-primary leading-tight">Sales cycles cut 50%</p>
                <p className="text-[13px] leading-normal text-muted-foreground mt-2">Reduced average customer sales cycles by half</p>
              </div>
              <div className="px-5 py-[18px]">
                <p className="text-[22px] font-heading font-extrabold text-primary leading-tight">NPS 80+</p>
                <p className="text-[13px] leading-normal text-muted-foreground mt-2">Maintained exceptional user satisfaction and retention</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Virtual Reality Section */}
        <FadeIn delay={75} duration={350}>
          <section id="vr-viewer" className="py-8 sm:py-9 border-b border-border scroll-mt-16">
            <SectionLabel title="Virtual Reality Viewer" number="02" className="mb-6" />
            <div className="space-y-3.5 text-[15px] leading-[1.6] text-ink-soft mb-6">
              <p>
                At the core of our platform was the Virtual Reality Viewer, immersing healthcare professionals as if
                they were in the operating room. These were not simulations. When users donned a VR headset, they'd
                view live medical procedures and engage with peers in real-time from across the world.
              </p>
              <p>
                We conducted formal and informal research, observing real physicians during live procedures and collecting feedback after. For accessibility, we ran controlled in-person studies. Working with my colleague Dr. Shannon Bailey, we compiled <span className="text-foreground font-semibold">30 years of VR human factors research</span> into a reusable design template <span className="text-foreground font-semibold">before industry standards existed</span>. This R&D meant the designers I later hired could follow a proven process from day one, even without prior VR experience.
              </p>
              <p>
                I built designs in Sketch and previewed them using A-Frame, a JavaScript framework built on Three.js, to validate placement and comfort in the actual space. This template became the foundation for future design work, a repeatable system that enabled consistent VR experiences at scale. These improvements contributed to raising the platform's <span className="text-foreground font-semibold">SUS score from 68 to 83</span>.
              </p>
              <p>
                One thing I pushed back on was showing a large list of active speakers in the VR environment. In an immersive space, sudden visual changes feel jarring. Instead, I advocated for highlighting speakers within the participant list, which rarely exceeded 10 people in most sessions.
              </p>
            </div>
            <FigureFrame number="01" caption="VR viewer with participant list and medical imaging">
              <LightboxImage
                src="/work/immertec/2.webp"
                alt="Immertec VR interface showing participant list, medical imaging with annotations, and surgical procedure views"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </FigureFrame>
          </section>
        </FadeIn>

        {/* Admin Dashboard Section */}
        <FadeIn delay={100} duration={350}>
          <section id="admin-dashboard" className="py-8 sm:py-9 border-b border-border scroll-mt-16">
            <SectionLabel title="Admin Dashboard" number="03" className="mb-6" />
            <div className="space-y-3.5 text-[15px] leading-[1.6] text-ink-soft mb-6">
              <p>
                Our primary users were physicians and surgeons in orthopedics, ENT, and other specialties, including those from Cleveland Clinic and Baylor. A smaller subset were sales managers and salespeople from medical device companies who scheduled events and managed invitations.
              </p>
              <p>
                Logistics were initially tracked event-by-event in a mobile app to maintain HIPAA compliance, verifying attendee identities since many of these were real surgeries. Without a unified view, customer success was buried in manual coordination.
              </p>
              <p>
                I designed the dashboard around three distinct user needs:{' '}
                <span className="text-foreground font-semibold">sales reps creating and managing device training events, instructors preparing to lead live procedures, and attending physicians or students who just needed to show up informed</span>. Role-based permissions let each group see only what was relevant to them, reducing noise and eliminating the friction of one interface trying to serve everyone the same way.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <FigureFrame number="02" caption="Admin dashboard overview">
                <LightboxImage
                  src="/work/immertec/3.webp"
                  alt="Immertec admin dashboard showing analytics overview, attendance trends, and user management interface"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </FigureFrame>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FigureFrame number="03" caption="Event metrics and calendar">
                  <LightboxImage
                    src="/work/immertec/4.webp"
                    alt="Immertec event metrics and calendar interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </FigureFrame>
                <FigureFrame number="04" caption="Headset request management">
                  <LightboxImage
                    src="/work/immertec/5.webp"
                    alt="Immertec headset request management interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </FigureFrame>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FigureFrame number="05" caption="Event list">
                  <LightboxImage
                    src="/work/immertec/6.webp"
                    alt="Immertec event list interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </FigureFrame>
                <FigureFrame number="06" caption="Media library">
                  <LightboxImage
                    src="/work/immertec/7.webp"
                    alt="Immertec media library interface"
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

        {/* Interactive Web Player Section */}
        <FadeIn delay={125} duration={350}>
          <section id="web-viewer" className="py-8 sm:py-9 border-b border-border scroll-mt-16">
            <SectionLabel title="Interactive Web Viewer" number="04" className="mb-6" />
            <div className="space-y-3.5 text-[15px] leading-[1.6] text-ink-soft mb-6">
              <p>
                I noticed recurring issues while collaborating with customer success where users struggled to access
                events. Initially, it appeared to be an authentication user flow issue. I eventually discovered the
                core problem: joining events in a headset requires more steps than many of our users had the time to
                complete.
              </p>
              <p>
                To make joining an event seamless, <span className="text-foreground font-semibold">I pitched a web-based interface</span>, allowing live event access on
                any device with a browser. It was a technical feat, as our engineering team managed to take
                live video initially meant for VR and display it perfectly on a 2D screen. This shift minimized the
                hassles of headset distribution and simplified event access while allowing for flexibility between VR
                and web-based experiences.
              </p>
              <p>
                The web viewer required alignment across the team since the company's core vision was VR and 3D medical training. The results validated the decision: customer success tickets for missing headsets and registration issues nearly disappeared. It let us get more attendees into events in whatever format worked for them, which <span className="text-foreground font-semibold">cut sales cycles by 50%</span> for our medical device partners.
              </p>
              <p>New event? Just send the user a link.</p>
            </div>
            <FigureFrame number="07" caption="Web viewer during a live procedure">
              <LightboxImage
                src="/work/immertec/8.webp"
                alt="Immertec web viewer interface showing live surgical procedure with participant list and interactive controls"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </FigureFrame>
          </section>
        </FadeIn>

        {/* Insights Section */}
        <FadeIn delay={150} duration={350}>
          <section id="insights" className="py-8 sm:py-9 border-b border-border scroll-mt-16">
            <SectionLabel title="Insights" number="05" className="mb-6" />
            <div className="space-y-3.5 text-[15px] leading-[1.6] text-ink-soft mb-6">
              <p>
                The web viewer taught me that the best design decisions sometimes challenge a company's core assumptions. The entire business was built around VR, but users needed flexibility. I pushed for a browser-based alternative, built support across the team, and the results validated it. Today I'd pair that conviction with earlier prototypes and data to bring stakeholders along faster.
              </p>
              <p>
                Five years as a founding designer in healthcare also shaped how I think about constraints.{' '}
                <span className="text-foreground font-semibold">HIPAA, legal review, and compliance are design inputs from day one</span>
                , not afterthoughts.
              </p>
            </div>
            <FigureFrame number="08" caption="Streamlined sign-in">
              <LightboxImage
                src="/work/immertec/9.webp"
                alt="Immertec sign-in interface showing streamlined authentication options"
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
        <FadeIn delay={175} duration={350}>
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
