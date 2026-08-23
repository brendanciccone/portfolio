/*
 * Brand marks for the How I Ship section, stored as static SVGs in
 * public/about/tools/ (sourced from svgl.app's official asset library;
 * claude-white is the simple-icons mark refilled white for the orange tile,
 * openai is the simple-icons mark filled black).
 *
 * tile overrides the default white/hairline tile for brands recognized by
 * their app-icon background (matching the Crenel/Magier chips in Experience).
 *
 * Six is the ceiling, not a coincidence. The row is 34px tiles on a 20px gap,
 * so n of them need 54n - 20 px, against the 320 a 360px phone leaves after
 * the page padding — six fit at 304, seven need 358 and do not. So the row
 * broke 6 + 1 below 398px, a 390px iPhone included, and a single tile alone
 * on a second line reads as a mistake rather than as a list. Adding a tool
 * means swapping one out, or accepting two lines.
 */

export interface Tool {
  name: string
  src: string
  /* Brand app-icon background (bg-* class); omit to fall back to the card
     surface. Every tile carries the hairline border regardless. */
  tile?: string
}

export const tools: readonly Tool[] = [
  { name: "Claude Code", src: "/about/tools/claude-white.svg", tile: "bg-[#D97757]" },
  /* OpenAI's guidelines run black-on-white only; the explicit white tile
     keeps that contrast in dark mode, where the card surface goes near-black */
  { name: "OpenAI", src: "/about/tools/openai.svg", tile: "bg-[#FFFFFF]" },
  { name: "Figma", src: "/about/tools/figma.svg", tile: "bg-[#1E1E1E]" },
  { name: "Supabase", src: "/about/tools/supabase.svg", tile: "bg-[#171717]" },
  { name: "Cloudflare", src: "/about/tools/cloudflare-white.svg", tile: "bg-[#F6821F]" },
  /* PostHog's mark keeps black segments, so its brand cream is the correct bg */
  { name: "PostHog", src: "/about/tools/posthog.svg", tile: "bg-[#EEEFE9]" },
]
