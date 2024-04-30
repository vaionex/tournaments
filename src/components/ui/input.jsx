import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, label, leftSection, ...props }, ref) => {
    const Comp = type == "textarea" ? "textarea" : "input";
    return (
      <div>
        {label && (
          <label
            className="mb-1.5 block text-sm font-medium"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <div className="flex w-full items-center gap-2 rounded-md border border-neutral-700 bg-neutral-900 px-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus:bg-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300">
          {leftSection}
          <Comp
            type={type}
            className={cn(
              "flex-1 bg-transparent py-2.5 focus:outline-0",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
