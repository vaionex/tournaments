import Hero from "./hero";
import CTA from "./cta";
import FeaturedTournaments from "./featured-tournaments";
import Container from "@/components/ui/container";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedTournaments />
      <CTA />
    </div>
  );
}
