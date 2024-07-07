import { getTournament } from "@/db/tournament";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";

export async function POST(req) {
  const tournamentData = await req.json();

  const { id: user_id, admin: isAdmin } = await getUserDetails();
  const tournament = await getTournament(tournamentData.id);

  if (!isAdmin && user_id != tournament.user_id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  delete tournamentData.user_id;
  delete tournamentData.id;

  if (!isAdmin) delete tournamentData.status;

  await admin
    .from("Tournament")
    .update(tournamentData)
    .eq("id", tournament.id)
    .throwOnError();
  return Response.json({ success: true });
}
