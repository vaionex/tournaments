import { getParticipants, getTournament } from "@/db/tournament";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";

export async function POST(req) {
  const user = await getUserDetails();
  const { tournament_id, prize_pool_tiers } = await req.json();

  const tournament = await getTournament(tournament_id);

  if (tournament.user_id != user.id)
    return Response.json(
      { error: "You do not own this tournament" },
      { status: 400 },
    );

  if (tournament.completed)
    return Response.json(
      { error: "Tournament has already been completed" },
      { status: 400 },
    );

  const participants = await getParticipants(tournament_id);
  const winners = participants
    .sort(({ score: a }, { score: b }) => b - a)
    .slice(0, prize_pool_tiers.length);

  await Promise.all(
    winners.map(async ({ User }, index) => {
      const tier = prize_pool_tiers[index];
      if (typeof tier == "undefined") return;

      const prize = Math.round(tournament.prize_pool * (tier / 100));

      await admin
        .from("User")
        .update({ balance: user.balance + prize })
        .eq("id", User.id)
        .throwOnError();

      await admin
        .from("Payout")
        .insert({ user_id: User.id, amount: prize, tournament_id })
        .throwOnError();
    }),
  );

  await admin
    .from("Tournament")
    .update({ completed: true })
    .eq("id", tournament.id)
    .throwOnError();

  return Response.json({ success: true });
}
