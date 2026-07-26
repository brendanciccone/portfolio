import { describe, expect, it } from "vitest"
import {
  clamp01,
  computeFlow,
  computeRecede,
  parseFlowFactor,
  shouldReleaseWipe,
  OFFSCREEN_MARGIN,
  WIPE_TRIGGER_RATIO,
  type FlowRect,
} from "@/lib/scroll-flow-math"

/* A typical desktop viewport; every expectation below is relative to it */
const H = 860
/* Enough room left that the end-of-document floor never engages */
const PLENTY_OF_SCROLL = H * 5

/* Rect sitting comfortably in the middle of the viewport */
const settled: FlowRect = { top: H * 0.4, bottom: H * 0.7 }

describe("clamp01", () => {
  it("passes values inside the range through untouched", () => {
    expect(clamp01(0.42)).toBe(0.42)
  })

  it("clamps both ends", () => {
    expect(clamp01(-3)).toBe(0)
    expect(clamp01(9)).toBe(1)
  })
})

describe("parseFlowFactor", () => {
  it("falls back to 1 for the values JSX actually produces", () => {
    // A bare `data-flow` renders as "true"; an explicit empty value as ""
    expect(parseFlowFactor("true")).toBe(1)
    expect(parseFlowFactor("")).toBe(1)
    expect(parseFlowFactor(undefined)).toBe(1)
  })

  it("reads explicit factors", () => {
    expect(parseFlowFactor("0.5")).toBe(0.5)
    expect(parseFlowFactor("1.14")).toBe(1.14)
  })

  it("rejects zero and negatives rather than dividing by them", () => {
    // k reaches the exit ramp as a divisor, so 0 would yield Infinity
    expect(parseFlowFactor("0")).toBe(1)
    expect(parseFlowFactor("-2")).toBe(1)
  })
})

describe("computeFlow", () => {
  it("leaves a settled element fully visible and unstyled", () => {
    const style = computeFlow(settled, H, PLENTY_OF_SCROLL, 1)

    expect(style.opacity).toBeCloseTo(1)
    expect(style.translateY).toBeCloseTo(0)
    // Zero, not a hairline radius — the engine clears the filter entirely
    expect(style.blurPx).toBe(0)
  })

  it("ramps an element entering from below", () => {
    const entering: FlowRect = { top: H * 0.93, bottom: H * 1.3 }
    const style = computeFlow(entering, H, PLENTY_OF_SCROLL, 1)

    expect(style.opacity).toBeGreaterThan(0)
    expect(style.opacity).toBeLessThan(1)
    // Still sitting below its resting position, and soft
    expect(style.translateY).toBeGreaterThan(0)
    expect(style.blurPx).toBeGreaterThan(0)
  })

  it("melts an element leaving past the header, drifting it upward", () => {
    const leaving: FlowRect = { top: -H * 0.2, bottom: H * 0.12 }
    const style = computeFlow(leaving, H, PLENTY_OF_SCROLL, 1)

    expect(style.opacity).toBeLessThan(1)
    expect(style.translateY).toBeLessThan(0)
  })

  it("skips the math for elements beyond the offscreen margin", () => {
    const below: FlowRect = { top: H + OFFSCREEN_MARGIN + 1, bottom: H * 2 }
    const above: FlowRect = { top: -H * 2, bottom: -OFFSCREEN_MARGIN - 1 }

    for (const rect of [below, above]) {
      const style = computeFlow(rect, H, PLENTY_OF_SCROLL, 1)
      expect(style.opacity).toBe(0)
      // Regression: an offscreen element must not keep a stale blur, which
      // would pin it to a compositing layer it cannot be seen on
      expect(style.blurPx).toBe(0)
      expect(style.translateY).toBe(0)
    }
  })

  /*
   * Regression for the footer bug. The last element in a document can never
   * climb out of the enter ramp — the page runs out of scroll first — so
   * without the end-of-document floor it parked permanently at roughly a
   * third opacity under a blur.
   */
  it("fully resolves the last element once scrolling has run out", () => {
    const footer: FlowRect = { top: H * 0.9, bottom: H * 0.98 }

    const midPage = computeFlow(footer, H, PLENTY_OF_SCROLL, 1)
    expect(midPage.opacity).toBeLessThan(1)

    const atDocumentEnd = computeFlow(footer, H, 0, 1)
    expect(atDocumentEnd.opacity).toBeCloseTo(1)
    expect(atDocumentEnd.blurPx).toBe(0)
    expect(atDocumentEnd.translateY).toBeCloseTo(0)
  })

  it("renders a page too short to scroll completely visible", () => {
    // remainingScroll of 0 from the very start: nothing can ever ramp in, so
    // everything must already be resolved
    const lowOnPage: FlowRect = { top: H * 0.88, bottom: H * 0.95 }
    expect(computeFlow(lowOnPage, H, 0, 1).opacity).toBeCloseTo(1)
  })

  /*
   * Regression for the prose inversion. Lower k must melt LATER, which is why
   * body copy runs at 0.5 and the structure around it at 1.0 or above — the
   * scaffolding should dissolve before the words do.
   */
  it("melts a lower k later than a higher one", () => {
    const leaving: FlowRect = { top: -H * 0.15, bottom: H * 0.2 }

    const prose = computeFlow(leaving, H, PLENTY_OF_SCROLL, 0.5)
    const structure = computeFlow(leaving, H, PLENTY_OF_SCROLL, 1)
    const eager = computeFlow(leaving, H, PLENTY_OF_SCROLL, 1.14)

    expect(prose.opacity).toBeGreaterThan(structure.opacity)
    expect(structure.opacity).toBeGreaterThan(eager.opacity)
  })

  it("staggers grid siblings by their k", () => {
    const leaving: FlowRect = { top: -H * 0.1, bottom: H * 0.22 }
    const opacities = [1, 1.07, 1.14].map((k) => computeFlow(leaving, H, PLENTY_OF_SCROLL, k).opacity)

    // Strictly decreasing: each sibling is a little further into its melt
    expect(opacities[0]).toBeGreaterThan(opacities[1])
    expect(opacities[1]).toBeGreaterThan(opacities[2])
  })

  it("never produces an opacity outside 0..1", () => {
    const tops = [-H * 3, -H, -H * 0.1, 0, H * 0.5, H * 0.96, H, H * 3]
    for (const top of tops) {
      for (const remaining of [0, H * 0.1, PLENTY_OF_SCROLL]) {
        const { opacity } = computeFlow({ top, bottom: top + H * 0.3 }, H, remaining, 1)
        expect(opacity).toBeGreaterThanOrEqual(0)
        expect(opacity).toBeLessThanOrEqual(1)
      }
    }
  })
})

