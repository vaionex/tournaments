import Container from "@/components/ui/container";
import CornerBorder from "@/components/ui/corner-border";
import { DollarSign } from "lucide-react";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { Diamond01 } from "untitledui-js-base";
import { twMerge } from "tailwind-merge";

const rewards = [
  {
    name: "Cold Hard Cash",
    description: "Convert your gaming prowess into real-world currency.",
    icon: DollarSign,
    image: "cash",
  },
  {
    name: "Experience Points (XP)",
    description: "Earn XP and unlock new levels of gaming mastery.",
    icon: ChevronDoubleUpIcon,
    image: "experience",
  },
  {
    name: "Exclusive Rewards Awaits",
    description: "Collect points and exchange them for exciting rewards.",
    icon: Diamond01,
    image: "reward",
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
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-2 text-5xl font-bold">
            Elevate Your Gaming Experience with Rewards
          </h2>
          <div className="text-xl text-supporting">
            {/* Explore our diverse range of rewards tailored to your gaming
            achievements. */}
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-end">
          {rewards.map(({ name, description, icon: Icon, image }, index) => (
            <CornerBorder className="flex-1" key={name}>
              <div className="relative overflow-hidden bg-cover bg-center">
                <img
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  src={`/images/landing/rewards/${image}.webp`}
                  alt={name}
                />
                <div
                  className={twMerge(
                    "relative z-10 flex h-[30rem] flex-col justify-between bg-gradient-to-t from-black to-50% p-8",
                    index != 1 && "md:h-96",
                  )}
                >
                  <div className="w-fit">
                    <CornerBorder>
                      <div className="flex h-12 w-12 items-center justify-center bg-white/20">
                        <Icon className="h-6 w-6" />
                      </div>
                    </CornerBorder>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{name}</div>
                    <div className="text-xl text-supporting">{description}</div>
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
