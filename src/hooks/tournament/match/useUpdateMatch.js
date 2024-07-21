import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, tournamentId, ...data }) => {
      await api.post(`tournament/match/update`, { id, ...data });
    },
    onSuccess: (_, { id, tournamentId, ...data }) => {
      queryClient.setQueryData(
        ["tournament", tournamentId, "matches"],
        (old = []) =>
          old.map((match) => (match.id == id ? { ...match, ...data } : match)),
      );
    },
  });
}
