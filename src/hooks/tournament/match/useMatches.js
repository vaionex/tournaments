import { getMatches } from "@/db/match";
import { useQuery } from "react-query";

export default function useMatches({ tournamentId }) {
  return useQuery({
    queryKey: ["tournament", tournamentId, "matches"],
    queryFn: () => getMatches(tournamentId),
    enabled: !!tournamentId,
  });
}
