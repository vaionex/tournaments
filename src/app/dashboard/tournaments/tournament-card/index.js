import DurationTag from "@/components/ui/duration-tag";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Trophy01, Users01 } from "untitledui-js-base";

export default function TournamentCard({
  id,
  name,
  banner,
  start,
  end,
  prize_pool,
  max_players,
}) {
  return (
    <Link
      style={{ backgroundImage: `url('${banner}')` }}
      className="h-80 rounded border border-neutral-700 bg-cover bg-center"
      href={`/dashboard/event/${id}`}
    >
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="p-8">
          <DurationTag startDate={new Date(start)} endDate={new Date(end)} />
        </div>
        <div className="bg-gradient-to-t from-black from-30% p-8">
          <h2 className="mb-2 text-2xl font-bold">{name}</h2>
          <div className="flex items-center gap-2">
            <div className="flex w-fit items-center gap-2 bg-neutral-800 px-2 py-1">
              <Users01 className="size-5 text-neutral-400" />
              {max_players}
            </div>
            <div className="flex w-fit items-center gap-2 bg-neutral-800 px-2 py-1">
              <Trophy01 className="size-5 text-neutral-400" />
              {formatCurrency(prize_pool)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
