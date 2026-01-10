"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Basic layout with relative positioning for pseudo-element layering
      "peer relative isolate flex size-4 shrink-0 items-center justify-center rounded-[0.25rem]",
      // Background + shadow on before pseudo (blends with border in light mode)
      "before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.25rem-1px)] before:bg-white before:shadow-sm",
      // Background color when checked
      "data-[state=checked]:before:bg-primary",
      // Hide before pseudo in dark mode
      "dark:before:hidden",
      // Background in dark mode (applied directly to control)
      "dark:bg-white/5 dark:data-[state=checked]:bg-primary",
      // Border styling
      "border border-olive-950/15 data-[state=checked]:border-transparent data-[state=checked]:bg-olive-950",
      "hover:border-olive-950/30 hover:data-[state=checked]:border-transparent",
      // Dark mode border
      "dark:border-white/15 dark:data-[state=checked]:border-white/5",
      "dark:hover:border-white/30 dark:hover:data-[state=checked]:border-white/5",
      // Inner highlight shadow (after pseudo)
      "after:absolute after:inset-0 after:rounded-[calc(0.25rem-1px)] after:shadow-[inset_0_1px_theme(colors.white/15%)]",
      // Dark mode: expand after and only show when checked
      "dark:after:-inset-px dark:after:hidden dark:after:rounded-[0.25rem] dark:data-[state=checked]:after:block",
      // Focus ring
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
      // Disabled state
      "disabled:cursor-not-allowed disabled:opacity-50",
      "disabled:border-olive-950/25 disabled:bg-olive-950/5 disabled:before:bg-transparent",
      "dark:disabled:border-white/20 dark:disabled:bg-white/[2.5%]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-primary-foreground")}
    >
      <Check className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
