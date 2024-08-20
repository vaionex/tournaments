import { createTournament } from "@/db/tournament";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function useCreateTournament(options) {
  return useMutation({
    mutationFn: (data) => createTournament(data),
    onError: () => toast.error("Something went wrong"),
    ...options,
  });
}
