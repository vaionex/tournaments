import { getTournament } from "@/db/tournament";
import { novu } from ".";
import { getUserById } from "@/supabase/server";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/format";
import ordinal from "ordinal";

async function createTo(userId) {
  const { username, email } = await getUserById(userId);

  return {
    subscriberId: userId,
    email,
    firstName: username,
  };
}

class Notifications {
  async tournamentStarting(userId, tournamentId) {
    const { name } = await getTournament(tournamentId);

    await novu.trigger("tournament-about-to-start", {
      to: await createTo(userId),
      payload: {
        tournamentName: name,
      },
    });
  }
  async newParticipant(tournamentId, participantId) {
    const { name, user_id: tournamentOwnerUserId } =
      await getTournament(tournamentId);
    const { username } = await getUserById(participantId);

    await novu.trigger("digest-workflow-example", {
      to: await createTo(tournamentOwnerUserId),
      payload: {
        tournamentName: name,
        username,
      },
    });
  }
  async joinedTournament(userId, tournamentId) {
    const {
      id,
      name,
      description,
      banner,
      start,
      prize_pool,
      prize_pool_tiers,
      Game,
      ip,
      matchmaking_key = "",
    } = await getTournament(tournamentId);
    const payload = {
      tournament: {
        id,
        name,
        banner,
        description,
        prizes: prize_pool_tiers.map((tier, index) => ({
          position: ordinal(index + 1),
          prize: formatCurrency((tier / 100) * prize_pool),
        })),
        start: format(start, "Pp"),
        game: Game.name,
        keyOrIP: ip || matchmaking_key,
      },
    };
    console.log({ payload });
    const res = await novu.trigger("joined-tournament", {
      to: await createTo(userId),
      payload,
    });
    console.log({ res });
  }
}

export const notifications = new Notifications();
