import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles with relative positioning for pseudo-element layering
  "relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Default/solid button with depth effects
        default: [
          // Optical border - darker bg acts as the border in light mode
          "border-transparent bg-olive-950 text-primary-foreground",
          // Dark mode: use theme primary (light bg, dark text)
          "dark:bg-olive-200 dark:text-olive-900 dark:border-olive-950/10",
          // Button background layer (before pseudo-element)
          "before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-primary",
          // Drop shadow on the before layer
          "before:shadow-sm",
          // Inner highlight layer (after pseudo-element)
          "after:absolute after:inset-0 after:-z-10 after:rounded-full",
          // Subtle inner top highlight for depth
          "after:shadow-[inset_0_1px_theme(colors.white/15%)]",
          // Hover overlay effect
          "hover:after:bg-white/10 active:after:bg-white/10",
          // Dark mode: darker overlay on hover since bg is light
          "dark:hover:after:bg-olive-950/5 dark:active:after:bg-olive-950/5",
          // Disabled state: remove shadows
          "disabled:before:shadow-none disabled:after:shadow-none",
        ],
        destructive: [
          // Optical border approach for destructive
          "border-transparent bg-red-700 text-white",
          "dark:bg-red-600 dark:border-red-700/50",
          "before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-destructive",
          "before:shadow-sm",
          "after:absolute after:inset-0 after:-z-10 after:rounded-full",
          "after:shadow-[inset_0_1px_theme(colors.white/15%)]",
          "hover:after:bg-white/10 active:after:bg-white/10",
          "disabled:before:shadow-none disabled:after:shadow-none",
        ],
        outline: [
          // Outline variant with subtle border and hover effects
          "border border-olive-950/15 bg-transparent text-foreground",
          "dark:border-white/15 dark:text-foreground",
          // Subtle shadow for depth
          "shadow-sm",
          // Hover state
          "hover:bg-olive-950/5 active:bg-olive-950/5",
          "dark:hover:bg-white/5 dark:active:bg-white/5",
        ],
        secondary: [
          // Secondary with subtle depth
          "border-transparent bg-olive-200 text-olive-900",
          "dark:bg-olive-800 dark:text-olive-100 dark:border-white/5",
          "before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-secondary",
          "before:shadow-sm",
          "after:absolute after:inset-0 after:-z-10 after:rounded-full",
          "after:shadow-[inset_0_1px_theme(colors.white/25%)]",
          "hover:after:bg-olive-950/5 active:after:bg-olive-950/5",
          "dark:hover:after:bg-white/10 dark:active:after:bg-white/10",
          "disabled:before:shadow-none disabled:after:shadow-none",
        ],
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-10 rounded-full px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
