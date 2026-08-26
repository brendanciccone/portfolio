import type React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { LightboxTrigger } from "@/components/lightbox-trigger"
import { MockupImage } from "@/components/mockup-image"
import { TransitionLink } from "@/components/view-transition-link"
import { WORK_FRAME_SIZES } from "@/lib/case-study-assets"
import { caseStudySlug } from "@/lib/shared-frame"
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

/*
 * One hover grammar for every card, plate or small. Press cancels the lift so
 * clicks read as a physical push-back.
 *
 * Exactly one mark per hover, and it is the title underline, on the thing you
 * are actually navigating toward. Everything else the card does is physical:
 * it lifts, and the screenshot swells. The palette is monochrome now, so the
 * underline draws in ink rather than in an accent — which is also why the nav
 * dropped its matching rule for a filled pill: a rule and a fill in the same
 * colour said the same thing twice.
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
  "w-full"

/* Titles take the same wiping rule as the nav — one underline system */
const titleWipeClasses =
  "relative inline-block after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-foreground after:origin-right after:scale-x-0 group-hover:after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-(--motion-settle) after:ease-(--ease-settle) motion-reduce:after:transition-none"

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
  /* Marks the mat as this project's shared frame for the card→case-study
     morph; the case study's hero carries the same slug. Lightbox and external
     cards get nothing — there is no page on the other side to morph into. */
  const frameSlug = href && !external ? caseStudySlug(href) : null
  /* Plates run one per row and their screenshot fills the mat, so it asks for
     the rail width less the card's own padding — via the string the case-study
     hero shares, so the morph's far side always hits this card's cache. Small
     cards are a fixed thumbnail beside their text at every width — 96px on a
     phone, 176px from sm up — so asking for 100vw below sm fetched an image
     about four times wider than the slot it lands in, on the viewport with the
     most traffic. */
  const sizes = isPlate ? WORK_FRAME_SIZES : "(max-width: 640px) 96px, 176px"

  /*
   * Small cards run horizontally: a fixed thumbnail on the left, the text
   * beside it. Stacked in one column they read as a list of side projects,
   * which is what they are — a three-across grid of the same card the selected
   * work uses gave them the same visual weight as the four career projects and
   * made the page argue with itself about what matters.
   */
  if (!isPlate) {
    /*
     * A row at every width: a thumbnail beside its text, 96px on a phone and
     * 176px from sm up.
     *
     * It used to stack to a full-width card below sm, because at 390px a 144px
     * thumbnail left the text column about 158 — narrower than "Coinbase
     * Accelerator" on its own, so every tag wrapped and the badge row became a
     * badge column. The fix for that was a smaller thumbnail, not a different
     * layout: at 96px the column gets about 218 and the tags fit again.
     *
     * Stacked, this also became the same object as a plate card: 272x197 of
     * artwork against the featured card's 282x200, a 4% difference, with the
     * same 14px description under it. Two sections headed "Selected Work" and
     * "Other Work" rendering as one component is worse than a cramped badge
     * row, and no amount of padding was going to close a 4% gap. As a row the
     * two tiers are unambiguous, which is what they actually are.
     */
    const row = (
      <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
        {/* 4:3 — the screenshots' actual ratio. This was 3:2, matching a
            width/height the code declared but the files never had: every one of
            the 38 work images is 2400x1800, and they were all being declared
            1200x800. The ratio holds at every width — stacked it takes the
            card's width, and beside the text it is 176px wide so the height
            follows at 132 rather than being pinned separately. It was 128x96
            there, small enough that the screenshot read as a smudge next to a
            502px text column.

            The ratio sits on the inner clip rather than on this mat, and that
            is what actually centres the screenshot. With aspect-[4/3] on the
            mat, the padding came off both dimensions equally and left the padded
            box at 88x64 — 1.375, not the 1.3333 the files are — so
            object-contain letterboxed the artwork by 1.33px a side. It stayed
            symmetric, but it then sat in 5.33px of mat left and right against
            4px top and bottom, and an uneven margin is what reads as
            off-centre. Inside the padding the clip is exactly 4:3, so the
            screenshot fills it edge to edge and the mat shows one even margin
            all round. */}
        {/* Tint, no outline. This carried a full border once, back when the
            screenshot inside it had no edge of its own and the frame had to
            supply one. It does now, so the border was drawing a third
            concentric #e4e4e7 rectangle: card, then mat, then mockup, three
            nested outlines of the same colour inside about twenty pixels.

            The plate cards never had this — their mat carries a bottom hairline
            only, which divides picture from text rather than enclosing it. This
            matches that: the mockup-frame tint still marks the image area, and
            the only outlines left are the card's and the screenshot's own. */}
        <div className="w-24 shrink-0 self-start overflow-hidden rounded-lg bg-mockup-frame p-1 sm:self-auto sm:p-1.5 sm:w-44">
          {/*
            [&>div]:size-full is load-bearing. MockupImage wraps its <Image> in
            a plain `relative` div with no height of its own, so the image's
            h-full had nothing to resolve against — a percentage height against
            an auto-height parent computes to auto — and it fell back to its
            natural aspect. The result was a 98px-tall image in an 82px box,
            pinned to the top with the bottom 16px cropped off. Stretching the
            wrapper gives h-full a real height, so object-contain has a box to
            resolve against and the thumbnail is actually centred.
          */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded [filter:var(--drop-mockup-sm)] [&>div]:size-full">
            <MockupImage
              src={image.src}
              alt={image.alt}
              width={1200}
              height={900}
              /*
               * contain, not cover. The clip this sits in is exactly 4:3 and so
               * are the files, so the two fit with nothing left over and either
               * value would paint the same pixels today. contain is what keeps
               * that true: it shows the whole frame no matter what ratio a
               * screenshot arrives at, where cover silently crops to fill. That
               * was not hypothetical — while the ratio lived on the padded mat
               * the clip resolved to 1.375 and cover was cropping the
               * screenshot to make up the difference. Showing the whole frame
               * is also how the plate cards present a screenshot.
               */
              className={cn(imageClasses, "h-full object-contain")}
              quality={80}
              sizes={sizes}
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-heading font-semibold leading-tight mb-1">
            <LightboxTrigger src={image.src} alt={image.alt} width={1200} height={900} title={title}>
              <span className={titleWipeClasses}>{title}</span>
            </LightboxTrigger>
          </h3>
          <p className="text-muted-foreground text-sm sm:mb-2.5">{description}</p>
          {/* Tags are a desktop-only enrichment on these rows.

              Stacked into a ~218px column they could not hold one line: Biobox
              wrapped "Web3" onto a second row on its own, which made that card
              150px tall against the other two at 122. Uneven row heights caused
              by an orphaned chip is what makes a list read as accidental rather
              than laid out — and the wrap was ragged in the bargain.

              At this size the row's job is what it is and what it does, which
              the title and description already do. The year and the accolade
              are context worth having when there is room for them on one line,
              and not worth a broken rhythm when there isn't. */}
          <div className="mt-2.5 hidden flex-wrap gap-1.5 sm:flex">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    )

    return <div className={cardClasses}>{row}</div>
  }

  const body = (
    <>
      {/* Screenshot sits in the mat frame with a bottom hairline; internal
          cards name the frame so it morphs into the case-study hero.

          Full-bleed, deliberately — and specifically not the inset bordered box
          the Other Work rows use. That difference is the tier. On mobile both
          card types stack to full width and land within a few percent of each
          other on every dimension: 379px tall against 363, a 243px image area
          against 237, and the same 14px description. The only strong signal
          left that one is featured and the other is a list is that this mat
          runs edge to edge while theirs sits in a padded frame. Matching them
          up reads as consistency and costs the hierarchy the section headings
          are asserting. */}
      {/* rounded-t-[11px], not rounded-t-xl, and the missing pixel is the
          point. The card around this mat is rounded-xl with a 1px border, so
          its OUTER radius is 12 and its INNER radius — the curve this mat has
          to sit against — is 12 minus the border, 11. Drawn at 12 the mat's
          corner is rounder than the hole it fills, so a sliver of the card's
          own white background shows between the fill and the border along the
          curve. Measured at 4 page-coloured pixels inside the border per
          corner at 2x, which is invisible at size and unmistakable the moment
          anyone zooms a screenshot.

          The card cannot clip it away either: it is overflow-visible, because
          hover-lift needs to translate without its shadow being cut.

          The rule, wherever a filled child meets a bordered parent's corner:
          inner radius = outer radius - border width. */}
      <div
        data-frame={frameSlug ?? undefined}
        className="bg-mockup-frame overflow-hidden rounded-t-[11px] border-b border-border p-2.5"
      >
        {/* Both variants render a plain image. Lightbox cards used to put the
            trigger button here, which made only the screenshot clickable on a
            card that looks identical to the linked ones above; the trigger now
            lives on the title and covers the whole card. */}
        {/* The screenshot fills the mat's width at its own 4:3 ratio — the
            files are 2400x1800 and are declared 1200x900.
            It used to be letterboxed inside a forced 16:9 box, which was sized
            for the old 64rem rail — at 45rem that left the screenshot 494px
            wide inside a 678px mat, with 92px of dead mat down either side.
            Nothing was gained for it: the cap existed to keep a whole card near
            one viewport, and the card is 300px narrower than it was. */}
        {/* Filter on the clipper rather than the <img>: a filter on the image
            inside would be cropped at this boundary. Applied outside it, the
            shadow is drawn from the already-clipped result and has the image's
            own transparent margin to land in. */}
        <div className="relative w-full overflow-hidden rounded-md [filter:var(--drop-mockup)]">
          <MockupImage
            src={image.src}
            alt={image.alt}
            width={1200}
            height={900}
            className={imageClasses}
            priority={priority}
            quality={80}
            sizes={sizes}
          />
        </div>
      </div>
      {/*
        Title, description, then tags — stacked, all left-aligned.

        The tags used to sit on the same row, pushed to the right edge with the
        text block vertically centred against them. Two things went wrong with
        that. They took half the row, which squeezed the description into a
        column narrow enough to wrap — "Mobile virtualization for cybersecurity
        teams" broke across two lines at full card width, which it has no
        business doing. And items-center then centred the tags against a
        two-line block, so they landed level with the middle of the description,
        aligned to nothing at all.

        Stacked, the description gets the full width and stops wrapping, and the
        tags sit where they do on the small cards and in the reference file.
      */}
      <div className="p-6">
        <div className="mb-4">
          {/* Nothing on the site is set in caps any more — the reference
              separates chrome from content by weight and by the muted step, not
              by case. Project names were already exempt (they are other
              companies' wordmarks, and caps flatten the ascender/descender
              silhouette that makes a name recognizable); the rest of the chrome
              simply joined them. */}
          <h2 className="text-lg sm:text-xl font-heading font-semibold leading-tight mb-1.5">
            <span className={titleWipeClasses}>{title}</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">{description}</p>
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
