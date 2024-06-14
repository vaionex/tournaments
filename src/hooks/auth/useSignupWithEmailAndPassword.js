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
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error || !user) throw error;
      if (user.identities.length === 0) throw new Error("Email already exists");
    },
    ...options,
  });
}
