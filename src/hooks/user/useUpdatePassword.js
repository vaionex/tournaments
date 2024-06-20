import { supabase } from "@/supabase/client";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function useUpdatePassword() {
  return useMutation({
    mutationFn: async ({ password }) => {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) throw error;
    },
    onSuccess: () => toast.success("Password Updated"),
    onError: (e) => toast.error(e.message ?? "Failed to update password"),
  });
}
