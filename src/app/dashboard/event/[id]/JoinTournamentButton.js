"use client";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/auth/useUser";
import useIsParticipant from "@/hooks/tournament/useIsParticipant";
import useJoinTournament from "@/hooks/tournament/useJoinTournament";
import useParticipants from "@/hooks/tournament/useParticipants";
import { socials } from "../../profile/account/page";
import Link from "next/link";

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
  const hasConnectedSocial = socials.some((social) => user[social]);

  if (isParticipant) return <div>Joined</div>;
  if (isStarted || isLoadingParticipations) return null;

  if (participants.length >= maxPlayers) return <div>Tournament Full</div>;

  if (!hasConnectedSocial)
    return (
      <div>
        Social not connected.{" "}
        <Link href="/dashboard/profile/account#social" className="text-primary">
          Connect Social
        </Link>
      </div>
    );

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
