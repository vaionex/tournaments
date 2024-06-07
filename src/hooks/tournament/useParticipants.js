import { getParticipants } from "@/db/tournament";
import { useQuery } from "react-query";

export default function useParticipants(id) {
  return useQuery({
    queryKey: ["tournament", id, "participants"],
    queryFn: () => getParticipants(id),
    enabled: Boolean(id),
  });
}
