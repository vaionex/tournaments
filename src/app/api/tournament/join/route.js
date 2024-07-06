import { JoinTournamentChallenge } from "@/db/server/challenges/join-tournament";
import { getParticipants, getTournament } from "@/db/tournament";
import { notifications } from "@/novu/notifications";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";
import { getRank, isRankInRange } from "@/utils/rank";

export async function POST(req) {
  const { tournament_id } = await req.json();
  const { id: user_id, balance, xp } = await getUserDetails();
  const { entry_fee, start, max_players, min_rank, max_rank, status } =
    await getTournament(tournament_id);
  const participants = await getParticipants(tournament_id);

  if (status != "Approved")
    return Response.json(
      { error: "Tournament is not approved" },
      { status: 400 },
    );

  if (new Date(start) < new Date())
    return Response.json(
      { error: "Tournament is already started" },
      { status: 400 },
    );

  if (entry_fee > balance) {
    return Response.json({ error: "Insufficient Balance" }, { status: 400 });
  }

  if (participants.length >= max_players) {
    return Response.json({ error: "Tournament Full" }, { status: 400 });
  }

  if (participants.length >= max_players) {
    return Response.json({ error: "Tournament Full" }, { status: 400 });
  }

  if (!isRankInRange(getRank(xp), min_rank, max_rank))
    return Response.json(
      { error: "You do not meet the skill requirement of this tournament" },
      { status: 400 },
    );

  await admin
    .from("Participant")
    .insert({ user_id, tournament_id })
    .throwOnError();

  await admin
    .from("User")
    .update({ balance: balance - entry_fee })
    .eq("id", user_id)
    .throwOnError();

  try {
    await notifications.newParticipant(tournament_id, user_id);
  } catch (e) {}

  try {
    await notifications.joinedTournament(user_id, tournament_id);
  } catch (e) {}

  try {
    await JoinTournamentChallenge.update();
  } catch (e) {
    console.log(e);
  }

  return Response.json({ success: true });
}
