import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-x-1.5 rounded-none px-2 py-0.5 text-[10px] uppercase tracking-[0.06em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-input bg-transparent text-muted-foreground",
        secondary:
          "border-0 bg-muted text-muted-foreground",
        outline:
          "bg-transparent text-muted-foreground border border-input",
        destructive:
          "border border-destructive/30 bg-transparent text-destructive",
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
