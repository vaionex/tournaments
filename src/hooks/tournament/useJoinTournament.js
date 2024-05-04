import { joinTournament } from "@/db/tournament";
import {
  QueryErrorResetBoundary,
  useMutation,
  useQueryClient,
} from "react-query";
import useUser from "../auth/useUser";

export default function useJoinTournament() {
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  return useMutation({
    mutationFn: ({ tournament_id }) => joinTournament(tournament_id),
    onSuccess: (_, { tournament_id }) => {
      queryClient.refetchQueries(["user"]);
      queryClient.setQueryData(["participations"], (participations = []) => [
        ...participations,
        { tournament_id, user_id: user.id, created_on: new Date() },
      ]);
    },
  });
}
