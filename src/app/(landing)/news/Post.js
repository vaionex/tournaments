import { format } from "date-fns";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ArrowRight } from "untitledui-js-base";
import { getSmartOptimizedImageUrl } from "@/utils/image-optimization";

export default function Post({
  title,
  date,
  slug,
  excerpt,
  featuredImage,
  author,
  row,
}) {
  // Always apply optimization parameters if the URL exists
  const imageUrl = getSmartOptimizedImageUrl(
    featuredImage?.node?.sourceUrl,
    600,
    400,
    80,
    "/images/profile-picture-placeholder.webp"
  );
    
  return (
    <div
      className={twMerge(
        "flex h-full min-h-0 flex-1 flex-col gap-6",
        row && "md:flex-row",
      )}
    >
      <Link 
        href={`/news/${slug}`} 
        className={twMerge("min-h-0 flex-1 relative group overflow-hidden rounded-xl")}
      >
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <img
            src={imageUrl}
            className="h-full w-full rounded-xl border border-white/20 object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
            alt={title}
          />
          <div className="absolute -inset-5 bg-gradient-to-t from-black via-black/70 to-black/30 rounded-xl pointer-events-none transform scale-110"></div>
        </div>
      </Link>
      <div
        className={twMerge(
          "space-y-2 ",
          row && "flex-1",
          !row && "flex flex-col justify-between ",
        )}
      >
        <div className="space-y-2">
          <div className="text-sm font-semibold text-primary-400">
            {author?.node?.name} • {format(new Date(date), "dd MMM yyyy")}
          </div>
          <Link
            href={`/news/${slug}`}
            className="flex items-start justify-between gap-2"
          >
            <h2 className="line-clamp-1 text-2xl font-semibold hover:underline">
              {title}
            </h2>
            <ArrowRight className="size-6 shrink-0 -rotate-45" />
          </Link>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: excerpt }}
          className="line-clamp-2 text-neutral-200"
        />
      </div>
    </div>
  );
}
