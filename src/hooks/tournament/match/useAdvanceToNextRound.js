import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export default function useAdvanceToNextRound() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ matchId, winnerId }) => {
      await api.post("tournament/match/advance", { matchId, winnerId });
    },
    onSuccess: (_, { tournamentId }) => {
      queryClient.refetchQueries(["tournament", tournamentId, "matches"]);
    },
  });
}
