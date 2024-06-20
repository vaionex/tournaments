"use client";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/auth/useUser";
import useIsParticipant from "@/hooks/tournament/useIsParticipant";
import useJoinTournament from "@/hooks/tournament/useJoinTournament";
import useParticipants from "@/hooks/tournament/useParticipants";

export default function JoinTournamentButton({
  entryFee,
  tournamentId,
  start,
  maxPlayers,
}) {
  const { data: user } = useUser();
  const { mutate: join, isLoading: isLoadingJoin } = useJoinTournament();
  const { data: isParticipant, isLoading: isLoadingParticipations } =
    useIsParticipant(tournamentId);
  const { data: participants = [] } = useParticipants(tournamentId);
  const { balance } = user;
  const insufficientBalance = entryFee > balance;
  const isStarted = new Date().valueOf() > new Date(start).valueOf();

  if (isParticipant) return <div>Joined</div>;
  if (isStarted || isLoadingParticipations) return null;

  if (participants.length >= maxPlayers) return <div>Tournament Full</div>;

  return (
    <div>
      {insufficientBalance && (
        <div className="text-center text-xs text-red-400">
          Insufficient Balance
        </div>
      )}
      <Button
        onClick={() => join({ tournament_id: tournamentId })}
        disabled={insufficientBalance}
        loading={isLoadingJoin}
      >
        Join Tournament
      </Button>
    </div>
  );
}
