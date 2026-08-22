import type React from "react"

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
 * Label muted at 14/500, value ink at 16/600. That ranks the pair below a
 * section heading and above body copy without borrowing either's treatment:
 * section labels are 18/600 ink, so a stat label is clear of them on size,
 * weight and colour at once.
 *
 * The label takes 500 rather than 400 under the scale's optical-floor rule:
 * below 16px muted 400 thins out, so labels at 12–14 carry 500 to keep their
 * presence. Card descriptions stay at 400 at the same size because they are
 * sentences — the floor applies to labels, not to prose.
 *
 * One rule under each row, and none above the first. Every row is a label and
 * its value with a line closing it, so the rule reads as belonging to the row
 * it follows rather than to the gap between two of them.
 *
 * This replaced border-t plus divide-y, which put a rule above the first row
 * and between the rest. That construction gives the same number of lines in
 * almost the same places, but it opens the block with a rule instead of with a
 * fact — on the home hero that line landed directly under the intro sentence
 * and read as underlining it, and on a case study it doubled the bottom edge of
 * the hero image's frame.
 */
export const StatRows = ({ rows, className }: StatRowsProps): React.JSX.Element => (
  <dl className={className}>
    {rows.map(({ label, value }) => (
      <div key={label} className="flex items-baseline justify-between gap-4 border-b border-border py-2.5">
        <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
        {/* Right-aligned so a value long enough to wrap — "Senior Product
            Designer (Contract)" is the worst case — stays ragged-left against
            the rule rather than drifting away from its own label */}
        <dd className="text-base font-semibold text-right">{value}</dd>
      </div>
    ))}
  </dl>
)
