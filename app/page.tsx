import Header from "@/components/header"
import Link from "next/link"
import Footer from "@/components/footer"
import { FadeIn } from "@/components/fade-in"
import { LightboxImage } from "@/components/lightbox"
import { MockupImage } from "@/components/mockup-image"

interface Entry {
  id: string
  year: string
  name: string
  description: string
  tags: string[]
  image: string
  alt: string
  href: string
  external?: boolean
  useLightbox?: boolean
}

const selected: Entry[] = [
  {
    id: "001",
    year: "2023—",
    name: "Corellium",
    description: "Mobile virtualization for cybersecurity teams.",
    tags: ["Cybersecurity", "Acquired", "B2B"],
    image: "/work/corellium/1.png",
    alt: "Corellium virtual device platform showing the device creation flow for mobile security testing",
    href: "/work/corellium",
  },
  {
    id: "002",
    year: "2018—2023",
    name: "Immertec",
    description: "VR medical training for live surgical procedures.",
    tags: ["Healthcare", "Series A", "Founding"],
    image: "/work/immertec/1.png",
    alt: "Immertec VR medical training platform showing a live surgical procedure with multiple participating doctors, medical imaging views, and interactive controls for remote learning",
    href: "/work/immertec",
  },
  {
    id: "003",
    year: "2023",
    name: "Spontivly",
    description: "Analytics dashboards for non-technical users.",
    tags: ["Analytics", "Seed", "Contract"],
    image: "/work/spontivly/1.png",
    alt: "Spontivly social analytics dashboard showing engagement metrics, impression trends, and top performing content",
    href: "/work/spontivly",
  },
  {
    id: "004",
    year: "2020",
    name: "Paidly",
    description: "Stripe-integrated invoicing mobile app for SMEs.",
    tags: ["Fintech", "Stripe Partner", "Founder"],
    image: "/work/paidly/1.png",
    alt: "Paidly mobile app showing invoice list, automatic reminders feature, and customer creation form",
    href: "/work/paidly",
  },
]

const other: Entry[] = [
  {
    id: "005",
    year: "2025",
    name: "Crenel",
    description: "Reach everywhere with automatic crossposting.",
    tags: ["Coinbase Accelerator", "2025"],
    image: "/work/crenel/1.png",
    alt: "Crenel autoposting platform showing automatic crossposting across social platforms",
    href: "https://www.crenel.xyz",
    external: true,
  },
  {
    id: "006",
    year: "2023",
    name: "Magier",
    description: "Privacy-focused AI chatbot mobile app.",
    tags: ["AI", "Acquired"],
    image: "/work/magier/1.png",
    alt: "Magier AI chatbot mobile app screens showing settings, chat interface, and subscription options",
    href: "#",
    useLightbox: true,
  },
  {
    id: "007",
    year: "2021",
    name: "Biobox",
    description: "Link-in-bio platform leveraging onchain data.",
    tags: ["Web3", "ETHGlobal Winner"],
    image: "/work/biobox/1.png",
    alt: "Biobox link-in-bio platform leveraging onchain data",
    href: "#",
    useLightbox: true,
  },
]

interface ProjectCardProps {
  entry: Entry
  priority?: boolean
  size?: "lg" | "sm"
}

