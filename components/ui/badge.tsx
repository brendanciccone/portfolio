import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base styles - fully rounded, flat, no border/shadow
  "inline-flex items-center gap-x-1.5 rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        // Olive (default) - semi-transparent bg with solid text
        default: [
          "bg-olive-600/10 text-olive-700",
          "dark:bg-white/10 dark:text-olive-300",
        ],
        secondary: [
          "bg-olive-600/5 text-olive-600",
          "dark:bg-white/5 dark:text-olive-400",
        ],
        outline: [
          "bg-transparent text-olive-700 ring-1 ring-inset ring-olive-950/10",
          "dark:text-olive-300 dark:ring-white/10",
        ],
        destructive: [
          "bg-red-500/15 text-red-700",
          "dark:bg-red-500/10 dark:text-red-400",
        ],
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
