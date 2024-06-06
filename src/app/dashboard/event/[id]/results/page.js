import { getParticipants } from "@/db/tournament";
import Podium from "./components/Podium";

export default async function Results({ params: { id } }) {
  const participants = await getParticipants(id);
  return (
    <div className="flex items-center justify-center gap-8 px-12 py-8">
      {participants.slice(0, 3).map(({ User }, index) => (
        <Podium position={index + 1} {...User} />
      ))}
    </div>
  );
}
