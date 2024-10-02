import { getFeedback } from "@/db/tournament";
import { useQuery } from "react-query";

export default function useFeedback(id) {
  return useQuery({
    queryKey: ["tournament", id, "feedback"],
    queryFn: async () => await getFeedback(id),
  });
}
