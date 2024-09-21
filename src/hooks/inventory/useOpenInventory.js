import { api } from "@/utils/api";
import { useMutation } from "react-query";

export default function useOpenInventory() {
  return useMutation({
    mutationFn: async ({ id }) => {
      const { data } = await api.post("user/inventory/open", { id });
      return data;
    },
  });
}
