import { api } from "@/utils/api";
import { useQuery } from "react-query";

export default function usePendingWithdrawRequests() {
  return useQuery({
    queryKey: ["pending-withdraw-requests"],
    queryFn: async () => {
      const { data: requests } = await api.get(
        "admin/withdraw-requests/pending",
      );
      return requests;
    },
  });
}
