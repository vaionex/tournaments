import { endTournament } from "@/db/tournament";
import { useMutation, useQueryClient } from "react-query";

export default function useEndTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables) => endTournament(variables),
    onSuccess: (_, { tournament_id }) =>
      queryClient.refetchQueries(["tournament", tournament_id]),
  });
}
