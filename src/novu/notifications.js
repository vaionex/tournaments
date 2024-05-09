import { getTournament } from "@/db/tournament";
import { novu } from ".";
import { getUserById } from "@/supabase/server";

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
  async joinTournament(tournamentId, participantId) {
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
}

export const notifications = new Notifications();
