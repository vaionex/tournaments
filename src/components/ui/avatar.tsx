import * as React from "react";
import { cn } from "@/lib/utils";
import { getRank } from "@/utils/rank";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  containerClassName?: string;
  profile_picture?: string;
  src?: string;
  xp?: number;
}

const rankColors = {
  Bronze: "#CD7F32",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  Platinum: "#E5E4E2",
  Diamond: "#B9F2FF",
  Master: "#9370DB",
  Grandmaster: "#FF4500",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className = "",
      containerClassName = "",
      profile_picture,
      src,
      xp,
      ...props
    },
    ref,
  ) => {
    const rank = getRank(xp);

    return (
      <div className={cn("relative", containerClassName)}>
        <div
          ref={ref}
          className={cn(
            "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
            className,
          )}
          {...props}
        >
          <img
            src={
              src ||
              profile_picture ||
              "/images/profile-picture-placeholder.webp"
            }
            className="aspect-square h-full w-full object-cover object-center"
            alt="Avatar"
          />
        </div>
        {rank && rankColors[rank] && (
          <div
            className="absolute -inset-0 scale-[1.16] rounded-full"
            style={{
              background: `linear-gradient(45deg, ${rankColors[rank]}, ${rankColors[rank]}80)`,
              zIndex: -1,
            }}
          />
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export { Avatar };
export default Avatar;
