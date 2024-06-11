import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 items-center gap-2 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        white: "bg-white text-black",
        black: "bg-neutral-900 text-white hover:bg-neutral-800",
        neon: "bg-lime-400 text-black hover:bg-lime-300",
        danger:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost: "bg-transparent hover:bg-neutral-800",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "px-5 py-3",
        sm: "px-3 py-2 text-sm",
        lg: "h-11 px-8",
        icon: "py-3 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  (
    {
      className = "",
      variant = undefined,
      size = undefined,
      asChild = false,
      disabled,
      loading,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : props.href ? Link : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), className)}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
