import Avatar from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown-menu";
import useAdmin from "@/hooks/auth/useAdmin";
import useAdvanceToNextRound from "@/hooks/tournament/match/useAdvanceToNextRound";
import useParticipants from "@/hooks/tournament/useParticipants";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { DotsVertical } from "untitledui-js-base";
import Score from "./Score";

export default function Party({
  id,
  score = 0,
  isWinner,
  tournamentId,
  matchId,
  matchCompleted,
  bothPartiesAvailable,
  index,
}) {
  const [edit, setEdit] = useState(false);
  const { data: particpants = [] } = useParticipants(tournamentId);
  const { mutate: advance } = useAdvanceToNextRound();
  const { profile_picture, username = " " } =
    particpants.find(({ id: participantId }) => id == participantId)?.User ||
    {};
  const { isAdmin } = useAdmin();
  const isLoser = matchCompleted && !isWinner;
  const canAdvanceToNextRound = !matchCompleted && bothPartiesAvailable;

  return (
    <div className="flex items-center">
      <div
        className={twMerge(
          "flex-1 rounded-lg bg-neutral-900 px-4 py-2.5 text-xl font-medium",
          isWinner &&
            "border-l-2 border-primary bg-gradient-to-r from-primary/30 to-neutral-900 to-30%",
        )}
      >
        <div
          className={twMerge("flex justify-between", isLoser && "opacity-25")}
        >
          <div className={twMerge("flex w-24 flex-1 items-center gap-2")}>
            {id && (
              <Avatar
                profile_picture={profile_picture}
                className="size-8 rounded-full"
                containerClassName="shrink-0"
              />
            )}
            <div className="truncate whitespace-pre">{username}&nbsp;</div>
          </div>
          {id && (
            <Score
              isWinner={isWinner}
              score={score}
              edit={edit}
              tournamentId={tournamentId}
              matchId={matchId}
              onComplete={() => setEdit(false)}
              index={index}
            />
          )}
        </div>
      </div>

      {id && isAdmin && (
        <div>
          <Dropdown
            items={[
              canAdvanceToNextRound && {
                label: "Advance to next round",
                onClick: () => advance({ tournamentId, matchId, winnerId: id }),
              },
              { label: "Edit Score", onClick: () => setEdit(true) },
            ].filter(Boolean)}
            trigger={
              <button>
                <DotsVertical className="size-4 opacity-40 transition-opacity hover:opacity-100" />
              </button>
            }
          />
        </div>
      )}
    </div>
  );
}
