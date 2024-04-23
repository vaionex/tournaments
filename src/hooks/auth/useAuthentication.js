import { supabase } from "@/supabase/client";
import { useEffect, useState } from "react";

export default function useAuthentication() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setStatus("authenticated");
      } else if (event === "SIGNED_OUT") {
        setStatus("unauthenticated");
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return {
    status,
    isLoading: status == "loading",
    isAuthenticated: status == "authenticated",
    isUnauthenticated: status == "unauthenticated",
  };
}
