import Hero from "./hero";
import CTA from "./cta";
import FeaturedTournaments from "./featured-tournaments";
import Container from "@/components/ui/container";
import Rewards from "./rewards";
import DesktopApp from "./desktop-app";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedTournaments />
      <Rewards />
      <DesktopApp />
      <CTA />
    </div>
  );
}
