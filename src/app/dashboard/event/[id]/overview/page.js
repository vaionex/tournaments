import { getParticipants, getTournament } from "@/db/tournament";
import Chat from "./components/chat";
import PrizeTiers from "../components/PrizeTiers";
import Participants from "./components/Participants";
import { format } from "date-fns";
import Avatar from "@/components/ui/avatar";
import Card from "@/app/dashboard/components/Card";
import { Calendar } from "iconsax-react";
import { StarIcon } from "lucide-react";
import StartDate from "./components/StartDate";

export const revalidate = 0;

export default async function Overview({ params: { id } }) {
  const { name, banner, start, end, User, description, prizes } =
    await getTournament(id);
  const participants = await getParticipants(id);

  return (
    <div className="flex border-inherit">
      <div className="flex-1 p-4">
        <img src={banner} alt={name} className="rounded-md object-cover" />
        <div className="mt-4">
          <h2 className="mb-2 text-2xl font-semibold">Description</h2>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
        <div className="mt-4 flex gap-3">
          <Card className="flex-1">
            <PrizeTiers prizes={prizes} />
          </Card>
          <div className="flex flex-1 flex-col gap-[inherit]">
            <div className="flex gap-[inherit]">
              <Card className="flex-1">
                <div className="mb-2">Participants</div>
                <Participants participants={Array(10).fill(participants[0])} />
              </Card>
              <Card className="flex-1 space-y-2">
                <StartDate start={start} />
              </Card>
            </div>
            <Card className="flex flex-col items-center justify-center">
              <div className="mb-8 text-neutral-500">Organized by</div>
              <div className="flex flex-col items-center space-y-2">
                <Avatar
                  profile_picture={User.profile_picture}
                  className="size-10 rounded-lg"
                />
                <div className="text-sm">{User.username}</div>
                <div className="flex w-fit items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/5 p-1 px-1.5 text-xs">
                  <StarIcon className="size-3 fill-yellow-500 text-yellow-500" />
                  0 out ouf 5
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Chat id={id} />
    </div>
  );
}
