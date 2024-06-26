import { supabase } from "@/supabase/client";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import useUpdateLoginChallenge from "../challenges/useUpdateLoginChallenge";

export default function useAuthentication() {
  const queryClient = useQueryClient();
  const { mutate: updateLoginChallenge } = useUpdateLoginChallenge();

  const { data: status, isLoading } = useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        updateLoginChallenge();

        return "authenticated";
      }
      return "unauthenticated";
    },
  });

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        queryClient.setQueryData(["auth-status"], "authenticated");
        updateLoginChallenge();
      } else if (event === "SIGNED_OUT") {
        queryClient.setQueryData(["auth-status"], "unauthenticated");
        queryClient.clear();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [queryClient]);

  return {
    status,
    isLoading,
    isAuthenticated: status == "authenticated",
    isUnauthenticated: status == "unauthenticated",
  };
}
