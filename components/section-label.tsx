import type React from "react"
import { cn } from "@/lib/utils"

interface SectionLabelProps {
  title: string
  as?: "h2" | "h3" | "p"
  /* Opt the header into the scroll flow. Off by default because labels inside
     an already-flowing panel would compound their parent's fade. */
  flow?: boolean
  className?: string
}

export const SectionLabel = ({ title, as: Tag = "h2", flow, className }: SectionLabelProps): React.JSX.Element => (
  <Tag data-flow={flow ? "" : undefined} className={cn("sys-section-label", className)}>
    {title}
  </Tag>
)
