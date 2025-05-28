import { generatePageMetadata, projectDetails } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: projectDetails.spontivly.title,
  description: `${projectDetails.spontivly.description} by Brendan Ciccone, a 0 → 1 Senior Product Designer with 7 years of experience turning ideas into fully realized products.`,
  path: "/work/spontivly",
  imageUrl: projectDetails.spontivly.image.url,
  imageAlt: projectDetails.spontivly.image.alt,
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

export default function SpontivlyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-[1024px] mx-auto px-4 py-6 sm:py-8">
        <FadeIn delay={0} duration={350}>
          <div className="mb-6 sm:mb-10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center mr-3 bg-transparent overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sdtEuqGIPQw38owJSawPdDh1myE-dMMHZU0Y0hIYLLG1OoLVxrDe6ZqZlF.webp"
                  alt="Spontivly logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  quality={80}
                  sizes="40px"
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold">Spontivly</h1>
            </div>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 max-w-2xl">
              Data dashboards for non-technical users
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-secondary px-3 py-1 rounded-full">2023</span>
              <span className="text-xs bg-secondary px-3 py-1 rounded-full">Seed</span>
              <span className="text-xs bg-secondary px-3 py-1 rounded-full">Data</span>
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
                  In 2023, I joined Spontivly as the sole designer at a venture-backed startup focused on democratizing
                  data dashboards. I designed a platform that allowed non-technical users to build custom dashboards
                  without engineering support, enabling faster, more informed decisions across teams.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-foreground">Designed a dashboard platform supporting 120+ API integrations for non-technical users</li>
                  <li className="text-foreground">Collaborated with marketing to redesign the website and reduce onboarding friction</li>
                  <li className="text-foreground">Built interactive sales prototypes in Figma to support deal flow and shorten the sales cycle</li>
                </ul>
              </div>
            </section>
          </FadeIn>

          {/* Social Dashboard Section */}
          <FadeIn delay={75} duration={350}>
            <section>
              <div className="bg-muted p-3 sm:p-4 rounded-lg mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-WdXXd2S7UErPJUOdDGGcki7Gq9r0TN.png"
                  alt="Spontivly social dashboard showing analytics and engagement metrics"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
                />
              </div>
            </section>
          </FadeIn>

          {/* Website Redesign Section */}
          <FadeIn delay={100} duration={350}>
            <section>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Website Redesign</h2>
              <div className="space-y-4 text-muted-foreground mb-6">
                <p>
                  My first project at Spontivly was redesigning the marketing website to create a more consistent
                  message and visual language. I collaborated closely with the marketing team and presented concepts to
                  stakeholders, ensuring the new design aligned with the company's ethos. By advocating for an
                  accessible CMS, I enabled anyone in the company to manage content like blog posts. I led the
                  development and hired some of my engineering contacts, and we successfully launched the new site over
                  a month ahead of schedule.
                </p>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-WtBgFu7RPx0w5ppbt7HCyV17wHHwsK.png"
                  alt="Spontivly marketing website showing data dashboards without technical fuss tagline"
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

          {/* Dashboard Builder Section */}
          <FadeIn delay={125} duration={350}>
            <section>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Dashboard Builder</h2>
              <div className="space-y-4 text-muted-foreground mb-6">
                <p>
                  I led the design of the data dashboard builder and an admin dashboard for managing user-created
                  dashboards and permissions. The goal was to enable users to connect any API from social media, CRMs,
                  and more and customize the generated charts and tables in a drag-and-drop builder. I collaborated
                  closely with marketing, engineering, and co-founders to understand our users and their varied goals,
                  from providing stakeholder reports to making data-driven decisions. I tried to steer the design toward
                  something that felt familiar while still incorporating all of the features that make Spontivly a
                  unique platform for data analysis.
                </p>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-K6zVOHyu0haPpgDtEStbsDrwqDl1Lt.png"
                  alt="Spontivly dashboard overview showing multiple dashboard cards for different purposes like Recent Events, Sales Leads, and Social Overview, each with their integrated platforms"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
                />
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-GhS5M97fmuUUo2QbvcNDyiW97xc3bc.png"
                  alt="Spontivly profile settings interface showing personal information management and profile picture upload"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
                />
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-nAN6iIm4GpTngSI9u7hKN7O5l3tP9L.png"
                  alt="Spontivly team management interface showing member roles, permissions, and workspace access controls"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
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
                  This experience taught me a lot about designing data visualization and how crucial it is to balance a
                  product's complexity to satisfy advanced users without scaring off newcomers. At Spontivly, we struck
                  that balance, leading to noteworthy teams from various industries becoming users.
                </p>
                <p>
                  My key takeaway is that introducing complex features should be done strategically: prioritize the most
                  relevant features and push advanced options further into the background while still keeping them
                  within reach. This approach enhances usability for all skill levels and drives deeper engagement and
                  adoption among mixed user groups.
                </p>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-QASqlEIRz1pkUNGGxmLRjjUfAqOjDq.png"
                  alt="Spontivly chart builder interface showing customization options for data visualization"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full"
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

