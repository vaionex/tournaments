import TournamentRank from "@/components/icons/tournament-rank";
import Rank1 from "@/components/icons/tournament-rank/rank1";
import Rank2 from "@/components/icons/tournament-rank/rank2";
import Rank3 from "@/components/icons/tournament-rank/rank3";
import Avatar from "@/components/ui/avatar";
import { getParticipants } from "@/db/tournament";
import { twMerge } from "tailwind-merge";

export default async function Leaderboard({ params: { id } }) {
  const participants = await getParticipants(id);

  const columns = [
    { name: "Rank" },
    { name: "Participant", className: "text-left pl-6" },
    { name: "Kills" },
    { name: "Matches Played" },
    { name: "Average Score" },
    { name: "Last Match" },
  ];

  function getRank(rank) {
    if (rank < 4) return <TournamentRank position={rank} />;
    return rank;
  }

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="bg-white/10">
            {columns.map(({ name, className }) => (
              <th
                className={twMerge("py-3 text-sm font-semibold", className)}
                key={name}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {participants
            .slice()
            .map(({ id, User: { username, profile_picture } }, index) => (
              <tr key={id}>
                <td>
                  <div className="flex items-center justify-center">
                    {getRank(index + 1)}
                  </div>
                </td>
                <td className="">
                  <div className="flex items-center gap-4 px-6 py-4">
                    <Avatar
                      className="size-10 rounded-full"
                      src={profile_picture}
                    />
                    {username}
                  </div>
                </td>
                <td className="text-center text-green-500">0</td>
                <td className="text-center">0</td>
                <td className="text-center">0</td>
                <td className="text-center">0</td>
              </tr>
            ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}
