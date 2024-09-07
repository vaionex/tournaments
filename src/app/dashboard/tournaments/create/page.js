"use client";
import useCreateTournament from "@/hooks/tournament/useCreateTournament";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import TournamentForm from "@/components/tournament/tournament-form";
import { Button } from "@/components/ui/button";

export default function CreateTournament() {
  const [tournament, setTournament] = useState({
    name: "",
    description: "",
    start: new Date(),
    end: addDays(new Date(), 2),
    max_players: 10,
    prize_pool: 0,
    min_rank: "Bronze",
    max_rank: "Grandmaster",
    prizes: [{}],
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
