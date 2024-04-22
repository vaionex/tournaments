import { supabase } from "@/supabase/client";
import { useMutation } from "react-query";

export default function useSignupWithEmailAndPassword(options) {
  return useMutation({
    mutationFn: async ({ email, password, username }) => {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      if (error || !user) throw error;

      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    },
    ...options,
  });
}
