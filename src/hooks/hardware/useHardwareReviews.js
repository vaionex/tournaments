import { getFeaturedReviews, getLatestReviews } from "@/db/hardware";
import { useQuery } from "react-query";

export function useLatestReviews(category) {
  return useQuery({
    queryKey: ["hardware-reviews", "latest", { category }],
    queryFn: () => getLatestReviews({ category }),
    onError: (error) => {
      console.error("Error fetching latest reviews:", error);
    }
  });
}