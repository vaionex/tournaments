import { submitFeedback } from "@/db/tournament";
import { useMutation, useQueryClient } from "react-query";

export default function useSubmitFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, review, rating }) => {
      await submitFeedback(id, { review, rating });
    },
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries(["tournament", id, "feedback"]),
  });
}
