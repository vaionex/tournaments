import { format } from "date-fns";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ArrowRight } from "untitledui-js-base";

export default function Post({
  title,
  date,
  slug,
  excerpt,
  featuredImage,
  author,
  row,
}) {
  return (
    <div
      className={twMerge(
        "flex h-full min-h-0 flex-1 flex-col gap-6",
        row && "md:flex-row",
      )}
    >
      <Link href={`/news/${slug}`} className={twMerge("min-h-0 flex-1")}>
        <img
          src={featuredImage?.node?.sourceUrl}
          className="mb-2 h-full w-full overflow-hidden rounded-xl border border-white/20 object-cover object-center"
          alt={title}
        />
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
