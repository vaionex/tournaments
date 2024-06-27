import { admin } from "@/supabase/admin";
import { getUserById } from "../user";

export async function giveUserXP(user_id, amount) {
  const { xp: userXP } = await getUserById(user_id);
  await admin
    .from("User")
    .update({ xp: userXP + amount })
    .eq("id", user_id)
    .throwOnError();
}
