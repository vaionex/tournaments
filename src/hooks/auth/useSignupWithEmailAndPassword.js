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
      });
      if (error || !user) throw error;

      const { id } = user;
      await supabase.from("User").insert({ username, id });
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    },
    ...options,
  });
}
