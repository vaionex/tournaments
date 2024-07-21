import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export default function useGenerateMatches() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      await api.post("tournament/match/generate", { tournamentId: id });
    },
    onSuccess: (_, { id }) => {
      queryClient.refetchQueries(["tournament", id, "matches"]);
    },
  });
}
