import { getUser } from "@/supabase/server";
import { getChallenge } from ".";
import { giveUserXP } from "../user";
import { admin } from "@/supabase/admin";
import { getWeek, getYear } from "date-fns";

export class JoinTournamentChallenge {
  static async getStatus(user_id) {
    const { data = [] } = await admin
      .from("ChallengeJoinTournament")
      .select("*")
      .eq("user_id", user_id)
      .eq("week", getWeekTimestamp())
      .throwOnError();

    return {
      total: 1,
      progress: data.length,
    };
  }

  static async update() {
    const { id } = await getUser();
    const userJoinedThisWeek = await hasUserJoinedThisWeek();
    if (userJoinedThisWeek) return;

    await admin
      .from("ChallengeJoinTournament")
      .insert({ user_id: id, week: getWeekTimestamp() })
      .throwOnError();

    const { xp } = await getChallenge("join-tournament");
    await giveUserXP(id, xp, { challenge_id: "join-tournament" });
  }
}

function getWeekTimestamp() {
  const now = new Date();
  return `${getYear(now)}-${getWeek(now)}`;
}

async function hasUserJoinedThisWeek() {
  const { id } = await getUser();
  const { data = [] } = await admin
    .from("ChallengeJoinTournament")
    .select("*")
    .eq("user_id", id)
    .eq("week", getWeekTimestamp());
  return data.length > 0;
}
