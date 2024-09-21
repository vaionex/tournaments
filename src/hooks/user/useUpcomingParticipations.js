import { getUpcomingParticipations } from "@/db/user";
import { useQuery } from "react-query";

export default function useUpcomingParticipations() {
  return useQuery({
    queryKey: ["user", "upcomingParticipations"],
    queryFn: () => getUpcomingParticipations(),
  });
}
