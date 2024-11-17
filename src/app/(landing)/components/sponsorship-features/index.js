import {
  Award04,
  BarChartSquareUp,
  Grid01,
  Speedometer04,
} from "untitledui-js-base";
import Feature from "./Feature";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const features = [
  {
    image: "realtime.webp",
    icon: BarChartSquareUp,
    title: "Real-Time Analytics",
    description:
      "Monitor viewer engagement and campaign performance with instant insights.",
  },

  {
    image: "brand-reach.webp",
    icon: Speedometer04,
    title: "Maximized Brand Reach",
    description:
      "Elevate your brand with prominent placements in high-profile tournaments.",
  },

  {
    image: "management.webp",
    icon: Grid01,
    title: "Seamless Campaign Management",
    description:
      "Easily manage all aspects of your sponsorship, from setup to execution, in one place.",
  },

  {
    image: "collaborate.webp",
    icon: Award04,
    title: "Collaborate with Top-Rated Organizers",
    description:
      "Partner with organizers who consistently receive high ratings for delivering successful tournaments.",
  },
];
export default function SponsorshipFeatures() {
  return (
    <Container>
      <div className="mb-12 flex flex-col items-center justify-center text-center">
        <div className="mb-2 text-5xl font-bold">
          Unlock the Power of Sponsorship!
        </div>
        <div className="mb-5">
          Transform Your Sponsorship Experience with Our Advanced Dashboard
        </div>
        <Button href="mailto:sponsor@tournaments.com">Become a Sponsor</Button>
      </div>
      <div className="space-y-12 lg:space-y-0">
        {features.map((feature, index) => (
          <Feature
            key={index}
            even={index % 2 === 0}
            first={index === 0}
            last={index === features.length - 1}
            {...feature}
          />
        ))}
      </div>
    </Container>
  );
}
