import { describe, expect, it } from "vitest"
import { caseStudyLogoProps, hasCaseStudyLogo } from "@/lib/case-study-assets"
import { caseStudySlug } from "@/lib/shared-frame"

/*
 * The warm-up in TransitionLink feeds caseStudySlug's answer into
 * hasCaseStudyLogo, so the two must agree on every case-study route — a slug
 * the router serves but the logo table doesn't know would silently skip the
 * warm and bring the pop-in back for that one project.
 */
describe("hasCaseStudyLogo", () => {
  it("knows every case study the site links to", () => {
    for (const href of ["/work/corellium", "/work/immertec", "/work/spontivly", "/work/paidly"]) {
      const slug = caseStudySlug(href)
      expect(slug).not.toBeNull()
      expect(slug !== null && hasCaseStudyLogo(slug)).toBe(true)
    }
  })

  /* Trailing slash is how location spells these routes — see normalisePath */
  it("agrees with caseStudySlug on the trailing-slash spelling", () => {
    const slug = caseStudySlug("/work/corellium/")
    expect(slug !== null && hasCaseStudyLogo(slug)).toBe(true)
  })

  it("has no logo for routes that are not case studies", () => {
    expect(hasCaseStudyLogo("about")).toBe(false)
    expect(hasCaseStudyLogo("")).toBe(false)
  })
})

describe("caseStudyLogoProps", () => {
  /* The src is the URL contract between warm-up and render: both sides run the
     same loader over it, so this is the one field a typo would silently break */
  it("points each slug at its own logo file", () => {
    expect(caseStudyLogoProps("corellium").src).toBe("/about/logos/corellium.jpeg")
    expect(caseStudyLogoProps("paidly").src).toBe("/about/logos/paidly.jpeg")
  })
})
