import { getTournaments } from "@/db/tournament";
import { useQuery } from "react-query";

export default function useTournaments() {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: () => getTournaments(),
  });
}
