import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { DrawnRule } from "@/components/drawn-rule"
import { FadeIn } from "@/components/fade-in"
import { SectionLabel } from "@/components/section-label"
import { WorkCard, type WorkCardData } from "@/components/work-card"
import { cn } from "@/lib/utils"

const selectedWork: readonly WorkCardData[] = [
  {
    title: "Corellium",
    description: "Mobile virtualization for cybersecurity teams",
    image: {
      src: "/work/corellium/1.webp",
      alt: "Corellium virtual device platform showing the device creation flow for mobile security testing",
    },
    tags: ["2023-Present", "Acquired", "Cybersecurity"],
    href: "/work/corellium",
  },
  {
    title: "Immertec",
    description: "VR medical training for live surgical procedures",
    image: {
      src: "/work/immertec/1.webp",
      alt: "Immertec VR medical training platform showing a live surgical procedure with multiple participating doctors, medical imaging views, and interactive controls for remote learning",
    },
    tags: ["2018-2023", "Series A", "Healthcare"],
    href: "/work/immertec",
  },
  {
    title: "Spontivly",
    description: "Analytics dashboards for non-technical users",
    image: {
      src: "/work/spontivly/1.webp",
      alt: "Spontivly social analytics dashboard showing engagement metrics, impression trends, and top performing content",
    },
    tags: ["2023", "Seed", "Analytics"],
    href: "/work/spontivly",
  },
  {
    title: "Paidly",
    description: "Stripe-integrated invoicing mobile app for SMEs",
    image: {
      src: "/work/paidly/1.webp",
      alt: "Paidly mobile app showing invoice list, automatic reminders feature, and customer creation form",
    },
    tags: ["2020", "Stripe Partner", "Fintech"],
    href: "/work/paidly",
  },
]

const otherWork: readonly WorkCardData[] = [
  {
    title: "Crenel",
    description: "Social analytics and automatic crossposting",
    image: {
      src: "/work/crenel/1.webp",
      alt: "Crenel autoposting platform showing automatic crossposting across social platforms",
    },
    tags: ["2025", "Coinbase Accelerator"],
    href: "https://www.crenel.xyz",
    external: true,
  },
  {
    title: "Magier",
    description: "Privacy-focused AI chatbot mobile app and platform",
    image: {
      src: "/work/magier/1.webp",
      alt: "Magier AI chatbot mobile app screens showing settings, chat interface, and subscription options",
    },
    tags: ["2023", "Acquired", "AI"],
  },
  {
    title: "Biobox",
    description: "Link-in-bio platform leveraging onchain data",
    image: {
      src: "/work/biobox/1.webp",
      alt: "Biobox link-in-bio platform leveraging onchain data",
    },
    tags: ["2021", "ETHGlobal Winner", "Web3"],
  },
]

const stats = [
  { label: "Experience", value: "8 Years", delayClass: "[animation-delay:300ms]" },
  { label: "Role", value: "Staff Product Designer", delayClass: "[animation-delay:380ms]" },
  { label: "Currently", value: "Corellium", href: "https://www.corellium.com", delayClass: "[animation-delay:460ms]" },
]

export default function Portfolio() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />

      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6 sm:gap-8">
        <FadeIn delay={0} duration={350}>
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Hero — display type left, intro right, baseline-aligned.
                Lines rise, the red period grows in place, the wave waves
                once, and the hairline draws itself once it's in view. */}
            <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-x-10 md:gap-y-8 items-end">
              <h1 className="title-display text-[44px] sm:text-6xl md:text-[72px]">
                <span className="block anim-rise">Hi, I&apos;m</span>
                <span className="block anim-rise [animation-delay:100ms]">
                  Brendan<span className="text-primary inline-block anim-grow">.</span>{" "}
                  <span aria-hidden className="inline-block">👋</span>
                </span>
              </h1>
              <p className="text-[15px] leading-[1.55] text-ink-soft anim-rise [animation-delay:200ms]">
                Staff product designer and founder with 8 years of experience shipping B2B products at early-stage startups in healthcare, cybersecurity, and finance. Currently at <Link href="https://www.corellium.com" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Corellium</Link>, simplifying complex cybersecurity workflows.
              </p>
              <DrawnRule className="md:col-span-2" />
            </section>

            {/* Stat bar */}
            <dl className="flex flex-col sm:grid sm:grid-cols-3 border border-border bg-card">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "p-4 sm:p-5 flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-stretch sm:justify-start sm:gap-1.5 min-w-0 anim-rise",
                    /* Cells rise in sequence behind the hero */
                    stat.delayClass,
                    index < stats.length - 1 && "border-b border-border sm:border-b-0 sm:border-r",
                  )}
                >
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{stat.label}</dt>
                  <dd className="text-lg sm:text-[26px] font-heading font-bold leading-tight text-right sm:text-left">
                    {stat.href ? (
                      <Link href={stat.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {stat.value}
                      </Link>
                    ) : (
                      stat.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>

        {/* Selected Work */}
        <FadeIn delay={25} duration={350}>
          <SectionLabel title="Selected Work" counter="04" />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedWork.map((project, index) =>
            index === 0 ? (
              <WorkCard key={project.title} {...project} priority />
            ) : (
              <FadeIn key={project.title} delay={50 + index * 25} duration={350}>
                {/* Preload only the first row (two cards); the rest lazy-load */}
                <WorkCard {...project} priority={index < 2} />
              </FadeIn>
            ),
          )}
        </div>

        {/* Other Work */}
        <FadeIn delay={175} duration={350}>
          <SectionLabel title="Other Work" counter="03" className="pt-2 sm:pt-4" />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherWork.map((project, index) => (
            <FadeIn key={project.title} delay={200 + index * 25} duration={350}>
              <WorkCard {...project} variant="other" />
            </FadeIn>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  )
}
