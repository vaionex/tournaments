import { supabase } from "@/supabase/client";
import { useMutation } from "react-query";

export default function useLoginWithPassword(options) {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    },
    ...options,
  });
}
