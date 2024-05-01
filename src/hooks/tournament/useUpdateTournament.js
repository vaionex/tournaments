import { createTournament, updateTournament } from "@/db/tournament";
import { useMutation } from "react-query";

export default function useUpdateTournament(options) {
  return useMutation({
    mutationFn: ({ id, ...data }) => updateTournament(id, data),
    ...options,
  });
}
