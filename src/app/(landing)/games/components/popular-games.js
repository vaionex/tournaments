"use client";

import { Button } from "@/components/ui/button";
import GameRating from "./game-rating";

const games = [
  {
    name: "Counter-Strike 2",
    type: "Competitive FPS",
    image: "/images/landing/games/cs2.webp",
    description: "Premier tactical shooter with a thriving esports scene",
    ratings: {
      gameplay: 95,
      graphics: 90,
      sound: 88,
      value: 92,
      overall: 92
    }
  },
  {
    name: "Valorant",
    type: "Competitive FPS",
    image: "/images/landing/games/valorant.webp",
    description: "Character-based tactical shooter with unique abilities",
    ratings: {
      gameplay: 92,
      graphics: 85,
      sound: 90,
      value: 95,
      overall: 90
    }
  },
  {
    name: "Dota 2",
    type: "MOBA",
    image: "/images/landing/games/dota 2.webp",
    description: "Complex MOBA with the highest esports prize pools",
    ratings: {
      gameplay: 94,
      graphics: 88,
      sound: 85,
      value: 98,
      overall: 93
    }
  },
  {
    name: "EA FC 24",
    type: "Sports",
    image: "/images/landing/games/ea fc 24.webp",
    description: "The world&apos;s most popular football simulation game",
    ratings: {
      gameplay: 88,
      graphics: 92,
      sound: 85,
      value: 82,
      overall: 87
    }
  },
];

export default function PopularGames() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Editor&apos;s Choice</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {games.map((game) => (
          <div
            key={game.name}
            className="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
          >
            <div className="relative h-48">
              <img
                src={game.image}
                alt={game.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-4 right-4">
                <GameRating score={game.ratings.overall} />
              </div>
            </div>
            <div className="p-6">
              <div className="mb-2 text-sm text-primary">{game.type}</div>
              <h3 className="mb-2 text-lg font-bold text-white group-hover:text-primary">
                {game.name}
              </h3>
              <p className="mb-4 text-sm text-neutral-400">{game.description}</p>
              <div className="mb-4 space-y-2">
                <RatingBar label="Gameplay" value={game.ratings.gameplay} />
                <RatingBar label="Graphics" value={game.ratings.graphics} />
                <RatingBar label="Sound" value={game.ratings.sound} />
                <RatingBar label="Value" value={game.ratings.value} />
              </div>
              <Button variant="secondary" className="w-full">
                Read Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RatingBar({ label, value }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 text-neutral-400">{label}</span>
      <div className="flex-1 rounded-full bg-neutral-800">
        <div 
          className="h-1 rounded-full bg-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}