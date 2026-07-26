import { describe, expect, it } from "vitest"
import {
  normalisePath,
  playsEntranceOnNavigation,
  resolveEntranceOnCommit,
} from "@/lib/entrance"

/* Paths as they appear in location once next.config's trailingSlash applies */
const visited = (...paths: readonly string[]): ReadonlySet<string> =>
  new Set(paths.map(normalisePath))

describe("normalisePath", () => {
  it("leaves root alone", () => {
    expect(normalisePath("/")).toBe("/")
  })

  it("collapses the two spellings of the same route to one", () => {
    // An href gives "/about"; location gives "/about/"
    expect(normalisePath("/about")).toBe("/about")
    expect(normalisePath("/about/")).toBe("/about")
    expect(normalisePath("/about/")).toBe(normalisePath("/about"))
  })

  it("handles nested routes", () => {
    expect(normalisePath("/work/corellium/")).toBe("/work/corellium")
    expect(normalisePath("/work/corellium")).toBe("/work/corellium")
  })
})

describe("playsEntranceOnNavigation", () => {
  it("introduces a page the first time it is reached", () => {
    expect(playsEntranceOnNavigation("/about", visited("/"), false)).toBe(true)
  })

  it("stays quiet on a page already seen this session", () => {
    expect(playsEntranceOnNavigation("/about", visited("/", "/about"), false)).toBe(false)
  })

  /*
   * Regression: trailingSlash means the visited set holds "/about/" while the
   * href parses to "/about". Unnormalised, every non-root page read as
   * unvisited forever and replayed its entrance on every single arrival —
   * "/" was the only path that matched, by luck.
   */
  it("matches a visited path regardless of trailing slash", () => {
    expect(playsEntranceOnNavigation("/about", visited("/about/"), false)).toBe(false)
    expect(playsEntranceOnNavigation("/about/", visited("/about"), false)).toBe(false)
    expect(playsEntranceOnNavigation("/work/corellium", visited("/work/corellium/"), false)).toBe(false)
  })

  /*
   * A link carrying a shared element always morphs, even on a first visit:
   * flying the card's screenshot into the case-study hero IS that arrival's
   * entrance, and the two would fight over the same node's transform.
   */
  it("yields to the morph when the link carries a shared element", () => {
    expect(playsEntranceOnNavigation("/work/corellium", visited("/"), true)).toBe(false)
  })

  it("still yields to the morph on a revisit", () => {
    expect(playsEntranceOnNavigation("/work/corellium", visited("/", "/work/corellium"), true)).toBe(false)
  })
})

describe("resolveEntranceOnCommit", () => {
  it("honours the decision the click already made", () => {
    expect(resolveEntranceOnCommit("/about", visited("/"), true)).toBe(true)
    expect(resolveEntranceOnCommit("/about", visited("/"), false)).toBe(false)
  })

  /*
   * Regression: Back and Forward never run through the click handler, so there
   * is no pending decision. Falling back to the visited set is what stops an
   * already-seen page replaying its entrance — previously it inherited
   * whatever flag the last click left behind, and Back to Home replayed the
   * full hero choreography.
   */
  it("does not replay on a page reached by Back", () => {
    expect(resolveEntranceOnCommit("/", visited("/", "/about"), null)).toBe(false)
    expect(resolveEntranceOnCommit("/about/", visited("/", "/about"), null)).toBe(false)
  })

  it("still introduces an unseen page that arrives without a click", () => {
    // Belt and braces: a direct load or an unusual history entry
    expect(resolveEntranceOnCommit("/contact", visited("/"), null)).toBe(true)
  })

  it("plays on the very first commit of a session", () => {
    // Cold load: nothing visited yet, no click involved
    expect(resolveEntranceOnCommit("/", visited(), null)).toBe(true)
  })

  it("prefers an explicit false over an unvisited path", () => {
    // A morphing first visit must not be overridden by the visited fallback
    expect(resolveEntranceOnCommit("/work/paidly", visited("/"), false)).toBe(false)
  })
})
