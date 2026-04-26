import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-x-1.5 h-[22px] px-2 text-[10px] font-mono font-medium uppercase tracking-[0.14em] leading-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-foreground bg-transparent text-foreground",
        secondary:
          "border border-foreground/40 bg-transparent text-muted-foreground",
        outline:
          "border border-foreground bg-transparent text-foreground",
        destructive:
          "border border-destructive bg-transparent text-destructive",
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
