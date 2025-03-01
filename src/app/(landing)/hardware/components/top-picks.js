"use client";

import { useQuery } from "react-query";
import { getTopPicks } from "@/db/hardware";
import Link from "next/link";
import StarRating from "@/components/ui/star-rating";
import Loader from "@/components/ui/loader";

export default function TopPicks() {
  const { data: picks = [], isLoading } = useQuery({
    queryKey: ["hardware-top-picks"],
    queryFn: getTopPicks
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-6 text-xl font-bold">Top Picks</h2>
      <div className="space-y-4">
        {picks.map((pick) => (
          <Link
            key={pick.slug}
            href={`/hardware/${pick.slug}`}
            className="block rounded-lg border border-neutral-800 p-4 transition-colors hover:border-primary"
          >
            <div className="mb-2 text-sm text-primary">{pick.category}</div>
            <h3 className="mb-2 font-semibold text-white">{pick.title}</h3>
            <div className="flex items-center justify-between">
              <StarRating rating={pick.ratings.overall || 0} />
              <span className="font-bold text-primary">${pick.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}