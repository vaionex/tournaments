import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export default function useCompletePendingWithdraw() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }) => {
      await api.post("admin/withdraw-requests/pending/complete", { id });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries(["pending-withdraw-requests"]);
    },
  });
}
