"use client";

import { useFeaturedReviews } from "@/hooks/hardware/useHardwareReviews";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/ui/loader";

export default function FeaturedReviews() {
  const { data: reviews = [], isLoading } = useFeaturedReviews();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Featured Reviews</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <Link
            key={review.slug}
            href={`/hardware/${review.slug}`}
            className="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
          >
            <div className="relative h-48">
              <img
                src={review.image_url}
                alt={review.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-2 text-sm text-primary">{review.category}</div>
              <h3 className="mb-4 text-lg font-bold text-white group-hover:text-primary">
                {review.title}
              </h3>
              <p className="mb-4 line-clamp-2 text-sm text-neutral-400">
                {review.subtitle}
              </p>
              <Button variant="secondary" className="w-full">
                Read Review
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}