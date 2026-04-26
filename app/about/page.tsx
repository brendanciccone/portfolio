import Header from "@/components/header"
import Link from "next/link"
import Footer from "@/components/footer"
import { FadeIn } from "@/components/fade-in"
import { generatePageMetadata } from "@/lib/metadata"
import Image from "next/image"

export const metadata = generatePageMetadata({
  title: "About",
  path: "/about",
})

interface ExperienceItem {
  role: string
  company: string
  href?: string
  logo: string
  date: string
  tag?: string
}

const primaryExperience: ExperienceItem[] = [
  {
    role: "Staff Product Designer",
    company: "Corellium",
    href: "https://www.corellium.com",
    logo: "/about/logos/corellium.jpeg",
    date: "2023—Present",
    tag: "Acquired",
  },
  {
    role: "Senior Product Designer",
    company: "Spontivly",
    href: "https://www.spontivly.com",
    logo: "/about/logos/spontivly.jpeg",
    date: "2023",
    tag: "Contract",
  },
  {
    role: "Senior Product Designer",
    company: "FCB Health NY",
    href: "https://www.fcb.com",
    logo: "/about/logos/fcb_health_ny.jpeg",
    date: "2023",
    tag: "Contract",
  },
  {
    role: "Senior Product Designer",
    company: "Immertec",
    href: "https://www.immertec.com",
    logo: "/about/logos/immertec.jpeg",
    date: "2020—2023",
  },
  {
    role: "Founding Product Designer",
    company: "Immertec",
    href: "https://www.immertec.com",
    logo: "/about/logos/immertec.jpeg",
    date: "2018—2020",
  },
  {
    role: "Designer",
    company: "Four Pixels",
    href: "https://www.fourpixels.xyz",
    logo: "/about/logos/four_pixels.jpeg",
    date: "2015—2018",
  },
]

const otherExperience: ExperienceItem[] = [
  {
    role: "Founder",
    company: "Crenel",
    href: "https://www.crenel.xyz",
    logo: "/about/logos/crenel.jpeg",
    date: "2025",
    tag: "Coinbase Accelerator",
  },
  {
    role: "Founder",
    company: "Magier",
    href: "https://magier.ai",
    logo: "/about/logos/magier.jpeg",
    date: "2023",
    tag: "Acquired",
  },
  {
    role: "Cofounder",
    company: "Biobox",
    logo: "/about/logos/biobox.jpeg",
    date: "2021",
    tag: "ETHGlobal Winner",
  },
  {
    role: "Founder",
    company: "Paidly",
    href: "/work/paidly",
    logo: "/about/logos/paidly.jpeg",
    date: "2020",
  },
]

const ExperienceRow = ({ item }: { item: ExperienceItem }) => (
  <li className="flex items-center gap-3 py-3 border-t border-foreground/15 first:border-t-0">
    <div className="flex-shrink-0 w-9 h-9 border border-foreground/30 bg-mockup-frame overflow-hidden flex items-center justify-center">
      <Image
        src={item.logo}
        alt={`${item.company} logo`}
        width={36}
        height={36}
        className="w-full h-full object-contain"
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-mono text-[13px] font-medium leading-tight text-foreground truncate">
        {item.role}
      </div>
      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
        {item.href ? (
          <Link
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="hover:text-foreground transition-colors"
          >
            {item.company}
          </Link>
        ) : (
          <span>{item.company}</span>
        )}
        {item.tag ? <span className="sys-tag h-[18px] text-[9px] px-1.5">{item.tag}</span> : null}
      </div>
    </div>
    <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground flex-shrink-0">
      {item.date}
    </span>
  </li>
)

interface Publication {
  title: string
  href: string
  source: string
  date: string
}

const publications: Publication[] = [
  {
    title: "The Next Generation of Virtual Reality: Recommendations for Accessible and Ergonomic Design",
    href: "https://journals.sagepub.com/doi/10.1177/10648046211002578",
    source: "Ergonomics in Design — Quarterly of Human Factors Applications",
    date: "Mar 23, 2021",
  },
  {
    title: "Virtual Reality, Augmented Reality, and Virtual Environments: Demonstrations of Current Technologies and Future Directions",
    href: "https://journals.sagepub.com/doi/abs/10.1177/1071181320641514",
    source: "Proceedings of the Human Factors and Ergonomics Society Annual Meeting",
    date: "Feb 9, 2021",
  },
  {
    title: "Assessing Usability of Untethered Head-Mounted Displays for Medical Education: A Within-Person Randomized Trial",
    href: "https://pubmed.ncbi.nlm.nih.gov/35093978/",
    source: "Society for Simulation in Healthcare",
    date: "Jan 31, 2021",
  },
]

