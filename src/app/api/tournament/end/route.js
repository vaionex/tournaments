import { createTransaction, giveUserXP } from "@/db/server/user";
import { getParticipants, getTournament } from "@/db/tournament";
import { notifications } from "@/novu/notifications";
import { admin } from "@/supabase/admin";
import { getUserDetails } from "@/supabase/server";
import { SponsorshipShare } from "@/utils/constants";
import { property } from "lodash";
import ordinal from "ordinal";

export async function POST(req) {
  const user = await getUserDetails();
  const { tournament_id, winners } = await req.json();

  const tournament = await getTournament(tournament_id);
  const { is_admin } = user;

  if (tournament.user_id != user.id && !is_admin)
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

  const totalSponsorshipReward =
    tournament.Sponsorship.reduce((total, { amount }) => total + amount, 0) *
    SponsorshipShare.Winners;

  await Promise.all(
    winners.map(
      async (
        {
          participant_id,
          prize: {
            xp = 0,
            cash = 0,
            giftCard = undefined,
            sponsorshipPercentage = 0,
          } = {},
        },
        index,
      ) => {
        const participant = participants.find(({ id }) => id == participant_id);

        if (xp > 0)
          await giveUserXP(participant.user_id, xp, { participant_id });

        const sponsorshipCash =
          (sponsorshipPercentage * totalSponsorshipReward) / 100;

        const totalCash = cash + sponsorshipCash;

        if (totalCash > 0) {
          await createTransaction(participant.user_id, totalCash, {
            won_tournament_id: tournament_id,
          });
        }

        if (giftCard?.file) {
          await admin
            .from("Inventory")
            .insert({
              user_id: participant.user_id,
              name: giftCard.label || "Gift Card",
              type: "GiftCard",
              file: giftCard.file,
              participant_id,
            })
            .throwOnError();
        }
        await admin
          .from("Participant")
          .update({ position: index + 1 })
          .eq("id", participant.id)
          .throwOnError();

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
