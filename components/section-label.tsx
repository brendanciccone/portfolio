import type React from "react"
import { cn } from "@/lib/utils"

interface SectionLabelProps {
  title: string
  /* Red index rendered before the title: "01 / OVERVIEW" */
  number?: string
  counter?: string
  as?: "h2" | "h3" | "p"
  className?: string
}

export const SectionLabel = ({ title, number, counter, as: Tag = "h2", className }: SectionLabelProps): React.JSX.Element => {
  return (
    <div className={cn("sys-section-header", className)}>
      <Tag className="sys-section-label">
        {number && (
          <>
            <span className="text-primary">{number}</span>
            <span aria-hidden className="text-muted-foreground font-normal mx-1.5">/</span>
          </>
        )}
        {title}
      </Tag>
      <div className="sys-section-line" />
      {counter && <span className="sys-section-counter whitespace-nowrap">[ {counter} ]</span>}
    </div>
  )
}
