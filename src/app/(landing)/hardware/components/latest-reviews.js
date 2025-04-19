"use client";

import { useLatestReviews } from "@/hooks/hardware/useHardwareReviews";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/ui/loader";
import { useSearchParams, useRouter } from "next/navigation";
import StarRating from "@/components/ui/star-rating";

const calculateAverageRating = (ratings) => {
  if (!ratings) return 0;
  console.log('Ratings data:', ratings); // Debug log
  const values = Object.values(ratings);
  console.log('Rating values:', values); // Debug log
  if (values.length === 0) return 0;
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  console.log('Calculated average:', average); // Debug log
  return average;
};

export default function LatestReviews() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: reviewsData = { data: [], total: 0, page: 1, totalPages: 1 }, isLoading } = useLatestReviews(category);
  const { data: reviews = [], total, totalPages } = reviewsData;

  // Debug log for reviews data
  console.log('Reviews data:', reviews);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/hardware?${params.toString()}`);
  };

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
    <section className="w-full">
      <h2 className="mb-6 text-2xl font-bold">Latest Reviews</h2>
      <div className="space-y-6 w-full">
        {reviews.map((review) => {
          const averageRating = calculateAverageRating(review.ratings);
          return (
            <Link
              key={review.slug}
              href={`/hardware/${review.slug}`}
              className="block w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-colors hover:border-primary"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6">
                <div className="w-full md:w-48 h-48 md:h-32 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={review.image_url}
                    alt={review.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2 text-sm text-primary">{review.category}</div>
                  <h3 className="mb-2 text-xl font-bold text-white line-clamp-2">
                    {review.title}
                  </h3>
                  <p className="mb-4 text-sm text-neutral-400 line-clamp-2">
                    {review.subtitle}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <StarRating rating={averageRating} />
                    <Button variant="secondary" size="sm">
                      Read Review
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="border border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-neutral-400">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="border border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </section>
  );
}