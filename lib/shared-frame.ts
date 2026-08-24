import { normalisePath } from "@/lib/entrance"

/*
 * Which project's framed screenshot appears on both sides of a navigation.
 *
 * The morph is only ever between a work card and that project's case-study
 * hero, so exactly one frame can be shared, and only on the home ↔ case-study
 * trip. Naming any other element is not a smaller morph — it is an element
 * lifted out of the page's own cross-fade with nothing to pair against, which
 * is what made three of the four cards fade in a beat late every time you came
 * back to the home page.
 *
 * Kept as pure functions alongside lib/entrance.ts, and for the same reason:
 * this is the logic every shared-element bug has been in.
 *
 * See components/view-transition-link.tsx for where these are applied, and the
 * [data-morph] rule in globals.css for how the name is actually assigned.
 */

const CASE_STUDY_PREFIX = "/work/"

/*
 * The shape every route segment under /work/ has. Matching it is what keeps the
 * slug safe to interpolate into the [data-frame="…"] selector the click handler
 * builds — a hand-typed path can put a quote or a bracket in here, and an
 * invalid selector throws out of the click rather than failing to find a frame.
 */
const SLUG_PATTERN = /^[a-z0-9-]+$/

/*
 * The slug of a case-study route, or null for anything else. Nested paths are
 * rejected rather than truncated: /work/corellium/gallery is not the case study
 * and must not claim its frame.
 */
export const caseStudySlug = (path: string): string | null => {
  const normalised = normalisePath(path)
  if (!normalised.startsWith(CASE_STUDY_PREFIX)) return null

  const slug = normalised.slice(CASE_STUDY_PREFIX.length)
  return SLUG_PATTERN.test(slug) ? slug : null
}

/*
 * The frame this navigation could morph, or null if the two pages have none in
 * common. Home carries all four cards, so it pairs with whichever case study is
 * at the other end; every other pair of routes — about, contact, case study to
 * case study — shares nothing.
 */
export const sharedFrameSlug = (fromPath: string, toPath: string): string | null => {
  if (normalisePath(fromPath) === "/") return caseStudySlug(toPath)
  if (normalisePath(toPath) === "/") return caseStudySlug(fromPath)
  return null
}
