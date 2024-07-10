import { getUpcomingTournaments } from "@/db/tournament";
import { useQuery } from "react-query";

export default function useUpcomingTournaments() {
  return useQuery({
    queryKey: ["tournaments", "upcoming"],
    queryFn: () => getUpcomingTournaments(),
  });
}
