import type React from "react"
import Header from "@/components/header"
import { tools } from "@/components/tool-icons"
import Link from "next/link"
import Footer from "@/components/footer"
import { FadeIn } from "@/components/fade-in"
import { GitHubHeatmap } from "@/components/github-heatmap"
import { SectionLabel } from "@/components/section-label"
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
}

const experience: readonly ExperienceEntry[] = [
  {
    role: "Staff Product Designer",
    org: "Corellium",
    date: "2023-Present",
    logo: { src: "/about/logos/corellium.jpeg", alt: "Corellium logo" },
    url: "https://www.corellium.com",
    external: true,
  },
  {
    role: "Senior Product Designer",
    org: "Spontivly",
    date: "2023",
    logo: { src: "/about/logos/spontivly.jpeg", alt: "Spontivly logo" },
    url: "https://www.spontivly.com",
    external: true,
  },
  {
    role: "Senior Product Designer",
    org: "FCB Health NY",
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
    url: "https://www.crenel.xyz",
    external: true,
  },
  {
    role: "Founder",
    org: "Magier",
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
    name: "Take Me to Your Leader",
    artist: "King Geedorah",
    cover: "/about/albums/album1.webp",
    url: "https://music.apple.com/us/album/take-me-to-your-leader/416318858",
  },
  {
    name: "I Looked Out",
    artist: "Greg Freeman",
    cover: "/about/albums/album2.webp",
    url: "https://music.apple.com/us/album/i-looked-out/1776689075",
  },
  {
    name: "Love Is Not Enough",
    artist: "Converge",
    cover: "/about/albums/album3.webp",
    url: "https://music.apple.com/us/album/love-is-not-enough/1848413292",
  },
  {
    name: "LOTTO",
    artist: "They Are Gutting a Body of Water",
    cover: "/about/albums/album4.webp",
    url: "https://music.apple.com/us/album/lotto/1821845532",
  },
]

const books = [
  {
    name: "Brave New World",
    author: "Aldous Huxley",
    cover: "/about/books/book1.webp",
    url: "https://bookshop.org/p/books/brave-new-world-aldous-huxley/f7c8af7eeabea853?ean=9780060850524&next=t",
  },
  {
    name: "Blood Meridian",
    author: "Cormac McCarthy",
    cover: "/about/books/book2.webp",
    url: "https://bookshop.org/p/books/blood-meridian-or-the-evening-redness-in-the-west-cormac-mccarthy/6697128?ean=9780679728757&next=t",
  },
]

