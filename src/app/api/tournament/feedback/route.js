import { admin } from "@/supabase/admin";
import { getUser } from "@/supabase/server";

export async function POST(req) {
  const { id, review, rating } = await req.json();
  const { id: user_id } = await getUser();
  await admin
    .from("TournamentFeedback")
    .insert({ tournament_id: id, review, rating, user_id })
    .throwOnError();

  return Response.json({ success: true });
}
