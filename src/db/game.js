import { supabase } from "@/supabase/client";

export async function getGames() {
  const { data } = await supabase.from("Game").select("*").throwOnError();
  return data;
}
