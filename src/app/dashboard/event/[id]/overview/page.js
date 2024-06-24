import { getParticipants, getTournament } from "@/db/tournament";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { Calendar, Swords, Users } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Trophy01, Users01 } from "untitledui-js-base";
import Chat from "./components/chat";

export const revalidate = 0;

export default async function Overview({ params: { id } }) {
  const { name, banner, start, end, prize_pool, description } =
    await getTournament(id);
  const participants = await getParticipants(id);

  const stats = [
    {
      name: "Prize Pool",
      value: formatCurrency(prize_pool),
      icon: Trophy01,
      iconClassName: "text-lime-500",
      image: "prize-pool",
    },
    {
      name: "Date",
      value: `${format(start, "Pp")} - ${format(end, "Pp")}`,
      icon: Calendar,
      iconClassName: "text-indigo-600",
      image: "date",
    },
    {
      name: "Participants",
      value: participants.length,
      icon: Users01,
      iconClassName: "text-indigo-600",
      image: "participants",
    },
    {
      name: "Remaining Teams",
      value: participants.length,
      icon: Users01,
      iconClassName: "text-yellow-600",
      image: "remaining",
    },
  ];

  return (
    <div className="flex border-inherit">
      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4 pb-px">
          {stats.map(({ name, value, icon: Icon, iconClassName, image }) => (
            <div
              className="flex flex-col justify-between gap-6 rounded-xl border border-white/10 bg-black bg-contain bg-right bg-no-repeat px-6 py-5"
              style={{
                backgroundImage: `url('/images/dashboard/tournament/overview/${image}.webp')`,
              }}
            >
              <div className="flex items-center gap-2 text-xs text-white">
                <Icon className={twMerge("size-5", iconClassName)} />
                {name}
              </div>
              <div className="text-sm font-medium text-white">{value}</div>
            </div>
          ))}
        </div>
        <img src={banner} alt={name} className="mt-4 rounded-md object-cover" />
        <div className="mt-4">
          <h2 className="mb-2 text-2xl font-semibold">Description</h2>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
      </div>
      <Chat id={id} />
    </div>
  );
}
