import type React from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CountUp } from "@/components/count-up"
import { DrawnRule } from "@/components/drawn-rule"
import { SectionLabel } from "@/components/section-label"
import { WorkCard, type WorkCardData } from "@/components/work-card"
import { cn } from "@/lib/utils"

/*
 * Grid siblings melt at slightly different rates as they leave the top of the
 * viewport. The spread is small enough that no card looks late — it just
 * removes the tell that they're one batch on one timer.
 */
const flowStagger = ["1", "1.07", "1.14"] as const

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

interface Stat {
  label: string
  value: React.ReactNode
  href?: string
  delayClass: string
}

/* Delays slot the cells in behind the hairline draw, ahead of the red period */
const stats: readonly Stat[] = [
  {
    label: "Experience",
    value: (
      <>
        <CountUp to={8} /> Years
      </>
    ),
    delayClass: "[animation-delay:400ms]",
  },
  { label: "Role", value: "Staff Product Designer", delayClass: "[animation-delay:470ms]" },
  { label: "Currently", value: "Corellium", href: "https://www.corellium.com", delayClass: "[animation-delay:540ms]" },
]

export default function Portfolio() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />

      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Hero — display type left, intro right, baseline-aligned. Lines
              rise out from behind their masks, the hairline draws, the red
              period stamps last. On scroll the whole block recedes: the title
              drifts up at 0.16 and thins to a quarter, the intro travels at
              half that and leaves entirely, handing the page to the work.
              data-recede lives on the outer element and the load animation on
              the inner one — a filled CSS animation would otherwise own
              transform for good and the parallax would never land. */}
          <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-x-10 md:gap-y-8 items-end">
            <h1 data-recede="title" className="title-display text-[44px] sm:text-6xl md:text-[72px]">
              <span className="anim-line-mask">
                <span className="block anim-line">Hi, I&apos;m</span>
              </span>
              <span className="anim-line-mask">
                <span className="block anim-line [animation-delay:90ms]">
                  Brendan<span className="text-primary inline-block anim-stamp">.</span>
                </span>
              </span>
            </h1>
            <div data-recede="meta">
              <p className="text-[15px] leading-[1.55] text-ink-soft anim-rise [animation-delay:180ms]">
                0 → 1 product designer and founder with 8 years of experience shipping B2B products at early-stage startups in healthcare, cybersecurity, and finance. Currently at <Link href="https://www.corellium.com" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">Corellium</Link>, simplifying complex cybersecurity workflows.
              </p>
            </div>
            <DrawnRule className="md:col-span-2" />
          </section>

          {/* Stat bar */}
          <dl data-flow className="flex flex-col sm:grid sm:grid-cols-3 border border-border bg-card">
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
                <dd className="text-lg sm:text-[26px] font-heading font-bold leading-tight text-right sm:text-left tabular-nums">
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

        {/* Selected Work */}
        <div data-flow>
          <SectionLabel title="Selected Work" counter="04" />
        </div>

        {/* data-flow rides a wrapper rather than the card itself so the card
            keeps sole ownership of its own hover transform */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedWork.map((project, index) => (
            <div key={project.title} data-flow={flowStagger[index % flowStagger.length]} className="h-full">
              {/* Preload only the first row (two cards); the rest lazy-load */}
              <WorkCard {...project} priority={index < 2} />
            </div>
          ))}
        </div>

        {/* Other Work */}
        <div data-flow className="pt-2 sm:pt-4">
          <SectionLabel title="Other Work" counter="03" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherWork.map((project, index) => (
            <div key={project.title} data-flow={flowStagger[index % flowStagger.length]} className="h-full">
              <WorkCard {...project} variant="other" />
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  )
}