const certificates: ExperienceItem[] = [
  {
    role: "UX Management",
    company: "Nielsen Norman Group",
    href: "https://www.nngroup.com/ux-certification/people/",
    logo: "/about/logos/nielsen_norman_group.jpeg",
    date: "2020",
  },
  {
    role: "Design Thinking",
    company: "Cornell University",
    logo: "/about/logos/cornell.jpeg",
    date: "2019",
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

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-8">
        {/* About */}
        <FadeIn delay={0} duration={350}>
          <div className="sys-section">
            <span className="sys-section-num">[01]</span>
            <span className="sys-section-title">About</span>
            <div className="sys-section-rule" />
            <span className="sys-section-meta">Bio</span>
          </div>
        </FadeIn>

        <FadeIn delay={25} duration={350}>
          <section className="sys-cell">
            <div className="p-5 sm:p-7 space-y-4 font-mono text-[13px] leading-relaxed text-muted-foreground">
              <p>
                I&apos;m a staff product designer with{" "}
                <span className="text-foreground font-medium">8 years of experience</span> turning ideas into fully realized B2B products across healthcare, cybersecurity, and fintech.
              </p>
              <p>
                As founding product designer at Immertec, I led a platform redesign that{" "}
                <span className="text-foreground font-medium">increased SUS from 68 to 83</span>, hired and managed 2 product designers, and helped secure{" "}
                <span className="text-foreground font-medium">$12M in Series A</span> funding. At Corellium, I owned end-to-end product design, shipped CI/CD-integrated threat analysis tools, and achieved an 81 SUS score that contributed to a{" "}
                <span className="text-foreground font-medium">$200M acquisition</span> by Cellebrite.
              </p>
              <p>
                I founded Paidly in 2020, a Stripe-integrated invoicing app used by{" "}
                <span className="text-foreground font-medium">over 2,000 SMEs</span>. In 2023 I started Magier, an AI startup that was{" "}
                <span className="text-foreground font-medium">acquired the same year</span> and accepted into{" "}
                <span className="text-foreground font-medium">Techstars&apos; 2024</span> cohort. In late 2025, I built Crenel, a way to automatically crosspost across social platforms, and was{" "}
                <span className="text-foreground font-medium">selected for Coinbase&apos;s accelerator</span> (50 of 900+ applicants).
              </p>
              <p>
                I&apos;ve also published research on accessibility and virtual environments in publications by HFES and SSH.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Experience */}
        <FadeIn delay={50} duration={350}>
          <div className="sys-section">
            <span className="sys-section-num">[02]</span>
            <span className="sys-section-title">Experience</span>
            <div className="sys-section-rule" />
            <span className="sys-section-meta">{primaryExperience.length + otherExperience.length} Entries</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn delay={75} duration={350}>
            <section className="sys-cell">
              <header className="sys-cell-header">
                <span className="sys-cell-id">A</span>
                <span>Primary</span>
              </header>
              <div className="p-4 sm:p-5">
                <ul>
                  {primaryExperience.map((item, i) => (
                    <ExperienceRow key={`primary-${i}`} item={item} />
                  ))}
                </ul>
              </div>
              <header className="sys-cell-header border-t border-foreground">
                <span className="sys-cell-id">B</span>
                <span>Founding & Side</span>
              </header>
              <div className="p-4 sm:p-5">
                <ul>
                  {otherExperience.map((item, i) => (
                    <ExperienceRow key={`other-${i}`} item={item} />
                  ))}
                </ul>
              </div>
            </section>
          </FadeIn>

          <div className="flex flex-col gap-6">
            <FadeIn delay={100} duration={350}>
              <section className="sys-cell">
                <header className="sys-cell-header">
                  <span className="sys-cell-id">P</span>
                  <span>Publications</span>
                  <span className="ml-auto">{publications.length} Entries</span>
                </header>
                <ul className="p-4 sm:p-5">
                  {publications.map((pub, i) => (
                    <li
                      key={pub.href}
                      className={`py-4 ${i > 0 ? "border-t border-foreground/15" : "pt-0"}`}
                    >
                      <Link
                        href={pub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <h3 className="font-mono text-[13px] font-medium text-foreground leading-snug group-hover:underline underline-offset-4">
                          {pub.title}
                        </h3>
                        <p className="mt-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground leading-snug">
                          {pub.source}
                        </p>
                        <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                          {pub.date}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>

            <FadeIn delay={125} duration={350}>
              <section className="sys-cell">
                <header className="sys-cell-header">
                  <span className="sys-cell-id">C</span>
                  <span>Certificates</span>
                </header>
                <div className="p-4 sm:p-5">
                  <ul>
                    {certificates.map((cert, i) => (
                      <ExperienceRow key={`cert-${i}`} item={cert} />
                    ))}
                  </ul>
                </div>
              </section>
            </FadeIn>
          </div>
        </div>

        {/* Currently */}
        <FadeIn delay={150} duration={350}>
          <div className="sys-section">
            <span className="sys-section-num">[03]</span>
            <span className="sys-section-title">Currently</span>
            <div className="sys-section-rule" />
            <span className="sys-section-meta">Inputs</span>
          </div>
        </FadeIn>

        <FadeIn delay={175} duration={350}>
          <section className="sys-cell">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="md:border-r border-foreground p-5 sm:p-7">
                <p className="sys-label mb-5">Listening</p>
                <div className="grid grid-cols-2 gap-4">
                  {albums.map((album) => (
                    <Link
                      key={album.url}
                      href={album.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="relative w-full aspect-square mb-2 border border-foreground/40 overflow-hidden">
                        <Image
                          src={album.cover}
                          alt={`${album.name} by ${album.artist}`}
                          fill
                          className="object-cover transition-opacity group-hover:opacity-80"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      <p className="font-mono text-[12px] font-medium text-foreground leading-tight truncate">
                        {album.name}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground truncate">
                        {album.artist}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t md:border-t-0 border-foreground p-5 sm:p-7">
                <p className="sys-label mb-5">Reading</p>
                <div className="grid grid-cols-2 gap-4">
                  {books.map((book) => (
                    <Link
                      key={book.url}
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <div className="relative w-full aspect-[2/3] mb-2 border border-foreground/40 overflow-hidden">
                        <Image
                          src={book.cover}
                          alt={`${book.name} by ${book.author}`}
                          fill
                          className="object-cover transition-opacity group-hover:opacity-80"
                          sizes="(max-width: 768px) 25vw, 15vw"
                        />
                      </div>
                      <p className="font-mono text-[12px] font-medium text-foreground leading-tight truncate">
                        {book.name}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground truncate">
                        {book.author}
                      </p>
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
