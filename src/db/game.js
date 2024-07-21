import { supabase } from "@/supabase/client";

export async function getGames() {
  const { data } = await supabase.from("Game").select("*").throwOnError();
  return data;
}

export async function getGame(id) {
  const { data } = await supabase
    .from("Game")
    .select("*")
    .eq("id", id)
    .throwOnError();
  return data[0];
}
