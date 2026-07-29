/*
 * The arithmetic behind the scroll flow, kept free of React and the DOM so it
 * can be exercised directly. Two of the three bugs found in this engine were
 * arithmetic, not wiring — the footer parking at a third opacity forever, and
 * prose dissolving ahead of the structure around it — so the numbers get
 * tests of their own rather than being reachable only through a browser.
 *
 * See components/scroll-flow.tsx for how these are applied.
 */

/* Beyond this margin an element cannot be seen, so its math is skipped */
export const OFFSCREEN_MARGIN = 80
/* An image starts its wipe once its top clears this fraction of the viewport */
export const WIPE_TRIGGER_RATIO = 0.86

/* The only part of a DOMRect any of this needs */
export interface FlowRect {
  top: number
  bottom: number
}

export interface FlowStyle {
  opacity: number
  translateY: number
  /* 0 means no filter at all, not a zero-radius one */
  blurPx: number
}

export interface RecedeStyle {
  opacity: number
  translateY: number
}

/*
 * Viewport heights the enter ramp is tuned against. Between them the geometry
 * is interpolated; outside them it holds at the nearer anchor.
 */
const TALL_VIEWPORT = 900
const SHORT_VIEWPORT = 700
/* No ramp shorter than this, however squat the window — below roughly a line
 * of scroll the rise stops reading as motion and starts reading as a pop.
 * Scaled down with the ramp fractions below; left at 64 it became the binding
 * constraint on every viewport under ~740px, which flattened the tightening
 * that enterRamp exists to do. */
export const MIN_RAMP_HEIGHT = 44
/*
 * How far an element rises on its way in, as a share of the ramp it rises
 * over. A share rather than a fixed distance because the two compose: the
 * element climbs its own rise on top of the page's scroll, so a constant
 * distance over a variable ramp would make the same content overshoot faster
 * on a phone than on a desktop. The ratio comes from the geometry a full-height
 * window originally had — 32px of rise across a 180px ramp — and is now held
 * everywhere, so shortening the ramp shortens the rise with it.
 */
const RISE_RATIO = 32 / 180

export interface EnterRamp {
  /* Viewport offset at which an element begins resolving */
  start: number
  /* Distance it travels between invisible and fully resolved */
  height: number
}

export const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))

/*
 * Where the enter ramp starts and how long it runs, in pixels.
 *
 * The start is a flat fraction of the viewport that tightens as the window
 * shortens — the ramp begins nearer the bottom edge on a phone, where the
 * lowest ~150px otherwise never resolved and the page read as cut off rather
 * than as in motion under the browser's own chrome.
 *
 * The ramp height tightens on the same curve. It used to run a fifth of a
 * full-height screen, which put a tall band of half-blurred, half-faded
 * content along the bottom edge on every scroll — enough of the viewport that
 * the softening read as a permanent state rather than as an arrival. Cut to
 * roughly 0.6 of that, so content is resolved well before it reaches reading
 * height and the ramp is something you pass through instead of sit in.
 */
export const enterRamp = (viewportHeight: number): EnterRamp => {
  const shortness = clamp01((TALL_VIEWPORT - viewportHeight) / (TALL_VIEWPORT - SHORT_VIEWPORT))
  const startFraction = 0.96 + 0.04 * shortness
  const rampFraction = 0.12 - 0.06 * shortness

  return {
    start: viewportHeight * startFraction,
    height: Math.max(viewportHeight * rampFraction, MIN_RAMP_HEIGHT),
  }
}

/*
 * `k` stretches the exit ramp. Lower means a later, shorter melt: the element
 * stays crisp until its bottom is nearly at the header. Body prose runs below
 * 1 so the scaffolding around it dissolves first.
 *
 * Anything unparseable falls back to 1, including the "true" that JSX renders
 * for a bare `data-flow` and the "" that comes from an explicit empty value.
 * Zero would flatten the exit ramp into a divide-by-zero, so it is rejected
 * too rather than silently producing Infinity.
 */
export const parseFlowFactor = (raw: string | undefined): number => {
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

/*
 * enter ramps over the bottom of the viewport (see enterRamp for how much of
 * it); exit melts the element as its bottom edge approaches the header.
 *
 * remainingScroll keeps the last element on the page honest. Whatever sits at
 * the bottom of the document can never climb out of the enter ramp, because
 * the page runs out of scroll before the element runs out of ramp — left
 * alone the footer parks forever at a third opacity under a blur. The final
 * screenful therefore raises a floor under enter: no effect while there is a
 * ramp's worth of scrolling left, rising to fully resolved as the page lands.
 * The same floor covers a page too short to scroll at all.
 */
export const computeFlow = (
  rect: FlowRect,
  viewportHeight: number,
  remainingScroll: number,
  k: number,
): FlowStyle => {
  if (rect.bottom < -OFFSCREEN_MARGIN || rect.top > viewportHeight + OFFSCREEN_MARGIN) {
    return { opacity: 0, translateY: 0, blurPx: 0 }
  }

  const ramp = enterRamp(viewportHeight)
  const enterFloor = clamp01(1 - remainingScroll / ramp.height)
  const enter = Math.max(clamp01((ramp.start - rect.top) / ramp.height), enterFloor)
  const exit = clamp01((rect.bottom - viewportHeight * 0.06) / (viewportHeight * 0.22 * k))
  const visibility = Math.min(enter, exit)

  return {
    opacity: visibility ** 1.15,
    translateY: (1 - enter) * ramp.height * RISE_RATIO - (1 - exit) * 26,
    // Blur is by far the most expensive property here, so it is dropped
    // outright once the element has effectively settled rather than leaving a
    // 0.07px filter pinning it to a blur-capable layer for the rest of the scroll
    blurPx: visibility > 0.98 ? 0 : (1 - visibility) * 3.5,
  }
}

/*
 * The hero doesn't scroll away so much as hand the page off: the title drifts
 * up faster than the page and thins to a quarter, the meta row travels at half
 * that rate and leaves completely.
 */
export const computeRecede = (
  kind: "title" | "meta",
  viewportHeight: number,
  scrollY: number,
): RecedeStyle => {
  const isMeta = kind === "meta"
  const progress = clamp01(scrollY / (viewportHeight * 0.9))

  return {
    opacity: isMeta ? 1 - progress : 1 - progress * 0.75,
    translateY: scrollY * (isMeta ? 0.08 : 0.16),
  }
}

export const shouldReleaseWipe = (rectTop: number, viewportHeight: number): boolean =>
  rectTop < viewportHeight * WIPE_TRIGGER_RATIO
