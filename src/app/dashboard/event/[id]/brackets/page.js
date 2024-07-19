"use client";

import { Button } from "@/components/ui/button";
import useMatches from "@/hooks/tournament/match/useMatches";
import { useParams } from "next/navigation";
import useGenerateMatches from "@/hooks/tournament/match/useGenerateMatches";
import Loader from "@/components/ui/loader";
import useAdmin from "@/hooks/auth/useAdmin";
import { useMemo } from "react";
import EliminationBracket from "./components/EliminationBracket";

export default function Brackets() {
  const { id } = useParams();
  const { data = [], isLoading } = useMatches({ tournamentId: id });
  const { mutate: generate, isLoading: isLoadingGenerate } =
    useGenerateMatches();
  const { isAdmin } = useAdmin();

  const matches = useMemo(
    () =>
      data.map(
        ({
          next_match_id,
          next_looser_match_id,
          participant1_id,
          participant2_id,
          winner_id,
          score1,
          score2,
          ...match
        }) => ({
          ...match,
          nextMatchId: next_match_id,
          nextLooserMatchId: next_looser_match_id,
          participants: [
            { id: participant1_id, score: score1 },
            { id: participant2_id, score: score2 },
          ].map(({ id, score }, index) => ({
            id,
            name: id,
            isWinner: winner_id && id == winner_id,
            winner_id,
            score,
            index,
          })),
        }),
      ),
    [data],
  );

  if (isLoading)
    return (
      <div className="py-24">
        <Loader className="mx-auto" />
      </div>
    );

  if (matches.length == 0) {
    if (isAdmin)
      return (
        <div className="flex items-center justify-center py-24">
          <Button onClick={() => generate({ id })} loading={isLoadingGenerate}>
            Generate Brackets
          </Button>
        </div>
      );

    return (
      <div className="py-24 text-center text-2xl text-neutral-300">
        Waiting for admin to generate brackets
      </div>
    );
  }

  return (
    <div className="min-w-0 overflow-auto">
      {isAdmin && <Button onClick={() => generate({ id })}>Reset</Button>}
      <EliminationBracket matches={matches} tournamentId={id} />
    </div>
  );
}
