import { supabase } from "@/supabase/client";

export async function getMatch(id) {
  const { data: matches } = await supabase
    .from("Match")
    .select("*")
    .eq("id", id)
    .throwOnError();
  return matches[0];
}

export async function getMatches(tournamentId) {
  const { data: matches } = await supabase
    .from("Match")
    .select("*")
    .eq("tournament_id", tournamentId)
    .order("id")
    .throwOnError();
  return matches;
}