const ExperienceRow = ({ role, org, date, logo, url, external }: ExperienceEntry): React.JSX.Element => {
  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 w-[34px] h-[34px] border border-border bg-card flex items-center justify-center overflow-hidden">
        <Image src={logo.src} alt={logo.alt} width={34} height={34} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 flex justify-between min-w-0 gap-2">
        <div className="min-w-0">
          <p className="font-semibold leading-none text-sm">{role}</p>
          <p className="text-[13px] mt-1.5 leading-none">
            {url ? (
              <Link
                href={url}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-primary hover:underline"
              >
                {org}
              </Link>
            ) : (
              <span className="text-primary">{org}</span>
            )}
          </p>
        </div>
        <span className="text-[11px] text-muted-foreground flex-shrink-0 leading-none uppercase tracking-wider">
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
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-6 sm:gap-8">
        {/* Intro — display title + 2-col bio */}
        <FadeIn delay={0} duration={350}>
          <section className="flex flex-col gap-6 sm:gap-8">
            {/* Same hero grammar as contact: title rises, period stamps in last, rule draws itself */}
            <h1 className="title-display text-[44px] sm:text-[60px]">
              <span className="inline-block anim-rise">
                About<span className="text-primary inline-block anim-stamp">.</span>
              </span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-9 text-[15px] leading-[1.55] text-ink-soft">
              <div className="space-y-4 anim-rise [animation-delay:120ms]">
                <p>
                  I&apos;m a staff product designer and founder with <span className="text-foreground font-semibold">8 years of experience</span> shipping B2B products at early-stage startups in healthcare, cybersecurity, and finance.
                </p>
                <p>
                  As founding product designer at Immertec, I led a platform redesign that <span className="text-foreground font-semibold">increased SUS from 68 to 83</span>, hired and managed 2 product designers, and helped secure <span className="text-foreground font-semibold">$12M in Series A</span> funding. At Corellium, I owned end-to-end product design, shipped CI/CD-integrated threat analysis tools, and achieved an 81 SUS score that contributed to a <span className="text-foreground font-semibold">$200M acquisition</span> by Cellebrite.
                </p>
              </div>
              <div className="space-y-4 anim-rise [animation-delay:200ms]">
                <p>
                  I founded Paidly in 2020, a Stripe-integrated invoicing app used by <span className="text-foreground font-semibold">over 2,000 SMEs</span>. In 2023 I started Magier, an AI startup that was <span className="text-foreground font-semibold">acquired the same year</span> and accepted into <span className="text-foreground font-semibold">Techstars&apos; 2024</span> cohort. In late 2025, I launched Crenel, a tool for automatic crossposting across social platforms, and was <span className="text-foreground font-semibold">selected for Coinbase&apos;s accelerator</span> (50 of 900+ applicants).
                </p>
                <p>
                  I&apos;ve also published research on accessibility and virtual environments in publications by the Human Factors and Ergonomics Society (HFES) and the Society for Simulation in Healthcare (SSH).
                </p>
              </div>
            </div>
            <div aria-hidden className="h-px bg-border anim-rule" />
          </section>
        </FadeIn>

        {/* Experience + Founder Work | Publications + Certificates */}
        <FadeIn delay={100} duration={350}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-stretch">
            <section className="sys-panel p-5 sm:p-7">
              <SectionLabel title="Experience" className="mb-6" />
              <ul className="space-y-6">
                {experience.map((entry) => (
                  <ExperienceRow key={`${entry.org}-${entry.role}-${entry.date}`} {...entry} />
                ))}
              </ul>

              <SectionLabel title="Founder Work" className="mt-10 mb-6" />
              <ul className="space-y-6">
                {founderWork.map((entry) => (
                  <ExperienceRow key={`${entry.org}-${entry.role}-${entry.date}`} {...entry} />
                ))}
              </ul>
            </section>

            <div className="flex flex-col gap-6">
              <section className="sys-panel p-5 sm:p-7 flex-1">
                <SectionLabel title="Publications" className="mb-6" />
                <div className="space-y-6">
                  {publications.map((publication) => (
                    <Link
                      key={publication.url}
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block border-l-2 border-primary pl-4 transition-[translate] duration-200 ease-out hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:translate-none"
                    >
                      <h3 className="font-semibold text-sm sm:text-base leading-snug mb-1.5 group-hover:underline">
                        {publication.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">{publication.venue}</p>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{publication.date}</p>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="sys-panel p-5 sm:p-7">
                <SectionLabel title="Certificates" className="mb-6" />
                <ul className="space-y-6">
                  {certificates.map((entry) => (
                    <ExperienceRow key={`${entry.org}-${entry.role}-${entry.date}`} {...entry} />
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </FadeIn>

        {/* How I Ship — tools plus the shipping proof under one roof */}
        <FadeIn delay={150} duration={350}>
          <section className="sys-panel p-5 sm:p-7">
            <SectionLabel title="How I Ship" className="mb-6" />
            <div className="flex flex-wrap gap-5 sm:gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  title={tool.name}
                  className={cn(
                    "h-12 w-12 border border-border flex items-center justify-center transition-[translate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-none",
                    tool.tile ?? "bg-card",
                  )}
                >
                  {/* unoptimized: static full-color SVGs must skip the Cloudflare image loader */}
                  <Image src={tool.src} alt={`${tool.name} logo`} width={24} height={24} unoptimized className="h-6 w-6 object-contain" />
                </div>
              ))}
            </div>

            <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mt-8 mb-4">
              GitHub Activity
            </h3>
            <GitHubHeatmap />
          </section>
        </FadeIn>

        {/* Currently */}
        <FadeIn delay={200} duration={350}>
          <section className="sys-panel p-5 sm:p-7 flex flex-col">
            <SectionLabel title="Currently" className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-4">Listening to</h3>
                <div className="grid grid-cols-2 gap-4">
                  {albums.map((album) => (
                    <Link
                      key={album.name}
                      href={album.url}
                      className="group flex flex-col hover-lift-opacity hover:opacity-90 hover:-translate-y-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative w-full aspect-square mb-2 overflow-hidden border border-border">
                        <Image src={album.cover} alt={`${album.name} by ${album.artist}`} fill className="object-cover" />
                      </div>
                      <p className="text-sm font-medium text-center">{album.name}</p>
                      <p className="text-xs text-muted-foreground text-center">{album.artist}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-4">Reading</h3>
                <div className="grid grid-cols-2 gap-[18px]">
                  {books.map((book) => (
                    <Link
                      key={book.name}
                      href={book.url}
                      className="group flex flex-col hover-lift-opacity hover:opacity-90 hover:-translate-y-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative w-full aspect-[2/3] mb-2 overflow-hidden border border-border">
                        <Image src={book.cover} alt={`${book.name} by ${book.author}`} fill className="object-cover" />
                      </div>
                      <p className="text-sm font-medium text-center">{book.name}</p>
                      <p className="text-xs text-muted-foreground text-center">{book.author}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <Footer />
      </div>
    </div>
  )
}
