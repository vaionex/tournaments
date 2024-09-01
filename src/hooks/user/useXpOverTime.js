import { getXpRewards } from "@/db/user";
import { useQuery } from "react-query";

export default function useXpOverTime({ start, end }) {
  return useQuery({
    queryKey: ["user", "xp-over-time", { start, end }],
    queryFn: async () => {
      return await getXpRewards({ start, end });
    },
  });
}
