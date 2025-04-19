import { Star } from "lucide-react";

export default function StarRating({ rating, className = "" }) {
  // Convert rating to 0-5 scale if it isn't already
  const normalizedRating = rating > 5 ? rating / 2 : rating;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="h-4 w-4 text-yellow-500" />
          <Star className="absolute left-0 top-0 h-4 w-4 fill-yellow-500 text-yellow-500" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-500" />
      ))}
      <span className="ml-1 text-sm font-semibold">{normalizedRating.toFixed(1)}</span>
    </div>
  );
}