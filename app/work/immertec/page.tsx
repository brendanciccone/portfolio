import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.immertec.title,
  description: `${projectDetails.immertec.description} by Brendan Ciccone, a 0 → 1 Senior Product Designer with 7 years of experience turning ideas into fully realized products.`,
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
import { FadeIn } from "@/components/fade-in"

export default function ImmertecPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-[1024px] mx-auto px-4 py-6 sm:py-8">
        <FadeIn delay={0} duration={350}>
          <div className="mb-6 sm:mb-10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center mr-3 bg-transparent overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ZB46OTsYlyreitEnm0AF94HXml0-xaEm3pRxEPLnB9hDdXRiA2ZaOQk1K2.webp"
                  alt="Immertec logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  quality={85}
                  sizes="40px"
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold">Immertec</h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 max-w-2xl">
              VR medical training for live surgical procedures
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-secondary px-3 py-1 rounded-full">2018 - 2023</span>
              <span className="text-xs bg-secondary px-3 py-1 rounded-full">Series A</span>
              <span className="text-xs bg-secondary px-3 py-1 rounded-full">Medtech</span>
            </div>
          </div>
        </FadeIn>

        <div className="space-y-12 sm:space-y-16">
          {/* Overview Section */}
          <FadeIn delay={50} duration={350}>
            <section>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Overview</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  In 2018, I joined Immertec as a Product Designer as the 2nd hire, where I spent a little over 5 years
                  leading all design initiatives. During this time, I was promoted to Senior Product Designer, we grew
                  to over 50 team members, secured our Series A round, and worked alongside top medical device companies
                  to train healthcare professionals in real-time using VR and other mediums.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Reduced average customer sales cycles by 50%</li>
                  <li>Increased usability through a redesign by 15%</li>
                  <li>Maintained an average NPS score of over 80</li>
                  <li>Published 3 papers on accessibility and virtual environments</li>
                  <li>Won 4 awards, including Startup of the Year in 2019</li>
                  <li>Assisted in fundraising efforts of a $12M Series A round</li>
                </ul>
              </div>
            </section>
          </FadeIn>

          <FadeIn delay={65} duration={350}>
            <section>
              <div className="bg-muted p-3 sm:p-4 rounded-lg mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-meLdgxzKW20Eu2GIZjlUfNS9shlB6f.png"
                  alt="Immertec platform showing a live surgical procedure with multiple participants, medical imaging views, and interactive controls"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
                  priority
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
            </section>
          </FadeIn>

          {/* Virtual Reality Section */}
          <FadeIn delay={85} duration={350}>
            <section>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Virtual Reality Viewer</h2>
              <div className="space-y-4 text-muted-foreground mb-6">
                <p>
                  At the core of our platform was the Virtual Reality Viewer, immersing healthcare professionals as if
                  they were in the operating room. These were not simulations. When users donned a VR headset, they'd
                  view live medical procedures and engage with peers in real-time from across the world.
                </p>
                <p>
                  Navigating the landscape of VR design was daunting at times, as established norms and testing
                  challenges were present. Despite this, we designed a template that allowed us to rapidly iterate in
                  Sketch or Figma and bring those designs into VR with nearly perfect placement and scaling.
                </p>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-LA41LuF5sSIT62tpvxty89U9pXq6fI.png"
                  alt="Immertec VR interface showing participant list, medical imaging with annotations, and surgical procedure views"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
                  priority
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
                  I worked closely with the co-founders and internal and external users while building interfaces for
                  mobile, web, and VR platforms.
                </p>
                <p>
                  One initial challenge was streamlining event creation and management. While some issues, like user
                  metrics and basic event management capabilities, were obvious, others were more ambiguous, such as
                  merging multiple user workflows or making certain features accessible to non-technical users.
                </p>
                <p>
                  Based on our research, we decided to segment functionalities based on user roles in one unified
                  dashboard. The admin dashboard freed up resources and empowered internal and external users to manage
                  events, headsets, organizations, and more.
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-muted p-3 sm:p-4 rounded-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-KU0EwkEyzN9ysxcYRZ58fyGf6ZfgR8.png"
                    alt="Immertec admin dashboard showing analytics overview, attendance trends, and user management interface"
                    width={1200}
                    height={800}
                    className="rounded-lg w-full"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-muted p-3 sm:p-4 rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-oXK3wJmwKyi6QagP3qI4uu9I6qlIeG.png"
                      alt="Immertec event metrics and calendar interface showing event statistics, scheduling, and management tools"
                      width={600}
                      height={400}
                      className="rounded-lg w-full"
                      quality={80}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 600px"
                    />
                  </div>
                  <div className="bg-muted p-3 sm:p-4 rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-abrW9mE5W3Cjk0AXupxWYF5AQQMmBT.png"
                      alt="Immertec headset request management interface showing request status, shipping details, and tracking information"
                      width={600}
                      height={400}
                      className="rounded-lg w-full"
                      quality={80}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 600px"
                    />
                  </div>
                </div>
                {/* Add another row of images */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-muted p-3 sm:p-4 rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-UYFYy1BDnDYurjBLbGTRNYF62se158.png"
                      alt="Immertec event list interface showing detailed event information, filtering options, and approval status for medical training sessions"
                      width={600}
                      height={400}
                      className="rounded-lg w-full"
                      quality={80}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 600px"
                    />
                  </div>
                  <div className="bg-muted p-3 sm:p-4 rounded-lg">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-7oCkNwC6dfvy2m4Fc5dqbrHad89C8d.png"
                      alt="Immertec media library interface showing searchable grid of surgical procedure images with upload functionality"
                      width={600}
                      height={400}
                      className="rounded-lg w-full"
                      quality={80}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 600px"
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
                  To make joining an event seamless, I introduced a web-based interface, allowing live event access on
                  any device with a browser. It was a technical feat, as our incredible engineering team managed to take
                  live video initially meant for VR and display it perfectly on a 2D screen. This shift minimized the
                  hassles of headset distribution and simplified event access while allowing for flexibility between VR
                  and web-based experiences.
                </p>
                <p>New event? Just send the user a link.</p>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17-min-bEqAYIUXZdyTO6YiwToLYQIQ7wwetJ.png"
                  alt="Immertec web viewer interface showing live surgical procedure with participant list, medical imaging overlays, and interactive controls for collaboration"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
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
                  Working with new technology is not easy, but it presents challenges that keep you interested in ways
                  other products may not. Combine that with the healthcare focus, and I felt I had an inherent reason
                  for solving the problems we were working on.
                </p>
                <p>
                  While I learned a lot about startups in the early days of the company, I think my biggest lesson was
                  one that can apply to nearly any role at any company: you may have the correct answer or idea, but how
                  you present it and when you present it matters almost as much as whether it's right or wrong.
                </p>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18-k1AacMyxarBVQjXec4gdARQddduncR.png"
                  alt="Immertec sign-in interface showing streamlined authentication options including email, Google, and Apple ID sign-in methods"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
            </section>
          </FadeIn>

          {/* CTA Section */}
          <FadeIn delay={175} duration={350}>
            <section className="py-10 sm:py-16 text-center mt-12">
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
        </div>

        <Footer />
      </div>
    </div>
  )
}

