"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useTournament from "@/hooks/tournament/useTournament";
import useUpdateTournament from "@/hooks/tournament/useUpdateTournament";
import toast from "react-hot-toast";
import TournamentForm from "@/components/tournament/tournament-form";
import DeleteTouramentDialog from "@/components/tournament/DeleteTournamentDialog";

export default function EditTournament() {
  const { id } = useParams();
  const { data: originalTournament, isLoading: isLoadingTournament } =
    useTournament(id);
  const [tournament, setTournament] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState("");

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

  if (isLoadingTournament) return null;

  return (
    <div className="p-4">
      <TournamentForm
        tournament={tournament}
        setTournament={setTournament}
        onSubmit={handleUpdate}
        bannerUrl={originalTournament?.banner}
      >
        <div>
          Delete
          <div className="text-sm text-neutral-400">
            Deleting this event will permanently remove all activities and
            records associated with it. However, any XP ranks gained by
            participants will not be affected and will remain intact.{" "}
          </div>
        </div>
        <div>
          <Button
            variant="danger"
            type="button"
            onClick={() => setOpenDeleteModal(true)}
          >
            Yes, delete this event
          </Button>
        </div>

        <div />
        <div className="mb-12 flex justify-end">
          <Button type="submit" loading={isLoading}>
            Update
          </Button>
        </div>
      </TournamentForm>
      <DeleteTouramentDialog
        id={id}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
    </div>
  );
}
