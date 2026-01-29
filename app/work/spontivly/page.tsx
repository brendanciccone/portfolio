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
import { LightboxImage } from "@/components/lightbox"
import { ImageComparison } from "@/components/image-comparison"
import Link from "next/link"
import { ArrowRight, Plug, Rocket, MousePointerClick } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/fade-in"

export default function SpontivlyPage() {
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
                src="/work/spontivly/1.png"
                alt="Spontivly social dashboard showing analytics and engagement metrics"
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
                    src="/about/logos/spontivly.jpeg"
                    alt="Spontivly logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    quality={80}
                    sizes="48px"
                  />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold">Spontivly</h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Analytics dashboards for non-technical users
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Senior Product Designer (Contract)</Badge>
                <Badge>2023</Badge>
                <Badge>Seed</Badge>
                <Badge>Analytics</Badge>
              </div>
            </div>
          </FadeIn>
        </header>

        {/* Overview + Highlights */}
        <FadeIn delay={50} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Overview</h2>
            <p className="text-muted-foreground mb-6">
              In 2023, I joined Spontivly as the <span className="text-foreground font-medium">only designer at a venture-backed startup</span> focused on democratizing analytics dashboards. I also took on PM responsibilities: working directly with cofounders to understand vision and business goals, partnering with the head of engineering to prioritize and roadmap features, and <span className="text-foreground font-medium">regularly joining sales calls and talking to customers</span> to inform product direction.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
              <li>Adopted by professional sports teams including the Tampa Bay Rowdies</li>
              <li>Used by Carta and other notable B2B companies for stakeholder reporting</li>
              <li>Unified fragmented brand identity across marketing site and core platform</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-4">
                <Plug className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">120+ APIs supported</p>
                <p className="text-sm text-muted-foreground">Over 120 API integrations supported in the newly designed platform</p>
              </div>
              <div className="bg-card rounded-xl p-4">
                <Rocket className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">Full website redesign</p>
                <p className="text-sm text-muted-foreground">Relaunched marketing website 1 month ahead of schedule, doubling inbound leads</p>
              </div>
              <div className="bg-card rounded-xl p-4">
                <MousePointerClick className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-base font-semibold mb-1">Powered 90%+ of sales demos</p>
                <p className="text-sm text-muted-foreground">Interactive prototypes I created to personalize demos to each prospect's brand</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Website Redesign Section */}
        <FadeIn delay={75} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Website Redesign</h2>
            <p className="text-muted-foreground mb-6">
              My first project at Spontivly was redesigning the marketing website to <span className="text-foreground font-medium">drive more leads</span> and establish a consistent brand voice. The brand was fragmented, so this redesign extended beyond the site to the core platform's visual identity. I <span className="text-foreground font-medium">managed the project end-to-end</span>: scoping with marketing and founders, designing the system, advocating for an accessible CMS so anyone could manage content, then hiring and leading engineers to build it. We launched <span className="text-foreground font-medium">over a month ahead of schedule</span> and <span className="text-foreground font-medium">doubled inbound leads</span>.
            </p>
            {/* Before/After comparison slider */}
            <div className="bg-muted rounded-xl overflow-hidden">
              <ImageComparison
                beforeSrc="/work/spontivly/2a.png"
                afterSrc="/work/spontivly/2b.png"
                beforeAlt="Spontivly website before redesign"
                afterAlt="Spontivly website after redesign"
                width={1200}
                height={800}
              />
            </div>
          </section>
        </FadeIn>

        {/* Dashboard Builder Section */}
        <FadeIn delay={100} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Dashboard Builder</h2>
            <p className="text-muted-foreground mb-6">
              I led the design of the analytics dashboard builder and an admin dashboard for managing user-created
              dashboards and permissions. The goal was to enable users to connect any API from social media, CRMs,
              and more and customize the generated charts and tables in a drag-and-drop builder. I collaborated
              closely with marketing, engineering, and co-founders to understand our users and their varied goals,
              from providing stakeholder reports to making data-driven decisions. I tried to steer the design toward
              something that felt familiar while still incorporating all of the features that make Spontivly a
              unique platform for data analysis.
            </p>
            <p className="text-muted-foreground mb-6">
              I was regularly on sales calls and talking directly to customers, which meant I had a clear view of what users actually needed. The biggest challenge was <span className="text-foreground font-medium">managing outsized demand against a small engineering team</span>. Not everything could ship immediately, so I worked with the engineering lead to prioritize ruthlessly and helped stakeholders understand constraints and timelines.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {/* Full width - Dashboard overview */}
              <div className="bg-muted rounded-xl overflow-hidden">
                <LightboxImage
                  src="/work/spontivly/3.png"
                  alt="Spontivly dashboard overview showing multiple dashboard cards for different purposes"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
              {/* 2-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/spontivly/4.png"
                    alt="Spontivly profile settings interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/spontivly/5.png"
                    alt="Spontivly team management interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>
              {/* 2-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/spontivly/6.png"
                    alt="Spontivly dashboard interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-muted rounded-xl overflow-hidden">
                  <LightboxImage
                    src="/work/spontivly/7.png"
                    alt="Spontivly data visualization interface"
                    width={600}
                    height={400}
                    className="w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              </div>
              {/* Full width */}
              <div className="bg-muted rounded-xl overflow-hidden">
                <LightboxImage
                  src="/work/spontivly/8.png"
                  alt="Spontivly dashboard builder interface"
                  width={1200}
                  height={800}
                  className="w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Chart Builder Section */}
        <FadeIn delay={125} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Chart Customization</h2>
            <p className="text-muted-foreground mb-6">
              Users needed granular control over their visualizations. The challenge was designing an interface that could pull data from APIs with wildly inconsistent structures and display it in a way that made sense to non-technical users. I designed a chart builder that balanced power-user features with approachability, allowing anyone to create meaningful visualizations without needing to understand the underlying data.
            </p>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/spontivly/9.png"
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

        {/* Insights */}
        <FadeIn delay={150} duration={350}>
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Insights</h2>
            <div className="space-y-4 text-muted-foreground mb-6">
              <p>
                The hardest part wasn't the design work. It was managing a team of developers while keeping founder and customer expectations realistic against what we could actually ship. At a seed-stage startup with strong inbound interest, everyone wants everything now. My job was to absorb that pressure and translate it into a buildable roadmap without burning out the engineering team or losing stakeholder trust.
              </p>
              <p>
                I also learned how crucial it is to balance complexity when designing for mixed audiences. Advanced users needed granular control; new users needed to not feel overwhelmed. The approach that worked was surfacing the most relevant features and pushing advanced options into the background while keeping them within reach.
              </p>
            </div>
            <div className="bg-muted rounded-xl overflow-hidden">
              <LightboxImage
                src="/work/spontivly/10.png"
                alt="Spontivly platform interface"
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
