import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { getRank } from "@/utils/rank";
import Border from "./avatar/border";

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  className?: string;
  containerClassName?: string;
  profile_picture?: string;
  src?: string;
  xp?: number;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ 
  className = "", 
  containerClassName = "",
  profile_picture,
  src,
  xp,
  ...props 
}, ref) => {
  const rank = getRank(xp);
  
  // Get the size from className (default to 32px if not specified)
  const sizeMatch = className.match(/size-(\d+)/);
  const size = sizeMatch ? parseInt(sizeMatch[1]) * 4 : 32; // Convert Tailwind size to px
  
  // Add optimization parameters to Supabase URLs
  const optimizedSrc = (profile_picture || src) && (profile_picture || src).includes('supabase.co')
    ? `${profile_picture || src}?width=${size}&height=${size}&quality=80`
    : profile_picture || src || "/images/profile-picture-placeholder.webp";

  return (
    <div className={cn("relative", containerClassName)}>
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        <AvatarPrimitive.Image
          src={optimizedSrc}
          className="aspect-square h-full w-full object-cover object-center"
          alt="Avatar"
        />
      </AvatarPrimitive.Root>
      <Border
        className="absolute -inset-0 scale-[1.16]"
        rank={rank}
        preserveAspectRatio="none"
      />
    </div>
  );
});
Avatar.displayName = "Avatar";

export { Avatar };
export default Avatar; 