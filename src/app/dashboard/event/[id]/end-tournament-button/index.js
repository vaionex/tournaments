"use client";
import { Button } from "@/components/ui/button";
import EndTournamentModal from "./end-tournament-modal";
import { useState } from "react";
import useTournament from "@/hooks/tournament/useTournament";
import useUser from "@/hooks/auth/useUser";
import useAdmin from "@/hooks/auth/useAdmin";

export default function EndTournamentButton({ tournamentId }) {
  const [open, setOpen] = useState(false);
  const {
    data: { end, completed, user_id } = {},
    isLoading: isLoadingTournament,
  } = useTournament(tournamentId);
  const { isAdmin } = useAdmin();
  const { data: { id } = {}, isLoading: isLoadingUser } = useUser();

  const isInProgress = end > new Date();
  const isOwner = user_id === id;
  const canEnd =
    !isInProgress &&
    !completed &&
    (isOwner || isAdmin) &&
    !isLoadingTournament &&
    !isLoadingUser;

  if (canEnd)
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>
          End Tournament
        </Button>
        <EndTournamentModal
          tournamentId={tournamentId}
          {...{ open, setOpen }}
        />
      </>
    );

  return null;
}
