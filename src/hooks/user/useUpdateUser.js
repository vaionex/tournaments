import { updateUser } from "@/db/user";
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (user = {}) => {
        return {
          ...user,
          ...data,
        };
      });
    },
  });
}
