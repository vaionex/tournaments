import { supabase } from "@/supabase/client";
import { useQuery } from "react-query";
import useAuthentication from "./useAuthentication";

export default function useUser() {
  const { isAuthenticated } = useAuthentication();
  return useQuery({
    enabled: isAuthenticated,
    queryKey: ["user"],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("User").select("*").throwOnError();
      return { ...user, ...data };
    },
  });
}
