import { api } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export default function useCreateWithdrawRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ amount, paypal }) => {
      await api.post("/user/withdraw", { amount, paypal });
    },
    onSuccess: () => {
      queryClient.refetchQueries(["transactions"]);
    },
  });
}
