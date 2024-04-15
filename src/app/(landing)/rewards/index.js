import Container from "@/components/ui/container";
import CornerBorder from "@/components/ui/corner-border";
import { DollarSign } from "lucide-react";
import Image from "next/image";
import cash from "./cash.webp";
import experience from "./experience.webp";
import reward from "./reward.webp";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

const rewards = [
  {
    name: "Cold Hard Cash",
    description: "Convert your gaming prowess into real-world currency.",
    icon: DollarSign,
    image: cash,
  },
  {
    name: "Experience Points (XP)",
    description: "Convert your gaming prowess into real-world currency.",
    icon: ChevronDoubleUpIcon,
    image: experience,
  },
  {
    name: "Exclusive Rewards Awaits",
    description: "Convert your gaming prowess into real-world currency.",
    icon: ChevronDoubleUpIcon,
    image: reward,
  },
];

export default function Rewards() {
  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(at 50% 30%, rgba(0,15,89,0.8) 0%, black 80%)",
      }}
    >
      <Container className="!py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl font-bold mb-2">
            Elevate Your Gaming Experience with Rewards
          </h2>
          <div className="text-supporting text-xl">
            Explore our diverse range of rewards tailored to your gaming
            achievements.
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {rewards.map(({ name, description, icon: Icon, image }) => (
            <CornerBorder key={name}>
              <div className="bg-cover bg-center relative overflow-hidden">
                <Image
                  className="absolute inset-0 object-cover object-center"
                  src={image}
                />
                <div className="h-[30rem] flex flex-col justify-between p-8 bg-gradient-to-t from-black to-50% relative z-10">
                  <div className="w-fit">
                    <CornerBorder>
                      <div className="w-12 h-12 bg-white/20 flex justify-center items-center">
                        <Icon className="w-6 h-6" />
                      </div>
                    </CornerBorder>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{name}</div>
                    <div className="text-supporting text-xl">{description}</div>
                  </div>
                </div>
              </div>
            </CornerBorder>
          ))}
        </div>
      </Container>
    </div>
  );
}
