import { getParticipants } from "@/db/tournament";
import { notifications } from "@/novu/notifications";
import { admin } from "@/supabase/admin";
import { addHours, addMinutes, subMinutes } from "date-fns";

export async function POST() {
  const oneHourLater = addHours(new Date(), 1);
  const start = subMinutes(oneHourLater, 5);
  const end = addMinutes(oneHourLater, 5);
  const { data: tournaments } = await admin
    .from("Tournament")
    .select()
    .gte("start", start)
    .lte("start", end)
    .throwOnError();

  const participants = (
    await Promise.all(tournaments.map(({ id }) => getParticipants(id)))
  ).flat();

  for (const { user_id, tournament_id } of participants) {
    try {
      await notifications.tournamentStarting(user_id, tournament_id);
    } catch (e) {}
  }
  return Response.json({ success: true });
}
