import { getMatches } from "@/db/match";
import { getParticipants } from "@/db/tournament";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";
import { DoubleElimination, SingleElimination } from "tournament-pairings";
import { v4 } from "uuid";

export async function POST(req) {
  const { tournamentId } = await req.json();

  if (matchesExist(tournamentId)) {
    const { is_admin } = await getUserDetails();
    if (is_admin) clearMatches(tournamentId);
    else
      return Response.json({ error: "Matches already exist" }, { status: 400 });
  }

  const lookup = {};
  function generateId({ round, match }) {
    const psuedoId = `${round}-${match}`;
    if (lookup[psuedoId]) return lookup[psuedoId];

    const id = v4();
    lookup[psuedoId] = id;
    return id;
  }

  const participants = await getParticipants(tournamentId);
  const ids = participants.map(({ id }) => id);

  const EliminationFactory =
    ids.length > 3 ? DoubleElimination : SingleElimination;

  const matches = EliminationFactory(ids, 1).map((match) => ({
    id: generateId(match),
    tournament_id: tournamentId,
    next_match_id: match.win ? generateId(match.win) : null,
    next_looser_match_id: match.loss ? generateId(match.loss) : null,
    participant1_id: match.player1,
    participant2_id: match.player2,
  }));

  await admin.from("Match").insert(matches).throwOnError();
  return Response.json({ success: true });
}

async function matchesExist(id) {
  const matches = await getMatches(id);
  return matches.length > 0;
}

async function clearMatches(id) {
  await admin.from("Match").delete().eq("tournament_id", id).throwOnError();
}
