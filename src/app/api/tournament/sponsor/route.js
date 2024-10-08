import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";

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

  await admin
    .from("User")
    .update({ balance: balance - amount })
    .eq("id", user_id);

  return Response.json({ success: true });
}
