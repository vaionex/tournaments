import { supabase } from "@/supabase/client";
import { getUserId } from "@/supabase/utils";

export async function getInventory({ limit = 1000 } = {}) {
  const user_id = await getUserId();
  const { data } = await supabase
    .from("Inventory")
    .select("*, Participant(Tournament(name))")
    .eq("user_id", user_id)
    .limit(limit)
    .throwOnError();
  return data;
}
