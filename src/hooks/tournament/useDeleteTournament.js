import { deleteTournament } from "@/db/tournament";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => deleteTournament(id),
    onSuccess: (_, { id }) => {
      queryClient.setQueryData(["tournaments"], (data = []) =>
        data.filter(({ id: _id }) => _id != id),
      );
    },
  });
}
