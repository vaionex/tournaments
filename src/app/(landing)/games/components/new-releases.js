import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const releases = [
  {
    name: "Dragon's Dogma 2",
    date: "Mar 22, 2024",
    type: "Action RPG",
  },
  {
    name: "Princess Peach: Showtime!",
    date: "Mar 22, 2024",
    type: "Adventure",
  },
  {
    name: "Rise of the Ronin",
    date: "Mar 22, 2024",
    type: "Action RPG",
  },
];

export default function NewReleases() {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-6 text-xl font-bold">New Releases</h2>
      <div className="space-y-4">
        {releases.map((game) => (
          <div
            key={game.name}
            className="rounded-lg border border-neutral-800 p-4"
          >
            <h3 className="mb-2 font-semibold text-white">{game.name}</h3>
            <div className="mb-3 text-sm text-neutral-400">{game.type}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Calendar className="size-4" />
                {game.date}
              </div>
              <Button size="sm" variant="secondary">
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}