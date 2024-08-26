import { getTournaments } from "@/db/tournament";
import { useQuery } from "react-query";

export default function useTournaments(parameters) {
  return useQuery({
    queryKey: ["tournaments", parameters],
    queryFn: () => getTournaments(parameters),
  });
}
