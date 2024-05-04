import { getParticipations } from "@/db/user";
import { useQuery } from "react-query";

export default function useParticipations() {
  return useQuery({
    queryKey: ["participations"],
    queryFn: getParticipations,
  });
}
