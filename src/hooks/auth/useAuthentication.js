import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function useAuthentication() {
  const queryClient = useQueryClient();
  const { data: status, isLoading } = useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) return "authenticated";
      return "unauthenticated";
    },
  });

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        queryClient.setQueryData(["auth-status"], "authenticated");
      } else if (event === "SIGNED_OUT") {
        queryClient.setQueryData(["auth-status"], "unauthenticated");
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
