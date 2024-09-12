import { supabase } from "@/supabase/client";
import { getUserId } from "@/supabase/utils";

export async function getPayouts({
  limit = 1000,
  start = new Date(0),
  end = new Date(),
} = {}) {
  const user_id = await getUserId();
  const { data } = await supabase
    .from("Payout")
    .select("*, Participant (*,Tournament (*)) ")
    .gte("created_at", start.toISOString())
    .lte("created_at", end.toISOString())
    .eq("user_id", user_id)
    .limit(limit)
    .throwOnError();
  return data;
}
