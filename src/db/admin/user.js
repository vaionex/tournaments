import { supabase } from "@/supabase/client";
import { api } from "@/utils/api";

export async function getUsers({
  limit = 25,
  page = 1,
  minimumBalace = 0,
  maximumBalance = 999999,
} = {}) {
  const { data: users } = await supabase
    .from("User")
    .select("*")
    .range(limit * (page - 1), limit * page - 1)
    .lte("balance", maximumBalance)
    .gte("balance", minimumBalace)
    .throwOnError();
  const { count } = await supabase
    .from("User")
    .select("", { count: "exact", head: true })
    .lte("balance", maximumBalance)
    .gte("balance", minimumBalace);
  return { users, total: count };
}

export async function getUserEmail(id) {
  const { data } = await api.post("admin/user/email", { id });
  return data;
}
