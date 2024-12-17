"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import GameRating from "./game-rating";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const games = [
  {
    name: "Apex Legends",
    type: "Battle Royale",
    image: "/images/landing/games/apex.webp",
    description: "A fast-paced battle royale that revolutionizes the genre with unparalleled movement mechanics and innovative team play features. The latest season brings fresh content while maintaining the core gameplay that fans love.",
    fullDescription: `Respawn Entertainment's Apex Legends continues to evolve with its latest season, bringing significant changes to the meta and introducing compelling new content. The game's movement mechanics remain unparalleled in the battle royale genre, while the character abilities create unique strategic opportunities.

The ping system remains industry-leading, and the recent addition of team deathmatch provides a welcome alternative to battle royale gameplay. Sound design continues to be exceptional, helping players make tactical decisions based on audio cues.`,
    verdict: "A masterclass in movement-based gameplay with constant innovation keeping the experience fresh.",
    pros: [
      "Exceptional movement mechanics",
      "Strong team-based gameplay",
      "Regular content updates",
      "Excellent sound design"
    ],
    cons: [
      "Some map balance issues", 
      "Steep learning curve",
      "Matchmaking can be inconsistent"
    ],
    overall: 91
  },
  {
    name: "Fortnite",
    type: "Battle Royale",
    image: "/images/landing/games/fortnite.webp", 
    description: "Epic's battle royale juggernaut enters a new era with UE5, delivering enhanced visuals and refined gameplay mechanics that cater to both casual and competitive players.",
    fullDescription: `Epic Games' flagship title enters a new chapter with significant engine improvements and gameplay refinements. The building mechanics, while still central to the experience, have been better balanced to accommodate different playstyles.

The game's commitment to crossover events and cultural relevance remains strong, though some might find the constant collaborations overwhelming. Performance has improved across all platforms with the UE5 upgrade.`,
    verdict: "Still the most versatile battle royale with something for everyone, despite occasional feature bloat.",
    pros: [
      "Unique building mechanics",
      "Regular content updates", 
      "Strong performance",
      "Cross-platform play"
    ],
    cons: [
      "Complex for newcomers",
      "Building mechanic barrier",
      "Occasional feature overload"
    ],
    overall: 89
  }
];

export default function TrendingGames() {
  const [expandedGame, setExpandedGame] = useState(null);

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Latest Reviews</h2>
      <div className="space-y-8">
        {games.map((game) => (
          <div
            key={game.name}
            className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
          >
            <div className="relative h-64 w-full">
              <img
                src={game.image}
                alt={game.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <GameRating score={game.overall} />
              </div>
            </div>
            <div className="p-8">
              <div className="mb-2 text-sm text-primary">{game.type}</div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{game.name}</h3>
              </div>
              <p className="mb-6 text-neutral-400">
                {expandedGame === game.name ? game.fullDescription : game.description}
              </p>

              <AnimatePresence>
                {expandedGame === game.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 overflow-hidden"
                  >
                    <div className="mb-6">
                      <h4 className="mb-4 font-semibold text-white">Verdict</h4>
                      <p className="text-neutral-400">{game.verdict}</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 font-semibold text-green-500">Pros</h4>
                        <ul className="list-inside list-disc space-y-1 text-neutral-400">
                          {game.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-red-500">Cons</h4>
                        <ul className="list-inside list-disc space-y-1 text-neutral-400">
                          {game.cons.map((con, i) => (
                            <li key={i}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button 
                variant="secondary"
                onClick={() => setExpandedGame(expandedGame === game.name ? null : game.name)}
              >
                {expandedGame === game.name ? "Show Less" : "Read More"}
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}