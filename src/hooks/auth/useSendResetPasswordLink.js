import { supabase } from "@/supabase/client";
import { useMutation } from "react-query";

export default function useSendResetPasswordLink() {
  return useMutation({
    mutationFn: async ({ email }) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    },
  });
}
