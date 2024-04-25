import { supabase } from "@/supabase/client";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateEmail() {
  return useMutation({
    mutationFn: async ({ email }) => {
      const { error } = await supabase.auth.updateUser({
        email,
      });
      if (error) throw error;
    },
    onSuccess: () => toast.success("Confirmation email sent"),
    onError: () => toast.error("Failed to update email"),
  });
}
