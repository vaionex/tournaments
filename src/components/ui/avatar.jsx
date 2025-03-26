import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import AvatarDefault from "./avatar/index";

/**
 * Shadcn UI Avatar components
 * This file exports both:
 * 1. Named exports: The Radix UI Avatar components for use with import { Avatar, AvatarImage, AvatarFallback }
 * 2. Default export: The custom Avatar component for use with import Avatar
 */

/**
 * @typedef {Object} AvatarProps
 * @property {string} [className]
 */

/**
 * @param {AvatarProps} props
 * @param {React.Ref<any>} ref
 */
const Avatar = React.forwardRef((props, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      props.className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/**
 * @typedef {Object} AvatarImageProps
 * @property {string} [className]
 * @property {string} [src]
 * @property {string} [alt]
 */

/**
 * @param {AvatarImageProps} props
 * @param {React.Ref<any>} ref
 */
const AvatarImage = React.forwardRef((props, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", props.className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/**
 * @typedef {Object} AvatarFallbackProps
 * @property {string} [className]
 */

/**
 * @param {AvatarFallbackProps} props
 * @param {React.Ref<any>} ref
 */
const AvatarFallback = React.forwardRef((props, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-neutral-800 text-sm font-medium text-white",
      props.className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
export default AvatarDefault; 