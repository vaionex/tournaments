import { api } from "@/utils/api";
import { useMutation } from "react-query";

export default function useSubscribeToNewsletter(options = {}) {
  return useMutation({
    mutationFn: async ({ email }) => {
      await api.post("newsletter/subscribe", { email });
    },
    ...options,
  });
}
