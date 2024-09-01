import { createClient, getUser } from "@/supabase/server";
import { getChallenge } from ".";
import { giveUserXP } from "../user";
import { admin } from "@/supabase/admin";

export class LoginChallenge {
  static async getStatus(user_id) {
    const { data } = await admin
      .from("ChallengeLogin")
      .select("*")
      .eq("user_id", user_id)
      .eq("created_at", new Date().toISOString())
      .throwOnError();

    return {
      total: 1,
      progress: data.length,
    };
  }

  static async update() {
    const { id } = await getUser();
    const userAlreadyLoggedInToday = await hasUserLoggedInToday();
    if (userAlreadyLoggedInToday) return;

    await admin
      .from("ChallengeLogin")
      .insert({ user_id: id, created_at: new Date().toISOString() });

    const { xp } = await getChallenge("login");
    await giveUserXP(id, xp, { challenge_id: "login" });
  }
}

async function hasUserLoggedInToday() {
  const supabase = createClient();
  const {
    data: {
      user: { id: user_id },
    },
  } = await supabase.auth.getUser();
  const { data: logins = [] } = await admin
    .from("ChallengeLogin")
    .select("*")
    .eq("user_id", user_id)
    .eq("created_at", new Date().toISOString());

  return logins.length > 0;
}
