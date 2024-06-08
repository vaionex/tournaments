import { getParticipants, getTournament } from "@/db/tournament";
import Podium from "./components/Podium";

export default async function Results({ params: { id } }) {
  const participants = await getParticipants(id);
  const tournament = await getTournament(id);

  if (!tournament.completed) {
    return (
      <div className="py-24 text-center text-2xl font-semibold text-neutral-400">
        Tournament is still in progress
      </div>
    );
  }

  if (participants.length == 0) {
    return (
      <div className="py-24 text-center text-2xl font-semibold text-neutral-400">
        No Participants
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-8 px-12 py-8">
      {participants
        .sort(({ score: a }, { score: b }) => b - a)
        .slice(0, 3)
        .map(({ User }, index) => (
          <Podium position={index + 1} {...User} />
        ))}
    </div>
  );
}
