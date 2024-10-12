import { supabase } from "@/supabase/client";
import { getUserId } from "@/supabase/utils";

export async function getTransactions({
  start = new Date(0),
  end = new Date(),
}) {
  const id = await getUserId();
  const { data } = await supabase
    .from("Transaction")
    .select("*")
    .eq("user_id", id)
    .gte("created_at", start.toISOString())
    .lte("created_at", end.toISOString())
    .order("created_at", { ascending: false })
    .throwOnError();
  return data;
}
