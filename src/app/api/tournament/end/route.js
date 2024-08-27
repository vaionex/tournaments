import { getParticipants, getTournament } from "@/db/tournament";
import { notifications } from "@/novu/notifications";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";
import { property } from "lodash";
import ordinal from "ordinal";

export async function POST(req) {
  const user = await getUserDetails();
  const { tournament_id, winners } = await req.json();

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
  const validParicipantIds = participants.map(property("id"));
  const allWinnersHaveValidIds = winners
    .map(({ participant_id }) => participant_id)
    .every((id) => validParicipantIds.includes(id) || id == undefined);

  if (!allWinnersHaveValidIds)
    return Response.json({ error: "Invalid Pariticipant(s)" }, { status: 400 });

  await Promise.all(
    winners.map(
      async (
        { participant_id, prize: { xp = 0, cash = 0, giftCard } },
        index,
      ) => {
        const participant = participants.find(({ id }) => id == participant_id);

        await admin
          .from("User")
          .update({ balance: user.balance + cash, xp: user.xp + xp })
          .eq("id", participant.user_id)
          .throwOnError();

        if (cash > 0) {
          await admin
            .from("Payout")
            .insert({
              user_id: participant.user_id,
              amount: cash,
              tournament_id,
              position: index + 1,
            })
            .throwOnError();
        }

        if (giftCard?.file) {
          await admin
            .from("Inventory")
            .insert({
              user_id: participant.user_id,
              name: giftCard.label || "",
              type: "GiftCard",
              file: giftCard.file,
            })
            .throwOnError();
        }
        await notifications.wonTournament(
          participant.user_id,
          tournament_id,
          ordinal(index + 1),
        );
      },
    ),
  );

  await admin
    .from("Tournament")
    .update({ completed: true })
    .eq("id", tournament.id)
    .throwOnError();

  return Response.json({ success: true });
}