const ProjectCard = ({ entry, priority, size = "lg" }: ProjectCardProps) => {
  const inner = (
    <>
      <header className="sys-cell-header">
        <span className="sys-cell-id">{entry.id}</span>
        <span className="text-foreground/40">/</span>
        <span>{entry.year}</span>
        <span className="ml-auto">{entry.tags[0]}</span>
      </header>
      <div className="sys-cell-media">
        {entry.useLightbox ? (
          <LightboxImage
            src={entry.image}
            alt={entry.alt}
            width={1200}
            height={800}
            className="w-full"
            quality={80}
            priority={priority}
            sizes={
              size === "lg"
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 340px"
            }
          />
        ) : (
          <MockupImage
            src={entry.image}
            alt={entry.alt}
            width={1200}
            height={800}
            className="w-full transition-transform duration-300 ease-out transform-gpu group-hover:scale-[1.02]"
            quality={80}
            priority={priority}
            sizes={
              size === "lg"
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 512px"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 340px"
            }
          />
        )}
      </div>
      <div className="px-4 sm:px-5 py-5 sm:py-6 flex flex-col gap-4">
        <div>
          <h2
            className={`sys-display ${size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"} mb-2`}
          >
            {entry.name}
          </h2>
          <p className="font-mono text-[13px] leading-relaxed text-muted-foreground">
            {entry.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-foreground/15">
          {entry.tags.map((tag) => (
            <span key={tag} className="sys-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  if (entry.useLightbox) {
    return <div className="group sys-cell">{inner}</div>
  }

  return (
    <Link
      href={entry.href}
      target={entry.external ? "_blank" : undefined}
      rel={entry.external ? "noopener noreferrer" : undefined}
      className="group sys-cell-link"
    >
      {inner}
    </Link>
  )
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-[1024px] mx-auto px-5 pt-24 pb-6 sm:pb-8 flex flex-col gap-8">
        {/* Intro / identity strip */}
        <FadeIn delay={0} duration={350}>
          <section className="border border-foreground">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
              <div className="p-5 sm:p-6">
                <p className="sys-label mb-3">Brief / 001</p>
                <h1 className="sys-display text-2xl sm:text-[28px] mb-4">
                  Staff Product Designer.<br />0 → 1 across B2B.
                </h1>
                <p className="font-mono text-[13px] leading-relaxed text-muted-foreground max-w-[60ch]">
                  Eight years shipping B2B products across healthcare, cybersecurity, and fintech. Currently at{" "}
                  <Link
                    href="https://www.corellium.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4 hover:no-underline"
                  >
                    Corellium
                  </Link>
                  , simplifying complex cybersecurity workflows.
                </p>
              </div>
              <div className="md:border-l border-t md:border-t-0 border-foreground/30 grid grid-cols-3 md:grid-cols-1 md:w-44">
                <div className="p-4 md:border-b border-r md:border-r-0 border-foreground/30">
                  <p className="sys-label mb-1.5">Loc.</p>
                  <p className="font-mono text-[12px] uppercase tracking-wider">Florida, USA</p>
                </div>
                <div className="p-4 md:border-b border-r md:border-r-0 border-foreground/30">
                  <p className="sys-label mb-1.5">Yrs.</p>
                  <p className="font-mono text-[12px] uppercase tracking-wider">08</p>
                </div>
                <div className="p-4">
                  <p className="sys-label mb-1.5">Status</p>
                  <p className="font-mono text-[12px] uppercase tracking-wider">
                    <span className="inline-block size-1.5 mr-1.5 align-middle bg-[var(--live)]" aria-hidden />
                    Open
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Selected Work */}
        <FadeIn delay={25} duration={350}>
          <div className="sys-section">
            <span className="sys-section-num">[01]</span>
            <span className="sys-section-title">Selected Work</span>
            <div className="sys-section-rule" />
            <span className="sys-section-meta">04 Entries</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selected.map((entry, i) => (
            <FadeIn key={entry.id} delay={50 + i * 25} duration={350}>
              <ProjectCard entry={entry} priority={i < 2} size="lg" />
            </FadeIn>
          ))}
        </div>

        {/* Other Work */}
        <FadeIn delay={175} duration={350}>
          <div className="sys-section pt-2">
            <span className="sys-section-num">[02]</span>
            <span className="sys-section-title">Other Work</span>
            <div className="sys-section-rule" />
            <span className="sys-section-meta">03 Entries</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {other.map((entry, i) => (
            <FadeIn key={entry.id} delay={200 + i * 25} duration={350}>
              <ProjectCard entry={entry} size="sm" />
            </FadeIn>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  )
}
