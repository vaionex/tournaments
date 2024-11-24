"use client";
import useCreateTournament from "@/hooks/tournament/useCreateTournament";
import { addDays, addHours } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TournamentForm from "@/components/tournament/tournament-form";
import { Button } from "@/components/ui/button";
import { v4 } from "uuid";

export default function CreateTournament() {
  const [tournament, setTournament] = useState({
    name: "",
    description: "",
    start: addHours(new Date(), 2),
    end: addDays(new Date(), 2),
    max_players: 10,
    min_rank: "Bronze",
    max_rank: "Grandmaster",
    prizes: [{ id: v4(), sponsorshipPercentage: 100 }],
    entry_fee: 0,
  });
  const { push } = useRouter();

  const { mutate: create, isLoading } = useCreateTournament({
    onSuccess: ({ id }) => push(`/dashboard/event/${id}`),
  });

  function handleCreate() {
    create(tournament);
  }

  return (
    <div className="pb-24">
      <h2 className="mb-8 text-3xl font-semibold">Create Tournament</h2>
      <TournamentForm
        tournament={tournament}
        setTournament={setTournament}
        onSubmit={handleCreate}
      >
        <div />
        <div>
          <Button loading={isLoading}>Submit</Button>
        </div>
      </TournamentForm>
    </div>
  );
}
