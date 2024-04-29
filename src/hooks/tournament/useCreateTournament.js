import { createTournament } from "@/db/tournament";
import { useMutation } from "react-query";

export default function useCreateTournament(options) {
  return useMutation({
    mutationFn: (data) => createTournament(data),
    ...options,
  });
}
