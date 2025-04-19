import { getLatestReviews } from "@/db/hardware";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";

export function useLatestReviews(category) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 6;

  return useQuery({
    queryKey: ["hardware-reviews", "latest", { category, page, pageSize }],
    queryFn: () => getLatestReviews({ category, page, pageSize }),
    onError: (error) => {
      console.error("Error fetching latest reviews:", error);
    }
  });
}