import { getTournament } from "@/db/tournament";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";

export async function POST(req) {
  const { id: tournamentId } = await req.json();
  const { id: user_id, is_admin } = await getUserDetails();
  const tournament = await getTournament(tournamentId);

  const canDelete = tournament.user_id == user_id || is_admin;
  if (!canDelete)
    return Response.json({ error: "Not authorized" }, { status: 401 });

  if (new Date() > new Date(tournament.start))
    return Response.json(
      { error: "Tournament is in progress" },
      { status: 400 },
    );

  if (tournament.completed)
    return Response.json(
      { error: "Tournament has been completed" },
      { status: 400 },
    );

  await admin.from("Tournament").delete().eq("id", tournamentId).throwOnError();
  return Response.json({ success: true });
}
