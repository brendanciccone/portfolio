import type React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { LightboxTrigger } from "@/components/lightbox-trigger"
import { MockupImage } from "@/components/mockup-image"
import { TransitionLink } from "@/components/view-transition-link"
import { cn } from "@/lib/utils"

/*
 * Shared-element names for the card→case-study morph. Static literals so the
 * Tailwind scanner generates each class; the case-study hero frame carries
 * the matching name.
 */
const transitionFrameClassByHref = new Map<string, string>([
  ["/work/corellium", "[view-transition-name:vt-corellium]"],
  ["/work/immertec", "[view-transition-name:vt-immertec]"],
  ["/work/spontivly", "[view-transition-name:vt-spontivly]"],
  ["/work/paidly", "[view-transition-name:vt-paidly]"],
])

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

/*
 * One hover grammar for every card, plate or small. Press cancels the lift so
 * clicks read as a physical push-back.
 *
 * Exactly one red mark per hover, and it is the title underline — the same
 * stroke the nav uses, on the thing you are actually navigating toward. Two
 * earlier candidates were cut: the border going to ink (which made a single
 * hover fire two different accents, leaving the outline part red and part
 * grey) and a red rule wiping across the card's top edge (which said the same
 * thing as the underline, twice, in the same colour). Everything else the
 * card does is physical: it lifts, and the screenshot swells.
 */
const cardClasses =
  "group block h-full sys-panel hover-lift hover:-translate-y-1 active:translate-y-0 active:scale-[0.995] motion-reduce:hover:translate-none motion-reduce:active:scale-100"

/*
 * The image swells slowly — 700ms against the card's 250ms lift — so the card
 * settles into place while the screenshot is still opening up. Driven through
 * `scale` rather than `transform` to compose with the flow engine, which owns
 * `transform` on any ancestor it drives. One swell value for both variants:
 * a plate and a small card moving different amounts was the tell that they
 * were built separately.
 */
const imageClasses =
  "w-full transition-[scale] duration-700 ease-(--ease-settle) group-hover:scale-[1.03] motion-reduce:transition-none"

/*
 * Caps are for chrome — nav, section labels, meta labels, badges, captions.
 * Project names stay in sentence case because they are other companies'
 * wordmarks, and uppercasing flattens the ascender/descender silhouette that
 * makes a name recognizable. The case-study h1s follow the same rule, so both
 * title levels here and those four headings have to stay in step.
 */

/* Titles take the same wiping rule as the nav — one underline system */
const titleWipeClasses =
  "relative inline-block after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:bg-primary after:origin-right after:scale-x-0 group-hover:after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-(--motion-settle) after:ease-(--ease-settle) motion-reduce:after:transition-none"

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
  const isPlate = variant === "selected"
  /* Plates run one per row: full width below md, then the 16:9 mat letterboxes
     the 3:2 screenshot to 84% of the mat width (16:9 box height × 3:2 ratio) —
     ~80vw of the viewport, 812px once the 1024px container caps out */
  const sizes = isPlate
    ? "(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 812px"
    : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 512px"

  const body = (
    <>
      {/* Screenshot sits in the mat frame with a bottom hairline; internal
          cards name the frame so it morphs into the case-study hero */}
      <div
        className={cn(
          "bg-mockup-frame overflow-hidden border-b border-border p-2.5",
          href && transitionFrameClassByHref.get(href),
        )}
      >
        {/* Both variants render a plain image. Lightbox cards used to put the
            trigger button here, which made only the screenshot clickable on a
            card that looks identical to the linked ones above; the trigger now
            lives on the title and covers the whole card. */}
        {/* Full-width plates cap the image area at 16:9 on md+ so a whole card
            fits closer to one viewport. The 3:2 screenshot scales down to the
            box height and centers, letting the mat letterbox the sides —
            cropping instead would clip toolbars and controls at the edges. */}
        <div className={cn("relative w-full overflow-hidden", isPlate && "md:aspect-video md:flex md:justify-center")}>
          <MockupImage
            src={image.src}
            alt={image.alt}
            width={1200}
            height={800}
            className={cn(imageClasses, isPlate && "md:h-full md:w-auto")}
            priority={priority}
            quality={80}
            sizes={sizes}
          />
        </div>
      </div>
      {/* Plate info bands span the card on md+ — title and description anchor
          the left edge, tags sign off the right — so the band carries the same
          width as the screenshot instead of captioning its corner */}
      <div className={cn("p-5", isPlate && "md:flex md:items-center md:justify-between md:gap-8")}>
        <div className={cn("mb-4", isPlate && "md:mb-0")}>
          {isPlate ? (
            <h2 className="text-lg sm:text-[22px] md:text-[28px] font-heading font-bold leading-tight mb-1">
              <span className={titleWipeClasses}>{title}</span>
            </h2>
          ) : (
            <h3 className="text-base sm:text-lg font-heading font-bold leading-tight mb-1">
              <LightboxTrigger src={image.src} alt={image.alt} width={1200} height={800}>
                <span className={titleWipeClasses}>{title}</span>
              </LightboxTrigger>
            </h3>
          )}
          <p className={cn("text-muted-foreground text-sm", isPlate && "md:text-[15px]")}>{description}</p>
        </div>
        <div className={cn("flex flex-wrap gap-2", isPlate && "md:justify-end md:shrink-0")}>
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
