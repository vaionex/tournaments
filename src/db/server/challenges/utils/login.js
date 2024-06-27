import { admin } from "@/supabase/admin";
import { createClient } from "@/supabase/server";

export async function hasUserLoggedInToday() {
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
