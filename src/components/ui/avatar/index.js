import { twMerge } from "tailwind-merge";
import Border from "./border";
import { getRank } from "@/utils/rank";

export default function Avatar({ profile_picture, src, xp, className = "" }) {
  const rank = getRank(xp);
  return (
    <div className="relative">
      <img
        src={
          profile_picture ?? src ?? "/images/profile-picture-placeholder.webp"
        }
        className={twMerge("size-8 object-cover object-center", className)}
        alt="Avatar"
      />
      <Border
        className="absolute -inset-0 scale-[1.16]"
        rank={rank}
        preserveAspectRatio="none"
      />
    </div>
  );
}
