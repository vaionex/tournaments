import { Button } from "@/components/ui/button";
import TournamentCard from "./tournament-card";
import { Plus } from "lucide-react";

export default function Overview() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Tournaments</h2>
        <Button variant="black">
          <Plus className="size-5" />
          Create a Tournament
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-8">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <TournamentCard key={index} />
          ))}
      </div>
    </div>
  );
}