describe("computeRecede", () => {
  it("leaves the hero untouched at the top of the page", () => {
    expect(computeRecede("title", H, 0)).toEqual({ opacity: 1, translateY: 0 })
    expect(computeRecede("meta", H, 0)).toEqual({ opacity: 1, translateY: 0 })
  })

  it("thins the title to a quarter but never removes it", () => {
    const { opacity } = computeRecede("title", H, H * 0.9)
    expect(opacity).toBeCloseTo(0.25)
  })

  it("takes the meta row all the way out", () => {
    expect(computeRecede("meta", H, H * 0.9).opacity).toBeCloseTo(0)
  })

  it("drifts the title at twice the meta row's rate", () => {
    const scrollY = 400
    const title = computeRecede("title", H, scrollY)
    const meta = computeRecede("meta", H, scrollY)

    expect(title.translateY).toBeCloseTo(scrollY * 0.16)
    expect(meta.translateY).toBeCloseTo(scrollY * 0.08)
    expect(title.translateY).toBeCloseTo(meta.translateY * 2)
  })

  it("holds at its floor once scrolled well past the hero", () => {
    expect(computeRecede("title", H, H * 40).opacity).toBeCloseTo(0.25)
    expect(computeRecede("meta", H, H * 40).opacity).toBeCloseTo(0)
  })
})

describe("shouldReleaseWipe", () => {
  it("holds while the image is still below the trigger line", () => {
    expect(shouldReleaseWipe(H * WIPE_TRIGGER_RATIO + 1, H)).toBe(false)
  })

  it("releases once the image crosses it", () => {
    expect(shouldReleaseWipe(H * WIPE_TRIGGER_RATIO - 1, H)).toBe(true)
  })

  it("releases anything already scrolled above the fold, however fast the jump", () => {
    // A fast jump must never strand an armed image clipped
    expect(shouldReleaseWipe(-H * 10, H)).toBe(true)
  })
})
