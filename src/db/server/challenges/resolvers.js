import { admin } from "@/supabase/admin";

export async function getChallengeStatus(id, user_id) {
  const resolvers = {
    login: login,
  };

  const resolver = resolvers[id] || (() => undefined);
  return await resolver(user_id);
}

async function login(user_id) {
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
