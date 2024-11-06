import { createTransaction } from "@/db/server/user";
import { getTournament } from "@/db/tournament";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";
import { SponsorshipShare } from "@/utils/constants";

export async function POST(req) {
  const { tournamentId, amount, banner, url, message } = await req.json();
  const { id: user_id, balance } = await getUserDetails();

  if (amount < 100)
    return Response.json(
      { error: "Minimum sponsorship amount is $1" },
      { status: 400 },
    );
  if (amount > balance)
    return Response.json({ error: "Insufficient balance" }, { status: 400 });

  await admin
    .from("Sponsorship")
    .insert({
      tournament_id: tournamentId,
      user_id,
      banner,
      url,
      amount,
      message,
    })
    .throwOnError();

  const { user_id: organizer_id } = await getTournament(tournamentId);

  await createTransaction(user_id, -amount, {
    sponsored_tournament_id: tournamentId,
  });

  await createTransaction(
    organizer_id,
    Math.round(amount * SponsorshipShare.Organizer),
    {
      sponsored_tournament_id: tournamentId,
      sponsor_id: user_id,
    },
  );

  return Response.json({ success: true });
}
