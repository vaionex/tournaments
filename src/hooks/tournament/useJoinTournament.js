import { joinTournament } from "@/db/tournament";
import { useMutation, useQueryClient } from "react-query";
import useUser from "../auth/useUser";
import { useRouter } from "next/navigation";

export default function useJoinTournament() {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const { refresh } = useRouter();

  return useMutation({
    mutationFn: ({ tournament_id }) => joinTournament(tournament_id),
    onSuccess: (_, { tournament_id }) => {
      refresh();
      queryClient.refetchQueries(["user"]);
      queryClient.refetchQueries(["tournament", tournament_id, "participants"]);
      queryClient.refetchQueries(["participations"]);
    },
  });
}
