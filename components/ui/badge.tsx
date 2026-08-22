import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
 * The reference badge is a filled pill, not an outlined chip: secondary
 * surface, transparent border to hold the same box as the outline variant, and
 * 12px semibold in sentence case. Tags are proper nouns and years — caps
 * flattened "Stripe Partner" and "2018-2023" into the same undifferentiated
 * band, which is exactly what the border-only chip was already doing.
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
      variant: "default",
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
