import { getTournamentChat } from "@/db/tournament";
import { supabase } from "@/supabase/client";
import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function useTournamentChat(id) {
  const queryClient = useQueryClient();
  const key = useMemo(() => ["tournament", id, "chat"], [id]);
  const query = useQuery({
    queryKey: key,
    queryFn: () => getTournamentChat(id),
  });

  useEffect(() => {
    const channels = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "TournamentChat" },
        (payload) =>
          queryClient.setQueryData(key, (data = []) => [...data, payload.new]),
      )
      .subscribe();
    return () => {
      channels.unsubscribe();
    };
  }, []);

  return query;
}
