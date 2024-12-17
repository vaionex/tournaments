import { getFeaturedReviews, getLatestReviews } from "@/db/hardware";
import { useQuery } from "react-query";

export function useFeaturedReviews() {
  return useQuery({
    queryKey: ["hardware-reviews", "featured"],
    queryFn: getFeaturedReviews,
    onError: (error) => {
      console.error("Error fetching featured reviews:", error);
    }
  });
}

export function useLatestReviews() {
  return useQuery({
    queryKey: ["hardware-reviews", "latest"],
    queryFn: getLatestReviews,
    onError: (error) => {
      console.error("Error fetching latest reviews:", error);
    }
  });
}