import Container from "@/components/ui/container";
import PopularGames from "./components/popular-games";
import TrendingGames from "./components/trending-games";
import GameCategories from "./components/game-categories";
import NewReleases from "./components/new-releases";

export const dynamic = "force-dynamic";

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-black pt-24">
      <Container>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Game Reviews</h1>
          <p className="text-lg text-neutral-400">
            In-depth reviews and ratings for the latest and most popular games
          </p>
        </div>

        <div className="space-y-16">
          <PopularGames />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TrendingGames />
            </div>
            <div className="space-y-8">
              <GameCategories />
              <NewReleases />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}