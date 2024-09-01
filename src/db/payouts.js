import { supabase } from "@/supabase/client";

const payouts = supabase.from("Payout");

export async function getPayouts({ limit = 1000 } = {}) {
  const { data } = await payouts
    .select("*, Participant (*,Tournament (*)) ")
    .limit(limit)
    .throwOnError();
  return data;
}
