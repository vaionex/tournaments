"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useTournament from "@/hooks/tournament/useTournament";
import useUpdateTournament from "@/hooks/tournament/useUpdateTournament";
import toast from "react-hot-toast";
import TournamentForm from "@/components/tournament/tournament-form";
import { Loader } from "lucide-react";

export default function EditTournament() {
  const { id } = useParams();
  const { data: originalTournament, isLoading: isLoadingTournament } =
    useTournament(id);
  const [tournament, setTournament] = useState({});

  const { mutate: update, isLoading } = useUpdateTournament({
    onSuccess: () => {
      window.location.href = "overview";
    },
    onError: () => toast.error("Something went wrong"),
  });

  useEffect(() => {
    if (!originalTournament) return;
    const { Game, banner, ...t } = originalTournament;
    setTournament({ ...t, game_id: Game.id });
  }, [originalTournament]);

  function handleUpdate() {
    update({
      ...tournament,
    });
  }

  if (isLoadingTournament) return <Loader />;

  return (
    <div>
      <TournamentForm
        tournament={tournament}
        setTournament={setTournament}
        onSubmit={handleUpdate}
        bannerUrl={originalTournament?.banner}
      >
        <div />
        <div className="mb-12 flex justify-end">
          <Button type="submit" loading={isLoading}>
            Update
          </Button>
        </div>
      </TournamentForm>
    </div>
  );
}
