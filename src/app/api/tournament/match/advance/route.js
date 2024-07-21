import { getMatch } from "@/db/match";
import { admin } from "@/supabase/admin";

export async function POST(req) {
  const { matchId, winnerId } = await req.json();

  const match = await getMatch(matchId);
  const { next_looser_match_id, next_match_id } = match;
  const looser_id =
    match.participant1_id == winnerId
      ? match.participant2_id
      : match.participant1_id;

  if (next_match_id) {
    await addParticipantToMatch(next_match_id, winnerId);
  }

  if (next_looser_match_id) {
    await addParticipantToMatch(next_looser_match_id, looser_id);
  }

  await admin
    .from("Match")
    .update({ winner_id: winnerId })
    .eq("id", matchId)
    .throwOnError();

  return Response.json({ success: true });
}

async function addParticipantToMatch(matchId, participantId) {
  const nextMatch = await getMatch(matchId);
  const key = nextMatch.participant1_id ? "participant2_id" : "participant1_id";
  await admin
    .from("Match")
    .update({ [key]: participantId })
    .eq("id", matchId)
    .throwOnError();
}
