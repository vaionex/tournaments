import { admin } from "@/supabase/admin";
import { getChallenge } from ".";
import { hasUserLoggedInToday } from "./utils/login";
import { giveUserXP } from "../user";
import { getUserId } from "@/supabase/utils";
import { getUser } from "@/supabase/server";

export async function updateLoginChallenge() {
  const { id } = await getUser();
  const userAlreadyLoggedInToday = await hasUserLoggedInToday();
  if (userAlreadyLoggedInToday) return;

  await admin
    .from("ChallengeLogin")
    .insert({ user_id: id, created_at: new Date().toISOString() });

  const { xp } = await getChallenge("login");
  await giveUserXP(id, xp);
}
