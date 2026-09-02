import type React from "react"
import Header from "@/components/header"
import { tools } from "@/components/tool-icons"
import Link from "next/link"
import Footer from "@/components/footer"
import { GitHubHeatmap } from "@/components/github-heatmap"
import { SectionLabel } from "@/components/section-label"
import { Badge } from "@/components/ui/badge"
import { generatePageMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const metadata = generatePageMetadata({
  title: "About",
  path: "/about",
})

interface ExperienceEntry {
  role: string
  org: string
  date: string
  logo: { src: string; alt: string }
  url?: string
  external?: boolean
  /* How the engagement or the company ended — "Contract", "Acquired". Pulled
     out of the role string so the role is one job title on every row; rendered
     as a chip on the role line, because that is the line this list is scanned
     down. See ExperienceRow. */
  badge?: string
}

const experience: readonly ExperienceEntry[] = [
  {
    role: "Staff Product Designer",
    org: "Corellium",
    badge: "Acquired",
    date: "2023-Present",
    logo: { src: "/about/logos/corellium.jpeg", alt: "Corellium logo" },
    url: "https://www.corellium.com",
    external: true,
  },
  {
    role: "Senior Product Designer",
    org: "Spontivly",
    badge: "Contract",
    date: "2023",
    logo: { src: "/about/logos/spontivly.jpeg", alt: "Spontivly logo" },
    url: "https://www.spontivly.com",
    external: true,
  },
  {
    role: "Senior Product Designer",
    org: "FCB Health NY",
    badge: "Contract",
    date: "2023",
    logo: { src: "/about/logos/fcb_health_ny.jpeg", alt: "FCB Health logo" },
    url: "https://www.fcb.com",
    external: true,
  },
  {
    role: "Senior Product Designer",
    org: "Immertec",
    date: "2020-2023",
    logo: { src: "/about/logos/immertec.jpeg", alt: "Immertec logo" },
    url: "https://www.immertec.com",
    external: true,
  },
  {
    role: "Founding Product Designer",
    org: "Immertec",
    date: "2018-2020",
    logo: { src: "/about/logos/immertec.jpeg", alt: "Immertec logo" },
    url: "https://www.immertec.com",
    external: true,
  },
  {
    role: "Designer",
    org: "Four Pixels",
    date: "2015-2018",
    logo: { src: "/about/logos/four_pixels.jpeg", alt: "Four Pixels logo" },
    url: "https://www.fourpixels.xyz",
    external: true,
  },
]

const founderWork: readonly ExperienceEntry[] = [
  {
    role: "Founder",
    org: "Crenel",
    date: "2025",
    logo: { src: "/about/logos/crenel.jpeg", alt: "Crenel logo" },
  },
  {
    role: "Founder",
    org: "Magier",
    badge: "Acquired",
    date: "2023",
    logo: { src: "/about/logos/magier.jpeg", alt: "Magier logo" },
    url: "https://magier.ai",
    external: true,
  },
  {
    role: "Cofounder",
    org: "Biobox",
    date: "2021",
    logo: { src: "/about/logos/biobox.jpeg", alt: "Biobox logo" },
  },
  {
    role: "Founder",
    org: "Paidly",
    date: "2020",
    logo: { src: "/about/logos/paidly.jpeg", alt: "Paidly logo" },
    url: "/work/paidly",
  },
]

const certificates: readonly ExperienceEntry[] = [
  {
    role: "UX Management",
    org: "Nielsen Norman Group",
    date: "2020",
    logo: { src: "/about/logos/nielsen_norman_group.jpeg", alt: "Nielsen Norman Group logo" },
    url: "https://www.nngroup.com/ux-certification/people/",
    external: true,
  },
  {
    role: "Design Thinking",
    org: "Cornell University",
    date: "2019",
    logo: { src: "/about/logos/cornell.jpeg", alt: "Cornell University logo" },
  },
]

const publications = [
  {
    title: "The Next Generation of Virtual Reality: Recommendations for Accessible and Ergonomic Design",
    venue: "Ergonomics in Design: The Quarterly of Human Factors Applications",
    date: "Mar 23, 2021",
    url: "https://journals.sagepub.com/doi/10.1177/10648046211002578",
  },
  {
    title: "Virtual Reality, Augmented Reality, and Virtual Environments: Demonstrations of Current Technologies and Future Directions",
    venue: "Proceedings of the Human Factors and Ergonomics Society Annual Meeting",
    date: "Feb 9, 2021",
    url: "https://journals.sagepub.com/doi/abs/10.1177/1071181320641514",
  },
  {
    title: "Assessing Usability of Untethered Head-Mounted Displays for Medical Education: A Within-Person Randomized Trial",
    venue: "Society for Simulation in Healthcare",
    date: "Jan 31, 2021",
    url: "https://pubmed.ncbi.nlm.nih.gov/35093978/",
  },
]

const albums = [
  {
    name: "This Mirror Weighs a Ton",
    artist: "Interpol",
    cover: "/about/albums/album1.webp",
    url: "https://music.apple.com/us/album/this-mirror-weighs-a-ton/6768694728",
  },
  {
    name: "On Avery Island",
    artist: "Neutral Milk Hotel",
    cover: "/about/albums/album2.webp",
    url: "https://music.apple.com/us/album/on-avery-island/1839074660",
  },
  {
    name: "Life in Small Spaces",
    artist: "Black Marble",
    cover: "/about/albums/album3.webp",
    url: "https://music.apple.com/us/album/life-in-small-spaces/6768450506",
  },
  {
    name: "Greatest Hits, Vol. 2",
    artist: "Ovlov",
    cover: "/about/albums/album4.webp",
    url: "https://music.apple.com/us/album/greatest-hits-vol-2/1438672380",
  },
]

const books = [
  {
    name: "Parable of the Sower",
    author: "Octavia E. Butler",
    cover: "/about/books/book1.webp",
    url: "https://bookshop.org/p/books/parable-of-the-sower-a-novel-octavia-e-butler/251d041cc94c99c2?ean=9781538732182",
  },
]

/*
 * "Contract" and "Acquired" are badges on the role line, not text inside the
 * role.
 *
 * They were parenthetical suffixes on the job title — "Senior Product Designer
 * (Contract)", "Founder (Acquired)" — which made the longest role string on
 * the page 35 characters for the two entries needing the least emphasis, and
 * buried a qualifier inside a title that is otherwise identical between rows.
 * Pulled out, "Senior Product Designer" reads as the same job three times,
 * because it was.
 *
 * They sit on the role line rather than the org line under it because this
 * list is scanned rather than read: the role is the bold 14/600 the eye tracks
 * down, and the org is muted and second. A qualifier on the second line is
 * found only by someone already reading the row.
 *
 * At 12/600, the size the scale gives badges and the size the work cards
 * already render. An earlier pass here used 11/500, which is a step the ladder
 * does not have.
 *
 * Outlined, which is now the Badge default site-wide rather than anything
 * special to this list — see components/ui/badge.tsx. It happens to matter
 * most here: every row already opens with a hairline-bordered logo tile, so
 * the chip is made of the same line as the row around it, and a qualifier that
 * appears alone has to survive a scan.
 *
 * Corellium carries Acquired too. It was the one company on the page whose
 * outcome was missing — the bio two sections up cites the $200M Cellebrite
 * acquisition and the case study's own stat rows say Status / Acquired, so the
 * omission was an inconsistency rather than a decision.
 */
const ExperienceRow = ({ role, org, date, logo, url, external, badge }: ExperienceEntry): React.JSX.Element => {
  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 w-[34px] h-[34px] rounded-md border border-border bg-card flex items-center justify-center overflow-hidden">
        <Image src={logo.src} alt={logo.alt} width={34} height={34} className="w-full h-full object-contain" />
      </div>
      {/* Text left, date right, unchanged from where this started — the row
          only needed the badge to move, not the date. */}
      <div className="flex-1 flex justify-between min-w-0 gap-2">
        {/* Role, org and badge share one wrapping flex line-box rather than
            sitting in fixed lines, because the badge changes which line it
            belongs to.

            Above 480px it rides the role line. A list like this is scanned
            down its left edge, and the role is the bold 14/600 target that
            scan lands on — the org beneath it is muted and second in the path,
            so a qualifier there is read only by someone already reading the
            row rather than skimming it.

            On a phone there is no room for that. Role + badge + date needs
            317px on the widest row ("Staff Product Designer" + Acquired +
            2023-Present) against the 304 a 390px phone leaves after the tile,
            so the badge wrapped to a line of its own — where -my-1 (below)
            cancelled the gap above it and left the chip crammed between the
            role and the org, on a row 52px tall against a 34px logo tile.

            Below 480px it attaches to the org instead. That line is the one
            with room: muted 14/400 company names run 70-100px where the roles
            run 150-180, so the chip has 150px of slack to sit in and nothing
            wraps. It reads differently there — a qualifier on the company
            rather than on the job — but on a phone the row is read, not
            scanned down a column, so the scanning argument that puts it on the
            role line above 480 is not buying anything below it.

            480 rather than sm: sm is 640, and nothing here is constrained
            between 480 and 640 — that cut would restyle a layout that is not
            broken. 480 is the first round number clear of the 403px where the
            binding row actually starts to wrap, and it sits above every phone
            in portrait, so no handset straddles it.

            The badge is 22px tall — 12px text on a 16px line box, plus 2px of
            padding and 1px of border a side — against 14px of text either side
            of the break, so left alone it grows whichever line it lands on.
            -my-1 takes 4px off each end of its margin box, bringing what it
            contributes back to exactly the 14px the text occupies. It still
            paints at full size; it just stops pushing. That holds on the org
            line as well as the role line, which is why the swap is free.

            34 is not an arbitrary number to protect: the logo tile is 34px,
            and a row's text — 14px role, 6px gap, 14px org — comes to exactly
            34 too, so tile and text terminate on the same line. Letting the
            badge push instead evens the rows out at 42px and leaves every text
            block hanging 8px below its own logo.

            The overhang has room at both ends: 24px of list gap above, and the
            same below. */}
        <div className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <p className="w-full min-[480px]:w-auto font-semibold leading-none text-sm">{role}</p>
          {/* order pulls the badge ahead of the org above 480 and w-full drops
              the org to its own line there. Below it every item is order-0, so
              the three fall in DOM order — role, then org and badge together —
              and the DOM order is the one a screen reader wants either way:
              "Staff Product Designer, Corellium, Acquired". */}
          <p className="text-sm leading-none min-[480px]:order-2 min-[480px]:w-full">
            {url ? (
              <Link
                href={url}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-muted-foreground underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground transition-colors"
              >
                {org}
              </Link>
            ) : (
              <span className="text-muted-foreground">{org}</span>
            )}
          </p>
          {badge ? <Badge className="-my-1 min-[480px]:order-1">{badge}</Badge> : null}
        </div>
        <span className="text-xs text-muted-foreground flex-shrink-0 leading-none">
          {date}
        </span>
      </div>
    </li>
  )
}

