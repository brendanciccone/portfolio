import type React from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { SectionLabel } from "@/components/section-label"
import { StatRows, type StatRow } from "@/components/stat-rows"
import { WorkCard, type WorkCardData } from "@/components/work-card"

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

/*
 * The hero's facts, lifted back out of the intro sentence.
 *
 * They were a three-cell bordered stat bar once, which cost 162px before the
 * first case study; the fix for that was to fold them into the intro as a
 * clause, which cost less height but put every fact behind a sentence you had
 * to read rather than scan — and left a six-line paragraph as the largest mass
 * on the page, out-weighing the title above it.
 *
 * As label/value rows they are scannable again for about 130px, and the intro
 * gets to be one line, which is what actually restored the title's rank. The
 * bordered box does not come back with them: it would put another rounded
 * container directly above the work cards, and the hairlines carry the same
 * information without competing with them.
 *
 * "Currently" holds the page's single link to corellium.com, which used to sit
 * in that sentence.
 */
const introStats: readonly StatRow[] = [
  { label: "Experience", value: "8 years" },
  { label: "Role", value: "Staff Product Designer" },
  {
    label: "Currently",
    value: (
      <Link
        href="https://www.corellium.com"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
      >
        Corellium
      </Link>
    ),
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

export default function Portfolio() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />

      <div className="max-w-[var(--page-width)] mx-auto px-5 pt-32 sm:pt-36 pb-6 sm:pb-8 flex flex-col gap-10 sm:gap-12">
          {/* Hero — title, then intro, then the rule. This ran as a 2fr/1fr
              split with the two baseline-aligned, which worked on the old 64rem
              rail; at 45rem the intro column came out ~210px wide and eight
              lines tall, so aligning the two-line title to its baseline dropped
              the title halfway down the viewport behind a void. Stacked, it
              also matches how About reads.

              The lines still rise out from behind their masks on load. What is
              gone is the hairline that used to close the block, and before that
              the scroll-linked recede:
              the block used to translate down at 0.16x the scroll and fade to a
              quarter, handing the page over to the work. That was written for a
              72px hero, where a title sinking slowly behind the content reads
              as depth. At 24px in a single column there is nothing to sink
              behind — it just looks like the title has come unstuck from the
              text under it, which is exactly how it read. */}
        {/* Greeting, one line of positioning, then the facts as rows.

            The greeting stays at 24 rather than growing. Tested at 26/28/30 it
            reads louder without reading more important — a hello does not earn
            display size, and 30 is where the contact page's "Let's ship
            something great" wraps to two lines at 390px, so the scale has a
            ceiling anyway. What the title was actually losing to was the mass
            underneath it: against six lines of intro it was outweighed by its
            own supporting copy. One line fixes the ratio without a single
            change to the title. */}
        <section className="flex flex-col gap-3 sm:gap-4">
          <h1 className="title-display text-2xl">
            <span className="anim-line-mask">
              <span className="block anim-line">Howdy! 🤠</span>
            </span>
          </h1>
          <div>
            {/* text-pretty stays: at one sentence a widow is less likely, but
                the measure still varies with the viewport and this is the part
                copy cannot control. */}
            <p className="text-base leading-[1.6] text-ink-soft text-pretty anim-rise [animation-delay:180ms]">
              I take B2B products from 0 → 1, in healthcare, cybersecurity, and finance.
            </p>
            {/* Lands after the intro in the entrance sequence rather than with
                it, so the facts read as a second beat */}
            <StatRows rows={introStats} className="mt-4 anim-rise [animation-delay:220ms]" />
          </div>
        </section>

        {/*
          Each label is grouped with the work it labels rather than floating as
          a sibling of it.

          Both were direct children of the page container, so a heading sat 48px
          above its own first card while the cards sat 24px from each other —
          the label was twice as far from the thing it names as that thing was
          from the next one, which reads as a heading belonging to nothing. The
          section wrapper pulls it to 20px, and the 48px page rhythm now falls
          between sections, where the separation is actually meant to be.

          Cards go 24 → 32. At 500px tall with a 24px gap they were closer to
          each other than a card's own image is to its own title.
        */}
        <section data-flow className="flex flex-col gap-5">
          <SectionLabel title="Selected Work" />

          {/* One card per row so the four career projects' screenshots land at
              full container width and visibly outrank the Other Work list
              below. data-flow rides a wrapper rather than the card itself so
              the card keeps sole ownership of its own hover transform. */}
          <div className="grid grid-cols-1 gap-8">
            {selectedWork.map((project, index) => (
              <div key={project.title} data-flow={flowStagger[index % flowStagger.length]} className="h-full">
                {/* Only the first card is above the fold; the rest lazy-load */}
                <WorkCard {...project} priority={index === 0} />
              </div>
            ))}
          </div>
        </section>

        {/* Tight at 12px from sm up, where these are list rows and a list only
            reads as one object while its items sit closer to each other than to
            anything outside it. On a phone they stack into ~400px cards, and a
            list gap between two cards that size reads as a rendering fault, so
            it opens to 24 — still half the plates' gap, which is what keeps
            them the lesser set. */}
        <section data-flow className="flex flex-col gap-5">
          <SectionLabel title="Other Work" />

          <div className="flex flex-col gap-6 sm:gap-3">
            {otherWork.map((project, index) => (
              <div key={project.title} data-flow={flowStagger[index % flowStagger.length]} className="h-full">
                <WorkCard {...project} variant="other" />
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
