import { updateUser } from "@/db/user";
import { getUserId } from "@/supabase/utils";
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const id = await getUserId();
      await updateUser({ id, ...data });
    },
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
