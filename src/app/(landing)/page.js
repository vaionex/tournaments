import Hero from "./components/hero";
import CTA from "./components/cta";
import FeaturedTournaments from "./components/featured-tournaments";
import Rewards from "./components/rewards";
import DesktopApp from "./components/desktop-app";
import Blog from "./components/blog";
import Features from "./components/features";

export const revalidate = 0;
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
