import { getParticipants, getTournament } from "@/db/tournament";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { Swords } from "lucide-react";

export const revalidate = 0;

export default async function Overview({ params: { id } }) {
  const { name, banner, start, end, prize_pool } = await getTournament(id);
  const participants = await getParticipants(id);

  const stats = [
    {
      name: "Next Match",
      value: "Phoenix Rises Vs Solar Sentinels",
      icon: Swords,
    },
    {
      name: "Remaining Teams",
      value: participants.length,
      icon: Swords,
    },
    {
      name: "Eliminated Match",
      value: "0",
      icon: Swords,
    },
    {
      name: "Participants",
      value: participants.length,
      icon: Swords,
    },
    {
      name: "Date",
      value: `${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`,
      icon: Swords,
    },
    {
      name: "Prize Pool",
      value: formatCurrency(prize_pool),
      icon: Swords,
    },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-px bg-neutral-700 pb-px">
        {stats.map(({ name, value, icon: Icon }) => (
          <div className="flex flex-col justify-between gap-8 bg-black px-6 py-5">
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <Icon className="size-4" />
              {name}
            </div>
            <div className="text-sm">{value}</div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <img src={banner} alt={name} className="rounded-md object-cover" />
      </div>
    </div>
  );
}
