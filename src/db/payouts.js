import { supabase } from "@/supabase/client";

const payouts = supabase.from("Payout");

export async function getPayouts() {
  const { data } = await payouts
    .select("*, Tournament (*, Game (*)) ")
    .throwOnError();
  return data;
}
