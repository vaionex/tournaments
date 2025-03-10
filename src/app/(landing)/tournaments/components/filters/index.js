import { getGames } from "@/db/game";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default async function Filters({ gameId }) {
  const games = await getGames();
  return (
    <div className="mb-12 flex w-fit items-center gap-2 rounded-lg border border-white/5 bg-white/5 text-sm font-semibold">
      {games.map(({ id, name }) => (
        <Link
          key={id}
          className={twMerge(
            "rounded-lg border border-transparent px-4 py-2.5",
            gameId == id && "border-primary bg-primary-950",
          )}
          href={`?game=${id}`}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}