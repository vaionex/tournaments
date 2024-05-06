import Avatar from "@/components/ui/avatar";
import { getParticipants } from "@/db/tournament";

export const revalidate = 0;

export default async function Participants({ params: { id } }) {
  const participants = await getParticipants(id);

  if (participants.length == 0)
    return (
      <div>
        <h2 className="mt-24 text-center text-3xl font-semibold text-neutral-400">
          There are no participants yet
        </h2>
      </div>
    );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {participants.map(({ id, User: { username, profile_picture } }) => (
        <div className="flex gap-5 bg-white/5" key={id}>
          <Avatar src={profile_picture} className="size-28 rounded-none" />
          <div className="mt-4 text-xl font-semibold">{username}</div>
        </div>
      ))}
    </div>
  );
}
