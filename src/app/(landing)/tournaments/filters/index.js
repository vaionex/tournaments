import { getGames } from "@/db/game";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default async function Filters({ gameId, search }) {
  const games = await getGames();
  return (
    <div className="mb-12 flex items-center gap-2 text-sm font-semibold">
      {games.map(({ id, name }) => (
        <Link
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
