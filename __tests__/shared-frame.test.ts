import { describe, expect, it } from "vitest"
import { caseStudySlug, sharedFrameSlug } from "@/lib/shared-frame"

describe("caseStudySlug", () => {
  it("reads the slug off a case-study route", () => {
    expect(caseStudySlug("/work/corellium")).toBe("corellium")
  })

  /* next.config sets trailingSlash, so location spells the same route with one
     and an href without */
  it("reads it the same way with a trailing slash", () => {
    expect(caseStudySlug("/work/corellium/")).toBe("corellium")
  })

  it("has nothing to say about the pages that carry no frame", () => {
    expect(caseStudySlug("/")).toBeNull()
    expect(caseStudySlug("/about")).toBeNull()
    expect(caseStudySlug("/contact/")).toBeNull()
  })

  /* /work has no index route, but a bare prefix must not resolve to an empty
     slug — [data-frame=""] would match every frame on the page at once */
  it("rejects the bare prefix", () => {
    expect(caseStudySlug("/work")).toBeNull()
    expect(caseStudySlug("/work/")).toBeNull()
  })

  it("rejects anything nested under a case study", () => {
    expect(caseStudySlug("/work/corellium/gallery")).toBeNull()
  })

  /* The slug is interpolated into a [data-frame="…"] selector, and an invalid
     selector throws out of the click handler rather than just missing */
  it("rejects a segment that could not be a route slug", () => {
    expect(caseStudySlug('/work/a"]')).toBeNull()
    expect(caseStudySlug("/work/Corellium")).toBeNull()
    expect(caseStudySlug("/work/one two")).toBeNull()
  })
})

describe("sharedFrameSlug", () => {
  it("pairs a home card with the case study it links to", () => {
    expect(sharedFrameSlug("/", "/work/immertec")).toBe("immertec")
  })

  it("pairs them on the way back too", () => {
    expect(sharedFrameSlug("/work/immertec/", "/")).toBe("immertec")
  })

  /*
   * Regression: the frames were named permanently, so leaving a case study
   * named all four of home's cards and three of them had nothing to pair with.
   */
  it("names one project per navigation, never a set", () => {
    expect(sharedFrameSlug("/work/paidly/", "/")).toBe("paidly")
    expect(sharedFrameSlug("/", "/work/paidly")).toBe("paidly")
  })

  it("finds nothing between two pages that share no frame", () => {
    expect(sharedFrameSlug("/about", "/contact")).toBeNull()
    expect(sharedFrameSlug("/about/", "/work/corellium")).toBeNull()
    expect(sharedFrameSlug("/work/corellium/", "/contact")).toBeNull()
  })

  /* No such link exists today, and if one is added the two heroes are the same
     element in two places rather than a pair — that is a cross-fade, not a morph */
  it("finds nothing between two case studies", () => {
    expect(sharedFrameSlug("/work/corellium/", "/work/paidly")).toBeNull()
  })

  it("finds nothing on a navigation that goes nowhere", () => {
    expect(sharedFrameSlug("/", "/")).toBeNull()
  })
})
