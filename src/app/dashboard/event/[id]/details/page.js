import { getTournament } from "@/db/tournament";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import DetailBadges from "../DetailBadges";

export default async function Details({ params: { id } }) {
  const { name, start, end, prize_pool, Game } = await getTournament(id);
  const sections = [
    { title: "Name", value: name },
    { title: "Game", value: Game.name },
    {
      title: "Date",
      value: `${format(new Date(start), "dd/MM/yyyy")} - ${format(new Date(end), "dd/MM/yyyy")}`,
    },
    { title: "Prize Pool", value: formatCurrency(prize_pool) },
  ];

  function Section({ title, value }) {
    return (
      <div className="p-2">
        <div className="mb-1 text-neutral-400">{title}</div>
        <div className="font-medium">{value}</div>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-1 gap-6">
      <div className="flex-1">
        <h2 className="mb-6 text-3xl font-semibold">Event Details</h2>
        <div className="flex-1 divide-y divide-white/20">
          {sections.map((section) => (
            <Section key={section.title} {...section} />
          ))}
        </div>
      </div>
      <DetailBadges id={id} />
    </div>
  );
}
