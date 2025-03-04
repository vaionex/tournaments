import { supabase } from "@/supabase/client";
import { useQuery } from "react-query";
import useAuthentication from "./useAuthentication";
import {
  getNextRank,
  getNextRankXP,
  getRank,
  getRankProgressPercentage,
} from "@/utils/rank";
import { useMemo } from "react";

export default function useUser() {
  const { isAuthenticated } = useAuthentication();
  const query = useQuery({
    enabled: isAuthenticated,
    queryKey: ["user"],
    initialData: null,
    queryFn: async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (!authData?.user || authError) throw authError;

      const { data: users, error } = await supabase
        .from("User")
        .select("*")
        .eq("id", authData.user.id)
        .throwOnError();

      if (error) throw error;
      if (!users?.length) throw new Error("User data not found");

      return { ...authData.user, ...users[0] };
    },
  });

  const newQuery = useMemo(() => {
    if (!query.data) return query;
    
    const xp = query.data.xp ?? 0;
    return {
      ...query,
      data: {
        ...query.data,
        rank: getRank(xp),
        nextRank: getNextRank(xp),
        rankProgress: getRankProgressPercentage(xp),
        nextRankXP: getNextRankXP(xp),
      },
    };
  }, [query.data]);

  return newQuery;
}
