import { api } from "@/utils/api";
import { useMutation } from "react-query";

export default function useUpdateLoginChallenge() {
  return useMutation({
    mutationFn: () => api.post("challenges/login/update"),
  });
}
