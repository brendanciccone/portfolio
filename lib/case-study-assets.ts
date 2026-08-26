/*
 * The images a card→case-study navigation needs on the far side, declared once
 * so the page that renders them and the link that warms them cannot drift
 * apart. A warm-up fetch is only worth anything if it resolves to the same URL
 * as the render it fronts — same src, same declared width, same quality, same
 * sizes — so every value the image loader folds into the URL lives here and
 * nowhere else.
 *
 * See components/view-transition-link.tsx for the warming, and the case-study
 * page headers for the render.
 */

interface CaseStudyLogoImage {
  src: string
  alt: string
}

/* One entry per case study under /work/, keyed by route slug — which is what
   TransitionLink has in hand at warm time. */
const caseStudyLogos = {
  corellium: { src: "/about/logos/corellium.jpeg", alt: "Corellium logo" },
  immertec: { src: "/about/logos/immertec.jpeg", alt: "Immertec logo" },
  spontivly: { src: "/about/logos/spontivly.jpeg", alt: "Spontivly logo" },
  paidly: { src: "/about/logos/paidly.jpeg", alt: "Paidly logo" },
} as const satisfies Record<string, CaseStudyLogoImage>

export type CaseStudySlug = keyof typeof caseStudyLogos

/* caseStudySlug() accepts any /work/ route shape; this narrows to the slugs
   that actually have a logo to warm */
export const hasCaseStudyLogo = (slug: string): slug is CaseStudySlug =>
  slug in caseStudyLogos

export interface CaseStudyLogoProps extends CaseStudyLogoImage {
  width: number
  height: number
  quality: number
  sizes: string
}

/*
 * The exact props the case-study header hands to <Image>, and the exact props
 * TransitionLink hands to getImageProps when it warms the logo ahead of the
 * click. The logo is the one thing in a case study's header the home page has
 * never fetched — the hero is the card's own screenshot and arrives from cache
 * — so it was the one asset that popped in after the navigation had already
 * settled.
 */
export const caseStudyLogoProps = (slug: CaseStudySlug): CaseStudyLogoProps => ({
  ...caseStudyLogos[slug],
  width: 60,
  height: 60,
  quality: 80,
  sizes: "60px",
})

/*
 * One sizes string for both ends of the frame morph. The card's plate and the
 * case-study hero render the same file at effectively the same width (~658px
 * inside the 45rem rail), but each used to declare its own sizes string and
 * the two could select different srcset buckets — a 640–768px viewport at 1x
 * had the card cache width=750 while the arriving hero requested width=640,
 * refetching the screenshot in the middle of the very morph it stars in. One
 * string, one URL: the hero is always served from the cache the card filled.
 */
export const WORK_FRAME_SIZES = "(max-width: 768px) 100vw, 660px"
