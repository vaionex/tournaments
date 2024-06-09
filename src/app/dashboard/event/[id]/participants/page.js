import Avatar from "@/components/ui/avatar";
import { getParticipants } from "@/db/tournament";
import { twMerge } from "tailwind-merge";
import { Users01 } from "untitledui-js-base";
import ParticipantsList from "./Participants";

export const revalidate = 0;

export default async function Participants({ params: { id } }) {
  const participants = await getParticipants(id);

  if (participants.length == 0)
    return (
      <div>
        <h2 className="py-24 text-center text-3xl font-semibold text-neutral-400">
          There are no participants yet
        </h2>
      </div>
    );
  return <ParticipantsList participants={participants} />;
}
