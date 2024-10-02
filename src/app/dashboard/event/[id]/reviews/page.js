"use client";
import Avatar from "@/components/ui/avatar";
import { format } from "date-fns";
import { useState } from "react";
import { Star01 } from "untitledui-js-base";
import FilterButton from "./components/FilterButton";
import SubmitFeedback from "./components/SubmitFeedback";
import useTournamentFeedback from "@/hooks/tournament/useFeedback";
import { useParams } from "next/navigation";
import Rating from "@/components/ui/rating";
import Loader from "@/components/ui/loader";

const feedback = [
  {
    review: "wow amazing tournament",
    rating: 5,
    User: {
      username: "@saad",
      profile_picture: "https://avatars.githubusercontent.com/u/101927351?v=4",
    },
    created_at: "2023-03-01T00:00:00.000Z",
  },
];

const starCount = Array(5)
  .fill(0)
  .map((_, i) => i + 1)
  .reverse();

export default function Reviews() {
  const [ratingFilter, setRatingFilter] = useState("All");
  const { id } = useParams();
  const { data: feedback = [], isLoading } = useTournamentFeedback(id);
  const filteredFeedback = feedback.filter(
    ({ rating }) => ratingFilter === "All" || rating === ratingFilter,
  );
  const numberOfFeebacks = feedback.length;
  const averageRating =
    feedback.length > 0
      ? feedback.reduce((acc, curr) => acc + curr.rating, 0) / numberOfFeebacks
      : "N/A";

  if (isLoading)
    return (
      <div className="py-24">
        <Loader />
      </div>
    );

  return (
    <div className="flex gap-8 p-6">
      <div className="flex-1">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xl font-semibold">Event Rating and Reviews</div>
          <div className="flex gap-2">
            <FilterButton
              onClick={() => setRatingFilter("All")}
              selected={"All" === ratingFilter}
            >
              All
            </FilterButton>
            {Array(5)
              .fill(0)
              .map((_, i) => i + 1)
              .reverse()
              .map((v) => (
                <FilterButton
                  onClick={() => setRatingFilter(v)}
                  selected={v === ratingFilter}
                >
                  <Star01 className="size-4" />
                  <span>{v}</span>
                </FilterButton>
              ))}
          </div>
        </div>
        <div className="space-y-3">
          {filteredFeedback.map(
            ({
              review,
              rating,
              User: { username, profile_picture },
              created_at,
            }) => (
              <div className="flex w-full gap-3 rounded-lg bg-white/10 p-5">
                <div>
                  <Avatar
                    src={profile_picture}
                    className="size-12 rounded-full"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-sm font-medium text-neutral-300">
                        {username}
                      </div>
                      <div className="flex items-center gap-2 text-neutral-400">
                        <Rating value={rating} readonly />{" "}
                        <div className="mb-1">{rating.toFixed(1)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {format(created_at, "dd MMM yyyy")}
                    </div>
                  </div>
                  <div className="text-sm text-neutral-400">{review}</div>
                </div>
              </div>
            ),
          )}
          {feedback.length == 0 && (
            <div className="py-24 text-center text-2xl font-semibold text-neutral-500">
              No feedback yet
            </div>
          )}
        </div>
        <SubmitFeedback id={id} />
      </div>
      <div className="w-64 divide-y divide-white/10 [&>div]:py-10">
        <div className="space-y-2 pt-0">
          <div className="text-sm font-medium text-neutral-300">
            Average Rating
          </div>
          <div className="text-3xl font-bold">
            {typeof averageRating == "number"
              ? averageRating.toFixed(1)
              : averageRating}
            <div>
              {typeof averageRating == "number" && (
                <Rating value={averageRating} readonly fractions={10} />
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-neutral-300">
            Total Feedback
          </div>
          <div className="text-3xl font-bold">{numberOfFeebacks}</div>
        </div>
        <div>
          {starCount.map((v) => {
            const count = feedback.filter(
              (feedback) => feedback.rating === v,
            ).length;
            const width =
              count == 0 || numberOfFeebacks == 0
                ? 1
                : (count / numberOfFeebacks) * 100;
            return (
              <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-300">
                <Star01 className="size-4 shrink-0 text-neutral-500" />
                <div className="w-3 shrink-0 text-center">{v}</div>
                <div
                  className="h-1.5 rounded-full bg-yellow-500"
                  style={{ width: `${width}%` }}
                />
                <div>
                  {feedback.filter((feedback) => feedback.rating === v).length}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
