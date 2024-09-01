import { getRecentRewards } from "@/db/user";
import { useQuery } from "react-query";

export default function useRecentRewards() {
  return useQuery({
    queryKey: ["user", "recent-rewards"],
    queryFn: async () => {
      return await getRecentRewards();
    },
  });
}
