import { admin } from "@/supabase/admin";
import { createClient } from "@/supabase/server";
import { getChallengeStatus } from "./resolvers";

export async function getChallenges() {
  const supabase = createClient();
  const {
    data: {
      user: { id: user_id },
    },
  } = await supabase.auth.getUser();

  const { data: challenges = [] } = await admin
    .from("Challenge")
    .select("*")
    .throwOnError();

  return await Promise.all(
    challenges.map(async (challenge) => {
      const status = await getChallengeStatus(challenge.id, user_id);
      return { ...challenge, status };
    }),
  );
}

export async function getChallenge(id) {
  const { data } = await admin
    .from("Challenge")
    .select("*")
    .eq("id", id)
    .throwOnError();
  return data[0];
}
