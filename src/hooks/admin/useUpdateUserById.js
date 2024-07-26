import { updateUser } from "@/db/user";
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateUserById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: (data) => {
      queryClient.setQueriesData(["admin", "users"], (users = []) =>
        users.map((user) => (user.id == data.id ? { ...user, ...data } : user)),
      );
    },
  });
}
