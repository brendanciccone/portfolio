import type React from "react"
import Image from "next/image"
import { LightboxImage } from "@/components/lightbox"

interface WorkSectionProps {
  num: string
  title: string
  meta?: string
  children: React.ReactNode
}

export const WorkSection = ({ num, title, meta, children }: WorkSectionProps) => (
  <section className="sys-cell">
    <header className="sys-cell-header">
      <span className="sys-cell-id">[{num}]</span>
      <span>{title}</span>
      {meta ? <span className="ml-auto">{meta}</span> : null}
    </header>
    <div className="p-5 sm:p-7 space-y-5">{children}</div>
  </section>
)

interface WorkHeroProps {
  num: string
  name: string
  description: string
  logo: string
  image: string
  imageAlt: string
  tags: readonly string[]
}

export const WorkHero = ({
  num,
  name,
  description,
  logo,
  image,
  imageAlt,
  tags,
}: WorkHeroProps) => (
  <section className="sys-cell">
    <header className="sys-cell-header">
      <span className="sys-cell-id">[{num}]</span>
      <span>Project</span>
      <span className="ml-auto">{tags[0]}</span>
    </header>
    <div className="sys-cell-media">
      <LightboxImage
        src={image}
        alt={imageAlt}
        width={1200}
        height={800}
        className="w-full"
        priority
        quality={80}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
      />
    </div>
    <div className="p-5 sm:p-7">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 border border-foreground/40 bg-mockup-frame overflow-hidden flex items-center justify-center flex-shrink-0">
          <Image
            src={logo}
            alt={`${name} logo`}
            width={48}
            height={48}
            className="w-full h-full object-cover"
            quality={80}
            sizes="48px"
          />
        </div>
        <div className="min-w-0">
          <h1 className="sys-display text-2xl sm:text-3xl mb-1.5">{name}</h1>
          <p className="font-mono text-[13px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-foreground/15">
        {tags.map((tag) => (
          <span key={tag} className="sys-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </section>
)

interface MetricProps {
  label: string
  value: string
  description: string
}

export const MetricGrid = ({ items }: { items: readonly MetricProps[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 border border-foreground/30">
    {items.map((m, i) => (
      <div
        key={m.label}
        className={`p-4 sm:p-5 ${
          i > 0 ? "border-t sm:border-t-0 sm:border-l border-foreground/30" : ""
        }`}
      >
        <p className="sys-label mb-3">{m.label}</p>
        <p className="font-display text-xl sm:text-2xl uppercase tracking-tight leading-none mb-2">
          {m.value}
        </p>
        <p className="font-mono text-[12px] leading-snug text-muted-foreground">
          {m.description}
        </p>
      </div>
    ))}
  </div>
)

interface WorkProseProps {
  children: React.ReactNode
  className?: string
}

export const WorkProse = ({ children, className }: WorkProseProps) => (
  <div
    className={`font-mono text-[13px] leading-relaxed text-muted-foreground space-y-4 ${className ?? ""}`}
  >
    {children}
  </div>
)

interface WorkFigureProps {
  src: string
  alt: string
  caption?: string
}

export const WorkFigure = ({ src, alt, caption }: WorkFigureProps) => (
  <figure className="border border-foreground/30">
    <div className="bg-mockup-frame">
      <LightboxImage
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="w-full"
        quality={80}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
      />
    </div>
    {caption ? (
      <figcaption className="px-4 py-2 border-t border-foreground/30 sys-label">
        {caption}
      </figcaption>
    ) : null}
  </figure>
)

export const WorkFigureSmall = ({ src, alt }: { src: string; alt: string }) => (
  <div className="border border-foreground/30 bg-mockup-frame">
    <LightboxImage
      src={src}
      alt={alt}
      width={600}
      height={400}
      className="w-full"
      quality={80}
      sizes="(max-width: 640px) 100vw, 50vw"
    />
  </div>
)
