import { supabase } from "@/supabase/client";
import { useQuery } from "react-query";
import useAuthentication from "./useAuthentication";
import { getUserId } from "@/supabase/utils";

export default function useUser() {
  const { isAuthenticated } = useAuthentication();
  return useQuery({
    enabled: isAuthenticated,
    queryKey: ["user"],
    initialData: {},
    queryFn: async () => {
      const { data, error: authError } = await supabase.auth.getUser();
      if (!data || authError) throw authError;
      const { data: users, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", data.user.id)
        .throwOnError();
      if (error) throw error;
      return { ...data.user, ...users[0] };
    },
  });
}
