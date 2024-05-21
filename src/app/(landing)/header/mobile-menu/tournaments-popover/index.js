import TournamentCard from "@/app/dashboard/tournaments/tournament-card";
import useGames from "@/hooks/games/useGames";
import useTournaments from "@/hooks/tournament/useTournaments";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function TournamentsPopover() {
  const { data: games = [] } = useGames();
  const { data: allTournaments = [] } = useTournaments();
  const [gameIndex, setGameIndex] = useState(0);

  const gameId = games[gameIndex]?.id || "";
  const tournaments = allTournaments.filter(({ Game: { id } }) => id == gameId);
  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="flex h-[37.5rem] min-h-0 w-[44rem] overflow-hidden rounded-lg bg-black/50 backdrop-blur-lg">
      <div className="flex-1 p-6 text-sm">
        {games.map(({ id, name }, index) => (
          <div
            className={twMerge(
              "rounded-lg px-6 py-6 transition hover:bg-white/10",
              gameIndex == index && "bg-white/10",
            )}
            onMouseOver={() => setGameIndex(index)}
            key={id}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="min-h-0 flex-[2] overflow-auto bg-white/10 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-semibold">Featured Tournaments</div>
          <Link href="/tournaments" className="text-neutral-400">
            View all
          </Link>
        </div>
        <AnimatePresence mode="popLayout">
          {tournaments.length == 0 ? (
            <motion.div
              className="mt-24 text-center text-xl font-semibold text-neutral-400"
              key="no-tournaments"
              {...animation}
            >
              No tournaments available
            </motion.div>
          ) : (
            <motion.div
              className="space-y-4"
              key={gameIndex.toString()}
              {...animation}
            >
              {tournaments.map((tournament) => (
                <div className="" key={tournament.id}>
                  <TournamentCard {...tournament} />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
