import Loader from "@/components/ui/loader";
import useUpdateMatch from "@/hooks/tournament/match/useUpdateMatch";
import { useState } from "react";
import toast from "react-hot-toast";
import { Check, X } from "untitledui-js-base";

export default function Score({
  isWinner,
  score,
  edit,
  matchId,
  tournamentId,
  onComplete,
  index,
}) {
  const [newScore, setNewScore] = useState(score);
  const { mutate: update, isLoading } = useUpdateMatch();

  function handleUpdate() {
    update(
      { id: matchId, [`score${index + 1}`]: newScore, tournamentId },
      {
        onSettled: () => onComplete?.(),
        onSuccess: () => toast.success("Score updated"),
        onError: () => toast.error("Error updating score"),
      },
    );
  }

  if (edit)
    return (
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={newScore}
          onChange={(e) => setNewScore(Number(e.target.value))}
          className="w-12 bg-white/10 pl-2"
        />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-2">
            <button onClick={handleUpdate}>
              <Check className="size-3" />
            </button>
            <button onClick={() => onComplete?.()}>
              <X className="size-3" />
            </button>
          </div>
        )}
      </div>
    );

  return <div className={isWinner && "text-primary"}>{score}</div>;
}
