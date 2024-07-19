import { useState } from "react";

export default function Score({ isWinner, score, edit }) {
  const [newScore, setNewScore] = useState(score);

  if (edit)
    return (
      <div>
        <input
          type="number"
          value={newScore}
          onChange={(e) => setNewScore(Number(e.target.value))}
        />
        <div className="flex flex-col gap-2">
          <button>save</button>
          <button>cancel</button>
        </div>
      </div>
    );

  return <div className={isWinner && "text-primary"}>{score}</div>;
}
