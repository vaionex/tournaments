import { supabase } from "@/supabase/client";

export async function getOrganizedTournaments(user_id) {
  const { data } = await supabase
    .from("Tournament")
    .select("*, Game(*)")
    .eq("user_id", user_id)
    .throwOnError();

  return data;
}

export async function getOverview(user_id) {
  const { data: upcomingTournament } = await supabase
    .from("Tournament")
    .select("*")
    .eq("user_id", user_id)
    .gt("start", new Date().toISOString())
    .order("start", { ascending: true })
    .limit(1)
    .maybeSingle()
    .throwOnError();

  const { count: numberOfTournaments } = await supabase
    .from("Tournament")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user_id)
    .throwOnError();

  const { count: numberOfPlayers } = await supabase
    .from("Participant")
    .select("*, Tournament!inner(*)", { count: "exact", head: true })
    .eq("Tournament.user_id", user_id)
    .throwOnError();

  const tournaments = await getOrganizedTournaments(user_id);

  return {
    upcomingTournament,
    numberOfPlayers,
    numberOfTournaments,
    tournaments,
  };
}
