import { twMerge } from "tailwind-merge";
import Border from "./border";
import { getRank } from "@/utils/rank";

export default function Avatar({
  profile_picture,
  src,
  xp,
  className = "",
  containerClassName = "",
}) {
  const rank = getRank(xp);
  
  // Get the size from className (default to 32px if not specified)
  const sizeMatch = className.match(/size-(\d+)/);
  const size = sizeMatch ? parseInt(sizeMatch[1]) * 4 : 32; // Convert Tailwind size to px
  
  // Add optimization parameters to Supabase URLs
  const optimizedSrc = (profile_picture || src) && (profile_picture || src).includes('supabase.co')
    ? `${profile_picture || src}?width=${size}&height=${size}&quality=80`
    : profile_picture || src || "/images/profile-picture-placeholder.webp";
  
  return (
    <div className={twMerge("relative", containerClassName)}>
      <img
        src={optimizedSrc}
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
