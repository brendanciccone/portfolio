/*
 * Brand marks for the My Stack section, stored as static SVGs in
 * public/about/tools/ (sourced from svgl.app's official asset library;
 * claude-white and openai-white are simple-icons marks refilled white for
 * their brand tiles).
 *
 * tile overrides the default white/hairline tile for brands recognized by
 * their app-icon background (matching the Crenel/Magier chips in Experience).
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
  { name: "Figma", src: "/about/tools/figma.svg", tile: "bg-[#1E1E1E]" },
  { name: "Cursor", src: "/about/tools/cursor.svg", tile: "bg-[#000000]" },
  { name: "OpenAI", src: "/about/tools/openai-white.svg", tile: "bg-[#000000]" },
  { name: "Supabase", src: "/about/tools/supabase.svg", tile: "bg-[#171717]" },
  { name: "Cloudflare", src: "/about/tools/cloudflare-white.svg", tile: "bg-[#F6821F]" },
  /* PostHog's mark keeps black segments, so its brand cream is the correct bg */
  { name: "PostHog", src: "/about/tools/posthog.svg", tile: "bg-[#EEEFE9]" },
]
