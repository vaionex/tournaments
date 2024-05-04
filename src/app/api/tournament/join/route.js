import { getTournament } from "@/db/tournament";
import { admin } from "@/supabase/admin";
import { supabase } from "@/supabase/client";
import { getUserDetails } from "@/supabase/server";

export async function POST(req) {
  const { tournament_id } = await req.json();
  const { id: user_id, balance } = await getUserDetails();
  const { entry_fee, start } = await getTournament(tournament_id);

  if (new Date(start) < new Date())
    return Response.json(
      { error: "Tournament is already started" },
      { status: 400 },
    );

  if (entry_fee > balance) {
    return Response.json({ error: "Insufficient Balance" }, { status: 400 });
  }

  await admin
    .from("Participant")
    .insert({ user_id, tournament_id })
    .throwOnError();

  await admin
    .from("User")
    .update({ balance: balance - entry_fee })
    .eq("id", user_id)
    .throwOnError();

  return Response.json({ success: true });
}
