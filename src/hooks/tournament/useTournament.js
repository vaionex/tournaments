import { getTournament } from "@/db/tournament";
import { useQuery } from "react-query";

export default function useTournament(id) {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: () => getTournament(id),
    enabled: Boolean(id),
  });
}
