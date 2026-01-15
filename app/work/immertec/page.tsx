import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.immertec.title,
  description: `${projectDetails.immertec.description} by Brendan Ciccone, a 0 → 1 Staff Product Designer with 7 years of experience turning ideas into fully realized products.`,
  path: "/work/immertec",
  imageUrl: projectDetails.immertec.image.url,
  imageAlt: projectDetails.immertec.image.alt,
  imageWidth: 1200,
  imageHeight: 800,
});

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, TrendingUp, Timer, ThumbsUp } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/fade-in"
import { LightboxImage } from "@/components/lightbox"

export default function ImmertecPage() {
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
                src="/work/immertec/1.png"
                alt="Immertec platform showing a live surgical procedure with multiple participants"
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
                    src="/about/logos/immertec.jpeg"
                    alt="Immertec logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    quality={80}
                    sizes="48px"
                  />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold">Immertec</h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    VR medical training for live surgical procedures
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Founding Designer</Badge>
                <Badge>2018-2023</Badge>
                <Badge>Series A</Badge>
                <Badge>Healthcare</Badge>
              </div>
            </div>
          </FadeIn>
        </header>

        {/* Overview + Highlights */}
        <FadeIn delay={50} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-6">
              In 2018, I joined Immertec as the <span className="text-foreground font-medium">founding designer and second hire</span>. For the first two years, there was no product team. It was the cofounders and me shaping the product together across VR, web, and mobile. Over five years, we grew to <span className="text-foreground font-medium">50+ team members</span>, secured a <span className="text-foreground font-medium">$12M Series A</span>, and worked with top medtech companies to train surgical teams using real-time VR.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
              <li>Participated in investor meetings and created materials that contributed to $12M Series A</li>
              <li>Hired and managed 2 designers, establishing critique practices and documentation standards</li>
              <li>Published 3 papers on accessibility and VR in HFES and SSH journals</li>
              <li>Contributed to 4 company awards, including Startup of the Year (2019)</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4">
                <TrendingUp className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">SUS 68 → 83</p>
                <p className="text-sm text-muted-foreground">Increased usability score by 15 points through full redesign</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <Timer className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">Sales cycles cut 50%</p>
                <p className="text-sm text-muted-foreground">Reduced average customer sales cycles by half</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <ThumbsUp className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">NPS 80+</p>
                <p className="text-sm text-muted-foreground">Maintained exceptional user satisfaction and retention</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Virtual Reality Section */}
        <FadeIn delay={75} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Virtual Reality Viewer</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                At the core of our platform was the Virtual Reality Viewer, immersing healthcare professionals as if
                they were in the operating room. These were not simulations. When users donned a VR headset, they'd
                view live medical procedures and engage with peers in real-time from across the world.
              </p>
              <p>
                We conducted formal and informal research, observing real physicians during live procedures and collecting feedback after. For accessibility, we ran controlled in-person studies. Working with my colleague Dr. Shannon Bailey, we compiled <span className="text-foreground font-medium">30 years of VR human factors research</span> into a reusable design template <span className="text-foreground font-medium">before industry standards existed</span>. This R&D meant the designers I later hired could follow a proven process from day one, even without prior VR experience.
              </p>
              <p>
                I built designs in Sketch and previewed them using A-Frame, a JavaScript framework built on Three.js, to validate placement and comfort in the actual space. This template became the foundation for future design work, a repeatable system that enabled consistent VR experiences at scale. These improvements contributed to raising the platform's <span className="text-foreground font-medium">SUS score from 68 to 83</span>.
              </p>
              <p>
                One thing I pushed back on was showing a large list of active speakers in the VR environment. In an immersive space, sudden visual changes feel jarring. Instead, I advocated for highlighting speakers within the participant list, which rarely exceeded 10 people in most sessions.
              </p>
            </div>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/immertec/2.png"
                alt="Immertec VR interface showing participant list, medical imaging with annotations, and surgical procedure views"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </section>
        </FadeIn>

        {/* Admin Dashboard Section */}
        <FadeIn delay={100} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Admin Dashboard</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                Our primary users were physicians and surgeons in orthopedics, ENT, and other specialties, many from institutions like <span className="text-foreground font-medium">Harvard, Cleveland Clinic, and Baylor</span>. A smaller subset were sales managers and salespeople from medical device companies who scheduled events and managed invitations.
              </p>
              <p>
                Logistics were tracked and managed event-by-event in a mobile app at first. The mobile app existed to maintain <span className="text-foreground font-medium">HIPAA compliance</span>, verifying attendee identities since many of these were <span className="text-foreground font-medium">real surgeries and operations</span>, not simulation labs. Without a unified view of who needed headsets and who confirmed they'd attend, customer success was buried in manual coordination.
              </p>
              <p>
                Role-based permissions made sense because medical device sales reps managed events as admins, while physicians led or observed surgeries. One dashboard serving both groups eliminated the friction.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-muted rounded-xl overflow-hidden">
                <LightboxImage
                  src="/work/immertec/3.png"
                  alt="Immertec admin dashboard showing analytics overview, attendance trends, and user management interface"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/immertec/4.png"
                    alt="Immertec event metrics and calendar interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/immertec/5.png"
                    alt="Immertec headset request management interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/immertec/6.png"
                    alt="Immertec event list interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/immertec/7.png"
                    alt="Immertec media library interface"
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

        {/* Interactive Web Player Section */}
        <FadeIn delay={125} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Interactive Web Viewer</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                I noticed recurring issues while collaborating with customer success where users struggled to access
                events. Initially, it appeared to be an authentication user flow issue. I eventually discovered the
                core problem: joining events in a headset requires more steps than many of our users had the time to
                complete.
              </p>
              <p>
                To make joining an event seamless, <span className="text-foreground font-medium">I pitched a web-based interface</span>, allowing live event access on
                any device with a browser. It was a technical feat, as our engineering team managed to take
                live video initially meant for VR and display it perfectly on a 2D screen. This shift minimized the
                hassles of headset distribution and simplified event access while allowing for flexibility between VR
                and web-based experiences.
              </p>
              <p>
                Building a web viewer faced significant pushback internally because the company's core vision was VR and 3D medical training, and some saw it as diluting that. But the results were clear: customer success tickets for missing headsets and registration issues nearly disappeared. It let us get more attendees into events in whatever format worked for them, which <span className="text-foreground font-medium">cut sales cycles by 50%</span> for our medical device partners.
              </p>
              <p>New event? Just send the user a link.</p>
            </div>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/immertec/8.png"
                alt="Immertec web viewer interface showing live surgical procedure with participant list and interactive controls"
                width={1200}
                height={800}
                className="w-full"
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
              />
            </div>
          </section>
        </FadeIn>

        {/* Insights Section */}
        <FadeIn delay={150} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Insights</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                Designing in healthcare means navigating legal constraints that most industries don't face. Sometimes the ideal UX option simply isn't legally possible. You learn to find solutions within those boundaries rather than fight them.
              </p>
              <p>
                The web viewer taught me that conviction matters, but so does how you build support. Today I'd pair that conviction with earlier prototypes and data to bring stakeholders along faster.
              </p>
            </div>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/immertec/9.png"
                alt="Immertec sign-in interface showing streamlined authentication options"
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
        <FadeIn delay={175} duration={350}>
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
