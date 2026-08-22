import type React from "react"
import { cn } from "@/lib/utils"

export interface StatRow {
  label: string
  /* ReactNode so a value can carry a link — the home hero's "Currently" row
     holds the page's single link to corellium.com */
  value: React.ReactNode
}

interface StatRowsProps {
  rows: readonly StatRow[]
  className?: string
}

/*
 * Page-level metadata: label/value pairs separated by hairlines. Used by the
 * home hero and by every case-study header.
 *
 * Deliberately not the chip treatment the cards use, and the distinction is
 * the point: chips are compact tags that ride along with a card, while these
 * are facts meant to be read off the page. At four items a chip row wrapped to
 * two lines at 390px and orphaned the last tag, and it flattened the one fact
 * about the designer — the role — into a peer of "Acquired".
 *
 * Label muted at 14/400, value ink at 16/600. That ranks the pair below a
 * section heading and above body copy without borrowing either's treatment,
 * which matters because the section labels sit at 18/600 muted: a stat label
 * has to stay clear of them by size as well as weight.
 *
 * border-t plus divide-y gives a rule above the first row and between the
 * rest, with none closing the block — the list ends into whatever follows it
 * rather than being boxed off from it.
 */
export const StatRows = ({ rows, className }: StatRowsProps): React.JSX.Element => (
  <dl className={cn("border-t border-border divide-y divide-border", className)}>
    {rows.map(({ label, value }) => (
      <div key={label} className="flex items-baseline justify-between gap-4 py-2.5">
        <dt className="text-sm text-muted-foreground">{label}</dt>
        {/* Right-aligned so a value long enough to wrap — "Senior Product
            Designer (Contract)" is the worst case — stays ragged-left against
            the rule rather than drifting away from its own label */}
        <dd className="text-base font-semibold text-right">{value}</dd>
      </div>
    ))}
  </dl>
)
