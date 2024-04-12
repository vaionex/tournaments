import Hero from "./hero";
import CTA from "./cta";
import FeaturedTournaments from "./featured-tournaments";
import Rewards from "./rewards";
import DesktopApp from "./desktop-app";
import Blog from "./blog";
import Features from "./features";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedTournaments />
      <Rewards />
      <DesktopApp />
      <Features />
      <Blog />
      <CTA />
    </div>
  );
}
