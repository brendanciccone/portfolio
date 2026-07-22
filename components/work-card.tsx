import type React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { LightboxImage } from "@/components/lightbox"
import { MockupImage } from "@/components/mockup-image"
import { TransitionLink } from "@/components/view-transition-link"
import { cn } from "@/lib/utils"

/*
 * Shared-element names for the card→case-study morph. Static literals so the
 * Tailwind scanner generates each class; the case-study hero frame carries
 * the matching name.
 */
const transitionFrameClassByHref: Record<string, string> = {
  "/work/corellium": "[view-transition-name:vt-corellium]",
  "/work/immertec": "[view-transition-name:vt-immertec]",
  "/work/spontivly": "[view-transition-name:vt-spontivly]",
  "/work/paidly": "[view-transition-name:vt-paidly]",
}

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

/* Press cancels the lift so clicks read as a physical push-back */
const cardClasses =
  "group block h-full sys-panel hover-lift hover:-translate-y-1 hover:border-foreground/40 active:translate-y-0 active:scale-[0.995] motion-reduce:hover:translate-none motion-reduce:active:scale-100"

const imageClasses =
  "w-full transition-[translate,opacity] duration-(--motion-settle) ease-(--ease-settle) group-hover:-translate-y-0.5 group-hover:opacity-90 motion-reduce:group-hover:translate-none"

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
      {/* Screenshot sits in the mat frame with a bottom hairline; internal
          cards name the frame so it morphs into the case-study hero */}
      <div
        className={cn(
          "bg-mockup-frame overflow-hidden border-b border-border p-2.5",
          href && transitionFrameClassByHref[href],
        )}
      >
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

  if (href && !external) {
    return (
      <TransitionLink href={href} className={cardClasses}>
        {body}
      </TransitionLink>
    )
  }

  if (href) {
    return (
      <Link href={href} className={cardClasses} target="_blank" rel="noopener noreferrer">
        {body}
      </Link>
    )
  }

  return <div className={cardClasses}>{body}</div>
}
