import { getPendingTournaments } from "@/db/tournament";
import { useQuery } from "react-query";

export default function usePendingTournaments() {
  return useQuery({
    queryKey: ["tournaments", "pending"],
    queryFn: getPendingTournaments,
  });
}
