/* eslint-disable react-refresh/only-export-components */
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold border transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white shadow-sm",
        secondary:
          "border-transparent bg-secondary text-white shadow-sm",
        success:
          "bg-success/10 text-success border-success/20",
        warning:
          "bg-warning/10 text-warning border-warning/20",
        destructive:
          "bg-error/10 text-error border-error/20",
        outline:
          "text-text-secondary border-primary/20 bg-surface",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  ...props
}) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
