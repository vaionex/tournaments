"use client";

import { useQuery } from "react-query";
import { getTopPicks } from "@/db/hardware";
import Link from "next/link";
import StarRating from "@/components/ui/star-rating";
import Loader from "@/components/ui/loader";

const calculateAverageRating = (ratings) => {
  if (!ratings) return 0;
  console.log('Sidebar ratings data:', ratings); // Debug log
  const values = Object.values(ratings);
  console.log('Sidebar rating values:', values); // Debug log
  if (values.length === 0) return 0;
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  console.log('Sidebar calculated average:', average); // Debug log
  return average;
};

export default function TopPicks() {
  const { data: picks = [], isLoading, error } = useQuery({
    queryKey: ["hardware-featured"],
    queryFn: getTopPicks,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    console.error("Error loading featured hardware:", error);
    return (
      <div className="flex h-32 items-center justify-center text-red-500">
        Failed to load featured hardware
      </div>
    );
  }

  if (!picks || picks.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-neutral-400">
        No featured hardware available
      </div>
    );
  }

  return (
    <section className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <h2 className="mb-4 text-lg font-bold">Featured Hardware</h2>
      <div className="space-y-3">
        {picks.map((pick) => (
          <Link
            key={pick.slug}
            href={`/hardware/${pick.slug}`}
            className="flex items-center gap-3 rounded-lg border border-neutral-800 p-3 transition-colors hover:border-primary"
          >
            <div className="flex-1 min-w-0">
              <h3 className="truncate text-sm font-medium text-white">{pick.title}</h3>
              <div className="flex items-center gap-2">
                <StarRating rating={calculateAverageRating(pick.ratings)} className="scale-75 origin-left" />
                <span className="text-xs font-medium text-primary">${pick.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}