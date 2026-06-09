/* eslint-disable react-refresh/only-export-components */
import { cva } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all duration-300 outline-none select-none font-sans disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white border border-transparent shadow-active-glow hover:shadow-hover-glow hover:bg-primary/95",
        outline:
          "bg-surface text-primary border border-primary/20 shadow-glow hover:bg-primary/5",
        secondary:
          "bg-secondary text-white border border-transparent shadow-glow hover:bg-secondary/95",
        ghost:
          "text-text-secondary hover:bg-primary/8 hover:text-primary",
        destructive:
          "bg-error text-white border border-transparent shadow-md shadow-error/25 hover:bg-error/95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-8 py-3 text-sm font-semibold rounded-lg",
        xs: "h-8 px-3 text-xs font-semibold rounded-md",
        sm: "h-9 px-4 py-2 text-xs font-semibold rounded-md",
        lg: "h-12 px-10 py-4 text-base font-bold rounded-xl",
        icon: "size-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
