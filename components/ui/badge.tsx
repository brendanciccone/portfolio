import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * The reference badge is an outlined chip at 12px semibold in sentence case.
 * Tags are proper nouns and years — caps flattened "Stripe Partner" and
 * "2018-2023" into the same undifferentiated band, so sentence case stays.
 *
 * Outline is the DEFAULT, which is the whole point of setting it here rather
 * than passing a variant at each call site: the site has one badge language,
 * and a new <Badge> should arrive already speaking it. It reads as apparatus
 * rather than as a soft blob, which is the register the rest of the chrome is
 * in — a hairline chip next to hairline mats, hairline cards and the mockups'
 * own alpha-traced rings.
 *
 * It also carries further. Against paper the border is a luminance dip of 27
 * concentrated in one pixel, where the filled pill is 11 spread across the
 * whole shape — so an outlined chip is found on a scan and a filled one is
 * found only by someone already reading. That matters most where a badge
 * appears alone, as the Contract/Acquired qualifiers do on About.
 *
 * The filled treatment is still here as `secondary` for anything that needs to
 * recede rather than be found. Nothing uses it today.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-x-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-secondary text-secondary-foreground",
        secondary:
          "border border-transparent bg-secondary text-secondary-foreground",
        outline:
          "border border-input bg-transparent text-foreground",
        destructive:
          "border border-transparent bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
