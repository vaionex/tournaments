import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReviewSidebar({ review }) {
  if (!review) return null;

  return (
    <div className="w-80 space-y-6">
      {/* Price Section */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h3 className="mb-4 text-lg font-semibold">Price</h3>
        <div className="mb-4 text-3xl font-bold text-primary">${review.price}</div>
      </div>

      {/* Rating Section */} 
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h3 className="mb-4 text-lg font-semibold">Rating</h3>
        <div className="space-y-4">
          {Object.entries(review.ratings || {}).map(([key, value]) => (
            <div key={key}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-neutral-400 capitalize">
                  {key.replace("_", " ")}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{value}</span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-800">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${value * 20}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h3 className="mb-4 text-lg font-semibold">Pros & Cons</h3>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-medium text-green-500">Pros</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-neutral-400">
              {review.pros?.map((pro, i) => (
                <li key={i}>{pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-medium text-red-500">Cons</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-neutral-400">
              {review.cons?.map((con, i) => (
                <li key={i}>{con}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}