import Container from "@/components/ui/container";
import CTA from "./cta";
import BadgeTitle from "../BadgeTitle";
import Link from "next/link";
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
            <BadgeTitle key="sponsor-badge">Sponsor</BadgeTitle>
          </div>
          <h1 className="mb-6 text-5xl font-semibold">
            Partner with Us
          </h1>
          <h2 className="mb-6 text-xl text-gray-300">
            Connect With Global Gamers
          </h2>
          <Link href="mailto:sponsor@tournaments.com">
            <Button
              key="sponsor-button"
              className="mb-24"
              variant="white"
            >
              Become a Sponsor
            </Button>
          </Link>
        </div>
        <Brand key="brand-section" />
        <Gamers key="gamers-section" />
        <Community key="community-section" />
        <CTA key="cta-section" />
      </Container>
    </div>
  );
}
