import { supabase } from "@/supabase/client";
import { api } from "@/utils/api";

export async function getUsers({ limit = 25 } = {}) {
  const { data } = await supabase
    .from("User")
    .select("*")
    .limit(limit)
    .throwOnError();
  return data;
}

export async function getUserEmail(id) {
  const { data } = await api.post("admin/user/email", { id });
  return data;
}
