import Container from "@/components/ui/container";
import BadgeTitle from "../BadgeTitle";
import CTA from "../components/cta";
import FeaturedTournaments from "./featured-tournaments";
import Filters from "./filters";

export default async function Tournaments({ searchParams: { game: gameId } }) {
  return (
    <div
      style={{
        backgroundImage: `url('/images/landing/sponsor/background.webp')`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <Container className="pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-3 w-fit">
            <BadgeTitle>Events</BadgeTitle>
          </div>
          <h1 className="mb-6 text-5xl font-semibold">Our Tournaments</h1>
          <h2 className="mb-24 text-xl text-gray-300">
            Join the Excitement: Compete, Win, and Rise to Glory in Our Wide
            Range of Gaming Tournaments. Get Ready to Play!
          </h2>
        </div>
        <Filters gameId={gameId} />
        <FeaturedTournaments gameId={gameId} />
        <CTA />
      </Container>
    </div>
  );
}
