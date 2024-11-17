import Hero from "./components/hero";
import CTA from "./components/cta";
import FeaturedTournaments from "./components/featured-tournaments";
import Rewards from "./components/rewards";
import Blog from "./components/blog";
import Features from "./components/features";
import SponsorshipFeatures from "./components/sponsorship-features";

export const revalidate = 0;
export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedTournaments />
      <Rewards />
      <Features />
      <SponsorshipFeatures />
      <Blog />
      <CTA />
    </div>
  );
}