export default function About() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <div className="max-w-[var(--page-width)] mx-auto px-5 pt-32 sm:pt-36 pb-6 sm:pb-8 flex flex-col gap-10 sm:gap-12">
        {/* Intro — display title + bio, single column */}
        {/* 12/16px between the title and the copy under it. It was 32, which
            is the gap this page uses between whole sections — so the standfirst
            was being spaced as though it were a separate section rather than
            part of the heading it belongs to. A title and the line that
            qualifies it read as one unit; the section rhythm resumes below. */}
        <section className="flex flex-col gap-3 sm:gap-4">
          {/* Same hero grammar as contact: the line rises out from behind
              its mask. The bio below takes the bidirectional flow, since it is
              real content rather than chrome. */}
          <h1 className="title-display text-2xl">
            <span className="anim-line-mask">
              <span className="block anim-line">
                About
              </span>
            </span>
          </h1>
          <div data-flow="0.5" className="flex flex-col gap-4 text-base leading-[1.6] text-ink-soft">
            <div className="space-y-4 anim-rise [animation-delay:120ms]">
              <p>
                I&apos;m a 0 → 1 product designer and founder with <span className="text-foreground font-semibold">8 years of experience</span> shipping B2B products at early-stage startups in healthcare, cybersecurity, and finance.
              </p>
              <p>
                As founding product designer at Immertec, I led a platform redesign that <span className="text-foreground font-semibold">increased SUS from 68 to 83</span>, hired and managed 2 product designers, and helped secure <span className="text-foreground font-semibold">$12M in Series A</span> funding. At Corellium, I owned end-to-end product design, shipped CI/CD-integrated threat analysis tools, and achieved an 81 SUS score that contributed to a <span className="text-foreground font-semibold">$200M acquisition</span> by Cellebrite.
              </p>
            </div>
            {/* The publications sentence that used to close this block is gone.
                Every fact in it — accessibility, virtual environments, HFES,
                SSH — appears verbatim in the Publications section below, in the
                paper titles and venues, and it named neither the journal nor a
                single study. The paragraphs around it earn their place by
                carrying what their lists cannot show: the Experience list has
                no room for an SUS score or an acquisition figure, and Founder
                Work has none for Techstars or the Coinbase intake. That one had
                nothing of its own, so it read as a hedge in front of stronger
                evidence. */}
            <div className="anim-rise [animation-delay:200ms]">
              <p>
                I founded Paidly in 2020, a Stripe-integrated invoicing app used by <span className="text-foreground font-semibold">over 2,000 SMEs</span>. In 2023 I started Magier, an AI startup that was <span className="text-foreground font-semibold">acquired the same year</span> and accepted into <span className="text-foreground font-semibold">Techstars&apos; 2024</span> cohort. In late 2025, I launched Crenel, a tool for automatic crossposting across social platforms, and was <span className="text-foreground font-semibold">selected for Coinbase&apos;s accelerator</span> (50 of 900+ applicants).
              </p>
            </div>
          </div>
        </section>

        {/* Descending order of substance: where I've worked, what I founded,
            how I work, then the receipts (talks, certificates), then what I'm
            into right now. How I Ship used to sit after Certificates, which put
            the one section describing how he actually works *below* two lists of
            credentials — and made the page bounce substance / credentials /
            substance / personal instead of running down in one direction. */}
        <section data-flow>
          <SectionLabel title="Experience" className="mb-5" />
          <ul className="space-y-6">
            {experience.map((entry) => (
              <ExperienceRow key={`${entry.org}-${entry.role}-${entry.date}`} {...entry} />
            ))}
          </ul>
        </section>

        <section data-flow="1.04">
          <SectionLabel title="Founder Work" className="mb-5" />
          <ul className="space-y-6">
            {founderWork.map((entry) => (
              <ExperienceRow key={`${entry.org}-${entry.role}-${entry.date}`} {...entry} />
            ))}
          </ul>
        </section>

        {/* How I Ship — tools plus the shipping proof under one roof */}
        <section data-flow="1.08">
          <SectionLabel title="How I Ship" className="mb-5" />
          <p className="text-base leading-[1.6] text-ink-soft mb-6 max-w-[560px]">
            <span className="text-foreground font-semibold">Figma</span> for fast exploration;{" "}
            <span className="text-foreground font-semibold">Claude Code</span> for anything I actually
            want to build.
          </p>
          {/* 34px tiles with rounded-md, the same object ExperienceRow gives a
              company logo two sections up. They were 48px rounded-lg, which
              made a row of tools the largest repeated element on the page —
              larger than the companies worked at and the companies founded,
              which is the wrong order of importance for a page that ranks its
              sections by substance. The mark inside stays proportional at 20px
              rather than filling the tile: a company logo is a square image
              that can bleed to the border, while these are transparent SVG
              marks that need the padding to read as icons rather than as
              stickers. */}
          <div className="flex flex-wrap gap-5 sm:gap-6">
            {tools.map((tool) => (
              <div
                key={tool.name}
                title={tool.name}
                className={cn(
                  "h-[34px] w-[34px] rounded-md border border-border flex items-center justify-center transition-[translate] duration-(--motion-settle) ease-(--ease-settle) hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-none",
                  tool.tile ?? "bg-card",
                )}
              >
                {/* unoptimized: static full-color SVGs must skip the Cloudflare image loader */}
                <Image src={tool.src} alt={`${tool.name} logo`} width={20} height={20} unoptimized className="h-5 w-5 object-contain" />
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mt-8 mb-4">
            GitHub Activity
          </h3>
          <GitHubHeatmap />
        </section>

        <section data-flow="1.12">
          <SectionLabel title="Publications" className="mb-5" />
          <div className="space-y-6">
            {publications.map((publication) => (
              <Link
                key={publication.url}
                href={publication.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-l border-border pl-4 transition-[translate] duration-(--motion-settle) ease-out hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:translate-none"
              >
                <h3 className="font-semibold text-base leading-snug mb-1.5 group-hover:underline">
                  {publication.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">{publication.venue}</p>
                <p className="text-xs text-muted-foreground">{publication.date}</p>
              </Link>
            ))}
          </div>
        </section>

        <section data-flow="1.16">
          <SectionLabel title="Certificates" className="mb-5" />
          <ul className="space-y-6">
            {certificates.map((entry) => (
              <ExperienceRow key={`${entry.org}-${entry.role}-${entry.date}`} {...entry} />
            ))}
          </ul>
        </section>

        {/* Currently */}
        <section data-flow className="flex flex-col">
          <SectionLabel title="Currently" className="mb-5" />
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Listening to</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {albums.map((album) => (
                  <Link
                    key={album.name}
                    href={album.url}
                    className="group flex flex-col hover-lift-opacity hover:opacity-90 hover:-translate-y-1 motion-reduce:hover:translate-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg border border-border">
                      <Image src={album.cover} alt={`${album.name} by ${album.artist}`} fill sizes="(max-width: 768px) 45vw, 220px" className="object-cover" />
                    </div>
                    <p className="text-sm font-medium">{album.name}</p>
                    <p className="text-xs text-muted-foreground">{album.artist}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Reading</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {books.map((book) => (
                  <Link
                    key={book.name}
                    href={book.url}
                    className="group flex flex-col hover-lift-opacity hover:opacity-90 hover:-translate-y-1 motion-reduce:hover:translate-none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative w-full aspect-[2/3] mb-2 overflow-hidden rounded-lg border border-border">
                      <Image src={book.cover} alt={`${book.name} by ${book.author}`} fill sizes="(max-width: 768px) 45vw, 220px" className="object-cover" />
                    </div>
                    <p className="text-sm font-medium">{book.name}</p>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  )
}
