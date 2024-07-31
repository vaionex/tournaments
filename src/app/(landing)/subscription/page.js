import Container from "@/components/ui/container";
import BadgeTitle from "../BadgeTitle";
import Perks from "./components/Perks";
import Benefits from "./components/Benefits";
import FAQs from "./components/FAQ";
import CTA from "./components/CTA";

export default function Subscription() {
  return (
    <div
      style={{
        backgroundImage: `url('/images/landing/subscription/background.webp')`,
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
          <h1 className="mb-6 text-5xl font-semibold leading-[60px]">
            Unlock Premium Advantages
          </h1>
          <h2 className="mb-24 text-xl leading-[30px] text-gray-300">
            Get exclusive access to tournaments, free entry experience, and
            more!
          </h2>
        </div>
        <Perks />
      </Container>
      <Benefits />
      <Container>
        <FAQs />
        <CTA />
      </Container>
    </div>
  );
}
