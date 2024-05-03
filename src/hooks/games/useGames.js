import { getGames } from "@/db/game";
import { useQuery } from "react-query";

export default function useGames() {
  return useQuery({
    queryKey: ["games"],
    queryFn: () => getGames(),
  });
}
