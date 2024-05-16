import Link from "next/link";
import { twMerge } from "tailwind-merge";

const games = [
  { id: "fortnite", name: "Fortnite" },
  { id: "valorant", name: "Valorant" },
  { id: "lol", name: "League of Legends" },
  { id: "dota2", name: "Dota 2" },
];
export default async function Filters({ game }) {
  return (
    <div className="mb-12 flex items-center gap-2 text-sm font-semibold">
      {games.map(({ id, name }) => (
        <Link
          className={twMerge(
            "rounded-lg border border-transparent px-4 py-2.5",
            game == id && "border-primary bg-primary-950",
          )}
          href={`?game=${id}`}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
