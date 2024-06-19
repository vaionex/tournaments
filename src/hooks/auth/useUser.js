import { supabase } from "@/supabase/client";
import { useQuery } from "react-query";
import useAuthentication from "./useAuthentication";
import { getNextRank, getRank, getRankProgressPercentage } from "@/utils/rank";
import { useMemo } from "react";

export default function useUser() {
  const { isAuthenticated } = useAuthentication();
  const query = useQuery({
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

  const newQuery = useMemo(() => {
    const xp = query.data?.xp ?? 0;
    return {
      ...query,
      data: {
        ...query.data,
        rank: getRank(xp),
        nextRank: getNextRank(xp),
        rankProgress: getRankProgressPercentage(xp),
      },
    };
  }, [query.data]);

  return newQuery;
}
