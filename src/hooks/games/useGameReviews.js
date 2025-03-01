import { getGameReviews } from "@/db/games";
import { useQuery } from "react-query";

export default function useGameReviews(params) {
  return useQuery({
    queryKey: ["game-reviews", params],
    queryFn: () => getGameReviews(params)
  });
}