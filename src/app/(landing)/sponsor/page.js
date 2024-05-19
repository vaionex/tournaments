import Container from "@/components/ui/container";
import CTA from "../cta";
import BadgeTitle from "../BadgeTitle";
import { Button } from "@/components/ui/button";
import Brand from "./Brand";
import Gamers from "./Gamers";
import Community from "./Community";

export default function Sponsor() {
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
        <div className="text-center">
          <div className="mx-auto mb-3 w-fit">
            <BadgeTitle>Sponsor</BadgeTitle>
          </div>
          <h1 className="mb-6 text-5xl font-semibold">
            Partner with Us to Elevate Your Brand
          </h1>
          <h2 className="mb-6 text-xl text-gray-300">
            Connect Your Brand to the World of Competitive Gaming
          </h2>
          <Button
            className="mb-24"
            variant="white"
            href="mailto:sponsor@tournaments.com"
          >
            Become a Sponsor
          </Button>
        </div>
        <Brand />
        <Gamers />
        <Community />
        <CTA />
      </Container>
    </div>
  );
}
