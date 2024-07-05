"use client";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/auth/useUser";
import useIsParticipant from "@/hooks/tournament/useIsParticipant";
import useJoinTournament from "@/hooks/tournament/useJoinTournament";
import useParticipants from "@/hooks/tournament/useParticipants";
import { socials } from "../../profile/account/page";
import Link from "next/link";
import { isRankInRange } from "@/utils/rank";
import Social from "../../profile/account/Social";

export default function JoinTournamentButton({
  entry_fee: entryFee,
  id: tournamentId,
  start,
  max_players: maxPlayers,
  min_rank,
  max_rank,
  Game: { required_social },
}) {
  const { data: user } = useUser();
  const { mutate: join, isLoading: isLoadingJoin } = useJoinTournament();
  const { data: isParticipant, isLoading: isLoadingParticipations } =
    useIsParticipant(tournamentId);
  const { data: participants = [] } = useParticipants(tournamentId);
  const { balance } = user;

  const insufficientBalance = entryFee > balance;
  const isStarted = new Date().valueOf() > new Date(start).valueOf();
  const hasRequiredSocial = required_social ? user[required_social] : true;
  const rankInRange = isRankInRange(user.rank, min_rank, max_rank);

  if (isParticipant) return <div>Joined</div>;
  if (isStarted || isLoadingParticipations) return null;

  if (participants.length >= maxPlayers) return <div>Tournament Full</div>;

  const social = socials.find(({ id }) => id == required_social);

  if (!hasRequiredSocial && social)
    return (
      <div className="flex flex-col items-end gap-1">
        <div className="text-sm text-neutral-300">Connection Required</div>
        <Social {...social} />
      </div>
    );

  if (insufficientBalance)
    return (
      <div className="text-center text-xs text-red-400">
        Insufficient Balance
      </div>
    );

  if (!rankInRange)
    return (
      <div className="text-red-500">
        You do not meet the skill requirement of this tournament
      </div>
    );

  return (
    <Button
      onClick={() => join({ tournament_id: tournamentId })}
      disabled={insufficientBalance}
      loading={isLoadingJoin}
    >
      Join Tournament
    </Button>
  );
}
