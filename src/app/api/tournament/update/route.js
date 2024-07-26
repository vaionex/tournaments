import { getTournament } from "@/db/tournament";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";

export async function POST(req) {
  const tournamentData = await req.json();

  const { id: user_id, is_admin } = await getUserDetails();
  const tournament = await getTournament(tournamentData.id);

  if (!is_admin && user_id != tournament.user_id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  delete tournamentData.user_id;
  delete tournamentData.id;

  if (!is_admin) delete tournamentData.status;

  await admin
    .from("Tournament")
    .update(tournamentData)
    .eq("id", tournament.id)
    .throwOnError();
  return Response.json({ success: true });
}
