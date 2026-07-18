import type React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { LightboxImage } from "@/components/lightbox"
import { MockupImage } from "@/components/mockup-image"
import { cn } from "@/lib/utils"

export interface WorkCardData {
  title: string
  description: string
  image: { src: string; alt: string }
  tags: readonly string[]
  /* Omit href to render a lightbox card (no page to link to) */
  href?: string
  external?: boolean
}

interface WorkCardProps extends WorkCardData {
  variant?: "selected" | "other"
  priority?: boolean
}

const cardClasses =
  "group block h-full sys-panel hover-lift hover:-translate-y-1 hover:border-foreground/40 motion-reduce:hover:translate-none"

const imageClasses =
  "w-full transition-[translate,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:opacity-90 motion-reduce:group-hover:translate-none"

export const WorkCard = ({
  title,
  description,
  image,
  tags,
  href,
  external,
  variant = "selected",
  priority,
}: WorkCardProps): React.JSX.Element => {
  const sizes =
    variant === "selected"
      ? "(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 1024px"
      : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 512px"

  const body = (
    <>
      {/* Screenshot sits in the mat frame with a bottom hairline */}
      <div className="bg-mockup-frame overflow-hidden border-b border-border p-2.5">
        <div className={cn("relative w-full overflow-hidden", !href && "[&_button]:cursor-zoom-in")}>
          {href ? (
            <MockupImage
              src={image.src}
              alt={image.alt}
              width={1200}
              height={800}
              className={imageClasses}
              priority={priority}
              quality={80}
              sizes={sizes}
            />
          ) : (
            <LightboxImage
              src={image.src}
              alt={image.alt}
              width={1200}
              height={800}
              className={imageClasses}
              quality={80}
              sizes={sizes}
            />
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-4">
          {variant === "selected" ? (
            <h2 className="text-lg sm:text-[22px] font-heading font-bold uppercase leading-tight mb-1">{title}</h2>
          ) : (
            <h3 className="text-base sm:text-lg font-heading font-bold uppercase leading-tight mb-1">{title}</h3>
          )}
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cardClasses}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {body}
      </Link>
    )
  }

  return <div className={cardClasses}>{body}</div>
}
