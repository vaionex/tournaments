"use client";

import { useLatestReviews } from "@/hooks/hardware/useHardwareReviews";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/ui/loader";
import { useSearchParams } from "next/navigation";
import StarRating from "@/components/ui/star-rating";

export default function LatestReviews() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const { data: reviews = [], isLoading } = useLatestReviews(category);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center text-neutral-400">
        No reviews found for this category
      </div>
    );
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Latest Reviews</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <Link
            key={review.slug}
            href={`/hardware/${review.slug}`}
            className="block overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-colors hover:border-primary"
          >
            <div className="flex gap-6 p-6">
              <div className="h-32 w-48 overflow-hidden rounded-lg">
                <img
                  src={review.image_url}
                  alt={review.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 text-sm text-primary">{review.category}</div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {review.title}
                </h3>
                <p className="mb-4 text-sm text-neutral-400">
                  {review.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <StarRating rating={review.ratings.overall || 0} />
                  <Button variant="secondary" size="sm">
                    Read Review
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}