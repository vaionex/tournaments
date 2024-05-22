"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const Radio = React.forwardRef(({ className, label, ...props }, ref) => {
  return (
    <div className="flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-white/20 bg-white/20 text-white ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary dark:border-slate-50 dark:border-slate-800 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-1.5 w-1.5 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && <label htmlFor={props.id}>{label}</label>}
    </div>
  );
});
Radio.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, Radio };
