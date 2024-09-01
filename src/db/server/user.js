import { admin } from "@/supabase/admin";
import { getUserById } from "../user";

export async function giveUserXP(
  user_id,
  xp,
  { challenge_id = null, participant_id = null } = {},
) {
  const { xp: userXP } = await getUserById(user_id);
  const newAmount = xp + userXP;
  await admin
    .from("User")
    .update({ xp: newAmount })
    .eq("id", user_id)
    .throwOnError();
  await admin
    .from("UserXP")
    .insert({ user_id, xp, amount: newAmount, challenge_id, participant_id })
    .throwOnError();
}
