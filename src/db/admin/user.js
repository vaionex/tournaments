import { supabase } from "@/supabase/client";

export async function getUsers({ limit = 25 } = {}) {
  const { data } = await supabase
    .from("User")
    .select("*")
    .limit(limit)
    .throwOnError();
  return data;
}
