"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Loader from "./loader";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 items-center gap-2 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        white: "bg-white text-black hover:bg-white/90",
        black: "bg-neutral-900 text-white hover:bg-neutral-800",
        neon: "bg-lime-400 text-black hover:bg-lime-300",
        danger: "bg-red-500 text-slate-50 hover:bg-red-500/90",
        outline: "border border-slate-200 bg-white hover:bg-slate-100",
        secondary: "bg-white/10 hover:bg-white/20",
        ghost: "bg-transparent hover:bg-neutral-800",
        link: "text-slate-900 underline-offset-4 hover:underline",
        green: "bg-lime-400 text-black px-3 py-2 text-sm",
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
      className,
      variant,
      size,
      asChild = false,
      href,
      disabled,
      loading,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : href ? Link : "button";
    const content = loading ? <Loader className="h-5 w-5" /> : children;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        href={href}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };